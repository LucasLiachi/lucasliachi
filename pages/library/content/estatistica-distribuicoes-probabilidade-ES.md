<!-- translated from PT -->
---
title: "Cheatsheet — Distribuciones de Probabilidad"
section: Probabilidade
type: cheatsheet
level: intermediário
updated: 2026-06-23
tags: [probabilidad, distribuciones, estadística, normal, binomial, poisson, exponencial]
---

# Cheatsheet — Distribuciones de Probabilidad

## Distribuciones Discretas

| Distribución | Parámetros | PMF | Media | Varianza | Uso típico |
|---|---|---|---|---|---|
| **Bernoulli** | p | P(X=1) = p | p | p(1-p) | Resultado binario único (sí/no) |
| **Binomial** | n, p | C(n,k) * p^k * (1-p)^(n-k) | np | np(1-p) | k éxitos en n intentos |
| **Poisson** | λ | (e^-λ * λ^k) / k! | λ | λ | Eventos raros por unidad de tiempo/espacio |
| **Geométrica** | p | (1-p)^(k-1) * p | 1/p | (1-p)/p² | Intentos hasta el 1er éxito |
| **Hipergeométrica** | N, K, n | — | nK/N | ver fórmula | Muestreo sin reemplazo |

## Distribuciones Continuas

| Distribución | Parámetros | PDF | Media | Varianza | Uso típico |
|---|---|---|---|---|---|
| **Uniforme** | a, b | 1/(b-a) | (a+b)/2 | (b-a)²/12 | Probabilidad igual en intervalo |
| **Normal** | μ, σ² | (1/σ√2π) * e^(-(x-μ)²/2σ²) | μ | σ² | Fenómenos naturales, TCL |
| **Exponencial** | λ | λ * e^(-λx) | 1/λ | 1/λ² | Tiempo entre eventos Poisson |
| **Chi-cuadrado** | k (gl) | — | k | 2k | Tests de ajuste e independencia |
| **t de Student** | ν (gl) | — | 0 | ν/(ν-2) | Medias con muestras pequeñas |
| **F de Snedecor** | d1, d2 | — | d2/(d2-2) | — | Comparación de varianzas (ANOVA) |
| **Beta** | α, β | — | α/(α+β) | αβ/((α+β)²(α+β+1)) | Proporciones, probabilidades |
| **Gamma** | α, β | — | αβ | αβ² | Tiempos de espera sumados |

## Regla Empírica — Normal

```
μ ± 1σ  →  ~68% de los datos
μ ± 2σ  →  ~95% de los datos
μ ± 3σ  →  ~99,7% de los datos
```

## Estandarización (Z-score)

```
Z = (X - μ) / σ

X ~ N(μ, σ²)  →  Z ~ N(0, 1)
```

## Aproximaciones importantes

| Condición | Aproximación |
|---|---|
| X ~ Bin(n, p), n grande, p pequeño (np < 7) | X ≈ Poisson(λ = np) |
| X ~ Bin(n, p), n grande, np > 5, n(1-p) > 5 | X ≈ Normal(np, np(1-p)) |
| X ~ Poisson(λ), λ grande | X ≈ Normal(λ, λ) |

## Código Python — scipy.stats

```python
from scipy import stats

# Normal
rv = stats.norm(loc=0, scale=1)
rv.pdf(x)    # densidad en x
rv.cdf(x)    # P(X <= x)
rv.ppf(0.95) # percentil 95% (valor crítico)
rv.rvs(100)  # 100 muestras aleatorias

# Binomial
rv = stats.binom(n=10, p=0.3)
rv.pmf(k=3)  # P(X = 3)
rv.cdf(k=3)  # P(X <= 3)

# Poisson
rv = stats.poisson(mu=5)
rv.pmf(k=3)

# t de Student
rv = stats.t(df=29)          # 30 - 1 grados de libertad
rv.ppf(0.975)                # t crítico bilateral 95%

# Chi-cuadrado
rv = stats.chi2(df=4)
rv.ppf(0.95)                 # valor crítico
```

## Valores críticos frecuentes — Normal Estándar

| Nivel de confianza | α | z (bilateral) | z (unilateral) |
|---|---|---|---|
| 90% | 0,10 | ±1,645 | 1,282 |
| 95% | 0,05 | ±1,960 | 1,645 |
| 99% | 0,01 | ±2,576 | 2,326 |

## Relaciones entre distribuciones

```
Bernoulli(p) --(n intentos)--> Binomial(n, p)
Binomial(n, p) --(n→∞, p→0, np=λ)--> Poisson(λ)
Poisson --(eventos continuos)--> Exponencial
Normal(0,1)² --(suma de k)--> Chi-cuadrado(k)
Normal / sqrt(χ²/k) --> t de Student(k)
χ²(d1)/d1 / χ²(d2)/d2 --> F(d1, d2)
```
