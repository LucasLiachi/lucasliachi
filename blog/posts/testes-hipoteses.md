---
id: testes-hipoteses
titulo: "Testes de Hipóteses: z-test, t-test e Qui-Quadrado"
resumo: Guia prático sobre os principais testes de hipótese paramétricos e não paramétricos, com critérios de escolha e exemplos em Python.
categorias: [Estatística, Python]
tags: [testes de hipótese, z-test, t-test, qui-quadrado, scipy, inferência estatística]
data: 2026-06-23
tempo_leitura: 9
---

# Testes de Hipóteses: z-test, t-test e Qui-Quadrado

> Um mapa prático para escolher e aplicar o teste certo, com exemplos reais em Python.

## O que você vai aprender

- A lógica da inferência estatística e do p-value
- Quando usar z-test, t-test de uma amostra, t-test de duas amostras e qui-quadrado
- Como formular hipóteses nula e alternativa
- Implementação em Python com `scipy`
- Armadilhas comuns a evitar

---

## A lógica por trás de qualquer teste de hipótese

Todo teste de hipótese segue a mesma estrutura:

1. **H0 (hipótese nula):** afirmação de que nada mudou, nada difere, não há efeito
2. **H1 (hipótese alternativa):** o que você quer demonstrar
3. **Nível de significância (alfa):** limiar de tolerância ao erro tipo I (geralmente 0.05)
4. **Estatística do teste:** valor calculado a partir dos dados
5. **p-value:** probabilidade de observar um resultado tão extremo quanto o obtido, assumindo que H0 é verdadeira
6. **Decisão:** se p-value < alfa, rejeita-se H0

**Importante:** rejeitar H0 não prova H1. Significa apenas que os dados são inconsistentes com H0 sob o nível de significância escolhido.

---

## Mapa de decisão rápida

```
Comparar médias?
├── Uma amostra vs. valor conhecido:
│   ├── n >= 30 e desvio-padrão populacional conhecido → z-test
│   └── n < 30 ou desvio-padrão desconhecido → t-test (uma amostra)
└── Duas amostras:
    ├── Amostras independentes → t-test (duas amostras independentes)
    └── Mesmos indivíduos medidos duas vezes → t-test pareado

Comparar frequências/proporções?
└── Dados categóricos → Qui-Quadrado
```

---

## z-test: comparar média com desvio-padrão populacional conhecido

### Quando usar
O z-test é aplicável quando o desvio-padrão da população é conhecido (situação rara na prática) ou quando a amostra é grande o suficiente (n >= 30) pelo Teorema Central do Limite.

### Exemplo

```python
import numpy as np
from scipy import stats

# Contexto: tempo médio de atendimento histórico = 12 min, desvio-padrao = 3 min
# Amostra de 40 atendimentos do novo processo: media = 10.8 min
# Hipotese: o novo processo reduziu o tempo medio?

mu_0 = 12        # media da hipotese nula
sigma = 3        # desvio-padrao populacional
n = 40
x_barra = 10.8

# Calculo do z-score
z = (x_barra - mu_0) / (sigma / np.sqrt(n))
p_value = stats.norm.cdf(z)  # teste unilateral (menor que)

print(f"z = {z:.4f}")
print(f"p-value = {p_value:.4f}")
print("Rejeita H0" if p_value < 0.05 else "Nao rejeita H0")
```

---

## t-test: comparar médias com desvio-padrão desconhecido

O t-test é mais robusto e utilizado na grande maioria dos cenários reais, pois usa o desvio-padrão amostral como estimativa.

### t-test de uma amostra

```python
# Contexto: o SLA de resolucao de incidentes e de 4 horas.
# Amostra de 25 incidentes: qual o tempo medio real?

tempos = [3.8, 4.5, 4.1, 5.2, 3.6, 4.8, 4.0, 3.9, 4.7, 5.1,
          3.7, 4.2, 4.9, 3.5, 4.3, 5.0, 3.8, 4.6, 4.1, 3.9,
          5.3, 4.0, 4.4, 3.7, 4.8]

t_stat, p_value = stats.ttest_1samp(tempos, popmean=4.0)

print(f"Media amostral = {np.mean(tempos):.2f} horas")
print(f"t = {t_stat:.4f}")
print(f"p-value (bicaudal) = {p_value:.4f}")
```

### t-test de duas amostras independentes

```python
# Contexto: comparar o tempo medio de deploy entre duas squads
squad_a = [45, 52, 48, 61, 43, 55, 50, 47, 58, 46]
squad_b = [38, 41, 35, 44, 40, 37, 43, 39, 42, 36]

# Verificar variâncias (teste de Levene antes do t-test)
levene_stat, levene_p = stats.levene(squad_a, squad_b)
equal_var = levene_p > 0.05  # True = variâncias iguais, False = Welch

t_stat, p_value = stats.ttest_ind(squad_a, squad_b, equal_var=equal_var)

print(f"Media Squad A = {np.mean(squad_a):.1f} min")
print(f"Media Squad B = {np.mean(squad_b):.1f} min")
print(f"Variâncias iguais: {equal_var}")
print(f"t = {t_stat:.4f}, p-value = {p_value:.4f}")
```

### t-test pareado

```python
# Contexto: mesmo time, avaliar performance antes e depois de um treinamento
antes = [72, 68, 75, 80, 65, 70, 73, 77, 69, 74]
depois = [78, 74, 80, 85, 71, 76, 79, 83, 75, 80]

t_stat, p_value = stats.ttest_rel(antes, depois)
print(f"Diferenca media = {np.mean(np.array(depois) - np.array(antes)):.1f}")
print(f"t = {t_stat:.4f}, p-value = {p_value:.4f}")
```

---

## Qui-Quadrado: comparar frequências observadas vs. esperadas

O qui-quadrado testa se há associação entre variáveis categóricas ou se a distribuição observada segue a distribuição esperada.

### Teste de independência

```python
import pandas as pd

# Contexto: ha associacao entre categoria de incidente e equipe responsavel?
tabela = pd.crosstab(
    pd.Series(['Infra','Dev','Dev','Infra','Dev','Infra','Dev','Dev'], name='equipe'),
    pd.Series(['P1','P2','P1','P3','P2','P1','P3','P2'], name='prioridade')
)

chi2, p_value, dof, esperados = stats.chi2_contingency(tabela)

print(f"Chi2 = {chi2:.4f}")
print(f"Graus de liberdade = {dof}")
print(f"p-value = {p_value:.4f}")
```

---

## Armadilhas comuns

| Erro | Consequência | Como evitar |
|---|---|---|
| Não verificar normalidade antes do t-test | Resultado inválido para n pequeno | Shapiro-Wilk antes para n < 30 |
| Usar t-test independente em dados pareados | Perda de poder estatístico | Identifique o delineamento do estudo |
| Interpretar p-value > 0.05 como "prova de H0" | Conclusão errada | p alto = evidência insuficiente, não confirmação de H0 |
| p-hacking: testar múltiplas hipóteses sem correção | Inflação da taxa de erro tipo I | Use correção de Bonferroni ou FDR |

---

## Conclusão

A escolha correta do teste de hipótese começa antes de olhar os dados: entenda o delineamento do estudo, o tipo de variável e o que você quer inferir. O p-value é uma ferramenta útil, mas deve ser interpretado com o tamanho do efeito e o intervalo de confiança para uma decisão informada.

Próximos passos: estude o conceito de poder estatístico (1 - beta) e como calcular o tamanho de amostra necessário antes de coletar dados.
