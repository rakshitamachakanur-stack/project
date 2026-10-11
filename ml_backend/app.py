
import os
from pathlib import Path
from functools import wraps
from datetime import datetime, timedelta, timezone

import bcrypt
import jwt
import joblib
import numpy as np
import pandas as pd
from bson import ObjectId
from dotenv import load_dotenv
from flask import Flask, request, jsonify, g
from flask_cors import CORS
from pymongo import MongoClient, ASCENDING
from pymongo.errors import DuplicateKeyError

load_dotenv(override=True)

app = Flask(__name__)
CORS(app)

# ---------- MongoDB ----------
mongo_uri = os.getenv("MONGODB_URI")
jwt_secret = os.getenv("JWT_SECRET")

if not mongo_uri:
    raise RuntimeError("MONGODB_URI is missing from .env")

if not jwt_secret or len(jwt_secret) < 32:
    raise RuntimeError("Set a strong JWT_SECRET in .env")

mongo_client = MongoClient(mongo_uri, serverSelectionTimeoutMS=10000)
db = mongo_client["pricepilot"]

users = db["users"]
products = db["products"]

users.create_index([("email", ASCENDING)], unique=True)
products.create_index([("owner_id", ASCENDING)])

# ---------- Existing ML model ----------
MODEL_PATH = Path(__file__).resolve().parent / "demand_model.joblib"
model = joblib.load(MODEL_PATH) if MODEL_PATH.exists() else None

FEATURES = [
    "product_name", "category", "selling_price_inr",
    "competitor_price_inr", "stock_available",
    "temperature_c", "rainfall_mm", "is_weekend", "is_festival"
]


# ---------- Helpers ----------
def json_safe_product(product):
    product["id"] = str(product.pop("_id"))
    product.pop("owner_id", None)
    product.pop("created_at", None)
    product.pop("updated_at", None)
    return product


def token_required(function):
    @wraps(function)
    def wrapper(*args, **kwargs):
        header = request.headers.get("Authorization", "")
        parts = header.split()

        if len(parts) != 2 or parts[0].lower() != "bearer":
            return jsonify({"error": "Authentication token required"}), 401

        try:
            payload = jwt.decode(
                parts[1],
                jwt_secret,
                algorithms=["HS256"]
            )
            user_id = ObjectId(payload["sub"])
            user = users.find_one({"_id": user_id})

            if not user:
                return jsonify({"error": "Account not found"}), 401

            g.user = user

        except (jwt.InvalidTokenError, ValueError, KeyError):
            return jsonify({"error": "Invalid or expired token"}), 401

        return function(*args, **kwargs)

    return wrapper


def make_token(user):
    return jwt.encode(
        {
            "sub": str(user["_id"]),
            "exp": datetime.now(timezone.utc) + timedelta(hours=12)
        },
        jwt_secret,
        algorithm="HS256"
    )


# ---------- Health ----------
@app.get("/")
def home():
    return jsonify({
        "project": "PricePilot AI",
        "status": "running",
        "model_loaded": model is not None,
        "database": "pricepilot",
        "endpoints": [
            "/api/auth/register",
            "/api/auth/login",
            "/api/auth/me",
            "/api/products",
            "/api/predict-demand",
            "/api/recommend-price"
        ]
    })


# ---------- Registration ----------
@app.post("/api/auth/register")
def register():
    data = request.get_json(silent=True) or {}

    name = str(data.get("name", "")).strip()
    email = str(data.get("email", "")).strip().lower()
    password = data.get("password", "")

    if not name or not email or not isinstance(password, str):
        return jsonify({"error": "Name, email and password are required"}), 400

    if "@" not in email or len(email) > 254:
        return jsonify({"error": "Enter a valid email address"}), 400

    if len(password) < 8 or len(password) > 72:
        return jsonify({"error": "Password must be 8–72 characters"}), 400

    password_hash = bcrypt.hashpw(
        password.encode("utf-8"),
        bcrypt.gensalt()
    )

    user = {
        "name": name,
        "email": email,
        "password_hash": password_hash,
        "created_at": datetime.now(timezone.utc)
    }

    try:
        result = users.insert_one(user)
    except DuplicateKeyError:
        return jsonify({"error": "An account with this email already exists"}), 409

    user["_id"] = result.inserted_id

    return jsonify({
        "message": "Account created successfully",
        "token": make_token(user),
        "user": {
            "id": str(user["_id"]),
            "name": user["name"],
            "email": user["email"]
        }
    }), 201


# ---------- Login ----------
@app.post("/api/auth/login")
def login():
    data = request.get_json(silent=True) or {}

    email = str(data.get("email", "")).strip().lower()
    password = data.get("password", "")

    if not email or not isinstance(password, str):
        return jsonify({"error": "Email and password are required"}), 400

    user = users.find_one({"email": email})

    if not user or not bcrypt.checkpw(
        password.encode("utf-8"),
        user["password_hash"]
    ):
        return jsonify({"error": "Invalid email or password"}), 401

    return jsonify({
        "message": "Login successful",
        "token": make_token(user),
        "user": {
            "id": str(user["_id"]),
            "name": user["name"],
            "email": user["email"]
        }
    })


