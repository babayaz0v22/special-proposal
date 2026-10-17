import React, { Suspense } from "react";
import { StepFlow } from "@/components/StepFlow";

export default function HomePage() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
          <div className="w-10 h-10 border-2 border-pink-500/30 border-t-pink-500 rounded-full animate-spin mb-4" />
          <p className="text-sm text-pink-300/80 tracking-wide font-light">Yuklanmoqda...</p>
        </div>
      }
    >
      <StepFlow />
    </Suspense>
  );
}
