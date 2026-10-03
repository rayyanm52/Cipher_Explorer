import React from 'react';
import { Lock, Sparkles, Code2, BookOpen, Layers } from 'lucide-react';

interface NavbarProps {
  activeTab: 'lab' | 'about' | 'visualizer' | 'python';
  setActiveTab: (tab: 'lab' | 'about' | 'visualizer' | 'python') => void;
  onResetExample: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onResetExample,
}) => {
  return (
    <header className="sticky top-0 z-30 w-full border-b border-slate-800/80 bg-[#0B132B]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single element brand mark */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
            <span className="text-lg" role="img" aria-label="Lock">🔐</span>
          </div>
          <button 
            onClick={() => setActiveTab('lab')}
            className="text-left font-bold tracking-tight text-white hover:text-cyan-400 transition-colors text-lg"
          >
            Cipher Explorer
          </button>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => setActiveTab('lab')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-all ${
              activeTab === 'lab'
                ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span className="whitespace-nowrap">Cipher Lab</span>
          </button>

          <button
            onClick={() => setActiveTab('about')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-all ${
              activeTab === 'about'
                ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="whitespace-nowrap">About Ciphers</span>
          </button>

          <button
            onClick={() => setActiveTab('visualizer')}
            className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-all ${
              activeTab === 'visualizer'
                ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="whitespace-nowrap">Alphabet Wheel</span>
          </button>

          <button
            onClick={() => setActiveTab('python')}
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-all ${
              activeTab === 'python'
                ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span className="whitespace-nowrap">Tkinter / Python</span>
          </button>
        </nav>

        {/* Zone 3: 1-2 Primary Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={onResetExample}
            title="Load Default Example: HELLO WORLD (Caesar shift 3)"
            className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/80 px-3 py-1.5 text-xs font-medium text-slate-200 hover:bg-slate-750 hover:border-cyan-500/50 hover:text-cyan-300 transition-all shadow-sm active:scale-95"
          >
            <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
            <span className="whitespace-nowrap">Load Example</span>
          </button>
        </div>
      </div>
    </header>
  );
};
