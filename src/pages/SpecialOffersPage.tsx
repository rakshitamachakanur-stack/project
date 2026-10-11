import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Tag, 
  Sparkles, 
  TrendingUp, 
  Calendar, 
  Check, 
  Power, 
  AlertCircle, 
  PartyPopper, 
  Layers, 
  Clock, 
  Layers2,
  DollarSign
} from 'lucide-react';

export const SpecialOffersPage: React.FC = () => {
  const { specialOffers, toggleOffer } = useApp();

  const activeCount = specialOffers.filter(o => o.isActive).length;
  const totalProjectedProfit = specialOffers
    .filter(o => o.isActive)
    .reduce((sum, o) => sum + o.expectedProfitImpact, 0);

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'festival':
        return {
          icon: <PartyPopper className="w-3.5 h-3.5 text-purple-400" />,
          label: 'Festival Surge Deal',
          border: 'border-purple-500/30 bg-purple-950/40 text-purple-300'
        };
      case 'excess_stock':
        return {
          icon: <Layers className="w-3.5 h-3.5 text-amber-400" />,
          label: 'Overstock Clearance',
          border: 'border-amber-500/30 bg-amber-950/40 text-amber-300'
        };
      case 'slow_moving':
        return {
          icon: <Clock className="w-3.5 h-3.5 text-emerald-400" />,
          label: 'Slow Mover Booster',
          border: 'border-emerald-500/30 bg-emerald-950/40 text-emerald-300'
        };
      default:
        return {
          icon: <Tag className="w-3.5 h-3.5 text-blue-400" />,
          label: 'Smart Bundle Offer',
          border: 'border-blue-500/30 bg-blue-950/40 text-blue-300'
        };
    }
  };

  return (
    <div className="p-4 lg:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              AI Dynamic Special Offers
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-brand-500/10 text-brand-400 border border-brand-500/20">
              Demand-Triggered
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Automated promotion generator based on real-time shelf velocity, festivals, and excess stock.
          </p>
        </div>

        {/* Status Counter */}
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-3">
            <div>
              <span className="text-[11px] text-slate-400 block font-medium">Active Offers</span>
              <span className="text-base font-extrabold text-emerald-400">{activeCount} Running</span>
            </div>
            <div className="h-7 w-px bg-slate-800" />
            <div>
              <span className="text-[11px] text-slate-400 block font-medium">Projected Gain</span>
              <span className="text-base font-extrabold text-white">+₹{totalProjectedProfit.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Offers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {specialOffers.map((offer) => {
          const typeBadge = getTypeBadge(offer.type);
          return (
            <div
              key={offer.id}
              className={`rounded-3xl border p-6 lg:p-7 flex flex-col justify-between transition-all duration-300 ${
                offer.isActive 
                  ? 'glass-panel-glow border-brand-500/40 shadow-xl' 
                  : 'glass-panel border-slate-800/80 opacity-80 hover:opacity-100'
              }`}
            >
              <div>
                {/* Top Badge & Status Toggle */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${typeBadge.border}`}>
                    {typeBadge.icon}
                    <span>{typeBadge.label}</span>
                  </div>

                  <button
                    onClick={() => toggleOffer(offer.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      offer.isActive
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm shadow-emerald-500/20'
                        : 'bg-slate-800 text-slate-400 hover:text-white border border-slate-700'
                    }`}
                  >
                    <Power className="w-3.5 h-3.5" />
                    <span>{offer.isActive ? 'Active in Store' : 'Inactive'}</span>
                  </button>
                </div>

                {/* Offer Name & Product Target */}
                <h3 className="text-xl font-black text-white tracking-tight mb-1">
                  {offer.name}
                </h3>
                <p className="text-xs text-slate-300 font-medium mb-4">
                  {offer.tagline}
                </p>

                {/* Discount Hero Banner */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-brand-600/20 via-purple-600/10 to-transparent border border-brand-500/30 flex items-center justify-between mb-5">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-brand-300 block">
                      Customer Discount
                    </span>
                    <span className="text-2xl font-black text-white">
                      {offer.discount}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-[11px] text-slate-400 block">Applies to:</span>
                    <span className="text-xs font-bold text-slate-200">
                      {offer.productName}
                    </span>
                  </div>
                </div>

                {/* Expected Results */}
                <div className="grid grid-cols-2 gap-3 mb-5">
                  <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                    <span className="text-[11px] text-slate-400 font-medium block">
                      Expected Sales Uplift
                    </span>
                    <span className="text-sm font-bold text-emerald-400 flex items-center gap-1 mt-0.5">
                      <TrendingUp className="w-3.5 h-3.5" />
                      {offer.expectedSalesIncrease}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                    <span className="text-[11px] text-slate-400 font-medium block">
                      Expected Profit Impact
                    </span>
                    <span className="text-sm font-bold text-white mt-0.5">
                      +₹{offer.expectedProfitImpact.toLocaleString('en-IN')} net
                    </span>
                  </div>
                </div>
              </div>

              {/* Footer Timeline & Action Toggle */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                  <span>Valid: {offer.startDate} – {offer.endDate}</span>
                </div>

                <button
                  onClick={() => toggleOffer(offer.id)}
                  className={`font-bold transition-colors ${
                    offer.isActive ? 'text-amber-400 hover:text-amber-300' : 'text-brand-400 hover:text-brand-300'
                  }`}
                >
                  {offer.isActive ? 'Pause Promotion' : 'Activate Deal Now →'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
