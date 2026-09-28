"use client";

import { useEffect, useState } from "react";
import { Cpu, ShoppingBag, Wifi, Zap } from "lucide-react";

const loading = () => {
  const [progress, setProgress] = useState(0);
  const [dots, setDots] = useState("");

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) return 95;
        return prev + Math.floor(Math.random() * 10) + 2;
      });
    }, 300);

    const dotsInterval = setInterval(() => {
      setDots((prev) => {
        if (prev.length >= 3) return "";
        return prev + ".";
      });
    }, 500);

    return () => {
      clearInterval(progressInterval);
      clearInterval(dotsInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4">
      {/* Background Glow */}
      <div className="absolute top-[-150px] left-[-100px] h-80 w-80 rounded-full bg-blue-500/20 blur-[120px]" />

      <div className="absolute right-[-100px] bottom-[-150px] h-96 w-96 rounded-full bg-purple-500/20 blur-[140px]" />

      {/* Grid Background */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 flex w-full max-w-md flex-col items-center">
        {/* Animated Icons */}
        <div className="relative mb-10 flex h-28 w-28 items-center justify-center">
          {/* Rotating Circles */}
          <div className="absolute h-full w-full animate-spin rounded-full border border-dashed border-cyan-400/40" />

          <div className="absolute h-20 w-20 animate-[spin_3s_linear_infinite_reverse] rounded-full border border-purple-400/40" />

          {/* Logo Center */}
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 shadow-lg shadow-cyan-500/30">
            <Cpu size={30} className="text-white" />
          </div>

          {/* Floating Icons */}
          <ShoppingBag
            size={18}
            className="absolute top-0 right-1 animate-bounce text-cyan-400"
          />

          <Wifi
            size={18}
            className="absolute bottom-0 left-1 animate-pulse text-purple-400"
          />

          <Zap
            size={18}
            className="absolute right-[-20px] bottom-10 animate-pulse text-yellow-400"
          />
        </div>

        {/* Title */}
        <h1 className="text-center text-2xl font-bold tracking-wide text-white">
          TECH<span className="text-cyan-400">STORE</span>
        </h1>

        <p className="mt-3 text-center text-sm text-slate-400">
          در حال آماده‌سازی بهترین محصولات تکنالوژی
          <span className="inline-block w-6 text-left text-cyan-400">
            {dots}
          </span>
        </p>

        {/* Progress */}
        <div className="mt-8 w-full">
          <div className="mb-3 flex justify-between text-xs">
            <span className="text-slate-400">Loading System</span>

            <span className="font-semibold text-cyan-400">
              {progress}%
            </span>
          </div>

          <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
            <div
              className="relative h-full rounded-full bg-gradient-to-r from-blue-600 via-cyan-400 to-purple-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            >
              {/* Shine Effect */}
              <div className="absolute inset-y-0 right-0 w-16 bg-white/30 blur-sm" />
            </div>
          </div>
        </div>

        {/* Bottom Status */}
        <div className="mt-8 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
          </span>

          <span className="text-xs text-slate-400">
            سیستم در حال اتصال است...
          </span>
        </div>
      </div>
    </div>
  );
};

export default loading;