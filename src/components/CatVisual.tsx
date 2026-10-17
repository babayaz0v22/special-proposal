"use client";

import React, { useState } from "react";
import Image from "next/image";

interface CatVisualProps {
  type: "intro" | "trust" | "intrigue" | "status" | "success" | "sad" | "celebrate" | "closed";
  alt?: string;
}

const CAT_ASSETS: Record<CatVisualProps["type"], { url: string; fallbackEmoji: string; title: string }> = {
  intro: {
    // Cute cat with flower / welcoming kitten
    url: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2F3OXFvNHNucm5uZXJqNGVudW9yMW41N2U3a3RhYmx1Nmgzd2J3MCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/C9x8gX02SnMIoAClXA/giphy.gif",
    fallbackEmoji: "🐱🌸",
    title: "Cute Welcome Kitty",
  },
  trust: {
    // Pleading, anxious cute kitten with teary eyes
    url: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcG9ldWc1dWd2NWpkbW1lNzcxOHdrNnM3bnZlZmd0b3cxaXZ4MmtvaiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/mlvseq9yvZhba/giphy.gif",
    fallbackEmoji: "🥺🐱",
    title: "Pleading Trust Kitty",
  },
  intrigue: {
    // Waving curious cat / listening cat
    url: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcTYwM3ZtdjlnMW1pMGpsY2N2Zzl3MmNpdzRjZHRtOWZhc3pkaDN5dSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/BzyTuYCmvSORqs1ABM/giphy.gif",
    fallbackEmoji: "👋🐱☕",
    title: "Curious Friendly Cat",
  },
  status: {
    // Inquisitive / looking closely cat
    url: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaG13ZjVtbWZmbmV4NXR2Yzlrbnpxazc2c2xudjI4cGc1bDF5dWZjeSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/MDJ9IbxxvDUQM/giphy.gif",
    fallbackEmoji: "👀🐱",
    title: "Investigating Kitten",
  },
  success: {
    // Blushing happy kitten with hearts
    url: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHIyb2k4cDJscmpzaXNvZ2JscGhpbzExaGZvdnluOWlqMnl6c2g1eCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/uw0KpagtwEJtC/giphy.gif",
    fallbackEmoji: "🥰🐱💖",
    title: "Blushing Happy Kitten",
  },
  sad: {
    // Polite sad crying cat waving
    url: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbmNka3Iyd3N6dGptMmZ0aGcxNmpsZmgzaWtkZGN2eXFqYnlsOHBhYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/ISOckXUybVfQ4/giphy.gif",
    fallbackEmoji: "🥺🐱🤍",
    title: "Sad Respectful Cat",
  },
  celebrate: {
    // Dancing joyful happy celebration cat
    url: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExd2R4bHRmdjA4NWwxbXZibzU1NW9ubnIxejh2cG96bTVhODV5ZGFwZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/jpbnoe3UIa8TU8LM13/giphy.gif",
    fallbackEmoji: "🎉😻✨",
    title: "Celebrating Cat",
  },
  closed: {
    // Sleeping gentle cat
    url: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExazBwbG1nbXk0dnpkc3Q2dzR0bmZja256NGpsN3RucnV5ZDJjcDJwayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/LmN8OYiY4m0X85K0Zz/giphy.gif",
    fallbackEmoji: "💌💤🐱",
    title: "Sleeping Kitty",
  },
};

export const CatVisual: React.FC<CatVisualProps> = ({ type, alt }) => {
  const [hasError, setHasError] = useState(false);
  const asset = CAT_ASSETS[type] || CAT_ASSETS.intro;

  return (
    <div className="relative mx-auto my-3 flex items-center justify-center w-36 h-36 sm:w-44 sm:h-44">
      {/* Soft ambient aura around the cat */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-rose-500/20 via-pink-500/25 to-purple-500/20 blur-xl animate-pulse" />

      <div className="relative z-10 w-full h-full flex items-center justify-center">
        {!hasError ? (
          <Image
            src={asset.url}
            alt={alt || asset.title}
            width={180}
            height={180}
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
