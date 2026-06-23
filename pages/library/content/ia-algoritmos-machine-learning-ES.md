<!-- translated from PT -->
---
title: "Guía — Algoritmos de Machine Learning"
section: Inteligência Artificial
type: guia
level: intermediário
updated: 2026-06-23
tags: [machine learning, scikit-learn, clasificación, regresión, clustering, python]
---

# Guía — Algoritmos de Machine Learning

## Cómo elegir el algoritmo correcto

```
¿Tienes datos etiquetados (y)?
├── Sí → Aprendizaje SUPERVISADO
│   ├── ¿y es continuo?  → REGRESIÓN
│   └── ¿y es categoría? → CLASIFICACIÓN
└── No → Aprendizaje NO SUPERVISADO
    ├── Agrupar observaciones → CLUSTERING
    └── Reducir dimensiones  → REDUCCIÓN DE DIMENSIONALIDAD
```

## Regresión

| Algoritmo | Cuándo usar | Pros | Contras |
|---|---|---|---|
| **Lineal** | relación lineal, baseline | simple, interpretable | no captura no-linealidad |
| **Ridge (L2)** | muchas features correlacionadas | reduce overfitting | no pone coeficientes en 0 |
| **Lasso (L1)** | selección implícita de features | coeficientes pueden ir a 0 | inestable con features correlacionadas |
| **Elastic Net** | combina L1 + L2 | equilibrado | hiperparámetro extra |
| **Regresión Polinomial** | relación curvilínea conocida | flexible | overfitting fácil con grado alto |
| **Random Forest** | datos complejos, tabulares | robusto, poca preparación | menos interpretable |
| **Gradient Boosting** | máxima precisión, tabular | estado del arte en tabular | lento, posible overfitting |

```python
from sklearn.linear_model import LinearRegression, Ridge, Lasso
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor

model = Ridge(alpha=1.0)
model.fit(X_train, y_train)
y_pred = model.predict(X_test)

# Métricas de regresión
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score
print(f"RMSE: {mean_squared_error(y_test, y_pred, squared=False):.3f}")
print(f"MAE:  {mean_absolute_error(y_test, y_pred):.3f}")
print(f"R²:   {r2_score(y_test, y_pred):.3f}")
```

## Clasificación

| Algoritmo | Cuándo usar | Pros | Contras |
|---|---|---|---|
| **Logística** | baseline binaria/multinomial | rápido, probabilidades calibradas | solo frontera lineal |
| **KNN** | dataset pequeño, sin entrenamiento | intuitivo | lento en predicción, sensible a la escala |
| **SVM** | alta dimensionalidad, texto | robusto con márgenes | lento para n grande, ajuste de kernel |
| **Árbol de Decisión** | interpretabilidad requerida | visualizable, sin escala | overfitting, inestable |
| **Random Forest** | general, tabular | robusto, feature importance | poco interpretable |
| **Gradient Boosting / XGBoost** | competencias, tabular | precisión máxima | costoso, muchos hiperparámetros |
| **Naive Bayes** | texto, NLP | muy rápido | asume independencia de features |

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

| Algoritmo | Parámetros | Cuándo usar |
|---|---|---|
| **K-Means** | k (nº clusters) | clusters esféricos, n grande |
| **DBSCAN** | eps, min_samples | clusters arbitrarios, ruido/outliers |
| **Jerárquico** | linkage, distancia | k desconocido, dendrograma |
| **Gaussian Mixture** | n_components | clusters con formas elípticas |

```python
from sklearn.cluster import KMeans, DBSCAN
from sklearn.metrics import silhouette_score

# K-Means + método del codo
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
labels = db.fit_predict(X)   # -1 = ruido
```

## Preprocesamiento obligatorio por familia

| Algoritmo | Escala | Encoding | Nulos |
|---|---|---|---|
| Regresión Lineal / Logística | StandardScaler | One-Hot | imputar |
| KNN, SVM | StandardScaler | One-Hot | imputar |
| Árbol, Random Forest, XGBoost | no necesario | Label u Ordinal | soporte nativo (XGB) |
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

## Validación y ajuste de hiperparámetros

```python
from sklearn.model_selection import cross_val_score, GridSearchCV, StratifiedKFold

# Validación cruzada
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

- Datos divididos en entrenamiento/prueba antes de cualquier transformación
- Sin fuga de datos (información del futuro en el entrenamiento)
- Tratamiento del desbalanceo de clases (`class_weight='balanced'` o SMOTE)
- Baseline simple probado (DummyClassifier/DummyRegressor)
- Métricas alineadas al problema de negocio (recall vs precision vs AUC)
