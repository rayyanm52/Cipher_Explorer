import { CipherMeta, CipherType, TransformStep } from '../types/cipher';

export const CIPHER_REGISTRY: Record<CipherType, CipherMeta> = {
  caesar: {
    id: 'caesar',
    name: 'Caesar Cipher',
    shortDesc: 'Shifts letters by a fixed number',
    history: 'Used by Julius Caesar around 58 BC to protect military dispatches. One of the earliest known substitution ciphers in human history.',
    howItWorks: 'Each letter is shifted forward or backward by a fixed numerical value in the alphabet. When reaching Z, the count wraps around to A.',
    formula: 'C = (P + k) mod 26',
    exampleMessage: 'HELLO WORLD',
    defaultKey: 3,
    keyType: 'number',
    keyLabel: 'Shift Value (0–25)',
    keyPlaceholder: 'Enter shift integer (e.g. 3)',
  },
  atbash: {
    id: 'atbash',
    name: 'Atbash Cipher',
    shortDesc: 'Reverses the alphabet',
    history: 'Originates from the Hebrew alphabet around 500 BC. In Hebrew, Aleph (first letter) maps to Tav (last), and Bet (second) maps to Shin (second-to-last).',
    howItWorks: 'The entire alphabet is flipped symmetrically. A becomes Z, B becomes Y, C becomes X, and so on. Because it is symmetric, running the cipher a second time decodes the message.',
    formula: 'C = 25 - P',
    exampleMessage: 'HELLO WORLD',
    defaultKey: '',
    keyType: 'none',
    keyLabel: 'Key Not Required',
    keyPlaceholder: 'Atbash uses automatic 1-to-1 reverse mapping',
  },
  rot13: {
    id: 'rot13',
    name: 'ROT13',
    shortDesc: 'Shifts letters by 13 positions',
    history: 'A modern staple on Usenet and developer message boards introduced in the early 1980s. Popularized as an informal way to obscure spoilers, puzzle solutions, and punchlines.',
    howItWorks: 'A specialized symmetric Caesar cipher with a fixed shift of 13. Since the English alphabet has 26 letters, shifting 13 twice (13 + 13 = 26) brings you right back to the start. Thus, encryption and decryption are identical operations.',
    formula: 'C = (P + 13) mod 26',
    exampleMessage: 'HELLO WORLD',
    defaultKey: 13,
    keyType: 'none',
    keyLabel: 'Fixed Shift (13)',
    keyPlaceholder: 'Fixed at 13 positions',
  },
  vigenere: {
    id: 'vigenere',
    name: 'Vigenère Cipher',
    shortDesc: 'Uses a keyword to create changing shifts',
    history: 'Invented by Giovan Battista Bellaso in 1553 and later misattributed to Blaise de Vigenère. Known as "le chiffre indéchiffrable" (the unbreakable cipher) because it resisted frequency analysis for three centuries until Friedrich Kasiski cracked it in 1863.',
    howItWorks: 'Uses a repeating keyword. Each character in the keyword supplies its own Caesar shift for the corresponding letter of the message. For instance, the letter "K" (pos 10) in the key shifts the plaintext letter by 10.',
    formula: 'C_i = (P_i + K_i) mod 26',
    exampleMessage: 'HELLO WORLD',
    defaultKey: 'KEY',
    keyType: 'text',
    keyLabel: 'Secret Keyword',
    keyPlaceholder: 'e.g. KEY, SECRET, CIPHER',
  },
  railfence: {
    id: 'railfence',
    name: 'Rail Fence Cipher',
    shortDesc: 'Zig-zag transposition along fence rails',
    history: 'An ancient transposition cipher famously used by ancient Greeks (scytale) and soldiers in the American Civil War to encode telegraph messages by rearranging letter positions rather than substituting them.',
    howItWorks: 'Letters are written diagonally up and down on imaginary "rails" of a fence, then read off row-by-row from top to bottom. It scrambles letter order rather than letter identities.',
    formula: 'Period = 2 * (rails - 1)',
    exampleMessage: 'DEFEND THE EAST WALL',
    defaultKey: 3,
    keyType: 'number',
    keyLabel: 'Number of Rails (2–8)',
    keyPlaceholder: 'Enter number of rails (e.g. 3)',
  },
  affine: {
    id: 'affine',
    name: 'Affine Cipher',
    shortDesc: 'Mathematical linear substitution (a·P + b)',
    history: 'A generalized monoalphabetic substitution cipher combining modular multiplication and addition. It demonstrates modular inverses and coprime number theory.',
    howItWorks: 'Each letter position P is multiplied by a key "a" (must be coprime with 26) and added to a shift "b", all modulo 26. To decrypt, we find the modular multiplicative inverse of a.',
    formula: 'C = (a·P + b) mod 26',
    exampleMessage: 'HELLO WORLD',
    defaultKey: '5, 8',
    keyType: 'text',
    keyLabel: 'Keys a, b (e.g. 5, 8)',
    keyPlaceholder: 'a (coprime to 26), b',
  },
  polybius: {
    id: 'polybius',
    name: 'Polybius Square',
    shortDesc: 'Encodes letters into 2-digit coordinates',
    history: 'Invented by the ancient Greek historian Polybius around 150 BC for optical signaling with torches. Became the foundation for modern tap codes, ADFGVX, and telegraphy.',
    howItWorks: 'Letters are arranged into a 5x5 grid (combining I/J). Each letter is replaced with its row and column numbers (e.g., A=11, B=12, H=23, Z=55).',
    formula: 'Char -> (Row, Col)',
    exampleMessage: 'HELLO WORLD',
    defaultKey: '',
    keyType: 'none',
    keyLabel: 'Key Not Required',
    keyPlaceholder: 'Standard 5x5 Grid (I/J shared)',
  },
  bacon: {
    id: 'bacon',
    name: "Bacon's Cipher",
    shortDesc: '5-character binary steganographic code',
    history: 'Created by philosopher Sir Francis Bacon in 1605. A foundational ancestor of binary computing and steganography, encoding messages using combinations of two distinct typefaces or symbols.',
    howItWorks: 'Each letter is mapped to a unique 5-letter sequence of A and B (like binary 0 and 1). A = AAAAA, B = AAAAB, C = AAABA, up to Z = BBAAB.',
    formula: 'P -> 5-bit (A/B)',
    exampleMessage: 'HELLO WORLD',
    defaultKey: '',
    keyType: 'none',
    keyLabel: 'Key Not Required',
    keyPlaceholder: 'Standard 5-bit A/B representation',
  },
};

