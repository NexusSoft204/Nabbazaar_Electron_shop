"use client";

import Link from "next/link";
import {
  House,
  Search,
  Smartphone,
  Cpu,
  Wifi,
  ArrowLeft,
  Satellite,
} from "lucide-react";

const NotFound = () => {
    
  return (
    <div className="relative py-10 flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4">
      {/* Background Glow */}
      <div className="absolute top-[-150px] left-[-150px] h-96 w-96 rounded-full bg-cyan-500/10 blur-[140px]" />

      <div className="absolute right-[-150px] bottom-[-150px] h-[500px] w-[500px] rounded-full bg-purple-500/10 blur-[160px]" />

      <div className="absolute top-1/2 left-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/5 blur-[100px]" />

      {/* Grid Background */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)
          `,
          backgroundSize: "45px 45px",
        }}
      />

      {/* Decorative Lines */}
      <div className="absolute top-1/4 left-0 h-px w-1/3 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />

      <div className="absolute right-0 bottom-1/4 h-px w-1/3 bg-gradient-to-l from-transparent via-purple-400/30 to-transparent" />

      {/* Main Content */}
      <div className="relative z-10 flex w-full max-w-3xl flex-col items-center text-center">
        {/* System Status */}
        <div className="mb-8 flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-2 backdrop-blur-xl">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />

            <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
          </span>

          <span className="text-xs font-montserrat font-medium tracking-[0.15em] text-cyan-400">
            PAGE NOT FOUND
          </span>
        </div>

        {/* 404 Section */}
        <div className="relative mb-6 flex items-center justify-center">
          {/* Left Icon */}
          <div className="absolute left-[-45px] top-5 hidden animate-bounce rounded-xl border border-cyan-400/20 bg-cyan-400/10 p-2 text-cyan-400 sm:block">
            <Smartphone size={22} />
          </div>

          {/* Main 404 */}
          <h1 className="relative text-[110px] leading-none font-black tracking-tighter text-white sm:text-[180px] lg:text-[220px]">
            <span className="bg-gradient-to-b from-white via-cyan-100 to-cyan-500 bg-clip-text text-transparent">
              4
            </span>

            <span className="relative inline-block">
              <span className="relative z-10 flex h-[0.9em] w-[0.9em] items-center justify-center rounded-full border-[8px] border-cyan-400/80 text-[0.38em] shadow-[0_0_60px_rgba(34,211,238,0.3)]">
                <Search
                  className="animate-pulse text-cyan-300"
                  size="0.35em"
                />
              </span>

              <span className="absolute inset-0 animate-ping rounded-full bg-cyan-400/10" />
            </span>

            <span className="bg-gradient-to-b from-white via-purple-200 to-purple-500 bg-clip-text text-transparent">
              4
            </span>
          </h1>

          {/* Right Icon */}
          <div className="absolute right-[-45px] bottom-5 hidden animate-pulse rounded-xl border border-purple-400/20 bg-purple-400/10 p-2 text-purple-400 sm:block">
            <Cpu size={22} />
          </div>
        </div>

        {/* Text */}
        <h2 className="text-2xl font-bold font-montserrat text-white sm:text-4xl">
          Ops! NotFound this page
        </h2>

        <p className="mt-4 max-w-xl leading-7 text-slate-400">
          به نظر می‌رسد صفحه‌ای که به دنبال آن هستید وجود ندارد، حذف شده است
          یا آدرس آن تغییر کرده است.
        </p>

        {/* Search Box */}
        <div className="mt-8 flex w-full max-w-lg items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-2 backdrop-blur-xl transition-all duration-300 focus-within:border-cyan-400/40 focus-within:shadow-lg focus-within:shadow-cyan-500/10">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400">
            <Search size={20} />
          </div>

          <input
            type="text"
            placeholder="جستجوی محصولات..."
            className="h-11 w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
          />

          <button className="flex h-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 font-medium text-white transition hover:scale-105 active:scale-95">
            search
          </button>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/"
            className="group font-montserrat flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 font-semibold text-white shadow-lg shadow-cyan-500/20 transition-all duration-300 hover:scale-105 hover:shadow-cyan-500/40 active:scale-95"
          >
            <House size={18} />

            Back to Home Page

            <ArrowLeft
              size={17}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />
          </Link>

          <Link
            href="/shop"
            className="flex font-montserrat items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-semibold text-white transition-all duration-300 hover:border-purple-400/30 hover:bg-purple-500/10 hover:text-purple-300"
          >
            <Smartphone size={18} />

            shop page
          </Link>
        </div>

        {/* System Info */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-500">
          <div className="flex font-inter items-center gap-2 rounded-full border border-white/5 bg-white/[0.03] px-3 py-2">
            <Wifi size={14} className="text-cyan-400" />

            <span>Connection Active</span>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-white/5 bg-white/[0.03] px-3 py-2">
            <Satellite size={14} className="text-purple-400" />

            <span>Searching Route...</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;