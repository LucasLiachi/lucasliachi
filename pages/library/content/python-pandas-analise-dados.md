---
title: "Cheatsheet — Pandas para Análise de Dados"
section: Python
type: cheatsheet
level: intermediário
updated: 2026-06-23
tags: [pandas, python, dataframe, análise de dados, limpeza, groupby, merge]
---

# Cheatsheet — Pandas para Análise de Dados

## Importação e criação

```python
import pandas as pd
import numpy as np

# A partir de dict
df = pd.DataFrame({'col1': [1, 2], 'col2': ['a', 'b']})

# A partir de lista de dicts
df = pd.DataFrame([{'id': 1, 'nome': 'Ana'}, {'id': 2, 'nome': 'Bruno'}])

# Leitura de arquivos
df = pd.read_csv('arquivo.csv', sep=',', encoding='utf-8', parse_dates=['data'])
df = pd.read_excel('arquivo.xlsx', sheet_name='Plan1')
df = pd.read_json('arquivo.json')
df = pd.read_parquet('arquivo.parquet')

# Salvar
df.to_csv('saida.csv', index=False)
df.to_parquet('saida.parquet')
```

## Inspeção rápida

```python
df.shape          # (linhas, colunas)
df.dtypes         # tipos de cada coluna
df.info()         # resumo completo com nulos
df.describe()     # estatísticas descritivas
df.head(5)        # primeiras 5 linhas
df.tail(5)        # últimas 5 linhas
df.sample(5)      # 5 linhas aleatórias
df.columns.tolist()
df.index
df.nunique()      # valores únicos por coluna
df.value_counts() # frequência (Series)
```

## Seleção e indexação

```python
df['col']               # Series
df[['col1', 'col2']]    # DataFrame
df.loc[0]               # linha por label/índice
df.loc[0:2, ['col1']]   # slice por label
df.iloc[0:3, 1:3]       # slice por posição inteira
df.loc[df['col'] > 5]   # filtro booleano
df.query("col > 5 and nome == 'Ana'")  # query string
```

## Filtros e condições

```python
# Combinação de filtros
mask = (df['idade'] > 18) & (df['cidade'] == 'SP')
df[mask]

# isin / ~isin
df[df['status'].isin(['ativo', 'pendente'])]
df[~df['status'].isin(['cancelado'])]

# nulos
df[df['col'].isna()]
df[df['col'].notna()]

# between
df[df['nota'].between(7, 10)]

# str methods
df[df['nome'].str.startswith('A')]
df[df['texto'].str.contains('python', case=False)]
```

## Limpeza de dados

```python
# Nulos
df.isna().sum()                          # contagem por coluna
df.dropna()                              # remove linhas com qualquer nulo
df.dropna(subset=['col1', 'col2'])       # apenas nas colunas especificadas
df.fillna(0)                             # substitui nulos por 0
df['col'].fillna(df['col'].median())     # substitui pela mediana

# Duplicatas
df.duplicated().sum()
df.drop_duplicates()
df.drop_duplicates(subset=['id'])

# Tipos
df['col'] = df['col'].astype(int)
df['data'] = pd.to_datetime(df['data'], format='%d/%m/%Y')
df['valor'] = df['valor'].str.replace(',', '.').astype(float)

# Renomear
df.rename(columns={'old': 'new'}, inplace=True)

# Remover colunas
df.drop(columns=['col_inutil'])
```

## Transformações

```python
# Apply
df['col_nova'] = df['col'].apply(lambda x: x * 2)
df['resultado'] = df.apply(lambda row: row['a'] + row['b'], axis=1)

# Map (substituição de valores)
df['status'] = df['codigo'].map({1: 'ativo', 0: 'inativo'})

# Criação de coluna condicional
df['categoria'] = pd.cut(df['nota'], bins=[0, 6, 8, 10],
                         labels=['C', 'B', 'A'])

import numpy as np
df['faixa'] = np.where(df['idade'] >= 18, 'adulto', 'menor')

# String
df['nome_upper'] = df['nome'].str.upper()
df['sobrenome'] = df['nome_completo'].str.split().str[-1]
```

## Agrupamento e agregação

```python
# groupby básico
df.groupby('categoria')['valor'].sum()
df.groupby('categoria')['valor'].agg(['mean', 'std', 'count'])

# agg com dict
df.groupby('loja').agg(
    receita_total=('valor', 'sum'),
    ticket_medio=('valor', 'mean'),
    num_vendas=('valor', 'count')
).reset_index()

# pivot_table
pd.pivot_table(df, values='valor', index='mes', columns='categoria',
               aggfunc='sum', fill_value=0)

# crosstab (frequência)
pd.crosstab(df['genero'], df['status'])
```

## Joins e combinações

```python
# merge (equivalente ao SQL JOIN)
pd.merge(df1, df2, on='id', how='inner')   # inner, left, right, outer
pd.merge(df1, df2, left_on='id_a', right_on='id_b', how='left')

# concat (empilhar DataFrames)
pd.concat([df1, df2], ignore_index=True)              # vertical
pd.concat([df1, df2], axis=1)                         # horizontal
```

## Datas e tempo

```python
df['data'] = pd.to_datetime(df['data'])
df['ano']    = df['data'].dt.year
df['mes']    = df['data'].dt.month
df['dia']    = df['data'].dt.day
df['dow']    = df['data'].dt.day_name()

# Diferença entre datas
df['dias'] = (df['data_fim'] - df['data_inicio']).dt.days

# Resample (séries temporais)
df.set_index('data').resample('M')['valor'].sum()
```

## Performance

| Situação | Preferir |
|---|---|
| Filtro simples | boolean mask ou `.query()` |
| Operação elemento a elemento | vetorização nativa (evite `.apply()`) |
| Colunas string | `.str` accessor |
| Muitas colunas numéricas | `.select_dtypes(include='number')` |
| Arquivo grande | `pd.read_csv(..., chunksize=10000)` ou Parquet |
| Memória | `df.astype({'col': 'int32'})`, categoricals |

```python
# Reduzir memória com categoricals
df['status'] = df['status'].astype('category')
```
