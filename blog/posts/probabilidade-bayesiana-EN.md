<!-- translated from PT -->
---
id: probabilidade-bayesiana
titulo: Introduction to Bayesian Probability
resumo: Understand the difference between frequentist and Bayesian probability, Bayes' Theorem, and how to apply it to real problems with Python.
categorias: [Estatística, Python]
tags: [bayes, conditional probability, bayes theorem, bayesian inference, python]
data: 2026-06-23
tempo_leitura: 9
---

# Introduction to Bayesian Probability

> Learn to update beliefs with evidence using Bayes' Theorem — one of the most powerful ideas in modern statistics.

## What you will learn

- The difference between frequentist and Bayesian probability
- Bayes' Theorem and its components
- How to apply Bayesian reasoning to everyday problems
- Python implementation with NumPy and visualization with Matplotlib

---

## Frequentist vs. Bayesian

Conventional (frequentist) statistics treats probability as the **long-run frequency** of repeatable events. There is no "probability that a hypothesis is true" — the hypothesis is either true or false.

The **Bayesian** view treats probability as a **measure of belief or uncertainty**. You start with an initial belief (prior), observe data, and update that belief into a posterior.

| Aspect | Frequentist | Bayesian |
|---|---|---|
| Probability | Frequency in repetitions | Degree of belief |
| Parameters | Fixed, unknown | Random variables |
| Result | p-value, confidence interval | Posterior distribution |
| Incorporates prior knowledge | No | Yes |

---

## Bayes' Theorem

```
P(H | E) = P(E | H) * P(H) / P(E)
```

Where:

- **P(H | E)** — posterior probability: updated belief in hypothesis H given that we observed evidence E
- **P(E | H)** — likelihood: probability of observing E if H is true
- **P(H)** — prior: initial belief in H before seeing data
- **P(E)** — marginal evidence: total probability of observing E (normalizer)

In words: **posterior is proportional to prior times likelihood**.

---

## Classic example: diagnostic test

### Scenario

A test to detect a security problem in systems has:
- Sensitivity (true positive rate): 99%
- Specificity (true negative rate): 95%
- Prevalence of the problem in the system base: 1%

A system tests positive. What is the actual probability that it has the problem?

### Calculating by hand

```
P(Problem) = 0.01              (prior)
P(No Problem) = 0.99
P(Positive | Problem) = 0.99   (sensitivity)
P(Positive | No Problem) = 0.05  (1 - specificity)

P(Positive) = P(Pos|Prob)*P(Prob) + P(Pos|NoProb)*P(NoProb)
            = 0.99*0.01 + 0.05*0.99
            = 0.0099 + 0.0495
            = 0.0594

P(Problem | Positive) = (0.99 * 0.01) / 0.0594 = 0.1667
```

```python
# Python implementation
sensitivity = 0.99
specificity = 0.95
prevalence = 0.01

p_positive_given_problem = sensitivity
p_positive_given_no_problem = 1 - specificity

p_positive = (p_positive_given_problem * prevalence +
              p_positive_given_no_problem * (1 - prevalence))

p_problem_given_positive = (p_positive_given_problem * prevalence) / p_positive

print(f"Posterior probability: {p_problem_given_positive:.2%}")
# Result: 16.67%
```

A test with 99% sensitivity still has only a 16.7% chance of being a true positive when prevalence is low. This counterintuitive result is central to Bayesian reasoning.

---

## Updating beliefs sequentially

One of the most powerful properties of the Bayesian approach is that the posterior from one observation becomes the prior for the next. This enables continuous learning.

```python
import numpy as np
import matplotlib.pyplot as plt

# Scenario: estimate the critical incident rate of a service
# We observe incidents over time and update our belief

def update_beta(alpha, beta_param, new_successes, new_failures):
    """Updates Beta distribution with new data."""
    return alpha + new_successes, beta_param + new_failures

# Prior: Beta(1, 1) = uniform, no prior knowledge
alpha_prior, beta_prior = 1, 1

# Accumulated observations (day by day)
observations = [
    (2, 18),   # 2 incidents in 20 calls
    (1, 9),    # 1 incident in 10 calls
    (3, 27),   # 3 incidents in 30 calls
]

from scipy.stats import beta as beta_dist

theta = np.linspace(0, 1, 300)

fig, axes = plt.subplots(1, len(observations) + 1, figsize=(14, 4))
axes[0].plot(theta, beta_dist.pdf(theta, alpha_prior, beta_prior))
axes[0].set_title('Prior: Beta(1,1)')
axes[0].set_xlabel('Incident rate')

alpha, b = alpha_prior, beta_prior
for i, (s, f) in enumerate(observations):
    alpha, b = update_beta(alpha, b, s, f)
    axes[i+1].plot(theta, beta_dist.pdf(theta, alpha, b))
    axes[i+1].set_title(f'Posterior after batch {i+1}\nBeta({alpha},{b})')
    axes[i+1].set_xlabel('Incident rate')

plt.tight_layout()
plt.savefig('bayesian_update.png', dpi=100)
print(f"Final rate estimate: {(alpha-1)/(alpha+b-2):.3f}")
```

---

## Practical applications in data and IT

| Domain | Bayesian application |
|---|---|
| Anomaly detection | Update probability of failure given system behavior |
| A/B Testing | Bayesian inference avoids the p-value "peeking problem" |
| Spam filtering | Naive Bayes classifier directly uses the theorem |
| Predictive models | Bayesian regression provides a distribution of predictions, not a single point |
| Risk management | Incorporate expert knowledge as a prior |

---

## Informative vs. non-informative prior

The choice of prior is one of the most debated points in Bayesian statistics:

- **Non-informative prior (uniform):** when there is no prior knowledge. Equivalent to letting the data speak for themselves.
- **Informative prior:** when there is literature, prior experience, or expert knowledge. Makes the model converge faster with less data.
- **Conjugate prior:** chosen for mathematical convenience (e.g., Beta for proportions, Normal for means). The posterior stays in the same family as the prior.

---

## Conclusion

Bayesian reasoning is a paradigm shift: instead of asking "are the data consistent with H0?", you ask "given what I observed, what should I believe?". This is especially powerful in data-scarce scenarios, where prior knowledge makes a real difference.

Next steps: explore PyMC, a Python library for full Bayesian inference with hierarchical models and MCMC sampling.
