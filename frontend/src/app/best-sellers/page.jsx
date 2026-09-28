"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ShoppingCart,
  Star,
  PackageX,
  ArrowRight,
  Tag,
} from "lucide-react";
import { useBasket } from "@/context/BasketContext";
import { useEffect, useState } from "react";




// ======================================================
// API
// ======================================================

const API_URL =
  process.env.API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://127.0.0.1:8000";


// ======================================================
// دریافت محصولات Best Selling در Server
// ======================================================



// ======================================================
// قیمت محصول
// ======================================================

function getPricing(product) {
  const originalPrice = Number(product.price || 0);
  const discountValue = Number(product.discount_price || 0);

  // اگر discount_price بین 1 تا 100 باشد
  // آن را درصد تخفیف در نظر می‌گیریم.
  if (
    discountValue > 0 &&
    discountValue <= 100 &&
    originalPrice > 0
  ) {
    const finalPrice =
      originalPrice -
      (originalPrice * discountValue) / 100;

    return {
      originalPrice,
      finalPrice,
      discountPercent: discountValue,
      hasDiscount: true,
    };
  }

  // اگر discount_price بیشتر از 100 باشد
  // آن را قیمت نهایی در نظر می‌گیریم.
  if (
    discountValue > 0 &&
    discountValue < originalPrice
  ) {
    const discountPercent = Math.round(
      ((originalPrice - discountValue) /
        originalPrice) *
        100
    );

    return {
      originalPrice,
      finalPrice: discountValue,
      discountPercent,
      hasDiscount: true,
    };
  }

  return {
    originalPrice,
    finalPrice: originalPrice,
    discountPercent: 0,
    hasDiscount: false,
  };
}


// ======================================================
// فرمت قیمت
// ======================================================

function formatPrice(price) {
  return new Intl.NumberFormat("en-US").format(
    Math.round(price)
  );
}