# ---------- Current account ----------
@app.get("/api/auth/me")
@token_required
def current_user():
    return jsonify({
        "user": {
            "id": str(g.user["_id"]),
            "name": g.user["name"],
            "email": g.user["email"]
        }
    })


# ---------- Create and list merchant products ----------
@app.route("/api/products", methods=["GET", "POST"])
@token_required
def product_collection():
    if request.method == "GET":
        items = products.find({"owner_id": g.user["_id"]}).sort(
            "created_at", -1
        )
        return jsonify({"products": [json_safe_product(p) for p in items]})

    data = request.get_json(silent=True)

    if not isinstance(data, dict):
        return jsonify({"error": "Send a JSON product object"}), 400

    if not str(data.get("name") or data.get("product_name") or "").strip():
        return jsonify({"error": "Product name is required"}), 400

    now = datetime.now(timezone.utc)
    product = {
        **data,
        "owner_id": g.user["_id"],
        "created_at": now,
        "updated_at": now
    }

    result = products.insert_one(product)
    product["_id"] = result.inserted_id

    return jsonify({
        "message": "Product created",
        "product": json_safe_product(product)
    }), 201


# ---------- Edit and delete merchant products ----------
@app.route("/api/products/<product_id>", methods=["PUT", "PATCH", "DELETE"])
@token_required
def product_detail(product_id):
    try:
        oid = ObjectId(product_id)
    except Exception:
        return jsonify({"error": "Invalid product ID"}), 400

    query = {"_id": oid, "owner_id": g.user["_id"]}

    existing = products.find_one(query)
    if not existing:
        return jsonify({"error": "Product not found"}), 404

    if request.method == "DELETE":
        products.delete_one(query)
        return jsonify({"message": "Product deleted"})

    data = request.get_json(silent=True)
    if not isinstance(data, dict):
        return jsonify({"error": "Send a JSON product object"}), 400

    # Never allow clients to change ownership or database metadata.
    protected = {
        "_id", "id", "owner_id", "created_at",
        "updated_at", "password_hash"
    }
    updates = {k: v for k, v in data.items() if k not in protected}

    if not updates:
        return jsonify({"error": "No editable product fields supplied"}), 400

    updates["updated_at"] = datetime.now(timezone.utc)

    products.update_one(query, {"$set": updates})
    updated = products.find_one(query)

    return jsonify({
        "message": "Product updated",
        "product": json_safe_product(updated)
    })


# ---------- Existing demand prediction ----------
@app.post("/api/predict-demand")
def predict_demand():
    if model is None:
        return jsonify({"error": "Model not found. Run train_model.py first."}), 503

    payload = request.get_json(silent=True) or {}
    missing = [f for f in FEATURES if f not in payload]

    if missing:
        return jsonify({"error": "Missing fields", "fields": missing}), 400

    row = {f: payload[f] for f in FEATURES}
    X = pd.DataFrame([row], columns=FEATURES)
    prediction = max(0, float(model.predict(X)[0]))

    return jsonify({
        "predicted_units_sold": round(prediction, 2),
        "note": "Prediction is based on synthetic demo data, not validated real-world sales."
    })


# ---------- Existing price recommendation ----------
@app.post("/api/recommend-price")
def recommend_price():
    if model is None:
        return jsonify({"error": "Model not found. Run train_model.py first."}), 503

    payload = request.get_json(silent=True) or {}
    required = FEATURES + ["base_price_inr", "unit_cost_inr"]
    missing = [f for f in required if f not in payload]

    if missing:
        return jsonify({"error": "Missing fields", "fields": missing}), 400

    try:
        base_price = float(payload["base_price_inr"])
        unit_cost = float(payload["unit_cost_inr"])
        competitor = float(payload["competitor_price_inr"])
        stock = max(0, int(payload["stock_available"]))

        if not all(map(lambda x: np.isfinite(x), [
            base_price, unit_cost, competitor
        ])):
            raise ValueError()

        if base_price <= 0 or competitor < 0 or unit_cost < 0:
            raise ValueError()

    except (ValueError, TypeError):
        return jsonify({"error": "Prices and stock must be valid numbers"}), 400

    candidate = 0.5 * base_price + 0.5 * competitor
    candidate = max(unit_cost * 1.05, min(candidate, base_price * 1.10))

    if stock < 10:
        candidate *= 1.03
    if stock > 100:
        candidate *= 0.98

    candidate = round(max(unit_cost * 1.02, candidate), 2)

    row = {f: payload[f] for f in FEATURES}
    row["selling_price_inr"] = candidate
    predicted_units = max(
        0,
        float(model.predict(pd.DataFrame([row], columns=FEATURES))[0])
    )

    return jsonify({
        "recommended_price_inr": candidate,
        "predicted_units_sold": round(predicted_units, 2),
        "estimated_revenue_inr": round(candidate * predicted_units, 2),
        "estimated_gross_profit_inr": round(
            (candidate - unit_cost) * predicted_units, 2
        ),
        "explanation": [
            "Price starts from the base and competitor price.",
            "A small stock-based adjustment is applied.",
            "The demand estimate comes from a Random Forest model.",
            "The price selection itself is a transparent heuristic, not a learned optimum."
        ],
        "demo_warning": "Synthetic-data prototype only. Validate with real sales and cost data before real pricing decisions."
    })


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5001, debug=True)
