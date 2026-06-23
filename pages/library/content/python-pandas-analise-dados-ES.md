<!-- translated from PT -->
---
title: "Cheatsheet — Pandas para Análisis de Datos"
section: Python
type: cheatsheet
level: intermediário
updated: 2026-06-23
tags: [pandas, python, dataframe, análisis de datos, limpieza, groupby, merge]
---

# Cheatsheet — Pandas para Análisis de Datos

## Importación y creación

```python
import pandas as pd
import numpy as np

# A partir de dict
df = pd.DataFrame({'col1': [1, 2], 'col2': ['a', 'b']})

# A partir de lista de dicts
df = pd.DataFrame([{'id': 1, 'nombre': 'Ana'}, {'id': 2, 'nombre': 'Bruno'}])

# Lectura de archivos
df = pd.read_csv('archivo.csv', sep=',', encoding='utf-8', parse_dates=['fecha'])
df = pd.read_excel('archivo.xlsx', sheet_name='Hoja1')
df = pd.read_json('archivo.json')
df = pd.read_parquet('archivo.parquet')

# Guardar
df.to_csv('salida.csv', index=False)
df.to_parquet('salida.parquet')
```

## Inspección rápida

```python
df.shape          # (filas, columnas)
df.dtypes         # tipos de cada columna
df.info()         # resumen completo con nulos
df.describe()     # estadísticas descriptivas
df.head(5)        # primeras 5 filas
df.tail(5)        # últimas 5 filas
df.sample(5)      # 5 filas aleatorias
df.columns.tolist()
df.index
df.nunique()      # valores únicos por columna
df.value_counts() # frecuencia (Series)
```

## Selección e indexación

```python
df['col']               # Series
df[['col1', 'col2']]    # DataFrame
df.loc[0]               # fila por label/índice
df.loc[0:2, ['col1']]   # slice por label
df.iloc[0:3, 1:3]       # slice por posición entera
df.loc[df['col'] > 5]   # filtro booleano
df.query("col > 5 and nombre == 'Ana'")  # query string
```

## Filtros y condiciones

```python
# Combinación de filtros
mask = (df['edad'] > 18) & (df['ciudad'] == 'SP')
df[mask]

# isin / ~isin
df[df['estado'].isin(['activo', 'pendiente'])]
df[~df['estado'].isin(['cancelado'])]

# nulos
df[df['col'].isna()]
df[df['col'].notna()]

# between
df[df['nota'].between(7, 10)]

# métodos str
df[df['nombre'].str.startswith('A')]
df[df['texto'].str.contains('python', case=False)]
```

## Limpieza de datos

```python
# Nulos
df.isna().sum()                          # conteo por columna
df.dropna()                              # elimina filas con cualquier nulo
df.dropna(subset=['col1', 'col2'])       # solo en las columnas especificadas
df.fillna(0)                             # reemplaza nulos por 0
df['col'].fillna(df['col'].median())     # reemplaza por la mediana

# Duplicados
df.duplicated().sum()
df.drop_duplicates()
df.drop_duplicates(subset=['id'])

# Tipos
df['col'] = df['col'].astype(int)
df['fecha'] = pd.to_datetime(df['fecha'], format='%d/%m/%Y')
df['valor'] = df['valor'].str.replace(',', '.').astype(float)

# Renombrar
df.rename(columns={'viejo': 'nuevo'}, inplace=True)

# Eliminar columnas
df.drop(columns=['col_inutil'])
```

## Transformaciones

```python
# Apply
df['col_nueva'] = df['col'].apply(lambda x: x * 2)
df['resultado'] = df.apply(lambda row: row['a'] + row['b'], axis=1)

# Map (sustitución de valores)
df['estado'] = df['codigo'].map({1: 'activo', 0: 'inactivo'})

# Creación de columna condicional
df['categoria'] = pd.cut(df['nota'], bins=[0, 6, 8, 10],
                         labels=['C', 'B', 'A'])

import numpy as np
df['rango'] = np.where(df['edad'] >= 18, 'adulto', 'menor')

# String
df['nombre_mayus'] = df['nombre'].str.upper()
df['apellido'] = df['nombre_completo'].str.split().str[-1]
```

## Agrupamiento y agregación

```python
# groupby básico
df.groupby('categoria')['valor'].sum()
df.groupby('categoria')['valor'].agg(['mean', 'std', 'count'])

# agg con dict
df.groupby('tienda').agg(
    ingreso_total=('valor', 'sum'),
    ticket_promedio=('valor', 'mean'),
    num_ventas=('valor', 'count')
).reset_index()

# pivot_table
pd.pivot_table(df, values='valor', index='mes', columns='categoria',
               aggfunc='sum', fill_value=0)

# crosstab (frecuencia)
pd.crosstab(df['genero'], df['estado'])
```

## Joins y combinaciones

```python
# merge (equivalente al SQL JOIN)
pd.merge(df1, df2, on='id', how='inner')   # inner, left, right, outer
pd.merge(df1, df2, left_on='id_a', right_on='id_b', how='left')

# concat (apilar DataFrames)
pd.concat([df1, df2], ignore_index=True)              # vertical
pd.concat([df1, df2], axis=1)                         # horizontal
```

## Fechas y tiempo

```python
df['fecha'] = pd.to_datetime(df['fecha'])
df['anio']  = df['fecha'].dt.year
df['mes']   = df['fecha'].dt.month
df['dia']   = df['fecha'].dt.day
df['dow']   = df['fecha'].dt.day_name()

# Diferencia entre fechas
df['dias'] = (df['fecha_fin'] - df['fecha_inicio']).dt.days

# Resample (series temporales)
df.set_index('fecha').resample('M')['valor'].sum()
```

## Rendimiento

| Situación | Preferir |
|---|---|
| Filtro simple | máscara booleana o `.query()` |
| Operación elemento a elemento | vectorización nativa (evitar `.apply()`) |
| Columnas string | accessor `.str` |
| Muchas columnas numéricas | `.select_dtypes(include='number')` |
| Archivo grande | `pd.read_csv(..., chunksize=10000)` o Parquet |
| Memoria | `df.astype({'col': 'int32'})`, categoricals |

```python
# Reducir memoria con categoricals
df['estado'] = df['estado'].astype('category')
```
