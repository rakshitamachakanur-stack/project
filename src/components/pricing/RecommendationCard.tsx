import React, { useState } from 'react';
import { PriceRecommendation } from '../../types';
import { useApp } from '../../context/AppContext';
import { 
  Sparkles, 
  Check, 
  ArrowRight, 
  TrendingUp, 
  ShieldCheck, 
  HelpCircle, 
  CheckCircle2,
  DollarSign,
  AlertCircle
} from 'lucide-react';
import { FactorBreakdown } from './FactorBreakdown';

interface RecommendationCardProps {
  recommendation: PriceRecommendation;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({ recommendation }) => {
  const { approveRecommendation, keepCurrentPrice } = useApp();
  const [isApproving, setIsApproving] = useState(false);

  const handleApprove = () => {
    setIsApproving(true);
    setTimeout(() => {
      approveRecommendation(recommendation);
      setIsApproving(false);
    }, 400);
  };

  const handleKeep = () => {
    keepCurrentPrice(recommendation);
  };

  const isApproved = recommendation.approved;
  const isPriceIncrease = recommendation.recommendedPrice > recommendation.currentPrice;
  const priceDiff = recommendation.recommendedPrice - recommendation.currentPrice;

  return (
    <div className={`rounded-3xl border transition-all duration-300 relative overflow-hidden ${
      isApproved 
        ? 'glass-panel-emerald border-emerald-500/50' 
        : 'glass-panel-glow border-brand-500/40'
    }`}>
      {/* Top Banner */}
      <div className="px-6 py-4 border-b border-slate-800/80 bg-slate-900/60 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-brand-500/20 border border-brand-500/30 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-brand-400" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              Smart Price Recommendation
              {isApproved && (
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Approved & Active
                </span>
              )}
            </h2>
            <p className="text-xs text-slate-400">
              For: <span className="text-slate-200 font-semibold">{recommendation.productName}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Cost Base:</span>
          <span className="text-xs font-bold text-slate-200 bg-slate-800 px-2 py-0.5 rounded-md">
            ₹{recommendation.costPrice}
          </span>
        </div>
      </div>

      <div className="p-6 lg:p-8 space-y-6">
        {/* Core Price Comparison Metric Flow */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          {/* Current Price */}
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Current Price
            </span>
            <div className="text-3xl font-extrabold text-slate-300">
              ₹{recommendation.currentPrice}
            </div>
            <div className="text-xs text-slate-400 mt-1 font-medium">
              Margin: ₹{recommendation.currentProfitPerUnit}/unit
            </div>
          </div>

          {/* Flow Connector Arrow */}
          <div className="hidden md:flex flex-col items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-400 shadow-md">
              <ArrowRight className="w-5 h-5 animate-pulse" />
            </div>
            <span className="text-[11px] text-brand-400 font-semibold mt-1">AI Recommendation</span>
          </div>

          {/* Recommended Price Hero */}
          <div className="p-5 rounded-2xl bg-gradient-to-b from-brand-600/20 via-brand-600/10 to-transparent border border-brand-500/40 text-center shadow-xl shadow-brand-500/10 relative">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-300 block mb-1">
              Recommended Price
            </span>
            <div className="text-4xl font-black text-white">
              ₹{recommendation.recommendedPrice}
            </div>
            <div className="flex items-center justify-center gap-1.5 mt-1 text-xs">
              <span className={`font-bold ${isPriceIncrease ? 'text-emerald-400' : 'text-blue-400'}`}>
                {priceDiff >= 0 ? `+₹${priceDiff}` : `-₹${Math.abs(priceDiff)}`} ({((priceDiff / recommendation.currentPrice) * 100).toFixed(0)}%)
              </span>
              <span className="text-slate-400">vs current</span>
            </div>
          </div>

          {/* Expected Profit / Impact */}
          <div className="p-5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block mb-1">
              Expected Profit
            </span>
            <div className="text-3xl font-extrabold text-white">
              ₹{recommendation.recommendedProfitPerUnit}
              <span className="text-sm font-normal text-slate-400">/unit</span>
            </div>
            <div className="text-xs text-emerald-300 mt-1 font-semibold flex items-center justify-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>
                {recommendation.potentialProfitGain >= 0 ? `+₹${recommendation.potentialProfitGain}` : `₹${recommendation.potentialProfitGain}`} daily gain
              </span>
            </div>
          </div>
        </div>

        {/* Expected Demand & Daily Revenue bar */}
        <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 font-bold">
              📦
            </div>
            <div>
              <span className="text-xs text-slate-400 block">Expected Daily Demand</span>
              <span className="text-sm font-bold text-white">
                {recommendation.expectedDemand} units/day
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold">
              💰
            </div>
            <div>
              <span className="text-xs text-slate-400 block">Forecasted Daily Revenue</span>
              <span className="text-sm font-bold text-white">
                ₹{recommendation.expectedDailyRevenue.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 font-bold">
              📈
            </div>
            <div>
              <span className="text-xs text-slate-400 block">Forecasted Daily Net Profit</span>
              <span className="text-sm font-bold text-emerald-400">
                ₹{recommendation.expectedDailyProfit.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        </div>

        {/* AI Explanation in Simple Language */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-brand-300">
            <HelpCircle className="w-4 h-4 text-brand-400" />
            <h4 className="text-xs font-bold uppercase tracking-wider">
              Why This Price? (AI Transparent Explanation)
            </h4>
          </div>
          <p className="text-sm text-slate-200 leading-relaxed font-normal">
            "{recommendation.explanation}"
          </p>
        </div>

        {/* Factor Breakdown Bars */}
        <div className="pt-2">
          <FactorBreakdown factors={recommendation.factors} />
        </div>

        {/* Human-In-The-Loop Approval Action Controls */}
        <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              Prices change <strong>only when approved by you</strong>. No automatic edits.
            </span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleKeep}
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl border border-slate-700 hover:border-slate-600 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-sm font-semibold transition-colors"
            >
              Keep Current Price (₹{recommendation.currentPrice})
            </button>

            <button
              onClick={handleApprove}
              disabled={isApproved || isApproving}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-white transition-all shadow-lg ${
                isApproved
                  ? 'bg-emerald-600/50 cursor-not-allowed text-emerald-200'
                  : 'bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 shadow-emerald-500/20 hover:shadow-emerald-500/40 transform hover:-translate-y-0.5 active:translate-y-0'
              }`}
            >
              {isApproving ? (
                <span>Applying Price...</span>
              ) : isApproved ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Approved & Live</span>
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  <span>Approve Price (₹{recommendation.recommendedPrice})</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
