
import React, { useState } from 'react';
import { calculateProfitAdvice } from '../services/geminiService';

const ProfitLab: React.FC = () => {
  const [data, setData] = useState({ business: '', capital: '', expenses: '' });
  const [loading, setLoading] = useState(false);
  const [advice, setAdvice] = useState<string | null>(null);

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!data.business || !data.capital) return;
    setLoading(true);
    try {
      const res = await calculateProfitAdvice(data);
      setAdvice(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto animate-fadeIn">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-2">Kita Calculator (Profit Lab)</h2>
        <p className="text-gray-600">Huwag manghula sa presyo. Alamin ang iyong kikitain sa tulong ng Madiskart-E.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm h-fit">
          <form onSubmit={handleCalculate} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Anong negosyo ito?</label>
              <input
                type="text"
                value={data.business}
                onChange={(e) => setData({ ...data, business: e.target.value })}
                placeholder="Hal: Milk Tea Shop, Sari-sari, Gown Rental"
                className="w-full px-4 py-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Puhunan (Initial Capital)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-gray-400">₱</span>
                <input
                  type="number"
                  value={data.capital}
                  onChange={(e) => setData({ ...data, capital: e.target.value })}
                  placeholder="0.00"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Gastos Kada Buwan (Rent, Bills, etc)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-gray-400">₱</span>
                <input
                  type="number"
                  value={data.expenses}
                  onChange={(e) => setData({ ...data, expenses: e.target.value })}
                  placeholder="0.00"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-400 text-emerald-900 font-extrabold py-4 rounded-xl shadow-lg hover:bg-amber-500 transition-all disabled:opacity-50"
            >
              {loading ? <i className="fa-solid fa-circle-notch animate-spin mr-2"></i> : null}
              Calculate Profit Strategy
            </button>
          </form>
        </div>

        <div className="min-h-[400px]">
          {advice ? (
            <div className="bg-emerald-900 text-white p-8 rounded-3xl shadow-xl animate-slideIn">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-amber-400">
                <i className="fa-solid fa-chart-pie"></i> Madiskart-E Analysis
              </h3>
              <div className="prose prose-invert max-w-none text-sm leading-relaxed whitespace-pre-wrap">
                {advice}
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center border-4 border-dashed border-gray-200 rounded-3xl p-10 text-center">
              <i className="fa-solid fa-calculator text-5xl text-gray-200 mb-4"></i>
              <p className="text-gray-400 font-medium italic">Ilagay ang iyong details para makita ang strategy.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfitLab;
