import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm pointer-events-none">
      {toasts.map(toast => {
        let icon = <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />;
        let borderClass = 'border-emerald-500/30 bg-emerald-950/80';

        if (toast.type === 'warning') {
          icon = <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />;
          borderClass = 'border-amber-500/30 bg-amber-950/80';
        } else if (toast.type === 'info') {
          icon = <Info className="w-5 h-5 text-brand-400 shrink-0" />;
          borderClass = 'border-brand-500/30 bg-slate-900/90';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl border backdrop-blur-md shadow-xl text-sm font-medium text-white transition-all transform animate-in fade-in slide-in-from-top-3 ${borderClass}`}
          >
            {icon}
            <span className="flex-1 leading-snug">{toast.message}</span>
          </div>
        );
      })}
    </div>
  );
};
