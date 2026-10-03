import React, { useState } from 'react';
import { CipherType } from '../types/cipher';
import { CIPHER_REGISTRY, getAlphabetMapping, normalizeShift } from '../utils/ciphers';
import { ArrowDown, RotateCcw, ArrowRightLeft } from 'lucide-react';

interface AlphabetVisualizerProps {
  currentCipher: CipherType;
  currentKey: string | number;
  onApplyToLab?: (cipher: CipherType, key: string | number) => void;
}

export const AlphabetVisualizer: React.FC<AlphabetVisualizerProps> = ({
  currentCipher: initialCipher,
  currentKey: initialKey,
  onApplyToLab,
}) => {
  const [selectedCipher, setSelectedCipher] = useState<CipherType>(initialCipher);
  const [shift, setShift] = useState<number>(
    typeof initialKey === 'number' ? initialKey : 3
  );
  const [vigenereChar, setVigenereChar] = useState<string>('K');
  const [selectedLetter, setSelectedLetter] = useState<string>('H');

  const { plain, cipher } = getAlphabetMapping(
    selectedCipher,
    selectedCipher === 'vigenere' ? vigenereChar : shift
  );

  const selectedIndex = plain.indexOf(selectedLetter);
  const mappedLetter = selectedIndex >= 0 ? cipher[selectedIndex] : '-';

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="border-b border-slate-800 pb-6">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-2">
          <span>Interactive Visual Sandbox</span>
          <span aria-hidden="true">·</span>
          <span>Alphabet Mapping</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Alphabet Shift & Substitution Wheel
        </h2>
        <p className="mt-2 text-base text-slate-400 max-w-3xl">
          Observe how the 26 characters of the English alphabet map to their ciphertext
          counterparts under different cryptographic rules.
        </p>
      </div>

      {/* Controls Bar */}
      <div className="rounded-2xl border border-slate-800 bg-[#1C2541]/80 p-5 shadow-xl backdrop-blur-sm flex flex-wrap items-center justify-between gap-4">
        {/* Cipher selector */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
            Select Cipher:
          </span>
          {(['caesar', 'atbash', 'rot13', 'vigenere', 'affine', 'polybius', 'bacon', 'railfence'] as CipherType[]).map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCipher(c)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedCipher === c
                  ? 'bg-cyan-500 text-slate-950 shadow-sm'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              {CIPHER_REGISTRY[c].name}
            </button>
          ))}
        </div>

        {/* Dynamic Parameter control */}
        {selectedCipher === 'caesar' && (
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400 font-medium">Shift (k):</span>
            <input
              type="range"
              min="0"
              max="25"
              value={shift}
              onChange={(e) => setShift(parseInt(e.target.value, 10))}
              className="w-32 accent-cyan-400"
            />
            <span className="font-mono text-sm font-bold text-cyan-300 bg-slate-900 border border-slate-700 px-2 py-0.5 rounded">
              +{shift}
            </span>
          </div>
        )}

        {selectedCipher === 'affine' && (
          <div className="text-xs text-cyan-300 font-mono bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-700">
            Linear Equation: C = (5·P + 8) mod 26
          </div>
        )}

        {selectedCipher === 'polybius' && (
          <div className="text-xs text-cyan-300 font-mono bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-700">
            5×5 Grid Coordinates (Row, Col)
          </div>
        )}

        {selectedCipher === 'bacon' && (
          <div className="text-xs text-amber-300 font-mono bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-700">
            5-Bit Binary Representation (A/B)
          </div>
        )}

        {selectedCipher === 'railfence' && (
          <div className="text-xs text-sky-300 font-mono bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-700">
            Wave Transposition (Positions reordered across rails)
          </div>
        )}

        {selectedCipher === 'vigenere' && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium">Key Char:</span>
            <select
              value={vigenereChar}
              onChange={(e) => setVigenereChar(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-xs font-mono text-cyan-300 focus:outline-none focus:border-cyan-500"
            >
              {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((char, idx) => (
                <option key={char} value={char}>
                  {char} (shift +{idx})
                </option>
              ))}
            </select>
          </div>
        )}

        {selectedCipher === 'atbash' && (
          <div className="text-xs text-slate-400 italic">
            Fixed reversal: A ↔ Z, B ↔ Y, C ↔ X...
          </div>
        )}

        {selectedCipher === 'rot13' && (
          <div className="text-xs text-slate-400 italic">
            Fixed rotation: k = 13 (half of alphabet)
          </div>
        )}
      </div>

      {/* Visual Alignment Strip */}
      <div className="rounded-2xl border border-slate-800 bg-[#1C2541]/80 p-6 shadow-xl space-y-6">
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold text-white">
            Dual-Strip Alphabet Alignment
          </div>
          <div className="text-xs text-slate-400">
            Click any letter box below to test single-character substitution
          </div>
        </div>

        {/* Scrollable strip container */}
        <div className="overflow-x-auto pb-4">
          <div className="min-w-[800px] space-y-2">
            {/* Index row */}
            <div className="flex gap-1.5 text-center text-[10px] font-mono text-slate-500 pl-24">
              {plain.map((_, i) => (
                <div key={i} className="w-8 shrink-0">
                  {i}
                </div>
              ))}
            </div>

            {/* Plaintext row */}
            <div className="flex items-center gap-2">
              <div className="w-22 shrink-0 text-xs font-bold text-slate-400 uppercase tracking-wider">
                Plaintext (P):
              </div>
              <div className="flex gap-1.5">
                {plain.map((char, i) => {
                  const isSelected = char === selectedLetter;
                  return (
                    <button
                      key={char}
                      onClick={() => setSelectedLetter(char)}
                      className={`w-8 h-10 flex items-center justify-center rounded-lg font-mono font-bold text-sm transition-all ${
                        isSelected
                          ? 'bg-cyan-500 text-slate-950 ring-2 ring-cyan-300 ring-offset-2 ring-offset-slate-900 scale-105 z-10'
                          : 'bg-slate-900/90 text-slate-200 border border-slate-700/80 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      {char}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Downward indicator */}
            <div className="flex items-center gap-2 pl-24 py-1">
              <div className="flex gap-1.5">
                {plain.map((char, i) => {
                  const isSelected = char === selectedLetter;
                  return (
                    <div
                      key={i}
                      className={`w-8 flex justify-center text-xs transition-colors ${
                        isSelected ? 'text-cyan-400 font-bold' : 'text-slate-700'
                      }`}
                    >
                      ↓
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Ciphertext row */}
            <div className="flex items-center gap-2">
              <div className="w-22 shrink-0 text-xs font-bold text-cyan-400 uppercase tracking-wider">
                Ciphertext (C):
              </div>
              <div className="flex gap-1.5">
                {cipher.map((char, i) => {
                  const isSelected = plain[i] === selectedLetter;
                  return (
                    <div
                      key={i}
                      className={`w-8 h-10 flex items-center justify-center rounded-lg font-mono font-bold text-sm transition-all ${
                        isSelected
                          ? 'bg-cyan-400 text-slate-950 font-black shadow-lg scale-105 z-10'
                          : 'bg-slate-950/80 text-cyan-300/80 border border-cyan-900/40'
                      }`}
                    >
                      {char}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Selected letter focus card */}
        <div className="rounded-xl border border-slate-800 bg-[#0B132B] p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400">Selected Letter Transformation:</span>
            <div className="flex items-center gap-2 font-mono">
              <span className="px-3 py-1 rounded-lg bg-slate-800 text-white font-bold text-lg border border-slate-700">
                {selectedLetter}
              </span>
              <span className="text-cyan-400 font-bold">➔</span>
              <span className="px-3 py-1 rounded-lg bg-cyan-950 border border-cyan-700 text-cyan-300 font-bold text-lg">
                {mappedLetter}
              </span>
            </div>
          </div>

          <div className="text-xs font-mono text-slate-400">
            {selectedCipher === 'caesar' && (
              <span>
                Calculation: ({selectedIndex} + {shift}) mod 26 = {cipher.indexOf(mappedLetter)}
              </span>
            )}
            {selectedCipher === 'atbash' && (
              <span>
                Calculation: 25 - {selectedIndex} = {25 - selectedIndex}
              </span>
            )}
            {selectedCipher === 'rot13' && (
              <span>
                Calculation: ({selectedIndex} + 13) mod 26 = {(selectedIndex + 13) % 26}
              </span>
            )}
            {selectedCipher === 'vigenere' && (
              <span>
                Calculation: ({selectedIndex} + {vigenereChar.charCodeAt(0) - 65}) mod 26 = {cipher.indexOf(mappedLetter)}
              </span>
            )}
            {selectedCipher === 'affine' && (
              <span>
                Calculation: (5 · {selectedIndex} + 8) mod 26 = {(5 * selectedIndex + 8) % 26}
              </span>
            )}
            {selectedCipher === 'polybius' && (
              <span>
                Grid Coordinates: {mappedLetter}
              </span>
            )}
            {selectedCipher === 'bacon' && (
              <span>
                5-bit Binary: {mappedLetter}
              </span>
            )}
            {selectedCipher === 'railfence' && (
              <span>
                Wave Transposition: Position shifted along rails
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
