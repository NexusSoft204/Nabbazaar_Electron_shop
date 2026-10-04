"use client";
import React, { useState, useEffect } from 'react';
import { ShieldCheck, Clock, RefreshCw, Layers, ClipboardList, HelpCircle } from 'lucide-react';
if (!process.env.NEXT_PUBLIC_API_URL) {
  throw new Error("NEXT_PUBLIC_API_URL is not configured");
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;


export default function ReturnPolicyPage() {
  const [policy, setPolicy] = useState(null);

  useEffect(() => {
    async function fetchPolicy() {
      try {
        const res = await fetch(`${API_URL}/api/settings/ReturnPolicy/`, {
          cache: "no-store",
        });
        if (res.ok) {
          const data = await res.json();
          const finalData = Array.isArray(data) ? data[0] : data.results ? data.results[0] : data;
          setPolicy(finalData);
        }
      } catch (error) {
        console.error("Failed to load return criteria:", error);
      }
    }
    fetchPolicy();
  }, []);



  if (!policy) {
    return (
      <div className="w-full min-h-screen bg-white flex items-center justify-center font-sans text-gray-400">
        <p>Return policy data unavailable at this moment.</p>
      </div>
    );
  }

  const formattedDate = new Date(policy.updated_at).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  // Config map grouping policies dynamically into structured grids
  const blocks = [
    { title: "Return Conditions", icon: <RefreshCw className="text-blue-600" />, content: policy.return_conditions },
    { title: "Eligible vs Ineligible Items", icon: <Layers className="text-purple-600" />, content: policy.returnable_items },
    { title: "Step-by-Step Return Process", icon: <ClipboardList className="text-emerald-600" />, content: policy.return_steps },
    { title: "Warranty & Guarantee Terms", icon: <ShieldCheck className="text-amber-600" />, content: policy.warranty_terms }
  ];

  return (
    <main className="w-full min-h-screen bg-white text-gray-800 font-sans py-16 text-left" dir="ltr">
      <div className="2xl:container mx-auto px-6">
        
        {/* Header Hero Component Panel */}
        <div className="border-b border-gray-100 pb-8 mb-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex font-inter items-center gap-1.5 text-primary-blue bg-blue-50 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
              <RefreshCw size={12} className="animate-spin-slow" />
              Fulfillment Guard
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 tracking-tight font-montserrat">
              {policy.title}
            </h1>
            <p className="text-gray-500 text-sm max-w-xl pt-1 font-inter">{policy.description}</p>
          </div>
          
          <div className="flex flex-col items-start gap-2 bg-gray-50 p-4 rounded-2xl border border-gray-100 shrink-0 font-inter">
            <span className="text-xs text-gray-400 font-bold uppercase tracking-wider flex items-center gap-1">
              <Clock size={12} /> Time Window
            </span>
            <span className="text-sm font-bold text-gray-900">{policy.time_limit}</span>
            <span className="text-[11px] text-gray-400 mt-1 border-t border-gray-200/60 pt-1 w-full">Updated: {formattedDate}</span>
          </div>
        </div>

        {/* Content Section Columns Card Grid */}
        <div className="space-y-10">
          {blocks.map((block, idx) => (
            <div key={idx} className="bg-gray-50/40 border border-gray-100 p-6 sm:p-8 rounded-2xl shadow-xs transition-colors hover:bg-gray-50/60">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-white rounded-xl shadow-xs border border-gray-100">
                  {block.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 tracking-tight font-montserrat">
                  {block.title}
                </h3>
              </div>
              <div className="text-gray-600 text-sm sm:text-base leading-8 whitespace-pre-line pl-11 font-inter">
                {block.content}
              </div>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}


