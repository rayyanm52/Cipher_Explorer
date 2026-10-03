import React, { useState } from 'react';
import { Copy, Check, Terminal, FileCode, Sparkles, CheckCircle2 } from 'lucide-react';

export const PythonTkinterGuide: React.FC = () => {
  const [activeCodeTab, setActiveCodeTab] = useState<'standard' | 'enhanced'>('standard');
  const [copied, setCopied] = useState(false);

  // User's exact Tkinter script
  const userOriginalCode = `import tkinter as tk

# -----------------------------
# CIPHER FUNCTIONS
# -----------------------------

def caesar_encrypt(text, shift):
    result = ""
    for char in text:
        if char.isalpha():
            start = ord('A') if char.isupper() else ord('a')
            new_char = chr(
                (ord(char) - start + shift) % 26 + start
            )
            result += new_char
        else:
            result += char
    return result


def atbash(text):
    result = ""
    for char in text:
        if char.isupper():
            result += chr(90 - (ord(char) - 65))
        elif char.islower():
            result += chr(122 - (ord(char) - 97))
        else:
            result += char
    return result


def rot13(text):
    return caesar_encrypt(text, 13)


def vigenere_encrypt(text, key):
    result = ""
    key = key.upper()
    key_index = 0

    for char in text:
        if char.isalpha():
            shift = ord(
                key[key_index % len(key)]
            ) - ord('A')

            start = ord('A') if char.isupper() else ord('a')

            new_char = chr(
                (ord(char) - start + shift) % 26 + start
            )
            result += new_char
            key_index += 1
        else:
            result += char

    return result


# -----------------------------
# ENCRYPT FUNCTION
# -----------------------------

def encrypt():
    text = message_entry.get("1.0", tk.END).strip()
    cipher = cipher_choice.get()

    if cipher == "Caesar Cipher":
        result = caesar_encrypt(text, 3)

    elif cipher == "Atbash Cipher":
        result = atbash(text)

    elif cipher == "ROT13":
        result = rot13(text)

    elif cipher == "Vigenere Cipher":
        result = vigenere_encrypt(text, "KEY")

    result_box.delete("1.0", tk.END)
    result_box.insert(tk.END, result)


# -----------------------------
# GUI SETUP
# -----------------------------

window = tk.Tk()
window.title("Cipher Explorer")
window.geometry("700x550")

# Title
title = tk.Label(
    window,
    text="🔐 Cipher Explorer",
    font=("Arial", 24, "bold")
)
title.pack(pady=20)

# Message input
message_label = tk.Label(
    window,
    text="Enter your message:",
    font=("Arial", 12)
)
message_label.pack()

message_entry = tk.Text(
    window,
    height=5,
    width=60
)
message_entry.pack(pady=10)

# Cipher selection
cipher_label = tk.Label(
    window,
    text="Choose a cipher:",
    font=("Arial", 12)
)
cipher_label.pack()

ciphers = [
    "Caesar Cipher",
    "Atbash Cipher",
    "Vigenere Cipher",
    "ROT13"
]

cipher_choice = tk.StringVar()
cipher_choice.set("Caesar Cipher")

cipher_menu = tk.OptionMenu(
    window,
    cipher_choice,
    *ciphers
)
cipher_menu.pack(pady=10)

# Result box
result_label = tk.Label(
    window,
    text="Encrypted message:",
    font=("Arial", 12)
)
result_label.pack()

result_box = tk.Text(
    window,
    height=5,
    width=60
)
result_box.pack(pady=10)

# Encrypt button
encrypt_button = tk.Button(
    window,
    text="🔐 Encrypt",
    command=encrypt,
    font=("Arial", 12, "bold")
)
encrypt_button.pack(pady=10)

# Start program
window.mainloop()
`;

  // Enhanced version based on user's functions, supporting decrypt, dynamic key input, and dark navy styling matching the app
  const enhancedCode = `import tkinter as tk
from tkinter import messagebox

# -----------------------------
# CORE CIPHER FUNCTIONS
# -----------------------------

def caesar_encrypt(text, shift):
    result = ""
    for char in text:
        if char.isalpha():
            start = ord('A') if char.isupper() else ord('a')
            new_char = chr((ord(char) - start + shift) % 26 + start)
            result += new_char
        else:
            result += char
    return result


def caesar_decrypt(text, shift):
    # Decrypting with shift k is encrypting with (26 - k)
    return caesar_encrypt(text, (26 - (shift % 26)) % 26)


def atbash(text):
    result = ""
    for char in text:
        if char.isupper():
            result += chr(90 - (ord(char) - 65))
        elif char.islower():
            result += chr(122 - (ord(char) - 97))
        else:
            result += char
    return result


def rot13(text):
    # ROT13 is symmetric: encrypt and decrypt are identical
    return caesar_encrypt(text, 13)


def railfence_encrypt(text, rails):
    if rails <= 1 or not text:
        return text
    fence = [[] for _ in range(rails)]
    rail = 0
    direction = 1
    for char in text:
        fence[rail].append(char)
        rail += direction
        if rail == 0 or rail == rails - 1:
            direction = -direction
    return "".join(["".join(r) for r in fence])


def railfence_decrypt(text, rails):
    if rails <= 1 or not text:
        return text
    pattern = [[] for _ in range(rails)]
    rail = 0
    direction = 1
    for i in range(len(text)):
        pattern[rail].append(i)
        rail += direction
        if rail == 0 or rail == rails - 1:
            direction = -direction
    pos = [i for r in pattern for i in r]
    result = [""] * len(text)
    for i, char in enumerate(text):
        result[pos[i]] = char
    return "".join(result)


def affine_encrypt(text, a=5, b=8):
    result = ""
    for char in text:
        if char.isalpha():
            start = ord('A') if char.isupper() else ord('a')
            new_char = chr(((ord(char) - start) * a + b) % 26 + start)
            result += new_char
        else:
            result += char
    return result


def affine_decrypt(text, a=5, b=8):
    inv_map = {1: 1, 3: 9, 5: 21, 7: 15, 9: 3, 11: 19, 15: 7, 17: 23, 19: 11, 21: 5, 23: 17, 25: 25}
    a_inv = inv_map.get(a, 21)
    result = ""
    for char in text:
        if char.isalpha():
            start = ord('A') if char.isupper() else ord('a')
            new_char = chr((a_inv * (ord(char) - start - b + 26)) % 26 + start)
            result += new_char
        else:
            result += char
    return result


def vigenere_encrypt(text, key):
    result = ""
    key = "".join([c.upper() for c in key if c.isalpha()]) or "KEY"
    key_index = 0

    for char in text:
        if char.isalpha():
            shift = ord(key[key_index % len(key)]) - ord('A')
            start = ord('A') if char.isupper() else ord('a')
            new_char = chr((ord(char) - start + shift) % 26 + start)
            result += new_char
            key_index += 1
        else:
            result += char
    return result


def vigenere_decrypt(text, key):
    result = ""
    key = "".join([c.upper() for c in key if c.isalpha()]) or "KEY"
    key_index = 0

    for char in text:
        if char.isalpha():
            shift = ord(key[key_index % len(key)]) - ord('A')
            start = ord('A') if char.isupper() else ord('a')
            # Subtract shift modulo 26
            new_char = chr((ord(char) - start - shift + 26) % 26 + start)
            result += new_char
            key_index += 1
        else:
            result += char
    return result


# -----------------------------
# EVENT HANDLERS
# -----------------------------

def on_cipher_changed(*args):
    cipher = cipher_choice.get()
    if cipher == "Caesar Cipher":
        key_label.config(text="Shift (0-25):")
        key_entry.config(state="normal")
        if not key_var.get().isdigit():
            key_var.set("3")
    elif cipher == "Atbash Cipher":
        key_label.config(text="Key (Not Required):")
        key_var.set("A↔Z Symmetric")
        key_entry.config(state="disabled")
    elif cipher == "ROT13":
        key_label.config(text="Key (Fixed):")
        key_var.set("Shift: 13")
        key_entry.config(state="disabled")
    elif cipher == "Vigenere Cipher":
        key_label.config(text="Keyword (A-Z):")
        key_entry.config(state="normal")
        if not key_var.get().isalpha() or key_var.get().isdigit():
            key_var.set("KEY")
    elif cipher == "Rail Fence Cipher":
        key_label.config(text="Rails (2-8):")
        key_entry.config(state="normal")
        key_var.set("3")
    elif cipher == "Affine Cipher":
        key_label.config(text="a, b (e.g. 5, 8):")
        key_entry.config(state="normal")
        key_var.set("5, 8")


def process_message(is_decrypt=False):
    text = message_entry.get("1.0", tk.END).strip()
    if not text:
        messagebox.showwarning("Empty Message", "Please enter a message first!")
        return

    cipher = cipher_choice.get()
    result = ""
    explanation = ""

    if cipher == "Caesar Cipher":
        try:
            shift = int(key_var.get())
        except ValueError:
            shift = 3
        if is_decrypt:
            result = caesar_decrypt(text, shift)
            explanation = f"Decrypted: Shifted each letter backward by {shift % 26} positions."
        else:
            result = caesar_encrypt(text, shift)
            explanation = f"Encrypted: Shifted each letter forward by {shift % 26} positions."

    elif cipher == "Atbash Cipher":
        result = atbash(text)
        explanation = "Reversed alphabet: A↔Z, B↔Y. Encrypting and decrypting are identical."

    elif cipher == "ROT13":
        result = rot13(text)
        explanation = "Shifted 13 places forward. Running twice restores original text."

    elif cipher == "Vigenere Cipher":
        key = key_var.get().strip() or "KEY"
        if is_decrypt:
            result = vigenere_decrypt(text, key)
            explanation = f"Decrypted using keyword '{key.upper()}'."
        else:
            result = vigenere_encrypt(text, key)
            explanation = f"Encrypted using repeating keyword '{key.upper()}'."

    elif cipher == "Rail Fence Cipher":
        try:
            rails = int(key_var.get())
        except ValueError:
            rails = 3
        if is_decrypt:
            result = railfence_decrypt(text, rails)
            explanation = f"Decoded diagonal wave transposition with {rails} rails."
        else:
            result = railfence_encrypt(text, rails)
            explanation = f"Encoded along {rails} fence rails in zig-zag order."

    elif cipher == "Affine Cipher":
        parts = key_var.get().replace(",", " ").split()
        try:
            a = int(parts[0]) if len(parts) > 0 else 5
            b = int(parts[1]) if len(parts) > 1 else 8
        except ValueError:
            a, b = 5, 8
        if is_decrypt:
            result = affine_decrypt(text, a, b)
            explanation = f"Decrypted Affine cipher with a={a}, b={b}."
        else:
            result = affine_encrypt(text, a, b)
            explanation = f"Encrypted Affine cipher: C = ({a}*P + {b}) mod 26."

    result_box.delete("1.0", tk.END)
    result_box.insert(tk.END, result)
    how_it_works_label.config(text=explanation)


def clear_all():
    message_entry.delete("1.0", tk.END)
    result_box.delete("1.0", tk.END)
    how_it_works_label.config(text="Enter your message and select Encrypt or Decrypt.")


# -----------------------------
# MODERN GUI (MATCHING WEB APP)
# -----------------------------

window = tk.Tk()
window.title("🔐 Cipher Explorer")
window.geometry("720x680")
window.configure(bg="#0B132B")

# Title Header
header_frame = tk.Frame(window, bg="#0B132B", pady=15)
header_frame.pack(fill="x", padx=25)

title = tk.Label(header_frame, text="🔐 Cipher Explorer", font=("Helvetica", 20, "bold"),
                 fg="#FFFFFF", bg="#0B132B")
title.pack(anchor="w")

subtitle = tk.Label(header_frame, text="Learn how classical ciphers transform messages.",
                    font=("Helvetica", 10), fg="#94A3B8", bg="#0B132B")
subtitle.pack(anchor="w")

# Message Input Frame
input_frame = tk.Frame(window, bg="#1C2541", padx=15, pady=12)
input_frame.pack(fill="x", padx=25, pady=6)

tk.Label(input_frame, text="Enter your message:", font=("Helvetica", 10, "bold"),
         fg="#48CAE4", bg="#1C2541").pack(anchor="w")

message_entry = tk.Text(input_frame, height=4, font=("Consolas", 11),
                        bg="#0B132B", fg="#FFFFFF", insertbackground="white", bd=1, relief="solid")
message_entry.pack(fill="x", pady=6)
message_entry.insert("1.0", "HELLO WORLD")

# Cipher & Key Controls Frame
controls_frame = tk.Frame(window, bg="#1C2541", padx=15, pady=12)
controls_frame.pack(fill="x", padx=25, pady=6)

tk.Label(controls_frame, text="Cipher:", font=("Helvetica", 10, "bold"),
         fg="#E2E8F0", bg="#1C2541").grid(row=0, column=0, sticky="w", pady=4)

ciphers = ["Caesar Cipher", "Atbash Cipher", "ROT13", "Vigenere Cipher", "Rail Fence Cipher", "Affine Cipher"]
cipher_choice = tk.StringVar(value="Caesar Cipher")
cipher_choice.trace_add("write", on_cipher_changed)

cipher_menu = tk.OptionMenu(controls_frame, cipher_choice, *ciphers)
cipher_menu.config(bg="#0B132B", fg="#FFFFFF", font=("Helvetica", 9), activebackground="#1E293B", activeforeground="#FFFFFF")
cipher_menu.grid(row=0, column=1, sticky="w", padx=10, pady=4)

key_label = tk.Label(controls_frame, text="Shift (0-25):", font=("Helvetica", 10, "bold"),
                     fg="#E2E8F0", bg="#1C2541")
key_label.grid(row=0, column=2, sticky="w", padx=(20, 0), pady=4)

key_var = tk.StringVar(value="3")
key_entry = tk.Entry(controls_frame, textvariable=key_var, font=("Consolas", 11),
                     bg="#0B132B", fg="#48CAE4", insertbackground="white", width=12, bd=1, relief="solid")
key_entry.grid(row=0, column=3, sticky="w", padx=10, pady=4)

# Action Buttons Frame
action_frame = tk.Frame(window, bg="#0B132B", pady=6)
action_frame.pack(fill="x", padx=25)

encrypt_btn = tk.Button(action_frame, text="🔐 Encrypt", bg="#0284C7", fg="#FFFFFF",
                        font=("Helvetica", 10, "bold"), padx=14, pady=6, relief="flat",
                        command=lambda: process_message(is_decrypt=False))
encrypt_btn.pack(side="left", padx=4)

decrypt_btn = tk.Button(action_frame, text="🔓 Decrypt", bg="#4F46E5", fg="#FFFFFF",
                        font=("Helvetica", 10, "bold"), padx=14, pady=6, relief="flat",
                        command=lambda: process_message(is_decrypt=True))
decrypt_btn.pack(side="left", padx=4)

clear_btn = tk.Button(action_frame, text="Clear", bg="#1E293B", fg="#94A3B8",
                      font=("Helvetica", 9), padx=10, pady=6, relief="flat",
                      command=clear_all)
clear_btn.pack(side="right", padx=4)

# Result Output Frame
result_frame = tk.Frame(window, bg="#1C2541", padx=15, pady=12)
result_frame.pack(fill="x", padx=25, pady=6)

tk.Label(result_frame, text="Result:", font=("Helvetica", 10, "bold"),
         fg="#48CAE4", bg="#1C2541").pack(anchor="w")

result_box = tk.Text(result_frame, height=3, font=("Consolas", 12, "bold"),
                     bg="#0B132B", fg="#38BDF8", bd=1, relief="solid")
result_box.pack(fill="x", pady=6)
result_box.insert("1.0", "KHOOR ZRUOG")

# How It Works Card
how_frame = tk.Frame(window, bg="#1C2541", padx=15, pady=10)
how_frame.pack(fill="x", padx=25, pady=6)

tk.Label(how_frame, text="How it works:", font=("Helvetica", 9, "bold"),
         fg="#94A3B8", bg="#1C2541").pack(anchor="w")

how_it_works_label = tk.Label(how_frame,
                              text="Each letter is shifted 3 positions forward in the alphabet.",
                              font=("Helvetica", 9), fg="#E2E8F0", bg="#1C2541", justify="left")
how_it_works_label.pack(anchor="w", pady=2)

# Start Application
window.mainloop()
`;

  const currentCode = activeCodeTab === 'standard' ? userOriginalCode : enhancedCode;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="border-b border-slate-800 pb-6">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-2">
          <span>Desktop Implementation Blueprint</span>
          <span aria-hidden="true">·</span>
          <span>Python / Tkinter Source Code</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Python / Tkinter Source Code
        </h2>
        <p className="mt-2 text-base text-slate-400 max-w-3xl">
          Run Cipher Explorer as a native Python desktop app using Python’s standard{' '}
          <code className="text-cyan-300 font-mono">tkinter</code> library. Select between your clean
          classic Tkinter script and an enhanced version with decryption and matching dark navy theme.
        </p>
      </div>

      {/* Code Selector Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 p-1 rounded-xl bg-slate-900 border border-slate-800">
          <button
            onClick={() => setActiveCodeTab('standard')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeCodeTab === 'standard'
                ? 'bg-cyan-500 text-slate-950 shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>Classic Tkinter Script</span>
          </button>

          <button
            onClick={() => setActiveCodeTab('enhanced')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeCodeTab === 'enhanced'
                ? 'bg-cyan-500 text-slate-950 shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Full App Tkinter Script (With Decrypt & UI Theme)</span>
          </button>
        </div>

        <button
          onClick={copyToClipboard}
          className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/80 px-4 py-2 text-xs font-medium text-slate-200 hover:bg-slate-700 hover:text-white transition-all active:scale-95 shadow-sm"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-semibold">Copied Python Code!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-cyan-400" />
              <span>Copy {activeCodeTab === 'standard' ? 'Classic' : 'Enhanced'} Script</span>
            </>
          )}
        </button>
      </div>

      {/* Feature Highlights for Selected Tab */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {activeCodeTab === 'standard' ? (
          <>
            <div className="rounded-xl border border-slate-800 bg-[#1C2541]/70 p-4">
              <div className="flex items-center gap-2 text-cyan-300 font-semibold text-sm mb-1.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>Exact Core Logic</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Contains your clean <code className="text-cyan-300 font-mono">caesar_encrypt</code>,{' '}
                <code className="text-cyan-300 font-mono">atbash</code>,{' '}
                <code className="text-cyan-300 font-mono">rot13</code>, and{' '}
                <code className="text-cyan-300 font-mono">vigenere_encrypt</code> functions.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-[#1C2541]/70 p-4">
              <div className="flex items-center gap-2 text-indigo-300 font-semibold text-sm mb-1.5">
                <Terminal className="w-4 h-4 text-indigo-400" />
                <span>Zero Dependencies</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Uses standard Python 3 and built-in <code className="text-indigo-300 font-mono">tkinter</code>.
                Save as <code className="text-white font-mono">ciphers.py</code> and run with{' '}
                <code className="text-indigo-300 font-mono">python ciphers.py</code>.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-[#1C2541]/70 p-4">
              <div className="flex items-center gap-2 text-emerald-300 font-semibold text-sm mb-1.5">
                <FileCode className="w-4 h-4 text-emerald-400" />
                <span>Native Tkinter Widgets</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Uses <code className="text-emerald-300 font-mono">tk.OptionMenu</code>,{' '}
                <code className="text-emerald-300 font-mono">tk.Text</code>, and{' '}
                <code className="text-emerald-300 font-mono">tk.Button</code> for straightforward, readable code.
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="rounded-xl border border-slate-800 bg-[#1C2541]/70 p-4">
              <div className="flex items-center gap-2 text-cyan-300 font-semibold text-sm mb-1.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>Both Encrypt & Decrypt</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Extends your algorithms with <code className="text-cyan-300 font-mono">caesar_decrypt</code> and{' '}
                <code className="text-cyan-300 font-mono">vigenere_decrypt</code> with modular arithmetic inversion.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-[#1C2541]/70 p-4">
              <div className="flex items-center gap-2 text-indigo-300 font-semibold text-sm mb-1.5">
                <Terminal className="w-4 h-4 text-indigo-400" />
                <span>Dynamic Key Entry</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Adds a dynamic key field that adapts automatically: numeric shift for Caesar, keyword for Vigenère,
                and disabled for symmetric Atbash/ROT13.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-[#1C2541]/70 p-4">
              <div className="flex items-center gap-2 text-emerald-300 font-semibold text-sm mb-1.5">
                <FileCode className="w-4 h-4 text-emerald-400" />
                <span>Dark Navy Theme</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Configured with deep navy (<code className="text-emerald-300 font-mono">#0B132B</code> /{' '}
                <code className="text-emerald-300 font-mono">#1C2541</code>) and cyan accents to match this web app.
              </p>
            </div>
          </>
        )}
      </div>

      {/* Code Container */}
      <div className="rounded-2xl border border-slate-800 bg-[#0B132B] shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3 border-b border-slate-800 bg-[#1C2541]/40">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            <span className="ml-2 font-semibold text-white">
              {activeCodeTab === 'standard' ? 'cipher_explorer_classic.py' : 'cipher_explorer_full.py'}
            </span>
          </div>

          <span className="text-xs font-mono text-cyan-400">
            {activeCodeTab === 'standard' ? 'Your Tkinter Script' : 'App-Styled Tkinter Script'}
          </span>
        </div>

        <div className="p-4 overflow-x-auto max-h-[580px] scrollbar-thin scrollbar-thumb-slate-700 font-mono text-xs leading-relaxed text-slate-200">
          <pre>{currentCode}</pre>
        </div>
      </div>
    </div>
  );
};
