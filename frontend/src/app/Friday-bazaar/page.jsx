"use client";
import { useBasket } from "@/context/BasketContext";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import {
  ArrowRight,
  Clock,
  Flame,
  ShoppingBag,
  Sparkles,
  Tag,
  Zap,
  RefreshCw,
} from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "");

const CATEGORY_ICONS = {
  Electronics: "🎧",
  Mobiles: "📱",
  Fashion: "👟",
  "Home & Living": "🏠",
};

const CATEGORY_COLORS = [
  "bg-purple-50",
  "bg-blue-50",
  "bg-orange-50",
  "bg-cyan-50",
  "bg-emerald-50",
];

const formatPrice = (price) =>
  new Intl.NumberFormat("en-US").format(Number(price) || 0);

const formatCountdown = (milliseconds) => {
  if (milliseconds <= 0) {
    return {
      days: "00",
      hours: "00",
      minutes: "00",
      seconds: "00",
    };
  }

  const totalSeconds = Math.floor(milliseconds / 1000);

  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    days: String(days).padStart(2, "0"),
    hours: String(hours).padStart(2, "0"),
    minutes: String(minutes).padStart(2, "0"),
    seconds: String(seconds).padStart(2, "0"),
  };
};

const FridayBazaar = () => {
  const [products, setProducts] = useState([]);
  const [campaign, setCampaign] = useState(null);

  const [activeCategory, setActiveCategory] = useState("All Deals");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [currentTime, setCurrentTime] = useState(Date.now());
  const { addToBasket } = useBasket();


  const handleAddToBasket = (product) => {
  if (
    !product.is_available ||
    Number(product.remaining_stock) <= 0
  ) {
    alert("This product is currently unavailable.");
    return;
  }

  addToBasket(
    {
      ...product,
      id: product.product,
      name: product.product_name,
      image: product.product_image,
      price: Number(product.campaign_price),
      is_friday_bazaar: true,
      friday_bazaar_item_id: product.id,
    },
    1
  );

};

  // دریافت کمپاین و محصولات جمعه‌بازار از Django API
  useEffect(() => {
    if (!API_URL) {
      setError(
        "API URL is not configured. Please set NEXT_PUBLIC_API_URL."
      );
      setLoading(false);
      return;
    }

    const controller = new AbortController();

    const fetchFridayBazaar = async () => {
      setLoading(true);
      setError("");

      try {
        const [productsResponse, campaignsResponse] = await Promise.all([
          fetch(`${API_URL}/api/friday-bazaar/products/`, {
            signal: controller.signal,
            cache: "no-store",
          }),

          fetch(`${API_URL}/api/friday-bazaar/campaigns/`, {
            signal: controller.signal,
            cache: "no-store",
          }),
        ]);

        if (!productsResponse.ok) {
          throw new Error(
            `Products API returned status ${productsResponse.status}.`
          );
        }

        if (!campaignsResponse.ok) {
          throw new Error(
            `Campaign API returned status ${campaignsResponse.status}.`
          );
        }

        const productsData = await productsResponse.json();
        const campaignsData = await campaignsResponse.json();

        // پشتیبانی از پاسخ استاندارد DRF و آرایه مستقیم
        const productsList = Array.isArray(productsData)
          ? productsData
          : productsData.results || [];

        const campaignsList = Array.isArray(campaignsData)
          ? campaignsData
          : campaignsData.results || [];

        // فقط محصولاتی که کمپاین آن‌ها واقعاً قابل فروش است
        const availableProducts = productsList.filter(
          (item) => item.is_available === true
        );

        setProducts(availableProducts);
        setCampaign(campaignsList[0] || null);
      } catch (err) {
        if (err.name === "AbortError") return;

        console.error("Friday Bazaar API error:", err);

        setError(
          "Unable to load Friday Bazaar deals. Please try again."
        );
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchFridayBazaar();

    return () => controller.abort();
  }, []);

  // به‌روزرسانی ساعت برای شمارش معکوس
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // دسته‌بندی‌ها را از محصولات واقعی ایجاد می‌کنیم
  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(
        products
          .map((product) => product.category)
          .filter(Boolean)
      ),
    ];

    return [
      {
        name: "All Deals",
        icon: "✨",
      },
      ...uniqueCategories.map((name) => ({
        name,
        icon: CATEGORY_ICONS[name] || "🛍️",
      })),
    ];
  }, [products]);

  // فیلتر محصولات بر اساس دسته‌بندی انتخاب‌شده
  const filteredProducts = useMemo(() => {
    if (activeCategory === "All Deals") {
      return products;
    }

    return products.filter(
      (product) => product.category === activeCategory
    );
  }, [products, activeCategory]);

  // اگر دسته‌بندی حذف شد، فیلتر را به حالت پیش‌فرض برگردان
  useEffect(() => {
    if (
      activeCategory !== "All Deals" &&
      !categories.some((category) => category.name === activeCategory)
    ) {
      setActiveCategory("All Deals");
    }
  }, [categories, activeCategory]);

  // محاسبه زمان باقی‌مانده تا پایان کمپاین
  const countdown = useMemo(() => {
    if (!campaign?.end_date) {
      return null;
    }

    const endTime = new Date(campaign.end_date).getTime();

    if (Number.isNaN(endTime)) {
      return null;
    }

    return formatCountdown(endTime - currentTime);
  }, [campaign, currentTime]);

  const campaignEnded =
    campaign?.end_date &&
    new Date(campaign.end_date).getTime() <= currentTime;

  const campaignStarted =
    campaign?.start_date &&
    new Date(campaign.start_date).getTime() <= currentTime;

  const campaignBanner = campaign?.banner
    ? campaign.banner.startsWith("http")
      ? campaign.banner
      : `${API_URL}${campaign.banner.startsWith("/") ? "" : "/"}${campaign.banner}`
    : null;

  const benefits = [
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
      description: "Shop before the campaign ends.",
    },
  ];

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
                <span className="block text-[#00c8ff]">
                  Bazaar.
                </span>
              </h1>

              <h2 className="mt-4 text-xl font-bold text-white sm:text-2xl">
                {campaign?.title || "Discover Friday Deals"}
              </h2>

              <p className="mt-4 max-w-xl text-base leading-7 text-blue-100 sm:text-lg">
                {campaign?.description ||
                  "Your favorite finds. Unmissable prices. Discover special offers across your favorite categories."}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#friday-deals"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#00c8ff] px-6 py-3.5 font-bold text-[#003366] transition hover:bg-white"
                >
                  Explore Deals
                  <ArrowRight size={18} />
                </a>

                <div className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-3">
                  <Flame size={20} className="text-orange-300" />
                  <span className="text-sm font-semibold">
                    Special campaign offers
                  </span>
                </div>
              </div>
            </div>

            {/* Campaign Banner */}
            <div className="relative mx-auto w-full max-w-md">

              <div className="absolute inset-5 rounded-full bg-[#00c8ff]/20 blur-2xl" />

              <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-white/10 shadow-2xl backdrop-blur-md">

                {campaignBanner ? (
                  <img
                    src={campaignBanner}
                    alt={campaign?.title || "Friday Bazaar"}
                    className="h-44 w-full object-cover sm:h-56"
                  />
                ) : (
                  <div className="flex h-44 items-center justify-center bg-gradient-to-br from-[#00c8ff]/20 to-purple-500/30 sm:h-56">
                    <div className="text-center">
                      <ShoppingBag
                        size={64}
                        className="mx-auto text-cyan-200"
                      />
                      <p className="mt-3 text-xl font-black">
                        FRIDAY DEALS
                      </p>
                    </div>
                  </div>
                )}

                <div className="p-5 sm:p-7">

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold tracking-widest text-cyan-200">
                      CAMPAIGN COUNTDOWN
                    </span>
                    <Clock size={20} />
                  </div>

                  <p className="mt-3 text-sm text-blue-100">
                    {campaignEnded
                      ? "This campaign has ended."
                      : !campaignStarted
                        ? "This campaign has not started yet."
                        : "Time remaining until the campaign ends."}
                  </p>

                  {countdown && (
                    <div className="mt-6 grid grid-cols-4 gap-2 sm:gap-3">
                      {[
                        { value: countdown.days, label: "DAYS" },
                        { value: countdown.hours, label: "HOURS" },
                        { value: countdown.minutes, label: "MINUTES" },
                        { value: countdown.seconds, label: "SECONDS" },
                      ].map((item) => (
                        <div
                          key={item.label}
                          className="rounded-xl bg-white px-1 py-3 text-center text-[#003366] sm:rounded-2xl sm:py-4"
                        >
                          <div className="text-xl font-black sm:text-3xl">
                            {item.value}
                          </div>

                          <div className="mt-1 text-[9px] font-bold tracking-wider text-gray-500 sm:text-[10px]">
                            {item.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {!countdown && (
                    <p className="mt-5 text-sm text-blue-100">
                      Campaign dates will be announced soon.
                    </p>
                  )}

                  <div className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-orange-400/15 px-4 py-3 text-sm font-semibold text-orange-100">
                    <Zap size={17} />
                    Great deals. While they last.
                  </div>
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
          {benefits.map((item) => (
            <div
              key={item.title}
              className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#003366]">
                {item.icon}
              </div>

              <div>
                <h2 className="font-bold text-gray-900">
                  {item.title}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </section>

        {/* Deals Section */}
        <section
          id="friday-deals"
          className="mt-12 scroll-mt-6 sm:mt-16"
        >
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className="text-xs font-extrabold tracking-[0.2em] text-purple-600">
                HANDPICKED FOR YOU
              </span>

              <h2 className="mt-2 text-2xl font-black text-gray-900 sm:text-3xl">
                Friday&apos;s Best Deals
              </h2>

              <p className="mt-2 text-sm text-gray-500 sm:text-base">
                Explore exciting finds at special campaign prices.
              </p>
            </div>

            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#003366] transition hover:text-purple-600"
            >
              View All Products
              <ArrowRight size={17} />
            </Link>
          </div>

          {/* Category Filters */}
          {!loading && !error && products.length > 0 && (
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
                  {category.name}
                </button>
              ))}
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="animate-pulse overflow-hidden rounded-2xl border border-gray-100 bg-white"
                >
                  <div className="h-36 bg-gray-200 sm:h-48" />

                  <div className="space-y-3 p-4">
                    <div className="h-3 w-1/3 rounded bg-gray-200" />
                    <div className="h-4 w-4/5 rounded bg-gray-200" />
                    <div className="h-4 w-1/2 rounded bg-gray-200" />
                    <div className="h-10 rounded-xl bg-gray-200" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Error State */}
          {!loading && error && (
            <div className="mt-6 rounded-2xl border border-red-100 bg-white px-5 py-12 text-center">
              <ShoppingBag
                size={40}
                className="mx-auto text-red-300"
              />

              <h3 className="mt-4 font-bold text-gray-800">
                Unable to load deals
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                {error}
              </p>

              <button
                type="button"
                onClick={() => window.location.reload()}
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#003366] px-5 py-3 text-sm font-bold text-white transition hover:bg-purple-700"
              >
                <RefreshCw size={16} />
                Try Again
              </button>
            </div>
          )}

          {/* Product Cards */}
          {!loading && !error && filteredProducts.length > 0 && (
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
              {filteredProducts.map((product, index) => {
                
                  const originalPrice = Number(product.original_price) || 0;

                  const regularDiscountPrice =
                    Number(product.regular_discount_price) || 0;
                                
                  const campaignPrice =
                    Number(product.campaign_price) || 0;
                                
                  // مبلغ تخفیف عادی فروشگاه
                  const regularDiscountAmount = Math.max(
                    0,
                    originalPrice - regularDiscountPrice
                  );
                  
                  // تخفیف اضافی جمعه‌بازار نسبت به قیمت عادی
                  const extraCampaignDiscount = Math.max(
                    0,
                    regularDiscountPrice - campaignPrice
                  );

                  // مجموع صرفه‌جویی نسبت به قیمت اصلی
                  const totalSavings = Math.max(
                    0,
                    originalPrice - campaignPrice
                  );

                  // درصد تخفیف کلی نسبت به قیمت اصلی
                  const discount =
                    originalPrice > 0
                      ? Math.round(
                          ((originalPrice - campaignPrice) / originalPrice) * 100
                        )
                      : 0;
                      
                  const remaining = Number(product.remaining_stock) || 0;
                      
                      
                                  const imageColor =
                                    CATEGORY_COLORS[index % CATEGORY_COLORS.length];
                      
                  return (
                  
                <article
                  key={product.id}
                  className="group relative flex min-w-0 flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm                 transition-all duration-300 hover:-translate-y-1 hover:border-purple-200 hover:shadow-xl"
                >
                  {/* Product Image */}
                  <div
                    className={`relative flex h-40 items-center justify-center overflow-hidden sm:h-52 ${imageColor}`}
                  >
                    {product.product_image ? (
                      <img
                        src={product.product_image}
                        alt={product.product_name}
                        loading="lazy"
                        className="h-full w-full object-contain p-4 transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <ShoppingBag
                        size={60}
                        className="text-gray-300"
                      />
                    )}
                
                    {/* Discount Badge */}
                    <span className="absolute left-3 top-3 rounded-lg bg-red-600 px-2.5 py-1.5 text-xs font-black text-white shadow-md">
                      {discount}% OFF
                    </span>
                  
                    {/* Friday Bazaar Badge */}
                    <span className="absolute right-3 top-3 rounded-lg bg-[#003366] px-2.5 py-1.5 text-[10px] font-extrabold tracking-wide                text-white shadow-md">
                      FRIDAY BAZAAR
                    </span>
                  
                    {/* Stock Badge */}
                    <span
                      className={`absolute bottom-3 left-3 rounded-lg px-2.5 py-1.5 text-[10px] font-bold shadow-sm ${
                        remaining > 0
                          ? "bg-white/95 text-gray-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {remaining > 0
                        ? `${remaining} units left`
                        : "Out of stock"}
                    </span>
                  </div>
                      
                  {/* Product Details */}
                  <div className="flex flex-1 flex-col p-3 sm:p-4">
                    {/* Category */}
                    <p className="text-[10px] font-bold uppercase tracking-wider text-purple-600 sm:text-xs">
                      {product.category || "Special Offer"}
                    </p>
                      
                    {/* Product Name */}
                    <h3 className="mt-2 line-clamp-2 min-h-10 text-sm font-bold leading-5 text-gray-900 sm:text-base">
                      {product.product_name}
                    </h3>
                      
                    {/* Brand */}
                    {product.brand && (
                      <p className="mt-1 text-xs text-gray-500">
                        Brand: {product.brand}
                      </p>
                    )}
                
                    {/* Price Breakdown */}
                    <div className="mt-4 space-y-2 rounded-xl bg-gray-50 p-3">
                      {/* Original Price */}
                      <div className="flex items-center justify-between gap-2 text-xs">
                        <span className="text-gray-500">
                          Original price
                        </span>
                  
                        <span className="font-semibold text-gray-500 line-through">
                          AFN {formatPrice(originalPrice)}
                        </span>
                      </div>
                  
                      {/* Regular Discount Price */}
                      <div className="flex items-center justify-between gap-2 text-xs">
                        <span className="text-gray-600">
                          Regular sale price
                        </span>
                  
                        <span className="font-bold text-gray-800">
                          AFN {formatPrice(regularDiscountPrice)}
                        </span>
                      </div>
                  
                      {/* Regular Discount Amount */}
                      <div className="flex items-center justify-between gap-2 text-xs">
                        <span className="text-green-700">
                          Regular discount
                        </span>
                  
                        <span className="font-bold text-green-700">
                          - AFN {formatPrice(regularDiscountAmount)}
                        </span>
                      </div>
                  
                      {/* Divider */}
                      <div className="border-t border-dashed border-gray-300" />
                  
                      {/* Friday Bazaar Price */}
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-extrabold text-[#003366]">
                          Friday Bazaar price
                        </span>
                  
                        <span className="text-lg font-black text-[#003366] sm:text-xl">
                          AFN {formatPrice(campaignPrice)}
                        </span>
                      </div>
                  
                      {/* Extra Campaign Discount */}
                      <div className="flex items-center justify-between gap-2 text-xs">
                        <span className="font-medium text-purple-700">
                          Extra Friday discount
                        </span>
                  
                        <span className="font-bold text-purple-700">
                          - AFN {formatPrice(extraCampaignDiscount)}
                        </span>
                      </div>
                    </div>
                  
                    {/* Total Savings */}
                    <div className="mt-3 flex items-center gap-2 rounded-xl border border-green-100 bg-green-50 p-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-700">
                        <span className="text-lg font-black">%</span>
                      </div>
                  
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-green-800">
                          Your total savings
                        </p>
                  
                        <p className="mt-0.5 text-sm font-black text-green-700">
                          AFN {formatPrice(totalSavings)}
                        </p>
                      </div>
                    </div>
                  
                    {/* Add to Basket */}
                    <button
                      type="button"
                      onClick={() => handleAddToBasket(product)}
                      disabled={
                        !product.is_available ||
                        Number(product.remaining_stock) <= 0
                      }
                      className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#003366] px-3 py-3 text-xs font-bold text-white                transition-all duration-200 hover:bg-purple-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-gray-400                sm:text-sm"
                    >
                      <ShoppingBag size={17} />
                    
                      <span>
                        {product.is_available &&
                        Number(product.remaining_stock) > 0
                          ? "Add to Basket"
                          : "Currently Unavailable"}
                      </span>
                    </button>
                  </div>
                </article>

                );
              })}
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && filteredProducts.length === 0 && (
            <div className="mt-6 rounded-2xl border border-dashed border-gray-300 bg-white py-14 text-center">
              <ShoppingBag
                size={36}
                className="mx-auto text-gray-300"
              />

              <h3 className="mt-4 font-bold text-gray-800">
                {products.length === 0
                  ? "No Friday Bazaar deals available"
                  : "No deals in this category"}
              </h3>

              <p className="mt-2 px-4 text-sm text-gray-500">
                {products.length === 0
                  ? "Please check back when a campaign is active."
                  : "Choose another category to discover more deals."}
              </p>

              {products.length > 0 && activeCategory !== "All Deals" && (
                <button
                  type="button"
                  onClick={() => setActiveCategory("All Deals")}
                  className="mt-5 rounded-xl bg-[#003366] px-5 py-3 text-sm font-bold text-white transition hover:bg-purple-700"
                >
                  View All Deals
                </button>
              )}
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
              Start Shopping
              <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
};

export default FridayBazaar;

// https://chatgpt.com/c/6aca2254-ad08-83ee-bcbc-47f07e55f49c   