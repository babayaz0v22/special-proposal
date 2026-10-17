"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, Send, Coffee, ArrowRight, ShieldCheck, Lock, MapPin, Check } from "lucide-react";
import Image from "next/image";
import { CatVisual } from "./CatVisual";
import { AudioControl } from "./AudioControl";
import { ConfettiBlast } from "./ConfettiBlast";
import { StepId } from "@/types";

interface StepFlowProps {
  initialToken?: string;
}

export const StepFlow: React.FC<StepFlowProps> = ({ initialToken = "" }) => {
  const [step, setStep] = useState<StepId>(1);
  const [token, setToken] = useState<string>(initialToken);
  const [isAudioTriggered, setIsAudioTriggered] = useState(false);
  const [dodgeCount, setDodgeCount] = useState(0);
  const [noButtonPos, setNoButtonPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [busyAttempts, setBusyAttempts] = useState(0);
  const [busyButtonPos, setBusyButtonPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVerifying, setIsVerifying] = useState(true);
  const [closedMessage, setClosedMessage] = useState<string | null>(null);

  // Form states for 5A
  const [addressOrCafe, setAddressOrCafe] = useState("");
  const [igAccept, setIgAccept] = useState<"yes" | "later" | null>(null);
  const [contact, setContact] = useState("");

  const containerRef = useRef<HTMLDivElement | null>(null);

  // Initialize and check token
  useEffect(() => {
    let currentToken = token;
    if (!currentToken && typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      currentToken = urlParams.get("token") || "";
      if (currentToken) {
        setToken(currentToken);
      }
    }

    // Check local browser lock
    if (currentToken && typeof window !== "undefined") {
      const isLocallyConsumed = localStorage.getItem(`consumed_${currentToken}`) === "true";
      if (isLocallyConsumed) {
        setClosedMessage("Bu sahifa o'z vazifasini bajarib bo'ldi 💌");
        setStep("closed");
        setIsVerifying(false);
        return;
      }
    }

    // Verify on server
    const checkTokenOnServer = async () => {
      if (!currentToken) {
        setIsVerifying(false);
        return;
      }

      try {
        const res = await fetch(`/api/verify-token?token=${encodeURIComponent(currentToken)}`);
        const data = await res.json();

        if (data.consumed) {
          setClosedMessage(data.message || "Bu sahifa o'z vazifasini bajarib bo'ldi 💌");
          setStep("closed");
        }
      } catch (err) {
        console.warn("[VerifyToken] Error checking with server:", err);
      } finally {
        setIsVerifying(false);
      }
    };

    checkTokenOnServer();
  }, [token]);

  // Helper to send telemetry track events
  const sendTelemetry = useCallback(
    async (event: string, extra?: Record<string, unknown>) => {
      try {
        await fetch("/api/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            token,
            event,
            dodgeCount,
            ...extra,
          }),
        });
      } catch (err) {
        console.error("[Telemetry] Send error:", err);
      }
    },
    [token, dodgeCount]
  );

  // Step 1: Start proposal flow
  const handleStart = () => {
    setIsAudioTriggered(true);
    setStep(2);
    sendTelemetry("opened");
  };

  // Dodging "No" button logic
  const handleDodgeNo = () => {
    setDodgeCount((prev) => prev + 1);

    // Random safe offsets within card container
    const randomX = (Math.random() - 0.5) * 220;
    const randomY = (Math.random() - 0.5) * 110;

    setNoButtonPos({ x: randomX, y: randomY });
  };

  // Step 2: "Yes, I do" clicked
  const handleTrustYes = () => {
    setStep(3);
    sendTelemetry("trust_yes", { dodgeCount });
  };

  // Step 3: Advance to Step 4
  const handleIntrigueContinue = () => {
    setStep(4);
  };

  // Step 4: Status choices
  const handleStatusChoice = async (status: "free" | "busy") => {
    if (status === "free") {
      setStep("5A");
      sendTelemetry("status_free");
    } else {
      setStep("5B");
      sendTelemetry("status_busy");
      if (typeof window !== "undefined" && token) {
        localStorage.setItem(`consumed_${token}`, "true");
      }
      try {
        await fetch("/api/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            token,
            type: "exit_5B",
          }),
        });
      } catch (err) {
        console.error("[Submit 5B] error:", err);
      }
    }
  };

  // Step 4: "Yes, I'm taken" 3-attempt dodging logic
  const handleBusyClick = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    if (busyAttempts === 0) {
      setBusyAttempts(1);
      const randomX = (Math.random() - 0.5) * 160;
      const randomY = (Math.random() - 0.5) * 50;
      setBusyButtonPos({ x: randomX, y: randomY });
      sendTelemetry("status_busy_attempt", { attempt: 1 });
    } else if (busyAttempts === 1) {
      setBusyAttempts(2);
      const randomX = (Math.random() - 0.5) * 180;
      const randomY = (Math.random() - 0.5) * 60;
      setBusyButtonPos({ x: randomX, y: randomY });
      sendTelemetry("status_busy_attempt", { attempt: 2 });
    } else {
      handleStatusChoice("busy");
    }
  };

  // Step 5A: Submit final form
  const handleSubmit5A = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (typeof window !== "undefined" && token) {
      localStorage.setItem(`consumed_${token}`, "true");
    }

    const finalAddress = addressOrCafe.trim() || "Not provided (Skipped)";
    const igStatus =
      igAccept === "yes"
        ? "Accepted follow request ✨"
        : igAccept === "later"
        ? "Maybe later 😊"
        : "Not specified";

    try {
      await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          type: "success_5A",
          addressOrCafe: finalAddress,
          contact,
          dodgeCount,
          igAccept: igStatus,
        }),
      });
    } catch (err) {
      console.error("[Submit 5A] error:", err);
    } finally {
      setIsSubmitting(false);
      setStep("6A");
    }
  };

  const cardVariants = {
    initial: { opacity: 0, y: 18, scale: 0.96 },
    animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
    exit: { opacity: 0, y: -18, scale: 0.96, transition: { duration: 0.3 } },
  };

  if (isVerifying) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="w-10 h-10 border-2 border-pink-500/30 border-t-pink-500 rounded-full animate-spin mb-4" />
        <p className="text-sm text-pink-300/80 tracking-wide font-light">Loading...</p>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative z-10 w-full max-w-md mx-auto px-4 py-8 sm:py-12 flex flex-col items-center justify-center min-h-screen">
      {/* Floating Audio Controller */}
      <AudioControl shouldStart={isAudioTriggered} />

      <AnimatePresence mode="wait">
        {/* ==================== STEP 1: INTRO ==================== */}
        {step === 1 && (
          <motion.div
            key="step-1"
            variants={cardVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full glass-card rounded-3xl p-6 sm:p-8 text-center"
          >
            <CatVisual type="intro" />

            <div className="mt-4 mb-8">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-pink-500/10 text-pink-400 border border-pink-500/20 mb-3">
                <Sparkles className="w-3.5 h-3.5" /> Just for you
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2 leading-snug">
                I have something special to tell you...
              </h1>
              <p className="text-sm text-slate-300/80 font-light">
                Are you ready for a little mystery? ✨
              </p>
            </div>

            <button
              onClick={handleStart}
              className="w-full py-4 px-6 btn-neon flex items-center justify-center gap-2 text-base font-semibold group cursor-pointer"
            >
              <span>Tap to Begin</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>
        )}

        {/* ==================== STEP 2: TRUST ==================== */}
        {step === 2 && (
          <motion.div
            key="step-2"
            variants={cardVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full glass-card rounded-3xl p-6 sm:p-8 text-center relative overflow-hidden"
          >
            <CatVisual type="trust" />

            <div className="mt-3 mb-6">
              <p className="text-xs uppercase tracking-widest text-pink-400 font-medium mb-1">
                Be honest with me...
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Do you trust me? 🥺
              </h2>

              {dodgeCount > 0 && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xs text-pink-300/70 italic mt-2"
                >
                  {dodgeCount < 3
                    ? "Wait, did you really try to click 'No'? 🙈"
                    : dodgeCount < 6
                    ? "You can't escape that easily! 😂"
                    : "Even the button knows you should say yes 😉"}
                </motion.p>
              )}
            </div>

            <div className="relative min-h-[90px] flex items-center justify-center gap-4 mt-6">
              {/* YES BUTTON */}
              <button
                onClick={handleTrustYes}
                className="py-3.5 px-7 btn-neon text-sm sm:text-base font-semibold shadow-lg shadow-pink-500/30 flex items-center gap-1.5 cursor-pointer"
              >
                <Heart className="w-4 h-4 fill-white" />
                <span>Yes, I do</span>
              </button>

              {/* RUNAWAY "NO" BUTTON */}
              <motion.button
                animate={{ x: noButtonPos.x, y: noButtonPos.y }}
                transition={{ type: "spring", stiffness: 450, damping: 20 }}
                onMouseEnter={handleDodgeNo}
                onTouchStart={handleDodgeNo}
                onPointerDown={handleDodgeNo}
                className="py-3.5 px-6 btn-glass text-sm sm:text-base font-medium rounded-full cursor-pointer select-none"
              >
                No
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* ==================== STEP 3: INTRIGUE ==================== */}
        {step === 3 && (
          <motion.div
            key="step-3"
            variants={cardVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full glass-card rounded-3xl p-6 sm:p-8 text-center"
          >
            <CatVisual type="intrigue" />

            <div className="mt-3 mb-6 text-left">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 text-center">
                So, what&apos;s really happening here? 👀
              </h2>
              <div className="space-y-3.5 text-slate-200/90 text-xs sm:text-sm leading-relaxed bg-white/[0.03] p-4 sm:p-5 rounded-2xl border border-white/5 font-light">
                <p>
                  This might feel a bit unexpected, but I wanted to do something more memorable than just an everyday text. I noticed you unfollowed me on Instagram, and my follow request was left waiting rather patiently... 😂 So being a developer, I thought I&apos;d use my skills to say hello in my own way.
                </p>
                <p>
                  And knowing that you&apos;re studying <strong className="text-pink-300 font-medium">English Philology</strong>, I thought writing this in English was only right! 🎓✨
                </p>
                <p>
                  My name is <strong className="text-pink-400 font-semibold">Nodirbek</strong>, from Urgench. I wanted to reach out because my intentions toward you are genuinely sincere and serious. How I found you, where I first noticed you, and why you... well, that&apos;s still a little secret for now 🤫
                </p>
                <div className="p-2.5 sm:p-3 rounded-xl bg-pink-500/10 border border-pink-500/20 text-xs text-pink-200 mt-2">
                  🛡️ <strong>Peace of mind:</strong> If your answer is no, I completely understand and respect it, and I promise I will never bother you again. Zero obligations!
                </div>
              </div>
            </div>

            <button
              onClick={handleIntrigueContinue}
              className="w-full py-4 px-6 btn-neon flex items-center justify-center gap-2 text-sm sm:text-base font-semibold group cursor-pointer"
            >
              <span>Okay, I&apos;m listening... Let&apos;s continue! ✨</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>
        )}

        {/* ==================== STEP 4: RELATIONSHIP STATUS ==================== */}
        {step === 4 && (
          <motion.div
            key="step-4"
            variants={cardVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full glass-card rounded-3xl p-6 sm:p-8 text-center"
          >
            <CatVisual type="status" />

            <div className="mt-3 mb-6">
              <span className="inline-block text-xs uppercase tracking-widest text-pink-400 font-medium mb-1">
                A quick question
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Is your heart taken?
              </h2>
              <p className="text-xs text-slate-400 mt-2">
                Please be completely honest — I will respect whatever your answer is 🌸
              </p>

              {busyAttempts > 0 && (
                <motion.p
                  key={busyAttempts}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-pink-300/85 italic mt-3 bg-pink-500/10 py-1.5 px-3.5 rounded-full inline-block border border-pink-500/20"
                >
                  {busyAttempts === 1
                    ? "Are you really sure? 🥺"
                    : "Please think about it once more... 🙈"}
                </motion.p>
              )}
            </div>

            <div className="flex flex-col gap-4">
              <button
                onClick={() => handleStatusChoice("free")}
                className="w-full py-4 px-6 btn-neon flex items-center justify-center gap-2 text-base font-semibold cursor-pointer group shadow-lg shadow-pink-500/25"
              >
                <Heart className="w-5 h-5 fill-white transition-transform group-hover:scale-110" />
                <span>No, my heart is free ✨</span>
              </button>

              <div className="relative min-h-[52px] flex items-center justify-center">
                <motion.button
                  animate={{ x: busyButtonPos.x, y: busyButtonPos.y }}
                  transition={{ type: "spring", stiffness: 450, damping: 22 }}
                  onClick={handleBusyClick}
                  onTouchStart={handleBusyClick}
                  className="py-3 px-6 btn-glass text-xs sm:text-sm text-slate-300 hover:text-white rounded-full cursor-pointer transition-colors select-none"
                >
                  {busyAttempts === 0 && "Yes, I'm taken"}
                  {busyAttempts === 1 && "Are you sure? 🥺"}
                  {busyAttempts === 2 && "Think about it once more... 🙈"}
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ==================== STEP 5A: SUCCESS FORM ==================== */}
        {step === "5A" && (
          <motion.div
            key="step-5a"
            variants={cardVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full glass-card rounded-3xl p-6 sm:p-8 text-center"
          >
            <CatVisual type="success" />

            <div className="mt-2 mb-5">
              <h2 className="text-2xl font-bold text-white mb-2.5">
                Wonderful news! 🥰
              </h2>
              <div className="text-xs sm:text-sm text-slate-200/95 leading-relaxed font-light bg-white/[0.03] p-4 rounded-2xl border border-white/5 space-y-2 text-center sm:text-left">
                <p>
                  My intentions toward you are truly sincere and serious. If you wouldn&apos;t mind, my mother would love to visit your home to meet your family and ask for your parents&apos; blessing first.
                </p>
                <p className="text-pink-300/80 text-[11px] sm:text-xs">
                  It is always best when everything happens respectfully and in accordance with proper traditions 🌸
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit5A} className="space-y-4 text-left">
              {/* Instagram Follow Request (Playful Icebreaker) */}
              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-pink-500/10 via-rose-500/10 to-purple-500/10 border border-pink-500/25">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-semibold text-pink-300 text-xs flex items-center gap-1.5">
                    📸 Instagram Follow Request
                  </span>
                  <span className="text-[10px] bg-pink-500/20 text-pink-400 px-2 py-0.5 rounded-full font-medium">Optional</span>
                </div>
                <p className="text-slate-200 text-xs leading-relaxed mb-3">
                  If you don&apos;t mind, would you consider accepting that poor little follow request on Instagram? 🙈
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setIgAccept("yes")}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      igAccept === "yes"
                        ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md shadow-pink-500/30 border border-pink-400"
                        : "bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10"
                    }`}
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>I&apos;ll accept it ✨</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIgAccept("later")}
                    className={`py-2 px-3 rounded-xl text-xs font-medium transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      igAccept === "later"
                        ? "bg-pink-500/20 text-pink-300 border border-pink-500/40"
                        : "bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10"
                    }`}
                  >
                    <span>Maybe later 😊</span>
                  </button>
                </div>
              </div>

              {/* Contact info (unchanged) */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Your Telegram username or phone number to reach you (optional) 💬
                </label>
                <input
                  type="text"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="@username or +998 90 ..."
                  className="w-full px-4 py-3 rounded-2xl luxury-input text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 btn-neon flex items-center justify-center gap-2 text-sm sm:text-base font-semibold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed mt-2"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>
        )}

        {/* ==================== STEP 5B: POLITE EXIT ==================== */}
        {step === "5B" && (
          <motion.div
            key="step-5b"
            variants={cardVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full glass-card rounded-3xl p-6 sm:p-8 text-center"
          >
            <CatVisual type="sad" />

            <div className="mt-4 mb-4">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">
                I understand... 🤍
              </h2>
              <p className="text-sm sm:text-base text-slate-200/90 leading-relaxed font-light bg-white/[0.03] p-4 rounded-2xl border border-white/5">
                Thank you so much for your honesty! Wishing you genuine happiness from the bottom of my heart ✨
              </p>
            </div>

            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-pink-400/80" />
              <span>Your response has been received with sincere respect</span>
            </div>
          </motion.div>
        )}

        {/* ==================== STEP 6A: CELEBRATION ==================== */}
        {step === "6A" && (
          <motion.div
            key="step-6a"
            variants={cardVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full glass-card rounded-3xl p-6 sm:p-8 text-center relative overflow-hidden"
          >
            <ConfettiBlast />

            {/* Glowing heartbeat icon */}
            <div className="mx-auto my-2 flex items-center justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-pink-500/40 rounded-full blur-2xl animate-pulse" />
                <div className="relative w-16 h-16 rounded-full bg-gradient-to-tr from-pink-500 to-rose-600 flex items-center justify-center shadow-lg shadow-pink-500/50 animate-heart-pulse">
                  <Heart className="w-9 h-9 fill-white text-white" />
                </div>
              </div>
            </div>

            <CatVisual type="celebrate" />

            <div className="mt-4 space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-rose-300 to-pink-400">
                You made my day! 🎉
              </h2>
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-light bg-pink-500/10 border border-pink-500/20 p-4 rounded-2xl">
                I&apos;ll be in touch soon and reveal that secret ✨
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-center gap-2 text-xs text-pink-400/80 font-light">
              <Coffee className="w-4 h-4" />
              <span>A cozy coffee chat awaits... ☕</span>
            </div>
          </motion.div>
        )}

        {/* ==================== CLOSED / INVALIDATED ==================== */}
        {step === "closed" && (
          <motion.div
            key="step-closed"
            variants={cardVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full glass-card rounded-3xl p-6 sm:p-8 text-center"
          >
            <CatVisual type="closed" />

            <div className="mt-4 mb-2">
              <div className="w-10 h-10 mx-auto rounded-full bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 mb-3">
                <Lock className="w-5 h-5" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
                {closedMessage || "Bu sahifa o'z vazifasini bajarib bo'ldi 💌"}
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 font-light">
                Ushbu maxsus havola faqat bir martalik foydalanish uchun mo&apos;ljallangan edi.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
