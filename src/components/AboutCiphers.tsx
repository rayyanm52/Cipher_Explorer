import React from 'react';
import { CipherType } from '../types/cipher';
import { CIPHER_REGISTRY } from '../utils/ciphers';
import { ArrowRight, KeyRound, RefreshCw, Sparkles, ShieldAlert, Waves, Calculator, Grid3X3, Binary } from 'lucide-react';

interface AboutCiphersProps {
  onSelectCipher: (cipher: CipherType, defaultShift?: string | number, sampleText?: string) => void;
}

export const AboutCiphers: React.FC<AboutCiphersProps> = ({ onSelectCipher }) => {
  const cards = [
    {
      id: 'caesar' as CipherType,
      title: '1. Caesar Cipher',
      subtitle: 'Shifts letters by a fixed number',
      icon: <KeyRound className="w-5 h-5 text-cyan-400" />,
      history: 'Named after Julius Caesar, who used it in 58 BC with a shift of 3 to send confidential military messages across Roman legions.',
      mechanism: 'Every letter in the message is replaced by a letter some fixed number of positions down the alphabet. For shift = 3: A becomes D, B becomes E, and Z wraps around to C.',
      formula: 'C = (P + shift) mod 26',
      visualExample: {
        input: 'HELLO',
        key: 'Shift: +3',
        output: 'KHOOR',
        breakdown: [
          { from: 'H', to: 'K', note: '7 + 3 = 10' },
          { from: 'E', to: 'H', note: '4 + 3 = 7' },
          { from: 'L', to: 'O', note: '11 + 3 = 14' },
          { from: 'L', to: 'O', note: '11 + 3 = 14' },
          { from: 'O', to: 'R', note: '14 + 3 = 17' },
        ],
      },
      tryShift: 3,
      tryMessage: 'HELLO WORLD',
    },
    {
      id: 'atbash' as CipherType,
      title: '2. Atbash Cipher',
      subtitle: 'Reverses the alphabet',
      icon: <RefreshCw className="w-5 h-5 text-indigo-400" />,
      history: 'Originally developed for the Hebrew alphabet (Aleph ↔ Tav, Bet ↔ Shin) and found in ancient Biblical scrolls and manuscripts.',
      mechanism: 'The alphabet is mirrored end-to-end. The first letter exchanges with the last letter, the second with the second-to-last, etc. Because it is symmetric, running it twice decodes the message without a key.',
      formula: 'C = 25 - P',
      visualExample: {
        input: 'HELLO',
        key: 'Alphabet Reverse',
        output: 'SVOOL',
        breakdown: [
          { from: 'H', to: 'S', note: 'pos 7 ↔ 18' },
          { from: 'E', to: 'V', note: 'pos 4 ↔ 21' },
          { from: 'L', to: 'O', note: 'pos 11 ↔ 14' },
          { from: 'L', to: 'O', note: 'pos 11 ↔ 14' },
          { from: 'O', to: 'L', note: 'pos 14 ↔ 11' },
        ],
      },
      tryShift: '',
      tryMessage: 'HELLO WORLD',
    },
    {
      id: 'rot13' as CipherType,
      title: '3. ROT13',
      subtitle: 'Shifts letters by 13 positions',
      icon: <Sparkles className="w-5 h-5 text-teal-400" />,
      history: 'Became an internet standard in 1980s Usenet culture. Used as a friendly spoiler-blocker so readers could choose when to reveal answers to riddles or plot points.',
      mechanism: 'A special Caesar cipher with a fixed shift of 13. Since the alphabet has 26 letters and 13 is half of 26, the encryption and decryption processes are completely identical.',
      formula: 'C = (P + 13) mod 26',
      visualExample: {
        input: 'HELLO',
        key: 'Shift: 13',
        output: 'URYYB',
        breakdown: [
          { from: 'H', to: 'U', note: '7 + 13 = 20' },
          { from: 'E', to: 'R', note: '4 + 13 = 17' },
          { from: 'L', to: 'Y', note: '11 + 13 = 24' },
          { from: 'L', to: 'Y', note: '11 + 13 = 24' },
          { from: 'O', to: 'B', note: '14 + 13 = 27→1' },
        ],
      },
      tryShift: 13,
      tryMessage: 'HELLO WORLD',
    },
    {
      id: 'vigenere' as CipherType,
      title: '4. Vigenère Cipher',
      subtitle: 'Uses a keyword to create changing shifts',
      icon: <ShieldAlert className="w-5 h-5 text-amber-400" />,
      history: 'Invented in the 16th century and called "The Indecipherable Cipher". It defeated cryptanalysts for over 300 years because each letter uses a different shift value.',
      mechanism: 'A polyalphabetic cipher. You repeat a keyword (e.g. "KEY") above your text. Each letter of the key determines how many positions to shift that column in the message.',
      formula: 'C_i = (P_i + K_i) mod 26',
      visualExample: {
        input: 'HELLO',
        key: 'Key: "KEY"',
        output: 'RIJVS',
        breakdown: [
          { from: 'H', to: 'R', note: 'H + K (+10)' },
          { from: 'E', to: 'I', note: 'E + E (+4)' },
          { from: 'L', to: 'J', note: 'L + Y (+24)' },
          { from: 'L', to: 'V', note: 'L + K (+10)' },
          { from: 'O', to: 'S', note: 'O + E (+4)' },
        ],
      },
      tryShift: 'KEY',
      tryMessage: 'HELLO WORLD',
    },
    {
      id: 'railfence' as CipherType,
      title: '5. Rail Fence Cipher',
      subtitle: 'Zig-zag transposition along fence rails',
      icon: <Waves className="w-5 h-5 text-sky-400" />,
      history: 'Used extensively in military history including the American Civil War. Unlike substitution ciphers, it rearranges the physical position of characters.',
      mechanism: 'Plaintext is written diagonally down and up across imaginary fence rails, then gathered horizontally rail-by-rail. Decryption reconstructs the wave matrix.',
      formula: 'Period = 2 * (rails - 1)',
      visualExample: {
        input: 'DEFEND',
        key: 'Rails: 3',
        output: 'DNETFE',
        breakdown: [
          { from: 'D (r0)', to: 'D', note: 'Rail 1: D...N' },
          { from: 'E (r1)', to: 'N', note: 'Rail 2: E.E.D' },
          { from: 'F (r2)', to: 'E', note: 'Rail 3: F' },
          { from: 'E (r1)', to: 'T', note: 'Wave order' },
          { from: 'N (r0)', to: 'F', note: 'Row read' },
        ],
      },
      tryShift: 3,
      tryMessage: 'DEFEND THE EAST WALL',
    },
    {
      id: 'affine' as CipherType,
      title: '6. Affine Cipher',
      subtitle: 'Linear modular arithmetic (a·P + b)',
      icon: <Calculator className="w-5 h-5 text-emerald-400" />,
      history: 'A foundational cipher in mathematical cryptology. Teaches modular arithmetic, coprime integers, and modular multiplicative inverses.',
      mechanism: 'Each letter P is mapped via (a*P + b) mod 26. Key "a" must share no common factors with 26 so each letter maps to a unique cipher letter.',
      formula: 'C = (a·P + b) mod 26',
      visualExample: {
        input: 'HELLO',
        key: 'a=5, b=8',
        output: 'RCLLA',
        breakdown: [
          { from: 'H (7)', to: 'R', note: '(5*7+8)%26 = 17' },
          { from: 'E (4)', to: 'C', note: '(5*4+8)%26 = 2' },
          { from: 'L (11)', to: 'L', note: '(5*11+8)%26=11' },
          { from: 'L (11)', to: 'L', note: '(5*11+8)%26=11' },
          { from: 'O (14)', to: 'A', note: '(5*14+8)%26=0' },
        ],
      },
      tryShift: '5, 8',
      tryMessage: 'HELLO WORLD',
    },
    {
      id: 'polybius' as CipherType,
      title: '7. Polybius Square',
      subtitle: 'Encodes letters into 2-digit coordinates',
      icon: <Grid3X3 className="w-5 h-5 text-purple-400" />,
      history: 'Invented in 150 BC in ancient Greece for torch signals. Formed the foundation for modern prisoner tap codes and ADFGVX.',
      mechanism: 'A 5x5 grid assigns each letter a pair of coordinates (row, column). I and J typically share slot (2, 4). Easily transmitted via sound taps or light pulses.',
      formula: 'Char -> (Row, Col)',
      visualExample: {
        input: 'HELLO',
        key: '5x5 Grid',
        output: '23 15 31 31 34',
        breakdown: [
          { from: 'H', to: '23', note: 'Row 2, Col 3' },
          { from: 'E', to: '15', note: 'Row 1, Col 5' },
          { from: 'L', to: '31', note: 'Row 3, Col 1' },
          { from: 'L', to: '31', note: 'Row 3, Col 1' },
          { from: 'O', to: '34', note: 'Row 3, Col 4' },
        ],
      },
      tryShift: '',
      tryMessage: 'HELLO WORLD',
    },
    {
      id: 'bacon' as CipherType,
      title: "8. Bacon's Cipher",
      subtitle: '5-character binary steganographic code',
      icon: <Binary className="w-5 h-5 text-rose-400" />,
      history: 'Created by Sir Francis Bacon in 1605. A precursor to binary computer memory, hiding messages inside normal text using two distinct typefaces.',
      mechanism: 'Each letter is encoded into a 5-letter sequence of A and B. Like 5-bit binary, A=0 and B=1. For example, A=AAAAA (0) and B=AAAAB (1).',
      formula: 'P -> 5-bit (A/B)',
      visualExample: {
        input: 'HELP',
        key: '5-bit A/B',
        output: 'AABBB AABAA ABABB ABBBB',
        breakdown: [
          { from: 'H', to: 'AABBB', note: 'pos 7 (00111)' },
          { from: 'E', to: 'AABAA', note: 'pos 4 (00100)' },
          { from: 'L', to: 'ABABB', note: 'pos 11 (01011)' },
          { from: 'P', to: 'ABBBB', note: 'pos 15 (01111)' },
          { from: '', to: '', note: '' },
        ],
      },
      tryShift: '',
      tryMessage: 'HELLO WORLD',
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header section */}
      <div className="border-b border-slate-800 pb-6">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-2">
          <span>Curriculum Reference</span>
          <span aria-hidden="true">·</span>
          <span>Classical Ciphers</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          About Classical Ciphers
        </h2>
        <p className="mt-2 text-base text-slate-400 max-w-3xl">
          Explore the foundation of cryptography. These four classical ciphers illustrate
          substitution, symmetry, modular arithmetic, and the shift from monoalphabetic to
          polyalphabetic encryption.
        </p>
      </div>

      {/* Grid of 4 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cards.map((card) => (
          <div
            key={card.id}
            className="flex flex-col justify-between rounded-2xl border border-slate-800 bg-[#1C2541]/80 p-6 shadow-xl hover:border-slate-700 transition-all backdrop-blur-sm"
          >
            <div>
              {/* Header */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-800/80 border border-slate-700">
                    {card.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{card.title}</h3>
                    <p className="text-xs font-medium text-cyan-300">{card.subtitle}</p>
                  </div>
                </div>

                <span className="font-mono text-xs text-slate-400 bg-slate-900/90 border border-slate-800 px-2 py-1 rounded">
                  {card.formula}
                </span>
              </div>

              {/* History & Concept */}
              <div className="space-y-3 mb-6">
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {card.mechanism}
                </p>
                <div className="text-xs text-slate-400 bg-slate-900/60 p-3 rounded-xl border border-slate-800/80">
                  <span className="font-semibold text-slate-300">History: </span>
                  {card.history}
                </div>
              </div>

              {/* Visual Example Card */}
              <div className="rounded-xl border border-slate-800 bg-[#0B132B] p-4 mb-6">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                  <span className="font-semibold uppercase tracking-wider text-slate-400">
                    Visual Example
                  </span>
                  <span className="font-mono text-cyan-400">{card.visualExample.key}</span>
                </div>

                {/* Input -> Output diagram */}
                <div className="flex items-center justify-between gap-2 p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 font-mono text-sm mb-3">
                  <div className="text-center">
                    <span className="text-[10px] text-slate-500 block uppercase font-sans">Input</span>
                    <span className="text-white font-bold tracking-widest">{card.visualExample.input}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-cyan-400 shrink-0" />
                  <div className="text-center">
                    <span className="text-[10px] text-slate-500 block uppercase font-sans">Output</span>
                    <span className="text-cyan-300 font-bold tracking-widest">{card.visualExample.output}</span>
                  </div>
                </div>

                {/* Micro step breakdown */}
                <div className="grid grid-cols-5 gap-1.5 text-center font-mono">
                  {card.visualExample.breakdown.map((item, idx) => (
                    <div key={idx} className="bg-slate-800/70 rounded p-1.5 border border-slate-700/50">
                      <div className="text-xs font-semibold text-white">
                        {item.from} → {item.to}
                      </div>
                      <div className="text-[10px] text-slate-400 truncate mt-0.5">
                        {item.note}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Try it action button */}
            <div className="pt-2 border-t border-slate-800/80">
              <button
                onClick={() => onSelectCipher(card.id, card.tryShift, card.tryMessage)}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-cyan-500/15 border border-cyan-500/40 px-4 py-2.5 text-sm font-semibold text-cyan-300 hover:bg-cyan-500 hover:text-slate-950 transition-all group shadow-sm"
              >
                <span>Try {CIPHER_REGISTRY[card.id].name} in Lab</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
