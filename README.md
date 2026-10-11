<<<<<<< HEAD
# PricePilot AI — Intelligent Pricing Copilot for Small Businesses

> **“PricePilot AI predicts demand, compares competitors, recommends a safe and profitable price, explains the recommendation in simple language, and changes the price only after the seller approves it.”**

---

## 🚀 Overview

**PricePilot AI** is a modern, production-grade SaaS pricing assistant built specifically for neighborhood retailers, grocery stores (kiranas), online sellers, and quick-service cafes.

### 📌 The Problem
Small sellers typically set prices by guesswork or simple cost-plus rules. Demand constantly fluctuates based on:
- Local weather & heatwaves (e.g. cold drinks and ice creams surge in 34°C+ heat; umbrellas surge during monsoons)
- Festivals & holidays (e.g. Ganesh Chaturthi, Diwali)
- Shelf stock velocity & expiry risks
- Nearby competitor pricing moves

Underpricing bleeds hard-earned profit margins, while overpricing kills customer footfall. Meanwhile, enterprise pricing software costs thousands of dollars a month and blindly copies competitor prices.

### 💡 The Solution
PricePilot AI analyzes local signals, forecasts daily demand, benchmarks rival shops, and presents a **transparent, human-approved price recommendation**.
- **The system NEVER automatically changes the seller's price without explicit approval.**
- Provides a conversational **"Why this price?"** explanation in plain language.
- Highlights exact profit improvements per unit and total daily forecast before committing.

---

## 🌟 Key Features

1. **Stunning Public Landing Page (`LandingPage.tsx`)**
   - High-conversion hero section: *"Price Smarter. Sell Better."*
   - **Interactive Live Demo Simulator**: Judges and visitors can slide temperature, toggle rain, or enable festive mode to test the real-time AI pricing engine without logging in.
   - 5-step visual workflow, feature grid, and merchant testimonials.

2. **Professional Authentication & 1-Click Demo Login (`AuthPage.tsx`)**
   - Split-screen modern design with glassmorphism cards.
   - Login, Sign Up, and Forgot Password workflows.
   - **One-Click "Demo Account" button**: Instantly authenticates as *Ramesh Sharma* (*Sharma Daily Mart & Cafe, Bangalore*).

3. **Merchant Overview Dashboard (`DashboardPage.tsx`)**
   - **Today's Overview KPIs**: Total Products, Total Stock, Estimated Daily Sales, Estimated Revenue, Estimated Profit, Potential Loss, and Average Selling Price.
   - **Revenue & Profit Trend Chart**: Visual comparison of flat baseline pricing vs AI-optimized strategy (+22% profit upside).
   - **Stock Health Levels**: Real-time breakdown (Healthy, Low Stock, Critical, Excess).
   - High-opportunity product suggestions with instant evaluation links.

4. **Smart Price Detection & AI Engine (`SmartPricingPage.tsx` & `pricingEngine.ts`)**
   - Input signals: Product selection, current price, base cost, shelf stock, ambient temperature (°C), rain conditions (Clear / Drizzle / Heavy Rain), and festival status.
   - Automatic local competitor benchmarks (Shop A, Shop B, Shop C).
   - **AI Demand Prediction**: Predicted daily sales, low/expected/high estimates, and confidence percentage (e.g. 87%) with hourly distribution chart.
   - **Stock Alerts**: Real-time inventory longevity badge (Healthy 🟢, Low 🟡, Critical 🔴, Excess 🔵) with days-remaining forecast.
   - **Hero Smart Price Recommendation Card**:
     - Current Price vs Recommended Price vs Expected Profit per unit vs Expected Demand.
     - Conversational plain-language explanation of the decision.
     - Decision factor breakdown bars: Weather (80%), Festival (90%), Competitors (70%), Stock level (60%), Demand elasticity (85%).
     - **Approve Price** vs **Keep Current Price** controls with confetti celebration and instant catalog synchronization upon approval.

5. **Competitor Price Comparison Radar (`CompetitorsPage.tsx`)**
   - Dedicated comparison matrix with price difference indicators (`+₹` higher / `-₹` cheaper).
   - Lowest, average, highest competitor metrics, plus recommended competitive corridor.
   - Side-by-side visual bar chart comparing store price vs local rivals.