/**
 * Normalizes Caesar shift to 0..25 range
 */
export function normalizeShift(shift: number): number {
  return ((shift % 26) + 26) % 26;
}

/**
 * Valid coprimes with 26 for Affine cipher
 */
export const VALID_AFFINE_A = [1, 3, 5, 7, 9, 11, 15, 17, 19, 21, 23, 25];

export const AFFINE_MOD_INVERSE: Record<number, number> = {
  1: 1,
  3: 9,
  5: 21,
  7: 15,
  9: 3,
  11: 19,
  15: 7,
  17: 23,
  19: 11,
  21: 5,
  23: 17,
  25: 25,
};

// Polybius 5x5 mapping
const POLYBIUS_GRID: Record<string, string> = {
  A: '11', B: '12', C: '13', D: '14', E: '15',
  F: '21', G: '22', H: '23', I: '24', J: '24', K: '25',
  L: '31', M: '32', N: '33', O: '34', P: '35',
  Q: '41', R: '42', S: '43', T: '44', U: '45',
  V: '51', W: '52', X: '53', Y: '54', Z: '55',
};

const POLYBIUS_REVERSE: Record<string, string> = {
  '11': 'A', '12': 'B', '13': 'C', '14': 'D', '15': 'E',
  '21': 'F', '22': 'G', '23': 'H', '24': 'I', '25': 'K',
  '31': 'L', '32': 'M', '33': 'N', '34': 'O', '35': 'P',
  '41': 'Q', '42': 'R', '43': 'S', '44': 'T', '45': 'U',
  '51': 'V', '52': 'W', '53': 'X', '54': 'Y', '55': 'Z',
};

