<!-- translated from PT -->
---
id: testes-hipoteses
titulo: "Pruebas de Hipótesis: z-test, t-test y Chi-Cuadrado"
resumo: Guía práctica sobre las principales pruebas de hipótesis paramétricas y no paramétricas, con criterios de elección y ejemplos en Python.
categorias: [Estatística, Python]
tags: [pruebas de hipótesis, z-test, t-test, chi-cuadrado, scipy, inferencia estadística]
data: 2026-06-23
tempo_leitura: 9
---

# Pruebas de Hipótesis: z-test, t-test y Chi-Cuadrado

> Un mapa práctico para elegir y aplicar el test correcto, con ejemplos reales en Python.

## Lo que aprenderás

- La lógica de la inferencia estadística y el p-value
- Cuándo usar z-test, t-test de una muestra, t-test de dos muestras y chi-cuadrado
- Cómo formular hipótesis nula y alternativa
- Implementación en Python con `scipy`
- Trampas comunes a evitar

---

## La lógica detrás de cualquier prueba de hipótesis

Toda prueba de hipótesis sigue la misma estructura:

1. **H0 (hipótesis nula):** afirmación de que nada cambió, nada difiere, no hay efecto
2. **H1 (hipótesis alternativa):** lo que quieres demostrar
3. **Nivel de significancia (alfa):** umbral de tolerancia al error tipo I (generalmente 0.05)
4. **Estadístico del test:** valor calculado a partir de los datos
5. **p-value:** probabilidad de observar un resultado tan extremo como el obtenido, asumiendo que H0 es verdadera
6. **Decisión:** si p-value < alfa, se rechaza H0

**Importante:** rechazar H0 no prueba H1. Solo significa que los datos son inconsistentes con H0 bajo el nivel de significancia elegido.

---

## Mapa de decisión rápida

```
¿Comparar medias?
├── Una muestra vs. valor conocido:
│   ├── n >= 30 y desviación estándar poblacional conocida → z-test
│   └── n < 30 o desviación estándar desconocida → t-test (una muestra)
└── Dos muestras:
    ├── Muestras independientes → t-test (dos muestras independientes)
    └── Mismos individuos medidos dos veces → t-test pareado

¿Comparar frecuencias/proporciones?
└── Datos categóricos → Chi-Cuadrado
```

---

## z-test: comparar media con desviación estándar poblacional conocida

### Cuándo usar
El z-test se aplica cuando la desviación estándar de la población es conocida (situación rara en la práctica) o cuando la muestra es suficientemente grande (n >= 30) por el Teorema Central del Límite.

### Ejemplo

```python
import numpy as np
from scipy import stats

# Contexto: tiempo promedio histórico de atención = 12 min, desv. estándar = 3 min
# Muestra de 40 atenciones del nuevo proceso: media = 10.8 min
# Hipótesis: ¿el nuevo proceso redujo el tiempo promedio?

mu_0 = 12        # media de la hipótesis nula
sigma = 3        # desviación estándar poblacional
n = 40
x_barra = 10.8

# Cálculo del z-score
z = (x_barra - mu_0) / (sigma / np.sqrt(n))
p_value = stats.norm.cdf(z)  # test unilateral (menor que)

print(f"z = {z:.4f}")
print(f"p-value = {p_value:.4f}")
print("Rechaza H0" if p_value < 0.05 else "No rechaza H0")
```

---

## t-test: comparar medias con desviación estándar desconocida

El t-test es más robusto y utilizado en la gran mayoría de los escenarios reales, ya que usa la desviación estándar muestral como estimación.

### t-test de una muestra

```python
# Contexto: el SLA de resolución de incidentes es de 4 horas.
# Muestra de 25 incidentes: ¿cuál es el tiempo promedio real?

tiempos = [3.8, 4.5, 4.1, 5.2, 3.6, 4.8, 4.0, 3.9, 4.7, 5.1,
           3.7, 4.2, 4.9, 3.5, 4.3, 5.0, 3.8, 4.6, 4.1, 3.9,
           5.3, 4.0, 4.4, 3.7, 4.8]

t_stat, p_value = stats.ttest_1samp(tiempos, popmean=4.0)

print(f"Media muestral = {np.mean(tiempos):.2f} horas")
print(f"t = {t_stat:.4f}")
print(f"p-value (bilateral) = {p_value:.4f}")
```

### t-test de dos muestras independientes

```python
# Contexto: comparar el tiempo promedio de deploy entre dos squads
squad_a = [45, 52, 48, 61, 43, 55, 50, 47, 58, 46]
squad_b = [38, 41, 35, 44, 40, 37, 43, 39, 42, 36]

# Verificar varianzas (test de Levene antes del t-test)
levene_stat, levene_p = stats.levene(squad_a, squad_b)
equal_var = levene_p > 0.05  # True = varianzas iguales, False = Welch

t_stat, p_value = stats.ttest_ind(squad_a, squad_b, equal_var=equal_var)

print(f"Media Squad A = {np.mean(squad_a):.1f} min")
print(f"Media Squad B = {np.mean(squad_b):.1f} min")
print(f"Varianzas iguales: {equal_var}")
print(f"t = {t_stat:.4f}, p-value = {p_value:.4f}")
```

### t-test pareado

```python
# Contexto: mismo equipo, evaluar rendimiento antes y después de un entrenamiento
antes  = [72, 68, 75, 80, 65, 70, 73, 77, 69, 74]
despues = [78, 74, 80, 85, 71, 76, 79, 83, 75, 80]

t_stat, p_value = stats.ttest_rel(antes, despues)
print(f"Diferencia media = {np.mean(np.array(despues) - np.array(antes)):.1f}")
print(f"t = {t_stat:.4f}, p-value = {p_value:.4f}")
```

---

## Chi-Cuadrado: comparar frecuencias observadas vs. esperadas

El chi-cuadrado prueba si existe asociación entre variables categóricas o si la distribución observada sigue la distribución esperada.

### Test de independencia

```python
import pandas as pd

# Contexto: ¿hay asociación entre categoría de incidente y equipo responsable?
tabla = pd.crosstab(
    pd.Series(['Infra','Dev','Dev','Infra','Dev','Infra','Dev','Dev'], name='equipo'),
    pd.Series(['P1','P2','P1','P3','P2','P1','P3','P2'], name='prioridad')
)

chi2, p_value, dof, esperados = stats.chi2_contingency(tabla)

print(f"Chi2 = {chi2:.4f}")
print(f"Grados de libertad = {dof}")
print(f"p-value = {p_value:.4f}")
```

---

## Trampas comunes

| Error | Consecuencia | Cómo evitar |
|---|---|---|
| No verificar normalidad antes del t-test | Resultado inválido para n pequeño | Shapiro-Wilk antes para n < 30 |
| Usar t-test independiente en datos pareados | Pérdida de potencia estadística | Identifica el diseño del estudio |
| Interpretar p-value > 0.05 como "prueba de H0" | Conclusión errónea | p alto = evidencia insuficiente, no confirmación de H0 |
| p-hacking: probar múltiples hipótesis sin corrección | Inflación de la tasa de error tipo I | Usa corrección de Bonferroni o FDR |

---

## Conclusión

La elección correcta de la prueba de hipótesis comienza antes de mirar los datos: entiende el diseño del estudio, el tipo de variable y lo que quieres inferir. El p-value es una herramienta útil, pero debe interpretarse junto con el tamaño del efecto y el intervalo de confianza para una decisión informada.

Próximos pasos: estudia el concepto de potencia estadística (1 - beta) y cómo calcular el tamaño de muestra necesario antes de recolectar datos.
