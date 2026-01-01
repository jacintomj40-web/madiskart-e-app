
import React, { useState } from 'react';
import { getMarketTrends } from '../services/geminiService';
import { MarketInsight } from '../types';

const MarketPulse: React.FC = () => {
  const [location, setLocation] = useState<string>('Manila');
  const [loading, setLoading] = useState(false);
  const [insight, setInsight] = useState<MarketInsight | null>(null);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!location) return;
    setLoading(true);
    setError('');
    try {
      const result = await getMarketTrends(location);
      setInsight({
        topic: `Supplier Hubs near ${location}`,
        content: result.text,
        sources: result.sources,
        places: result.places
      });
    } catch (err) {
      console.error(err);
      setError('May error sa paghahanap. Check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-2">Supplier & Trends</h2>
        <p className="text-gray-600">Maghanap ng Bagsakan at Trending Business sa iyong lugar.</p>
      </div>

      <div className="bg-white p-2 rounded-2xl shadow-lg flex flex-col md:flex-row gap-2 border border-emerald-100">
        <div className="relative flex-1">
          <i className="fa-solid fa-location-dot absolute left-4 top-1/2 -translate-y-1/2 text-emerald-600"></i>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Halimbawa: Divisoria, Quezon City, Davao..."
            className="w-full pl-12 pr-4 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-lg"
          />
        </div>
        <button
          onClick={handleSearch}
          disabled={loading}
          className="bg-emerald-600 text-white px-10 py-4 rounded-xl font-bold hover:bg-emerald-700 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
        >
          {loading ? <i className="fa-solid fa-circle-notch animate-spin"></i> : <i className="fa-solid fa-magnifying-glass"></i>}
          <span>Siyasatin</span>
        </button>
      </div>

      {insight && (
        <div className="space-y-6 animate-slideIn">
          {/* Places Grounding (Maps) */}
          {insight.places && insight.places.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {insight.places.map((place, idx) => (
                <a
                  key={idx}
                  href={place.uri}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100 hover:bg-emerald-100 transition-all flex items-start gap-3 shadow-sm"
                >
                  <i className="fa-solid fa-map-location-dot text-emerald-600 mt-1"></i>
                  <div>
                    <h4 className="font-bold text-emerald-900 text-sm">{place.title}</h4>
                    <span className="text-xs text-emerald-700 font-medium">View on Google Maps &rarr;</span>
                  </div>
                </a>
              ))}
            </div>
          )}

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
             <div className="prose prose-emerald max-w-none text-gray-700 whitespace-pre-wrap leading-relaxed">
               {insight.content}
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketPulse;
