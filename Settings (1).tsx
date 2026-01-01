
import React, { useState } from 'react';
import { generatePlayStoreMetadata } from '../services/geminiService';

const Settings: React.FC = () => {
  const [checklist, setChecklist] = useState({
    hosting: false,
    googleAccount: false,
    assets: false,
    twaPackage: false,
    privacyPolicy: true,
  });

  const [metadata, setMetadata] = useState<string | null>(null);
  const [loadingMetadata, setLoadingMetadata] = useState(false);
  const [showGitGuide, setShowGitGuide] = useState(false);

  const toggleItem = (item: keyof typeof checklist) => {
    setChecklist(prev => ({ ...prev, [item]: !prev[item] }));
  };

  const handleGenerateMetadata = async () => {
    setLoadingMetadata(true);
    try {
      const res = await generatePlayStoreMetadata();
      setMetadata(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingMetadata(false);
    }
  };

  const completed = Object.values(checklist).filter(Boolean).length;
  const total = Object.keys(checklist).length;
  const progress = (completed / total) * 100;

  const gitCommands = [
    { cmd: "git init", desc: "Initialize your project" },
    { cmd: "git add .", desc: "Add all files for upload" },
    { cmd: 'git commit -m "Initial Sikat App"', desc: "Save your changes" },
    { cmd: "git branch -M main", desc: "Set main branch" },
    { cmd: "git remote add origin [YOUR_REPO_URL]", desc: "Link to GitHub" },
    { cmd: "git push -u origin main", desc: "Upload to GitHub" }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-24 animate-fadeIn">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-900">Publishing Center</h2>
          <p className="text-gray-500">Gawing totoong Android App ang iyong Sikat project.</p>
        </div>
        <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-emerald-100 flex items-center gap-4">
          <div className="text-right">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Readiness</p>
            <p className="text-xl font-black text-emerald-600">{Math.round(progress)}%</p>
          </div>
          <div className="w-12 h-12 rounded-full border-4 border-emerald-100 border-t-emerald-500 flex items-center justify-center font-bold text-emerald-700">
             {completed}/{total}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Step 1: Checklist */}
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold flex items-center gap-3">
                <span className="w-8 h-8 bg-emerald-100 text-emerald-700 rounded-lg flex items-center justify-center text-sm">1</span>
                Submission Checklist
              </h3>
              <button 
                onClick={() => setShowGitGuide(!showGitGuide)}
                className="text-xs font-bold text-emerald-600 hover:text-emerald-700 underline"
              >
                {showGitGuide ? "Hide Git Guide" : "Show Git Setup Commands"}
              </button>
            </div>

            {showGitGuide && (
              <div className="mb-8 p-6 bg-gray-900 rounded-2xl text-emerald-400 font-mono text-xs space-y-3 border-4 border-gray-800 animate-fadeIn">
                <p className="text-gray-400 mb-2 italic"># Follow these steps if using Terminal/VS Code:</p>
                {gitCommands.map((item, idx) => (
                  <div key={idx} className="flex flex-col gap-1">
                    <span className="text-gray-500">// {item.desc}</span>
                    <div className="flex items-center justify-between bg-black/30 p-2 rounded">
                      <span>{item.cmd}</span>
                      <button onClick={() => navigator.clipboard.writeText(item.cmd)} className="text-[10px] bg-gray-700 text-white px-2 py-1 rounded hover:bg-gray-600">Copy</button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="space-y-4">
              {[
                { id: 'hosting', label: 'Web Hosting (Vercel/Netlify)', sub: 'Dapat live ang website URL mo (HTTPS).' },
                { id: 'googleAccount', label: 'Google Play Console ($25)', sub: 'Isang beses lang na bayad para sa lifetime account.' },
                { id: 'assets', label: 'Visual Assets', sub: 'Icon (512px), Feature Graphic (1024x500).' },
                { id: 'twaPackage', label: 'Generate .AAB File', sub: 'Gagamit tayo ng Bubblewrap o PWABuilder.' },
              ].map((item) => (
                <label key={item.id} className="flex items-start gap-4 p-4 hover:bg-gray-50 rounded-2xl cursor-pointer transition-all border border-transparent hover:border-gray-100">
                  <input 
                    type="checkbox" 
                    checked={checklist[item.id as keyof typeof checklist]} 
                    onChange={() => toggleItem(item.id as keyof typeof checklist)}
                    className="mt-1 w-6 h-6 rounded-lg border-gray-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  <div>
                    <p className="font-bold text-gray-900">{item.label}</p>
                    <p className="text-sm text-gray-500">{item.sub}</p>
                  </div>
                </label>
              ))}
            </div>
          </section>

          {/* Step 2: AI Metadata Generator */}
          <section className="bg-emerald-900 text-white p-8 rounded-3xl shadow-xl overflow-hidden relative">
            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-2 flex items-center gap-3">
                <span className="w-8 h-8 bg-emerald-700 text-white rounded-lg flex items-center justify-center text-sm">2</span>
                Store Listing Generator
              </h3>
              <p className="text-emerald-200 text-sm mb-6">Gamitin ang AI para isulat ang iyong App Description para sa Play Store.</p>
              
              {metadata ? (
                <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 mb-4 max-h-96 overflow-y-auto">
                   <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">{metadata}</pre>
                </div>
              ) : null}

              <button 
                onClick={handleGenerateMetadata}
                disabled={loadingMetadata}
                className="bg-amber-400 text-emerald-900 font-black px-8 py-4 rounded-xl hover:bg-amber-300 transition-all flex items-center gap-2 disabled:opacity-50"
              >
                {loadingMetadata ? <i className="fa-solid fa-circle-notch animate-spin"></i> : <i className="fa-solid fa-wand-magic-sparkles"></i>}
                {metadata ? "Regenerate Description" : "Generate Store Metadata"}
              </button>
            </div>
            <i className="fa-solid fa-store absolute -bottom-10 -right-10 text-[12rem] text-emerald-800/20 rotate-12"></i>
          </section>
        </div>

        {/* Sidebar: Technical Guide */}
        <div className="space-y-6">
          <section className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <i className="fa-solid fa-code text-blue-500"></i>
              Project Structure
            </h3>
            <div className="text-xs text-gray-500 space-y-1 font-mono">
              <p>📁 sikat-app/</p>
              <p className="ml-4">📄 index.html</p>
              <p className="ml-4">📄 manifest.json</p>
              <p className="ml-4">📄 index.tsx</p>
              <p className="ml-4">📄 App.tsx</p>
              <p className="ml-4">📁 services/ ...</p>
              <p className="ml-4">📁 components/ ...</p>
            </div>
          </section>

          <section className="bg-blue-50 p-6 rounded-3xl border border-blue-100">
            <h3 className="font-bold text-blue-900 mb-4 flex items-center gap-2">
              <i className="fa-solid fa-cloud-arrow-up"></i>
              GitHub Help
            </h3>
            <p className="text-sm text-blue-800 leading-relaxed mb-4">
              If you don't want to use commands, just go to GitHub, click <strong>"Upload existing files"</strong> and drag all the files from your folder there!
            </p>
            <a 
              href="https://github.com/new" 
              target="_blank" 
              className="block text-center py-2 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700 transition-all"
            >
              Create GitHub Repo Now
            </a>
          </section>

          <section className="bg-amber-50 p-6 rounded-3xl border border-amber-200">
            <h3 className="font-bold text-amber-900 mb-4 flex items-center gap-2">
              <i className="fa-solid fa-circle-info"></i>
              Next Step after Vercel
            </h3>
            <p className="text-sm text-amber-800 leading-relaxed">
              Once Vercel gives you a link (e.g. <code>sikat.vercel.app</code>), go to <strong>PWABuilder.com</strong> to get your Android file!
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Settings;
