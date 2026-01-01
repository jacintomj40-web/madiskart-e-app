
import React, { useState, useRef, useEffect } from 'react';
import { startMentorChat } from '../services/geminiService';
import { ChatMessage } from '../types';

const BusinessMentor: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', parts: "Kamusta ka, ka-negosyo! Ako si Aling Nena, ang iyong AI Business Mentor. Mayroon ka bang balak magsimula ng negosyo o kailangan ng tulong sa marketing? Itanong mo lang sa akin! 😊" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatRef = useRef<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chatRef.current) {
      chatRef.current = startMentorChat([]);
    }
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', parts: userMessage }]);
    setLoading(true);

    try {
      const response = await chatRef.current.sendMessage({ message: userMessage });
      const modelResponse = response.text;
      setMessages(prev => [...prev, { role: 'model', parts: modelResponse }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: 'model', parts: "Pasensya na, medyo mahina yata ang signal ko. Maaari mo bang ulitin ang iyong tanong?" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] max-w-4xl mx-auto">
      <div className="bg-white p-4 rounded-t-2xl border border-gray-100 flex items-center gap-4 shadow-sm">
        <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center border-2 border-amber-400">
          <i className="fa-solid fa-user-tie text-amber-700 text-xl"></i>
        </div>
        <div>
          <h3 className="font-bold text-gray-900">Aling Nena AI</h3>
          <p className="text-xs text-emerald-600 flex items-center gap-1">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            Online • Ready to help
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50 border-x">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}>
            <div className={`max-w-[85%] p-4 rounded-2xl shadow-sm ${
              msg.role === 'user' 
                ? 'bg-emerald-600 text-white rounded-tr-none' 
                : 'bg-white text-gray-800 rounded-tl-none border border-gray-100'
            }`}>
              <div className="whitespace-pre-wrap leading-relaxed">
                {msg.parts}
              </div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
             <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-gray-100 flex gap-2 items-center">
                <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-100"></span>
                <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-200"></span>
             </div>
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      <div className="bg-white p-4 rounded-b-2xl border shadow-lg flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="I-type ang iyong mensahe dito..."
          className="flex-1 px-4 py-3 bg-gray-50 border-none focus:ring-2 focus:ring-emerald-500 rounded-xl"
        />
        <button
          onClick={handleSend}
          disabled={loading || !input.trim()}
          className="w-12 h-12 bg-emerald-600 text-white rounded-xl flex items-center justify-center hover:bg-emerald-700 transition-all disabled:opacity-50"
        >
          <i className="fa-solid fa-paper-plane"></i>
        </button>
      </div>
      
      <div className="mt-4 flex flex-wrap gap-2">
        <span className="text-xs text-gray-400 font-medium px-2 py-1 uppercase tracking-wider">Suggested:</span>
        <button onClick={() => setInput('Paano mag-register sa DTI?')} className="text-xs bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full border border-emerald-100 hover:bg-emerald-100">Paano mag-register sa DTI?</button>
        <button onClick={() => setInput('Low capital business ideas')} className="text-xs bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full border border-emerald-100 hover:bg-emerald-100">Low capital business ideas</button>
        <button onClick={() => setInput('Paano mag-FB ads?')} className="text-xs bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full border border-emerald-100 hover:bg-emerald-100">Paano mag-FB ads?</button>
      </div>
    </div>
  );
};

export default BusinessMentor;
