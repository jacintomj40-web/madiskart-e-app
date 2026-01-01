
import React, { useState } from 'react';
import { getBusinessRegistrationGuide } from '../services/geminiService';

const RegistrationGuide: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [guide, setGuide] = useState<string | null>(null);
  const [businessType, setBusinessType] = useState('Sole Proprietorship');

  const types = ['Sole Proprietorship', 'Partnership', 'Corporation', 'One Person Corporation', 'Online Business'];

  const fetchGuide = async (type: string) => {
    setLoading(true);
    setBusinessType(type);
    try {
      const result = await getBusinessRegistrationGuide(type);
      setGuide(result);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fadeIn max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-2">PH Business Registration</h2>
        <p className="text-gray-600">Alamin ang wastong hakbang para maging 'legit' na negosyo.</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-10">
        {types.map((type) => (
          <button
            key={type}
            onClick={() => fetchGuide(type)}
            className={`p-4 text-center rounded-2xl border transition-all ${
              businessType === type 
                ? 'bg-amber-400 border-amber-500 text-emerald-900 font-bold shadow-md' 
                : 'bg-white border-gray-100 text-gray-600 hover:border-emerald-300 hover:bg-emerald-50'
            }`}
          >
            <span className="text-xs block mb-1">Type:</span>
            <span className="text-sm leading-tight">{type}</span>
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
           <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
           <p className="text-gray-500 font-medium">Inihahanda ang iyong checklist...</p>
        </div>
      ) : guide ? (
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 animate-slideIn">
           <div className="flex items-center gap-3 mb-8 pb-4 border-b">
              <div className="w-10 h-10 bg-emerald-100 text-emerald-700 rounded-lg flex items-center justify-center">
                 <i className="fa-solid fa-file-contract"></i>
              </div>
              <h3 className="text-xl font-bold">{businessType} Guide</h3>
           </div>
           <div className="prose prose-emerald max-w-none text-gray-700 whitespace-pre-wrap leading-relaxed text-sm md:text-base">
             {guide}
           </div>
           <div className="mt-10 p-4 bg-amber-50 rounded-xl border border-amber-100">
             <p className="text-amber-800 text-sm italic">
               <strong>Tandaan:</strong> Ang guide na ito ay gabay lamang. Maaaring may kaunting pagkakaiba depende sa iyong partikular na lungsod o munisipyo.
             </p>
           </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="p-8 bg-emerald-50 rounded-3xl border border-emerald-100 flex flex-col items-center text-center">
              <i className="fa-solid fa-building-columns text-4xl text-emerald-600 mb-4"></i>
              <h4 className="font-bold mb-2">Government Agencies</h4>
              <p className="text-sm text-gray-600 mb-4">DTI, SEC, BIR, SSS, and Local LGUs are the primary agencies you will interact with.</p>
              <button onClick={() => fetchGuide('Sole Proprietorship')} className="text-emerald-700 font-bold hover:underline">Start with DTI Guide &rarr;</button>
           </div>
           <div className="p-8 bg-blue-50 rounded-3xl border border-blue-100 flex flex-col items-center text-center">
              <i className="fa-solid fa-shield-halved text-4xl text-blue-600 mb-4"></i>
              <h4 className="font-bold mb-2">Be a Legit Business</h4>
              <p className="text-sm text-gray-600 mb-4">Registering allows you to get loans, export products, and gain customer trust.</p>
              <button onClick={() => fetchGuide('Corporation')} className="text-blue-700 font-bold hover:underline">Start with SEC Guide &rarr;</button>
           </div>
        </div>
      )}
    </div>
  );
};

export default RegistrationGuide;
