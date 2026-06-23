<!-- translated from PT -->
---
id: probabilidade-bayesiana
titulo: Introducción a la Probabilidad Bayesiana
resumo: Entiende la diferencia entre probabilidad frecuentista y bayesiana, el Teorema de Bayes y cómo aplicarlo a problemas reales con Python.
categorias: [Estatística, Python]
tags: [bayes, probabilidad condicional, teorema de bayes, inferencia bayesiana, python]
data: 2026-06-23
tempo_leitura: 9
---

# Introducción a la Probabilidad Bayesiana

> Aprende a actualizar creencias con evidencias usando el Teorema de Bayes — una de las ideas más poderosas de la estadística moderna.

## Lo que aprenderás

- La diferencia entre probabilidad frecuentista y bayesiana
- El Teorema de Bayes y sus componentes
- Cómo aplicar el razonamiento bayesiano a problemas del día a día
- Implementación en Python con NumPy y visualización con Matplotlib

---

## Frecuentista vs. Bayesiano

La estadística convencional (frecuentista) trata la probabilidad como la **frecuencia a largo plazo** de eventos repetibles. No existe "probabilidad de que una hipótesis sea verdadera" — la hipótesis es verdadera o falsa.

La visión **bayesiana** trata la probabilidad como una **medida de creencia o incertidumbre**. Comienzas con una creencia inicial (prior), observas datos y actualizas esa creencia hacia una posterior.

| Aspecto | Frecuentista | Bayesiana |
|---|---|---|
| Probabilidad | Frecuencia en repeticiones | Grado de creencia |
| Parámetros | Fijos, desconocidos | Variables aleatorias |
| Resultado | p-value, intervalo de confianza | Distribución posterior |
| Incorpora conocimiento previo | No | Sí |

---

## El Teorema de Bayes

```
P(H | E) = P(E | H) * P(H) / P(E)
```

Donde:

- **P(H | E)** — probabilidad posterior: creencia actualizada en la hipótesis H dado que observamos la evidencia E
- **P(E | H)** — verosimilitud (likelihood): probabilidad de observar E si H es verdadera
- **P(H)** — prior: creencia inicial en H antes de ver los datos
- **P(E)** — evidencia marginal: probabilidad total de observar E (normalizador)

En palabras: **la posterior es proporcional al prior por la verosimilitud**.

---

## Ejemplo clásico: test de diagnóstico

### Escenario

Un test para detectar un problema de seguridad en sistemas tiene:
- Sensibilidad (tasa de verdadero positivo): 99%
- Especificidad (tasa de verdadero negativo): 95%
- Prevalencia del problema en la base de sistemas: 1%

Un sistema resulta positivo. ¿Cuál es la probabilidad real de que tenga el problema?

### Calculando a mano

```
P(Problema) = 0.01              (prior)
P(Sin Problema) = 0.99
P(Positivo | Problema) = 0.99   (sensibilidad)
P(Positivo | Sin Problema) = 0.05  (1 - especificidad)

P(Positivo) = P(Pos|Prob)*P(Prob) + P(Pos|SinProb)*P(SinProb)
            = 0.99*0.01 + 0.05*0.99
            = 0.0099 + 0.0495
            = 0.0594

P(Problema | Positivo) = (0.99 * 0.01) / 0.0594 = 0.1667
```

```python
# Implementación en Python
sensibilidad = 0.99
especificidad = 0.95
prevalencia = 0.01

p_positivo_dado_problema = sensibilidad
p_positivo_dado_no_problema = 1 - especificidad

p_positivo = (p_positivo_dado_problema * prevalencia +
              p_positivo_dado_no_problema * (1 - prevalencia))

p_problema_dado_positivo = (p_positivo_dado_problema * prevalencia) / p_positivo

print(f"Probabilidad posterior: {p_problema_dado_positivo:.2%}")
# Resultado: 16.67%
```

Un test con 99% de sensibilidad todavía tiene solo 16.7% de probabilidad de ser un verdadero positivo cuando la prevalencia es baja. Este resultado contraintuitivo es central en el razonamiento bayesiano.

---

## Actualizando creencias secuencialmente

Una de las propiedades más poderosas del enfoque bayesiano es que la posterior de una observación se convierte en el prior de la siguiente. Esto permite aprendizaje continuo.

```python
import numpy as np
import matplotlib.pyplot as plt

# Escenario: estimar la tasa de incidentes críticos de un servicio
# Observamos incidentes a lo largo del tiempo y actualizamos nuestra creencia

def actualizar_beta(alpha, beta_param, nuevos_exitos, nuevos_fracasos):
    """Actualiza distribución Beta con nuevos datos."""
    return alpha + nuevos_exitos, beta_param + nuevos_fracasos

# Prior: distribución Beta(1, 1) = uniforme, sin conocimiento previo
alpha_prior, beta_prior = 1, 1

# Observaciones acumuladas (día a día)
observaciones = [
    (2, 18),   # 2 incidentes en 20 llamadas
    (1, 9),    # 1 incidente en 10 llamadas
    (3, 27),   # 3 incidentes en 30 llamadas
]

from scipy.stats import beta as beta_dist

theta = np.linspace(0, 1, 300)

fig, axes = plt.subplots(1, len(observaciones) + 1, figsize=(14, 4))
axes[0].plot(theta, beta_dist.pdf(theta, alpha_prior, beta_prior))
axes[0].set_title('Prior: Beta(1,1)')
axes[0].set_xlabel('Tasa de incidentes')

alpha, b = alpha_prior, beta_prior
for i, (s, f) in enumerate(observaciones):
    alpha, b = actualizar_beta(alpha, b, s, f)
    axes[i+1].plot(theta, beta_dist.pdf(theta, alpha, b))
    axes[i+1].set_title(f'Posterior tras lote {i+1}\nBeta({alpha},{b})')
    axes[i+1].set_xlabel('Tasa de incidentes')

plt.tight_layout()
plt.savefig('actualizacion_bayesiana.png', dpi=100)
print(f"Estimación final de la tasa: {(alpha-1)/(alpha+b-2):.3f}")
```

---

## Aplicaciones prácticas en datos y TI

| Dominio | Aplicación bayesiana |
|---|---|
| Detección de anomalías | Actualizar probabilidad de falla dado comportamiento del sistema |
| A/B Testing | La inferencia bayesiana evita el "peeking problem" del p-value |
| Filtrado de spam | El clasificador Naive Bayes usa el teorema directamente |
| Modelos predictivos | La regresión bayesiana proporciona distribución de predicciones, no punto único |
| Gestión de riesgos | Incorporar conocimiento especializado como prior |

---

## Prior informativo vs. no informativo

La elección del prior es uno de los puntos más debatidos en la estadística bayesiana:

- **Prior no informativo (uniforme):** cuando no hay conocimiento previo. Equivale a dejar que los datos hablen por sí solos.
- **Prior informativo:** cuando hay literatura, experiencia anterior o expertos. Hace que el modelo converja más rápido con menos datos.
- **Prior conjugado:** elegido por conveniencia matemática (ej: Beta para proporciones, Normal para medias). La posterior queda en la misma familia del prior.

---

## Conclusión

El razonamiento bayesiano es un cambio de paradigma: en lugar de preguntar "¿son los datos consistentes con H0?", preguntas "¿dado lo que observé, qué debo creer?". Esto es especialmente poderoso en escenarios con datos escasos, donde el conocimiento previo hace una diferencia real.

Próximos pasos: explora PyMC, una librería Python para inferencia bayesiana completa con modelos jerárquicos y muestreo MCMC.
