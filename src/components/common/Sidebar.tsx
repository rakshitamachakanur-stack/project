import React from 'react';
import { useApp, AppView } from '../../context/AppContext';
import { 
  LayoutDashboard, 
  Sparkles, 
  BarChart3, 
  Tag, 
  TrendingUp, 
  Package, 
  History, 
  HelpCircle,
  ExternalLink,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

interface SidebarProps {
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isMobileOpen, onCloseMobile }) => {
  const { currentView, setCurrentView } = useApp();

  const navItems: { view: AppView; label: string; icon: React.ReactNode; badge?: string }[] = [
    { 
      view: 'dashboard', 
      label: 'Main Dashboard', 
      icon: <LayoutDashboard className="w-4 h-4" /> 
    },
    { 
      view: 'pricing', 
      label: 'Smart Price Detection', 
      icon: <Sparkles className="w-4 h-4 text-brand-400" />,
      badge: 'AI Core'
    },
    { 
      view: 'competitors', 
      label: 'Competitor Analysis', 
      icon: <BarChart3 className="w-4 h-4" /> 
    },
    { 
      view: 'offers', 
      label: 'Special Offers', 
      icon: <Tag className="w-4 h-4" /> 
    },
    { 
      view: 'profit-loss', 
      label: 'Profit & Loss', 
      icon: <TrendingUp className="w-4 h-4" /> 
    },
    { 
      view: 'products', 
      label: 'Product Catalog', 
      icon: <Package className="w-4 h-4" /> 
    },
    { 
      view: 'history', 
      label: 'Price History', 
      icon: <History className="w-4 h-4" /> 
    },
  ];

  const handleNav = (view: AppView) => {
    setCurrentView(view);
    if (onCloseMobile) onCloseMobile();
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-slate-950/90 border-r border-slate-800/80 p-4">
      {/* Platform Title */}
      <div className="px-3 py-2 mb-4">
        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Merchant Workspace</p>
      </div>

      {/* Navigation links */}
      <nav className="flex-1 space-y-1.5">
        {navItems.map(item => {
          const isActive = currentView === item.view;
          return (
            <button
              key={item.view}
              onClick={() => handleNav(item.view)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'bg-brand-600/15 text-brand-300 border border-brand-500/30 shadow-md shadow-brand-500/5'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={isActive ? 'text-brand-400' : 'text-slate-400'}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </div>
              <div className="flex items-center gap-1.5">
                {item.badge && (
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-brand-500/20 text-brand-300 border border-brand-500/30">
                    {item.badge}
                  </span>
                )}
                {isActive && <ChevronRight className="w-3.5 h-3.5 text-brand-400" />}
              </div>
            </button>
          );
        })}
      </nav>

      {/* Human In The Loop Trust Card */}
      <div className="mt-auto pt-4 border-t border-slate-800/80">
        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 mb-3">
          <div className="flex items-center gap-2 mb-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-xs font-semibold text-white">Seller In Control</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-snug">
            PricePilot AI never changes prices automatically. All suggestions require your 1-click approval.
          </p>
        </div>

        <button
          onClick={() => handleNav('landing')}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 text-xs font-medium text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 rounded-lg border border-slate-800 transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>View Public Landing Page</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 h-[calc(100vh-4rem)] sticky top-16 z-20">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div 
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
            onClick={onCloseMobile}
          />
          <div className="fixed inset-y-0 left-0 w-64 z-50">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
