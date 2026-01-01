
import React, { useState } from 'react';
import { AppView } from './types';
import Dashboard from './components/Dashboard';
import MarketPulse from './components/MarketPulse';
import BusinessMentor from './components/BusinessMentor';
import RegistrationGuide from './components/RegistrationGuide';
import Settings from './components/Settings';
import ProfitLab from './components/ProfitLab';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.DASHBOARD);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { id: AppView.DASHBOARD, label: 'Overview', icon: 'fa-house' },
    { id: AppView.MARKET_PULSE, label: 'Bagsakan & Trends', icon: 'fa-truck-fast' },
    { id: AppView.PROFIT_LAB, label: 'Kita Calculator', icon: 'fa-calculator' },
    { id: AppView.BUSINESS_MENTOR, label: 'AI Mentor', icon: 'fa-robot' },
    { id: AppView.REGISTRATION_GUIDE, label: 'PH Registration', icon: 'fa-id-card' },
    { id: AppView.SETTINGS, label: 'App Settings', icon: 'fa-gear' },
  ];

  const renderView = () => {
    switch (currentView) {
      case AppView.DASHBOARD: return <Dashboard setView={setCurrentView} />;
      case AppView.MARKET_PULSE: return <MarketPulse />;
      case AppView.PROFIT_LAB: return <ProfitLab />;
      case AppView.BUSINESS_MENTOR: return <BusinessMentor />;
      case AppView.REGISTRATION_GUIDE: return <RegistrationGuide />;
      case AppView.SETTINGS: return <Settings />;
      default: return <Dashboard setView={setCurrentView} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#064e3b] text-white transform transition-all duration-300 ease-in-out lg:translate-x-0 lg:static ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-8 h-full flex flex-col">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-12 h-12 bg-amber-400 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-400/20 rotate-3 hover:rotate-0 transition-transform">
              <i className="fa-solid fa-sun text-emerald-950 text-2xl"></i>
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight leading-none">MADISKART-E</h1>
              <p className="text-[10px] text-emerald-300 font-bold tracking-widest uppercase mt-1">Negosyo Companion</p>
            </div>
          </div>

          <nav className="space-y-1 flex-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentView(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-200 group ${currentView === item.id 
                  ? 'bg-amber-400 text-emerald-950 font-bold shadow-xl shadow-amber-400/10' 
                  : 'hover:bg-emerald-800/50 text-emerald-100/70 hover:text-white'}`}
              >
                <i className={`fa-solid ${item.icon} w-6 text-lg group-hover:scale-110 transition-transform`}></i>
                <span className="text-sm">{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="mt-auto pt-8 border-t border-emerald-800/50">
            <div className="bg-emerald-800/40 p-5 rounded-2xl border border-emerald-700/50">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-xs font-bold">M</div>
                <div>
                  <p className="text-xs font-bold">Madiskart-E Pro</p>
                  <p className="text-[10px] text-emerald-400">Lifetime Access</p>
                </div>
              </div>
              <p className="text-[10px] text-emerald-300 leading-relaxed italic">"Ang tagumpay ay para sa mga nagsisimula."</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen overflow-x-hidden relative">
        <header className="sticky top-0 z-30 flex items-center justify-between p-4 lg:p-6 bg-white/80 backdrop-blur-md border-b border-gray-100">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors">
            <i className="fa-solid fa-bars-staggered text-xl"></i>
          </button>
          
          <div className="hidden lg:flex items-center gap-2">
            <span className="text-sm font-medium text-gray-400 uppercase tracking-widest">Dashboard</span>
            <i className="fa-solid fa-chevron-right text-[10px] text-gray-300"></i>
            <span className="text-sm font-bold text-gray-900">{navItems.find(n => n.id === currentView)?.label}</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col items-end mr-2">
              <p className="text-xs font-bold text-gray-900">Pinoy Entrepreneur</p>
              <p className="text-[10px] text-emerald-600 font-medium">Verified Account</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-100 to-amber-100 border-2 border-white shadow-sm flex items-center justify-center text-emerald-800">
              <i className="fa-solid fa-user"></i>
            </div>
          </div>
        </header>

        <div className="flex-1 p-5 md:p-8 lg:p-12 max-w-7xl mx-auto w-full animate-slide-up">
          {renderView()}
        </div>
      </main>
    </div>
  );
};

export default App;
