import React from 'react';
import { CompetitorPrice } from '../../types';
import { Users, Store, MapPin, Star, Clock } from 'lucide-react';

interface CompetitorMiniCardsProps {
  competitors: CompetitorPrice[];
  currentPrice: number;
}

export const CompetitorMiniCards: React.FC<CompetitorMiniCardsProps> = ({ competitors, currentPrice }) => {
  return (
    <div className="glass-panel p-5 rounded-2xl border border-slate-800/80">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-brand-400" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Live Competitor Benchmarks
          </h3>
        </div>
        <span className="text-[11px] text-slate-400">Nearby Local Retailers</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {competitors.map((comp) => {
          const diff = comp.price - currentPrice;
          return (
            <div 
              key={comp.id} 
              className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-all"
            >
              <div className="flex items-start justify-between gap-1 mb-2">
                <span className="text-xs font-semibold text-slate-200 truncate">
                  {comp.sellerName}
                </span>
                <span className="text-sm font-extrabold text-white">
                  ₹{comp.price}
                </span>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-slate-500" />
                  {comp.distance}
                </span>

                <span className={`font-semibold px-1.5 py-0.5 rounded text-[10px] ${
                  diff > 0 
                    ? 'bg-emerald-500/10 text-emerald-300' 
                    : diff < 0 
                    ? 'bg-rose-500/10 text-rose-300' 
                    : 'bg-slate-800 text-slate-300'
                }`}>
                  {diff > 0 ? `+₹${diff} higher` : diff < 0 ? `-₹${Math.abs(diff)} lower` : 'Same'}
                </span>
              </div>

              <div className="mt-2 pt-1.5 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-slate-400">
                <span className="flex items-center gap-1">
                  <Star className="w-2.5 h-2.5 text-amber-400 fill-amber-400" />
                  {comp.rating}
                </span>
                <span className="flex items-center gap-0.5">
                  <Clock className="w-2.5 h-2.5" />
                  {comp.lastChecked}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
