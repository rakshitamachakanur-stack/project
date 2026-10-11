import React from 'react';
import { CloudSun, PartyPopper, Users, Layers, TrendingUp } from 'lucide-react';

interface FactorBreakdownProps {
  factors: {
    weather: number;
    festival: number;
    competitorPrice: number;
    stockLevel: number;
    demand: number;
  };
}

export const FactorBreakdown: React.FC<FactorBreakdownProps> = ({ factors }) => {
  const factorList = [
    { 
      label: 'Weather & Climate Signal', 
      value: factors.weather, 
      icon: <CloudSun className="w-4 h-4 text-amber-400" />,
      color: 'bg-amber-500'
    },
    { 
      label: 'Festival & Seasonal Surge', 
      value: factors.festival, 
      icon: <PartyPopper className="w-4 h-4 text-purple-400" />,
      color: 'bg-purple-500'
    },
    { 
      label: 'Competitor Price Index', 
      value: factors.competitorPrice, 
      icon: <Users className="w-4 h-4 text-brand-400" />,
      color: 'bg-brand-500'
    },
    { 
      label: 'Stock Availability Pressure', 
      value: factors.stockLevel, 
      icon: <Layers className="w-4 h-4 text-emerald-400" />,
      color: 'bg-emerald-500'
    },
    { 
      label: 'Customer Demand Elasticity', 
      value: factors.demand, 
      icon: <TrendingUp className="w-4 h-4 text-blue-400" />,
      color: 'bg-blue-500'
    },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
          Decision Factors Weighting
        </span>
        <span className="text-[11px] text-slate-400">100% Transparent Reasoning</span>
      </div>

      <div className="space-y-2.5">
        {factorList.map((item, idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-slate-300">
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </div>
              <span className="font-bold text-white">{item.value}%</span>
            </div>

            {/* Progress bar */}
            <div className="h-2 w-full bg-slate-800/80 rounded-full overflow-hidden p-0.5">
              <div 
                className={`h-full rounded-full transition-all duration-700 ease-out ${item.color}`}
                style={{ width: `${item.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
