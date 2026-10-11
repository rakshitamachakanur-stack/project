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

## 📦 Project Structure

```
pricepilot-ai/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── index.css
│   ├── types/
│   │   └── index.ts                 # Type definitions
│   ├── data/
│   │   └── sampleData.ts            # Realistic preloaded products, competitors, offers
│   ├── services/
│   │   ├── pricingEngine.ts         # Deterministic AI pricing & demand elasticity logic
│   │   └── storageService.ts        # LocalStorage persistence service
│   ├── context/
│   │   └── AppContext.tsx           # Global state, auth, approval actions, notifications
│   ├── components/
│   │   ├── common/
│   │   │   ├── Navbar.tsx           # Header with live weather simulator & alerts
│   │   │   ├── Sidebar.tsx          # Collapsible navigation sidebar
│   │   │   ├── NotificationDrawer.tsx # Slide-out notification drawer
│   │   │   └── ToastContainer.tsx   # Floating feedback toasts
│   │   ├── pricing/
│   │   │   ├── RecommendationCard.tsx # Hero pricing card with Approve/Keep buttons
│   │   │   ├── DemandPredictionChart.tsx # Recharts hourly demand curve
│   │   │   ├── FactorBreakdown.tsx  # Dynamic weighting progress bars
│   │   │   ├── StockAlertBadge.tsx  # Inventory longevity warning gauge
│   │   │   └── CompetitorMiniCards.tsx # Competitor quick comparison cards
│   └── pages/
│       ├── LandingPage.tsx          # Public landing page with live interactive demo widget
│       ├── AuthPage.tsx             # Auth with 1-click Demo Merchant access
│       ├── DashboardPage.tsx        # High-level store overview and trends
│       ├── SmartPricingPage.tsx     # Full detection workflow & AI recommendation
│       ├── CompetitorsPage.tsx      # Competitor price corridor and comparison charts
│       ├── SpecialOffersPage.tsx    # Demand-driven promotional discount generator
│       ├── ProfitLossPage.tsx       # Financial metrics & baseline vs AI profit comparisons
│       ├── ProductsPage.tsx         # Catalog management (Add/Edit/Delete/Filter)
│       └── PriceHistoryPage.tsx     # Historical audit log of approved pricing changes
└── README.md
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
