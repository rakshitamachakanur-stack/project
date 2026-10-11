import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Users, 
  Store, 
  MapPin, 
  Star, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  BarChart3
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  CartesianGrid, 
  Cell 
} from 'recharts';

export const CompetitorsPage: React.FC = () => {
  const { products, selectedProductId, setSelectedProductId, getCompetitorsForProduct, setCurrentView } = useApp();
  const [activeProdId, setActiveProdId] = useState(selectedProductId);

  const product = products.find(p => p.id === activeProdId) || products[0];
  const competitors = product ? getCompetitorsForProduct(product.id) : [];

  const compPrices = competitors.map(c => c.price);
  const lowestCompPrice = compPrices.length ? Math.min(...compPrices) : product.currentPrice;
  const highestCompPrice = compPrices.length ? Math.max(...compPrices) : product.currentPrice;
  const avgCompPrice = compPrices.length 
    ? Math.round(compPrices.reduce((a, b) => a + b, 0) / compPrices.length) 
    : product.currentPrice;

  // Recommended competitive range corridor
  const corridorMin = Math.max(product.costPrice + 2, Math.round(avgCompPrice * 0.95));
  const corridorMax = Math.round(highestCompPrice * 1.02);

  // Chart data
  const chartData = [
    { name: 'Your Store', price: product.currentPrice, isMe: true },
    ...competitors.map(c => ({ name: c.sellerName.split(' ')[0] + ' ' + c.sellerName.split(' ')[1], price: c.price, isMe: false }))
  ];

  return (
    <div className="p-4 lg:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Competitor Price Comparison
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-brand-500/10 text-brand-400 border border-brand-500/20">
              Live Radar
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time local market benchmarks across nearby retail competitors.
          </p>
        </div>

        {/* Product Selector Dropdown */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <label className="text-xs text-slate-400 font-semibold">Select SKU:</label>
          <select
            value={activeProdId}
            onChange={(e) => {
              setActiveProdId(e.target.value);
              setSelectedProductId(e.target.value);
            }}
            className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs font-bold text-white focus:outline-none focus:border-brand-500"
          >
            {products.map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Corridor Benchmark Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="glass-panel p-4 rounded-2xl border border-brand-500/30 bg-brand-950/20">
          <span className="text-[11px] font-bold uppercase tracking-wider text-brand-300 block mb-1">
            Your Store Price
          </span>
          <div className="text-2xl font-black text-white">₹{product.currentPrice}</div>
          <span className="text-[10px] text-slate-400 mt-1 block">Cost: ₹{product.costPrice}</span>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-slate-800/80">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Lowest Competitor
          </span>
          <div className="text-2xl font-black text-slate-200">₹{lowestCompPrice}</div>
          <span className="text-[10px] text-emerald-400 mt-1 block">
            {product.currentPrice <= lowestCompPrice ? 'You are cheapest' : `+₹${product.currentPrice - lowestCompPrice} above lowest`}
          </span>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-slate-800/80">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Average Competitor
          </span>
          <div className="text-2xl font-black text-slate-200">₹{avgCompPrice}</div>
          <span className="text-[10px] text-slate-400 mt-1 block">Local market baseline</span>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-slate-800/80">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Highest Competitor
          </span>
          <div className="text-2xl font-black text-slate-200">₹{highestCompPrice}</div>
          <span className="text-[10px] text-purple-400 mt-1 block">Top retail ceiling</span>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-emerald-500/30 bg-emerald-950/20 col-span-2 md:col-span-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300 block mb-1">
            Recommended Corridor
          </span>
          <div className="text-xl font-black text-emerald-400">₹{corridorMin} – ₹{corridorMax}</div>
          <span className="text-[10px] text-emerald-300 mt-1 block font-medium">Safe profit boundary</span>
        </div>
      </div>

      {/* Visual Chart & Comparison Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Visual Bar Comparison Chart (5 cols) */}
        <div className="lg:col-span-5 glass-panel p-5 rounded-3xl border border-slate-800/80 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-brand-400" />
                Price Comparison Chart
              </h3>
            </div>
            <p className="text-xs text-slate-400 mb-6">
              Side-by-side comparison for {product.name}
            </p>

            <div className="h-60 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="name" stroke="#64748b" fontSize={11} tickLine={false} />
                  <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      borderColor: '#334155',
                      borderRadius: '0.75rem',
                      fontSize: '12px',
                      color: '#fff'
                    }}
                    formatter={(val: any) => [`₹${val}`, 'Selling Price']}
                  />
                  <Bar dataKey="price" radius={[6, 6, 0, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.isMe ? '#3853f2' : '#64748b'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 mt-4 text-center">
            Blue bar indicates <strong className="text-brand-300">Your Store</strong>. Grey bars represent rival shops.
          </div>
        </div>

        {/* Detailed Competitor Table (7 cols) */}
        <div className="lg:col-span-7 glass-panel p-6 rounded-3xl border border-slate-800/80">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-brand-400" />
              Live Competitor Pricing Table
            </h3>
            <span className="text-[11px] text-slate-400">Mock Data / API Ready</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
                  <th className="pb-3">Seller Name</th>
                  <th className="pb-3">Their Price</th>
                  <th className="pb-3">Price Gap (vs You)</th>
                  <th className="pb-3">Proximity</th>
                  <th className="pb-3 text-right">Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {/* Your Store Row */}
                <tr className="bg-brand-600/10 font-bold">
                  <td className="py-3.5 pl-2 text-brand-300 flex items-center gap-1.5">
                    <Store className="w-3.5 h-3.5 text-brand-400" />
                    <span>Your Store (Current)</span>
                  </td>
                  <td className="py-3.5 text-white font-extrabold">₹{product.currentPrice}</td>
                  <td className="py-3.5 text-slate-400">— Baseline</td>
                  <td className="py-3.5 text-slate-300">0m (Storefront)</td>
                  <td className="py-3.5 text-right pr-2 text-amber-400 font-semibold">4.8 ★</td>
                </tr>

                {/* Rival Rows */}
                {competitors.map(comp => {
                  const diff = comp.price - product.currentPrice;
                  return (
                    <tr key={comp.id} className="hover:bg-slate-900/60 transition-colors">
                      <td className="py-3.5 font-semibold text-slate-200">{comp.sellerName}</td>
                      <td className="py-3.5 text-white font-bold">₹{comp.price}</td>
                      <td className="py-3.5">
                        <span className={`px-2 py-0.5 rounded-md font-bold text-[11px] ${
                          diff > 0 
                            ? 'bg-emerald-500/10 text-emerald-300' 
                            : diff < 0 
                            ? 'bg-rose-500/10 text-rose-300' 
                            : 'bg-slate-800 text-slate-300'
                        }`}>
                          {diff > 0 ? `+₹${diff} (Higher)` : diff < 0 ? `-₹${Math.abs(diff)} (Cheaper)` : '±₹0 (Tied)'}
                        </span>
                      </td>
                      <td className="py-3.5 text-slate-400 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-500" />
                        {comp.distance}
                      </td>
                      <td className="py-3.5 text-right text-slate-300">
                        {comp.rating} ★
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Quick Action to Optimize */}
          <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-xs text-slate-400">
              Want to capture the gap with AI demand weighing?
            </span>
            <button
              onClick={() => {
                setSelectedProductId(product.id);
                setCurrentView('pricing');
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-xs font-bold text-white shadow-md shadow-brand-500/20 transition-all"
            >
              <span>Run AI Price Optimizer</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
