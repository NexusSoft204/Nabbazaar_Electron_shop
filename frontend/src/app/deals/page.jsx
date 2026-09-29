import React from "react";
import Link from "next/link";

if (!process.env.NEXT_PUBLIC_API_URL) {
  throw new Error("NEXT_PUBLIC_API_URL is not configured");
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const Deals = async () => {
  let products = [];

  try {
    const response = await fetch(`${API_URL}/api/product/`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await response.json();

    // فقط Special Discounts
    products = data?.special_discounts || [];
  } catch (error) {
    console.error("Deals API Error:", error);
  }

  return (
    <main className="w-full min-h-screen bg-white py-10 sm:py-14">
      <section className="2xl:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ================= HEADER ================= */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">

          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-accent-red animate-pulse" />

              <span className="text-accent-red font-inter text-xs sm:text-sm font-bold uppercase tracking-wider">
                Limited Time Deals
              </span>
            </div>

            <h1 className="text-2xl font-montserrat sm:text-3xl lg:text-4xl font-black text-deep-navy font-montserrat">
              Special Discounts
            </h1>

            <p className="text-gray-500 font-inter text-sm sm:text-base mt-2 max-w-xl">
              Discover our special offers and get your favorite electronics
              at incredible prices.
            </p>
          </div>

          <Link
            href="/deals"
            className="inline-flex items-center justify-center gap-2
            text-sm font-bold text-primary-blue
            border border-primary-blue/20
            hover:border-primary-blue
            hover:bg-primary-blue hover:text-white
            transition-all duration-300
            rounded-xl px-4 py-2.5 w-fit font-montserrat"
          >
            View All
            <span>→</span>
          </Link>
        </div>

        {/* ================= DEALS GRID ================= */}

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

            {products.map((product) => {

              const imageUrl = product.image
                ? product.image.startsWith("http")
                  ? product.image
                  : `${API_URL}${product.image}`
                : null;

              const oldPrice = Number(product.price || 0);
              const discountPrice = Number(product.discount_price || 0);

              let discountPercent = 0;

              if (
                oldPrice > 0 &&
                discountPrice > 0 &&
                discountPrice < oldPrice
              ) {
                discountPercent = Math.round(
                  ((oldPrice - discountPrice) / oldPrice) * 100
                );
              }

              return (
                <article
                  key={product.id}
                  className="group relative bg-white
                  border border-gray-100
                  rounded-2xl
                  overflow-hidden
                  shadow-[0_4px_20px_rgba(0,0,0,0.05)]
                  hover:shadow-[0_12px_35px_rgba(4,95,248,0.12)]
                  hover:-translate-y-1
                  transition-all duration-300"
                >

                  {/* ================= IMAGE ================= */}
                  <Link
                    href={`/shop/${product.slug}`}
                    className="block"
                  >
                    <div
                      className="relative w-full
                      h-64 sm:h-72
                      bg-[#F7F8F9]
                      overflow-hidden"
                    >

                      {/* Discount Badge */}
                      {discountPercent > 0 && (
                        <div
                          className="absolute top-4 left-4 z-10
                          bg-accent-red text-white
                          px-3 py-1.5
                          rounded-full
                          text-xs font-black
                          shadow-sm font-inter"
                        >
                          -{discountPercent}%
                        </div>
                      )}

                      {/* Special Label */}
                      <div
                        className="absolute top-4 right-4 z-10
                        bg-white
                        border border-gray-100
                        text-deep-navy
                        px-3 py-1.5
                        rounded-full
                        text-[10px]
                        font-black
                        uppercase
                        tracking-wide
                        shadow-sm
                        font-montserrat
                        "
                      >
                        Special Deal
                      </div>

                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={product.product_name}
                          className="w-full h-full
                          object-contain
                          p-8
                          group-hover:scale-105
                          transition-transform duration-500"
                        />
                      ) : (
                        <div
                          className="w-full h-full
                          flex items-center justify-center
                          text-gray-400 text-sm"
                        >
                          No Image
                        </div>
                      )}
                    </div>
                  </Link>

                  {/* ================= CONTENT ================= */}
                  <div className="p-5">

                    {/* Product Name */}
                    <Link
                      href={`/shop/${product.slug}`}
                      className="block"
                    >
                      <h2
                        className="text-base sm:text-lg
                        font-bold
                        text-deep-navy
                        line-clamp-1
                        hover:text-primary-blue
                        transition-colors font-montserrat"
                      >
                        {product.product_name}
                      </h2>
                    </Link>

                    {/* Description */}
                    {product.short_description && (
                      <p
                        className="text-xs sm:text-sm
                        text-gray-500
                        leading-5
                        font-inter
                        mt-2
                        line-clamp-2"
                      >
                        {product.short_description}
                      </p>
                    )}

                    {/* Divider */}
                    <div className="h-px bg-gray-100 my-4" />

                    {/* ================= PRICE ================= */}
                    <div className="flex items-end justify-between gap-3 font-montserrat">

                      <div>
                        {discountPrice > 0 &&
                        discountPrice < oldPrice ? (
                          <>
                            <span className="block text-xs text-gray-400 line-through mb-1">
                              {oldPrice.toLocaleString()} AFN
                            </span>

                            <span className="text-xl font-black text-accent-red">
                              {discountPrice.toLocaleString()} AFN
                            </span>
                          </>
                        ) : (
                          <span className="text-xl font-black text-deep-navy">
                            {oldPrice.toLocaleString()} AFN
                          </span>
                        )}
                      </div>

                      {/* Stock */}
                      <div className="text-right font-inter">
                        {product.stock > 0 ? (
                          <span className="text-[11px] font-bold text-green-600">
                            In Stock
                          </span>
                        ) : (
                          <span className="text-[11px] font-bold text-red-500">
                            Out of Stock
                          </span>
                        )}
                      </div>
                    </div>

                    {/* ================= BUTTON ================= */}
                    <Link
                      href={`/shop/${product.slug}`}
                      className="mt-5 w-full
                      flex items-center justify-center
                      gap-2
                      font-montserrat
                      py-3
                      rounded-xl
                      bg-primary-blue
                      text-white
                      text-sm
                      font-bold
                      hover:bg-deep-navy
                      active:scale-[0.98]
                      transition-all duration-300"
                    >
                      View Product
                      <span className="text-base">→</span>
                    </Link>

                  </div>
                </article>
              );
            })}

          </div>
        ) : (

          /* ================= EMPTY STATE ================= */
          <div
            className="min-h-[350px]
            flex flex-col items-center justify-center
            border border-dashed
            border-gray-200
            rounded-3xl
            bg-[#F7F8F9]
            text-center px-6"
          >
            <div
              className="w-16 h-16
              rounded-2xl
              bg-white
              flex items-center justify-center
              text-2xl
              shadow-sm
              mb-5"
            >
              🏷️
            </div>

            <h2 className="text-xl font-black text-deep-navy font-montserrat">
              No Special Deals Available
            </h2>

            <p className="text-sm text-gray-500 mt-2 max-w-md font-inter">
              There are currently no special discounts available.
              Please check again later.
            </p>

            <Link
              href="/shop"
              className="mt-5
              px-5 py-3
              rounded-xl
              bg-primary-blue
              text-white
              text-sm
              font-bold
              hover:bg-deep-navy
              transition-colors"
            >
              Explore Products
            </Link>
          </div>
        )}

      </section>
    </main>
  );
};

export default Deals;