// Bacon 5-bit lookup table
const BACON_MAP: Record<string, string> = {
  A: 'AAAAA', B: 'AAAAB', C: 'AAABA', D: 'AAABB', E: 'AABAA',
  F: 'AABAB', G: 'AABBA', H: 'AABBB', I: 'ABAAA', J: 'ABAAB',
  K: 'ABABA', L: 'ABABB', M: 'ABBAA', N: 'ABBAB', O: 'ABBBA',
  P: 'ABBBB', Q: 'BAAAA', R: 'BAAAB', S: 'BAABA', T: 'BAABB',
  U: 'BABAA', V: 'BABAB', W: 'BABBA', X: 'BABBB', Y: 'BBAAA',
  Z: 'BBAAB',
};

const BACON_REVERSE: Record<string, string> = Object.entries(BACON_MAP).reduce(
  (acc, [letter, code]) => {
    acc[code] = letter;
    return acc;
  },
  {} as Record<string, string>
);

/**
 * Transforms a single character with Caesar cipher
 */
function transformCaesarChar(
  char: string,
  shift: number,
  isDecrypt: boolean
): { transformed: string; shiftUsed: number; origPos: number; transPos: number; isAlpha: boolean } {
  const code = char.charCodeAt(0);
  const actualShift = isDecrypt ? normalizeShift(26 - shift) : normalizeShift(shift);

  if (code >= 65 && code <= 90) {
    const origPos = code - 65;
    const transPos = (origPos + actualShift) % 26;
    return {
      transformed: String.fromCharCode(transPos + 65),
      shiftUsed: actualShift,
      origPos,
      transPos,
      isAlpha: true,
    };
  }

  if (code >= 97 && code <= 122) {
    const origPos = code - 97;
    const transPos = (origPos + actualShift) % 26;
    return {
      transformed: String.fromCharCode(transPos + 97),
      shiftUsed: actualShift,
      origPos,
      transPos,
      isAlpha: true,
    };
  }

  return {
    transformed: char,
    shiftUsed: 0,
    origPos: -1,
    transPos: -1,
    isAlpha: false,
  };
}

/**
 * Transforms a single character with Atbash
 */
function transformAtbashChar(char: string): {
  transformed: string;
  origPos: number;
  transPos: number;
  isAlpha: boolean;
} {
  const code = char.charCodeAt(0);
  if (code >= 65 && code <= 90) {
    const origPos = code - 65;
    const transPos = 25 - origPos;
    return {
      transformed: String.fromCharCode(transPos + 65),
      origPos,
      transPos,
      isAlpha: true,
    };
  }

  if (code >= 97 && code <= 122) {
    const origPos = code - 97;
    const transPos = 25 - origPos;
    return {
      transformed: String.fromCharCode(transPos + 97),
      origPos,
      transPos,
      isAlpha: true,
    };
  }

  return {
    transformed: char,
    origPos: -1,
    transPos: -1,
    isAlpha: false,
  };
}

/**
 * Rail Fence Cipher Implementation
 */
export function railFenceEncrypt(text: string, numRails: number): { result: string; steps: TransformStep[] } {
  if (numRails <= 1 || text.length === 0) return { result: text, steps: [] };

  const rails: string[][] = Array.from({ length: numRails }, () => []);
  let rail = 0;
  let directionDown = false;
  const steps: TransformStep[] = [];

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    rails[rail].push(char);

    steps.push({
      originalChar: char,
      transformedChar: char,
      isAlpha: /[a-zA-Z]/.test(char),
      shiftUsed: rail,
      originalPos: i,
      transformedPos: rail,
      keyChar: `Rail ${rail + 1}`,
    });

    if (rail === 0 || rail === numRails - 1) {
      directionDown = !directionDown;
    }
    rail += directionDown ? 1 : -1;
  }

  const result = rails.flat().join('');
  return { result, steps };
}

