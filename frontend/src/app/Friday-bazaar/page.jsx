"use client";

import React, { useEffect, useState } from "react";
import {
  ArrowRight,
  Clock,
  Flame,
  ShoppingBag,
  Sparkles,
  Tag,
  Zap,
} from "lucide-react";
import Link from "next/link";

const categories = [
  { name: "All Deals", icon: "✨" },
  { name: "Electronics", icon: "🎧" },
  { name: "Mobiles", icon: "📱" },
  { name: "Fashion", icon: "👟" },
  { name: "Home & Living", icon: "🏠" },
];

const deals = [
  {
    id: 1,
    name: "Wireless Headphones",
    category: "Electronics",
    price: 1499,
    oldPrice: 2199,
    discount: 32,
    image: "🎧",
    color: "bg-purple-50",
    badge: "BEST SELLER",
  },
  {
    id: 2,
    name: "Smartphone Pro",
    category: "Mobiles",
    price: 12999,
    oldPrice: 15999,
    discount: 19,
    image: "📱",
    color: "bg-blue-50",
    badge: "HOT DEAL",
  },
  {
    id: 3,
    name: "Everyday Sneakers",
    category: "Fashion",
    price: 1899,
    oldPrice: 2599,
    discount: 27,
    image: "👟",
    color: "bg-orange-50",
    badge: "TRENDING",
  },
  {
    id: 4,
    name: "Smart Watch",
    category: "Electronics",
    price: 2499,
    oldPrice: 3299,
    discount: 24,
    image: "⌚",
    color: "bg-cyan-50",
    badge: "LIMITED DEAL",
  },
];

const formatPrice = (price) => new Intl.NumberFormat("en-US").format(price);

