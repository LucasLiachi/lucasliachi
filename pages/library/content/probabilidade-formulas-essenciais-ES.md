<!-- translated from PT -->
---
title: "Fórmulas Esenciales de Probabilidad"
section: Probabilidade
type: fórmulas
level: intermediário
updated: 2026-06-23
tags: [probabilidad, fórmulas, Bayes, combinatoria, esperanza, varianza, covarianza]
---

# Fórmulas Esenciales de Probabilidad

## Axiomas de Kolmogorov

```
1. P(A) >= 0                        para todo evento A
2. P(Ω) = 1                         el espacio muestral tiene probabilidad 1
3. P(A ∪ B) = P(A) + P(B)           si A y B son mutuamente excluyentes
```

## Probabilidad Clásica (Laplace)

```
P(A) = |A| / |Ω|

|A| = número de casos favorables al evento A
|Ω| = número total de casos igualmente probables
```

## Operaciones con Eventos

```
Complemento:    P(A^c) = 1 - P(A)

Unión:          P(A ∪ B) = P(A) + P(B) - P(A ∩ B)
                P(A ∪ B ∪ C) = P(A) + P(B) + P(C)
                              - P(A∩B) - P(A∩C) - P(B∩C)
                              + P(A∩B∩C)

Intersección:   P(A ∩ B) = P(A) * P(B|A)
                           = P(B) * P(A|B)

Independencia:  P(A ∩ B) = P(A) * P(B)
                (A y B independientes ↔ P(A|B) = P(A))
```

## Probabilidad Condicional

```
P(A|B) = P(A ∩ B) / P(B)     con P(B) > 0

Lectura: probabilidad de A dado que B ocurrió

Propiedades:
  P(A|B) + P(A^c|B) = 1
  P(A ∩ B | C) = P(A|B∩C) * P(B|C)
```

## Teorema de la Probabilidad Total

```
Sea {B₁, B₂, ..., Bₙ} una partición de Ω:

P(A) = Σ P(A|Bᵢ) * P(Bᵢ)   para i = 1 hasta n

Uso: calcular P(A) cuando solo se conoce P(A|Bᵢ)
```

## Teorema de Bayes

```
P(B|A) = [ P(A|B) * P(B) ] / P(A)

Forma expandida con probabilidad total:
P(Bₖ|A) = P(A|Bₖ) * P(Bₖ) / Σ P(A|Bᵢ) * P(Bᵢ)

Terminología:
  P(B)    = probabilidad a priori (prior)
  P(A|B)  = verosimilitud (likelihood)
  P(B|A)  = probabilidad a posteriori (posterior)
  P(A)    = evidencia (normalizador)
```

## Valor Esperado (Esperanza)

```
Variable discreta:
  E[X] = Σ xᵢ * P(X = xᵢ)

Variable continua:
  E[X] = ∫ x * f(x) dx

Propiedades (linealidad):
  E[aX + b]  = a*E[X] + b
  E[X + Y]   = E[X] + E[Y]          (siempre)
  E[XY]      = E[X]*E[Y]            (solo si X,Y independientes)
  E[g(X)]    ≠ g(E[X])              (desigualdad de Jensen)
```

## Varianza y Desviación Estándar

```
Var(X) = E[(X - μ)²] = E[X²] - (E[X])²
σ(X)   = sqrt(Var(X))

Propiedades:
  Var(aX + b) = a² * Var(X)
  Var(X + Y)  = Var(X) + Var(Y) + 2*Cov(X,Y)
  Var(X + Y)  = Var(X) + Var(Y)    (si X,Y independientes)
  Var(X - Y)  = Var(X) + Var(Y)    (si X,Y independientes)
```

## Covarianza y Correlación

```
Cov(X,Y) = E[(X - μₓ)(Y - μᵧ)]
          = E[XY] - E[X]*E[Y]

ρ(X,Y)   = Cov(X,Y) / (σₓ * σᵧ)      ← correlación de Pearson
           con -1 <= ρ <= 1

Propiedades:
  Cov(X,X) = Var(X)
  Cov(aX, bY) = ab * Cov(X,Y)
  X,Y independientes → Cov(X,Y) = 0    (¡pero no al revés!)
```

## Combinatoria (conteo)

```
Permutación (el orden importa, sin reemplazo):
  P(n,k) = n! / (n-k)!

Permutación total:
  P(n) = n!

Permutación con repetición:
  n! / (n₁! * n₂! * ... * nₖ!)

Combinación (el orden no importa, sin reemplazo):
  C(n,k) = n! / (k! * (n-k)!)   ← "n elige k"
  también escrito: (n)
                   (k)

Combinación con reemplazo:
  C(n+k-1, k)
```

## Desigualdades Fundamentales

```
Markov (X >= 0):
  P(X >= a) <= E[X] / a

Chebyshev:
  P(|X - μ| >= kσ) <= 1/k²

Ley de los Grandes Números:
  X̄ₙ → μ  cuando n → ∞  (en probabilidad)

Teorema Central del Límite:
  sqrt(n) * (X̄ₙ - μ) / σ  →  N(0,1)  cuando n → ∞
  (aplicable para n >= 30 en la práctica)
```

## Función Generadora de Momentos (FGM)

```
Mₓ(t) = E[e^(tX)]

Propiedades:
  E[Xⁿ] = Mₓ^(n)(0)      ← n-ésima derivada en t=0
  M_(X+Y)(t) = Mₓ(t) * Mᵧ(t)   (X,Y independientes)

Uso: derivar momentos sin integrar, probar distribuciones
```

## Distribución de Funciones de V.A.

```
Transformación lineal:
  Y = aX + b  →  E[Y] = a*μ + b,  Var(Y) = a²σ²

Suma de normales independientes:
  X ~ N(μ₁,σ₁²), Y ~ N(μ₂,σ₂²)
  X + Y ~ N(μ₁+μ₂, σ₁²+σ₂²)

Media muestral:
  X̄ ~ N(μ, σ²/n)   (población normal o n grande por TCL)

Estandarización:
  Z = (X - μ) / σ  →  Z ~ N(0,1)

Intervalo de confianza para la media (σ conocida):
  IC = [ X̄ ± z_(α/2) * σ/sqrt(n) ]
```

## Entropía e Información (fundamentos)

```
Entropía de Shannon (variable discreta):
  H(X) = -Σ P(xᵢ) * log₂(P(xᵢ))   [bits]

Información mutua:
  I(X;Y) = H(X) - H(X|Y)
          = H(Y) - H(Y|X)

Divergencia KL (diferencia entre distribuciones):
  KL(P||Q) = Σ P(x) * log(P(x)/Q(x))   >=0
  KL no es simétrica: KL(P||Q) ≠ KL(Q||P)
```