export function railFenceDecrypt(text: string, numRails: number): { result: string; steps: TransformStep[] } {
  if (numRails <= 1 || text.length === 0) return { result: text, steps: [] };

  // 1. Mark the zig-zag pattern with boolean matrix
  const matrix: (string | null)[][] = Array.from({ length: numRails }, () =>
    new Array(text.length).fill(null)
  );
  let rail = 0;
  let directionDown = false;

  for (let i = 0; i < text.length; i++) {
    matrix[rail][i] = '*';
    if (rail === 0 || rail === numRails - 1) {
      directionDown = !directionDown;
    }
    rail += directionDown ? 1 : -1;
  }

  // 2. Fill the matrix with ciphertext letters row by row
  let textIndex = 0;
  for (let r = 0; r < numRails; r++) {
    for (let c = 0; c < text.length; c++) {
      if (matrix[r][c] === '*' && textIndex < text.length) {
        matrix[r][c] = text[textIndex++];
      }
    }
  }

  // 3. Read off in zig-zag order
  let result = '';
  rail = 0;
  directionDown = false;
  const steps: TransformStep[] = [];

  for (let i = 0; i < text.length; i++) {
    const char = matrix[rail][i] || '';
    result += char;
    steps.push({
      originalChar: char,
      transformedChar: char,
      isAlpha: /[a-zA-Z]/.test(char),
      shiftUsed: rail,
      originalPos: rail,
      transformedPos: i,
      keyChar: `Rail ${rail + 1}`,
    });

    if (rail === 0 || rail === numRails - 1) {
      directionDown = !directionDown;
    }
    rail += directionDown ? 1 : -1;
  }

  return { result, steps };
}

/**
 * Affine Cipher
 */
export function affineProcess(
  text: string,
  keyStr: string,
  isDecrypt: boolean
): { result: string; steps: TransformStep[]; explanation: string } {
  // Parse "a, b" or default 5, 8
  const parts = String(keyStr).split(/[, ]+/).filter(Boolean);
  let a = parseInt(parts[0], 10) || 5;
  let b = parseInt(parts[1], 10) || 8;

  if (!VALID_AFFINE_A.includes(a)) {
    a = 5; // fallback to valid coprime
  }
  b = ((b % 26) + 26) % 26;

  const aInv = AFFINE_MOD_INVERSE[a] || 21;
  let result = '';
  const steps: TransformStep[] = [];

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const code = char.charCodeAt(0);

    if (code >= 65 && code <= 90) {
      const p = code - 65;
      let c: number;
      if (isDecrypt) {
        c = (aInv * (p - b + 26)) % 26;
      } else {
        c = (a * p + b) % 26;
      }
      const transChar = String.fromCharCode(c + 65);
      result += transChar;
      steps.push({
        originalChar: char,
        transformedChar: transChar,
        isAlpha: true,
        shiftUsed: b,
        originalPos: p,
        transformedPos: c,
        keyChar: `a=${a}, b=${b}`,
      });
    } else if (code >= 97 && code <= 122) {
      const p = code - 97;
      let c: number;
      if (isDecrypt) {
        c = (aInv * (p - b + 26)) % 26;
      } else {
        c = (a * p + b) % 26;
      }
      const transChar = String.fromCharCode(c + 97);
      result += transChar;
      steps.push({
        originalChar: char,
        transformedChar: transChar,
        isAlpha: true,
        shiftUsed: b,
        originalPos: p,
        transformedPos: c,
        keyChar: `a=${a}, b=${b}`,
      });
    } else {
      result += char;
      steps.push({
        originalChar: char,
        transformedChar: char,
        isAlpha: false,
        shiftUsed: 0,
        originalPos: -1,
        transformedPos: -1,
      });
    }
  }

  const explanation = isDecrypt
    ? `Affine Decryption: P = ${aInv} · (C - ${b}) mod 26 (using modular inverse a^-1 = ${aInv}).`
    : `Affine Encryption: C = (${a} · P + ${b}) mod 26 (slope a = ${a}, shift b = ${b}).`;

  return { result, steps, explanation };
}

