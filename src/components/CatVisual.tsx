"use client";

import React from "react";
import { motion } from "framer-motion";

interface CatVisualProps {
  type: "intro" | "trust" | "intrigue" | "status" | "success" | "sad" | "celebrate" | "closed";
  alt?: string;
}

export const CatVisual: React.FC<CatVisualProps> = ({ type }) => {
  return (
    <div className="relative mx-auto my-4 flex items-center justify-center w-40 h-40 sm:w-48 sm:h-48 select-none pointer-events-none">
      {/* Ambient glowing aura */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-rose-500/25 via-pink-500/25 to-purple-500/20 blur-2xl animate-pulse" />

      {/* Render character according to step type */}
      {type === "intro" && <IntroCat />}
      {type === "trust" && <TrustCat />}
      {type === "intrigue" && <IntrigueCat />}
      {type === "status" && <StatusCat />}
      {type === "success" && <SuccessCat />}
      {type === "sad" && <SadCat />}
      {type === "celebrate" && <CelebrateCat />}
      {type === "closed" && <ClosedCat />}
    </div>
  );
};

// ==================== 1. INTRO CAT ====================
// Peeking cute kitten holding a glowing pink envelope with a beating heart
function IntroCat() {
  return (
    <motion.svg
      viewBox="0 0 200 200"
      className="w-full h-full drop-shadow-[0_12px_24px_rgba(255,42,133,0.35)]"
      initial={{ scale: 0.9, y: 10 }}
      animate={{ scale: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <defs>
        <radialGradient id="catBody" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#FFF9FB" />
          <stop offset="85%" stopColor="#F5D0DC" />
          <stop offset="100%" stopColor="#E8B4C8" />
        </radialGradient>
        <radialGradient id="earInner" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FF94B8" />
          <stop offset="100%" stopColor="#F43F5E" />
        </radialGradient>
        <linearGradient id="envelopeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF2A85" />
          <stop offset="100%" stopColor="#E11D48" />
        </linearGradient>
      </defs>

      {/* Ears with twitch animation */}
      <motion.g
        animate={{ rotate: [-2, 2, -2] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <path d="M 48 85 L 26 30 Q 56 42 74 65 Z" fill="url(#catBody)" stroke="#E8B4C8" strokeWidth="2" />
        <path d="M 44 76 L 33 40 Q 54 48 64 63 Z" fill="url(#earInner)" />
        <path d="M 152 85 L 174 30 Q 144 42 126 65 Z" fill="url(#catBody)" stroke="#E8B4C8" strokeWidth="2" />
        <path d="M 156 76 L 167 40 Q 146 48 136 63 Z" fill="url(#earInner)" />
      </motion.g>

      {/* Head */}
      <circle cx="100" cy="98" r="54" fill="url(#catBody)" stroke="#F0BCCE" strokeWidth="1.5" />

      {/* Blushing cheeks */}
      <circle cx="68" cy="110" r="11" fill="#FF4F81" opacity="0.45" />
      <circle cx="132" cy="110" r="11" fill="#FF4F81" opacity="0.45" />

      {/* Big shiny anime blinking eyes */}
      <motion.g
        animate={{ scaleY: [1, 1, 0.1, 1, 1] }}
        transition={{ duration: 3.5, repeat: Infinity, times: [0, 0.88, 0.92, 0.96, 1] }}
        style={{ originY: "92px" }}
      >
        {/* Left eye */}
        <circle cx="76" cy="92" r="9" fill="#1C1826" />
        <circle cx="73" cy="89" r="3.5" fill="#FFFFFF" />
        <circle cx="78" cy="94" r="1.5" fill="#FFFFFF" />
        {/* Right eye */}
        <circle cx="124" cy="92" r="9" fill="#1C1826" />
        <circle cx="121" cy="89" r="3.5" fill="#FFFFFF" />
        <circle cx="126" cy="94" r="1.5" fill="#FFFFFF" />
      </motion.g>

      {/* Cute nose and smile */}
      <path d="M 97 101 L 103 101 L 100 105 Z" fill="#E11D48" />
      <path d="M 94 107 Q 100 112 100 106 Q 100 112 106 107" fill="none" stroke="#6B3A4F" strokeWidth="2" strokeLinecap="round" />

      {/* Whiskers */}
      <path d="M 48 102 L 28 100 M 48 106 L 26 108" stroke="#D190A8" strokeWidth="2" strokeLinecap="round" />
      <path d="M 152 102 L 172 100 M 152 106 L 174 108" stroke="#D190A8" strokeWidth="2" strokeLinecap="round" />

      {/* Floating love letter with pulsing heart */}
      <motion.g
        animate={{ y: [-3, 3, -3] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <rect x="62" y="132" width="76" height="50" rx="8" fill="url(#envelopeGrad)" stroke="#FFA3C2" strokeWidth="1.5" />
        <path d="M 62 136 L 100 162 L 138 136" fill="none" stroke="#FFA3C2" strokeWidth="2" />
        {/* Beating Heart Seal */}
        <motion.path
          d="M 100 166 C 96 160 88 160 88 168 C 88 174 100 182 100 182 C 100 182 112 174 112 168 C 112 160 104 160 100 166 Z"
          fill="#FFFFFF"
          animate={{ scale: [1, 1.25, 1] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          style={{ originX: "100px", originY: "171px" }}
        />
      </motion.g>

      {/* Paws holding the letter */}
      <circle cx="70" cy="144" r="10" fill="url(#catBody)" stroke="#F0BCCE" strokeWidth="1.5" />
      <circle cx="130" cy="144" r="10" fill="url(#catBody)" stroke="#F0BCCE" strokeWidth="1.5" />

      {/* Sparkles */}
      <motion.text
        x="32"
        y="50"
        fontSize="16"
        animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        ✨
      </motion.text>
      <motion.text
        x="154"
        y="60"
        fontSize="16"
        animate={{ opacity: [1, 0.3, 1], scale: [1.2, 0.8, 1.2] }}
        transition={{ duration: 2.4, repeat: Infinity }}
      >
        🌸
      </motion.text>
    </motion.svg>
  );
}

// ==================== 2. TRUST CAT ====================
// Pleading kitten with big watery sparkly eyes and tear droplets
function TrustCat() {
  return (
    <motion.svg
      viewBox="0 0 200 200"
      className="w-full h-full drop-shadow-[0_12px_24px_rgba(255,42,133,0.35)]"
      animate={{ y: [-2, 2, -2] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    >
      <defs>
        <radialGradient id="trustCatBody" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#FFF9FB" />
          <stop offset="85%" stopColor="#F5D0DC" />
          <stop offset="100%" stopColor="#E8B4C8" />
        </radialGradient>
      </defs>

      {/* Droopy, pleading ears */}
      <path d="M 45 88 L 18 48 Q 50 48 70 70 Z" fill="url(#trustCatBody)" stroke="#E8B4C8" strokeWidth="2" />
      <path d="M 40 80 L 26 56 Q 48 56 60 68 Z" fill="#FF94B8" />
      <path d="M 155 88 L 182 48 Q 150 48 130 70 Z" fill="url(#trustCatBody)" stroke="#E8B4C8" strokeWidth="2" />
      <path d="M 160 80 L 174 56 Q 152 56 140 68 Z" fill="#FF94B8" />

      {/* Head */}
      <circle cx="100" cy="104" r="54" fill="url(#trustCatBody)" stroke="#F0BCCE" strokeWidth="1.5" />

      {/* Heavy Rosy Blush */}
      <circle cx="66" cy="120" r="13" fill="#FF2A85" opacity="0.4" />
      <circle cx="134" cy="120" r="13" fill="#FF2A85" opacity="0.4" />

      {/* Enormous Watery Pleading Anime Eyes */}
      {/* Left eye */}
      <circle cx="74" cy="98" r="15" fill="#1C1826" />
      <circle cx="70" cy="93" r="6" fill="#FFFFFF" />
      <circle cx="79" cy="103" r="3.5" fill="#FFFFFF" />
      <circle cx="76" cy="98" r="2" fill="#7DD3FC" />

      {/* Right eye */}
      <circle cx="126" cy="98" r="15" fill="#1C1826" />
      <circle cx="122" cy="93" r="6" fill="#FFFFFF" />
      <circle cx="131" cy="103" r="3.5" fill="#FFFFFF" />
      <circle cx="128" cy="98" r="2" fill="#7DD3FC" />

      {/* Glistening Tears Dropping */}
      <motion.path
        d="M 68 114 Q 64 126 68 132 Q 72 126 68 114 Z"
        fill="#38BDF8"
        animate={{ y: [0, 8, 14], opacity: [0, 1, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeIn" }}
      />
      <motion.path
        d="M 132 114 Q 128 126 132 132 Q 136 126 132 114 Z"
        fill="#38BDF8"
        animate={{ y: [0, 8, 14], opacity: [0, 1, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, delay: 0.6, ease: "easeIn" }}
      />

      {/* Pleading curved mouth */}
      <path d="M 98 112 L 102 112 L 100 115 Z" fill="#E11D48" />
      <path d="M 94 119 Q 100 115 106 119" fill="none" stroke="#6B3A4F" strokeWidth="2.5" strokeLinecap="round" />

      {/* Clutched paws together pleading */}
      <circle cx="92" cy="156" r="12" fill="url(#trustCatBody)" stroke="#F0BCCE" strokeWidth="1.5" />
      <circle cx="108" cy="156" r="12" fill="url(#trustCatBody)" stroke="#F0BCCE" strokeWidth="1.5" />
    </motion.svg>
  );
}

// ==================== 3. INTRIGUE CAT ====================
// Friendly waving kitten holding a hot cup of coffee with rising steam
function IntrigueCat() {
  return (
    <motion.svg
      viewBox="0 0 200 200"
      className="w-full h-full drop-shadow-[0_12px_24px_rgba(255,42,133,0.35)]"
    >
      <defs>
        <radialGradient id="intrigueBody" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#FFF9FB" />
          <stop offset="85%" stopColor="#F5D0DC" />
          <stop offset="100%" stopColor="#E8B4C8" />
        </radialGradient>
      </defs>

      {/* Ears */}
      <path d="M 50 82 L 32 30 Q 60 40 76 64 Z" fill="url(#intrigueBody)" stroke="#E8B4C8" strokeWidth="2" />
      <path d="M 46 74 L 38 42 Q 56 48 66 62 Z" fill="#FF94B8" />
      <path d="M 150 82 L 168 30 Q 140 40 124 64 Z" fill="url(#intrigueBody)" stroke="#E8B4C8" strokeWidth="2" />
      <path d="M 154 74 L 162 42 Q 144 48 134 62 Z" fill="#FF94B8" />

      {/* Head */}
      <circle cx="100" cy="98" r="52" fill="url(#intrigueBody)" stroke="#F0BCCE" strokeWidth="1.5" />

      {/* Blushing cheeks */}
      <circle cx="70" cy="112" r="10" fill="#FF2A85" opacity="0.35" />
      <circle cx="130" cy="112" r="10" fill="#FF2A85" opacity="0.35" />

      {/* Cute smiling eyes (happy closed arcs) */}
      <path d="M 68 96 Q 78 86 86 96" fill="none" stroke="#1C1826" strokeWidth="3" strokeLinecap="round" />
      <path d="M 114 96 Q 122 86 132 96" fill="none" stroke="#1C1826" strokeWidth="3" strokeLinecap="round" />

      {/* Smile */}
      <path d="M 98 104 L 102 104 L 100 107 Z" fill="#E11D48" />
      <path d="M 94 110 Q 100 116 100 110 Q 100 116 106 110" fill="none" stroke="#6B3A4F" strokeWidth="2" strokeLinecap="round" />

      {/* Waving left paw */}
      <motion.g
        animate={{ rotate: [-15, 20, -15] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        style={{ originX: "40px", originY: "140px" }}
      >
        <ellipse cx="44" cy="120" rx="11" ry="16" fill="url(#intrigueBody)" stroke="#F0BCCE" strokeWidth="1.5" />
        <text x="36" y="115" fontSize="12">🐾</text>
      </motion.g>

      {/* Coffee Cup in right paw */}
      <g>
        <rect x="115" y="130" width="34" height="28" rx="6" fill="#E11D48" />
        <path d="M 149 136 Q 158 142 149 150" fill="none" stroke="#E11D48" strokeWidth="3" strokeLinecap="round" />
        <ellipse cx="132" cy="130" rx="17" ry="5" fill="#78350F" />
        {/* Coffee heart latte art */}
        <path d="M 132 131 C 130 128 126 128 126 131 C 126 133 132 135 132 135 C 132 135 138 133 138 131 C 138 128 134 128 132 131 Z" fill="#FDE68A" />

        {/* Rising steam */}
        <motion.path
          d="M 128 122 Q 132 116 128 110"
          fill="none"
          stroke="#FDA4AF"
          strokeWidth="2"
          strokeLinecap="round"
          animate={{ y: [-4, -14], opacity: [0.8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
        />
        <motion.path
          d="M 136 120 Q 132 114 136 108"
          fill="none"
          stroke="#FDA4AF"
          strokeWidth="2"
          strokeLinecap="round"
          animate={{ y: [-4, -14], opacity: [0.8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, delay: 0.6, ease: "easeOut" }}
        />
        <circle cx="118" cy="144" r="10" fill="url(#intrigueBody)" stroke="#F0BCCE" strokeWidth="1.5" />
      </g>
    </motion.svg>
  );
}

// ==================== 4. STATUS CAT ====================
// Detective / inquisitive kitten tilting head with cute monocle
function StatusCat() {
  return (
    <motion.svg
      viewBox="0 0 200 200"
      className="w-full h-full drop-shadow-[0_12px_24px_rgba(255,42,133,0.35)]"
      animate={{ rotate: [-4, 5, -4] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      style={{ originX: "100px", originY: "110px" }}
    >
      <defs>
        <radialGradient id="statusBody" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#FFF9FB" />
          <stop offset="85%" stopColor="#F5D0DC" />
          <stop offset="100%" stopColor="#E8B4C8" />
        </radialGradient>
      </defs>

      {/* Ears */}
      <path d="M 48 84 L 28 32 Q 56 42 74 66 Z" fill="url(#statusBody)" stroke="#E8B4C8" strokeWidth="2" />
      <path d="M 44 76 L 34 42 Q 54 48 64 64 Z" fill="#FF94B8" />
      <path d="M 152 84 L 172 32 Q 144 42 126 66 Z" fill="url(#statusBody)" stroke="#E8B4C8" strokeWidth="2" />
      <path d="M 156 76 L 166 42 Q 146 48 136 64 Z" fill="#FF94B8" />

      {/* Head */}
      <circle cx="100" cy="100" r="54" fill="url(#statusBody)" stroke="#F0BCCE" strokeWidth="1.5" />

      {/* Rosy cheeks */}
      <circle cx="68" cy="114" r="10" fill="#FF2A85" opacity="0.35" />
      <circle cx="132" cy="114" r="10" fill="#FF2A85" opacity="0.35" />

      {/* Eyes: One inquisitive open eye, one monocle eye */}
      <circle cx="74" cy="94" r="10" fill="#1C1826" />
      <circle cx="71" cy="91" r="4" fill="#FFFFFF" />

      {/* Monocle on Right Eye */}
      <circle cx="126" cy="94" r="14" fill="rgba(255,255,255,0.2)" stroke="#F59E0B" strokeWidth="2.5" />
      <path d="M 140 94 L 152 118" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
      <circle cx="126" cy="94" r="8" fill="#1C1826" />
      <circle cx="124" cy="92" r="3" fill="#FFFFFF" />

      {/* Curious 'O' mouth */}
      <path d="M 98 104 L 102 104 L 100 107 Z" fill="#E11D48" />
      <ellipse cx="100" cy="114" rx="4" ry="5" fill="#E11D48" />

      {/* Question mark floating */}
      <motion.text
        x="154"
        y="60"
        fontSize="24"
        fontWeight="bold"
        fill="#FF2A85"
        animate={{ y: [-3, 3, -3], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        ?
      </motion.text>
    </motion.svg>
  );
}

// ==================== 5. SUCCESS CAT ====================
// Blushing happy kitten with heart-shaped eyes and floating hearts
function SuccessCat() {
  return (
    <motion.svg
      viewBox="0 0 200 200"
      className="w-full h-full drop-shadow-[0_12px_24px_rgba(255,42,133,0.4)]"
      animate={{ scale: [0.97, 1.03, 0.97] }}
      transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
    >
      <defs>
        <radialGradient id="successBody" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#FFF9FB" />
          <stop offset="85%" stopColor="#F5D0DC" />
          <stop offset="100%" stopColor="#E8B4C8" />
        </radialGradient>
      </defs>

      {/* Ears */}
      <path d="M 48 84 L 26 30 Q 56 42 74 65 Z" fill="url(#successBody)" stroke="#E8B4C8" strokeWidth="2" />
      <path d="M 44 76 L 33 40 Q 54 48 64 63 Z" fill="#FF94B8" />
      <path d="M 152 84 L 174 30 Q 144 42 126 65 Z" fill="url(#successBody)" stroke="#E8B4C8" strokeWidth="2" />
      <path d="M 156 76 L 167 40 Q 146 48 136 63 Z" fill="#FF94B8" />

      {/* Head */}
      <circle cx="100" cy="98" r="54" fill="url(#successBody)" stroke="#F0BCCE" strokeWidth="1.5" />

      {/* Bright Blush */}
      <circle cx="66" cy="114" r="13" fill="#FF2A85" opacity="0.5" />
      <circle cx="134" cy="114" r="13" fill="#FF2A85" opacity="0.5" />

      {/* Heart Eyes ♥ ♥ */}
      <motion.g
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 1.2, repeat: Infinity }}
        style={{ originX: "100px", originY: "92px" }}
      >
        <path
          d="M 74 96 C 68 86 58 86 58 96 C 58 104 74 112 74 112 C 74 112 90 104 90 96 C 90 86 80 86 74 96 Z"
          fill="#FF2A85"
        />
        <path
          d="M 126 96 C 120 86 110 86 110 96 C 110 104 126 112 126 112 C 126 112 142 104 142 96 C 142 86 132 86 126 96 Z"
          fill="#FF2A85"
        />
      </motion.g>

      {/* Cute Open Happy Mouth */}
      <path d="M 94 114 Q 100 126 106 114 Z" fill="#E11D48" />

      {/* Floating Hearts Orbiting */}
      <motion.text
        x="24"
        y="50"
        fontSize="20"
        animate={{ y: [-5, -20, -5], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      >
        💖
      </motion.text>
      <motion.text
        x="154"
        y="55"
        fontSize="20"
        animate={{ y: [-5, -20, -5], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2.5, repeat: Infinity, delay: 0.8, ease: "easeInOut" }}
      >
        💕
      </motion.text>
    </motion.svg>
  );
}

// ==================== 6. SAD / POLITE CAT ====================
// Respectful, peaceful cat holding a sweet flower
function SadCat() {
  return (
    <motion.svg
      viewBox="0 0 200 200"
      className="w-full h-full drop-shadow-[0_12px_24px_rgba(255,255,255,0.15)]"
    >
      <defs>
        <radialGradient id="sadBody" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#F8FAFC" />
          <stop offset="85%" stopColor="#E2E8F0" />
          <stop offset="100%" stopColor="#CBD5E1" />
        </radialGradient>
      </defs>

      {/* Droopy gentle ears */}
      <path d="M 46 86 L 22 46 Q 52 48 70 70 Z" fill="url(#sadBody)" stroke="#CBD5E1" strokeWidth="2" />
      <path d="M 42 78 L 28 54 Q 50 56 60 68 Z" fill="#E2E8F0" />
      <path d="M 154 86 L 178 46 Q 148 48 130 70 Z" fill="url(#sadBody)" stroke="#CBD5E1" strokeWidth="2" />
      <path d="M 158 78 L 172 54 Q 150 56 140 68 Z" fill="#E2E8F0" />

      {/* Head */}
      <circle cx="100" cy="100" r="52" fill="url(#sadBody)" stroke="#94A3B8" strokeWidth="1.5" />

      {/* Soft Eyes */}
      <circle cx="74" cy="96" r="8" fill="#334155" />
      <circle cx="72" cy="94" r="3" fill="#FFFFFF" />
      <circle cx="126" cy="96" r="8" fill="#334155" />
      <circle cx="124" cy="94" r="3" fill="#FFFFFF" />

      {/* Gentle smile */}
      <path d="M 95 110 Q 100 114 105 110" fill="none" stroke="#475569" strokeWidth="2" strokeLinecap="round" />

      {/* Holding a single white flower with gentle glow */}
      <g>
        <path d="M 100 148 L 100 128" stroke="#10B981" strokeWidth="3" strokeLinecap="round" />
        <circle cx="100" cy="126" r="5" fill="#FBBF24" />
        <circle cx="94" cy="126" r="5" fill="#FFFFFF" />
        <circle cx="106" cy="126" r="5" fill="#FFFFFF" />
        <circle cx="100" cy="120" r="5" fill="#FFFFFF" />
        <circle cx="100" cy="132" r="5" fill="#FFFFFF" />
      </g>
    </motion.svg>
  );
}

// ==================== 7. CELEBRATE CAT ====================
// Dancing joyful party kitten bouncing happily with party hat
function CelebrateCat() {
  return (
    <motion.svg
      viewBox="0 0 200 200"
      className="w-full h-full drop-shadow-[0_12px_24px_rgba(255,42,133,0.5)]"
      animate={{ y: [-6, 6, -6], rotate: [-3, 3, -3] }}
      transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
    >
      <defs>
        <radialGradient id="celBody" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#FFF9FB" />
          <stop offset="85%" stopColor="#F5D0DC" />
          <stop offset="100%" stopColor="#E8B4C8" />
        </radialGradient>
        <linearGradient id="partyHat" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#EC4899" />
        </linearGradient>
      </defs>

      {/* Ears */}
      <path d="M 48 84 L 26 30 Q 56 42 74 65 Z" fill="url(#celBody)" stroke="#E8B4C8" strokeWidth="2" />
      <path d="M 44 76 L 33 40 Q 54 48 64 63 Z" fill="#FF94B8" />
      <path d="M 152 84 L 174 30 Q 144 42 126 65 Z" fill="url(#celBody)" stroke="#E8B4C8" strokeWidth="2" />
      <path d="M 156 76 L 167 40 Q 146 48 136 63 Z" fill="#FF94B8" />

      {/* Festive Party Hat */}
      <polygon points="100,20 80,68 120,68" fill="url(#partyHat)" stroke="#FDE68A" strokeWidth="1.5" />
      <circle cx="100" cy="18" r="6" fill="#FDE68A" />

      {/* Head */}
      <circle cx="100" cy="104" r="52" fill="url(#celBody)" stroke="#F0BCCE" strokeWidth="1.5" />

      {/* Joyful Eyes (happy inverted arcs) */}
      <path d="M 68 102 Q 78 92 88 102" fill="none" stroke="#1C1826" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M 112 102 Q 122 92 132 102" fill="none" stroke="#1C1826" strokeWidth="3.5" strokeLinecap="round" />

      {/* Rosy Blush */}
      <circle cx="66" cy="116" r="12" fill="#FF2A85" opacity="0.55" />
      <circle cx="134" cy="116" r="12" fill="#FF2A85" opacity="0.55" />

      {/* Joyful open singing mouth */}
      <path d="M 94 116 Q 100 130 106 116 Z" fill="#E11D48" />

      {/* Paws raised in celebration \o/ */}
      <motion.g
        animate={{ y: [-4, 4, -4] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <ellipse cx="40" cy="80" rx="12" ry="16" fill="url(#celBody)" stroke="#F0BCCE" strokeWidth="1.5" />
        <ellipse cx="160" cy="80" rx="12" ry="16" fill="url(#celBody)" stroke="#F0BCCE" strokeWidth="1.5" />
      </motion.g>

      {/* Confetti & Sparkles */}
      <text x="18" y="60" fontSize="18">🎉</text>
      <text x="162" y="55" fontSize="18">✨</text>
    </motion.svg>
  );
}

// ==================== 8. CLOSED CAT ====================
// Cozy sleeping curled-up kitten on a cushion
function ClosedCat() {
  return (
    <motion.svg
      viewBox="0 0 200 200"
      className="w-full h-full drop-shadow-[0_12px_24px_rgba(255,255,255,0.15)]"
    >
      <defs>
        <radialGradient id="closedBody" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#FFF9FB" />
          <stop offset="85%" stopColor="#F5D0DC" />
          <stop offset="100%" stopColor="#E8B4C8" />
        </radialGradient>
      </defs>

      {/* Cozy Pillow */}
      <rect x="30" y="125" width="140" height="40" rx="20" fill="#241B35" stroke="#FF2A85" strokeWidth="1.5" opacity="0.6" />

      {/* Curled cat body */}
      <ellipse cx="100" cy="115" rx="55" ry="38" fill="url(#closedBody)" />

      {/* Ears tucked */}
      <path d="M 60 90 L 46 68 Q 66 74 74 88 Z" fill="url(#closedBody)" />
      <path d="M 140 90 L 154 68 Q 134 74 126 88 Z" fill="url(#closedBody)" />

      {/* Sleeping peaceful closed eyes */}
      <path d="M 76 112 Q 84 118 92 112" fill="none" stroke="#64748B" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 108 112 Q 116 118 124 112" fill="none" stroke="#64748B" strokeWidth="2.5" strokeLinecap="round" />

      {/* Floating Zzz */}
      <motion.text
        x="135"
        y="65"
        fontSize="16"
        fill="#FDA4AF"
        fontWeight="bold"
        animate={{ y: [0, -10], opacity: [0, 1, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
      >
        Zzz...
      </motion.text>
    </motion.svg>
  );
}
