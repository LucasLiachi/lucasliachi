<!-- translated from PT -->
---
title: "Guide — Machine Learning Algorithms"
section: Inteligência Artificial
type: guia
level: intermediário
updated: 2026-06-23
tags: [machine learning, scikit-learn, classification, regression, clustering, python]
---

# Guide — Machine Learning Algorithms

## How to choose the right algorithm

```
Do you have labeled data (y)?
├── Yes → SUPERVISED learning
│   ├── y is continuous? → REGRESSION
│   └── y is a category? → CLASSIFICATION
└── No → UNSUPERVISED learning
    ├── Group observations → CLUSTERING
    └── Reduce dimensions  → DIMENSIONALITY REDUCTION
```

## Regression

| Algorithm | When to use | Pros | Cons |
|---|---|---|---|
| **Linear** | linear relationship, baseline | simple, interpretable | does not capture non-linearity |
| **Ridge (L2)** | many correlated features | reduces overfitting | does not zero coefficients |
| **Lasso (L1)** | implicit feature selection | coefficients can go to 0 | unstable with correlated features |
| **Elastic Net** | combines L1 + L2 | balanced | extra hyperparameter |
| **Polynomial Regression** | known curvilinear relationship | flexible | easy overfitting with high degree |
| **Random Forest** | complex, tabular data | robust, little prep | less interpretable |
| **Gradient Boosting** | maximum accuracy, tabular | state of the art on tabular | slow, possible overfitting |

```python
from sklearn.linear_model import LinearRegression, Ridge, Lasso
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor

model = Ridge(alpha=1.0)
model.fit(X_train, y_train)
y_pred = model.predict(X_test)

# Regression metrics
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score
print(f"RMSE: {mean_squared_error(y_test, y_pred, squared=False):.3f}")
print(f"MAE:  {mean_absolute_error(y_test, y_pred):.3f}")
print(f"R²:   {r2_score(y_test, y_pred):.3f}")
```

## Classification

| Algorithm | When to use | Pros | Cons |
|---|---|---|---|
| **Logistic** | binary/multinomial baseline | fast, calibrated probabilities | linear boundary only |
| **KNN** | small dataset, no training | intuitive | slow at prediction, scale-sensitive |
| **SVM** | high dimensionality, text | robust with margins | slow for large n, kernel tuning |
| **Decision Tree** | interpretability required | visualizable, scale-free | overfitting, unstable |
| **Random Forest** | general, tabular | robust, feature importance | little interpretable |
| **Gradient Boosting / XGBoost** | competitions, tabular | maximum accuracy | costly, many hyperparameters |
| **Naive Bayes** | text, NLP | very fast | assumes feature independence |

```python
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, confusion_matrix

model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)
y_pred = model.predict(X_test)

print(classification_report(y_test, y_pred))
print(confusion_matrix(y_test, y_pred))

# Probabilities
y_proba = model.predict_proba(X_test)[:, 1]

# ROC-AUC
from sklearn.metrics import roc_auc_score
print(f"AUC: {roc_auc_score(y_test, y_proba):.3f}")
```

## Clustering

| Algorithm | Parameters | When to use |
|---|---|---|
| **K-Means** | k (# clusters) | spherical clusters, large n |
| **DBSCAN** | eps, min_samples | arbitrary clusters, noise/outliers |
| **Hierarchical** | linkage, distance | unknown k, dendrogram |
| **Gaussian Mixture** | n_components | elliptical-shaped clusters |

```python
from sklearn.cluster import KMeans, DBSCAN
from sklearn.metrics import silhouette_score

# K-Means + elbow method
inertias = []
for k in range(2, 11):
    km = KMeans(n_clusters=k, random_state=42, n_init=10)
    km.fit(X)
    inertias.append(km.inertia_)

# Silhouette to validate k
km = KMeans(n_clusters=4, random_state=42, n_init=10)
labels = km.fit_predict(X)
print(f"Silhouette: {silhouette_score(X, labels):.3f}")

# DBSCAN
db = DBSCAN(eps=0.5, min_samples=5)
labels = db.fit_predict(X)   # -1 = noise
```

## Mandatory preprocessing by algorithm family

| Algorithm | Scaling | Encoding | Nulls |
|---|---|---|---|
| Linear / Logistic Regression | StandardScaler | One-Hot | impute |
| KNN, SVM | StandardScaler | One-Hot | impute |
| Tree, Random Forest, XGBoost | not needed | Label or Ordinal | native support (XGB) |
| K-Means | StandardScaler | One-Hot | impute |
| Naive Bayes | MinMaxScaler | One-Hot | impute |

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

## Validation and hyperparameter tuning

```python
from sklearn.model_selection import cross_val_score, GridSearchCV, StratifiedKFold

# Cross-validation
cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
scores = cross_val_score(model, X, y, cv=cv, scoring='roc_auc')
print(f"AUC: {scores.mean():.3f} ± {scores.std():.3f}")

# Grid Search
param_grid = {'n_estimators': [100, 200], 'max_depth': [3, 5, None]}
gs = GridSearchCV(RandomForestClassifier(), param_grid, cv=5, scoring='roc_auc')
gs.fit(X_train, y_train)
print(gs.best_params_)
```

## Pre-modeling checklist

- Data split into train/test before any transformation
- No data leakage (future information in training set)
- Handling class imbalance (`class_weight='balanced'` or SMOTE)
- Simple baseline tested (DummyClassifier/DummyRegressor)
- Metrics aligned to the business problem (recall vs precision vs AUC)
