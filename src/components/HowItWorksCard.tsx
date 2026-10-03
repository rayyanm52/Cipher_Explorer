import React from 'react';
import { CipherMeta, TransformStep } from '../types/cipher';
import { BookOpen, Info, ArrowRight, CheckCircle2 } from 'lucide-react';

interface HowItWorksCardProps {
  cipher: CipherMeta;
  explanation: string;
  steps: TransformStep[];
  currentMode: 'encrypt' | 'decrypt';
  currentShift: string | number;
}

export const HowItWorksCard: React.FC<HowItWorksCardProps> = ({
  cipher,
  explanation,
  steps,
  currentMode,
  currentShift,
}) => {
  // Take up to first 5 alphabetic steps for clean visual demonstration
  const sampleSteps = steps.filter((s) => s.isAlpha).slice(0, 6);

  return (
    <div className="rounded-2xl border border-slate-800/90 bg-[#1C2541]/70 p-5 lg:p-6 shadow-xl backdrop-blur-sm">
      <div className="flex items-center justify-between border-b border-slate-700/60 pb-4 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/15 text-cyan-400 border border-cyan-500/30">
            <Info className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-white">
              How it works: {cipher.name}
            </h3>
            <span className="text-xs text-slate-400">
              Classical Cipher Concept
            </span>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2">
          <span className="font-mono text-xs text-cyan-300 bg-cyan-950/60 border border-cyan-800/60 px-2.5 py-1 rounded-md">
            Formula: {cipher.formula}
          </span>
        </div>
      </div>

      {/* Primary explanation text */}
      <div className="space-y-3">
        <p className="text-sm leading-relaxed text-slate-300">
          {cipher.howItWorks}
        </p>

        {/* Live dynamic explanation */}
        <div className="rounded-xl border border-cyan-500/30 bg-cyan-950/30 p-3.5 flex items-start gap-3">
          <div className="mt-0.5 text-cyan-400">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div className="text-xs sm:text-sm text-cyan-100">
            <span className="font-semibold text-cyan-300">Live Transformation Rule: </span>
            {explanation}
          </div>
        </div>

        {/* Step-by-step trace preview if message exists */}
        {sampleSteps.length > 0 && (
          <div className="mt-4 pt-3 border-t border-slate-700/50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Letter-by-Letter Math Trace ({currentMode === 'encrypt' ? 'Encryption' : 'Decryption'})
              </span>
              <span className="text-[11px] text-slate-500">
                Showing first {sampleSteps.length} characters
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
              {sampleSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="rounded-lg border border-slate-700/70 bg-slate-900/80 p-2.5 text-center flex flex-col items-center justify-between"
                >
                  <div className="flex items-center gap-1.5 font-mono text-sm">
                    <span className="font-bold text-white bg-slate-800 px-1.5 py-0.5 rounded">
                      {step.originalChar}
                    </span>
                    <ArrowRight className="w-3 h-3 text-cyan-400" />
                    <span className="font-bold text-cyan-300 bg-cyan-950/80 border border-cyan-800/60 px-1.5 py-0.5 rounded">
                      {step.transformedChar}
                    </span>
                  </div>

                  <div className="mt-2 text-[11px] text-slate-400 font-mono">
                    {cipher.id === 'caesar' || cipher.id === 'rot13' ? (
                      <span>
                        pos {step.originalPos} {currentMode === 'encrypt' ? '+' : '-'} {step.shiftUsed} = {step.transformedPos}
                      </span>
                    ) : cipher.id === 'atbash' ? (
                      <span>
                        25 - {step.originalPos} = {step.transformedPos}
                      </span>
                    ) : (
                      <span>
                        key '{step.keyChar}' (+{step.shiftUsed})
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Grade 11 Classroom Benchmark Card */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-xs">
          <div className="rounded-xl border border-slate-800 bg-[#0B132B]/80 p-3">
            <span className="font-medium text-slate-400 block mb-1">Time Complexity</span>
            <span className="font-mono text-cyan-300 font-semibold">O(N)</span>
            <p className="text-slate-500 mt-1 text-[11px]">
              Linear scan through text of length N with constant-time modular arithmetic.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-[#0B132B]/80 p-3">
            <span className="font-medium text-slate-400 block mb-1">Cryptographic Security</span>
            <span className="font-mono text-amber-300 font-semibold">Classical / Historical</span>
            <p className="text-slate-500 mt-1 text-[11px]">
              {cipher.id === 'vigenere'
                ? 'Resistant to simple frequency analysis, but vulnerable to Kasiski examination.'
                : 'Vulnerable to brute-force (only 25 keys) and letter frequency analysis.'}
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-[#0B132B]/80 p-3">
            <span className="font-medium text-slate-400 block mb-1">Key Space</span>
            <span className="font-mono text-emerald-400 font-semibold">
              {cipher.id === 'caesar'
                ? '25 possible keys'
                : cipher.id === 'atbash'
                ? '1 fixed mapping'
                : cipher.id === 'rot13'
                ? '1 fixed key (k = 13)'
                : '26^L (where L is key length)'}
            </span>
            <p className="text-slate-500 mt-1 text-[11px]">
              Total permutations an attacker would need to search through in a brute-force attack.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
