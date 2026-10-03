export type CipherType =
  | 'caesar'
  | 'atbash'
  | 'rot13'
  | 'vigenere'
  | 'railfence'
  | 'affine'
  | 'polybius'
  | 'bacon';

export interface CipherMeta {
  id: CipherType;
  name: string;
  shortDesc: string;
  history: string;
  howItWorks: string;
  formula: string;
  exampleMessage: string;
  defaultKey: string | number;
  keyType: 'number' | 'none' | 'text';
  keyLabel: string;
  keyPlaceholder: string;
}

export interface TransformStep {
  originalChar: string;
  transformedChar: string;
  isAlpha: boolean;
  shiftUsed: number;
  originalPos: number; // 0 - 25
  transformedPos: number; // 0 - 25
  keyChar?: string;
}