6. **Dynamic Special Offers Generator (`SpecialOffersPage.tsx`)**
   - AI-recommended promotions triggered by demand velocity and inventory levels:
     - *Festival Special Discount* (e.g. 10% OFF during festivals)
     - *Excess Stock Clearance* (e.g. Buy 2, Get 5% OFF on high inventory snacks)
     - *Slow Moving Product Booster* (e.g. Flat ₹5 OFF flash deal)
     - *Rainy Day Bundle* (e.g. Save ₹30 on umbrella bundle)
   - Real-time activation toggles with estimated sales uplift and profit impact.

7. **Profit & Loss Analytics (`ProfitLossPage.tsx`)**
   - Financial breakdown: Total Revenue (₹32,500), Cost (₹20,000), Gross Profit (₹12,500), Margin (38.5%).
   - **Direct Strategy Comparison**: Current Pricing Profit (₹8,000) vs AI Recommended Profit (₹10,200) highlighting the **+₹2,200 (+27.5%) unlocked surplus**.
   - Sector profit contribution and comparative category waterfalls.

8. **Product Catalog Management (`ProductsPage.tsx`)**
   - Complete CRUD operations: Add new product modal, Edit product, Delete product.
   - Search by keyword and category filters (Beverages, Fresh Foods, Essentials, Snacks, Packaged Food).
   - Direct 1-click shortcut to run AI price detection for any item.

9. **Price History & Audit Trail (`PriceHistoryPage.tsx`)**
   - Chronological timeline of all approved price decisions, timestamps, previous price, approved price, and recorded profit gains.

10. **Notification Center (`NotificationDrawer.tsx`)**
    - Slide-out drawer with categorized notifications (Stockout risks, High demand surges, Competitor undercuts, Pending price approvals).

---

## 🛠️ Technologies Used

- **Framework**: React 18 (TypeScript)
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS 3 with custom glassmorphism, gradient tokens, and animations
- **Charts**: Recharts (AreaChart, BarChart, LineChart)
- **Icons**: Lucide React
- **Celebration Effects**: Canvas Confetti
- **State & Storage**: React Context + LocalStorage persistence (allows changes to persist across refreshes)

---

## 📦 ## 📁 Project Structure

```text
PricePilot-AI/
│
├── ml_backend/
│   ├── .venv/                         # Python virtual environment (local only)
│   ├── app.py                         # Flask ML backend API
│   ├── train_model.py                 # Model training script
│   ├── demand_model.joblib            # Trained demand prediction model
│   ├── pricepilot_synthetic_retail_data.csv  # Synthetic retail dataset
│   ├── requirements.txt               # Python dependencies
│   ├── test_atlas.py                  # MongoDB Atlas connection tests
│   ├── README.md                      # ML backend documentation
│   └── .env                           # Environment variables (not committed)
│
├── src/
│   ├── components/                    # Reusable UI components
│   ├── context/
│   │   └── AppContext.tsx             # Application state management
│   ├── data/
│   │   └── sampleData.ts              # Sample application data
│   ├── pages/
│   │   ├── LandingPage.tsx            # Public landing page
│   │   ├── AuthPage.tsx               # Authentication interface
│   │   ├── DashboardPage.tsx          # Main dashboard
│   │   ├── SmartPricingPage.tsx       # Smart price detection
│   │   ├── CompetitorsPage.tsx        # Competitor analysis
│   │   ├── ProductsPage.tsx           # Product catalog management
│   │   ├── SpecialOffersPage.tsx      # Special offers management
│   │   ├── PriceHistoryPage.tsx       # Price history
│   │   └── ProfitLossPage.tsx         # Profit and loss analysis
│   ├── services/
│   │   ├── api.ts                     # Backend API communication
│   │   ├── mlService.ts               # ML service integration
│   │   ├── pricingEngine.ts           # Pricing recommendation logic
│   │   └── storageService.ts          # Application storage utilities
│   ├── types/                         # TypeScript type definitions
│   ├── App.tsx                        # Main React application
│   ├── main.tsx                       # Frontend entry point
│   └── index.css                      # Global styles
│
├── .gitignore                         # Excluded files and secrets
├── index.html                         # HTML entry point
├── package.json                       # Frontend dependencies and scripts
├── package-lock.json                  # Locked npm dependency versions
├── postcss.config.js                  # PostCSS configuration
├── tailwind.config.js                 # Tailwind CSS configuration
├── tsconfig.json                      # TypeScript configuration
├── vite.config.ts                     # Vite development configuration
└── README.md                          # Project documentation
```

