"use client";
import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

export default function FaqAccordionWrapper({ faqs }) {
  const [openId, setOpenId] = useState(null);

  const toggleFaq = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="space-y-4">
      {faqs.map((faq) => {
        const isOpen = openId === faq.id;
        
        return (
          <div 
            key={faq.id}
            className="group rounded-2xl border border-[var(--color-deep-navy)] bg-deep-navy transition-all duration-300 overflow-hidden"
            style={{
              borderColor: isOpen ? 'var(--color-primary-blue)' : 'var(--color-deep-navy)',
              boxShadow: isOpen ? '0 4px 20px -5px rgba(4, 95, 248, 0.15)' : 'none'
            }}
          >
            {/* Interactive Header Toggler Button */}
            <button
              onClick={() => toggleFaq(faq.id)}
              className="w-full flex items-center justify-between gap-4 p-6 text-left font-montserrat text-base sm:text-lg transition-colors cursor-pointer group-hover:text-white"
              style={{ color: isOpen ? 'var(--color-bright-white)' : 'var(--color-metallic-silver)' }}
            >
              <span>{faq.title}</span>
              <div 
                className="p-1.5 rounded-lg border transition-all duration-300 shrink-0"
                style={{
                  backgroundColor: isOpen ? 'var(--color-primary-blue)' : 'transparent',
                  borderColor: isOpen ? 'var(--color-primary-blue)' : 'var(--color-deep-navy)'
                }}
              >
                {isOpen ? (
                  <Minus size={16} className="text-white" />
                ) : (
                  <Plus size={16} className="text-[var(--color-metallic-silver)]" />
                )}
              </div>
            </button>

            {/* Collapsible content description module */}
            <div 
              className="transition-all duration-300 ease-in-out"
              style={{
                maxHeight: isOpen ? '500px' : '0px',
                opacity: isOpen ? 1 : 0,
                visibility: isOpen ? 'visible' : 'hidden'
              }}
            >
              <div className="px-6 pb-6 pt-2 text-[10px] sm:text-base leading-8 border-t border-deep-navy/40 whitespace-pre-line text-metallic-silver font-inter">
                {faq.description}
              </div>
            </div>

          </div>
        );
      })}
    </div>
  );
}
