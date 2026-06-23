<!-- translated from PT -->
---
title: "Summary — Matrix Operations"
section: Álgebra Linear
type: resumo
level: intermediário
updated: 2026-06-23
tags: [linear algebra, matrices, numpy, determinant, eigenvalues, decomposition]
---

# Summary — Matrix Operations

## Definition and Notation

- **Matrix** A of order m×n: m rows, n columns. Element: A[i][j] or a_ij
- **Column vector**: n×1 matrix. **Row vector**: 1×n matrix
- **Square matrix**: m = n. **Identity** I_n: diagonal 1, rest 0

## Basic Operations

| Operation | Condition | Result |
|---|---|---|
| A + B | same order m×n | (m×n); element-wise sum |
| c * A | any | (m×n); scalar multiplies each element |
| A * B (product) | A(m×k), B(k×n) | (m×n); C[i][j] = Σ A[i][r]*B[r][j] |
| A^T (transpose) | any | swaps rows↔columns; (m×n)→(n×m) |
| A^-1 (inverse) | square, det≠0 | A * A^-1 = I |

## Properties of the Product

```
(AB)C = A(BC)          ← associative
A(B+C) = AB + AC       ← distributive
(AB)^T = B^T * A^T     ← transpose of product
(AB)^-1 = B^-1 * A^-1  ← inverse of product
AB ≠ BA in general     ← NOT commutative
```

## Determinant

```
det of 2×2:  |a b|  = ad - bc
             |c d|

Sarrus' rule for 3×3:
det(A) = a(ei-fh) - b(di-fg) + c(dh-eg)

Properties:
det(AB) = det(A) * det(B)
det(A^T) = det(A)
det(A^-1) = 1 / det(A)
det(cA) = c^n * det(A)   (n = order)
```

- If det(A) = 0 → **singular** matrix (not invertible, linearly dependent columns)

## Eigenvalues and Eigenvectors

```
Definition: A * v = λ * v
  v = eigenvector (≠ zero vector)
  λ = corresponding eigenvalue

How to compute:
1. det(A - λI) = 0          → characteristic polynomial
2. Solve the roots → λ₁, λ₂, ...
3. For each λ: solve (A - λI)v = 0 → eigenvector v

Properties:
Σλᵢ = tr(A) (sum of diagonal elements)
Πλᵢ = det(A)
```

## Relevant Decompositions

| Decomposition | Form | When to use |
|---|---|---|
| **LU** | A = LU | Linear systems, det |
| **QR** | A = QR | Least squares, eigenvalues |
| **Cholesky** | A = LL^T | A symmetric positive definite; more efficient than LU |
| **SVD** | A = UΣV^T | PCA, pseudoinverse, compression |
| **Diagonalization** | A = PDP^-1 | A powers, matrix exponential |

## SVD — Singular Value Decomposition

```
A (m×n) = U (m×m) * Σ (m×n) * V^T (n×n)

U: eigenvectors of AA^T (left singular vectors)
V: eigenvectors of A^TA (right singular vectors)
Σ: diagonal with singular values σᵢ = sqrt(λᵢ) ≥ 0

Applications: PCA, dimensionality reduction, recommendation systems
```

## Special matrix types

| Type | Property |
|---|---|
| Symmetric | A = A^T |
| Orthogonal | A^T = A^-1, det = ±1 |
| Positive definite | x^TAx > 0 for all x≠0 |
| Diagonal | elements off the diagonal = 0 |
| Upper/lower triangular | zeros below/above the diagonal |
| Stochastic | columns sum to 1, entries ≥ 0 |

## Python Code — NumPy

```python
import numpy as np

A = np.array([[1, 2], [3, 4]])
B = np.array([[5, 6], [7, 8]])

# Basic operations
C = A + B
C = A @ B            # matrix product (do not use *)
C = A.T              # transpose
inv_A = np.linalg.inv(A)
det_A = np.linalg.det(A)

# Eigenvalues and eigenvectors
eigenvalues, eigenvectors = np.linalg.eig(A)

# SVD
U, sigma, Vt = np.linalg.svd(A)

# Norm
np.linalg.norm(A)          # Frobenius norm
np.linalg.norm(A, ord=2)   # spectral norm

# Solve linear system Ax = b
x = np.linalg.solve(A, b)  # prefer over inv(A) @ b (more stable)

# Rank
rank = np.linalg.matrix_rank(A)
```

## Linear Systems Ax = b

```
Possible solutions:
- Unique:       A square, det(A) ≠ 0
- Infinite:     linearly dependent columns, b ∈ column space
- None:         b ∉ column space (inconsistent system)

Least-squares solution (overdetermined m > n):
x = (A^T A)^-1 A^T b   ← normal equations
or use: np.linalg.lstsq(A, b)
```
