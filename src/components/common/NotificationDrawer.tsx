import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, CheckCheck, AlertTriangle, TrendingUp, Sparkles, Tag, ShieldAlert } from 'lucide-react';

export const NotificationDrawer: React.FC = () => {
  const { 
    isNotificationDrawerOpen, 
    setIsNotificationDrawerOpen, 
    notifications, 
    markNotificationRead, 
    markAllNotificationsRead,
    setCurrentView,
    setSelectedProductId
  } = useApp();

  if (!isNotificationDrawerOpen) return null;

  const unreadCount = notifications.filter(n => !n.read).length;

  const getIcon = (type: string) => {
    switch (type) {
      case 'stock':
        return <AlertTriangle className="w-5 h-5 text-amber-400" />;
      case 'recommendation':
        return <Sparkles className="w-5 h-5 text-brand-400" />;
      case 'competitor':
        return <ShieldAlert className="w-5 h-5 text-purple-400" />;
      case 'demand':
        return <TrendingUp className="w-5 h-5 text-emerald-400" />;
      case 'offer':
        return <Tag className="w-5 h-5 text-blue-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-brand-400" />;
    }
  };

  const handleNotificationClick = (notifId: string, productId?: string) => {
    markNotificationRead(notifId);
    if (productId) {
      setSelectedProductId(productId);
      setCurrentView('pricing');
      setIsNotificationDrawerOpen(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity"
        onClick={() => setIsNotificationDrawerOpen(false)}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-slate-900/95 border-l border-slate-800 shadow-2xl flex flex-col backdrop-blur-xl">
          {/* Header */}
          <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-brand-500/10 border border-brand-500/20 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-brand-400" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-white">Notifications</h3>
                <p className="text-xs text-slate-400">{unreadCount} unread system alert{unreadCount !== 1 ? 's' : ''}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={markAllNotificationsRead}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700/80 rounded-lg transition-colors"
                  title="Mark all as read"
                >
                  <CheckCheck className="w-3.5 h-3.5" />
                  <span>Mark read</span>
                </button>
              )}
              <button
                onClick={() => setIsNotificationDrawerOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {notifications.length === 0 ? (
              <div className="text-center py-12 text-slate-500 text-sm">
                No active notifications
              </div>
            ) : (
              notifications.map(notif => (
                <div
                  key={notif.id}
                  onClick={() => handleNotificationClick(notif.id, notif.productId)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                    notif.read 
                      ? 'bg-slate-900/40 border-slate-800/60 opacity-75 hover:opacity-100 hover:border-slate-700' 
                      : 'bg-slate-800/60 border-brand-500/30 shadow-lg shadow-brand-500/5 hover:border-brand-500/50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-slate-800 border border-slate-700/60 shrink-0 mt-0.5">
                      {getIcon(notif.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-sm font-semibold text-white truncate">
                          {notif.title}
                        </h4>
                        <span className="text-[11px] text-slate-400 shrink-0">{notif.time}</span>
                      </div>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                        {notif.message}
                      </p>
                      {notif.productId && (
                        <div className="mt-2.5 flex items-center gap-1.5 text-xs text-brand-400 hover:text-brand-300 font-medium">
                          <span>Review & Optimize Price</span>
                          <span>→</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-slate-800/80 bg-slate-950/40 text-center">
            <span className="text-xs text-slate-400">
              Live monitoring powered by PricePilot Engine
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
