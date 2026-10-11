import React from 'react';
import { DemandPrediction } from '../../types';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, ShieldCheck, BarChart2 } from 'lucide-react';

interface DemandPredictionChartProps {
  prediction: DemandPrediction;
  productName: string;
}

export const DemandPredictionChart: React.FC<DemandPredictionChartProps> = ({ prediction, productName }) => {
  return (
    <div className="glass-panel p-5 rounded-2xl border border-slate-800/80">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-brand-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              AI Demand Prediction
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Hourly run-rate simulation for {productName}
          </p>
        </div>

        {/* Confidence Badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-brand-500/10 border border-brand-500/20 text-brand-300 text-xs self-start sm:self-auto">
          <ShieldCheck className="w-4 h-4 text-brand-400" />
          <span>Confidence: <strong className="text-white font-bold">{prediction.confidence}%</strong></span>
        </div>
      </div>

      {/* Hero Prediction Pill Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
          <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">Low Est.</span>
          <span className="text-lg font-bold text-slate-300 mt-0.5 block">{prediction.lowEstimate}</span>
          <span className="text-[10px] text-slate-500">units/day</span>
        </div>

        <div className="p-3.5 rounded-xl bg-brand-600/15 border border-brand-500/30 text-center shadow-lg shadow-brand-500/5">
          <span className="text-[11px] font-bold text-brand-300 uppercase tracking-wider block">Expected Demand</span>
          <span className="text-2xl font-extrabold text-white mt-0.5 block">{prediction.predictedDailySales}</span>
          <span className="text-[10px] text-brand-400 font-medium">units/day</span>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
          <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">High Est.</span>
          <span className="text-lg font-bold text-slate-300 mt-0.5 block">{prediction.highEstimate}</span>
          <span className="text-[10px] text-slate-500">units/day</span>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
          <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">Peak Hours</span>
          <span className="text-lg font-bold text-amber-300 mt-0.5 block">12 PM - 7 PM</span>
          <span className="text-[10px] text-slate-500">prime footfall</span>
        </div>
      </div>

      {/* Hourly Curve Chart */}
      <div className="h-44 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={prediction.hourlyDistribution} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
            <defs>
              <linearGradient id="demandCurve" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3853f2" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#3853f2" stopOpacity={0.0}/>
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="hour" 
              stroke="#64748b" 
              fontSize={11} 
              tickLine={false} 
              axisLine={{ stroke: '#334155' }}
            />
            <YAxis 
              stroke="#64748b" 
              fontSize={11} 
              tickLine={false} 
              axisLine={false} 
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0f172a',
                borderColor: '#334155',
                borderRadius: '0.75rem',
                fontSize: '12px',
                color: '#fff'
              }}
              formatter={(value: any) => [`${value} units predicted`, 'Expected Sales']}
            />
            <Area 
              type="monotone" 
              dataKey="expectedUnits" 
              stroke="#3853f2" 
              strokeWidth={2.5} 
              fillOpacity={1} 
              fill="url(#demandCurve)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-2 text-center">
        <span className="text-[11px] text-slate-400">
          Distribution accounts for live weather, festival timing, and customer store traffic patterns.
        </span>
      </div>
    </div>
  );
};
