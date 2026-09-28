"use client";
import React, { useState, useEffect } from 'react';
import { FileText, ShoppingBag, ClipboardList, CreditCard, Truck, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function TermsPage() {
  const [terms, setTerms] = useState(null);
  const [activeTab, setActiveTab] = useState('terms_of_use');

  useEffect(() => {
    async function fetchTerms() {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/settings/termsandcondition/", {
          cache: "no-store",
        });
        if (res.ok) {
          const data = await res.json();
          // Handles singleton configuration safely from array or dict object payloads
          const finalData = Array.isArray(data) ? data[0] : data.results ? data.results[0] : data;
          setTerms(finalData);
        }
      } catch (error) {
        console.error("Failed to load platform regulations:", error);
      }
    }
    fetchTerms();
  }, []);


  if (!terms) {
    return (
      <div className="w-full min-h-screen bg-white flex items-center justify-center font-sans text-gray-500">
        <p>Regulations file could not be found. Please check back later.</p>
      </div>
    );
  }

  // Structural dynamic menu layout mapping keys to semantic layout panels
  const tabsConfig = [
    { id: 'terms_of_use', label: 'Terms of Use', icon: <FileText size={18} />, content: terms.terms_of_use },
    { id: 'purchase_terms', label: 'Purchase Terms', icon: <ShoppingBag size={18} />, content: terms.purchase_terms },
    { id: 'order_rules', label: 'Order Rules', icon: <ClipboardList size={18} />, content: terms.order_rules },
    { id: 'payment_rules', label: 'Payment Rules', icon: <CreditCard size={18} />, content: terms.payment_rules },
    { id: 'shipping_rules', label: 'Shipping & Delivery', icon: <Truck size={18} />, content: terms.shipping_rules },
    { id: 'cancellation_terms', label: 'Cancellations & Refunds', icon: <AlertTriangle size={18} />, content: terms.cancellation_terms }
  ];

  const currentTabInfo = tabsConfig.find(tab => tab.id === activeTab);
  const formattedDate = new Date(terms.updated_at).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <main className="w-full min-h-screen bg-white text-gray-800 font-sans py-16" dir="ltr">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Document Header Panel */}
        <div className="border-b border-gray-100 pb-10 mb-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex  font-inter items-center gap-1.5 text-blue-600 bg-blue-50 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
              <ShieldCheck size={14} />
              Legal Framework
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight font-montserrat mt-3">
              {terms.title || "Terms & Conditions"}
            </h1>
          </div>
          <div className="text-sm text-gray-400 font-medium whitespace-nowrap font-inter bg-gray-50 px-4 py-2 rounded-xl border border-gray-100/80 align-middle self-start md:self-auto">
            Last Updated: <span className="text-gray-700">{formattedDate}</span>
          </div>
        </div>

        {/* Dynamic Dual-Column Tabs Core Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Navigation Tab Sidebar Switcher Controller */}
          <nav className="lg:col-span-4 space-y-1 bg-gray-50/50 p-3 rounded-2xl border border-gray-100">
            {tabsConfig.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center font-montserrat gap-3.5 px-4 py-3.5 text-sm font-semibold rounded-xl transition-all cursor-pointer group text-left ${
                    isActive 
                      ? 'bg-blue-600 text-white shadow-sm' 
                      : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100/70'
                  }`}
                >
                  <div className={`transition-colors ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-600'}`}>
                    {tab.icon}
                  </div>
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Core Content Body Reader Display */}
          <div className="lg:col-span-8 bg-gray-50/30 border border-gray-100 p-8 rounded-2xl min-h-[400px]">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100 tracking-tight font-montserrat">
              {currentTabInfo?.label}
            </h2>
            
            <div className="text-gray-600 text-base leading-8 whitespace-pre-line space-y-4">
              {currentTabInfo?.content || (
                <p className="text-gray-400 italic font-inter">No specific conditions recorded under this corporate column section.</p>
              )}
            </div>
          </div>

        </div>

      </div>
    </main>
  );
}
