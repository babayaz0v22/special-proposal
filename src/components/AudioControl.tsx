"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { Volume2, VolumeX } from "lucide-react";

// Safe, high quality royalty-free romantic background melody (local asset)
const ROMANTIC_AUDIO_URL = "/audio/romantic.mp3";

interface AudioControlProps {
  shouldStart?: boolean;
}

export const AudioControl: React.FC<AudioControlProps> = ({ shouldStart }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const startAudio = useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = 0.5;
    audioRef.current
      .play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch((err) => {
        console.warn("[Audio] Autoplay prevented, waiting for user gesture:", err);
      });
  }, []);

  useEffect(() => {
    if (shouldStart && !isPlaying) {
      startAudio();
    }
  }, [shouldStart, isPlaying, startAudio]);

  const toggleMute = () => {
    if (!audioRef.current) return;
    if (audioRef.current.paused) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        setIsMuted(false);
      });
    } else {
      if (isMuted) {
        audioRef.current.muted = false;
        setIsMuted(false);
      } else {
        audioRef.current.muted = true;
        setIsMuted(true);
      }
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={ROMANTIC_AUDIO_URL}
        loop
        preload="auto"
      />
      {/* Floating subtle audio control button on top right */}
      <button
        onClick={toggleMute}
        aria-label={isMuted || !isPlaying ? "Musiqani yoqish" : "Musiqani o'chirish"}
        className="fixed top-4 right-4 z-50 p-2.5 rounded-full bg-black/40 hover:bg-black/60 border border-white/10 hover:border-pink-500/40 text-slate-300 hover:text-pink-400 backdrop-blur-md transition-all duration-300 shadow-lg group"
      >
        {isMuted || !isPlaying ? (
          <VolumeX className="w-5 h-5 transition-transform group-hover:scale-110" />
        ) : (
          <div className="relative">
            <Volume2 className="w-5 h-5 text-pink-400 transition-transform group-hover:scale-110" />
            <span className="absolute -top-1 -right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span>
            </span>
          </div>
        )}
      </button>
    </>
  );
};
