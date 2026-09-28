import React from "react";
import Link from "next/link";
import {
  ChevronRight,
  ShoppingCart,
  ArrowLeft,
} from "lucide-react";

const EmptyCart = () => {
  return (
    <main className="min-h-screen bg-[#F7F8F9] px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">

        {/* Breadcrumb */}
        <div className="flex font-montserrat items-center gap-2 text-sm text-slate-400 mb-8">
          <Link
            href="/"
            className="hover:text-[#045FF8]"
          >
            Home
          </Link>

          <ChevronRight size={15} />

          <span className="text-slate-600">
            Shopping Cart
          </span>
        </div>

        {/* Empty Cart */}
        <div className="bg-white border border-slate-200 rounded-3xl shadow-sm p-10 sm:p-16 text-center">

          <div
            className="
              w-24
              h-24
              mx-auto
              rounded-full
              bg-blue-50
              text-[#045FF8]
              flex
              items-center
              justify-center
              mb-6
            "
          >
            <ShoppingCart size={42} />
          </div>

          <h1 className="text-2xl font-montserrat sm:text-3xl font-black text-[#03215B]">
            Your Cart is Empty
          </h1>

          <p className="text-slate-500 font-inter mt-3 max-w-md mx-auto leading-relaxed">
            You haven't added any products to your shopping cart yet.
            Explore our products and find something you love.
          </p>

          <Link
            href="/shop"
            className="
              inline-flex
              items-center
              gap-2
              mt-7
              px-7
              py-3.5
              bg-[#045FF8]
              hover:bg-blue-700
              text-white
              font-bold
              rounded-xl
              transition-all
              shadow-lg
              shadow-blue-500/20
            "
          >
            Continue Shopping
            <ArrowLeft size={18} />
          </Link>

        </div>

      </div>
    </main>
  );
};

export default EmptyCart;