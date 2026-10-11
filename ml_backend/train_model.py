import pandas as pd
import joblib
from sklearn.compose import ColumnTransformer
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, r2_score
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder

DATA_PATH = "pricepilot_synthetic_retail_data.csv"
TARGET = "units_sold"
FEATURES = [
    "product_name", "category", "selling_price_inr", "competitor_price_inr",
    "stock_available", "temperature_c", "rainfall_mm", "is_weekend", "is_festival"
]
CATEGORICAL = ["product_name", "category"]
NUMERIC = [c for c in FEATURES if c not in CATEGORICAL]

df = pd.read_csv(DATA_PATH)
X = df[FEATURES]
y = df[TARGET]

preprocessor = ColumnTransformer(
    transformers=[
        ("categorical", OneHotEncoder(handle_unknown="ignore"), CATEGORICAL),
        ("numeric", "passthrough", NUMERIC),
    ]
)

pipeline = Pipeline([
    ("preprocessor", preprocessor),
    ("model", RandomForestRegressor(
        n_estimators=250, min_samples_leaf=2, random_state=42, n_jobs=-1
    )),
])

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)
pipeline.fit(X_train, y_train)
predictions = pipeline.predict(X_test)

print(f"Training rows: {len(X_train):,}")
print(f"Testing rows: {len(X_test):,}")
print(f"MAE: {mean_absolute_error(y_test, predictions):.2f} units")
print(f"R²: {r2_score(y_test, predictions):.3f}")
joblib.dump(pipeline, "demand_model.joblib")
print("Saved model to demand_model.joblib")
print("Reminder: data is synthetic and price does not directly drive generated sales.")