/**
 * Polybius Square Process
 */
export function polybiusProcess(
  text: string,
  isDecrypt: boolean
): { result: string; steps: TransformStep[]; explanation: string } {
  let result = '';
  const steps: TransformStep[] = [];

  if (!isDecrypt) {
    // Encrypt: letters -> digit pairs
    const upper = text.toUpperCase();
    for (let i = 0; i < upper.length; i++) {
      const char = upper[i];
      if (POLYBIUS_GRID[char]) {
        const pair = POLYBIUS_GRID[char];
        result += pair + ' ';
        steps.push({
          originalChar: char,
          transformedChar: pair,
          isAlpha: true,
          shiftUsed: 0,
          originalPos: char.charCodeAt(0) - 65,
          transformedPos: parseInt(pair, 10),
          keyChar: `(${pair[0]}, ${pair[1]})`,
        });
      } else {
        result += char;
        steps.push({
          originalChar: char,
          transformedChar: char,
          isAlpha: false,
          shiftUsed: 0,
          originalPos: -1,
          transformedPos: -1,
        });
      }
    }
    return {
      result: result.trim(),
      steps,
      explanation: 'Each letter mapped to its (row, column) coordinates on a 5x5 grid (I/J share 24).',
    };
  } else {
    // Decrypt: digit pairs -> letters
    const tokens = text.trim().split(/[\s,]+/);
    for (const token of tokens) {
      if (token.length === 2 && POLYBIUS_REVERSE[token]) {
        const letter = POLYBIUS_REVERSE[token];
        result += letter;
        steps.push({
          originalChar: token,
          transformedChar: letter,
          isAlpha: true,
          shiftUsed: 0,
          originalPos: parseInt(token, 10),
          transformedPos: letter.charCodeAt(0) - 65,
          keyChar: `Row ${token[0]} Col ${token[1]}`,
        });
      } else if (token.length > 2 && /^\d+$/.test(token)) {
        // Stream of continuous digits without spaces
        for (let j = 0; j < token.length - 1; j += 2) {
          const pair = token.substring(j, j + 2);
          const letter = POLYBIUS_REVERSE[pair] || '?';
          result += letter;
          steps.push({
            originalChar: pair,
            transformedChar: letter,
            isAlpha: true,
            shiftUsed: 0,
            originalPos: parseInt(pair, 10),
            transformedPos: letter.charCodeAt(0) - 65,
          });
        }
      } else {
        result += token;
      }
    }
    return {
      result,
      steps,
      explanation: 'Decoded 2-digit coordinates back into letters using the 5x5 Polybius grid.',
    };
  }
}

/**
 * Bacon's Cipher Process
 */
