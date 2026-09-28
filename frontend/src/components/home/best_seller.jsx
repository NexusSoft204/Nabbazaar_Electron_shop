"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ShoppingCart, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useBasket } from "@/context/BasketContext";


const Best_seller = () => {
  const sliderRef = useRef(null);
  const router = useRouter();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { basket, addToBasket } = useBasket();

  const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

  // --------------------------------------------------
  // دریافت Best Sellers از Django API
  // --------------------------------------------------
  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        setLoading(true);

        const response = await axios.get(`${API_URL}/api/product/`);

        setProducts(response.data?.best_selling || []);
      } catch (error) {
        console.error("Error loading best sellers:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBestSellers();
  }, [API_URL]);

  // --------------------------------------------------
  // اسلاید به سمت چپ
  // --------------------------------------------------
  const slideLeft = () => {
    if (!sliderRef.current) return;

    sliderRef.current.scrollBy({
      left: -350,
      behavior: "smooth",
    });
  };

  // --------------------------------------------------
  // اسلاید به سمت راست
  // --------------------------------------------------
  const slideRight = () => {
    if (!sliderRef.current) return;

    sliderRef.current.scrollBy({
      left: 350,
      behavior: "smooth",
    });
  };

  // --------------------------------------------------
  // تبدیل URL تصویر Django
  // --------------------------------------------------
  const getImageUrl = (image) => {
    if (!image) {
      return "/images/product-placeholder.png";
    }

    if (image.startsWith("http")) {
      return image;
    }

    return `${API_URL}${image}`;
  };

  // --------------------------------------------------
  // محاسبه تخفیف
  //
  // اگر discount_price مثلا:
  // 10000 باشد => قیمت نهایی 10000
  //
  // اگر discount_price مثلا:
  // 20 باشد => یعنی 20 درصد تخفیف
  // --------------------------------------------------
  const getDiscountData = (product) => {
    const price = Number(product.price) || 0;
    const discountValue = Number(product.discount_price) || 0;

    if (!discountValue || !price) {
      return {
        hasDiscount: false,
        finalPrice: price,
        discountPercent: 0,
      };
    }

    // اگر مقدار <= 100 باشد آن را درصد در نظر می‌گیریم
    if (discountValue <= 100) {
      const finalPrice = price - (price * discountValue) / 100;

      return {
        hasDiscount: true,
        finalPrice,
        discountPercent: discountValue,
      };
    }

    // در غیر این صورت قیمت نهایی است
    const discountPercent = Math.round(
      ((price - discountValue) / price) * 100
    );

    return {
      hasDiscount: discountValue < price,
      finalPrice: discountValue,
      discountPercent: discountPercent > 0 ? discountPercent : 0,
    };
  };

  // --------------------------------------------------
  // فرمت قیمت افغانی
  // --------------------------------------------------
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US").format(Math.round(price));
  };

  // --------------------------------------------------
  // Loading Skeleton
  // --------------------------------------------------
  if (loading) {
    return (
      <section className="w-full py-3">
        <div className="2xl:max-w-6xl mx-auto px-5">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />

            <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
          </div>

          {/* Skeleton cards */}
          <div className="flex gap-3 overflow-hidden">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="
                  min-w-[175px]
                  sm:min-w-[190px]
                  md:min-w-[200px]
                  lg:min-w-[205px]
                  border border-gray-200
                  rounded-lg
                  p-2
                "
              >
                <div className="h-[130px] bg-gray-100 rounded animate-pulse" />

                <div className="h-4 bg-gray-100 rounded mt-3 animate-pulse" />

                <div className="h-3 bg-gray-100 rounded mt-2 w-2/3 animate-pulse" />

                <div className="h-8 bg-gray-100 rounded mt-3 animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-3 shadow">
      <div className="2xl:max-w-6xl mx-auto px-5">

        {/* ==================================================
            HEADER
        ================================================== */}
        <div className="flex items-center justify-between mb-3">

          <h2 className="font-bold text-xl font-montserrat">
            Best Sellers
          </h2>

          <Link
            href="/shop"
            className="
              text-primary-blue
              font-black
              text-sm
              font-montserrat
              hover:underline
            "
          >
            View All
          </Link>
        </div>

        {/* ==================================================
            SLIDER AREA
        ================================================== */}
        <div className="relative group">

          {/* LEFT BUTTON */}
          <button
            type="button"
            onClick={slideLeft}
            aria-label="Previous products"
            className="
              absolute
              left-0
              top-1/2
              -translate-y-1/2
              -translate-x-1/2
              z-20

              w-9
              h-9

              rounded-full
              bg-white

              border
              border-gray-200

              shadow-md

              flex
              items-center
              justify-center

              text-gray-700

              hover:bg-primary-blue
              hover:text-white
              hover:border-primary-blue

              transition-all
            "
          >
            <ChevronLeft size={20} />
          </button>

          {/* ==================================================
              PRODUCTS CONTAINER
          ================================================== */}
          <div
            ref={sliderRef}
            className="
              flex
              gap-3

              overflow-x-auto
              scroll-smooth

              scrollbar-hide

              snap-x
              snap-mandatory

              pb-1
            "
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >

            {products.map((product) => {
              const discount = getDiscountData(product);

              return (
                <article
                  key={product.id}
                  className="
                    group/card

                    relative

                    flex-shrink-0

                    snap-start

                    w-[175px]
                    sm:w-[190px]
                    md:w-[200px]
                    lg:w-[205px]

                    border
                    border-gray-200

                    rounded-md

                    bg-white

                    overflow-hidden

                    transition-all
                    duration-300

                    hover:-translate-y-1
                    hover:shadow-lg
                  "
                >

                  {/* ==================================================
                      PRODUCT IMAGE
                  ================================================== */}
                  <div
                     onClick={() => router.push(`/shop/${product.slug}`)}
                    className="block cursor-pointer"
                  >

                    <div
                      className="
                        relative
                        h-[125px]
                        sm:h-[135px]
                        cursor-pointer
                        bg-white

                        flex
                        items-center
                        justify-center

                        overflow-hidden
                      "
                    >

                      {/* DISCOUNT BADGE */}
                      {discount.hasDiscount &&
                        discount.discountPercent > 0 && (
                          <span
                            className="
                              absolute
                              left-2
                              top-2
                              z-10

                              bg-red-600
                              text-white

                              text-[10px]
                              sm:text-[11px]

                              font-bold

                              px-1.5
                              py-0.5

                              rounded
                            "
                          >
                            -{discount.discountPercent}%
                          </span>
                        )}

                      <img
                        src={getImageUrl(product.image)}
                        alt={product.product_name}
                        className="
                          w-full
                          h-full

                          object-contain

                          p-1

                          transition-transform
                          duration-300

                          group-hover/card:scale-105
                        "
                      />
                    </div>
                  </div>

                  {/* ==================================================
                      PRODUCT INFORMATION
                  ================================================== */}
                  <div className="px-2 pb-2">

                    {/* PRODUCT NAME */}
                    <div
                       onClick={() => router.push(`/shop/${product.slug}`)}
                      className="
                        block
                        text-[12px]
                        sm:text-[13px]
                        cursor-pointer
                        font-medium

                        text-gray-800

                        truncate

                        hover:text-primary-blue
                      "
                      title={product.product_name}
                    >
                      {product.product_name}
                    </div>

                    {/* ==================================================
                        RATING
                    ================================================== */}
                    <div className="flex items-center gap-1 mt-1">

                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            size={11}
                            className="
                              fill-yellow-400
                              text-yellow-400
                            "
                          />
                        ))}
                      </div>

                      <span className="text-[9px] text-gray-500">
                        4.7
                      </span>

                      <span className="text-[9px] text-gray-400">
                        (145)
                      </span>

                    </div>

                    {/* ==================================================
                        PRICE
                    ================================================== */}
                    <div className="flex items-center gap-1.5 mt-1.5">

                      <span
                        className="
                          font-bold
                          text-[13px]
                          sm:text-[14px]
                          text-gray-900
                        "
                      >
                        AFN {formatPrice(discount.finalPrice)}
                      </span>

                      {discount.hasDiscount && (
                        <span
                          className="
                            text-[9px]
                            sm:text-[10px]

                            text-gray-400

                            line-through
                          "
                        >
                          AFN {formatPrice(Number(product.price))}
                        </span>
                      )}

                    </div>

                    {/* ==================================================
                        ADD TO CART
                    ================================================== */}
                    <button
  type="button"
  onClick={() => addToBasket(product, 1)}
  disabled={
    Number(product.stock) <= 0 ||
    basket.some((item) => item.id === product.id)
  }
  className={`
    mt-2
    w-full
    h-8
    rounded-md
    flex
    items-center
    justify-center
    gap-1
    text-[11px]
    sm:text-xs
    font-medium
    transition-all
    duration-200

    ${
      Number(product.stock) <= 0 ||
      basket.some((item) => item.id === product.id)
        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
        : "bg-primary-blue text-white hover:brightness-95 active:scale-[0.98] cursor-pointer"
    }
  `}
>
  <ShoppingCart size={14} />

  <span>
    {Number(product.stock) <= 0
      ? "Out of Stock"
      : basket.some((item) => item.id === product.id)
        ? "Added to Cart"
        : "Add to Cart"}
  </span>
</button>

                  </div>
                </article>
              );
            })}

          </div>

          {/* ==================================================
              RIGHT BUTTON
          ================================================== */}
          <button
            type="button"
            onClick={slideRight}
            aria-label="Next products"
            className="
              absolute
              right-0
              top-1/2
              -translate-y-1/2
              translate-x-1/2
              z-20

              w-9
              h-9

              rounded-full
              bg-white

              border
              border-gray-200

              shadow-md

              flex
              items-center
              justify-center

              text-gray-700

              hover:bg-primary-blue
              hover:text-white
              hover:border-primary-blue

              transition-all
            "
          >
            <ChevronRight size={20} />
          </button>

        </div>

      </div>
    </section>
  );
};

export default Best_seller;