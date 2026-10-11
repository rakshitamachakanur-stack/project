import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';

import { 
  Sparkles, 
  RotateCcw, 
  Sun, 
  CloudRain, 
  PartyPopper, 
  Package, 
  DollarSign, 
  Layers, 
  Users, 
  CheckCircle2, 
  ArrowRight,
  TrendingUp,
  Cpu
} from 'lucide-react';
import { RecommendationCard } from '../components/pricing/RecommendationCard';
import { DemandPredictionChart } from '../components/pricing/DemandPredictionChart';
import { StockAlertBadge } from '../components/pricing/StockAlertBadge';
import { CompetitorMiniCards } from '../components/pricing/CompetitorMiniCards';
import { predictDemand } from '../services/mlService';


export const SmartPricingPage: React.FC = () => {
  const { 
    products, 
    selectedProduct, 
    selectedProductId, 
    setSelectedProductId, 
    weather, 
    updateWeather, 
    activeRecommendation, 
    runAnalysis,
    getCompetitorsForProduct,
    showToast
  } = useApp();

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [mlDemand, setMlDemand] = useState<number | null>(null);
  // Local editable form fields for instant tuning
  const [formCurrentPrice, setFormCurrentPrice] = useState(selectedProduct?.currentPrice || 40);
  const [formCostPrice, setFormCostPrice] = useState(selectedProduct?.costPrice || 25);
  const [formStock, setFormStock] = useState(selectedProduct?.stock || 100);

  // Sync when selectedProduct changes
  useEffect(() => {
    if (selectedProduct) {
      setFormCurrentPrice(selectedProduct.currentPrice);
      setFormCostPrice(selectedProduct.costPrice);
      setFormStock(selectedProduct.stock);
    }
  }, [selectedProductId, selectedProduct]);

  const handleProductChange = (id: string) => {
    setSelectedProductId(id);
    setIsAnalyzing(true);
    setTimeout(() => {
      runAnalysis(id);
      setIsAnalyzing(false);
    }, 450);
  };

  
const handleTriggerAnalysis = async () => {
  if (!selectedProduct) {
    showToast('Please select a product first.', 'success');
    return;
  }

  setIsAnalyzing(true);
  setMlDemand(null);

  try {
    // Keep the existing rule-based pricing analysis.
    runAnalysis(selectedProductId);

    // Request a demand prediction from the Python ML backend.
    const result = await predictDemand({
      product_name: selectedProduct.name,
      category: selectedProduct.category,
      selling_price_inr: formCurrentPrice,
      competitor_price_inr:
        competitors[0]?.price ?? formCurrentPrice,
      stock_available: formStock,
      temperature_c: weather.temperature,
      rainfall_mm:
        weather.rain === 'Heavy'
          ? 20
          : weather.rain === 'Drizzle'
            ? 5
            : 0,
      is_weekend: [0, 6].includes(new Date().getDay()) ? 1 : 0,
      is_festival: weather.festival ? 1 : 0,
    });

    setMlDemand(result.predicted_units_sold);

    showToast('Pricing analysis and ML prediction completed!', 'success');
  } catch (error) {
    console.error('ML prediction failed:', error);
    showToast(
      'Pricing analysis is available, but the ML prediction failed. Check the Python backend.',
      'success'
    );
  } finally {
    setIsAnalyzing(false);
  }
};


  const competitors = selectedProduct ? getCompetitorsForProduct(selectedProduct.id) : [];
  
  return (
    <div className="p-4 lg:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Smart Price Detection
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-brand-500/10 text-brand-400 border border-brand-500/20 flex items-center gap-1">
              <Cpu className="w-3.5 h-3.5" />
              AI Core Active
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Predict demand, benchmark competitors, and get safe, human-approved pricing recommendations.
          </p>
        </div>

        <button
          onClick={handleTriggerAnalysis}
          disabled={isAnalyzing}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-xs font-bold text-white shadow-lg shadow-brand-500/25 transition-all transform hover:-translate-y-0.5 self-start sm:self-auto"
        >
          <RotateCcw className={`w-3.5 h-3.5 ${isAnalyzing ? 'animate-spin' : ''}`} />
          <span>{isAnalyzing ? 'Simulating Market...' : 'Re-Run AI Analysis'}</span>
        </button>
      </div>

      {/* Input Parameters & Competitor Live Benchmark Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Input Form Controls (7 cols) */}
        <div className="lg:col-span-7 glass-panel p-6 rounded-3xl border border-slate-800/80 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
              <Package className="w-4 h-4 text-brand-400" />
              Product & Environmental Variables
            </h3>
            <span className="text-[11px] text-slate-400">Step 1: Configure Signals</span>
          </div>

          {/* Product Selector Dropdown */}
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-2">
              Select Product to Evaluate
            </label>
            <select
              value={selectedProductId}
              onChange={(e) => handleProductChange(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm font-bold text-white focus:outline-none focus:border-brand-500 transition-colors"
            >
              {products.map(p => (
                <option key={p.id} value={p.id}>
                  {p.name} — Current: ₹{p.currentPrice} (Cost: ₹{p.costPrice}, Stock: {p.stock})
                </option>
              ))}
            </select>
          </div>

          {/* Pricing & Stock Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-medium text-slate-400 block mb-1">
                Current Selling Price
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 text-xs font-bold text-slate-500">₹</span>
                <input
                  type="number"
                  value={formCurrentPrice}
                  onChange={(e) => setFormCurrentPrice(Number(e.target.value))}
                  className="w-full bg-slate-900/80 border border-slate-800 focus:border-brand-500 rounded-xl py-2.5 pl-8 pr-3 text-sm font-bold text-white focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-slate-400 block mb-1">
                Cost Price (Base)
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 text-xs font-bold text-slate-500">₹</span>
                <input
                  type="number"
                  value={formCostPrice}
                  onChange={(e) => setFormCostPrice(Number(e.target.value))}
                  className="w-full bg-slate-900/80 border border-slate-800 focus:border-brand-500 rounded-xl py-2.5 pl-8 pr-3 text-sm font-bold text-white focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-slate-400 block mb-1">
                Available Stock
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={formStock}
                  onChange={(e) => setFormStock(Number(e.target.value))}
                  className="w-full bg-slate-900/80 border border-slate-800 focus:border-brand-500 rounded-xl py-2.5 px-3 text-sm font-bold text-white focus:outline-none"
                />
                <span className="absolute right-3.5 top-2.5 text-xs font-medium text-slate-500">
                  {selectedProduct?.unit || 'units'}
                </span>
              </div>
            </div>
          </div>

          {/* Environmental Simulation Controls */}
          <div className="pt-4 border-t border-slate-800/80 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
              Market External Signals
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Temperature */}
              <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                    <Sun className="w-4 h-4 text-amber-400" /> Temp
                  </span>
                  <span className="font-bold text-amber-300">{weather.temperature}°C</span>
                </div>
                <input
                  type="range"
                  min="16"
                  max="44"
                  value={weather.temperature}
                  onChange={(e) => updateWeather({ temperature: Number(e.target.value) })}
                  className="w-full accent-brand-500 cursor-pointer"
                />
              </div>

              {/* Rain Condition */}
              <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800">
                <span className="text-slate-300 font-semibold text-xs flex items-center gap-1.5 mb-2">
                  <CloudRain className="w-4 h-4 text-blue-400" /> Rain
                </span>
                <div className="grid grid-cols-3 gap-1">
                  {(['No', 'Drizzle', 'Heavy'] as const).map(mode => (
                    <button
                      key={mode}
                      onClick={() => updateWeather({ rain: mode })}
                      className={`py-1 text-[11px] font-semibold rounded-lg border transition-all ${
                        weather.rain === mode 
                          ? 'bg-blue-600/30 border-blue-500/50 text-blue-200' 
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>

              {/* Festival / Event */}
              <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800">
                <span className="text-slate-300 font-semibold text-xs flex items-center gap-1.5 mb-2">
                  <PartyPopper className="w-4 h-4 text-purple-400" /> Festival
                </span>
                <button
                  onClick={() => updateWeather({ festival: !weather.festival })}
                  className={`w-full py-1.5 rounded-lg text-xs font-bold border transition-all ${
                    weather.festival
                      ? 'bg-purple-950/60 border-purple-500/40 text-purple-300'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {weather.festival ? '🎉 Active Surge' : 'None (Regular)'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Competitor Benchmarks (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-4">
          <CompetitorMiniCards 
            competitors={competitors} 
            currentPrice={formCurrentPrice} 
          />

          {/* Quick Stock Health Preview */}
          {activeRecommendation && (
            <StockAlertBadge 
              stockAlert={activeRecommendation.stockAlert} 
              stock={formStock} 
            />
          )}
        </div>
      </div>

      {/* Main AI Output Section */}
      {isAnalyzing ? (
        <div className="p-16 rounded-3xl glass-panel border border-brand-500/30 flex flex-col items-center justify-center text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-brand-500/20 border border-brand-500/40 flex items-center justify-center animate-spin">
            <Sparkles className="w-7 h-7 text-brand-400" />
          </div>
          <h3 className="text-lg font-bold text-white">PricePilot AI Analyzing Signals...</h3>
          <p className="text-xs text-slate-400 max-w-md">
            Synthesizing category price elasticity, ambient heat index, competitor corridor, and shelf depletion urgency.
          </p>
        </div>
      ) : activeRecommendation ? (
        <div className="space-y-8">
          {/* Hero Smart Price Recommendation Card */}
          <RecommendationCard recommendation={activeRecommendation} />

          {/* AI Sales Demand Prediction Chart */}
          <DemandPredictionChart
  prediction={{
    ...activeRecommendation.demandPrediction,
    predictedDailySales:
      mlDemand ??
      activeRecommendation.demandPrediction.predictedDailySales,
  }}
  productName={activeRecommendation.productName}
/>
        </div>
      ) : null}
    </div>
  );
};
