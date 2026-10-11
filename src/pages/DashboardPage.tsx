import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Package, 
  Layers, 
  TrendingUp, 
  IndianRupee, 
  DollarSign, 
  AlertTriangle, 
  Sparkles, 
  ArrowUpRight, 
  ArrowDownRight, 
  Sun, 
  CloudRain, 
  PartyPopper,
  CheckCircle2,
  Clock,
  ChevronRight,
  ShieldCheck,
  Zap,
  BarChart2
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  CartesianGrid, 
  Legend 
} from 'recharts';

export const DashboardPage: React.FC = () => {
  const { 
    products, 
    user, 
    setCurrentView, 
    setSelectedProductId, 
    weather, 
    updateWeather,
    activeRecommendation,
    notifications,
    specialOffers
  } = useApp();

  // Aggregate Metrics
  const totalProducts = products.length;
  const totalStock = products.reduce((acc, p) => acc + p.stock, 0);
  const avgSellingPrice = products.length 
    ? (products.reduce((acc, p) => acc + p.currentPrice, 0) / products.length).toFixed(1)
    : '0';

  // Realistic calculated estimates for today's store performance
  const estimatedUnitsToday = 342;
  const estimatedRevenue = 42850;
  const estimatedProfit = 14920;
  const potentialLoss = 3840; // From unoptimized pricing or stockouts

  // Chart data: 7-day sales and profit trend
  const weeklyTrendData = [
    { day: 'Mon', revenue: 31200, profit: 9800, aiOptimizedProfit: 12400 },
    { day: 'Tue', revenue: 29400, profit: 9100, aiOptimizedProfit: 11800 },
    { day: 'Wed', revenue: 34500, profit: 11200, aiOptimizedProfit: 13900 },
    { day: 'Thu', revenue: 32000, profit: 10400, aiOptimizedProfit: 12800 },
    { day: 'Fri', revenue: 38900, profit: 12600, aiOptimizedProfit: 15400 },
    { day: 'Sat', revenue: 44200, profit: 14100, aiOptimizedProfit: 17800 },
    { day: 'Today (Sun)', revenue: estimatedRevenue, profit: estimatedProfit, aiOptimizedProfit: estimatedProfit + 2900 },
  ];

  // Stock Distribution Data
  const stockHealthData = [
    { name: 'Healthy (4+ days)', count: products.filter(p => p.stock >= 40).length, fill: '#10b981' },
    { name: 'Low Stock (<3 days)', count: products.filter(p => p.stock < 40 && p.stock >= 20).length, fill: '#f59e0b' },
    { name: 'Critical (<1.5 days)', count: products.filter(p => p.stock < 20).length, fill: '#ef4444' },
    { name: 'Excess (>14 days)', count: products.filter(p => p.stock > 180).length, fill: '#3b82f6' },
  ];

  const handleProductSelect = (id: string) => {
    setSelectedProductId(id);
    setCurrentView('pricing');
  };

  return (
    <div className="p-4 lg:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Welcome & Overview Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Seller Dashboard
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-brand-500/10 text-brand-400 border border-brand-500/20">
              Live Store Mode
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Welcome, <strong className="text-slate-200">{user?.name || 'Ramesh Sharma'}</strong> • {user?.storeName || 'Sharma Daily Mart & Cafe'}
          </p>
        </div>

        {/* Quick Action Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentView('pricing')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-xs font-bold text-white shadow-lg shadow-brand-500/20 transition-all transform hover:-translate-y-0.5"
          >
            <Sparkles className="w-4 h-4" />
            <span>Launch Smart Price Detection</span>
          </button>
        </div>
      </div>

      {/* Live Market Barometer Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-brand-950/40 to-slate-900 border border-brand-500/20 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-500/20 border border-brand-500/30 flex items-center justify-center text-brand-400">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold text-white block">Active Ambient Conditions:</span>
            <span className="text-xs text-slate-300">
              {weather.temperature}°C Sunny • Rain: {weather.rain} • {weather.festival ? '🎉 Ganesh Chaturthi Surge (+30% Demand)' : 'Standard Demand'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400">Want to simulate a monsoon or heatwave?</span>
          <button
            onClick={() => updateWeather({ rain: weather.rain === 'No' ? 'Heavy' : 'No' })}
            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium transition-colors"
          >
            Toggle {weather.rain === 'No' ? '🌧️ Rain' : '☀️ Dry'}
          </button>
        </div>
      </div>

      {/* Today's Overview KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
        {/* Total Products */}
        <div className="glass-panel p-4 rounded-2xl border border-slate-800/80 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Products</span>
            <Package className="w-4 h-4 text-brand-400" />
          </div>
          <div className="text-2xl font-black text-white">{totalProducts}</div>
          <span className="text-[10px] text-emerald-400 font-medium mt-1">8 active SKUs</span>
        </div>

        {/* Total Stock */}
        <div className="glass-panel p-4 rounded-2xl border border-slate-800/80 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Total Stock</span>
            <Layers className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-black text-white">{totalStock.toLocaleString()}</div>
          <span className="text-[10px] text-slate-400 font-medium mt-1">units across store</span>
        </div>

        {/* Estimated Sales */}
        <div className="glass-panel p-4 rounded-2xl border border-slate-800/80 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Est. Sales</span>
            <TrendingUp className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-black text-white">{estimatedUnitsToday}</div>
          <span className="text-[10px] text-emerald-400 font-semibold mt-1 flex items-center gap-0.5">
            <ArrowUpRight className="w-3 h-3" /> +14% vs yesterday
          </span>
        </div>

        {/* Estimated Revenue */}
        <div className="glass-panel p-4 rounded-2xl border border-slate-800/80 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Est. Revenue</span>
            <IndianRupee className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-white">₹{estimatedRevenue.toLocaleString('en-IN')}</div>
          <span className="text-[10px] text-emerald-400 font-medium mt-1">Run-rate on track</span>
        </div>

        {/* Estimated Profit */}
        <div className="glass-panel p-4 rounded-2xl border border-emerald-500/30 bg-emerald-950/10 flex flex-col justify-between">
          <div className="flex items-center justify-between text-emerald-400 mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Est. Profit</span>
            <Sparkles className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-300">₹{estimatedProfit.toLocaleString('en-IN')}</div>
          <span className="text-[10px] text-emerald-400 font-semibold mt-1">34.8% gross margin</span>
        </div>

        {/* Potential Loss / Opportunity Missed */}
        <div className="glass-panel p-4 rounded-2xl border border-rose-500/20 bg-rose-950/10 flex flex-col justify-between">
          <div className="flex items-center justify-between text-rose-400 mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Potential Loss</span>
            <AlertTriangle className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-2xl font-black text-rose-300">₹{potentialLoss.toLocaleString('en-IN')}</div>
          <span className="text-[10px] text-rose-400 font-medium mt-1">Recoverable with AI</span>
        </div>

        {/* Avg Selling Price */}
        <div className="glass-panel p-4 rounded-2xl border border-slate-800/80 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Avg Price</span>
            <BarChart2 className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-black text-white">₹{avgSellingPrice}</div>
          <span className="text-[10px] text-slate-400 font-medium mt-1">per unit catalog avg</span>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Revenue & AI Profit Expansion Chart (2 cols) */}
        <div className="lg:col-span-2 glass-panel p-5 rounded-2xl border border-slate-800/80">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-brand-400" />
                Revenue & Profit Trend: Current vs AI Recommendation
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Shows additional daily profit gained by applying AI recommendations
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 text-slate-300">
                <span className="w-2.5 h-2.5 rounded-sm bg-brand-500"></span> Flat Baseline
              </span>
              <span className="flex items-center gap-1.5 text-emerald-300">
                <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500"></span> AI Optimized (+22%)
              </span>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="day" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '0.75rem',
                    fontSize: '12px',
                    color: '#fff'
                  }}
                  formatter={(val: any, name: string) => [
                    `₹${Number(val).toLocaleString('en-IN')}`, 
                    name === 'profit' ? 'Current Profit' : name === 'aiOptimizedProfit' ? 'AI Optimized Profit' : 'Total Revenue'
                  ]}
                />
                <Bar dataKey="profit" fill="#3853f2" radius={[4, 4, 0, 0]} />
                <Bar dataKey="aiOptimizedProfit" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Stock Level Health Breakdown (1 col) */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800/80 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-indigo-400" />
                Stock Health Levels
              </h3>
              <span className="text-[11px] text-slate-400">Catalog Coverage</span>
            </div>
            <p className="text-xs text-slate-400 mb-4">
              Real-time shelf inventory classification
            </p>

            <div className="space-y-3">
              {stockHealthData.map((item, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-semibold text-slate-200">{item.name}</span>
                    <span className="font-bold text-white">{item.count} items</span>
                  </div>
                  <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-500"
                      style={{ 
                        width: `${(item.count / totalProducts) * 100}%`,
                        backgroundColor: item.fill
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 p-3 rounded-xl bg-amber-950/20 border border-amber-500/20 text-xs text-amber-300 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>2 products need replenishment within 48 hours.</span>
          </div>
        </div>
      </div>

      {/* Quick Action Products Table */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800/80">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-brand-400" />
              Immediate Pricing Opportunities (High Heat & Festival Surge)
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Click any product to generate instant AI price analysis and approve changes
            </p>
          </div>

          <button
            onClick={() => setCurrentView('products')}
            className="flex items-center gap-1 text-xs text-brand-400 hover:text-brand-300 font-bold self-start sm:self-auto"
          >
            <span>View All Products</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
                <th className="pb-3 pl-2">Product Name</th>
                <th className="pb-3">Category</th>
                <th className="pb-3">Current Price</th>
                <th className="pb-3">Cost</th>
                <th className="pb-3">Stock Units</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right pr-2">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {products.slice(0, 5).map(prod => (
                <tr 
                  key={prod.id} 
                  className="hover:bg-slate-900/50 transition-colors cursor-pointer group"
                  onClick={() => handleProductSelect(prod.id)}
                >
                  <td className="py-3 pl-2 font-bold text-white flex items-center gap-2">
                    <span>{prod.name}</span>
                  </td>
                  <td className="py-3 text-slate-400">{prod.category}</td>
                  <td className="py-3 font-extrabold text-white">₹{prod.currentPrice}</td>
                  <td className="py-3 text-slate-400">₹{prod.costPrice}</td>
                  <td className="py-3 font-semibold text-slate-300">{prod.stock} {prod.unit}s</td>
                  <td className="py-3">
                    {prod.stock < 20 ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20">
                        Low Stock
                      </span>
                    ) : prod.stock > 180 ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        Excess Stock
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        Optimal
                      </span>
                    )}
                  </td>
                  <td className="py-3 text-right pr-2">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleProductSelect(prod.id);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-brand-600/20 group-hover:bg-brand-600 text-brand-300 group-hover:text-white border border-brand-500/30 text-xs font-semibold transition-all"
                    >
                      Analyze AI Price
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
