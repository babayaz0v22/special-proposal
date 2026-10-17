"use client";

import React, { useState } from "react";
import Image from "next/image";

interface CatVisualProps {
  type: "intro" | "trust" | "intrigue" | "status" | "success" | "sad" | "celebrate" | "closed";
  alt?: string;
}

const CAT_ASSETS: Record<CatVisualProps["type"], { localUrl: string; fallbackEmoji: string; title: string }> = {
  intro: {
    localUrl: "/cats/intro.gif",
    fallbackEmoji: "🐱🌸",
    title: "Cute Welcome Kitty",
  },
  trust: {
    localUrl: "/cats/trust.gif",
    fallbackEmoji: "🥺🐱",
    title: "Pleading Trust Kitty",
  },
  intrigue: {
    localUrl: "/cats/intrigue.gif",
    fallbackEmoji: "👋🐱☕",
    title: "Curious Friendly Cat",
  },
  status: {
    localUrl: "/cats/status.gif",
    fallbackEmoji: "👀🐱",
    title: "Investigating Kitten",
  },
  success: {
    localUrl: "/cats/success.gif",
    fallbackEmoji: "🥰🐱💖",
    title: "Blushing Happy Kitten",
  },
  sad: {
    localUrl: "/cats/sad.gif",
    fallbackEmoji: "🥺🐱🤍",
    title: "Sad Respectful Cat",
  },
  celebrate: {
    localUrl: "/cats/celebrate.gif",
    fallbackEmoji: "🎉😻✨",
    title: "Celebrating Cat",
  },
  closed: {
    localUrl: "/cats/closed.gif",
    fallbackEmoji: "💌💤🐱",
    title: "Sleeping Kitty",
  },
};

export const CatVisual: React.FC<CatVisualProps> = ({ type, alt }) => {
  const [hasError, setHasError] = useState(false);
  const asset = CAT_ASSETS[type] || CAT_ASSETS.intro;

  return (
    <div className="relative mx-auto my-3 flex items-center justify-center w-40 h-40 sm:w-48 sm:h-48">
      {/* Soft ambient glowing aura */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-rose-500/20 via-pink-500/25 to-purple-500/20 blur-xl animate-pulse" />

      <div className="relative z-10 w-full h-full flex items-center justify-center">
        {!hasError ? (
          <Image
            src={asset.localUrl}
            alt={alt || asset.title}
            width={190}
            height={190}
            unoptimized
            priority
            onError={() => setHasError(true)}
            className="w-full h-full object-contain drop-shadow-[0_10px_20px_rgba(255,42,133,0.3)] select-none pointer-events-none"
          />
        ) : (
          <div className="w-28 h-28 rounded-full bg-white/5 border border-pink-500/30 flex items-center justify-center text-4xl shadow-inner">
            {asset.fallbackEmoji}
          </div>
        )}
      </div>
    </div>
  );
};
