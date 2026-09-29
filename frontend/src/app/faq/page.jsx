import React from 'react';
import FaqAccordionWrapper from './FaqAccordionWrapper';
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";


async function getFaqs() {
  try {
    const res = await fetch(`${API_URL}/api/settings/faq/`, {
      cache: "no-store", 
    });
    
    if (!res.ok) return [];
    const data = await res.json();
    
    
    const finalData = Array.isArray(data) ? data : data.results || [];
    return finalData
      .filter(item => item.is_active)
      .sort((a, b) => a.sort_order - b.sort_order);
  } catch (error) {
    console.error("Failed to load server-side FAQ:", error);
    return [];
  }
}

export default async function FaqPage() {
  const faqs = await getFaqs();

  return (
    <main className="w-full min-h-screen  py-20 font-sans">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Page Section Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 bg-primary-blue/10 border border-primary-blue/30 text-backegound-navy px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
            Help Center
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight my-3">
            Frequently Asked <span className="text-highlight">Questions</span>
          </h1>
          <p className=" max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            Got questions about provincial shipping, system warranties, or payment methods? Find your answers below.
          </p>
        </div>

        {/* 2. Isolated Interactive Client Client Engine Wrapper */}
        {faqs.length > 0 ? (
          <FaqAccordionWrapper faqs={faqs} />
        ) : (
          <div className="text-center p-12 rounded-2xl border border-deep-navy">
            <p className="text-metallic-silver text-sm">No active questions found at the moment.</p>
          </div>
        )}

      </div>
    </main>
  );
}
