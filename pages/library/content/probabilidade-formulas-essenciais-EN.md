<!-- translated from PT -->
---
title: "Essential Probability Formulas"
section: Probabilidade
type: fórmulas
level: intermediário
updated: 2026-06-23
tags: [probability, formulas, Bayes, combinatorics, expectation, variance, covariance]
---

# Essential Probability Formulas

## Kolmogorov's Axioms

```
1. P(A) >= 0                        for every event A
2. P(Ω) = 1                         sample space has probability 1
3. P(A ∪ B) = P(A) + P(B)           if A and B are mutually exclusive
```

## Classical Probability (Laplace)

```
P(A) = |A| / |Ω|

|A| = number of favorable cases for event A
|Ω| = total number of equally likely cases
```

## Operations on Events

```
Complement:     P(A^c) = 1 - P(A)

Union:          P(A ∪ B) = P(A) + P(B) - P(A ∩ B)
                P(A ∪ B ∪ C) = P(A) + P(B) + P(C)
                              - P(A∩B) - P(A∩C) - P(B∩C)
                              + P(A∩B∩C)

Intersection:   P(A ∩ B) = P(A) * P(B|A)
                           = P(B) * P(A|B)

Independence:   P(A ∩ B) = P(A) * P(B)
                (A and B independent ↔ P(A|B) = P(A))
```

## Conditional Probability

```
P(A|B) = P(A ∩ B) / P(B)     with P(B) > 0

Reading: probability of A given that B occurred

Properties:
  P(A|B) + P(A^c|B) = 1
  P(A ∩ B | C) = P(A|B∩C) * P(B|C)
```

## Law of Total Probability

```
Let {B₁, B₂, ..., Bₙ} be a partition of Ω:

P(A) = Σ P(A|Bᵢ) * P(Bᵢ)   for i = 1 to n

Use: calculate P(A) when only P(A|Bᵢ) is known
```

## Bayes' Theorem

```
P(B|A) = [ P(A|B) * P(B) ] / P(A)

Expanded form with total probability:
P(Bₖ|A) = P(A|Bₖ) * P(Bₖ) / Σ P(A|Bᵢ) * P(Bᵢ)

Terminology:
  P(B)    = prior probability
  P(A|B)  = likelihood
  P(B|A)  = posterior probability
  P(A)    = evidence (normalizer)
```

## Expected Value (Expectation)

```
Discrete variable:
  E[X] = Σ xᵢ * P(X = xᵢ)

Continuous variable:
  E[X] = ∫ x * f(x) dx

Properties (linearity):
  E[aX + b]  = a*E[X] + b
  E[X + Y]   = E[X] + E[Y]          (always)
  E[XY]      = E[X]*E[Y]            (only if X,Y independent)
  E[g(X)]    ≠ g(E[X])              (Jensen's inequality)
```

## Variance and Standard Deviation

```
Var(X) = E[(X - μ)²] = E[X²] - (E[X])²
σ(X)   = sqrt(Var(X))

Properties:
  Var(aX + b) = a² * Var(X)
  Var(X + Y)  = Var(X) + Var(Y) + 2*Cov(X,Y)
  Var(X + Y)  = Var(X) + Var(Y)    (if X,Y independent)
  Var(X - Y)  = Var(X) + Var(Y)    (if X,Y independent)
```

## Covariance and Correlation

```
Cov(X,Y) = E[(X - μₓ)(Y - μᵧ)]
          = E[XY] - E[X]*E[Y]

ρ(X,Y)   = Cov(X,Y) / (σₓ * σᵧ)      ← Pearson correlation
           with -1 <= ρ <= 1

Properties:
  Cov(X,X) = Var(X)
  Cov(aX, bY) = ab * Cov(X,Y)
  X,Y independent → Cov(X,Y) = 0    (but not the reverse!)
```

## Combinatorics (counting)

```
Permutation (order matters, without replacement):
  P(n,k) = n! / (n-k)!

Total permutation:
  P(n) = n!

Permutation with repetition:
  n! / (n₁! * n₂! * ... * nₖ!)

Combination (order doesn't matter, without replacement):
  C(n,k) = n! / (k! * (n-k)!)   ← "n choose k"
  also written: (n)
                (k)

Combination with repetition:
  C(n+k-1, k)
```

## Fundamental Inequalities

```
Markov (X >= 0):
  P(X >= a) <= E[X] / a

Chebyshev:
  P(|X - μ| >= kσ) <= 1/k²

Law of Large Numbers:
  X̄ₙ → μ  as n → ∞  (in probability)

Central Limit Theorem:
  sqrt(n) * (X̄ₙ - μ) / σ  →  N(0,1)  as n → ∞
  (applicable for n >= 30 in practice)
```

## Moment Generating Function (MGF)

```
Mₓ(t) = E[e^(tX)]

Properties:
  E[Xⁿ] = Mₓ^(n)(0)      ← n-th derivative at t=0
  M_(X+Y)(t) = Mₓ(t) * Mᵧ(t)   (X,Y independent)

Use: derive moments without integrating, prove distributions
```

## Distribution of Functions of R.V.

```
Linear transformation:
  Y = aX + b  →  E[Y] = a*μ + b,  Var(Y) = a²σ²

Sum of independent normals:
  X ~ N(μ₁,σ₁²), Y ~ N(μ₂,σ₂²)
  X + Y ~ N(μ₁+μ₂, σ₁²+σ₂²)

Sample mean:
  X̄ ~ N(μ, σ²/n)   (normal population or large n by CLT)

Standardization:
  Z = (X - μ) / σ  →  Z ~ N(0,1)

Confidence interval for mean (σ known):
  CI = [ X̄ ± z_(α/2) * σ/sqrt(n) ]
```

## Entropy and Information (fundamentals)

```
Shannon entropy (discrete variable):
  H(X) = -Σ P(xᵢ) * log₂(P(xᵢ))   [bits]

Mutual information:
  I(X;Y) = H(X) - H(X|Y)
          = H(Y) - H(Y|X)

KL Divergence (difference between distributions):
  KL(P||Q) = Σ P(x) * log(P(x)/Q(x))   >=0
  KL is not symmetric: KL(P||Q) ≠ KL(Q||P)
```