> **Note:** `.venv/`, `node_modules/`, and `.env` are local development files and should not be committed to GitHub. The structure above documents their local locations where relevant, but they should be excluded from the repository.

```

---

## 🏃 Installation & Running Locally

### Prerequisites
- Node.js (v18 or higher recommended; v24 tested)
- npm or yarn

### Steps

1. Extract the downloaded `PricePilot-AI.zip` file into a folder of your choice:
   ```bash
   unzip PricePilot-AI.zip -d pricepilot-ai
   cd pricepilot-ai
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

5. (Optional) To build production bundle:
   ```bash
   npm run build
   ```

---

## 🔑 Demo Login Credentials

No registration required! You can use either method:

1. **Instant 1-Click Access**: Click the **"Launch Demo App"** button on the Landing Page or the **"Demo Login"** button on the Auth Page.
2. **Manual Credentials**:
   - **Email**: `demo@pricepilot.ai`
   - **Password**: `pricepilot2026`
   - **Preloaded Merchant**: Ramesh Sharma (*Sharma Daily Mart & Cafe, Bangalore*)

---

## 🎯 Demo Walkthrough for Evaluators / Judges

1. **Landing Page**: Observe the hero branding and test the **Interactive Demo Widget** (toggle between Coca-Cola, Umbrella, and Ice Cream, slide temperature to 38°C, and toggle Monsoon Rain).
2. **One-Click Login**: Click *"Explore Live Demo Dashboard"*.
3. **Dashboard Overview**: Check Today's Overview cards, Revenue vs AI Profit chart, and Stock health levels.
4. **Smart Price Detection**:
   - Select *Coca-Cola (750ml)* or *Monsoon Heavy Duty Umbrella*.
   - Toggle Weather / Rain / Festival signals.
   - Observe the live Competitor benchmarks (Shop A, B, C) and Stock Alert longevity (e.g. *"Stock will last 1.3 days"*).
   - Review the **Smart Price Recommendation Card** (Current: ₹40 ➔ Recommended: ₹43 ➔ Expected Profit: ₹18/unit ➔ Expected Demand: 72 units/day).
   - Read the transparent conversational explanation *"Why this price?"*.
   - Click **"Approve Price"** to watch the celebration animation, catalog price synchronization, and notification creation.
5. **Competitor Analysis**: View the price difference breakdown table and the visual price corridor bar chart.
6. **Special Offers**: Toggle on the *Festival Special* or *Excess Stock Clearance* promotions.
7. **Profit & Loss**: Inspect the ₹8,000 vs ₹10,200 comparison showing the **+₹2,200 (+27.5%)** profit boost unlocked by AI repricing.
8. **Products & History**: View the updated product price in the catalog and review the logged transaction in Price History.

---

## 📄 License
MIT License. Built for demo and hackathon presentation.
=======
# 🚀 PricePilot AI

### AI-Powered Dynamic Pricing and Demand Forecasting for Small Businesses

**PricePilot AI** is an intelligent pricing recommendation system designed to help small retailers, D2C brands, online sellers, restaurants, and local businesses make smarter pricing decisions using data and artificial intelligence.

The system analyzes sales history, inventory levels, competitor prices, weather conditions, festivals, and market trends to forecast demand and recommend suitable product prices.

Our goal is to help businesses improve profitability, reduce unnecessary stock, respond to changing demand, and make data-driven pricing decisions.

> **Project Status:** In Development — KLE TECH HACKFEST 2026

---

## 📌 Problem Statement

Small businesses often struggle to decide the right price for their products. Fixed pricing methods may not account for changing demand, competitor prices, stock availability, seasonal trends, or customer preferences.

Large companies can use advanced pricing analytics, but small businesses may not have access to affordable and easy-to-use tools.

PricePilot AI aims to address this problem by providing explainable, AI-driven pricing recommendations through a simple dashboard.

## 🎯 Objectives

* Forecast product demand using historical sales and relevant external factors.
* Recommend suitable product prices based on predicted demand and market conditions.
* Analyze competitor prices using available or simulated competitor data.
* Consider inventory levels, weather, festivals, and seasonal trends.
* Protect minimum profit margins using configurable pricing guardrails.
* Explain why a price is recommended.
* Allow sellers to review and approve suggested price changes.
* Help businesses make better inventory and pricing decisions.

## ✨ Planned Features

### 1. AI-Based Demand Forecasting

Predict potential product demand using historical sales, stock levels, seasonal patterns, and other relevant features.

