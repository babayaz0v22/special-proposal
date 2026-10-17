"use client";

import { useEffect } from "react";
import confetti from "canvas-confetti";

export const ConfettiBlast = () => {
  useEffect(() => {
    // Immediate energetic burst
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#ff2a85", "#f43f5e", "#fb7185", "#fda4af", "#ffd700", "#ffffff"],
    });

    // Gentle falling hearts and petals effect over a few seconds
    const duration = 3.5 * 1000;
    const animationEnd = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: ["#ff2a85", "#f43f5e", "#ff69b4"],
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: ["#ff2a85", "#f43f5e", "#ff69b4"],
      });

      if (Date.now() < animationEnd) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  }, []);

  return null;
};
