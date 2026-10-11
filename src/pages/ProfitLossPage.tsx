import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  TrendingUp, 
  IndianRupee, 
  Sparkles, 
  ArrowUpRight, 
  Layers, 
  PieChart as PieChartIcon, 
  CheckCircle2, 
  AlertTriangle,
  ArrowRight
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  CartesianGrid, 
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts';

export const ProfitLossPage: React.FC = () => {
  const { products, setCurrentView } = useApp();

  // Financial Summary
  const currentTotalRevenue = 32500;
  const currentTotalCost = 20000;
  const currentTotalProfit = currentTotalRevenue - currentTotalCost; // ₹12,500
  const profitMargin = ((currentTotalProfit / currentTotalRevenue) * 100).toFixed(1); // 38.5%

  // Feature #9 specific comparison:
  // Current pricing: ₹8,000 expected profit
  // AI pricing: ₹10,200 expected profit
  // Potential improvement: +₹2,200 (+27.5%)
  const currentBaselineProfit = 8000;
  const aiRecommendedProfit = 10200;
  const potentialImprovement = aiRecommendedProfit - currentBaselineProfit; // +₹2,200
  const percentageImprovement = ((potentialImprovement / currentBaselineProfit) * 100).toFixed(1);

  // Category profit breakdown
  const categoryProfitData = [
    { name: 'Beverages', profit: 4800, revenue: 11200, color: '#3853f2' },
    { name: 'Essentials', profit: 3100, revenue: 7500, color: '#10b981' },
    { name: 'Fresh Foods', profit: 2400, revenue: 6800, color: '#8b5cf6' },
    { name: 'Snacks', profit: 1400, revenue: 4200, color: '#f59e0b' },
    { name: 'Packaged Food', profit: 800, revenue: 2800, color: '#06b6d4' },
  ];

  // Daily Strategy Comparison Chart
  const strategyComparisonData = [
    { metric: 'Beverages (Cold Drinks & Juices)', current: 2800, aiRecommended: 3600 },
    { metric: 'Essentials (Umbrella Rain Surge)', current: 1800, aiRecommended: 2600 },
    { metric: 'Fresh Foods (Pizza & Bakery)', current: 2100, aiRecommended: 2500 },
    { metric: 'Snacks (Chips & Packs)', current: 1300, aiRecommended: 1500 },
  ];

  return (
    <div className="p-4 lg:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Profit & Loss Analytics
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-brand-500/10 text-brand-400 border border-brand-500/20">
              Financial Engine
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time breakdown of revenues, costs, margins, and unlocked AI pricing surplus.
          </p>
        </div>

        <button
          onClick={() => setCurrentView('pricing')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-xs font-bold text-white shadow-md shadow-brand-500/20 transition-all self-start sm:self-auto"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Optimize Next SKU</span>
        </button>
      </div>

      {/* KPI Cards Banner */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-panel p-5 rounded-2xl border border-slate-800/80">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Total Revenue
          </span>
          <div className="text-3xl font-black text-white">₹{currentTotalRevenue.toLocaleString('en-IN')}</div>
          <span className="text-xs text-slate-400 mt-1 block">Gross store turnover</span>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800/80">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Product Cost Base
          </span>
          <div className="text-3xl font-black text-slate-300">₹{currentTotalCost.toLocaleString('en-IN')}</div>
          <span className="text-xs text-slate-400 mt-1 block">Inventory purchase cost</span>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-emerald-500/30 bg-emerald-950/20">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block mb-1">
            Gross Net Profit
          </span>
          <div className="text-3xl font-black text-emerald-300">₹{currentTotalProfit.toLocaleString('en-IN')}</div>
          <span className="text-xs text-emerald-400 mt-1 block font-semibold flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" /> Healthy margin
          </span>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-brand-500/30 bg-brand-950/20">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-300 block mb-1">
            Profit Margin
          </span>
          <div className="text-3xl font-black text-brand-400">{profitMargin}%</div>
          <span className="text-xs text-brand-300 mt-1 block font-medium">Industry leading for kirana</span>
        </div>
      </div>

      {/* Hero Head-to-Head Comparison Card: Current vs AI Recommended */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-brand-950/40 to-slate-900 border border-brand-500/40 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 border border-brand-500/30 text-brand-300 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-brand-400" />
              <span>Direct Pricing Strategy Benchmark</span>
            </div>
            <h2 className="text-2xl font-black text-white">
              Current Pricing Profit vs AI Recommended Profit
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              By aligning prices with weather demand spikes and competitor boundaries, PricePilot AI unlocks significant daily upside without reducing customer satisfaction.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full md:w-auto shrink-0">
            {/* Current */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-center min-w-[140px]">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Current Pricing
              </span>
              <div className="text-2xl font-black text-slate-300">
                ₹{currentBaselineProfit.toLocaleString('en-IN')}
              </div>
              <span className="text-[10px] text-slate-500 block mt-0.5">expected profit</span>
            </div>

            {/* AI */}
            <div className="p-4 rounded-2xl bg-brand-600/20 border border-brand-500/40 text-center min-w-[140px]">
              <span className="text-[11px] font-bold text-brand-300 uppercase tracking-wider block mb-1">
                AI Pricing
              </span>
              <div className="text-3xl font-black text-white">
                ₹{aiRecommendedProfit.toLocaleString('en-IN')}
              </div>
              <span className="text-[10px] text-brand-400 block mt-0.5 font-bold">recommended profit</span>
            </div>

            {/* Potential Gain */}
            <div className="p-4 rounded-2xl bg-emerald-950/50 border border-emerald-500/40 text-center min-w-[140px]">
              <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block mb-1">
                Potential Gain
              </span>
              <div className="text-3xl font-black text-emerald-300">
                +₹{potentialImprovement.toLocaleString('en-IN')}
              </div>
              <span className="text-[10px] text-emerald-400 block mt-0.5 font-bold">
                +{percentageImprovement}% upside
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Strategy Comparison Bar Chart (7 cols) */}
        <div className="lg:col-span-7 glass-panel p-6 rounded-3xl border border-slate-800/80">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-brand-400" />
                Category Profit Expansion
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Baseline (Grey) vs AI Optimized (Emerald) profit across main departments
              </p>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={strategyComparisonData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="metric" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '0.75rem',
                    fontSize: '12px',
                    color: '#fff'
                  }}
                  formatter={(val: any) => [`₹${val}`, 'Daily Profit']}
                />
                <Bar dataKey="current" fill="#475569" radius={[4, 4, 0, 0]} name="Current Flat Price" />
                <Bar dataKey="aiRecommended" fill="#10b981" radius={[4, 4, 0, 0]} name="AI Recommended Price" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Contribution (5 cols) */}
        <div className="lg:col-span-5 glass-panel p-6 rounded-3xl border border-slate-800/80 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <PieChartIcon className="w-4 h-4 text-brand-400" />
                Profit by Category
              </h3>
              <span className="text-xs text-slate-400">Share of ₹12,500</span>
            </div>

            <div className="space-y-3">
              {categoryProfitData.map((cat, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-semibold text-slate-200">{cat.name}</span>
                    <span className="font-bold text-emerald-400">₹{cat.profit.toLocaleString('en-IN')} profit</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full"
                      style={{ 
                        width: `${(cat.profit / currentTotalProfit) * 100}%`,
                        backgroundColor: cat.color
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>Highest margin sector:</span>
            <strong className="text-brand-300">Beverages (42.8% margin)</strong>
          </div>
        </div>
      </div>
    </div>
  );
};
