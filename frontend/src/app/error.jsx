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
    <div className="relative flex min-h-screen py-13 items-center justify-center overflow-hidden bg-slate-50 px-4">
      {/* Background Soft Ambient Light */}
      <div className="absolute top-[-100px] left-[-100px] h-[500px] w-[500px] rounded-full bg-rose-500/5 blur-[120px]" />
      <div className="absolute right-[-120px] bottom-[-120px] h-[500px] w-[500px] rounded-full bg-amber-500/5 blur-[140px]" />

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
      <div className="relative z-10 flex w-full max-w-xl flex-col items-center text-center">
        
        {/* Top System Status Tag */}
        <div className="mb-6 flex items-center gap-2 rounded-full border border-rose-100 bg-rose-50 px-4 py-1.5 shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-500" />
          </span>
          <span className="text-xs font-semibold tracking-wider text-rose-600 uppercase">
            System Alert
          </span>
        </div>

        {/* Dynamic Visual Icon Area */}
        <div className="relative mb-6 flex h-28 w-28 items-center justify-center">
          {/* Animated Decorative Rings */}
          <div className="absolute inset-0 animate-[spin_12s_linear_infinite] rounded-full border-2 border-dashed border-rose-200" />
          <div className="absolute h-20 w-20 rounded-full border border-amber-200 bg-white shadow-sm" />
          
          {/* Core Glassmorphic Icon */}
          <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-500 to-amber-500 shadow-lg shadow-rose-500/20">
            <AlertTriangle size={30} className="text-white" />
          </div>

          {/* Mini Floating Icons */}
          <TriangleAlert size={16} className="absolute top-1 right-1 animate-pulse text-rose-500" />
          <WifiOff size={16} className="absolute bottom-2 left-1 animate-bounce text-amber-500" />
        </div>

        {/* Main Typography Header */}
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Something went wrong
        </h1>
        
        <p className="mt-3 max-w-md text-base leading-relaxed text-slate-500">
          An unexpected error occurred while processing your request. Please try again or return to safety.
        </p>

        {/* Clean & Professional Error Log Details Card */}
        <div className="mt-8 w-full rounded-2xl border border-slate-200/80 bg-white/80 p-5 text-left shadow-sm backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 text-rose-500">
              <Cpu size={20} />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800">
                Application Diagnostic
              </p>
              <p className="text-xs text-slate-400">
                The operation couldn't be completed successfully.
              </p>
            </div>
          </div>
          
          <div className="mt-4 h-px w-full bg-slate-100" />
          
          <div className="mt-3 flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Error ID</span>
            <span className="rounded bg-slate-50 px-2 py-0.5 font-mono text-xs font-semibold text-rose-600 border border-slate-100">
              {error?.digest || "GENERIC_FAILURE"}
            </span>
          </div>
        </div>

        {/* Modern Call to Actions */}
        <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
          <button 
            onClick={() => reset()} 
            className="group flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 py-3 font-semibold text-white shadow-md shadow-slate-950/10 transition-all duration-200 hover:bg-slate-800 active:scale-98"
          >
            <RefreshCw size={16} className="transition-transform duration-500 group-hover:rotate-180" />
            Try Again
          </button>
          
          <a 
            href="/" 
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:bg-slate-50 hover:text-slate-900"
          >
            <House size={16} />
            Back to Home
          </a>
        </div>

        {/* Footer Status Message */}
        <div className="mt-12 flex items-center gap-2 text-xs font-medium text-slate-400">
          <span className="h-1.5 w-1.5 rounded-full bg-rose-500 animate-pulse" />
          <span>Our team has been notified and is investigating the issue.</span>
        </div>

      </div>
    </div>
  );
};

export default Error;
