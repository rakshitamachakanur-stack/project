# PricePilot AI — ML starter

This starter adds a Python Flask API and a Random Forest regression model to predict daily units sold from the provided synthetic dataset.

## Files
- `train_model.py`: trains and evaluates the demand model.
- `app.py`: API endpoints for demand prediction and a transparent demo price suggestion.
- `requirements.txt`: Python dependencies.

## Setup (Windows / VS Code)

1. Copy `pricepilot_synthetic_retail_data.csv` into this folder.
2. Open a terminal in this folder and run:

   ```bash
   python -m venv .venv
   .venv\Scripts\activate
   pip install -r requirements.txt
   python train_model.py
   python app.py
   ```

3. API runs at `http://127.0.0.1:5001`.

## Test demand prediction

Send a POST request to `http://127.0.0.1:5001/api/predict-demand` with JSON:

```json
{
  "product_name": "Milk 500ml",
  "category": "Dairy",
  "selling_price_inr": 32,
  "competitor_price_inr": 28,
  "stock_available": 120,
  "temperature_c": 27,
  "rainfall_mm": 2,
  "is_weekend": 1,
  "is_festival": 0
}
```

## Test price recommendation

Send a POST request to `http://127.0.0.1:5001/api/recommend-price` with the same fields plus:

```json
{
  "base_price_inr": 32,
  "unit_cost_inr": 22
}
```

Use Postman or curl to test the endpoints. The price suggestion is currently a transparent heuristic; the model predicts demand. It is **not** a learned optimal price.

## Connect from React

Use Axios in your React frontend:

```js
import axios from "axios";

const response = await axios.post("http://127.0.0.1:5001/api/predict-demand", {
  product_name: "Milk 500ml",
  category: "Dairy",
  selling_price_inr: 32,
  competitor_price_inr: 28,
  stock_available: 120,
  temperature_c: 27,
  rainfall_mm: 2,
  is_weekend: 1,
  is_festival: 0
});

console.log(response.data.predicted_units_sold);
```

## Important limitation
The dataset is synthetic, and its generator does not make sales respond directly to selling price. This is suitable for a hackathon prototype and API integration practice, but not for claiming real-world accuracy or price elasticity. A stronger next step is to update the synthetic generator so demand responds realistically to price, then compare against a time-based holdout set.
