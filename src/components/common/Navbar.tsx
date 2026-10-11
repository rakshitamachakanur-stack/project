import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Sparkles, 
  Bell, 
  Sun, 
  CloudRain, 
  PartyPopper, 
  Store, 
  LogOut, 
  ExternalLink,
  ChevronDown,
  Menu,
  SlidersHorizontal
} from 'lucide-react';

interface NavbarProps {
  onToggleMobileMenu?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleMobileMenu }) => {
  const { 
    user, 
    logout, 
    setCurrentView, 
    notifications, 
    setIsNotificationDrawerOpen,
    weather,
    updateWeather,
    showToast
  } = useApp();

  const [showSimMenu, setShowSimMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const toggleRain = () => {
    const nextRain = weather.rain === 'No' ? 'Heavy' : weather.rain === 'Heavy' ? 'Drizzle' : 'No';
    updateWeather({ rain: nextRain });
    showToast(`Weather updated: ${nextRain === 'No' ? 'Clear Skies' : nextRain + ' Rain'}`, 'info');
  };

  const toggleFestival = () => {
    const nextFest = !weather.festival;
    updateWeather({ 
      festival: nextFest, 
      festivalName: nextFest ? 'Ganesh Chaturthi Festive Rush' : undefined 
    });
    showToast(`Festival mode: ${nextFest ? 'Active (Surge on)' : 'Inactive'}`, 'info');
  };

  const adjustTemp = (delta: number) => {
    const newTemp = Math.min(45, Math.max(15, weather.temperature + delta));
    updateWeather({ temperature: newTemp });
    showToast(`Ambient Temperature: ${newTemp}°C`, 'info');
  };

  return (
    <header className="sticky top-0 z-30 h-16 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl px-4 lg:px-6 flex items-center justify-between">
      {/* Left: Mobile Toggle & Brand/Store Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileMenu}
          className="lg:hidden p-2 text-slate-400 hover:text-white hover:bg-slate-800/60 rounded-lg"
          aria-label="Toggle menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div 
            onClick={() => setCurrentView('dashboard')}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 via-indigo-600 to-purple-500 p-0.5 shadow-lg shadow-brand-500/20 group-hover:shadow-brand-500/40 transition-shadow">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-brand-400 group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div className="hidden sm:block">
              <span className="font-bold text-base tracking-tight text-white flex items-center gap-1.5">
                PricePilot <span className="text-brand-400">AI</span>
                <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-brand-500/10 text-brand-300 border border-brand-500/20 rounded-md">DEMO</span>
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2 pl-3 border-l border-slate-800">
            <Store className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-xs font-medium text-slate-300 truncate max-w-[180px]">
              {user?.storeName || 'Demo Merchant Store'}
            </span>
          </div>
        </div>
      </div>

      {/* Middle: Live Market Environment Simulator Pills */}
      <div className="hidden md:flex items-center gap-2 bg-slate-900/90 border border-slate-800/80 rounded-full px-3 py-1 shadow-inner">
        <div className="flex items-center gap-1.5 text-xs text-slate-400 pl-1 pr-2 border-r border-slate-800">
          <SlidersHorizontal className="w-3 h-3 text-brand-400" />
          <span className="font-medium text-slate-300 text-[11px]">Demo Conditions:</span>
        </div>

        {/* Temperature Controller */}
        <div className="flex items-center gap-1 bg-slate-800/60 rounded-full px-2 py-0.5 text-xs text-amber-300 border border-amber-500/20">
          <Sun className="w-3.5 h-3.5 text-amber-400" />
          <span className="font-semibold">{weather.temperature}°C</span>
          <div className="flex items-center gap-0.5 ml-1">
            <button 
              onClick={() => adjustTemp(-2)} 
              className="w-4 h-4 flex items-center justify-center rounded text-slate-400 hover:text-white hover:bg-slate-700 text-[10px]"
              title="Decrease temperature"
            >
              -
            </button>
            <button 
              onClick={() => adjustTemp(2)} 
              className="w-4 h-4 flex items-center justify-center rounded text-slate-400 hover:text-white hover:bg-slate-700 text-[10px]"
              title="Increase temperature"
            >
              +
            </button>
          </div>
        </div>

        {/* Rain Toggle */}
        <button
          onClick={toggleRain}
          className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors border ${
            weather.rain !== 'No'
              ? 'bg-blue-950/60 text-blue-300 border-blue-500/30'
              : 'bg-slate-800/50 text-slate-400 border-slate-700/40 hover:text-slate-200'
          }`}
          title="Click to toggle rain condition"
        >
          <CloudRain className="w-3.5 h-3.5 text-blue-400" />
          <span>{weather.rain === 'No' ? 'Dry' : weather.rain + ' Rain'}</span>
        </button>

        {/* Festival Toggle */}
        <button
          onClick={toggleFestival}
          className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors border ${
            weather.festival
              ? 'bg-purple-950/60 text-purple-300 border-purple-500/30 shadow-sm shadow-purple-500/20'
              : 'bg-slate-800/50 text-slate-400 border-slate-700/40 hover:text-slate-200'
          }`}
          title="Click to toggle festival demand surge"
        >
          <PartyPopper className="w-3.5 h-3.5 text-purple-400" />
          <span>{weather.festival ? 'Festival Active' : 'Normal Day'}</span>
        </button>
      </div>

      {/* Right: Actions, Notifications, Profile */}
      <div className="flex items-center gap-2.5">
        {/* Landing Page link */}
        <button
          onClick={() => setCurrentView('landing')}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors"
        >
          <span>Landing Page</span>
          <ExternalLink className="w-3 h-3" />
        </button>

        {/* Notifications Button */}
        <button
          onClick={() => setIsNotificationDrawerOpen(true)}
          className="relative p-2 text-slate-300 hover:text-white hover:bg-slate-900 rounded-xl border border-transparent hover:border-slate-800 transition-colors"
          aria-label="View notifications"
        >
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
              {unreadCount}
            </span>
          )}
        </button>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2 p-1.5 pl-2 text-slate-300 hover:text-white hover:bg-slate-900 rounded-xl border border-slate-800/80 transition-all"
          >
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center text-xs font-bold text-white shadow-sm">
              {user?.name ? user.name[0] : 'S'}
            </div>
            <span className="hidden sm:inline text-xs font-medium text-slate-200">
              {user?.name || 'Ramesh S.'}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-56 rounded-xl bg-slate-900 border border-slate-800 shadow-2xl p-2 z-50 backdrop-blur-xl">
              <div className="px-3 py-2 border-b border-slate-800 mb-1">
                <p className="text-xs font-semibold text-white truncate">{user?.name || 'Ramesh Sharma'}</p>
                <p className="text-[11px] text-slate-400 truncate">{user?.email || 'demo@pricepilot.ai'}</p>
                <p className="text-[10px] text-brand-400 mt-0.5">{user?.storeName || 'Sharma Kirana & Cafe'}</p>
              </div>

              <button
                onClick={() => {
                  setCurrentView('landing');
                  setShowProfileMenu(false);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors text-left"
              >
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                <span>Visit Landing Page</span>
              </button>

              <button
                onClick={() => {
                  logout();
                  setShowProfileMenu(false);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-400 hover:text-red-300 hover:bg-red-950/30 rounded-lg transition-colors text-left"
              >
                <LogOut className="w-3.5 h-3.5 text-red-400" />
                <span>Log Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
