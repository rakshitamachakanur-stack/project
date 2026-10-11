import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  History, 
  Sparkles, 
  TrendingUp, 
  Calendar, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  CartesianGrid 
} from 'recharts';

export const PriceHistoryPage: React.FC = () => {
  const { priceHistory, setCurrentView } = useApp();

  // Aggregate stats
  const totalApproved = priceHistory.filter(h => h.changeType === 'Approved AI').length;
  const totalProfitRecorded = priceHistory.reduce((sum, h) => sum + h.profitEarned, 0);

  // Chart data from history items
  const historyTrendData = priceHistory.map((item, idx) => ({
    name: item.productName.split(' ')[0],
    oldPrice: item.previousPrice,
    approvedPrice: item.approvedPrice,
    profit: item.profitEarned,
  })).reverse();

  return (
    <div className="p-4 lg:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Pricing History & Audit Trail
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-brand-500/10 text-brand-400 border border-brand-500/20">
              Audit Trail
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Log of all approved and adjusted prices, date stamps, and resulting profit performance.
          </p>
        </div>

        {/* Counter Card */}
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-4">
            <div>
              <span className="text-[11px] text-slate-400 block font-medium">Decisions Logged</span>
              <span className="text-base font-extrabold text-white">{priceHistory.length} Total</span>
            </div>
            <div className="h-7 w-px bg-slate-800" />
            <div>
              <span className="text-[11px] text-slate-400 block font-medium">Approved by Seller</span>
              <span className="text-base font-extrabold text-emerald-400">{totalApproved} AI Approved</span>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Timeline Trend */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800/80">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-brand-400" />
              Historical Profit Trajectory
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Net revenue generated across chronological pricing events
            </p>
          </div>
        </div>

        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={historyTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
                formatter={(val: any) => [`₹${val}`, 'Value']}
              />
              <Line type="monotone" dataKey="profit" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981', r: 4 }} name="Profit Earned (₹)" />
              <Line type="monotone" dataKey="approvedPrice" stroke="#3853f2" strokeWidth={2} dot={{ fill: '#3853f2', r: 3 }} name="Approved Price (₹)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* History Table */}
      <div className="glass-panel rounded-3xl border border-slate-800/80 overflow-hidden">
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
            <History className="w-4 h-4 text-brand-400" />
            Pricing Action Records
          </h3>
          <span className="text-xs text-slate-400">Chronological Order</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/40 text-slate-400 font-bold uppercase tracking-wider">
                <th className="py-3.5 pl-6">Product & Date</th>
                <th className="py-3.5">Previous Price</th>
                <th className="py-3.5">AI Recommended</th>
                <th className="py-3.5">Approved Price</th>
                <th className="py-3.5">Recorded Sales</th>
                <th className="py-3.5">Profit Generated</th>
                <th className="py-3.5 pr-6 text-right">Approval Type</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {priceHistory.map((item) => {
                const diff = item.approvedPrice - item.previousPrice;
                return (
                  <tr key={item.id} className="hover:bg-slate-900/40 transition-colors">
                    <td className="py-3.5 pl-6">
                      <div className="font-bold text-white text-sm">{item.productName}</div>
                      <div className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                        <Calendar className="w-3 h-3 text-slate-500" />
                        <span>{item.date}</span>
                      </div>
                    </td>

                    <td className="py-3.5 text-slate-400 font-medium">
                      ₹{item.previousPrice}
                    </td>

                    <td className="py-3.5 font-bold text-brand-300">
                      ₹{item.recommendedPrice}
                    </td>

                    <td className="py-3.5 font-extrabold text-white text-sm">
                      <span className="flex items-center gap-1.5">
                        ₹{item.approvedPrice}
                        {diff !== 0 && (
                          <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                            diff > 0 ? 'bg-emerald-500/10 text-emerald-300' : 'bg-slate-800 text-slate-400'
                          }`}>
                            {diff > 0 ? `+₹${diff}` : `-₹${Math.abs(diff)}`}
                          </span>
                        )}
                      </span>
                    </td>

                    <td className="py-3.5 font-semibold text-slate-300">
                      {item.salesVolume} units
                    </td>

                    <td className="py-3.5 font-extrabold text-emerald-400">
                      ₹{item.profitEarned.toLocaleString('en-IN')}
                    </td>

                    <td className="py-3.5 pr-6 text-right">
                      {item.changeType === 'Approved AI' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          <span>Approved AI</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-800 text-slate-400 border border-slate-700">
                          <span>Maintained Old</span>
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
