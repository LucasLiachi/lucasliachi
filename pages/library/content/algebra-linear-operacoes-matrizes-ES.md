<!-- translated from PT -->
---
title: "Resumen — Operaciones con Matrices"
section: Álgebra Linear
type: resumo
level: intermediário
updated: 2026-06-23
tags: [álgebra lineal, matrices, numpy, determinante, valores propios, descomposición]
---

# Resumen — Operaciones con Matrices

## Definición y Notación

- **Matriz** A de orden m×n: m filas, n columnas. Elemento: A[i][j] o a_ij
- **Vector columna**: matriz n×1. **Vector fila**: matriz 1×n
- **Matriz cuadrada**: m = n. **Identidad** I_n: diagonal 1, resto 0

## Operaciones Básicas

| Operación | Condición | Resultado |
|---|---|---|
| A + B | mismo orden m×n | (m×n); suma elemento a elemento |
| c * A | cualquiera | (m×n); el escalar multiplica cada elemento |
| A * B (producto) | A(m×k), B(k×n) | (m×n); C[i][j] = Σ A[i][r]*B[r][j] |
| A^T (transpuesta) | cualquiera | invierte filas↔columnas; (m×n)→(n×m) |
| A^-1 (inversa) | cuadrada, det≠0 | A * A^-1 = I |

## Propiedades del Producto

```
(AB)C = A(BC)          ← asociativa
A(B+C) = AB + AC       ← distributiva
(AB)^T = B^T * A^T     ← transpuesta del producto
(AB)^-1 = B^-1 * A^-1  ← inversa del producto
AB ≠ BA en general     ← NO conmutativa
```

## Determinante

```
det de 2×2:  |a b|  = ad - bc
             |c d|

Regla de Sarrus para 3×3:
det(A) = a(ei-fh) - b(di-fg) + c(dh-eg)

Propiedades:
det(AB) = det(A) * det(B)
det(A^T) = det(A)
det(A^-1) = 1 / det(A)
det(cA) = c^n * det(A)   (n = orden)
```

- Si det(A) = 0 → matriz **singular** (no invertible, columnas linealmente dependientes)

## Valores Propios y Vectores Propios

```
Definición: A * v = λ * v
  v = vector propio (≠ vector nulo)
  λ = valor propio correspondiente

Cómo calcular:
1. det(A - λI) = 0          → polinomio característico
2. Resolver las raíces → λ₁, λ₂, ...
3. Para cada λ: resolver (A - λI)v = 0 → vector propio v

Propiedades:
Σλᵢ = tr(A) (suma de los elementos de la diagonal)
Πλᵢ = det(A)
```

## Descomposiciones Relevantes

| Descomposición | Forma | Cuándo usar |
|---|---|---|
| **LU** | A = LU | Sistemas lineales, det |
| **QR** | A = QR | Mínimos cuadrados, valores propios |
| **Cholesky** | A = LL^T | A simétrica definida positiva; más eficiente que LU |
| **SVD** | A = UΣV^T | PCA, pseudoinversa, compresión |
| **Diagonalización** | A = PDP^-1 | Potencias de A, exponencial de matriz |

## SVD — Descomposición en Valores Singulares

```
A (m×n) = U (m×m) * Σ (m×n) * V^T (n×n)

U: vectores propios de AA^T (vectores singulares izquierdos)
V: vectores propios de A^TA (vectores singulares derechos)
Σ: diagonal con valores singulares σᵢ = sqrt(λᵢ) ≥ 0

Aplicaciones: PCA, reducción de dimensionalidad, sistemas de recomendación
```

## Tipos especiales de matrices

| Tipo | Propiedad |
|---|---|
| Simétrica | A = A^T |
| Ortogonal | A^T = A^-1, det = ±1 |
| Definida positiva | x^TAx > 0 para todo x≠0 |
| Diagonal | elementos fuera de la diagonal = 0 |
| Triangular superior/inferior | ceros debajo/encima de la diagonal |
| Estocástica | las columnas suman 1, entradas ≥ 0 |

## Código Python — NumPy

```python
import numpy as np

A = np.array([[1, 2], [3, 4]])
B = np.array([[5, 6], [7, 8]])

# Operaciones básicas
C = A + B
C = A @ B            # producto matricial (no usar *)
C = A.T              # transpuesta
inv_A = np.linalg.inv(A)
det_A = np.linalg.det(A)

# Valores propios y vectores propios
eigenvalues, eigenvectors = np.linalg.eig(A)

# SVD
U, sigma, Vt = np.linalg.svd(A)

# Norma
np.linalg.norm(A)          # norma de Frobenius
np.linalg.norm(A, ord=2)   # norma espectral

# Resolución de sistema Ax = b
x = np.linalg.solve(A, b)  # preferir a inv(A) @ b (más estable)

# Rango
rank = np.linalg.matrix_rank(A)
```

## Sistemas Lineales Ax = b

```
Soluciones posibles:
- Única:        A cuadrada, det(A) ≠ 0
- Infinitas:    columnas linealmente dependientes, b ∈ espacio columna
- Ninguna:      b ∉ espacio columna (sistema inconsistente)

Solución por mínimos cuadrados (sobredeterminado m > n):
x = (A^T A)^-1 A^T b   ← ecuaciones normales
o usar: np.linalg.lstsq(A, b)
```
