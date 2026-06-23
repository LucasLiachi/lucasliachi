<!-- translated from PT -->
---
id: testes-hipoteses
titulo: "Hypothesis Testing: z-test, t-test, and Chi-Square"
resumo: A practical guide to the main parametric and non-parametric hypothesis tests, with selection criteria and Python examples.
categorias: [Estatística, Python]
tags: [hypothesis testing, z-test, t-test, chi-square, scipy, statistical inference]
data: 2026-06-23
tempo_leitura: 9
---

# Hypothesis Testing: z-test, t-test, and Chi-Square

> A practical map for choosing and applying the right test, with real Python examples.

## What you will learn

- The logic of statistical inference and the p-value
- When to use z-test, one-sample t-test, two-sample t-test, and chi-square
- How to formulate null and alternative hypotheses
- Python implementation with `scipy`
- Common pitfalls to avoid

---

## The logic behind any hypothesis test

Every hypothesis test follows the same structure:

1. **H0 (null hypothesis):** claim that nothing changed, nothing differs, there is no effect
2. **H1 (alternative hypothesis):** what you want to demonstrate
3. **Significance level (alpha):** threshold of tolerance to Type I error (usually 0.05)
4. **Test statistic:** value calculated from the data
5. **p-value:** probability of observing a result as extreme as the one obtained, assuming H0 is true
6. **Decision:** if p-value < alpha, reject H0

**Important:** rejecting H0 does not prove H1. It only means the data are inconsistent with H0 under the chosen significance level.

---

## Quick decision map

```
Compare means?
├── One sample vs. known value:
│   ├── n >= 30 and population std known → z-test
│   └── n < 30 or unknown std → t-test (one sample)
└── Two samples:
    ├── Independent samples → t-test (two independent samples)
    └── Same individuals measured twice → paired t-test

Compare frequencies/proportions?
└── Categorical data → Chi-Square
```

---

## z-test: compare mean with known population standard deviation

### When to use
The z-test applies when the population standard deviation is known (rare in practice) or when the sample is large enough (n >= 30) by the Central Limit Theorem.

### Example

```python
import numpy as np
from scipy import stats

# Context: historical average service time = 12 min, std = 3 min
# Sample of 40 calls from the new process: mean = 10.8 min
# Hypothesis: did the new process reduce the average time?

mu_0 = 12        # null hypothesis mean
sigma = 3        # population standard deviation
n = 40
x_bar = 10.8

# z-score calculation
z = (x_bar - mu_0) / (sigma / np.sqrt(n))
p_value = stats.norm.cdf(z)  # one-tailed test (less than)

print(f"z = {z:.4f}")
print(f"p-value = {p_value:.4f}")
print("Reject H0" if p_value < 0.05 else "Do not reject H0")
```

---

## t-test: compare means with unknown standard deviation

The t-test is more robust and used in the vast majority of real scenarios, since it uses the sample standard deviation as an estimate.

### One-sample t-test

```python
# Context: the SLA for incident resolution is 4 hours.
# Sample of 25 incidents: what is the actual average time?

times = [3.8, 4.5, 4.1, 5.2, 3.6, 4.8, 4.0, 3.9, 4.7, 5.1,
         3.7, 4.2, 4.9, 3.5, 4.3, 5.0, 3.8, 4.6, 4.1, 3.9,
         5.3, 4.0, 4.4, 3.7, 4.8]

t_stat, p_value = stats.ttest_1samp(times, popmean=4.0)

print(f"Sample mean = {np.mean(times):.2f} hours")
print(f"t = {t_stat:.4f}")
print(f"p-value (two-tailed) = {p_value:.4f}")
```

### Two-sample independent t-test

```python
# Context: compare average deploy time between two squads
squad_a = [45, 52, 48, 61, 43, 55, 50, 47, 58, 46]
squad_b = [38, 41, 35, 44, 40, 37, 43, 39, 42, 36]

# Check variances (Levene test before t-test)
levene_stat, levene_p = stats.levene(squad_a, squad_b)
equal_var = levene_p > 0.05  # True = equal variances, False = Welch

t_stat, p_value = stats.ttest_ind(squad_a, squad_b, equal_var=equal_var)

print(f"Mean Squad A = {np.mean(squad_a):.1f} min")
print(f"Mean Squad B = {np.mean(squad_b):.1f} min")
print(f"Equal variances: {equal_var}")
print(f"t = {t_stat:.4f}, p-value = {p_value:.4f}")
```

### Paired t-test

```python
# Context: same team, evaluate performance before and after training
before = [72, 68, 75, 80, 65, 70, 73, 77, 69, 74]
after  = [78, 74, 80, 85, 71, 76, 79, 83, 75, 80]

t_stat, p_value = stats.ttest_rel(before, after)
print(f"Mean difference = {np.mean(np.array(after) - np.array(before)):.1f}")
print(f"t = {t_stat:.4f}, p-value = {p_value:.4f}")
```

---

## Chi-Square: compare observed vs. expected frequencies

The chi-square test checks whether there is an association between categorical variables or whether the observed distribution follows the expected distribution.

### Test of independence

```python
import pandas as pd

# Context: is there an association between incident category and responsible team?
table = pd.crosstab(
    pd.Series(['Infra','Dev','Dev','Infra','Dev','Infra','Dev','Dev'], name='team'),
    pd.Series(['P1','P2','P1','P3','P2','P1','P3','P2'], name='priority')
)

chi2, p_value, dof, expected = stats.chi2_contingency(table)

print(f"Chi2 = {chi2:.4f}")
print(f"Degrees of freedom = {dof}")
print(f"p-value = {p_value:.4f}")
```

---

## Common pitfalls

| Mistake | Consequence | How to avoid |
|---|---|---|
| Not checking normality before t-test | Invalid result for small n | Shapiro-Wilk first for n < 30 |
| Using independent t-test on paired data | Loss of statistical power | Identify the study design |
| Interpreting p-value > 0.05 as "proof of H0" | Wrong conclusion | High p = insufficient evidence, not confirmation of H0 |
| p-hacking: testing multiple hypotheses without correction | Inflation of Type I error rate | Use Bonferroni or FDR correction |

---

## Conclusion

Choosing the correct hypothesis test begins before looking at the data: understand the study design, the type of variable, and what you want to infer. The p-value is a useful tool, but it must be interpreted alongside the effect size and the confidence interval for an informed decision.

Next steps: study the concept of statistical power (1 - beta) and how to calculate the required sample size before collecting data.
