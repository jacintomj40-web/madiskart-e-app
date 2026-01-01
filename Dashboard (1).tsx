
import React from 'react';
import { AppView } from '../types';

interface DashboardProps {
  setView: (view: AppView) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ setView }) => {
  const quickActions = [
    { title: 'Find Market Trends', desc: 'Real-time hot products in PH', icon: 'fa-chart-simple', color: 'bg-blue-500', view: AppView.MARKET_PULSE },
    { title: 'Ask My Mentor', desc: 'Chat with Aling Nena AI', icon: 'fa-comments', color: 'bg-emerald-500', view: AppView.BUSINESS_MENTOR },
    { title: 'Permit Checklist', desc: 'Guide for DTI/BIR/LGUs', icon: 'fa-clipboard-list', color: 'bg-amber-500', view: AppView.REGISTRATION_GUIDE },
  ];

  return (
    <div className="animate-fadeIn">
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Kamusta, Ka-Madiskart-E! 👋</h2>
        <p className="text-gray-600 max-w-2xl">
          Empowering every Filipino entrepreneur with AI-driven insights. Find the next big opportunity or get guidance on your current business with Madiskart-E.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {quickActions.map((action, i) => (
          <button
            key={i}
            onClick={() => setView(action.view)}
            className="group flex flex-col p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all text-left"
          >
            <div className={`w-12 h-12 ${action.color} rounded-xl flex items-center justify-center mb-4 text-white shadow-lg`}>
              <i className={`fa-solid ${action.icon} text-xl`}></i>
            </div>
            <h3 className="text-lg font-bold mb-1 group-hover:text-emerald-700 transition-colors">{action.title}</h3>
            <p className="text-gray-500 text-sm">{action.desc}</p>
          </button>
        ))}
      </div>

      <div className="bg-emerald-900 rounded-3xl p-8 text-white relative overflow-hidden">
        <div className="relative z-10 max-w-lg">
          <span className="inline-block px-3 py-1 bg-amber-400 text-emerald-900 text-xs font-bold rounded-full mb-4">Makatipid ng Oras</span>
          <h3 className="text-2xl font-bold mb-4">Start your business without the headache.</h3>
          <p className="text-emerald-100 mb-6 leading-relaxed">
            Our AI analyzes thousands of local market reports to tell you exactly which products are in demand in your specific city or municipality.
          </p>
          <button 
            onClick={() => setView(AppView.MARKET_PULSE)}
            className="px-6 py-3 bg-white text-emerald-900 font-bold rounded-xl shadow-lg hover:bg-emerald-50 transition-all"
          >
            Explore Nearby Opportunities
          </button>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-800 rounded-full -translate-y-1/2 translate-x-1/2 opacity-50 blur-3xl"></div>
        <i className="fa-solid fa-briefcase absolute bottom-0 right-10 text-9xl text-emerald-800/30 transform -rotate-12 translate-y-1/4"></i>
      </div>

      <div className="mt-12">
        <h4 className="text-xl font-bold mb-6 flex items-center gap-2">
          <i className="fa-solid fa-star text-amber-500"></i> Local Business Inspiration
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 bg-white rounded-2xl border border-gray-100 flex gap-4">
             <img src="https://picsum.photos/200/200?random=1" className="w-20 h-20 rounded-xl object-cover" alt="Agri" />
             <div>
               <h5 className="font-bold">Agri-Processing Hub</h5>
               <p className="text-sm text-gray-500">Transforming local produce into snacks (Ube chips, Mango preserves).</p>
             </div>
          </div>
          <div className="p-5 bg-white rounded-2xl border border-gray-100 flex gap-4">
             <img src="https://picsum.photos/200/200?random=2" className="w-20 h-20 rounded-xl object-cover" alt="Ecom" />
             <div>
               <h5 className="font-bold">Localized E-commerce</h5>
               <p className="text-sm text-gray-500">Curating regional specialties for Metro Manila market.</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
