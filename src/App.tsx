import React, { useState } from 'react';
import { CipherType } from './types/cipher';
import { Navbar } from './components/Navbar';
import { CipherLab } from './components/CipherLab';
import { AboutCiphers } from './components/AboutCiphers';
import { AlphabetVisualizer } from './components/AlphabetVisualizer';
import { PythonTkinterGuide } from './components/PythonTkinterGuide';

export default function App() {
  const [activeTab, setActiveTab] = useState<'lab' | 'about' | 'visualizer' | 'python'>('lab');

  // Shared state for when user clicks "Try it" from About cards or resets to default example
  const [currentCipher, setCurrentCipher] = useState<CipherType>('caesar');
  const [currentKey, setCurrentKey] = useState<string | number>(3);
  const [currentMessage, setCurrentMessage] = useState<string>('HELLO WORLD');

  // Triggered by "Load Example" button in navbar or preset
  const handleResetExample = () => {
    setCurrentCipher('caesar');
    setCurrentKey(3);
    setCurrentMessage('HELLO WORLD');
    setActiveTab('lab');
  };

  // Triggered by "Try it" buttons in About Ciphers cards
  const handleSelectFromAbout = (
    cipher: CipherType,
    defaultShift?: string | number,
    sampleText?: string
  ) => {
    setCurrentCipher(cipher);
    if (defaultShift !== undefined) {
      setCurrentKey(defaultShift);
    }
    if (sampleText) {
      setCurrentMessage(sampleText);
    }
    setActiveTab('lab');
  };

  return (
    <div className="min-h-screen bg-[#0B132B] text-slate-100 flex flex-col font-sans">
      {/* Top Bar Contract (3 Zones) */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onResetExample={handleResetExample}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'lab' && (
          <CipherLab
            initialCipher={currentCipher}
            initialKey={currentKey}
            initialMessage={currentMessage}
            onNavigateToAbout={() => setActiveTab('about')}
            onNavigateToWheel={() => setActiveTab('visualizer')}
          />
        )}

        {activeTab === 'about' && (
          <AboutCiphers onSelectCipher={handleSelectFromAbout} />
        )}

        {activeTab === 'visualizer' && (
          <AlphabetVisualizer
            currentCipher={currentCipher}
            currentKey={currentKey}
            onApplyToLab={(cipher, key) => {
              setCurrentCipher(cipher);
              setCurrentKey(key);
              setActiveTab('lab');
            }}
          />
        )}

        {activeTab === 'python' && <PythonTkinterGuide />}
      </main>

      {/* Footer (Clean, compliant with Zero Slop rules) */}
      <footer className="border-t border-slate-800/80 bg-[#070D1E] py-6 mt-12 text-xs text-slate-400">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-300">🔐 Cipher Explorer</span>
            <span aria-hidden="true">·</span>
            <span>Classical Ciphers Educational Tool</span>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-slate-400">
            <span>Caesar</span>
            <span aria-hidden="true">·</span>
            <span>Atbash</span>
            <span aria-hidden="true">·</span>
            <span>ROT13</span>
            <span aria-hidden="true">·</span>
            <span>Vigenère</span>
            <span aria-hidden="true">·</span>
            <span>Rail Fence</span>
            <span aria-hidden="true">·</span>
            <span>Affine</span>
            <span aria-hidden="true">·</span>
            <span>Polybius</span>
            <span aria-hidden="true">·</span>
            <span>Bacon</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
