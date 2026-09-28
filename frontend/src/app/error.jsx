"use client";

import { useEffect } from "react";
import {
  AlertTriangle,
  RefreshCw,
  House,
  WifiOff,
  Cpu,
  TriangleAlert,
} from "lucide-react";

const Error = ({ error, reset }) => {
  useEffect(() => {
    console.error("Application Error:", error);
  }, [error]);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4">
      {/* Background Glow */}
      <div className="absolute top-[-120px] left-[-120px] h-96 w-96 rounded-full bg-red-500/10 blur-[130px]" />

      <div className="absolute right-[-150px] bottom-[-150px] h-96 w-96 rounded-full bg-orange-500/10 blur-[140px]" />

      {/* Grid Background */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Main Error Content */}
      <div className="relative z-10 flex w-full max-w-2xl flex-col items-center text-center">
        {/* Top System Status */}
        <div className="mb-8 flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-4 py-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />

            <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
          </span>

          <span className="text-xs font-montserrat font-medium tracking-wider text-red-400">
            SYSTEM ERROR DETECTED
          </span>
        </div>

        {/* Error Icon */}
        <div className="relative mb-8 flex h-32 w-32 items-center justify-center">
          {/* Rotating Circle */}
          <div className="absolute inset-0 animate-[spin_10s_linear_infinite] rounded-full border border-dashed border-red-500/30" />

          <div className="absolute h-24 w-24 rounded-full border border-orange-500/20" />

          {/* Main Icon */}
          <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-red-500 to-orange-500 shadow-2xl shadow-red-500/30">
            <AlertTriangle size={38} className="text-white" />
          </div>

          {/* Floating Icons */}
          <TriangleAlert
            size={18}
            className="absolute top-0 right-2 animate-pulse text-red-400"
          />

          <WifiOff
            size={18}
            className="absolute bottom-2 left-0 animate-bounce text-orange-400"
          />
        </div>

        {/* Error Code */}
        <div className="relative mb-3 font-montserrat">
          <span className="absolute inset-0 text-7xl font-black text-red-500/20 blur-md">
            ERROR
          </span>

          <h1 className="relative text-5xl font-black tracking-[0.25em] text-white sm:text-7xl">
            ERROR
          </h1>
        </div>

        {/* Error Message */}
        <h2 className="mt-4 text-2xl font-bold text-white sm:text-3xl">
          مشکلی در سیستم به وجود آمد!
        </h2>

        <p className="mt-4 max-w-xl leading-7 text-slate-400">
          متأسفانه هنگام پردازش درخواست شما یک مشکل غیرمنتظره رخ داد.
          لطفاً دوباره تلاش کنید. اگر مشکل ادامه داشت، بعداً دوباره مراجعه نمایید.
        </p>

        {/* Error Information */}
        <div className="mt-8 w-full rounded-2xl border border-white/10 bg-white/5 p-4 text-left backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10">
              <Cpu size={20} className="text-red-400" />
            </div>

            <div>
              <p className="text-sm font-semibold text-white">
                Application Status
              </p>

              <p className="text-xs text-slate-400">
                Unexpected error occurred while processing your request
              </p>
            </div>
          </div>

          <div className="mt-4 h-px w-full bg-white/10" />

          <div className="mt-4 flex items-center justify-between">
            <span className="text-xs text-slate-500">
              Error ID
            </span>

            <span className="font-mono text-xs text-red-400">
              {error?.digest || "UNKNOWN_ERROR"}
            </span>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <button
            onClick={() => reset()}
            className="group flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 px-6 py-3 font-semibold text-white shadow-lg shadow-red-500/20 transition-all duration-300 hover:scale-105 hover:shadow-red-500/40 active:scale-95"
          >
            <RefreshCw
              size={18}
              className="transition-transform duration-500 group-hover:rotate-180"
            />

            دوباره تلاش کنید
          </button>

          <a
            href="/"
            className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-semibold text-white transition-all duration-300 hover:border-cyan-400/30 hover:bg-cyan-400/10 hover:text-cyan-400"
          >
            <House size={18} />

            بازگشت به صفحه اصلی
          </a>
        </div>

        {/* Bottom Message */}
        <div className="mt-10 flex items-center gap-2 text-xs text-slate-500">
          <span className="h-1.5 w-1.5 rounded-full bg-red-400" />

          <span>فروشگاه در حال بررسی و بازیابی سیستم است</span>
        </div>
      </div>
    </div>
  );
};

export default Error;