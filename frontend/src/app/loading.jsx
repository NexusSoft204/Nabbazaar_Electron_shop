"use client";

import { useEffect, useState } from "react";
import { Cpu, ShoppingBag, Wifi, Zap } from "lucide-react";

const Loading = () => {
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
    <div className="fixed inset-0 z-[9999] flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 px-4">
      {/* Background Soft Ambient Light */}
      <div className="absolute top-[-150px] left-[-100px] h-96 w-96 rounded-full bg-blue-500/5 blur-[120px]" />
      <div className="absolute right-[-100px] bottom-[-150px] h-[450px] w-[450px] rounded-full bg-indigo-500/5 blur-[140px]" />

      {/* Grid Pattern with Light Overlay */}
      <div
        className="absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(148, 163, 184, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(148, 163, 184, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "32px 32px",
        }}
      />

      {/* Main Content Box */}
      <div className="relative z-10 flex w-full max-w-sm flex-col items-center">
        
        {/* Dynamic Visual Icon Area */}
        <div className="relative mb-8 flex h-28 w-28 items-center justify-center">
          {/* Animated Decorative Rings */}
          <div className="absolute h-full w-full animate-spin rounded-full border-2 border-dashed border-blue-200" />
          <div className="absolute h-20 w-20 animate-[spin_4s_linear_infinite_reverse] rounded-full border border-indigo-100 bg-white shadow-sm" />

          {/* Core Glassmorphic Icon */}
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-500 shadow-lg shadow-blue-500/20">
            <Cpu size={28} className="text-white" />
          </div>

          {/* Floating Icons with Subdued Colors */}
          <ShoppingBag
            size={16}
            className="absolute top-0 right-1 animate-bounce text-blue-500"
          />
          <Wifi
            size={16}
            className="absolute bottom-1 left-1 animate-pulse text-indigo-500"
          />
          <Zap
            size={16}
            className="absolute right-[-16px] bottom-10 animate-pulse text-amber-500"
          />
        </div>

        {/* Brand Typography */}
        <h1 className="text-center text-3xl font-black tracking-wider text-slate-900">
          TECH<span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">STORE</span>
        </h1>

        <p className="mt-2 text-center text-sm font-medium text-slate-500">
          Preparing the ultimate tech products
          <span className="inline-block w-6 text-left text-blue-600 font-bold">
            {dots}
          </span>
        </p>

        {/* Clean Progress Section */}
        <div className="mt-8 w-full rounded-2xl border border-slate-200/60 bg-white/70 p-5 shadow-sm backdrop-blur-md">
          <div className="mb-2.5 flex justify-between text-xs font-semibold">
            <span className="text-slate-400 uppercase tracking-wider">Loading System</span>
            <span className="text-blue-600">
              {progress}%
            </span>
          </div>

          {/* Progress Track */}
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100 p-0.5 border border-slate-200/40">
            <div
              className="relative h-full rounded-full bg-gradient-to-r from-blue-600 to-indigo-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            >
              {/* Internal Moving Glow */}
              <div className="absolute inset-y-0 right-0 w-12 bg-white/20 blur-xs" />
            </div>
          </div>
        </div>

        {/* Bottom Connectivity Status */}
        <div className="mt-8 flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/90 px-4 py-2 shadow-xs backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>

          <span className="text-xs font-medium text-slate-500">
            Establishing secure connection...
          </span>
        </div>
        
      </div>
    </div>
  );
};

export default Loading;
