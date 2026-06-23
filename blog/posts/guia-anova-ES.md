<!-- translated from PT -->
---
id: guia-anova
titulo: Guía Completa de ANOVA con Ejemplos en Python
resumo: Entiende cuándo y cómo usar el Análisis de Varianza (ANOVA) para comparar medias entre grupos, con implementación paso a paso en Python.
categorias: [Estatística, Python]
tags: [anova, pruebas de hipótesis, varianza, scipy, statsmodels, análisis de datos]
data: 2026-06-23
tempo_leitura: 10
---

# Guía Completa de ANOVA con Ejemplos en Python

> Entiende cuándo y cómo usar el Análisis de Varianza para comparar medias entre grupos, con implementación paso a paso en Python.

## Lo que aprenderás

- El concepto estadístico detrás de ANOVA
- Diferencia entre ANOVA de una vía y de dos vías
- Cómo verificar los supuestos antes de aplicar el test
- Implementación práctica con `scipy` y `statsmodels`
- Cómo interpretar el resultado y qué hacer después

---

## ¿Qué es ANOVA?

ANOVA (Analysis of Variance) es un test estadístico utilizado para comparar las medias de tres o más grupos simultáneamente. La pregunta central es: **¿al menos un grupo tiene una media significativamente diferente de los demás?**

Si tienes solo dos grupos, el t-test es suficiente. Con tres o más, aplicar múltiples t-tests infla artificialmente la tasa de error tipo I (falso positivo). ANOVA controla ese problema haciendo la comparación de una sola vez.

### La lógica detrás del test

ANOVA descompone la variación total de los datos en dos partes:

- **Variación entre grupos (Between):** cuánto difieren las medias de los grupos entre sí
- **Variación dentro de los grupos (Within):** cuánto difieren los valores individuales dentro de cada grupo

El estadístico F es la razón entre estas dos fuentes de variación:

```
F = Variación Entre Grupos / Variación Dentro de los Grupos
```

Un F alto indica que las diferencias entre grupos son grandes en relación al ruido interno — evidencia contra la hipótesis nula de igualdad de medias.

---

## Tipos de ANOVA

| Tipo | Cuándo usar |
|---|---|
| Una vía | Un factor con 3+ grupos |
| Dos vías | Dos factores independientes |
| Medidas Repetidas | Mismo sujeto medido en diferentes condiciones |

Esta guía cubre **ANOVA de una vía**, la más común en la práctica.

---

## Supuestos obligatorios

Antes de ejecutar el test, verifica:

1. **Normalidad:** cada grupo debe tener distribución aproximadamente normal (usa Shapiro-Wilk para muestras pequeñas)
2. **Homogeneidad de varianzas (homocedasticidad):** las varianzas de los grupos deben ser similares (usa el test de Levene)
3. **Independencia:** las observaciones no pueden estar relacionadas entre sí

Si estos supuestos son violados, considera la alternativa no paramétrica **Kruskal-Wallis**.

---

## Ejemplo práctico

### Escenario

Un equipo de datos quiere saber si el tiempo promedio de resolución de tickets difiere entre tres equipos de soporte (Alpha, Beta, Gamma). Muestra de 30 tickets por equipo.

### 1. Preparar los datos

```python
import numpy as np
import pandas as pd
from scipy import stats
import matplotlib.pyplot as plt

# Datos simulados (tiempo de resolución en horas)
np.random.seed(42)

alpha = np.random.normal(loc=8.5, scale=2.0, size=30)
beta  = np.random.normal(loc=10.2, scale=2.3, size=30)
gamma = np.random.normal(loc=7.8, scale=1.8, size=30)

df = pd.DataFrame({
    'equipo': ['Alpha']*30 + ['Beta']*30 + ['Gamma']*30,
    'tiempo_horas': np.concatenate([alpha, beta, gamma])
})

print(df.groupby('equipo')['tiempo_horas'].describe().round(2))
```

### 2. Verificar los supuestos

```python
# Normalidad por grupo (Shapiro-Wilk)
for equipo in ['Alpha', 'Beta', 'Gamma']:
    datos = df[df['equipo'] == equipo]['tiempo_horas']
    stat, p = stats.shapiro(datos)
    print(f"{equipo}: W={stat:.4f}, p={p:.4f} {'OK' if p > 0.05 else 'ALERTA'}")

# Homogeneidad de varianzas (Levene)
grupos = [df[df['equipo'] == e]['tiempo_horas'] for e in ['Alpha', 'Beta', 'Gamma']]
stat_levene, p_levene = stats.levene(*grupos)
print(f"\nLevene: W={stat_levene:.4f}, p={p_levene:.4f}")
```

### 3. Aplicar ANOVA

```python
# ANOVA de una vía via scipy
f_stat, p_value = stats.f_oneway(*grupos)
print(f"F = {f_stat:.4f}")
print(f"p-value = {p_value:.4f}")

if p_value < 0.05:
    print("Conclusión: rechaza H0 — al menos un grupo difiere significativamente.")
else:
    print("Conclusión: no rechaza H0 — sin evidencia de diferencia entre los grupos.")
```

### 4. Test post-hoc (Tukey HSD)

ANOVA indica que existe diferencia, pero no entre cuáles grupos. Para eso, usa el test de Tukey:

```python
from statsmodels.stats.multicomp import pairwise_tukeyhsd

resultado = pairwise_tukeyhsd(
    endog=df['tiempo_horas'],
    groups=df['equipo'],
    alpha=0.05
)
print(resultado)
```

La salida muestra para cada par de grupos: la diferencia de medias, intervalo de confianza y si la diferencia es estadísticamente significativa.

---

## Interpretando el resultado

| Elemento | Qué significa |
|---|---|
| p-value < 0.05 | Evidencia suficiente para rechazar H0 |
| F elevado | Gran variación entre grupos relativa al ruido interno |
| Tukey reject=True | Ese par específico de grupos difiere significativamente |
| eta-cuadrado (eta²) | Tamaño del efecto (0.01=pequeño, 0.06=mediano, 0.14=grande) |

Para calcular el tamaño del efecto:

```python
# eta-cuadrado
ss_between = sum([len(g) * (g.mean() - df['tiempo_horas'].mean())**2 for g in grupos])
ss_total = sum((df['tiempo_horas'] - df['tiempo_horas'].mean())**2)
eta_sq = ss_between / ss_total
print(f"eta-cuadrado = {eta_sq:.4f}")
```

---

## Conclusión

ANOVA es una herramienta fundamental para cualquier analista o científico de datos que necesite comparar grupos. El flujo correcto es siempre: **verificar supuestos → aplicar ANOVA → si significativo, ejecutar post-hoc → calcular tamaño del efecto**.

Próximos pasos sugeridos: explora ANOVA de dos vías para escenarios con dos factores y ANCOVA cuando necesites controlar covariables continuas.
