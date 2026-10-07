"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

import {
  SlidersHorizontal,
  ChevronRight,
  Star,
  ShoppingBag,
  Flame,
  Check,
} from "lucide-react";

import Filtarbar from "./filtarbar";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const CategoryPage = () => {
  const params = useParams();
  const slug = params.slug;

  // ================================
  // Category Data
  // ================================
  const [category, setCategory] = useState(null);

  // ================================
  // Brand Filter
  // ================================
  const [selectedBrand, setSelectedBrand] = useState("All");

  // ================================
  // Loading & Error
  // ================================
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ================================
  // Fetch Category
  // ================================
  useEffect(() => {
    if (!slug) return;

    const fetchCategory = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `${API_URL}/api/product/categories/${slug}/`,
        );

        if (!response.ok) {
          throw new Error("Category could not be loaded.");
        }

        const data = await response.json();

        setCategory(data);
      } catch (err) {
        console.error("Category API Error:", err);
        setError("Failed to load category.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [slug]);

  // ================================
  // Loading
  // ================================
  if (loading) {
    return (
      <main className="w-full min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin mx-auto" />

          <p className="mt-4 text-sm text-slate-500">Loading category...</p>
        </div>
      </main>
    );
  }

  // ================================
  // Error
  // ================================
  if (error || !category) {
    return (
      <main className="w-full min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center max-w-md w-full">
          <h2 className="text-xl font-bold text-slate-900 font-montserrat">
            Category not found
          </h2>

          <p className="text-sm text-slate-500 mt-2">
            {error || "We could not find this category."}
          </p>

          <Link
            href="/categories"
            className="inline-flex mt-5 font-montserrat bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-700 transition-colors"
          >
            Back to Categories
          </Link>
        </div>
      </main>
    );
  }

  // ================================
  // Products
  // ================================
  const products = category.products || [];

  // ================================
  // Filter Products By Brand
  // ================================
  const filteredProducts =
    selectedBrand === "All"
      ? products
      : products.filter((product) => product.brand?.title === selectedBrand);

  return (
    <main className="w-full min-h-screen bg-slate-50 text-slate-800 py-6 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* =====================================
            Breadcrumb
        ====================================== */}
        <nav className="flex font-inter items-center gap-2 text-xs font-medium text-slate-400 mb-6">
          <Link href="/" className="hover:text-slate-600 transition-colors">
            Home
          </Link>

          <ChevronRight size={14} />

          <Link
            href="/categories"
            className="hover:text-slate-600 transition-colors"
          >
            Categories
          </Link>

          <ChevronRight size={14} />

          <span className="text-slate-600 font-montserrat">
            {category.title}
          </span>
        </nav>

        {/* =====================================
            Hero Section
        ====================================== */}
        <div className="relative w-full h-64 rounded-3xl overflow-hidden mb-10 shadow-sm border border-slate-200/50 bg-slate-900">
          {/* اگر بعداً برای Category تصویر اضافه کردی */}
          {category.image ? (
            <img
              src={category.image}
              alt={category.title}
              className="w-full h-full object-cover brightness-[0.85]"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950" />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent flex flex-col justify-end p-8 sm:p-10">
            <span className="text-xs font-bold tracking-widest font-inter text-blue-400 uppercase mb-2">
              Category Collection
            </span>

            <h1 className="text-3xl sm:text-4xl font-montserrat font-black text-white mb-2">
              {category.title}
            </h1>

            {category.description && (
              <p className="text-sm font-inter text-slate-200 max-w-2xl font-normal leading-relaxed opacity-90">
                {category.description}
              </p>
            )}
          </div>
        </div>

        {/* =====================================
            Layout
        ====================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* =====================================
              Sidebar
          ====================================== */}
          <aside className="lg:col-span-1 flex flex-col gap-6">
            {/* =================================
                Sub Categories
            ================================== */}
            <div className="bg-white rounded-2xl border border-slate-200/60 p-5 shadow-xs">
              <h3 className="text-sm font-montserrat font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 uppercase tracking-wider">
                Sub Categories
              </h3>

              <div className="flex flex-col gap-1.5 font-inter">
                {(category.sub_categories || []).map((sub) => (
                  <Link
                    key={sub.id}
                    href={`/category/${sub.slug}`}
                    className="flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium text-slate-500 hover:bg-slate-50 hover:text-blue-600 transition-all duration-200"
                  >
                    <span>{sub.title}</span>

                    <span className="text-xs bg-slate-100 text-slate-400 px-2 py-0.5 rounded-md">
                      {sub.product_count}
                    </span>
                  </Link>
                ))}

                {(!category.sub_categories ||
                  category.sub_categories.length === 0) && (
                  <p className="text-xs text-slate-400 px-3 py-2 font-inter">
                    No sub categories.
                  </p>
                )}
              </div>
            </div>

            {/* =================================
                Brands
            ================================== */}
            <div className="bg-white rounded-2xl border border-slate-200/60 p-5 shadow-xs">
              <h3 className="text-sm font-montserrat font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 uppercase tracking-wider">
                Filter by Brand
              </h3>

              <div className="flex flex-col gap-1">
                {/* All Brands */}
                <button
                  type="button"
                  onClick={() => setSelectedBrand("All")}
                  className={`flex items-center justify-between w-full px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                    selectedBrand === "All"
                      ? "bg-blue-50 text-blue-600"
                      : "text-slate-500 hover:bg-slate-50"
                  }`}
                >
                  <span>All Brands</span>

                  {selectedBrand === "All" && <Check size={16} />}
                </button>

                {/* API Brands */}
                {(category.brands || []).map((brand) => (
                  <button
                    type="button"
                    key={brand.id}
                    onClick={() => setSelectedBrand(brand.title)}
                    className={`flex items-center justify-between w-full px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                      selectedBrand === brand.title
                        ? "bg-blue-50 text-blue-600"
                        : "text-slate-500 hover:bg-slate-50"
                    }`}
                  >
                    <span>{brand.title}</span>

                    {selectedBrand === brand.title && <Check size={16} />}
                  </button>
                ))}
              </div>
            </div>

            {/* =================================
                Best Sellers
            ================================== */}
            <div className="bg-white rounded-2xl border border-slate-200/60 p-5 shadow-xs">
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-100">
                <Flame
                  size={18}
                  className="text-amber-500 fill-amber-500 animate-pulse"
                />

                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  Best Sellers
                </h3>
              </div>

              <div className="flex flex-col gap-4">
                {(category.best_sellers || []).map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 group cursor-pointer"
                  >
                    <div className="w-14 h-14 bg-slate-50 border border-slate-100 rounded-xl overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.product_name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-slate-800 truncate group-hover:text-blue-600 transition-colors">
                        {item.product_name}
                      </h4>

                      <p className="text-xs font-extrabold text-slate-900 mt-1">
                        {item.final_price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* =====================================
              Products
          ====================================== */}
          <section className="lg:col-span-3">
            {/* Filter Toolbar */}
            <Filtarbar
              filteredProducts={filteredProducts}
              selectedBrand={selectedBrand}
            />

            {/* Active Filter */}
            {selectedBrand !== "All" && (
              <div className="flex items-center gap-2 mb-5">
                <span className="text-xs text-slate-400">Active filter:</span>

                <button
                  type="button"
                  onClick={() => setSelectedBrand("All")}
                  className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 border border-blue-100 rounded-full px-3 py-1.5 text-xs font-semibold hover:bg-blue-100 transition-colors"
                >
                  {selectedBrand}

                  <span className="text-sm leading-none">×</span>
                </button>
              </div>
            )}

            {/* =====================================
                Products Grid
            ====================================== */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
                {filteredProducts.map((product) => (
                  <Link href={`/shop/${product.slug}`}>
                    <article
                      key={product.id}
                      className="group bg-white rounded-2xl border border-slate-200/70 overflow-hidden shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                    >
                      {/* Product Image */}
                      <div className="relative aspect-square bg-slate-50 overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.product_name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />

                        {/* Popular */}
                        {product.is_suggested && (
                          <div className="absolute top-3 left-3">
                            <span className="inline-flex items-center gap-1 bg-slate-900/90 text-white text-[10px] font-bold px-2 py-1 rounded-lg">
                              <Flame size={11} />
                              Popular
                            </span>
                          </div>
                        )}

                        {/* Add Cart */}
                        <button
                          type="button"
                          className="absolute bottom-3 right-3 w-9 h-9 rounded-xl bg-white/95 backdrop-blur-sm shadow-md flex items-center justify-center text-slate-700 hover:bg-blue-600 hover:text-white transition-all duration-200 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0"
                          aria-label={`Add ${product.product_name} to cart`}
                        >
                          <ShoppingBag size={17} />
                        </button>
                      </div>

                      {/* Product Info */}
                      <div className="p-3.5 sm:p-4">
                        {/* Brand */}
                        <span className="text-[10px] sm:text-[11px] font-bold text-blue-600 uppercase tracking-wider">
                          {product.brand?.title || "Unknown Brand"}
                        </span>

                        {/* Title */}
                        <h3 className="mt-1 text-sm sm:text-[15px] font-bold text-slate-900 line-clamp-2 min-h-[40px] group-hover:text-blue-600 transition-colors">
                          {product.product_name}
                        </h3>

                        {/* Price */}
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex flex-col">
                            {product.has_discount && (
                              <span className="text-xs text-slate-400 line-through">
                                {product.price}
                              </span>
                            )}

                            <span className="text-base sm:text-lg font-black text-slate-900">
                              {product.final_price}
                            </span>
                          </div>

                          <span className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors">
                            View
                          </span>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="bg-white rounded-2xl border border-slate-200/70 p-10 sm:p-16 text-center">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-slate-100 flex items-center justify-center mb-5">
                  <SlidersHorizontal size={28} className="text-slate-400" />
                </div>

                <h3 className="text-lg font-bold text-slate-900">
                  No products found
                </h3>

                <p className="text-sm text-slate-500 mt-2 max-w-md mx-auto">
                  We couldn't find any products for the selected brand. Try
                  selecting another brand or clear the filter.
                </p>

                <button
                  type="button"
                  onClick={() => setSelectedBrand("All")}
                  className="mt-5 inline-flex items-center justify-center rounded-xl bg-blue-600 text-white px-5 py-2.5 text-sm font-bold hover:bg-blue-700 transition-colors"
                >
                  Clear Filter
                </button>
              </div>
            )}

            {/* Pagination - فعلاً ظاهری */}
            {filteredProducts.length > 0 && (
              <div className="flex items-center justify-center gap-2 mt-10">
                <button
                  type="button"
                  disabled
                  className="w-9 h-9 rounded-xl border border-slate-200 bg-white text-slate-400 flex items-center justify-center opacity-50"
                >
                  <ChevronRight size={16} className="rotate-180" />
                </button>

                <button
                  type="button"
                  className="w-9 h-9 rounded-xl bg-blue-600 text-white text-sm font-bold shadow-sm"
                >
                  1
                </button>

                <button
                  type="button"
                  className="w-9 h-9 rounded-xl border border-slate-200 bg-white text-slate-600 text-sm font-semibold hover:bg-slate-50"
                >
                  2
                </button>

                <button
                  type="button"
                  className="w-9 h-9 rounded-xl border border-slate-200 bg-white text-slate-600 text-sm font-semibold hover:bg-slate-50"
                >
                  3
                </button>

                <button
                  type="button"
                  className="w-9 h-9 rounded-xl border border-slate-200 bg-white text-slate-600 flex items-center justify-center hover:bg-slate-50"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
};

export default CategoryPage;
