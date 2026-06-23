<!-- translated from PT -->
---
title: "Cheatsheet — Pandas for Data Analysis"
section: Python
type: cheatsheet
level: intermediário
updated: 2026-06-23
tags: [pandas, python, dataframe, data analysis, cleaning, groupby, merge]
---

# Cheatsheet — Pandas for Data Analysis

## Import and creation

```python
import pandas as pd
import numpy as np

# From dict
df = pd.DataFrame({'col1': [1, 2], 'col2': ['a', 'b']})

# From list of dicts
df = pd.DataFrame([{'id': 1, 'name': 'Ana'}, {'id': 2, 'name': 'Bruno'}])

# Read files
df = pd.read_csv('file.csv', sep=',', encoding='utf-8', parse_dates=['date'])
df = pd.read_excel('file.xlsx', sheet_name='Sheet1')
df = pd.read_json('file.json')
df = pd.read_parquet('file.parquet')

# Save
df.to_csv('output.csv', index=False)
df.to_parquet('output.parquet')
```

## Quick inspection

```python
df.shape          # (rows, columns)
df.dtypes         # types of each column
df.info()         # full summary with nulls
df.describe()     # descriptive statistics
df.head(5)        # first 5 rows
df.tail(5)        # last 5 rows
df.sample(5)      # 5 random rows
df.columns.tolist()
df.index
df.nunique()      # unique values per column
df.value_counts() # frequency (Series)
```

## Selection and indexing

```python
df['col']               # Series
df[['col1', 'col2']]    # DataFrame
df.loc[0]               # row by label/index
df.loc[0:2, ['col1']]   # slice by label
df.iloc[0:3, 1:3]       # slice by integer position
df.loc[df['col'] > 5]   # boolean filter
df.query("col > 5 and name == 'Ana'")  # query string
```

## Filters and conditions

```python
# Combining filters
mask = (df['age'] > 18) & (df['city'] == 'SP')
df[mask]

# isin / ~isin
df[df['status'].isin(['active', 'pending'])]
df[~df['status'].isin(['cancelled'])]

# nulls
df[df['col'].isna()]
df[df['col'].notna()]

# between
df[df['score'].between(7, 10)]

# str methods
df[df['name'].str.startswith('A')]
df[df['text'].str.contains('python', case=False)]
```

## Data cleaning

```python
# Nulls
df.isna().sum()                          # count per column
df.dropna()                              # remove rows with any null
df.dropna(subset=['col1', 'col2'])       # only in specified columns
df.fillna(0)                             # replace nulls with 0
df['col'].fillna(df['col'].median())     # replace with median

# Duplicates
df.duplicated().sum()
df.drop_duplicates()
df.drop_duplicates(subset=['id'])

# Types
df['col'] = df['col'].astype(int)
df['date'] = pd.to_datetime(df['date'], format='%d/%m/%Y')
df['value'] = df['value'].str.replace(',', '.').astype(float)

# Rename
df.rename(columns={'old': 'new'}, inplace=True)

# Remove columns
df.drop(columns=['useless_col'])
```

## Transformations

```python
# Apply
df['new_col'] = df['col'].apply(lambda x: x * 2)
df['result'] = df.apply(lambda row: row['a'] + row['b'], axis=1)

# Map (value substitution)
df['status'] = df['code'].map({1: 'active', 0: 'inactive'})

# Conditional column creation
df['category'] = pd.cut(df['score'], bins=[0, 6, 8, 10],
                        labels=['C', 'B', 'A'])

import numpy as np
df['range'] = np.where(df['age'] >= 18, 'adult', 'minor')

# String
df['name_upper'] = df['name'].str.upper()
df['last_name'] = df['full_name'].str.split().str[-1]
```

## Grouping and aggregation

```python
# basic groupby
df.groupby('category')['value'].sum()
df.groupby('category')['value'].agg(['mean', 'std', 'count'])

# agg with dict
df.groupby('store').agg(
    total_revenue=('value', 'sum'),
    avg_ticket=('value', 'mean'),
    num_sales=('value', 'count')
).reset_index()

# pivot_table
pd.pivot_table(df, values='value', index='month', columns='category',
               aggfunc='sum', fill_value=0)

# crosstab (frequency)
pd.crosstab(df['gender'], df['status'])
```

## Joins and combinations

```python
# merge (equivalent to SQL JOIN)
pd.merge(df1, df2, on='id', how='inner')   # inner, left, right, outer
pd.merge(df1, df2, left_on='id_a', right_on='id_b', how='left')

# concat (stack DataFrames)
pd.concat([df1, df2], ignore_index=True)              # vertical
pd.concat([df1, df2], axis=1)                         # horizontal
```

## Dates and time

```python
df['date'] = pd.to_datetime(df['date'])
df['year']    = df['date'].dt.year
df['month']   = df['date'].dt.month
df['day']     = df['date'].dt.day
df['dow']     = df['date'].dt.day_name()

# Date difference
df['days'] = (df['end_date'] - df['start_date']).dt.days

# Resample (time series)
df.set_index('date').resample('M')['value'].sum()
```

## Performance

| Situation | Prefer |
|---|---|
| Simple filter | boolean mask or `.query()` |
| Element-wise operation | native vectorization (avoid `.apply()`) |
| String columns | `.str` accessor |
| Many numeric columns | `.select_dtypes(include='number')` |
| Large file | `pd.read_csv(..., chunksize=10000)` or Parquet |
| Memory | `df.astype({'col': 'int32'})`, categoricals |

```python
# Reduce memory with categoricals
df['status'] = df['status'].astype('category')
```
