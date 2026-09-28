import React from 'react';
import Link from "next/link";
import { ShieldCheck, ArrowLeft } from "lucide-react";

const Sidebar_total = ({ subtotal = 0, totalDiscount = 0, shipping = 0 }) => {
  // ۱. بررسی اینکه آیا ارسال رایگان شامل حال کاربر می‌شود یا خیر
  const isFreeShipping = subtotal >= 4000;
  
  // ۲. تعیین هزینه ارسال نهایی (اگر بالای ۴۰۰۰ بود یا سبد خالی بود -> ۰)
  const finalShipping = (isFreeShipping || subtotal === 0) ? 0 : shipping;

  // ۳. محاسبه دقیق قیمت نهایی
  const finalTotal = subtotal - totalDiscount + finalShipping;

  return (
    <aside className="lg:col-span-4">
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 sticky top-6">
        <h2 className="text-xl font-black font-montserrat text-[#03215B]">
          Order Summary
        </h2>
        
        <div className="mt-6 space-y-4 font-inter">
          {/* Subtotal */}
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500">Subtotal</span>
            <span className="font-bold text-slate-800">
              {subtotal.toLocaleString("fa-IR")} Af
            </span>
          </div>

          {/* Discount */}
          {totalDiscount > 0 && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500">Discount</span>
              <span className="font-bold text-emerald-600">
                - {totalDiscount.toLocaleString("fa-IR")} Af
              </span>
            </div>
          )}

          {/* Shipping */}
          <div className="flex items-center justify-between text-sm font-inter">
            <span className="text-slate-500">Shipping</span>
            <span className="font-bold text-slate-800">
              {finalShipping === 0 ? "FREE" : `${finalShipping.toLocaleString("fa-IR")} Af`}
            </span>
          </div>
        </div>

        {/* Free Shipping Message */}
        {!isFreeShipping && subtotal > 0 && (
          <div className="mt-5 p-3 bg-blue-50 border border-blue-100 rounded-xl">
            <p className="text-xs font-inter text-blue-700 leading-relaxed">
              Add <strong>{(4000 - subtotal).toLocaleString("fa-IR")} Af</strong> more to get free shipping.
            </p>
          </div>
        )}

        {/* Divider */}
        <div className="border-t border-slate-100 my-6" />

        {/* Total */}
        <div className="flex items-end justify-between font-inter">
          <div>
            <p className="text-sm font-bold text-[#03215B]">Total</p>
            <p className="text-xs text-slate-400 mt-1">Including shipping</p>
          </div>
          <div className="text-right">
            <span className="text-2xl font-black text-[#045FF8]">
              {finalTotal.toLocaleString("fa-IR")}
            </span>
            <span className="text-sm font-bold text-slate-400 ml-1">Af</span>
          </div>
        </div>

        {/* Checkout Button */}
        <Link 
          href="/Checkout" 
          className="mt-6 w-full h-14 flex items-center justify-center gap-2 bg-[#045FF8] hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-xl transition-all active:scale-[0.99] font-montserrat"
        >
          Proceed to Checkout <ArrowLeft size={18} />
        </Link>

        {/* Secure Checkout */}
        <div className="mt-5 font-inter flex items-center justify-center gap-2 text-xs text-slate-400">
          <ShieldCheck size={15} />
          <span>Secure checkout</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar_total;
