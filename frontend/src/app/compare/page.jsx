"use client";

import React from "react";
import Link from "next/link";

import {
  Scale,
  ArrowLeft,
  ShoppingBag,
  Home,
  Sparkles,
  GitCompare,
  Smartphone,
  CheckCircle2,
} from "lucide-react";

const Compare = () => {
  return (
    <main className="relative min-h-screen overflow-hidden bg-white px-4 py-10 sm:px-6 lg:px-8">

      {/* =========================================================
          Background Decorations
      ========================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -left-32
          -top-32
          h-80
          w-80
          rounded-full
          bg-cyan-100/70
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-40
          -right-40
          h-[420px]
          w-[420px]
          rounded-full
          bg-blue-100/70
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-72
          w-72
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-purple-50
          blur-3xl
        "
      />

      {/* Grid Background */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.035]
        "
        style={{
          backgroundImage: `
            linear-gradient(#0f172a 1px, transparent 1px),
            linear-gradient(90deg, #0f172a 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* =========================================================
          Main Content
      ========================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          flex
          min-h-[calc(100vh-5rem)]
          w-full
          max-w-5xl
          flex-col
          items-center
          justify-center
          text-center
        "
      >

        {/* =======================================================
            Status Badge
        ======================================================== */}

        <div
          className="
            mb-7
            inline-flex
            items-center
            gap-2
            rounded-full
            border
            border-blue-100
            bg-blue-50
            px-4
            py-2
            shadow-sm
          "
        >

          <Sparkles
            size={15}
            className="text-blue-500"
          />

          <span
            className="
              text-[11px]
              font-bold
              tracking-[0.16em]
              text-blue-600
              font-montserrat
            "
          >
            COMING SOON
          </span>

        </div>


        {/* =======================================================
            Main Icon
        ======================================================== */}

        <div className="relative mb-7">

          {/* Glow */}

          <div
            className="
              absolute
              inset-0
              rounded-[2rem]
              bg-cyan-200/40
              blur-2xl
            "
          />

          {/* Icon Container */}

          <div
            className="
              relative
              flex
              h-24
              w-24
              items-center
              justify-center
              rounded-[2rem]
              border
              border-cyan-100
              bg-white
              text-cyan-500
              shadow-2xl
              shadow-cyan-100
              sm:h-28
              sm:w-28
            "
          >

            <Scale
              size={48}
              strokeWidth={1.6}
              className="sm:h-14 sm:w-14"
            />

          </div>

          {/* Small Floating Icon */}

          <div
            className="
              absolute
              -right-5
              -top-4
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              border
              border-blue-100
              bg-white
              text-blue-500
              shadow-lg
            "
          >

            <GitCompare size={19} />

          </div>

        </div>


        {/* =======================================================
            Heading
        ======================================================== */}

        <div className="max-w-2xl">

          <h1
            className="
              font-montserrat
              text-3xl
              font-black
              tracking-tight
              text-slate-900
              sm:text-5xl
              lg:text-6xl
            "
          >
            Product Comparison
          </h1>

          <p
            className="
              mx-auto
              mt-5
              max-w-xl
              text-sm
              leading-7
              text-slate-500
              sm:text-base
            "
          >
            We&apos;re working on something exciting.
            The product comparison feature is currently
            under development and will be available soon.
          </p>

        </div>


        {/* =======================================================
            Development Card
        ======================================================== */}

        <div
          className="
            mt-9
            w-full
            max-w-2xl
            rounded-3xl
            border
            border-slate-200
            bg-white
            p-6
            text-left
            shadow-xl
            shadow-slate-200/60
            sm:p-8
          "
        >

          {/* Header */}

          <div
            className="
              flex
              items-center
              gap-4
            "
          >

            <div
              className="
                flex
                h-12
                w-12
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-cyan-50
                text-cyan-500
              "
            >
              <GitCompare size={23} />
            </div>

            <div>

              <h2
                className="
                  text-base
                  font-bold
                  text-slate-900
                "
              >
                Compare products side by side
              </h2>

              <p
                className="
                  mt-1
                  text-xs
                  text-slate-400
                "
              >
                Make better shopping decisions with ease.
              </p>

            </div>

          </div>


          {/* Features */}

          <div
            className="
              mt-6
              grid
              gap-3
              sm:grid-cols-3
            "
          >

            {/* Feature 1 */}

            <div
              className="
                rounded-2xl
                border
                border-slate-100
                bg-slate-50
                p-4
              "
            >

              <Smartphone
                size={20}
                className="mb-3 text-blue-500"
              />

              <p
                className="
                  text-sm
                  font-bold
                  text-slate-800
                "
              >
                Compare Products
              </p>

              <p
                className="
                  mt-1
                  text-xs
                  leading-5
                  text-slate-400
                "
              >
                Compare multiple products together.
              </p>

            </div>


            {/* Feature 2 */}

            <div
              className="
                rounded-2xl
                border
                border-slate-100
                bg-slate-50
                p-4
              "
            >

              <Scale
                size={20}
                className="mb-3 text-cyan-500"
              />

              <p
                className="
                  text-sm
                  font-bold
                  text-slate-800
                "
              >
                See Differences
              </p>

              <p
                className="
                  mt-1
                  text-xs
                  leading-5
                  text-slate-400
                "
              >
                Easily compare important specifications.
              </p>

            </div>


            {/* Feature 3 */}

            <div
              className="
                rounded-2xl
                border
                border-slate-100
                bg-slate-50
                p-4
              "
            >

              <CheckCircle2
                size={20}
                className="mb-3 text-emerald-500"
              />

              <p
                className="
                  text-sm
                  font-bold
                  text-slate-800
                "
              >
                Shop Smarter
              </p>

              <p
                className="
                  mt-1
                  text-xs
                  leading-5
                  text-slate-400
                "
              >
                Choose the product that fits you best.
              </p>

            </div>

          </div>


          {/* Progress */}

          <div className="mt-7">

            <div
              className="
                mb-2
                flex
                items-center
                justify-between
                text-xs
              "
            >

              <span className="font-semibold text-slate-600">
                Development in progress
              </span>

              <span className="font-bold text-cyan-600">
                Coming Soon
              </span>

            </div>

            <div
              className="
                h-2
                overflow-hidden
                rounded-full
                bg-slate-100
              "
            >

              <div
                className="
                  h-full
                  w-[65%]
                  rounded-full
                  bg-gradient-to-r
                  from-cyan-400
                  to-blue-600
                "
              />

            </div>

          </div>

        </div>


        {/* =======================================================
            Buttons
        ======================================================== */}

        <div
          className="
            mt-7
            flex
            w-full
            max-w-xl
            flex-col
            gap-3
            sm:flex-row
            sm:justify-center
          "
        >

          {/* Home */}

          <Link
            href="/"
            className="
              group
              flex
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-slate-900
              px-6
              py-3.5
              text-sm
              font-bold
              text-white
              shadow-lg
              shadow-slate-200
              transition-all
              hover:-translate-y-0.5
              hover:bg-slate-800
              hover:shadow-xl
              active:scale-95
              font-montserrat
            "
          >

            <Home size={18} />

            Back to Home

            <ArrowLeft
              size={17}
              className="
                transition-transform
                duration-300
                group-hover:-translate-x-1
              "
            />

          </Link>


          {/* Shop */}

          <Link
            href="/shop"
            className="
              group
              flex
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-slate-200
              bg-white
              px-6
              py-3.5
              text-sm
              font-bold
              text-slate-700
              shadow-sm
              transition-all
              hover:-translate-y-0.5
              hover:border-cyan-200
              hover:bg-cyan-50
              hover:text-cyan-600
              hover:shadow-lg
              active:scale-95
              font-montserrat
            "
          >

            <ShoppingBag size={18} />

            Continue Shopping

          </Link>

        </div>


        {/* =======================================================
            Footer Status
        ======================================================== */}

        <div
          className="
            mt-9
            flex
            items-center
            gap-2
            rounded-full
            border
            border-slate-100
            bg-slate-50
            px-4
            py-2
            text-xs
            text-slate-400
          "
        >

          <span
            className="
              h-2
              w-2
              rounded-full
              bg-emerald-500
            "
          />

          <span>
            This feature will be available soon
          </span>

        </div>


        {/* Copyright */}

        <p
          className="
            mt-6
            text-[11px]
            text-slate-400
          "
        >
          © {new Date().getFullYear()} NabBazaar. All rights reserved.
        </p>

      </div>
    </main>
  );
};

export default Compare;