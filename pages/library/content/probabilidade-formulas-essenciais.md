---
title: "Fórmulas Essenciais de Probabilidade"
section: Probabilidade
type: fórmulas
level: intermediário
updated: 2026-06-23
tags: [probabilidade, fórmulas, Bayes, combinatória, esperança, variância, covariância]
---

# Fórmulas Essenciais de Probabilidade

## Axiomas de Kolmogorov

```
1. P(A) >= 0                        para todo evento A
2. P(Ω) = 1                         espaço amostral tem probabilidade 1
3. P(A ∪ B) = P(A) + P(B)           se A e B são mutuamente exclusivos
```

## Probabilidade Clássica (Laplace)

```
P(A) = |A| / |Ω|

|A| = número de casos favoráveis ao evento A
|Ω| = número total de casos igualmente prováveis
```

## Operações com Eventos

```
Complemento:     P(A^c) = 1 - P(A)

União:           P(A ∪ B) = P(A) + P(B) - P(A ∩ B)
                 P(A ∪ B ∪ C) = P(A) + P(B) + P(C)
                               - P(A∩B) - P(A∩C) - P(B∩C)
                               + P(A∩B∩C)

Interseção:      P(A ∩ B) = P(A) * P(B|A)
                           = P(B) * P(A|B)

Independência:   P(A ∩ B) = P(A) * P(B)
                 (A e B independentes ↔ P(A|B) = P(A))
```

## Probabilidade Condicional

```
P(A|B) = P(A ∩ B) / P(B)     com P(B) > 0

Leitura: probabilidade de A dado que B ocorreu

Propriedades:
  P(A|B) + P(A^c|B) = 1
  P(A ∩ B | C) = P(A|B∩C) * P(B|C)
```

## Teorema da Probabilidade Total

```
Seja {B₁, B₂, ..., Bₙ} partição de Ω:

P(A) = Σ P(A|Bᵢ) * P(Bᵢ)   para i = 1 até n

Uso: calcular P(A) quando só se conhece P(A|Bᵢ)
```

## Teorema de Bayes

```
P(B|A) = [ P(A|B) * P(B) ] / P(A)

Forma expandida com probabilidade total:
P(Bₖ|A) = P(A|Bₖ) * P(Bₖ) / Σ P(A|Bᵢ) * P(Bᵢ)

Terminologia:
  P(B)    = probabilidade a priori (prior)
  P(A|B)  = verossimilhança (likelihood)
  P(B|A)  = probabilidade a posteriori (posterior)
  P(A)    = evidência (normalizador)
```

## Valor Esperado (Esperança)

```
Variável discreta:
  E[X] = Σ xᵢ * P(X = xᵢ)

Variável contínua:
  E[X] = ∫ x * f(x) dx

Propriedades (linearidade):
  E[aX + b]  = a*E[X] + b
  E[X + Y]   = E[X] + E[Y]          (sempre)
  E[XY]      = E[X]*E[Y]            (só se X,Y independentes)
  E[g(X)]    ≠ g(E[X])              (desigualdade de Jensen)
```

## Variância e Desvio-Padrão

```
Var(X) = E[(X - μ)²] = E[X²] - (E[X])²
σ(X)   = sqrt(Var(X))

Propriedades:
  Var(aX + b) = a² * Var(X)
  Var(X + Y)  = Var(X) + Var(Y) + 2*Cov(X,Y)
  Var(X + Y)  = Var(X) + Var(Y)    (se X,Y independentes)
  Var(X - Y)  = Var(X) + Var(Y)    (se X,Y independentes)
```

## Covariância e Correlação

```
Cov(X,Y) = E[(X - μₓ)(Y - μᵧ)]
          = E[XY] - E[X]*E[Y]

ρ(X,Y)   = Cov(X,Y) / (σₓ * σᵧ)      ← correlação de Pearson
           com -1 <= ρ <= 1

Propriedades:
  Cov(X,X) = Var(X)
  Cov(aX, bY) = ab * Cov(X,Y)
  X,Y independentes → Cov(X,Y) = 0    (mas não o contrário!)
```

## Combinatória (contagem)

```
Permutação (ordem importa, sem reposição):
  P(n,k) = n! / (n-k)!

Permutação total:
  P(n) = n!

Permutação com repetição:
  n! / (n₁! * n₂! * ... * nₖ!)

Combinação (ordem não importa, sem reposição):
  C(n,k) = n! / (k! * (n-k)!)   ← "n choose k"
  também escrito: (n)
                  (k)

Combinação com reposição:
  C(n+k-1, k)
```

## Desigualdades Fundamentais

```
Markov (X >= 0):
  P(X >= a) <= E[X] / a

Chebyshev:
  P(|X - μ| >= kσ) <= 1/k²

Lei dos Grandes Números:
  X̄ₙ → μ  quando n → ∞  (em probabilidade)

Teorema Central do Limite:
  sqrt(n) * (X̄ₙ - μ) / σ  →  N(0,1)  quando n → ∞
  (aplicável para n >= 30 na prática)
```

## Função Geradora de Momentos (MGF)

```
Mₓ(t) = E[e^(tX)]

Propriedades:
  E[Xⁿ] = Mₓ^(n)(0)      ← n-ésima derivada em t=0
  M_(X+Y)(t) = Mₓ(t) * Mᵧ(t)   (X,Y independentes)

Uso: derivar momentos sem integrar, provar distribuições
```

## Distribuição de Funções de V.A.

```
Transformação linear:
  Y = aX + b  →  E[Y] = a*μ + b,  Var(Y) = a²σ²

Soma de normais independentes:
  X ~ N(μ₁,σ₁²), Y ~ N(μ₂,σ₂²)
  X + Y ~ N(μ₁+μ₂, σ₁²+σ₂²)

Média amostral:
  X̄ ~ N(μ, σ²/n)   (população normal ou n grande pelo TCL)

Padronização:
  Z = (X - μ) / σ  →  Z ~ N(0,1)

Intervalo de confiança para média (σ conhecido):
  IC = [ X̄ ± z_(α/2) * σ/sqrt(n) ]
```

## Entropias e Informação (fundamentos)

```
Entropia de Shannon (variável discreta):
  H(X) = -Σ P(xᵢ) * log₂(P(xᵢ))   [bits]

Informação mútua:
  I(X;Y) = H(X) - H(X|Y)
          = H(Y) - H(Y|X)

KL Divergence (diferença entre distribuições):
  KL(P||Q) = Σ P(x) * log(P(x)/Q(x))   >=0
  KL não é simétrica: KL(P||Q) ≠ KL(Q||P)
```