async function getBestSellers() {
  try {
    const response = await fetch(`${API_URL}/api/product/`, {
      next: {
        revalidate: 60,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch best selling products");
    }

    const data = await response.json();

    return data?.best_selling || [];
  } catch (error) {
    console.error("Best Sellers API Error:", error);

    return [];
  }
}

// ======================================================
// Best Sellers Component
// ======================================================
const BestSellers = () => {
  const { basket, addToBasket } = useBasket();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      const data = await getBestSellers();
      setProducts(data);
      setLoading(false);
    }

    loadProducts();
  }, []);

  const handleAddToCart = (product) => {
    addToBasket(product, 1);
  };


  return (
    <main className="w-full bg-white py-10">

      <section className="2xl:max-w-6xl mx-auto px-4 sm:px-6">

        {/* ==================================================
            HEADER
        =================================================== */}

        <div className="flex items-end justify-between border-b border-gray-200 pb-4 mb-6">

          <div>

            <div className="flex items-center gap-2 mb-1">

              <span className="w-1 h-6 rounded-full bg-primary-blue" />

              <h1 className="text-xl md:text-2xl font-bold text-deep-navy">
                Best Sellers
              </h1>

            </div>

            <p className="text-sm text-gray-500 font-inter">
              Our most popular products
            </p>

          </div>


          <Link
            href="/best-sellers"
            className="
              hidden
              sm:flex
              items-center
              gap-1
              text-sm
              font-bold
              text-primary-blue
              hover:text-deep-navy
              transition-colors
              font-inter
            "
          >
            View All
            <ArrowRight size={16} />
          </Link>

        </div>


        {/* ==================================================
            EMPTY STATE
        =================================================== */}

        {products.length === 0 ? (

          <div
            className="
              min-h-[250px]
              flex
              flex-col
              items-center
              justify-center
              border
              border-gray-200
              rounded-xl
              bg-white
            "
          >

            <PackageX
              size={45}
              className="text-gray-400 mb-3"
            />

            <h2 className="text-lg font-bold text-deep-navy">
              No Best Sellers Found
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              There are currently no best selling products.
            </p>

          </div>

        ) : (

          /* ==================================================
             PRODUCTS
          =================================================== */

          <div className="flex flex-col gap-4">

            {products.map((product) => {

              const pricing = getPricing(product);

              const imageUrl = product.image
                ? `${API_URL}${product.image}`
                : "/images/product-placeholder.png";

              const isOutOfStock =
                Number(product.stock || 0) <= 0;


              return (

                <article
                  key={product.id}
                  className="
                    group
                    relative
                    w-full
                    border
                    border-gray-200
                    rounded-xl
                    bg-white
                    p-3
                    sm:p-4
                    transition-all
                    duration-300
                    hover:border-primary-blue/30
                    hover:shadow-lg
                  "
                >

                  {/* ==================================================
                      CARD
                  =================================================== */}

                  <div className="
                    flex
                    flex-col
                    sm:flex-row
                    gap-4
                  ">


                    {/* ==================================================
                        IMAGE
                    =================================================== */}

                    <Link
                      href={`/shop/${product.slug}`}
                      className="
                        relative
                        shrink-0
                        w-full
                        sm:w-[190px]
                        md:w-[220px]
                        h-[190px]
                        sm:h-[170px]
                        md:h-[190px]
                        bg-bright-white
                        rounded-lg
                        overflow-hidden
                        flex
                        items-center
                        justify-center
                      "
                    >

                      {/* Discount */}

                      {pricing.hasDiscount && (
                        <span
                          className="
                            absolute
                            top-3
                            left-3
                            z-10
                            flex
                            items-center
                            gap-1
                            bg-accent-red
                            text-white
                            text-[10px]
                            sm:text-xs
                            font-bold
                            px-2
                            py-1
                            rounded-md
                          "
                        >
                          <Tag size={11} />

                          -{pricing.discountPercent}%
                        </span>
                      )}


                      <img
                            src={`${API_URL}${product.image}`}
                            alt={product.product_name}
                            className="w-full h-full object-contain"
                    />


                      {/* Out of stock */}

                      {isOutOfStock && (
                        <div
                          className="
                            absolute
                            inset-0
                            bg-white/75
                            flex
                            items-center
                            justify-center
                            font-inter
                          "
                        >
                          <span
                            className="
                              bg-deep-navy
                              text-white
                              text-xs
                              font-bold
                              px-3
                              py-1.5
                              rounded-md
                              font-inter
                            "
                          >
                            Out of Stock
                          </span>
                        </div>
                      )}

                    </Link>


                    {/* ==================================================
                        PRODUCT DETAILS
                    =================================================== */}

                    <div className="
                      flex
                      flex-1
                      flex-col
                      justify-between
                      py-1
                    ">


                      <div>

                        {/* Product name */}

                        <Link
                          href={`/shop/${product.slug}`}
                        >
                          <h2
                            className="
                              text-base
                              sm:text-lg
                              font-bold
                              text-deep-navy
                              hover:text-primary-blue
                              transition-colors
                              font-montserrat
                            "
                          >
                            {product.product_name}
                          </h2>
                        </Link>


                        {/* Rating */}

                        <div className="
                          flex
                          items-center
                          gap-2
                          mt-2
                        ">

                          <div className="flex items-center gap-0.5">

                            {[1, 2, 3, 4, 5].map(
                              (star) => (
                                <Star
                                  key={star}
                                  size={13}
                                  className="
                                    fill-amber-400
                                    text-amber-400
                                  "
                                />
                              )
                            )}

                          </div>

                          <span className="
                            text-xs
                            text-gray-500
                          ">
                            4.8
                          </span>

                        </div>


                        {/* Description */}

                        {product.short_description && (
                          <p
                            className="
                              mt-3
                              text-sm
                              text-gray-500
                              leading-6
                              line-clamp-2
                              max-w-2xl
                              font-inter
                            "
                          >
                            {product.short_description}
                          </p>
                        )}

                      </div>


                      {/* ==================================================
                          BOTTOM
                      =================================================== */}

                      <div className="
                        flex
                        flex-col
                        sm:flex-row
                        sm:items-end
                        sm:justify-between
                        gap-4
                        mt-5
                      ">


                        {/* PRICE */}

                        <div>

                          <div className="
                            flex
                            items-center
                            gap-2
                            flex-wrap
                            font-inter
                          ">

                            <span
                              className="
                                text-lg
                                sm:text-xl
                                font-extrabold
                                text-deep-navy
                              "
                            >
                              AFN{" "}
                              {formatPrice(
                                pricing.finalPrice
                              )}
                            </span>


                            {pricing.hasDiscount && (
                              <span
                                className="
                                  text-xs
                                  sm:text-sm
                                  text-gray-400
                                  line-through
                                  font-inter
                                "
                              >
                                AFN{" "}
                                {formatPrice(
                                  pricing.originalPrice
                                )}
                              </span>
                            )}

                          </div>


                          {pricing.hasDiscount && (
                            <p className="
                              text-[11px]
                              text-green-600
                              font-bold
                              mt-1
                              font-inter
                            ">
                              Save{" "}
                              AFN{" "}
                              {formatPrice(
                                pricing.originalPrice -
                                  pricing.finalPrice
                              )}
                            </p>
                          )}

                        </div>


                        {/* ADD TO CART */}

                        <button
                          type="button"
                          onClick={() => handleAddToCart(product)}
                          disabled={
                            isOutOfStock ||
                            basket.some((item) => item.id === product.id)
                          }
                          className={`
                            w-full
                            sm:w-auto
                            min-w-[150px]
                            px-5
                            py-2.5
                            rounded-lg
                            flex
                            items-center
                            justify-center
                            gap-2
                            text-sm
                            font-bold
                            transition-all
                            font-montserrat
                          
                            ${
                              isOutOfStock ||
                              basket.some((item) => item.id === product.id)
                                ? `
                                  bg-gray-100
                                  text-gray-400
                                  cursor-not-allowed
                                `
                                : `
                                  bg-primary-blue
                                  text-white
                                  hover:bg-deep-navy
                                  active:scale-[0.98]
                                `
                            }
                          `}
                        >
                          <ShoppingCart size={17} />
                          
                          {isOutOfStock
                            ? "Out of Stock"
                            : basket.some((item) => item.id === product.id)
                              ? "Added to Cart"
                              : "Add to Cart"}
                        </button>

                      </div>

                    </div>

                  </div>

                </article>

              );
            })}

          </div>

        )}


        {/* ==================================================
            MOBILE VIEW ALL
        =================================================== */}

        <div className="sm:hidden mt-5">

          <Link
            href="/best-sellers"
            className="
              w-full
              flex
              items-center
              justify-center
              gap-2
              py-2.5
              border
              border-primary-blue
              rounded-lg
              text-primary-blue
              text-sm
              font-bold
              hover:bg-primary-blue
              hover:text-white
              transition-colors
              font-montserrat
            "
          >
            View All Best Sellers
            <ArrowRight size={16} />
          </Link>

        </div>

      </section>

    </main>
  );
};

export default BestSellers;