### 2. Dynamic Price Recommendation

Suggest prices based on predicted demand, competitor prices, inventory availability, and business constraints.

### 3. Competitor Price Analysis

Compare product prices with available competitor information. A mock competitor feed may be used during development and demonstrations.

### 4. Inventory-Aware Pricing

Use stock availability and inventory levels to inform pricing recommendations and help businesses manage excess or limited stock.

### 5. Explainable AI

Show the important factors influencing a recommendation, such as demand changes, competitor pricing, or seasonal effects.

### 6. Profit Margin Protection

Apply configurable minimum-margin and maximum-price-change rules to reduce the risk of unsuitable recommendations.

### 7. Business Dashboard

Provide a dashboard for viewing sales trends, demand forecasts, inventory information, suggested prices, and potential business insights.

### 8. Seller Approval and Feedback

Allow sellers to review recommendations before applying them and record feedback for future improvements.

---

## 🧠 How It Works

1. **Collect Data:** Gather sales history, product details, inventory levels, and relevant market information.
2. **Prepare Data:** Clean and transform the data into features suitable for model training and prediction.
3. **Forecast Demand:** Use a machine learning model to estimate future product demand.
4. **Optimize Pricing:** Generate candidate prices using demand predictions, competitor information, costs, and business rules.
5. **Apply Guardrails:** Check margin limits and permitted price changes.
6. **Explain Recommendations:** Present the proposed price and the factors behind it.
7. **Seller Decision:** Let the business owner review and approve the recommendation.
8. **Learn from Feedback:** Record outcomes and feedback for future model evaluation and improvement.

## 🏗️ Proposed Technology Stack

| Component        | Technology                                    |
| ---------------- | --------------------------------------------- |
| Frontend         | React.js                                      |
| Backend API      | Python, FastAPI                               |
| Machine Learning | LightGBM, scikit-learn                        |
| Data Processing  | Pandas, NumPy                                 |
| Database         | To be finalized based on project requirements |
| Visualization    | React dashboard and charts                    |
| Version Control  | Git and GitHub                                |

*The final technology stack may be updated as implementation progresses.*

## 🗂️ Planned Project Structure

```text
PricePilot-AI/
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
├── backend/
│   ├── app/
│   ├── main.py
│   └── requirements.txt
├── ml/
│   ├── data/
│   ├── train.py
│   ├── predict.py
│   └── models/
├── docs/
├── .gitignore
├── .env.example
└── README.md
```

*This is a proposed structure. Actual folders and files will be added as the project is developed.*

## 📊 Data Sources

The system is designed to work with relevant data such as:

* Historical product sales
* Product costs and inventory levels
* Competitor prices
* Weather conditions
* Festival and seasonal information
* Product categories and demand trends

Public datasets, permitted data sources, or simulated data may be used depending on availability. Any simulated data will be identified appropriately.

## 🛠️ Development Roadmap

* [ ] Create the GitHub repository and project documentation.
* [ ] Prepare datasets and establish the project structure.
* [ ] Develop the demand forecasting model.
* [ ] Build the backend API.
* [ ] Implement the pricing recommendation and optimization logic.
* [ ] Add competitor data integration or a mock feed.
* [ ] Implement pricing guardrails and recommendation explanations.
* [ ] Build the business dashboard.
* [ ] Integrate and test the complete system.
* [ ] Prepare the final HackFest demonstration.

## 🔒 Responsible Pricing

PricePilot AI is intended to support business owners, not replace their judgment.

* Recommended prices should follow configured cost and margin constraints.
* Sellers should be able to review recommendations before implementation.
* Model predictions and recommendations should be evaluated before real-world use.
* The system should not use unauthorized competitor data or expose confidential business information.

## 🚀 Expected Outcome

PricePilot AI aims to demonstrate how machine learning, demand forecasting, and pricing optimization can help small businesses make more informed pricing decisions.

The expected outcome is a working prototype that combines predictive analytics, explainable recommendations, and a user-friendly dashboard.

## 👥 Team

**Project:** PricePilot AI
**Event:** KLE TECH HACKFEST 2026
**Team:** PromptForge
**Team Leader:** Rakshita Machakanur

## 📄 License

A project license will be selected before public distribution.

---

**PricePilot AI — Smarter Pricing. Better Decisions.**
>>>>>>> af2e9d3dac4ec2b8a0e920832f6c8a430bfddcbd
