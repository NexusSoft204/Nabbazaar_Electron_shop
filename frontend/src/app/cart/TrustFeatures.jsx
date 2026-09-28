import React from 'react';
import { Truck, ShieldCheck, CreditCard } from "lucide-react";

const TrustFeatures = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {/* Fast Delivery */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#045FF8] flex items-center justify-center shrink-0">
          <Truck size={19} />
        </div>
        <div>
          <p className="text-xs font-bold text-[#03215B] font-montserrat">Fast Delivery</p>
          <p className="text-[11px] text-slate-400 mt-0.5 font-inter">Quick & reliable shipping</p>
        </div>
      </div>

      {/* Secure Shopping */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-cyan-50 text-cyan-600 flex items-center justify-center shrink-0">
          <ShieldCheck size={19} />
        </div>
        <div>
          <p className="text-xs font-bold text-[#03215B] font-montserrat">Secure Shopping</p>
          <p className="text-[11px] text-slate-400 mt-0.5 font-inter">Safe & protected checkout</p>
        </div>
      </div>

      {/* Secure Payment */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
          <CreditCard size={19} />
        </div>
        <div>
          <p className="text-xs font-bold text-[#03215B] font-montserrat">Secure Payment</p>
          <p className="text-[11px] text-slate-400 mt-0.5 font-inter">Trusted payment methods</p>
        </div>
      </div>
    </div>
  );
};

export default TrustFeatures;
