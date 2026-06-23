---
title: "Guia — Algoritmos de Machine Learning"
section: Inteligência Artificial
type: guia
level: intermediário
updated: 2026-06-23
tags: [machine learning, scikit-learn, classificação, regressão, clustering, python]
---

# Guia — Algoritmos de Machine Learning

## Como escolher o algoritmo certo

```
Você tem dados rotulados (y)?
├── Sim → Aprendizado SUPERVISIONADO
│   ├── y é contínuo?  → REGRESSÃO
│   └── y é categoria? → CLASSIFICAÇÃO
└── Não → Aprendizado NÃO SUPERVISIONADO
    ├── Agrupar observações → CLUSTERING
    └── Reduzir dimensões  → REDUÇÃO DE DIMENSIONALIDADE
```

## Regressão

| Algoritmo | Quando usar | Prós | Contras |
|---|---|---|---|
| **Linear** | relação linear, baseline | simples, interpretável | não captura não-linearidade |
| **Ridge (L2)** | muitas features correlacionadas | reduz overfitting | não zera coeficientes |
| **Lasso (L1)** | seleção de features implícita | coeficientes podem ir a 0 | instável com features correlacionadas |
| **Elastic Net** | combina L1 + L2 | equilibrado | hiperparâmetro extra |
| **Regressão Polinomial** | relação curvilínea conhecida | flexível | overfitting fácil com grau alto |
| **Random Forest** | dados complexos, tabulares | robusto, pouca prep | menos interpretável |
| **Gradient Boosting** | máxima acurácia, tabular | estado da arte em tabular | lento, overfitting possível |

```python
from sklearn.linear_model import LinearRegression, Ridge, Lasso
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor

model = Ridge(alpha=1.0)
model.fit(X_train, y_train)
y_pred = model.predict(X_test)

# Métricas de regressão
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score
print(f"RMSE: {mean_squared_error(y_test, y_pred, squared=False):.3f}")
print(f"MAE:  {mean_absolute_error(y_test, y_pred):.3f}")
print(f"R²:   {r2_score(y_test, y_pred):.3f}")
```

## Classificação

| Algoritmo | Quando usar | Prós | Contras |
|---|---|---|---|
| **Logística** | baseline binária/multinomial | rápido, probabilidades calibradas | apenas fronteira linear |
| **KNN** | dataset pequeno, sem treino | intuitivo | lento na predição, sensível à escala |
| **SVM** | alta dimensionalidade, texto | robusto com margens | lento em n grande, kernel tuning |
| **Árvore de Decisão** | interpretabilidade exigida | visualizável, sem escala | overfitting, instável |
| **Random Forest** | geral, tabular | robusto, feature importance | pouco interpretável |
| **Gradient Boosting / XGBoost** | competições, tabular | acurácia máxima | custoso, muitos hiperparâmetros |
| **Naive Bayes** | texto, NLP | muito rápido | assume independência das features |

```python
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, confusion_matrix

model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)
y_pred = model.predict(X_test)

print(classification_report(y_test, y_pred))
print(confusion_matrix(y_test, y_pred))

# Probabilidades
y_proba = model.predict_proba(X_test)[:, 1]

# ROC-AUC
from sklearn.metrics import roc_auc_score
print(f"AUC: {roc_auc_score(y_test, y_proba):.3f}")
```

## Clustering

| Algoritmo | Parâmetros | Quando usar |
|---|---|---|
| **K-Means** | k (nº clusters) | clusters esféricos, n grande |
| **DBSCAN** | eps, min_samples | clusters arbitrários, ruído/outliers |
| **Hierárquico** | linkage, distância | k desconhecido, dendrograma |
| **Gaussian Mixture** | n_components | clusters com formas elípticas |

```python
from sklearn.cluster import KMeans, DBSCAN
from sklearn.metrics import silhouette_score

# K-Means + método do cotovelo
inertias = []
for k in range(2, 11):
    km = KMeans(n_clusters=k, random_state=42, n_init=10)
    km.fit(X)
    inertias.append(km.inertia_)

# Silhouette para validar k
km = KMeans(n_clusters=4, random_state=42, n_init=10)
labels = km.fit_predict(X)
print(f"Silhouette: {silhouette_score(X, labels):.3f}")

# DBSCAN
db = DBSCAN(eps=0.5, min_samples=5)
labels = db.fit_predict(X)   # -1 = ruído
```

## Pré-processamento obrigatório por família

| Algoritmo | Escala | Encoding | Nulos |
|---|---|---|---|
| Regressão Linear / Logística | StandardScaler | One-Hot | imputar |
| KNN, SVM | StandardScaler | One-Hot | imputar |
| Árvore, Random Forest, XGBoost | não necessário | Label ou Ordinal | suporta nativo (XGB) |
| K-Means | StandardScaler | One-Hot | imputar |
| Naive Bayes | MinMaxScaler | One-Hot | imputar |

```python
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.impute import SimpleImputer
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer

num_pipe = Pipeline([
    ('imputer', SimpleImputer(strategy='median')),
    ('scaler', StandardScaler())
])

cat_pipe = Pipeline([
    ('imputer', SimpleImputer(strategy='most_frequent')),
    ('encoder', OneHotEncoder(handle_unknown='ignore', sparse_output=False))
])

preprocessor = ColumnTransformer([
    ('num', num_pipe, num_features),
    ('cat', cat_pipe, cat_features)
])
```

## Validação e ajuste de hiperparâmetros

```python
from sklearn.model_selection import cross_val_score, GridSearchCV, StratifiedKFold

# Validação cruzada
cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
scores = cross_val_score(model, X, y, cv=cv, scoring='roc_auc')
print(f"AUC: {scores.mean():.3f} ± {scores.std():.3f}")

# Grid Search
param_grid = {'n_estimators': [100, 200], 'max_depth': [3, 5, None]}
gs = GridSearchCV(RandomForestClassifier(), param_grid, cv=5, scoring='roc_auc')
gs.fit(X_train, y_train)
print(gs.best_params_)
```

## Checklist antes de modelar

- Dados divididos em treino/teste antes de qualquer transformação
- Sem data leakage (informação do futuro no treino)
- Tratamento de desbalanceamento (`class_weight='balanced'` ou SMOTE)
- Baseline simples testada (DummyClassifier/DummyRegressor)
- Métricas alinhadas ao problema de negócio (recall vs precision vs AUC)
