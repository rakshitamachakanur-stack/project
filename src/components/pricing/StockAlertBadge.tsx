import React from 'react';
import { StockAlert } from '../../types';
import { AlertCircle, CheckCircle, Info, Clock, AlertTriangle } from 'lucide-react';

interface StockAlertBadgeProps {
  stockAlert: StockAlert;
  stock: number;
}

export const StockAlertBadge: React.FC<StockAlertBadgeProps> = ({ stockAlert, stock }) => {
  let badgeTheme = {
    bg: 'bg-emerald-950/40',
    border: 'border-emerald-500/30',
    text: 'text-emerald-300',
    icon: <CheckCircle className="w-5 h-5 text-emerald-400" />
  };

  if (stockAlert.status === 'warning') {
    badgeTheme = {
      bg: 'bg-amber-950/40',
      border: 'border-amber-500/30',
      text: 'text-amber-300',
      icon: <AlertTriangle className="w-5 h-5 text-amber-400" />
    };
  } else if (stockAlert.status === 'critical') {
    badgeTheme = {
      bg: 'bg-red-950/40',
      border: 'border-red-500/40',
      text: 'text-red-300',
      icon: <AlertCircle className="w-5 h-5 text-red-400" />
    };
  } else if (stockAlert.status === 'excess') {
    badgeTheme = {
      bg: 'bg-blue-950/40',
      border: 'border-blue-500/30',
      text: 'text-blue-300',
      icon: <Info className="w-5 h-5 text-blue-400" />
    };
  }

  return (
    <div className={`p-4 rounded-xl border backdrop-blur-md transition-all ${badgeTheme.bg} ${badgeTheme.border}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          {badgeTheme.icon}
          <div>
            <span className={`text-sm font-bold ${badgeTheme.text}`}>
              {stockAlert.label}
            </span>
            <span className="ml-2 text-xs text-slate-400">
              ({stock} units on hand)
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900/80 border border-slate-800 text-xs text-slate-300 shrink-0">
          <Clock className="w-3.5 h-3.5 text-slate-400" />
          <span>Lasts ~<strong className="text-white font-semibold">{stockAlert.daysRemaining}</strong> days</span>
        </div>
      </div>

      <p className="mt-2 text-xs text-slate-300 leading-relaxed">
        {stockAlert.message}
      </p>

      <div className="mt-2.5 pt-2 border-t border-slate-800/40 flex items-center gap-2 text-xs">
        <span className="font-semibold text-slate-400">Action:</span>
        <span className="text-slate-300 font-medium">{stockAlert.actionNote}</span>
      </div>
    </div>
  );
};