const FridayBazaar = () => {
  const [activeCategory, setActiveCategory] = useState("All Deals");
  const [timeLeft, setTimeLeft] = useState({
    hours: 12,
    minutes: 45,
    seconds: 30,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        }

        if (prev.minutes > 0) {
          return {
            ...prev,
            minutes: prev.minutes - 1,
            seconds: 59,
          };
        }

        if (prev.hours > 0) {
          return {
            hours: prev.hours - 1,
            minutes: 59,
            seconds: 59,
          };
        }

        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const filteredDeals =
    activeCategory === "All Deals"
      ? deals
      : deals.filter((deal) => deal.category === activeCategory);

  return (
    <main className="min-h-screen w-full bg-gray-50 pb-16">
      <div className="mx-auto my-6 max-w-[1440px] px-4 sm:px-6 lg:my-10 lg:px-8">
        {/* Hero Banner */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#003366] via-[#172b68] to-[#663399] px-5 py-10 text-white sm:px-10 sm:py-14 lg:px-16 lg:py-16">
          <div className="pointer-events-none absolute -right-12 -top-16 h-64 w-64 rounded-full bg-[#00c8ff]/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 left-1/3 h-64 w-64 rounded-full bg-purple-400/20 blur-3xl" />

          <div className="relative z-10 grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold tracking-[0.18em] text-cyan-200">
                <Sparkles size={15} />
                YOUR WEEKLY SHOPPING EVENT
              </span>

              <h1 className="mt-6 text-4xl font-black leading-tight sm:text-5xl lg:text-7xl">
                Friday
                <span className="block text-[#00c8ff]">Bazaar.</span>
              </h1>

              <p className="mt-5 max-w-xl text-base leading-7 text-blue-100 sm:text-lg">
                Your favorite finds. Unmissable prices. Make every Friday
                count with amazing deals across your favorite categories.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#friday-deals"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#00c8ff] px-6 py-3.5 font-bold text-[#003366] transition hover:bg-white"
                >
                  Explore Deals <ArrowRight size={18} />
                </a>

                <div className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-3">
                  <Flame size={20} className="text-orange-300" />
                  <span className="text-sm font-semibold">
                    Deals worth grabbing
                  </span>
                </div>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-md">
              <div className="absolute inset-5 rounded-full bg-[#00c8ff]/20 blur-2xl" />

              <div className="relative rounded-3xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-md sm:p-8">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold tracking-widest text-cyan-200">
                    THE FRIDAY COUNTDOWN
                  </span>
                  <Clock size={20} />
                </div>

                <p className="mt-3 text-sm text-blue-100">
                  Don&apos;t miss your favorite deals!
                </p>

                <div className="mt-6 grid grid-cols-3 gap-3">
                  {[
                    {
                      value: String(timeLeft.hours).padStart(2, "0"),
                      label: "HOURS",
                    },
                    {
                      value: String(timeLeft.minutes).padStart(2, "0"),
                      label: "MINUTES",
                    },
                    {
                      value: String(timeLeft.seconds).padStart(2, "0"),
                      label: "SECONDS",
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-2xl bg-white px-2 py-4 text-center text-[#003366]"
                    >
                      <div className="text-3xl font-black sm:text-4xl">
                        {item.value}
                      </div>
                      <div className="mt-1 text-[10px] font-bold tracking-wider text-gray-500">
                        {item.label}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-orange-400/15 px-4 py-3 text-sm font-semibold text-orange-100">
                  <Zap size={17} />
                  Great deals. While they last.
                </div>
              </div>

              <div className="absolute -right-2 -top-5 flex h-20 w-20 rotate-12 flex-col items-center justify-center rounded-full bg-[#00c8ff] text-[#003366] shadow-lg sm:-right-5">
                <span className="text-xs font-black">FRIDAY</span>
                <span className="text-lg font-black">DEALS</span>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {[
            {
              icon: <Tag size={22} />,
              title: "Special Friday Prices",
              description: "Discover deals across popular categories.",
            },
            {
              icon: <ShoppingBag size={22} />,
              title: "Shop Your Favorites",
              description: "Find something great for every day.",
            },
            {
              icon: <Zap size={22} />,
              title: "Limited-Time Offers",
              description: "Check back for fresh weekly deals.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#003366]">
                {item.icon}
              </div>
              <div>
                <h2 className="font-bold text-gray-900">{item.title}</h2>
                <p className="mt-1 text-sm text-gray-500">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </section>

        {/* Deals Section */}
        <section id="friday-deals" className="mt-12 scroll-mt-6 sm:mt-16">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className="text-xs font-extrabold tracking-[0.2em] text-purple-600">
                HANDPICKED FOR YOU
              </span>
              <h2 className="mt-2 text-2xl font-black text-gray-900 sm:text-3xl">
                Friday&apos;s Best Deals
              </h2>
              <p className="mt-2 text-sm text-gray-500 sm:text-base">
                Explore exciting finds at prices you&apos;ll love.
              </p>
            </div>

            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#003366] transition hover:text-purple-600"
            >
              View All Products <ArrowRight size={17} />
            </Link>
          </div>

          {/* Category Filters */}
          <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category.name}
                type="button"
                onClick={() => setActiveCategory(category.name)}
                className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition ${
                  activeCategory === category.name
                    ? "border-[#003366] bg-[#003366] text-white shadow-md"
                    : "border-gray-200 bg-white text-gray-600 hover:border-purple-300 hover:text-purple-700"
                }`}
              >
                <span>{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>

          {/* Product Cards */}
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
            {filteredDeals.map((product) => (
              <article
                key={product.id}
                className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div
                  className={`relative flex h-36 items-center justify-center sm:h-48 ${product.color}`}
                >
                  <span className="absolute left-3 top-3 rounded-md bg-red-500 px-2 py-1 text-[10px] font-extrabold text-white">
                    -{product.discount}%
                  </span>

                  <span className="absolute right-3 top-3 rounded-md bg-white/80 px-2 py-1 text-[9px] font-extrabold tracking-wide text-gray-600">
                    {product.badge}
                  </span>

                  <span className="select-none text-6xl transition duration-300 group-hover:scale-110 sm:text-7xl">
                    {product.image}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-3 sm:p-4">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-purple-600">
                    {product.category}
                  </p>

                  <h3 className="mt-2 line-clamp-2 min-h-10 text-sm font-bold text-gray-800 sm:text-base">
                    {product.name}
                  </h3>

                  <div className="mt-3 flex flex-wrap items-baseline gap-2">
                    <span className="text-base font-black text-[#003366] sm:text-lg">
                      AFN {formatPrice(product.price)}
                    </span>
                    <span className="text-xs text-gray-400 line-through">
                      AFN {formatPrice(product.oldPrice)}
                    </span>
                  </div>

                  <p className="mt-2 text-xs font-semibold text-green-600">
                    You save AFN{" "}
                    {formatPrice(product.oldPrice - product.price)}
                  </p>

                  <Link
                    href="/shop"
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#003366] px-3 py-3 text-xs font-bold text-white transition hover:bg-purple-700 sm:text-sm"
                  >
                    Shop Now <ArrowRight size={15} />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {filteredDeals.length === 0 && (
            <div className="mt-6 rounded-2xl border border-dashed border-gray-300 bg-white py-14 text-center">
              <ShoppingBag
                size={36}
                className="mx-auto text-gray-300"
              />
              <h3 className="mt-4 font-bold text-gray-800">
                More deals coming soon!
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Check another category to discover more products.
              </p>
            </div>
          )}
        </section>

        {/* Bottom Banner */}
        <section className="relative mt-12 overflow-hidden rounded-3xl bg-gradient-to-r from-purple-700 to-[#003366] px-6 py-9 text-white sm:mt-16 sm:px-10 sm:py-12">
          <div className="relative z-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <p className="text-xs font-bold tracking-[0.2em] text-cyan-200">
                YOUR NEXT FAVORITE FIND IS HERE
              </p>
              <h2 className="mt-3 text-2xl font-black sm:text-3xl">
                Make Friday a little more exciting.
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-6 text-purple-100 sm:text-base">
                Explore the marketplace and discover products made for you.
              </p>
            </div>

            <Link
              href="/shop"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 font-bold text-[#003366] transition hover:bg-cyan-100"
            >
              Start Shopping <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
};

export default FridayBazaar;


// https://chatgpt.com/c/6aca2254-ad08-83ee-bcbc-47f07e55f49c   