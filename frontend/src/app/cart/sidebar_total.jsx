"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, ArrowLeft } from "lucide-react";

const Sidebar_total = ({
  subtotal = 0,
  totalDiscount = 0,
}) => {
  // مجموع قیمت محصولات پس از تخفیف
  const finalTotal = subtotal;

  const formatPrice = (price) =>
    Number(price || 0).toLocaleString("fa-IR");

  return (
    <aside className="lg:col-span-4">
      <div className="sticky top-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="font-montserrat text-xl font-black text-[#03215B]">
          Order Summary
        </h2>

        <div className="mt-6 space-y-4 font-inter">
          {/* Subtotal */}
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500">Subtotal</span>
            <span className="font-bold text-slate-800">
              {formatPrice(subtotal)} Af
            </span>
          </div>

          {/* Discount */}
          {totalDiscount > 0 && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500">Discount</span>
              <span className="font-bold text-emerald-600">
                - {formatPrice(totalDiscount)} Af
              </span>
            </div>
          )}
        </div>

        <div className="my-6 border-t border-slate-100" />

        {/* Total */}
        <div className="flex items-end justify-between font-inter">
          <div>
            <p className="text-sm font-bold text-[#03215B]">
              Total
            </p>
          </div>

          <div className="text-right">
            <span className="text-2xl font-black text-[#045FF8]">
              {formatPrice(finalTotal)}
            </span>
            <span className="ml-1 text-sm font-bold text-slate-400">
              Af
            </span>
          </div>
        </div>

        {/* Checkout */}
        <Link
          href="/Checkout"
          className="mt-6 flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-[#045FF8] font-montserrat font-bold text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-blue-700 hover:shadow-xl active:scale-[0.99]"
        >
          Proceed to Checkout
          <ArrowLeft size={18} />
        </Link>

        {/* Secure checkout */}
        <div className="mt-5 flex items-center justify-center gap-2 font-inter text-xs text-slate-400">
          <ShieldCheck size={15} />
          <span>Secure checkout</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar_total;
