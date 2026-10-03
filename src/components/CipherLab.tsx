import React, { useState, useEffect } from 'react';
import { CipherType } from '../types/cipher';
import { CIPHER_REGISTRY, processCipher } from '../utils/ciphers';
import { HowItWorksCard } from './HowItWorksCard';
import {
  Lock,
  Unlock,
  Trash2,
  Copy,
  Check,
  ArrowDownUp,
  Sliders,
  Sparkles,
  KeyRound,
  ShieldCheck,
  ChevronDown,
} from 'lucide-react';

interface CipherLabProps {
  initialCipher?: CipherType;
  initialKey?: string | number;
  initialMessage?: string;
  onNavigateToAbout?: () => void;
  onNavigateToWheel?: () => void;
}

export const CipherLab: React.FC<CipherLabProps> = ({
  initialCipher = 'caesar',
  initialKey = 3,
  initialMessage = 'HELLO WORLD',
  onNavigateToAbout,
  onNavigateToWheel,
}) => {
  // Core state
  const [cipherType, setCipherType] = useState<CipherType>(initialCipher);
  const [message, setMessage] = useState<string>(initialMessage);
  const [shiftKey, setShiftKey] = useState<string | number>(initialKey);
  const [activeMode, setActiveMode] = useState<'encrypt' | 'decrypt'>('encrypt');
  const [forceUppercase, setForceUppercase] = useState<boolean>(true);

  // Output state
  const [resultText, setResultText] = useState<string>('KHOOR ZRUOG');
  const [explanation, setExplanation] = useState<string>(
    'Each letter is shifted 3 positions forward in the alphabet.'
  );
  const [steps, setSteps] = useState<any[]>([]);
  const [copied, setCopied] = useState<boolean>(false);

  // Sync when initial props change
  useEffect(() => {
    setCipherType(initialCipher);
    setShiftKey(initialKey);
    if (initialMessage) {
      setMessage(initialMessage);
    }
  }, [initialCipher, initialKey, initialMessage]);

  // Execute cipher calculation
  const handleExecute = (mode: 'encrypt' | 'decrypt') => {
    setActiveMode(mode);
    const textToProcess = forceUppercase ? message.toUpperCase() : message;
    const computed = processCipher(textToProcess, cipherType, mode, shiftKey);
    setResultText(computed.result);
    setSteps(computed.steps);
    setExplanation(computed.explanation);
  };

  // Run on cipher change or key change
  useEffect(() => {
    handleExecute(activeMode);
  }, [cipherType, shiftKey, message, forceUppercase]);

  // Cipher change handler
  const handleCipherChange = (newCipher: CipherType) => {
    setCipherType(newCipher);
    if (newCipher === 'caesar') {
      setShiftKey(3);
    } else if (newCipher === 'atbash') {
      setShiftKey('');
    } else if (newCipher === 'rot13') {
      setShiftKey(13);
    } else if (newCipher === 'vigenere') {
      setShiftKey('KEY');
    } else if (newCipher === 'railfence') {
      setShiftKey(3);
    } else if (newCipher === 'affine') {
      setShiftKey('5, 8');
    } else if (newCipher === 'polybius' || newCipher === 'bacon') {
      setShiftKey('');
    }
  };

  // Clear fields
  const handleClear = () => {
    setMessage('');
    setResultText('');
    setSteps([]);
    setExplanation('Cleared. Enter your message and choose Encrypt or Decrypt.');
  };

  // Swap result back into input
  const handleSwap = () => {
    if (!resultText) return;
    setMessage(resultText);
    const newMode = activeMode === 'encrypt' ? 'decrypt' : 'encrypt';
    handleExecute(newMode);
  };

  // Copy result
  const handleCopy = () => {
    if (!resultText) return;
    navigator.clipboard.writeText(resultText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentMeta = CIPHER_REGISTRY[cipherType];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Frame */}
      <div className="border-b border-slate-800 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-2xl" role="img" aria-label="Lock">🔐</span>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Cipher Explorer
              </h1>
            </div>
            <p className="text-base text-slate-300">
              Learn how classical ciphers transform messages.
            </p>
          </div>

          {/* Quick preset chips */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Presets:
            </span>
            <button
              onClick={() => {
                setMessage('HELLO WORLD');
                setCipherType('caesar');
                setShiftKey(3);
                setActiveMode('encrypt');
              }}
              className="text-xs px-2.5 py-1 rounded-md bg-slate-800/80 text-cyan-300 hover:bg-slate-700 hover:text-white border border-slate-700/80 transition-colors"
            >
              Default Example
            </button>
            <button
              onClick={() => {
                setMessage('DEFEND THE EAST WALL');
                setCipherType('railfence');
                setShiftKey(3);
                setActiveMode('encrypt');
              }}
              className="text-xs px-2.5 py-1 rounded-md bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700/80 transition-colors"
            >
              Rail Fence Wave
            </button>
            <button
              onClick={() => {
                setMessage('AFFINE CIPHER ENCRYPTION');
                setCipherType('affine');
                setShiftKey('5, 8');
                setActiveMode('encrypt');
              }}
              className="text-xs px-2.5 py-1 rounded-md bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700/80 transition-colors"
            >
              Affine (a=5, b=8)
            </button>
            <button
              onClick={() => {
                setMessage('ATTACK AT DAWN');
                setCipherType('vigenere');
                setShiftKey('LEMON');
                setActiveMode('encrypt');
              }}
              className="text-xs px-2.5 py-1 rounded-md bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700/80 transition-colors"
            >
              Vigenère Classic
            </button>
            <button
              onClick={() => {
                setMessage('SECRET CODE');
                setCipherType('polybius');
                setShiftKey('');
                setActiveMode('encrypt');
              }}
              className="text-xs px-2.5 py-1 rounded-md bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700/80 transition-colors"
            >
              Polybius 5x5
            </button>
          </div>
        </div>
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Input & Controls (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Frame: Input Area */}
          <div className="rounded-2xl border border-slate-800 bg-[#1C2541]/80 p-5 shadow-xl backdrop-blur-sm space-y-3">
            <div className="flex items-center justify-between">
              <label htmlFor="message-input" className="text-sm font-semibold text-white flex items-center gap-2">
                <span>Enter your message</span>
              </label>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setForceUppercase(!forceUppercase)}
                  className={`text-xs px-2 py-0.5 rounded border transition-colors ${
                    forceUppercase
                      ? 'bg-cyan-950/80 border-cyan-700/60 text-cyan-300'
                      : 'bg-slate-800/80 border-slate-700 text-slate-400'
                  }`}
                  title="Toggle all uppercase or preserve original case"
                >
                  {forceUppercase ? 'UPPERCASE ON' : 'Preserve Case'}
                </button>
                <span className="text-xs font-mono text-slate-400">
                  {message.length} chars
                </span>
              </div>
            </div>

            <textarea
              id="message-input"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type or paste the message you want to encrypt or decrypt..."
              className="w-full rounded-xl border border-slate-700 bg-[#0B132B] px-4 py-3 font-mono text-sm text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/50"
            />
          </div>

          {/* Frame: Cipher Select & Key Controls */}
          <div className="rounded-2xl border border-slate-800 bg-[#1C2541]/80 p-5 shadow-xl backdrop-blur-sm space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Cipher Dropdown */}
              <div className="space-y-1.5">
                <label htmlFor="cipher-select" className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Cipher
                </label>
                <div className="relative">
                  <select
                    id="cipher-select"
                    value={cipherType}
                    onChange={(e) => handleCipherChange(e.target.value as CipherType)}
                    className="w-full appearance-none rounded-xl border border-slate-700 bg-[#0B132B] px-3.5 py-2.5 pr-10 font-sans text-sm font-medium text-white focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/50"
                  >
                    <option value="caesar">Caesar Cipher</option>
                    <option value="atbash">Atbash Cipher</option>
                    <option value="rot13">ROT13</option>
                    <option value="vigenere">Vigenère Cipher</option>
                    <option value="railfence">Rail Fence Cipher</option>
                    <option value="affine">Affine Cipher</option>
                    <option value="polybius">Polybius Square</option>
                    <option value="bacon">Bacon's Cipher</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-3 h-4 w-4 text-slate-400" />
                </div>
              </div>

              {/* Dynamic Shift / Key Input */}
              <div className="space-y-1.5">
                <label htmlFor="key-input" className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center justify-between">
                  <span>{currentMeta.keyLabel}</span>
                  {cipherType === 'caesar' && (
                    <span className="font-mono text-cyan-400">k = {shiftKey}</span>
                  )}
                  {cipherType === 'railfence' && (
                    <span className="font-mono text-cyan-400">rails = {shiftKey}</span>
                  )}
                </label>

                {cipherType === 'caesar' && (
                  <div className="flex items-center gap-3">
                    <input
                      id="key-input"
                      type="number"
                      min="0"
                      max="25"
                      value={shiftKey}
                      onChange={(e) => setShiftKey(parseInt(e.target.value, 10) || 0)}
                      className="w-20 rounded-xl border border-slate-700 bg-[#0B132B] px-3 py-2 font-mono text-sm text-white focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 text-center"
                    />
                    <input
                      type="range"
                      min="0"
                      max="25"
                      value={typeof shiftKey === 'number' ? shiftKey : 0}
                      onChange={(e) => setShiftKey(parseInt(e.target.value, 10))}
                      className="flex-1 accent-cyan-400"
                    />
                  </div>
                )}

                {cipherType === 'railfence' && (
                  <div className="flex items-center gap-3">
                    <input
                      id="key-input"
                      type="number"
                      min="2"
                      max="8"
                      value={shiftKey}
                      onChange={(e) => setShiftKey(parseInt(e.target.value, 10) || 2)}
                      className="w-20 rounded-xl border border-slate-700 bg-[#0B132B] px-3 py-2 font-mono text-sm text-white focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 text-center"
                    />
                    <input
                      type="range"
                      min="2"
                      max="8"
                      value={typeof shiftKey === 'number' ? shiftKey : 3}
                      onChange={(e) => setShiftKey(parseInt(e.target.value, 10))}
                      className="flex-1 accent-cyan-400"
                    />
                  </div>
                )}

                {cipherType === 'affine' && (
                  <div className="flex items-center gap-2">
                    <input
                      id="key-input"
                      type="text"
                      value={String(shiftKey)}
                      onChange={(e) => setShiftKey(e.target.value)}
                      placeholder="e.g. 5, 8"
                      className="w-full rounded-xl border border-slate-700 bg-[#0B132B] px-3.5 py-2 font-mono text-sm text-cyan-300 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/50"
                    />
                    <span className="text-[11px] text-slate-400 whitespace-nowrap">
                      a (coprime), b (shift)
                    </span>
                  </div>
                )}

                {cipherType === 'vigenere' && (
                  <div className="relative">
                    <input
                      id="key-input"
                      type="text"
                      value={String(shiftKey)}
                      onChange={(e) => setShiftKey(e.target.value.replace(/[^a-zA-Z]/g, '').toUpperCase())}
                      placeholder="e.g. SECRET"
                      className="w-full rounded-xl border border-slate-700 bg-[#0B132B] px-3.5 py-2 font-mono text-sm text-cyan-300 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 uppercase tracking-widest"
                    />
                  </div>
                )}

                {cipherType === 'atbash' && (
                  <div className="rounded-xl border border-slate-800 bg-[#0B132B]/80 px-3.5 py-2 text-xs text-slate-400 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Self-reciprocal reversal: A ↔ Z, B ↔ Y</span>
                  </div>
                )}

                {cipherType === 'rot13' && (
                  <div className="rounded-xl border border-slate-800 bg-[#0B132B]/80 px-3.5 py-2 text-xs text-slate-400 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Fixed rotation of 13 places (half of 26)</span>
                  </div>
                )}

                {cipherType === 'polybius' && (
                  <div className="rounded-xl border border-slate-800 bg-[#0B132B]/80 px-3.5 py-2 text-xs text-slate-400 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>5×5 Coordinates (A=11, B=12... I/J=24... Z=55)</span>
                  </div>
                )}

                {cipherType === 'bacon' && (
                  <div className="rounded-xl border border-slate-800 bg-[#0B132B]/80 px-3.5 py-2 text-xs text-slate-400 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>5-Bit Binary Representation (A=AAAAA, B=AAAAB...)</span>
                  </div>
                )}
              </div>
            </div>

            {/* Frame: Action Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-700/60">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleExecute('encrypt')}
                  className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold shadow-md transition-all active:scale-95 ${
                    activeMode === 'encrypt'
                      ? 'bg-cyan-500 text-slate-950 ring-2 ring-cyan-300 ring-offset-2 ring-offset-[#1C2541]'
                      : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500 hover:text-slate-950'
                  }`}
                >
                  <span role="img" aria-label="Lock">🔐</span>
                  <span>Encrypt</span>
                </button>

                <button
                  onClick={() => handleExecute('decrypt')}
                  className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold shadow-md transition-all active:scale-95 ${
                    activeMode === 'decrypt'
                      ? 'bg-indigo-500 text-white ring-2 ring-indigo-300 ring-offset-2 ring-offset-[#1C2541]'
                      : 'bg-slate-800 text-slate-200 border border-slate-700 hover:bg-indigo-600 hover:text-white'
                  }`}
                >
                  <span role="img" aria-label="Unlock">🔓</span>
                  <span>Decrypt</span>
                </button>
              </div>

              {/* Clear button */}
              <button
                onClick={handleClear}
                className="flex items-center gap-1.5 rounded-lg border border-slate-700/80 bg-slate-800/60 px-3 py-2 text-xs font-medium text-slate-400 hover:bg-slate-700 hover:text-rose-300 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear</span>
              </button>
            </div>
          </div>

          {/* Frame: Result Box */}
          <div className="rounded-2xl border border-slate-800 bg-[#1C2541]/80 p-5 shadow-xl backdrop-blur-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-white">Result</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-800/80 text-cyan-300 font-mono">
                  {activeMode === 'encrypt' ? 'Encrypted Ciphertext' : 'Decrypted Plaintext'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleSwap}
                  title="Swap result into message input for reverse testing"
                  className="flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-800/80 px-2.5 py-1 text-xs font-medium text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
                >
                  <ArrowDownUp className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="hidden sm:inline">Swap to Input</span>
                </button>

                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-800/80 px-2.5 py-1 text-xs font-medium text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-400" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="rounded-xl border border-slate-700 bg-[#0B132B] p-4 min-h-[90px] font-mono text-base font-semibold text-cyan-300 tracking-wider break-words selection:bg-cyan-500/40">
              {resultText || (
                <span className="text-slate-600 font-normal italic">
                  Result will appear here...
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: "How it works" information card (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <HowItWorksCard
            cipher={currentMeta}
            explanation={explanation}
            steps={steps}
            currentMode={activeMode}
            currentShift={shiftKey}
          />

          {/* Fast Navigation Callouts to other screens */}
          <div className="rounded-2xl border border-slate-800 bg-[#1C2541]/50 p-5 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Learning Resources
            </h4>
            <div className="grid grid-cols-1 gap-2.5">
              <button
                onClick={onNavigateToAbout}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 hover:bg-slate-900 transition-all text-left"
              >
                <div>
                  <div className="text-xs font-bold text-white">Compare All 4 Ciphers</div>
                  <div className="text-[11px] text-slate-400">
                    Caesar, Atbash, ROT13, and Vigenère side-by-side
                  </div>
                </div>
                <span className="text-cyan-400 text-xs font-semibold">View Cards →</span>
              </button>

              <button
                onClick={onNavigateToWheel}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 hover:bg-slate-900 transition-all text-left"
              >
                <div>
                  <div className="text-xs font-bold text-white">Dual-Strip Alphabet Wheel</div>
                  <div className="text-[11px] text-slate-400">
                    Visual 26-character interactive slider
                  </div>
                </div>
                <span className="text-cyan-400 text-xs font-semibold">Open Strip →</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