export function baconProcess(
  text: string,
  isDecrypt: boolean
): { result: string; steps: TransformStep[]; explanation: string } {
  let result = '';
  const steps: TransformStep[] = [];

  if (!isDecrypt) {
    const upper = text.toUpperCase();
    for (let i = 0; i < upper.length; i++) {
      const char = upper[i];
      if (BACON_MAP[char]) {
        const code = BACON_MAP[char];
        result += code + ' ';
        steps.push({
          originalChar: char,
          transformedChar: code,
          isAlpha: true,
          shiftUsed: 0,
          originalPos: char.charCodeAt(0) - 65,
          transformedPos: 0,
          keyChar: code,
        });
      } else {
        result += char;
      }
    }
    return {
      result: result.trim(),
      steps,
      explanation: "Each letter converted into Sir Francis Bacon's 5-character binary encoding (A/B).",
    };
  } else {
    // Clean string to A and B
    const cleaned = text.toUpperCase().replace(/[^AB]/g, '');
    for (let i = 0; i < cleaned.length; i += 5) {
      if (i + 5 <= cleaned.length) {
        const chunk = cleaned.substring(i, i + 5);
        const letter = BACON_REVERSE[chunk] || '?';
        result += letter;
        steps.push({
          originalChar: chunk,
          transformedChar: letter,
          isAlpha: true,
          shiftUsed: 0,
          originalPos: 0,
          transformedPos: letter.charCodeAt(0) - 65,
        });
      }
    }
    return {
      result,
      steps,
      explanation: 'Decoded 5-bit A/B chunks back into plaintext characters.',
    };
  }
}

/**
 * Main execution function
 */
export function processCipher(
  text: string,
  cipherType: CipherType,
  mode: 'encrypt' | 'decrypt',
  keyValue: string | number
): { result: string; steps: TransformStep[]; explanation: string } {
  if (!text) {
    return { result: '', steps: [], explanation: 'Enter a message above to see encryption in action.' };
  }

  const isDecrypt = mode === 'decrypt';
  const steps: TransformStep[] = [];
  let result = '';
  let explanation = '';

  switch (cipherType) {
    case 'caesar': {
      const shiftNum = typeof keyValue === 'number' ? keyValue : parseInt(String(keyValue), 10) || 0;
      const normalized = normalizeShift(shiftNum);

      for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const res = transformCaesarChar(char, normalized, isDecrypt);
        result += res.transformed;
        steps.push({
          originalChar: char,
          transformedChar: res.transformed,
          isAlpha: res.isAlpha,
          shiftUsed: res.shiftUsed,
          originalPos: res.origPos,
          transformedPos: res.transPos,
        });
      }

      if (isDecrypt) {
        explanation = `Each letter shifted backward by ${normalized} positions (equivalent to +${normalizeShift(26 - normalized)} mod 26).`;
      } else {
        explanation = `Each letter is shifted ${normalized} positions forward in the alphabet.`;
      }
      break;
    }

    case 'atbash': {
      for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const res = transformAtbashChar(char);
        result += res.transformed;
        steps.push({
          originalChar: char,
          transformedChar: res.transformed,
          isAlpha: res.isAlpha,
          shiftUsed: 0,
          originalPos: res.origPos,
          transformedPos: res.transPos,
        });
      }
      explanation = 'Each letter was mirrored across the alphabet: A↔Z, B↔Y, C↔X, etc. Notice that encrypting and decrypting are identical!';
      break;
    }

    case 'rot13': {
      for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const res = transformCaesarChar(char, 13, false);
        result += res.transformed;
        steps.push({
          originalChar: char,
          transformedChar: res.transformed,
          isAlpha: res.isAlpha,
          shiftUsed: 13,
          originalPos: res.origPos,
          transformedPos: res.transPos,
        });
      }
      explanation = 'Each letter rotated 13 places forward in the 26-letter alphabet. Running ROT13 a second time restores the original plaintext.';
      break;
    }

    case 'vigenere': {
      const rawKey = String(keyValue).toUpperCase().replace(/[^A-Z]/g, '');
      const validKey = rawKey.length > 0 ? rawKey : 'A';
      let keyIndex = 0;

      for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const code = char.charCodeAt(0);
        const isUpper = code >= 65 && code <= 90;
        const isLower = code >= 97 && code <= 122;

        if (isUpper || isLower) {
          const keyChar = validKey[keyIndex % validKey.length];
          const keyShift = keyChar.charCodeAt(0) - 65;
          const res = transformCaesarChar(char, keyShift, isDecrypt);
          result += res.transformed;
          steps.push({
            originalChar: char,
            transformedChar: res.transformed,
            isAlpha: true,
            shiftUsed: res.shiftUsed,
            originalPos: res.origPos,
            transformedPos: res.transPos,
            keyChar,
          });
          keyIndex++;
        } else {
          result += char;
          steps.push({
            originalChar: char,
            transformedChar: char,
            isAlpha: false,
            shiftUsed: 0,
            originalPos: -1,
            transformedPos: -1,
          });
        }
      }

      explanation = `Vigenère transformation using keyword "${validKey}". Each plaintext letter was shifted by the corresponding letter of the repeated key.`;
      break;
    }

    case 'railfence': {
      const rails = typeof keyValue === 'number' ? keyValue : parseInt(String(keyValue), 10) || 3;
      const validRails = Math.max(2, Math.min(10, rails));
      if (isDecrypt) {
        const res = railFenceDecrypt(text, validRails);
        result = res.result;
        steps.push(...res.steps);
        explanation = `Reconstructed diagonal zig-zag pattern across ${validRails} rails to decode the original letter sequence.`;
      } else {
        const res = railFenceEncrypt(text, validRails);
        result = res.result;
        steps.push(...res.steps);
        explanation = `Message written in a zig-zag wave along ${validRails} rails, then read row-by-row.`;
      }
      break;
    }

    case 'affine': {
      const res = affineProcess(text, String(keyValue), isDecrypt);
      result = res.result;
      steps.push(...res.steps);
      explanation = res.explanation;
      break;
    }

    case 'polybius': {
      const res = polybiusProcess(text, isDecrypt);
      result = res.result;
      steps.push(...res.steps);
      explanation = res.explanation;
      break;
    }

    case 'bacon': {
      const res = baconProcess(text, isDecrypt);
      result = res.result;
      steps.push(...res.steps);
      explanation = res.explanation;
      break;
    }
  }

  return { result, steps, explanation };
}

