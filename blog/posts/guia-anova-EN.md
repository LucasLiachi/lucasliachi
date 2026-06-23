<!-- translated from PT -->
---
id: guia-anova
titulo: Complete Guide to ANOVA with Python Examples
resumo: Understand when and how to use Analysis of Variance (ANOVA) to compare means across groups, with a step-by-step Python implementation.
categorias: [Estatística, Python]
tags: [anova, hypothesis testing, variance, scipy, statsmodels, data analysis]
data: 2026-06-23
tempo_leitura: 10
---

# Complete Guide to ANOVA with Python Examples

> Understand when and how to use Analysis of Variance to compare means across groups, with a step-by-step Python implementation.

## What you will learn

- The statistical concept behind ANOVA
- Difference between one-way and two-way ANOVA
- How to verify assumptions before applying the test
- Practical implementation with `scipy` and `statsmodels`
- How to interpret the result and what to do next

---

## What is ANOVA?

ANOVA (Analysis of Variance) is a statistical test used to compare the means of three or more groups simultaneously. The central question is: **does at least one group have a mean significantly different from the others?**

If you have only two groups, a t-test suffices. With three or more, applying multiple t-tests artificially inflates the Type I error rate (false positives). ANOVA controls this problem by making all comparisons at once.

### The logic behind the test

ANOVA decomposes the total variation in the data into two parts:

- **Between-group variation (Between):** how much the group means differ from each other
- **Within-group variation (Within):** how much individual values differ within each group

The F statistic is the ratio between these two sources of variation:

```
F = Between-Group Variation / Within-Group Variation
```

A high F indicates that differences between groups are large relative to internal noise — evidence against the null hypothesis of equal means.

---

## Types of ANOVA

| Type | When to use |
|---|---|
| One-way | One factor with 3+ groups |
| Two-way | Two independent factors |
| Repeated Measures | Same subject measured under different conditions |

This guide covers **One-way ANOVA**, the most common in practice.

---

## Required assumptions

Before running the test, verify:

1. **Normality:** each group should have an approximately normal distribution (use Shapiro-Wilk for small samples)
2. **Homogeneity of variances (homoscedasticity):** group variances should be similar (use Levene's test)
3. **Independence:** observations cannot be related to each other

If these assumptions are violated, consider the non-parametric alternative **Kruskal-Wallis**.

---

## Practical example

### Scenario

A data team wants to know whether the average ticket resolution time differs across three support teams (Alpha, Beta, Gamma). Sample of 30 tickets per team.

### 1. Prepare the data

```python
import numpy as np
import pandas as pd
from scipy import stats
import matplotlib.pyplot as plt

# Simulated data (resolution time in hours)
np.random.seed(42)

alpha = np.random.normal(loc=8.5, scale=2.0, size=30)
beta  = np.random.normal(loc=10.2, scale=2.3, size=30)
gamma = np.random.normal(loc=7.8, scale=1.8, size=30)

df = pd.DataFrame({
    'team': ['Alpha']*30 + ['Beta']*30 + ['Gamma']*30,
    'hours': np.concatenate([alpha, beta, gamma])
})

print(df.groupby('team')['hours'].describe().round(2))
```

### 2. Verify the assumptions

```python
# Normality per group (Shapiro-Wilk)
for team in ['Alpha', 'Beta', 'Gamma']:
    data = df[df['team'] == team]['hours']
    stat, p = stats.shapiro(data)
    print(f"{team}: W={stat:.4f}, p={p:.4f} {'OK' if p > 0.05 else 'WARNING'}")

# Homogeneity of variances (Levene)
groups = [df[df['team'] == e]['hours'] for e in ['Alpha', 'Beta', 'Gamma']]
stat_levene, p_levene = stats.levene(*groups)
print(f"\nLevene: W={stat_levene:.4f}, p={p_levene:.4f}")
```

### 3. Apply the ANOVA

```python
# One-way ANOVA via scipy
f_stat, p_value = stats.f_oneway(*groups)
print(f"F = {f_stat:.4f}")
print(f"p-value = {p_value:.4f}")

if p_value < 0.05:
    print("Conclusion: reject H0 — at least one group differs significantly.")
else:
    print("Conclusion: do not reject H0 — no evidence of difference between groups.")
```

### 4. Post-hoc test (Tukey HSD)

ANOVA tells you a difference exists, but not between which groups. For that, use Tukey's test:

```python
from statsmodels.stats.multicomp import pairwise_tukeyhsd

result = pairwise_tukeyhsd(
    endog=df['hours'],
    groups=df['team'],
    alpha=0.05
)
print(result)
```

The output shows for each pair of groups: mean difference, confidence interval, and whether the difference is statistically significant.

---

## Interpreting the result

| Element | What it means |
|---|---|
| p-value < 0.05 | Sufficient evidence to reject H0 |
| High F | Large between-group variation relative to internal noise |
| Tukey reject=True | That specific pair of groups differs significantly |
| eta-squared (eta²) | Effect size (0.01=small, 0.06=medium, 0.14=large) |

To calculate the effect size:

```python
# eta-squared
ss_between = sum([len(g) * (g.mean() - df['hours'].mean())**2 for g in groups])
ss_total = sum((df['hours'] - df['hours'].mean())**2)
eta_sq = ss_between / ss_total
print(f"eta-squared = {eta_sq:.4f}")
```

---

## Conclusion

ANOVA is a fundamental tool for any analyst or data scientist who needs to compare groups. The correct workflow is always: **verify assumptions → apply ANOVA → if significant, run post-hoc → calculate effect size**.

Suggested next steps: explore two-way ANOVA for scenarios with two factors and ANCOVA when you need to control for continuous covariates.
