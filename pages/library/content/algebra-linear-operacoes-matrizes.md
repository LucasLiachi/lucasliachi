---
title: "Resumo — Operações com Matrizes"
section: Álgebra Linear
type: resumo
level: intermediário
updated: 2026-06-23
tags: [álgebra linear, matrizes, numpy, determinante, autovalores, decomposição]
---

# Resumo — Operações com Matrizes

## Definição e Notação

- **Matriz** A de ordem m×n: m linhas, n colunas. Elemento: A[i][j] ou a_ij
- **Vetor coluna**: matriz n×1. **Vetor linha**: matriz 1×n
- **Matriz quadrada**: m = n. **Identidade** I_n: diagonal 1, resto 0

## Operações Básicas

| Operação | Condição | Resultado |
|---|---|---|
| A + B | mesma ordem m×n | (m×n); soma elemento a elemento |
| c * A | qualquer | (m×n); escalar multiplica cada elemento |
| A * B (produto) | A(m×k), B(k×n) | (m×n); C[i][j] = Σ A[i][r]*B[r][j] |
| A^T (transposta) | qualquer | inverte linhas↔colunas; (m×n)→(n×m) |
| A^-1 (inversa) | quadrada, det≠0 | A * A^-1 = I |

## Propriedades do Produto

```
(AB)C = A(BC)          ← associativa
A(B+C) = AB + AC       ← distributiva
(AB)^T = B^T * A^T     ← transposta do produto
(AB)^-1 = B^-1 * A^-1  ← inversa do produto
AB ≠ BA em geral       ← NÃO comutativa
```

## Determinante

```
det de 2×2:  |a b|  = ad - bc
             |c d|

Regra de Sarrus para 3×3:
det(A) = a(ei-fh) - b(di-fg) + c(dh-eg)

Propriedades:
det(AB) = det(A) * det(B)
det(A^T) = det(A)
det(A^-1) = 1 / det(A)
det(cA) = c^n * det(A)   (n = ordem)
```

- Se det(A) = 0 → matriz **singular** (não invertível, colunas linearmente dependentes)

## Autovalores e Autovetores

```
Definição: A * v = λ * v
  v = autovetor (≠ vetor nulo)
  λ = autovalor correspondente

Como calcular:
1. det(A - λI) = 0          → polinômio característico
2. Resolver as raízes → λ₁, λ₂, ...
3. Para cada λ: resolver (A - λI)v = 0 → autovetor v

Propriedades:
Σλᵢ = tr(A) (soma dos elementos da diagonal)
Πλᵢ = det(A)
```

## Decomposições Relevantes

| Decomposição | Forma | Quando usar |
|---|---|---|
| **LU** | A = LU | Sistemas lineares, det |
| **QR** | A = QR | Mínimos quadrados, autovalores |
| **Cholesky** | A = LL^T | A simétrica positiva definida; mais eficiente que LU |
| **SVD** | A = UΣV^T | PCA, pseudoinversa, compressão |
| **Diagonalização** | A = PDP^-1 | A potências, exponencial de matriz |

## SVD — Singular Value Decomposition

```
A (m×n) = U (m×m) * Σ (m×n) * V^T (n×n)

U: autovetores de AA^T (vetores singulares à esquerda)
V: autovetores de A^TA (vetores singulares à direita)
Σ: diagonal com valores singulares σᵢ = sqrt(λᵢ) ≥ 0

Aplicações: PCA, redução de dimensionalidade, sistemas de recomendação
```

## Tipos especiais de matrizes

| Tipo | Propriedade |
|---|---|
| Simétrica | A = A^T |
| Ortogonal | A^T = A^-1, det = ±1 |
| Positiva definida | x^TAx > 0 para todo x≠0 |
| Diagonal | elementos fora da diagonal = 0 |
| Triangular superior/inferior | zeros abaixo/acima da diagonal |
| Estocástica | colunas somam 1, entradas ≥ 0 |

## Código Python — NumPy

```python
import numpy as np

A = np.array([[1, 2], [3, 4]])
B = np.array([[5, 6], [7, 8]])

# Operações básicas
C = A + B
C = A @ B            # produto matricial (não use *)
C = A.T              # transposta
inv_A = np.linalg.inv(A)
det_A = np.linalg.det(A)

# Autovalores e autovetores
eigenvalues, eigenvectors = np.linalg.eig(A)

# SVD
U, sigma, Vt = np.linalg.svd(A)

# Norma
np.linalg.norm(A)          # norma de Frobenius
np.linalg.norm(A, ord=2)   # norma espectral

# Resolução de sistema Ax = b
x = np.linalg.solve(A, b)  # preferir a inv(A) @ b (mais estável)

# Posto
rank = np.linalg.matrix_rank(A)
```

## Sistemas Lineares Ax = b

```
Soluções possíveis:
- Única:        A quadrada, det(A) ≠ 0
- Infinitas:    colunas linearmente dependentes, b ∈ espaço coluna
- Nenhuma:      b ∉ espaço coluna (sistema inconsistente)

Solução por mínimos quadrados (sobredeterminado m > n):
x = (A^T A)^-1 A^T b   ← equações normais
ou usar: np.linalg.lstsq(A, b)
```
