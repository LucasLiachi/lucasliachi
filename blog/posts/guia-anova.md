---
id: guia-anova
titulo: Guia Completo de ANOVA com Exemplos em Python
resumo: Entenda quando e como usar a Análise de Variância (ANOVA) para comparar médias entre grupos, com implementação passo a passo em Python.
categorias: [Estatística, Python]
tags: [anova, testes de hipótese, variância, scipy, statsmodels, análise de dados]
data: 2026-06-23
tempo_leitura: 10
---

# Guia Completo de ANOVA com Exemplos em Python

> Entenda quando e como usar a Análise de Variância para comparar médias entre grupos, com implementação passo a passo em Python.

## O que você vai aprender

- O conceito estatístico por trás da ANOVA
- Diferença entre ANOVA one-way e two-way
- Como verificar os pressupostos antes de aplicar o teste
- Implementação prática com `scipy` e `statsmodels`
- Como interpretar o resultado e o que fazer depois

---

## O que é ANOVA?

ANOVA (Analysis of Variance) é um teste estatístico usado para comparar as médias de três ou mais grupos simultaneamente. A pergunta central é: **pelo menos um grupo tem média significativamente diferente dos demais?**

Se você tem apenas dois grupos, o t-test basta. Com três ou mais, aplicar múltiplos t-tests aumenta a taxa de erro tipo I (falso positivo) artificialmente. A ANOVA controla esse problema fazendo a comparação de uma só vez.

### A lógica por trás do teste

A ANOVA decompõe a variação total dos dados em duas partes:

- **Variação entre grupos (Between):** quanto as médias dos grupos diferem entre si
- **Variação dentro dos grupos (Within):** quanto os valores individuais diferem dentro de cada grupo

A estatística F é a razão entre essas duas fontes de variação:

```
F = Variação Entre Grupos / Variação Dentro dos Grupos
```

Um F alto indica que as diferenças entre grupos são grandes em relação ao ruído interno — evidência contra a hipótese nula de igualdade de médias.

---

## Tipos de ANOVA

| Tipo | Quando usar |
|---|---|
| One-way | Um fator com 3+ grupos |
| Two-way | Dois fatores independentes |
| Repeated Measures | Mesmo sujeito medido em diferentes condições |

Este guia cobre a **One-way ANOVA**, a mais comum na prática.

---

## Pressupostos obrigatórios

Antes de rodar o teste, verifique:

1. **Normalidade:** cada grupo deve ter distribuição aproximadamente normal (use Shapiro-Wilk para amostras pequenas)
2. **Homogeneidade de variâncias (homocedasticidade):** as variâncias dos grupos devem ser similares (use o teste de Levene)
3. **Independência:** as observações não podem estar relacionadas entre si

Se esses pressupostos forem violados, considere a alternativa não-paramétrica **Kruskal-Wallis**.

---

## Exemplo prático

### Cenário

Um time de dados quer saber se o tempo médio de resolução de chamados difere entre três equipes de suporte (Alpha, Beta, Gamma). Amostra de 30 chamados por equipe.

### 1. Preparar os dados

```python
import numpy as np
import pandas as pd
from scipy import stats
import matplotlib.pyplot as plt

# Dados simulados (tempo de resolução em horas)
np.random.seed(42)

alpha = np.random.normal(loc=8.5, scale=2.0, size=30)
beta  = np.random.normal(loc=10.2, scale=2.3, size=30)
gamma = np.random.normal(loc=7.8, scale=1.8, size=30)

df = pd.DataFrame({
    'equipe': ['Alpha']*30 + ['Beta']*30 + ['Gamma']*30,
    'tempo_horas': np.concatenate([alpha, beta, gamma])
})

print(df.groupby('equipe')['tempo_horas'].describe().round(2))
```

### 2. Verificar os pressupostos

```python
# Normalidade por grupo (Shapiro-Wilk)
for equipe in ['Alpha', 'Beta', 'Gamma']:
    dados = df[df['equipe'] == equipe]['tempo_horas']
    stat, p = stats.shapiro(dados)
    print(f"{equipe}: W={stat:.4f}, p={p:.4f} {'OK' if p > 0.05 else 'ALERTA'}")

# Homogeneidade de variâncias (Levene)
grupos = [df[df['equipe'] == e]['tempo_horas'] for e in ['Alpha', 'Beta', 'Gamma']]
stat_levene, p_levene = stats.levene(*grupos)
print(f"\nLevene: W={stat_levene:.4f}, p={p_levene:.4f}")
```

### 3. Aplicar a ANOVA

```python
# ANOVA one-way via scipy
f_stat, p_value = stats.f_oneway(*grupos)
print(f"F = {f_stat:.4f}")
print(f"p-value = {p_value:.4f}")

if p_value < 0.05:
    print("Conclusao: rejeita H0 — pelo menos um grupo difere significativamente.")
else:
    print("Conclusao: nao rejeita H0 — sem evidencia de diferenca entre os grupos.")
```

### 4. Teste post-hoc (Tukey HSD)

A ANOVA diz que existe diferença, mas não diz entre quais grupos. Para isso, use o teste de Tukey:

```python
from statsmodels.stats.multicomp import pairwise_tukeyhsd

resultado = pairwise_tukeyhsd(
    endog=df['tempo_horas'],
    groups=df['equipe'],
    alpha=0.05
)
print(resultado)
```

O output mostra para cada par de grupos: a diferença de médias, intervalo de confiança e se a diferença é estatisticamente significativa.

---

## Interpretando o resultado

| Elemento | O que significa |
|---|---|
| p-value < 0.05 | Evidência suficiente para rejeitar H0 |
| F elevado | Grande variação entre grupos relativa ao ruído interno |
| Tukey reject=True | Aquele par específico de grupos difere significativamente |
| eta-squared (eta²) | Tamanho do efeito (0.01=pequeno, 0.06=médio, 0.14=grande) |

Para calcular o tamanho do efeito:

```python
# eta-squared
ss_between = sum([len(g) * (g.mean() - df['tempo_horas'].mean())**2 for g in grupos])
ss_total = sum((df['tempo_horas'] - df['tempo_horas'].mean())**2)
eta_sq = ss_between / ss_total
print(f"eta-squared = {eta_sq:.4f}")
```

---

## Conclusão

ANOVA é uma ferramenta fundamental para qualquer analista ou cientista de dados que precise comparar grupos. O fluxo correto é sempre: **verificar pressupostos → aplicar ANOVA → se significativo, rodar post-hoc → calcular tamanho do efeito**.

Próximos passos sugeridos: explore a two-way ANOVA para cenários com dois fatores e o ANCOVA quando precisar controlar covariáveis contínuas.
