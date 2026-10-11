import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { Sidebar } from './components/common/Sidebar';
import { NotificationDrawer } from './components/common/NotificationDrawer';
import { ToastContainer } from './components/common/ToastContainer';

import { LandingPage } from './pages/LandingPage';
import { AuthPage } from './pages/AuthPage';
import { DashboardPage } from './pages/DashboardPage';
import { SmartPricingPage } from './pages/SmartPricingPage';
import { CompetitorsPage } from './pages/CompetitorsPage';
import { SpecialOffersPage } from './pages/SpecialOffersPage';
import { ProfitLossPage } from './pages/ProfitLossPage';
import { ProductsPage } from './pages/ProductsPage';
import { PriceHistoryPage } from './pages/PriceHistoryPage';

const AppContent: React.FC = () => {
  const { currentView, user } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // If on Landing Page or Auth Page, show full page without app layout
  if (currentView === 'landing') {
    return (
      <>
        <LandingPage />
        <ToastContainer />
      </>
    );
  }

  if (currentView === 'auth') {
    return (
      <>
        <AuthPage />
        <ToastContainer />
      </>
    );
  }

  // Authenticated SaaS Dashboard Layout
  return (
    <div className="min-h-screen flex flex-col bg-[#060a12] text-slate-100">
      {/* Top Navbar */}
      <Navbar onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />

      {/* Main Container */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <Sidebar 
          isMobileOpen={isMobileMenuOpen} 
          onCloseMobile={() => setIsMobileMenuOpen(false)} 
        />

        {/* Content View */}
        <main className="flex-1 overflow-y-auto">
          {currentView === 'dashboard' && <DashboardPage />}
          {currentView === 'pricing' && <SmartPricingPage />}
          {currentView === 'competitors' && <CompetitorsPage />}
          {currentView === 'offers' && <SpecialOffersPage />}
          {currentView === 'profit-loss' && <ProfitLossPage />}
          {currentView === 'products' && <ProductsPage />}
          {currentView === 'history' && <PriceHistoryPage />}
        </main>
      </div>

      {/* Global Slide-Over Drawers & Floating Toasts */}
      <NotificationDrawer />
      <ToastContainer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;
