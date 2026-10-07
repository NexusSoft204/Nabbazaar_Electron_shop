"use client";

import Link from "next/link";
import { useState } from "react";

import {
  House,
  Search,
  Smartphone,
  Cpu,
  Wifi,
  ArrowLeft,
  Satellite,
  ShoppingBag,
  ArrowRight,
  PackageSearch,
} from "lucide-react";

const NotFound = () => {
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();

    const query = search.trim();

    if (!query) return;

    window.location.href = `/shop?search=${encodeURIComponent(query)}`;
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-white px-4 py-10 sm:px-6 lg:px-8">

      {/* =========================================================
          Background Decorations
      ========================================================== */}

      {/* Top Left Glow */}
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

      {/* Bottom Right Glow */}
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

      {/* Purple Glow */}
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

      {/* Grid */}
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
            border-cyan-100
            bg-cyan-50
            px-4
            py-2
            shadow-sm
          "
        >
          <span className="relative flex h-2.5 w-2.5">
            <span
              className="
                absolute
                inline-flex
                h-full
                w-full
                animate-ping
                rounded-full
                bg-cyan-400
                opacity-50
              "
            />

            <span
              className="
                relative
                inline-flex
                h-2.5
                w-2.5
                rounded-full
                bg-cyan-500
              "
            />
          </span>

          <span
            className="
              text-[11px]
              font-bold
              tracking-[0.18em]
              text-cyan-600
              font-montserrat
            "
          >
            PAGE NOT FOUND
          </span>
        </div>


        {/* =======================================================
            404 Number
        ======================================================== */}

        <div className="relative mb-7">

          {/* Floating Left Icon */}

          <div
            className="
              absolute
              -left-7
              top-5
              hidden
              -rotate-12
              rounded-2xl
              border
              border-blue-100
              bg-white
              p-3
              text-blue-500
              shadow-xl
              shadow-blue-100
              sm:block
              lg:-left-20
            "
          >
            <Smartphone
              size={24}
              strokeWidth={1.8}
            />
          </div>


          {/* 404 */}

          <h1
            className="
              flex
              items-center
              justify-center
              text-[105px]
              font-black
              leading-none
              tracking-[-0.08em]
              text-slate-900
              sm:text-[160px]
              lg:text-[210px]
            "
          >

            {/* First 4 */}

            <span
              className="
                bg-gradient-to-b
                from-slate-900
                to-slate-600
                bg-clip-text
                text-transparent
              "
            >
              4
            </span>


            {/* Center */}

            <span className="relative mx-1 inline-flex">

              <span
                className="
                  relative
                  z-10
                  flex
                  h-[0.72em]
                  w-[0.72em]
                  items-center
                  justify-center
                  rounded-full
                  border-[7px]
                  border-cyan-400
                  bg-white
                  shadow-[0_10px_40px_rgba(6,182,212,0.18)]
                  sm:border-[9px]
                "
              >

                <Search
                  className="
                    text-cyan-500
                    sm:h-14
                    sm:w-14
                  "
                  size={35}
                />

              </span>

              {/* Ring */}

              <span
                className="
                  absolute
                  inset-[-12px]
                  rounded-full
                  border
                  border-cyan-100
                  sm:inset-[-18px]
                "
              />

            </span>


            {/* Last 4 */}

            <span
              className="
                bg-gradient-to-b
                from-slate-900
                to-blue-600
                bg-clip-text
                text-transparent
              "
            >
              4
            </span>

          </h1>


          {/* Floating Right Icon */}

          <div
            className="
              absolute
              -right-7
              bottom-4
              hidden
              rotate-12
              rounded-2xl
              border
              border-purple-100
              bg-white
              p-3
              text-purple-500
              shadow-xl
              shadow-purple-100
              sm:block
              lg:-right-20
            "
          >
            <Cpu
              size={24}
              strokeWidth={1.8}
            />
          </div>

        </div>


        {/* =======================================================
            Heading
        ======================================================== */}

        <div className="max-w-2xl">

          <h2
            className="
              font-montserrat
              text-2xl
              font-black
              tracking-tight
              text-slate-900
              sm:text-4xl
              lg:text-5xl
            "
          >
            Oops! We can&apos;t find that page.
          </h2>

          <p
            className="
              mx-auto
              mt-4
              max-w-xl
              text-sm
              leading-7
              text-slate-500
              sm:text-base
            "
          >
            The page you are looking for may have been moved,
            removed, or the URL may be incorrect. Don&apos;t worry,
            there are plenty of great products waiting for you.
          </p>

        </div>


        {/* =======================================================
            Search Box
        ======================================================== */}

        <form
          onSubmit={handleSearch}
          className="
            mt-8
            flex
            w-full
            max-w-xl
            items-center
            gap-2
            rounded-2xl
            border
            border-slate-200
            bg-white
            p-2
            shadow-xl
            shadow-slate-200/60
            transition-all
            focus-within:border-cyan-300
            focus-within:shadow-cyan-100
          "
        >

          {/* Search Icon */}

          <div
            className="
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-cyan-50
              text-cyan-500
            "
          >
            <Search size={20} />
          </div>


          {/* Input */}

          <input
            type="text"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search for products..."
            className="
              h-11
              min-w-0
              flex-1
              bg-transparent
              px-2
              text-sm
              text-slate-800
              outline-none
              placeholder:text-slate-400
            "
          />


          {/* Search Button */}

          <button
            type="submit"
            className="
              flex
              h-11
              shrink-0
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-gradient-to-r
              from-cyan-500
              to-blue-600
              px-4
              text-sm
              font-bold
              text-white
              shadow-lg
              shadow-blue-200
              transition-all
              hover:-translate-y-0.5
              hover:shadow-xl
              hover:shadow-blue-200
              active:scale-95
            "
          >
            <span className="hidden sm:inline">
              Search
            </span>

            <Search
              size={17}
              className="sm:hidden"
            />

          </button>

        </form>


        {/* =======================================================
            Action Buttons
        ======================================================== */}

        <div
          className="
            mt-6
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

            <House size={18} />

            <span>
              Back to Home
            </span>

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

            <span>
              Explore Shop
            </span>

            <ArrowRight
              size={17}
              className="
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
            />

          </Link>

        </div>


        {/* =======================================================
            Quick Links
        ======================================================== */}

        <div
          className="
            mt-10
            grid
            w-full
            max-w-2xl
            grid-cols-1
            gap-3
            sm:grid-cols-3
          "
        >

          {/* New Arrivals */}

          <Link
            href="/new-Arrivals"
            className="
              group
              rounded-2xl
              border
              border-slate-100
              bg-white
              p-4
              text-left
              shadow-sm
              transition-all
              hover:-translate-y-1
              hover:border-cyan-100
              hover:shadow-lg
            "
          >

            <div
              className="
                mb-3
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-lg
                bg-cyan-50
                text-cyan-500
              "
            >
              <PackageSearch size={18} />
            </div>

            <p
              className="
                text-sm
                font-bold
                text-slate-800
              "
            >
              New Arrivals
            </p>

            <p
              className="
                mt-1
                text-xs
                text-slate-400
              "
            >
              Discover the latest products
            </p>

          </Link>


          {/* Best Sellers */}

          <Link
            href="/best-sellers"
            className="
              group
              rounded-2xl
              border
              border-slate-100
              bg-white
              p-4
              text-left
              shadow-sm
              transition-all
              hover:-translate-y-1
              hover:border-blue-100
              hover:shadow-lg
            "
          >

            <div
              className="
                mb-3
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-lg
                bg-blue-50
                text-blue-500
              "
            >
              <Smartphone size={18} />
            </div>

            <p
              className="
                text-sm
                font-bold
                text-slate-800
              "
            >
              Best Sellers
            </p>

            <p
              className="
                mt-1
                text-xs
                text-slate-400
              "
            >
              Shop our most popular items
            </p>

          </Link>


          {/* Deals */}

          <Link
            href="/deals"
            className="
              group
              rounded-2xl
              border
              border-slate-100
              bg-white
              p-4
              text-left
              shadow-sm
              transition-all
              hover:-translate-y-1
              hover:border-purple-100
              hover:shadow-lg
            "
          >

            <div
              className="
                mb-3
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-lg
                bg-purple-50
                text-purple-500
              "
            >
              <Satellite size={18} />
            </div>

            <p
              className="
                text-sm
                font-bold
                text-slate-800
              "
            >
              Special Deals
            </p>

            <p
              className="
                mt-1
                text-xs
                text-slate-400
              "
            >
              Find great deals and offers
            </p>

          </Link>

        </div>


        {/* =======================================================
            System Information
        ======================================================== */}

        <div
          className="
            mt-8
            flex
            flex-wrap
            items-center
            justify-center
            gap-3
            text-xs
            text-slate-400
          "
        >

          <div
            className="
              flex
              items-center
              gap-2
              rounded-full
              border
              border-slate-100
              bg-slate-50
              px-3
              py-2
            "
          >
            <Wifi
              size={14}
              className="text-emerald-500"
            />

            <span>
              Connection Active
            </span>
          </div>


          <div
            className="
              flex
              items-center
              gap-2
              rounded-full
              border
              border-slate-100
              bg-slate-50
              px-3
              py-2
            "
          >
            <Satellite
              size={14}
              className="text-blue-500"
            />

            <span>
              Route Not Found
            </span>
          </div>

        </div>


        {/* =======================================================
            Footer
        ======================================================== */}

        <p
          className="
            mt-7
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

export default NotFound;