/**
 * Helper to get the full mapped alphabet for visualizer
 */
export function getAlphabetMapping(
  cipherType: CipherType,
  keyValue: string | number
): { plain: string[]; cipher: string[] } {
  const plain = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  let cipher: string[] = [];

  switch (cipherType) {
    case 'caesar': {
      const shiftNum = typeof keyValue === 'number' ? keyValue : parseInt(String(keyValue), 10) || 0;
      const shift = normalizeShift(shiftNum);
      cipher = plain.map((_, i) => plain[(i + shift) % 26]);
      break;
    }
    case 'atbash': {
      cipher = [...plain].reverse();
      break;
    }
    case 'rot13': {
      cipher = plain.map((_, i) => plain[(i + 13) % 26]);
      break;
    }
    case 'vigenere': {
      const rawKey = String(keyValue).toUpperCase().replace(/[^A-Z]/g, '');
      const firstKeyChar = rawKey.length > 0 ? rawKey[0] : 'A';
      const shift = firstKeyChar.charCodeAt(0) - 65;
      cipher = plain.map((_, i) => plain[(i + shift) % 26]);
      break;
    }
    case 'affine': {
      const parts = String(keyValue).split(/[, ]+/).filter(Boolean);
      let a = parseInt(parts[0], 10) || 5;
      let b = parseInt(parts[1], 10) || 8;
      if (!VALID_AFFINE_A.includes(a)) a = 5;
      b = ((b % 26) + 26) % 26;
      cipher = plain.map((_, p) => plain[(a * p + b) % 26]);
      break;
    }
    case 'polybius': {
      cipher = plain.map((char) => POLYBIUS_GRID[char] || '??');
      break;
    }
    case 'bacon': {
      cipher = plain.map((char) => BACON_MAP[char] ? BACON_MAP[char].substring(0, 3) + '..' : '??');
      break;
    }
    case 'railfence': {
      // Transposition doesn't map 1-to-1 independent of text, so show shifted sample
      cipher = [...plain];
      break;
    }
  }

  return { plain, cipher };
}
