"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { useBasket } from "@/context/BasketContext";



import {
  ArrowRight,
  ArrowUpRight,
  Package,
  ShoppingCart,
  Sparkles,
  Star,
  Truck,
  Zap,
  Search,
  Heart,
} from "lucide-react";

if (!process.env.NEXT_PUBLIC_API_URL) {
  throw new Error("NEXT_PUBLIC_API_URL is not configured");
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const NewArrivalsClient = ({ products = [] }) => {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [wishlist, setWishlist] = useState([]);
  const { basket, addToBasket } = useBasket();

  // -----------------------------------------
  // Image URL
  // -----------------------------------------

  const getImageUrl = (image) => {
    if (!image) {
      return "/placeholder-product.png";
    }

    if (image.startsWith("http://") || image.startsWith("https://")) {
      return image;
    }

    return `${API_URL}${image}`;
  };

  // -----------------------------------------
  // Format Price
  // -----------------------------------------

  const formatPrice = (price) => {
    if (!price) return "0";

    return new Intl.NumberFormat("en-US").format(Number(price));
  };

  // -----------------------------------------
  // Discount calculation
  // -----------------------------------------

  const getDiscount = (product) => {
    const price = Number(product.price);
    const discountPrice = Number(product.discount_price);

    if (
      !price ||
      !discountPrice ||
      discountPrice >= price ||
      discountPrice <= 0
    ) {
      return 0;
    }

    return Math.round(((price - discountPrice) / price) * 100);
  };

  // -----------------------------------------
  // Search + Sort
  // -----------------------------------------

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search
    if (search.trim()) {
      const query = search.toLowerCase();

      result = result.filter((product) =>
        product.product_name?.toLowerCase().includes(query)
      );
    }

    // Sort
    if (sortBy === "newest") {
      result.sort(
        (a, b) =>
          new Date(b.created_at).getTime() -
          new Date(a.created_at).getTime()
      );
    }

    if (sortBy === "price-low") {
      result.sort(
        (a, b) =>
          Number(a.discount_price || a.price) -
          Number(b.discount_price || b.price)
      );
    }

    if (sortBy === "price-high") {
      result.sort(
        (a, b) =>
          Number(b.discount_price || b.price) -
          Number(a.discount_price || a.price)
      );
    }

    if (sortBy === "popular") {
      result.sort(
        (a, b) =>
          Number(b.visited_count || 0) -
          Number(a.visited_count || 0)
      );
    }

    return result;
  }, [products, search, sortBy]);

  // -----------------------------------------
  // Wishlist
  // -----------------------------------------

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  // -----------------------------------------
  // Empty State
  // -----------------------------------------

  if (!products.length) {
    return (
      <main className="w-full min-h-screen bg-white py-16">
        <section className="max-w-6xl mx-auto px-5">
          <div className="min-h-[400px] flex flex-col items-center justify-center text-center border border-[#D9DDE6] rounded-3xl bg-[#F7F8F9]">
            <div className="w-20 h-20 rounded-full bg-white border border-[#D9DDE6] flex items-center justify-center mb-5">
              <Package className="w-9 h-9 text-[#045FF8]" />
            </div>

            <h2 className="text-xl font-bold text-[#03215B]">
              No New Products Available
            </h2>

            <p className="text-sm text-gray-500 mt-2 max-w-md">
              There are currently no new products available.
              Please check back later.
            </p>

            <Link
              href="/products"
              className="mt-6 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#045FF8] text-white font-bold text-sm hover:bg-[#03215B] transition"
            >
              Browse Products
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="w-full min-h-screen bg-white py-10">
      <section className="max-w-6xl mx-auto px-5">

        {/* =====================================================
            HEADER
        ====================================================== */}

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">

          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-9 h-9 rounded-xl bg-[#045FF8] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </span>

              <span className="text-sm font-inter font-bold text-[#045FF8] uppercase tracking-wide">
                Latest Collection
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-montserrat font-black text-[#03215B]">
              New Arrivals
            </h1>

            <p className="text-gray-500 mt-2 max-w-xl font-inter">
              New the latest products added to our store.
              Find the newest electronics and accessories in one place.
            </p>
          </div>

          <Link
            href="/shop"
            className="group font-inter inline-flex items-center gap-2 text-sm font-bold text-[#045FF8]"
          >
            View All Products

            <ArrowRight
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* =====================================================
            TOOLBAR
        ====================================================== */}

        <div className="border border-[#D9DDE6] rounded-2xl p-3 md:p-4 mb-8 bg-[#F7F8F9]">

          <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">

            {/* Search */}

            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search new products..."
                className="w-full h-11 pl-10 pr-4 rounded-xl border border-[#D9DDE6] bg-white text-sm outline-none focus:border-[#045FF8] focus:ring-2 focus:ring-[#045FF8]/10 transition"
              />
            </div>

            {/* Sort */}

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold font-inter text-gray-500 whitespace-nowrap">
                Sort by:
              </span>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="h-11 px-4 rounded-xl border font-inter border-[#D9DDE6] bg-white text-sm font-semibold text-[#03215B] outline-none focus:border-[#045FF8]"
              >
                <option value="newest">Newest</option>
                <option value="popular">Most Viewed</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>

          </div>
        </div>

        {/* =====================================================
            PRODUCT COUNT
        ====================================================== */}

        <div className="flex items-center justify-between mb-5 font-inter">
          <p className="text-sm text-gray-500">
            Showing{" "}
            <span className="font-bold text-[#03215B]">
              {filteredProducts.length}
            </span>{" "}
            new products
          </p>

          <div className="hidden sm:flex items-center gap-2 text-xs text-gray-400">
            <Zap className="w-4 h-4 text-[#0AE0FC]" />
            Freshly added
          </div>
        </div>

        {/* =====================================================
            PRODUCTS GRID
        ====================================================== */}

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

            {filteredProducts.map((product) => {

              const discount = getDiscount(product);

              const finalPrice =
                product.discount_price &&
                Number(product.discount_price) > 0
                  ? product.discount_price
                  : product.price;

              const isWishlisted = wishlist.includes(product.id);

              return (
                <article
                  key={product.id}
                  className="group bg-white border border-[#D9DDE6] rounded-2xl overflow-hidden hover:border-[#045FF8]/40 hover:shadow-xl hover:shadow-[#045FF8]/5 transition-all duration-300"
                >

                  {/* =================================================
                      IMAGE
                  ================================================== */}

                  <div className="relative h-[280px] bg-[#F7F8F9] overflow-hidden">

                    <Link
                      href={`/shop/${product.slug}`}
                      className="block w-full h-full"
                    >
                      <img
                        src={getImageUrl(product.image)}
                        alt={product.product_name || "Product"}
                        className="w-full h-full object-contain p-7 transition-transform duration-500 group-hover:scale-105"
                      />
                    </Link>

                    {/* NEW BADGE */}

                    <div className="absolute font-inter top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#045FF8] text-white text-[10px] font-black uppercase tracking-wide shadow-lg">
                      <Sparkles className="w-3 h-3" />
                      New
                    </div>



                    {/* WISHLIST */}

                    <button
                      type="button"
                      onClick={() => toggleWishlist(product.id)}
                      aria-label="Add to wishlist"
                      className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white border border-[#D9DDE6] flex items-center justify-center shadow-sm hover:border-[#FF253A] transition"
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          isWishlisted
                            ? "fill-[#FF253A] text-[#FF253A]"
                            : "text-gray-500"
                        }`}
                      />
                    </button>
                  </div>

                  {/* =================================================
                      CONTENT
                  ================================================== */}

                  <div className="p-5">

                    {/* Product Name */}

                    <Link
                      href={`/products/${product.slug}`}
                      className="block"
                    >
                      <h2 className="font-bold text-[#03215B] text-lg line-clamp-1 group-hover:text-[#045FF8] transition font-montserrat">
                        {product.product_name}
                      </h2>
                    </Link>

                    {/* Rating */}

                    <div className="flex items-center gap-1 mt-2 font-inter">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400"
                        />
                      ))}

                      <span className="text-xs text-gray-400 ml-1 font-inter">
                        New product
                      </span>
                    </div>

                    {/* Description */}

                    <p className="text-xs text-gray-500 font-inter leading-5 mt-3 line-clamp-2 min-h-[40px]">
                      {product.short_description ||
                        "Discover this newly added product from our collection."}
                    </p>

                    {/* PRICE */}

                    <div className="flex items-end justify-between mt-5">

                      <div>

                        <div className="flex items-baseline gap-1">
                          <span className="text-2xl font-black text-[#03215B]">
                            {product.price}
                          </span>

                          <span className="text-xs font-bold text-gray-400">
                            AFN
                          </span>
                        </div>

                      </div>

                      {/* STOCK */}

                      <div className="font-inter">
                        {Number(product.stock) > 0 ? (
                          <span className="text-[10px] font-bold text-green-600">
                            In Stock
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold text-[#FF253A]">
                            Out of Stock
                          </span>
                        )}
                      </div>

                    </div>

                    {/* =================================================
                        ACTIONS
                    ================================================== */}

                    <div className="grid grid-cols-[1fr_auto] gap-2 mt-5">

                     <button
  type="button"
  onClick={() => addToBasket(product, 1)}
  disabled={
    Number(product.stock) <= 0 ||
    basket.some((item) => item.id === product.id)
  }
  className={`h-11 rounded-xl flex font-montserrat items-center justify-center gap-2 text-sm font-bold transition ${
    Number(product.stock) <= 0 ||
    basket.some((item) => item.id === product.id)
      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
      : "bg-[#045FF8] text-white hover:bg-[#03215B]"
  }`}
>
  <ShoppingCart className="w-4 h-4" />

  {Number(product.stock) <= 0
    ? "Out of Stock"
    : basket.some((item) => item.id === product.id)
      ? "Added to Cart"
      : "Add to Cart"}
</button>

                      <Link
                        href={`/shop/${product.slug}`}
                        className="w-11 h-11 rounded-xl border border-[#D9DDE6] flex items-center justify-center text-[#03215B] hover:border-[#045FF8] hover:text-[#045FF8] transition"
                        aria-label="View product"
                      >
                        <ArrowUpRight className="w-5 h-5" />
                      </Link>

                    </div>

                    {/* SHIPPING */}

                    <div className="flex items-center gap-2 mt-4 pt-4 border-t border-[#D9DDE6]">

                      <Truck className="w-4 h-4 text-[#045FF8]" />

                      <span className="text-[10px] text-gray-500 font-inter">
                        Fast delivery available
                      </span>

                    </div>

                  </div>
                </article>
              );
            })}

          </div>
        ) : (
          /* =====================================================
             SEARCH EMPTY
          ====================================================== */

          <div className="border border-[#D9DDE6] rounded-2xl p-12 text-center">

            <div className="w-16 h-16 rounded-full bg-[#F7F8F9] mx-auto flex items-center justify-center">
              <Search className="w-7 h-7 text-gray-400" />
            </div>

            <h3 className="text-lg font-bold text-[#03215B] mt-4">
              No products found
            </h3>

            <p className="text-sm text-gray-500 mt-2">
              Try searching with another product name.
            </p>

            <button
              type="button"
              onClick={() => setSearch("")}
              className="mt-5 px-5 py-2.5 rounded-xl bg-[#045FF8] text-white text-sm font-bold hover:bg-[#03215B] transition"
            >
              Clear Search
            </button>

          </div>
        )}

      </section>
    </main>
  );
};

export default NewArrivalsClient;