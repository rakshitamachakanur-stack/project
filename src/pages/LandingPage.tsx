import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sparkles, 
  ArrowRight, 
  TrendingUp, 
  ShieldCheck, 
  Users, 
  Tag, 
  BarChart3, 
  Layers, 
  Sun, 
  CloudRain, 
  PartyPopper, 
  CheckCircle2, 
  Clock, 
  Award,
  Zap,
  Store,
  HelpCircle
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setCurrentView, loginAsDemo, products } = useApp();

  // Mini live demo state right in the landing hero
  const [selectedDemoProductIndex, setSelectedDemoProductIndex] = useState(0);
  const [demoTemp, setDemoTemp] = useState(34);
  const [demoRain, setDemoRain] = useState<'No' | 'Heavy'>('No');
  const [demoFestival, setDemoFestival] = useState(true);

  const sampleProducts = [
    { name: 'Coca-Cola (750ml)', cost: 25, currentPrice: 40, baseRec: 43, stock: 100 },
    { name: 'Monsoon Heavy Umbrella', cost: 175, currentPrice: 299, baseRec: 339, stock: 18 },
    { name: 'Amul Ice Cream (700ml)', cost: 90, currentPrice: 130, baseRec: 142, stock: 24 }
  ];

  const currentSample = sampleProducts[selectedDemoProductIndex];

  // Dynamic calculate for hero preview
  let dynamicRec = currentSample.currentPrice;
  if (selectedDemoProductIndex === 0) { // Cold drink
    if (demoTemp >= 32) dynamicRec += 2;
    if (demoFestival) dynamicRec += 1;
  } else if (selectedDemoProductIndex === 1) { // Umbrella
    if (demoRain === 'Heavy') dynamicRec += 40;
    if (demoFestival) dynamicRec += 10;
  } else {
    if (demoTemp >= 30) dynamicRec += 8;
    if (demoFestival) dynamicRec += 4;
  }

  const profitDiff = (dynamicRec - currentSample.cost) - (currentSample.currentPrice - currentSample.cost);

  return (
    <div className="min-h-screen bg-[#060a12] text-slate-100 flex flex-col selection:bg-brand-500 selection:text-white">
      {/* Top Navigation */}
      <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 via-indigo-600 to-purple-500 p-0.5 shadow-lg shadow-brand-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-brand-400" />
            </div>
          </div>
          <span className="font-extrabold text-lg tracking-tight text-white">
            PricePilot <span className="text-brand-400">AI</span>
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
          <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#why-us" className="hover:text-white transition-colors">Why PricePilot?</a>
          <a href="#interactive-demo" className="hover:text-white transition-colors">Interactive Demo</a>
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentView('auth')}
            className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
          >
            Sign In
          </button>
          <button
            onClick={() => loginAsDemo()}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-xs font-bold text-white shadow-lg shadow-brand-500/20 hover:shadow-brand-500/40 transition-all transform hover:-translate-y-0.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Launch Demo App</span>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-24 px-6 overflow-hidden">
        {/* Glow backdrop blobs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[350px] h-[250px] bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-300 text-xs font-semibold animate-pulse-slow">
            <Sparkles className="w-3.5 h-3.5 text-brand-400" />
            <span>Intelligent Dynamic Pricing for Retailers & Restaurants</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.1]">
            Price Smarter. <br />
            <span className="bg-gradient-to-r from-brand-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
              Sell Better.
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            AI-powered pricing for small businesses that turns demand, weather, stock, and competitor prices into smarter decisions. 
            <strong className="text-white"> You always approve every price.</strong>
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => loginAsDemo()}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-brand-600 via-indigo-600 to-purple-600 hover:from-brand-500 hover:to-indigo-500 text-sm font-bold text-white shadow-xl shadow-brand-500/25 hover:shadow-brand-500/40 transition-all transform hover:-translate-y-0.5"
            >
              <span>Explore Live Demo Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setCurrentView('auth')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700/80 text-sm font-semibold transition-colors"
            >
              Seller Sign In
            </button>
          </div>

          {/* Social Proof stats */}
          <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto text-left">
            <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/80">
              <span className="text-2xl font-black text-white">+18.4%</span>
              <p className="text-xs text-slate-400 mt-0.5">Average Profit Uplift</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/80">
              <span className="text-2xl font-black text-emerald-400">100%</span>
              <p className="text-xs text-slate-400 mt-0.5">Seller Approval Control</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/80">
              <span className="text-2xl font-black text-brand-400">0.2s</span>
              <p className="text-xs text-slate-400 mt-0.5">Instant AI Recommendation</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/80">
              <span className="text-2xl font-black text-purple-400">₹0</span>
              <p className="text-xs text-slate-400 mt-0.5">Complicated Setup</p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Hero Widget Section */}
      <section id="interactive-demo" className="py-16 px-6 bg-slate-950/60 border-y border-slate-800/80">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-400">Try It Live Right Now</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              See PricePilot AI Adapt to Market Signals
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1.5">
              Change the weather, toggle festivals, or switch products to preview the real-time recommendation.
            </p>
          </div>

          <div className="glass-panel-glow p-6 sm:p-8 rounded-3xl border border-brand-500/30 shadow-2xl">
            {/* Product Switcher */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
              {sampleProducts.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedDemoProductIndex(idx)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    selectedDemoProductIndex === idx
                      ? 'bg-brand-600 text-white shadow-lg shadow-brand-500/25'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {p.name}
                </button>
              ))}
            </div>

            {/* Condition Sliders */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-slate-900/80 border border-slate-800 mb-6">
              <div>
                <label className="text-xs font-semibold text-slate-300 flex items-center justify-between mb-2">
                  <span className="flex items-center gap-1.5">
                    <Sun className="w-3.5 h-3.5 text-amber-400" />
                    Temperature:
                  </span>
                  <strong className="text-amber-400">{demoTemp}°C</strong>
                </label>
                <input
                  type="range"
                  min="18"
                  max="42"
                  value={demoTemp}
                  onChange={(e) => setDemoTemp(Number(e.target.value))}
                  className="w-full accent-brand-500 cursor-pointer"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 flex items-center justify-between mb-2">
                  <span className="flex items-center gap-1.5">
                    <CloudRain className="w-3.5 h-3.5 text-blue-400" />
                    Rain Condition:
                  </span>
                  <strong className="text-blue-400">{demoRain}</strong>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setDemoRain('No')}
                    className={`py-1 rounded-lg text-xs font-medium border ${
                      demoRain === 'No' ? 'bg-slate-800 border-slate-700 text-white' : 'text-slate-500 border-slate-800'
                    }`}
                  >
                    Clear Skies
                  </button>
                  <button
                    onClick={() => setDemoRain('Heavy')}
                    className={`py-1 rounded-lg text-xs font-medium border ${
                      demoRain === 'Heavy' ? 'bg-blue-950 border-blue-500/40 text-blue-300' : 'text-slate-500 border-slate-800'
                    }`}
                  >
                    Monsoon Rain
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 flex items-center justify-between mb-2">
                  <span className="flex items-center gap-1.5">
                    <PartyPopper className="w-3.5 h-3.5 text-purple-400" />
                    Festival Rush:
                  </span>
                  <strong className="text-purple-400">{demoFestival ? 'Active' : 'No'}</strong>
                </label>
                <button
                  onClick={() => setDemoFestival(!demoFestival)}
                  className={`w-full py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                    demoFestival
                      ? 'bg-purple-950 border-purple-500/40 text-purple-300'
                      : 'bg-slate-900 border-slate-800 text-slate-500'
                  }`}
                >
                  {demoFestival ? '🎉 Festival Demand Active' : 'Normal Business Day'}
                </button>
              </div>
            </div>

            {/* Simulated Recommendation Display */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
                <span className="text-[11px] font-bold uppercase text-slate-400 block mb-1">Your Price</span>
                <span className="text-2xl font-black text-slate-300">₹{currentSample.currentPrice}</span>
                <span className="text-[10px] text-slate-500 block mt-0.5">Cost: ₹{currentSample.cost}</span>
              </div>

              <div className="p-4 rounded-xl bg-brand-600/15 border border-brand-500/40 text-center">
                <span className="text-[11px] font-bold uppercase text-brand-300 block mb-1">AI Recommendation</span>
                <span className="text-3xl font-black text-white">₹{dynamicRec}</span>
                <span className="text-[10px] text-brand-400 block mt-0.5 font-semibold">
                  {dynamicRec > currentSample.currentPrice ? `+₹${dynamicRec - currentSample.currentPrice} Recommended Upside` : 'Optimal Margin'}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-center">
                <span className="text-[11px] font-bold uppercase text-emerald-400 block mb-1">Profit Uplift</span>
                <span className="text-2xl font-black text-emerald-300">
                  {profitDiff >= 0 ? `+₹${profitDiff}` : `₹${profitDiff}`}
                  <span className="text-xs font-normal text-slate-400">/unit</span>
                </span>
                <span className="text-[10px] text-emerald-400 block mt-0.5 font-semibold">
                  Zero guesswork involved
                </span>
              </div>
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={() => loginAsDemo()}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white text-slate-950 hover:bg-slate-200 text-xs font-bold transition-all"
              >
                <span>Open Full Merchant Dashboard with this Data</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-400">Simple 5-Step Process</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
            How PricePilot AI Works
          </h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto mt-2">
            Built specifically for neighborhood stores, kiranas, cafes, and local brands.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[
            { step: '01', title: 'Enter Product Data', desc: 'Select or input current price, product cost, and shelf stock.' },
            { step: '02', title: 'AI Predicts Demand', desc: 'Simulates footfall considering temperature, rain, and festival season.' },
            { step: '03', title: 'Compare Competitors', desc: 'Checks live price corridor across nearby shops (Shop A, B, C).' },
            { step: '04', title: 'Get Smart Price', desc: 'Recommends optimal price with plain-language explanation of why.' },
            { step: '05', title: 'Approve & Profit', desc: 'One click to approve. The price changes only when you say so.' },
          ].map((item, idx) => (
            <div key={idx} className="glass-panel p-5 rounded-2xl border border-slate-800/80 relative flex flex-col justify-between">
              <div>
                <span className="text-3xl font-black text-brand-500/30 block mb-2">{item.step}</span>
                <h3 className="text-sm font-bold text-white mb-1.5">{item.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
              <div className="mt-4 pt-2 border-t border-slate-800/40">
                <CheckCircle2 className="w-4 h-4 text-brand-400" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 px-6 bg-slate-950/40 border-t border-slate-800/80">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-400">All-In-One Toolkit</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
              Every Tool You Need to Stop Leaving Money on the Table
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-panel p-6 rounded-2xl border border-slate-800/80 hover:border-brand-500/40 transition-all">
              <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-400 mb-4">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">AI Demand Forecasting</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Anticipate exact daily unit sales. View low, expected, and peak volume ranges with clear confidence scores.
              </p>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-slate-800/80 hover:border-brand-500/40 transition-all">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">Competitor Intelligence</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Track neighboring shops in real-time. Discover if you are underpriced or losing sales due to excessive margins.
              </p>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-slate-800/80 hover:border-brand-500/40 transition-all">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">Stock Alert Longevity</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Never get caught empty-handed. Alerts warn you when stock will last under 1.5 days or when overstock requires discount clearance.
              </p>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-slate-800/80 hover:border-brand-500/40 transition-all">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4">
                <Tag className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">Dynamic Special Offers</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Auto-generate festival deals, buy-2 bundles, and happy hour discounts to clear slow inventory profitably.
              </p>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-slate-800/80 hover:border-brand-500/40 transition-all">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-4">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">Profit & Loss Comparison</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Directly compare flat baseline pricing vs AI-optimized revenue. See exactly how much extra money was earned.
              </p>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-slate-800/80 hover:border-brand-500/40 transition-all">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">Human-Approved Safety</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Zero algorithmic black-boxes. Plain conversational explanations explain the rationale before you approve.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why PricePilot Section */}
      <section id="why-us" className="py-20 px-6 max-w-5xl mx-auto">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-tr from-brand-950/60 via-slate-900/90 to-purple-950/40 border border-brand-500/30">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-400">Why PricePilot AI?</span>
            <h2 className="text-3xl font-black text-white">
              Designed For Small Sellers, Not Multi-Billion Corporations
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Enterprise pricing software costs thousands of dollars a month, requires data scientists, and blindly matches prices. 
              PricePilot AI brings simple, profitable, human-in-the-loop pricing to every neighborhood merchant.
            </p>

            <div className="pt-6 flex justify-center">
              <button
                onClick={() => loginAsDemo()}
                className="flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm shadow-xl shadow-brand-500/25 transition-all transform hover:-translate-y-0.5"
              >
                <span>Try Demo Account Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-8 px-6 border-t border-slate-800/80 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-brand-400" />
            <span className="font-bold text-slate-300">PricePilot AI</span>
            <span>— Your AI Copilot for Smarter Pricing</span>
          </div>
          <div>
            <span>Built for Demo & Hackathon • Pure React & TypeScript</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
