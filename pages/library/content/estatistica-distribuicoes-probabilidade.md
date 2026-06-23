---
title: "Cheatsheet — Distribuições de Probabilidade"
section: Probabilidade
type: cheatsheet
level: intermediário
updated: 2026-06-23
tags: [probabilidade, distribuições, estatística, normal, binomial, poisson, exponencial]
---

# Cheatsheet — Distribuições de Probabilidade

## Distribuições Discretas

| Distribuição | Parâmetros | PMF | Média | Variância | Uso típico |
|---|---|---|---|---|---|
| **Bernoulli** | p | P(X=1) = p | p | p(1-p) | Resultado binário único (sim/não) |
| **Binomial** | n, p | C(n,k) * p^k * (1-p)^(n-k) | np | np(1-p) | k sucessos em n tentativas |
| **Poisson** | λ | (e^-λ * λ^k) / k! | λ | λ | Eventos raros por unidade de tempo/espaço |
| **Geométrica** | p | (1-p)^(k-1) * p | 1/p | (1-p)/p² | Tentativas até o 1º sucesso |
| **Hipergeométrica** | N, K, n | — | nK/N | vide fórmula | Amostragem sem reposição |

## Distribuições Contínuas

| Distribuição | Parâmetros | PDF | Média | Variância | Uso típico |
|---|---|---|---|---|---|
| **Uniforme** | a, b | 1/(b-a) | (a+b)/2 | (b-a)²/12 | Probabilidade igual em intervalo |
| **Normal** | μ, σ² | (1/σ√2π) * e^(-(x-μ)²/2σ²) | μ | σ² | Fenômenos naturais, TLC |
| **Exponencial** | λ | λ * e^(-λx) | 1/λ | 1/λ² | Tempo entre eventos Poisson |
| **Qui-quadrado** | k (gl) | — | k | 2k | Testes de ajuste e independência |
| **t de Student** | ν (gl) | — | 0 | ν/(ν-2) | Médias com amostras pequenas |
| **F de Snedecor** | d1, d2 | — | d2/(d2-2) | — | Comparação de variâncias (ANOVA) |
| **Beta** | α, β | — | α/(α+β) | αβ/((α+β)²(α+β+1)) | Proporções, probabilidades |
| **Gama** | α, β | — | αβ | αβ² | Tempos de espera somados |

## Regra Empírica — Normal

```
μ ± 1σ  →  ~68% dos dados
μ ± 2σ  →  ~95% dos dados
μ ± 3σ  →  ~99,7% dos dados
```

## Padronização (Z-score)

```
Z = (X - μ) / σ

X ~ N(μ, σ²)  →  Z ~ N(0, 1)
```

## Aproximações importantes

| Condição | Aproximação |
|---|---|
| X ~ Bin(n, p), n grande, p pequeno (np < 7) | X ≈ Poisson(λ = np) |
| X ~ Bin(n, p), n grande, np > 5, n(1-p) > 5 | X ≈ Normal(np, np(1-p)) |
| X ~ Poisson(λ), λ grande | X ≈ Normal(λ, λ) |

## Código Python — scipy.stats

```python
from scipy import stats

# Normal
rv = stats.norm(loc=0, scale=1)
rv.pdf(x)    # densidade em x
rv.cdf(x)    # P(X <= x)
rv.ppf(0.95) # quantil 95% (valor crítico)
rv.rvs(100)  # 100 amostras aleatórias

# Binomial
rv = stats.binom(n=10, p=0.3)
rv.pmf(k=3)  # P(X = 3)
rv.cdf(k=3)  # P(X <= 3)

# Poisson
rv = stats.poisson(mu=5)
rv.pmf(k=3)

# t de Student
rv = stats.t(df=29)          # 30 - 1 graus de liberdade
rv.ppf(0.975)                # t crítico bilateral 95%

# Qui-quadrado
rv = stats.chi2(df=4)
rv.ppf(0.95)                 # valor crítico
```

## Valores críticos frequentes — Normal Padrão

| Nível de confiança | α | z (bilateral) | z (unilateral) |
|---|---|---|---|
| 90% | 0,10 | ±1,645 | 1,282 |
| 95% | 0,05 | ±1,960 | 1,645 |
| 99% | 0,01 | ±2,576 | 2,326 |

## Relações entre distribuições

```
Bernoulli(p) --(n tentativas)--> Binomial(n, p)
Binomial(n, p) --(n→∞, p→0, np=λ)--> Poisson(λ)
Poisson --(eventos contínuos)--> Exponencial
Normal(0,1)² --(soma de k)--> Qui-quadrado(k)
Normal / sqrt(χ²/k) --> t de Student(k)
χ²(d1)/d1 / χ²(d2)/d2 --> F(d1, d2)
```
