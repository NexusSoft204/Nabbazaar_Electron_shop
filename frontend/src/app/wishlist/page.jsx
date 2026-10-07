"use client";

import React from "react";
import Link from "next/link";
import {
  Heart,
  ArrowLeft,
  ShoppingBag,
  Home,
  Sparkles,
  Star,
  Bookmark,
  CheckCircle2,
} from "lucide-react";

const Wishlist = () => {
  return (
    <main className="relative min-h-screen overflow-hidden bg-white">
      {/* Background Effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-cyan-100/60 blur-3xl" />

        <div className="absolute -right-32 top-20 h-96 w-96 rounded-full bg-blue-100/60 blur-3xl" />

        <div className="absolute bottom-0 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-purple-100/40 blur-3xl" />

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(#0f172a 1px, transparent 1px), linear-gradient(90deg, #0f172a 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="w-full max-w-5xl">

          {/* Badge */}
          <div className="mb-8 flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-pink-200 bg-pink-50 px-4 py-2 text-xs font-bold tracking-wide text-pink-600 shadow-sm sm:text-sm">
              <Sparkles className="h-4 w-4" />
              <span>COMING SOON</span>
            </div>
          </div>

          {/* Main Card */}
          <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-10 lg:p-14">

            {/* Decorative Heart - Top Right */}
            <div className="pointer-events-none absolute right-6 top-6 hidden opacity-[0.07] sm:block">
              <Heart className="h-32 w-32 fill-pink-500 text-pink-500" />
            </div>

            {/* Decorative Heart - Bottom Left */}
            <div className="pointer-events-none absolute bottom-6 left-6 hidden opacity-[0.05] sm:block">
              <Heart className="h-24 w-24 fill-cyan-500 text-cyan-500" />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center">

              {/* Main Icon */}
              <div className="mx-auto mb-7 flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-pink-500 via-rose-500 to-purple-600 shadow-lg shadow-pink-200">
                <Heart className="h-12 w-12 fill-white text-white" />
              </div>

              {/* Heading */}
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                Your Wishlist
              </h1>

              {/* Description */}
              <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base lg:text-lg">
                Save your favorite products and keep them in one place.
                We&apos;re currently working on a better wishlist experience
                for you.
              </p>

              {/* Feature Cards */}
              <div className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-3">

                {/* Feature 1 */}
                <div className="group rounded-2xl border border-slate-200 bg-slate-50/70 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-pink-200 hover:bg-pink-50/50 hover:shadow-lg hover:shadow-pink-100/50">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-pink-100 text-pink-600 transition-transform duration-300 group-hover:scale-110">
                    <Heart className="h-6 w-6" />
                  </div>

                  <h3 className="font-bold text-slate-800">
                    Save Favorites
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Keep the products you love for later.
                  </p>
                </div>

                {/* Feature 2 */}
                <div className="group rounded-2xl border border-slate-200 bg-slate-50/70 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:bg-blue-50/50 hover:shadow-lg hover:shadow-blue-100/50">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600 transition-transform duration-300 group-hover:scale-110">
                    <Bookmark className="h-6 w-6" />
                  </div>

                  <h3 className="font-bold text-slate-800">
                    Easy Access
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Find your saved products whenever you need them.
                  </p>
                </div>

                {/* Feature 3 */}
                <div className="group rounded-2xl border border-slate-200 bg-slate-50/70 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-purple-200 hover:bg-purple-50/50 hover:shadow-lg hover:shadow-purple-100/50">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-purple-600 transition-transform duration-300 group-hover:scale-110">
                    <Star className="h-6 w-6" />
                  </div>

                  <h3 className="font-bold text-slate-800">
                    Shop Smarter
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Keep track of products you want to buy later.
                  </p>
                </div>
              </div>

              {/* Development Progress */}
              <div className="mx-auto mt-10 max-w-xl">

                <div className="mb-3 flex items-center justify-between text-xs sm:text-sm">
                  <span className="font-semibold text-slate-700">
                    Development in progress
                  </span>

                  <span className="font-semibold text-pink-600">
                    Coming Soon
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500" />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">

                {/* Home */}
                <Link
                  href="/"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-slate-200 transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-xl"
                >
                  <Home className="h-4 w-4" />
                  Back to Home
                </Link>

                {/* Shop */}
                <Link
                  href="/shop"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-200 transition-all duration-300 hover:-translate-y-0.5 hover:from-cyan-600 hover:to-blue-700 hover:shadow-xl"
                >
                  <ShoppingBag className="h-4 w-4" />

                  Continue Shopping

                  <ArrowLeft className="h-4 w-4 rotate-180" />
                </Link>
              </div>

              {/* Status */}
              <div className="mt-10 flex items-center justify-center gap-2 text-xs text-slate-500 sm:text-sm">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />

                <span>
                  This feature will be available soon
                </span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center text-xs text-slate-400">
            © {new Date().getFullYear()} Nabbazaar. All rights reserved.
          </div>
        </div>
      </div>
    </main>
  );
};

export default Wishlist;