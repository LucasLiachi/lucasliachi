<!-- translated from PT -->
---
title: "Cheatsheet — Probability Distributions"
section: Probabilidade
type: cheatsheet
level: intermediário
updated: 2026-06-23
tags: [probability, distributions, statistics, normal, binomial, poisson, exponential]
---

# Cheatsheet — Probability Distributions

## Discrete Distributions

| Distribution | Parameters | PMF | Mean | Variance | Typical use |
|---|---|---|---|---|---|
| **Bernoulli** | p | P(X=1) = p | p | p(1-p) | Single binary outcome (yes/no) |
| **Binomial** | n, p | C(n,k) * p^k * (1-p)^(n-k) | np | np(1-p) | k successes in n trials |
| **Poisson** | λ | (e^-λ * λ^k) / k! | λ | λ | Rare events per unit of time/space |
| **Geometric** | p | (1-p)^(k-1) * p | 1/p | (1-p)/p² | Trials until 1st success |
| **Hypergeometric** | N, K, n | — | nK/N | see formula | Sampling without replacement |

## Continuous Distributions

| Distribution | Parameters | PDF | Mean | Variance | Typical use |
|---|---|---|---|---|---|
| **Uniform** | a, b | 1/(b-a) | (a+b)/2 | (b-a)²/12 | Equal probability over interval |
| **Normal** | μ, σ² | (1/σ√2π) * e^(-(x-μ)²/2σ²) | μ | σ² | Natural phenomena, CLT |
| **Exponential** | λ | λ * e^(-λx) | 1/λ | 1/λ² | Time between Poisson events |
| **Chi-square** | k (df) | — | k | 2k | Goodness-of-fit and independence tests |
| **Student's t** | ν (df) | — | 0 | ν/(ν-2) | Means with small samples |
| **F (Snedecor)** | d1, d2 | — | d2/(d2-2) | — | Variance comparison (ANOVA) |
| **Beta** | α, β | — | α/(α+β) | αβ/((α+β)²(α+β+1)) | Proportions, probabilities |
| **Gamma** | α, β | — | αβ | αβ² | Summed waiting times |

## Empirical Rule — Normal

```
μ ± 1σ  →  ~68% of data
μ ± 2σ  →  ~95% of data
μ ± 3σ  →  ~99.7% of data
```

## Standardization (Z-score)

```
Z = (X - μ) / σ

X ~ N(μ, σ²)  →  Z ~ N(0, 1)
```

## Important approximations

| Condition | Approximation |
|---|---|
| X ~ Bin(n, p), large n, small p (np < 7) | X ≈ Poisson(λ = np) |
| X ~ Bin(n, p), large n, np > 5, n(1-p) > 5 | X ≈ Normal(np, np(1-p)) |
| X ~ Poisson(λ), large λ | X ≈ Normal(λ, λ) |

## Python Code — scipy.stats

```python
from scipy import stats

# Normal
rv = stats.norm(loc=0, scale=1)
rv.pdf(x)    # density at x
rv.cdf(x)    # P(X <= x)
rv.ppf(0.95) # 95th percentile (critical value)
rv.rvs(100)  # 100 random samples

# Binomial
rv = stats.binom(n=10, p=0.3)
rv.pmf(k=3)  # P(X = 3)
rv.cdf(k=3)  # P(X <= 3)

# Poisson
rv = stats.poisson(mu=5)
rv.pmf(k=3)

# Student's t
rv = stats.t(df=29)          # 30 - 1 degrees of freedom
rv.ppf(0.975)                # two-tailed 95% critical t

# Chi-square
rv = stats.chi2(df=4)
rv.ppf(0.95)                 # critical value
```

## Frequent critical values — Standard Normal

| Confidence level | α | z (two-tailed) | z (one-tailed) |
|---|---|---|---|
| 90% | 0.10 | ±1.645 | 1.282 |
| 95% | 0.05 | ±1.960 | 1.645 |
| 99% | 0.01 | ±2.576 | 2.326 |

## Relationships between distributions

```
Bernoulli(p) --(n trials)--> Binomial(n, p)
Binomial(n, p) --(n→∞, p→0, np=λ)--> Poisson(λ)
Poisson --(continuous events)--> Exponential
Normal(0,1)² --(sum of k)--> Chi-square(k)
Normal / sqrt(χ²/k) --> Student's t(k)
χ²(d1)/d1 / χ²(d2)/d2 --> F(d1, d2)
```
