
import React from "react";
import Link from "next/link";
import FilterSidebar from "./FilterSidebar";
import ProductCard from "./productCard";
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

// ======================================================
// GET PRODUCTS
// ======================================================

async function getProducts() {
  const res = await fetch(
    `${API_URL}/api/product/all/`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error(
      "خطا در دریافت اطلاعات محصولات"
    );
  }

  return res.json();
}

// ======================================================
// SHOP PAGE
// ======================================================

export default async function ShopPage({
  searchParams,
}) {
  // ==============================================
  // GET PRODUCTS
  // ==============================================

  const products = await getProducts();

  // ==============================================
  // NEXT.JS 15+
  // ==============================================

  const params = await searchParams;

  // ==============================================
  // URL PARAMETERS
  // ==============================================

  const viewMode =
    params?.view || "grid";

  const sortBy =
    params?.sort || "newest";

  const selectedCategory =
    params?.category || "all";

  const selectedBrand =
    params?.brand || "all";

  const selectedColor =
    params?.color || "all";

  const maxPrice =
    params?.price
      ? Number(params.price)
      : 20000;

  // ==============================================
  // START FILTERING
  // ==============================================

  let filteredProducts = [...products];

  // ==============================================
  // CATEGORY FILTER
  // ==============================================

  if (selectedCategory !== "all") {
    const normalizedCategory =
      String(selectedCategory)
        .trim()
        .toLowerCase();

    filteredProducts =
      filteredProducts.filter((product) => {
        const productCategory =
          String(product.category || "")
            .trim()
            .toLowerCase();

        return (
          productCategory ===
          normalizedCategory
        );
      });
  }

  // ==============================================
  // BRAND FILTER
  // ==============================================

  if (selectedBrand !== "all") {
    const normalizedBrand =
      String(selectedBrand)
        .trim()
        .toLowerCase();

    filteredProducts =
      filteredProducts.filter((product) => {
        const productBrand =
          String(product.brand || "")
            .trim()
            .toLowerCase();

        return (
          productBrand ===
          normalizedBrand
        );
      });
  }

  // ==============================================
  // COLOR FILTER
  // ==============================================

  if (selectedColor !== "all") {
    const normalizedColor =
      String(selectedColor)
        .trim()
        .toLowerCase();

    filteredProducts =
      filteredProducts.filter((product) => {
        const productColor =
          String(product.color || "")
            .trim()
            .toLowerCase();

        return (
          productColor ===
          normalizedColor
        );
      });
  }

  // ==============================================
  // PRICE FILTER
  // ==============================================

  filteredProducts =
    filteredProducts.filter((product) => {
      const productPrice =
        product.discount_price !== null &&
        product.discount_price !== undefined
          ? Number(product.discount_price)
          : Number(product.price);

      return productPrice <= maxPrice;
    });

  // ==============================================
  // SORT / SPECIAL FILTER
  // ==============================================

  // ----------------------------------------------
  // NEWEST
  // جدیدترین محصولات
  // ----------------------------------------------

  if (sortBy === "newest") {
    filteredProducts = [
      ...filteredProducts,
    ].sort((a, b) => {
      const dateA =
        new Date(a.created_at).getTime();

      const dateB =
        new Date(b.created_at).getTime();

      return dateB - dateA;
    });
  }

  // ----------------------------------------------
  // NEW ARRIVALS
  // جدیدترین محصولات
  // ----------------------------------------------

  else if (sortBy === "new-arrivals") {
    filteredProducts = [
      ...filteredProducts,
    ].sort((a, b) => {
      const dateA =
        new Date(a.created_at).getTime();

      const dateB =
        new Date(b.created_at).getTime();

      return dateB - dateA;
    });
  }

  // ----------------------------------------------
  // CHEAPEST
  // ارزان‌ترین
  // ----------------------------------------------

  else if (sortBy === "cheapest") {
    filteredProducts = [
      ...filteredProducts,
    ].sort((a, b) => {
      const priceA =
        a.discount_price !== null &&
        a.discount_price !== undefined
          ? Number(a.discount_price)
          : Number(a.price);

      const priceB =
        b.discount_price !== null &&
        b.discount_price !== undefined
          ? Number(b.discount_price)
          : Number(b.price);

      return priceA - priceB;
    });
  }

  // ----------------------------------------------
  // MOST EXPENSIVE
  // گران‌ترین
  // ----------------------------------------------

  else if (sortBy === "most-expensive") {
    filteredProducts = [
      ...filteredProducts,
    ].sort((a, b) => {
      const priceA =
        a.discount_price !== null &&
        a.discount_price !== undefined
          ? Number(a.discount_price)
          : Number(a.price);

      const priceB =
        b.discount_price !== null &&
        b.discount_price !== undefined
          ? Number(b.discount_price)
          : Number(b.price);

      return priceB - priceA;
    });
  }

  // ----------------------------------------------
  // SPECIAL DISCOUNTS
  // محصولات دارای پیشنهاد ویژه
  // ----------------------------------------------

  else if (sortBy === "special-discounts") {
    filteredProducts =
      filteredProducts.filter(
        (product) =>
          product.is_special_offer === true
      );

    // بعد از فیلتر، محصولات ویژه را
    // بر اساس قیمت تخفیفی مرتب می‌کنیم

    filteredProducts = [
      ...filteredProducts,
    ].sort((a, b) => {
      const discountA =
        a.discount_price !== null &&
        a.discount_price !== undefined
          ? Number(a.discount_price)
          : Number(a.price);

      const discountB =
        b.discount_price !== null &&
        b.discount_price !== undefined
          ? Number(b.discount_price)
          : Number(b.price);

      return discountA - discountB;
    });
  }

  // ----------------------------------------------
  // BEST SELLING
  // بیشترین فروش
  // ----------------------------------------------

  else if (sortBy === "best-selling") {
    filteredProducts = [
      ...filteredProducts,
    ].sort((a, b) => {
      const salesA =
        Number(a.sales_count) || 0;

      const salesB =
        Number(b.sales_count) || 0;

      return salesB - salesA;
    });
  }

  // ----------------------------------------------
  // POPULAR
  // بیشترین بازدید
  // ----------------------------------------------

  else if (sortBy === "popular") {
    filteredProducts = [
      ...filteredProducts,
    ].sort((a, b) => {
      const visitsA =
        Number(a.visited_count) || 0;

      const visitsB =
        Number(b.visited_count) || 0;

      return visitsB - visitsA;
    });
  }

  // ==============================================
  // VIEW MODE
  // ==============================================

  const isGrid =
    viewMode === "grid";

  // ==============================================
  // URL HELPER
  // ==============================================

  const createUrl = (newViewMode) => {
    const urlParams =
      new URLSearchParams();

    urlParams.set(
      "view",
      newViewMode
    );

    urlParams.set(
      "sort",
      sortBy
    );

    urlParams.set(
      "category",
      selectedCategory
    );

    urlParams.set(
      "brand",
      selectedBrand
    );

    urlParams.set(
      "color",
      selectedColor
    );

    urlParams.set(
      "price",
      String(maxPrice)
    );

    return `?${urlParams.toString()}`;
  };

  // ==============================================
  // RETURN
  // ==============================================

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "20px",
        direction: "rtl",
        fontFamily: "sans-serif",
      }}
    >
      {/* ==========================================
          PAGE TITLE
      ========================================== */}

      <h1
        style={{
          textAlign: "center",
          marginBottom: "30px",
        }}
      >
        Store Products
      </h1>

      {/* ==========================================
          MAIN
      ========================================== */}

      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        {/* ========================================
            FILTER SIDEBAR
        ======================================== */}

        <FilterSidebar
          currentFilters={{
            selectedCategory,
            selectedBrand,
            selectedColor,
            maxPrice,
            sortBy,
            viewMode,
          }}
        />

        {/* ========================================
            PRODUCTS
        ======================================== */}

        <div
          style={{
            flex: "3 1 600px",
          }}
        >
          {/* ======================================
              TOOLBAR
          ====================================== */}

          <div
            style={{
              display: "flex",
              justifyContent:
                "space-between",
              alignItems: "center",
              backgroundColor: "#eee",
              padding: "10px 15px",
              borderRadius: "6px",
              marginBottom: "20px",
            }}
          >
            <div>
              Total products:{" "}
              {filteredProducts.length}
            </div>

            {/* VIEW MODE */}

            <div
              style={{
                display: "flex",
                gap: "5px",
              }}
            >
              {/* GRID */}

              <Link
                href={createUrl("grid")}
                style={{
                  padding: "6px 12px",
                  textDecoration: "none",
                  backgroundColor:
                    isGrid
                      ? "#333"
                      : "#fff",
                  color:
                    isGrid
                      ? "#fff"
                      : "#333",
                  border:
                    "1px solid #ccc",
                  borderRadius: "4px",
                }}
              >
                🎛 Grid
              </Link>

              {/* LIST */}

              <Link
                href={createUrl("list")}
                style={{
                  padding: "6px 12px",
                  textDecoration: "none",
                  backgroundColor:
                    !isGrid
                      ? "#333"
                      : "#fff",
                  color:
                    !isGrid
                      ? "#fff"
                      : "#333",
                  border:
                    "1px solid #ccc",
                  borderRadius: "4px",
                }}
              >
                ≡ List
              </Link>
            </div>
          </div>

          {/* ======================================
              NO PRODUCTS
          ====================================== */}

          {filteredProducts.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "40px",
                color: "#666",
              }}
            >
              No products found
            </div>
          ) : (
            /* ======================================
               PRODUCT LIST
            ====================================== */

            <div
              style={{
                display:
                  isGrid
                    ? "grid"
                    : "block",

                gridTemplateColumns:
                  "repeat(auto-fill, minmax(240px, 1fr))",

                gap: "20px",
              }}
            >
              {filteredProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  isGrid={isGrid}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
