"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function FilterSidebar({ currentFilters }) {
  const router = useRouter();
  const pathname = usePathname();

  const [brands, setBrands] = useState([]);

  // ========================================
  // GET BRANDS
  // ========================================
  useEffect(() => {
    const getBrands = async () => {
      try {
        const res = await fetch(
          "http://127.0.0.1:8000/api/product/brands/"
        );

        if (!res.ok) {
          throw new Error("Failed to fetch brands");
        }

        const data = await res.json();

        setBrands(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };

    getBrands();
  }, []);

  // ========================================
  // CURRENT FILTERS
  // ========================================
  const {
    selectedCategory = "all",
    selectedBrand = "all",
    selectedColor = "all",
    maxPrice = 20000,
    sortBy = "newest",
    viewMode = "grid",
  } = currentFilters || {};

  // ========================================
  // LOCAL PRICE
  // ========================================
  const [localPrice, setLocalPrice] = useState(maxPrice);

  useEffect(() => {
    setLocalPrice(maxPrice);
  }, [maxPrice]);

  // ========================================
  // UPDATE URL
  // ========================================
  const updateUrl = (updatedParams = {}) => {
    const params = new URLSearchParams();

    const finalParams = {
      view: viewMode,
      sort: sortBy,
      category: selectedCategory,
      brand: selectedBrand,
      color: selectedColor,
      price: localPrice,
      ...updatedParams,
    };

    Object.entries(finalParams).forEach(([key, value]) => {
      if (
        value !== undefined &&
        value !== null &&
        value !== "" &&
        value !== "all"
      ) {
        params.set(key, String(value));
      }
    });

    const queryString = params.toString();

    router.push(
      queryString
        ? `${pathname}?${queryString}`
        : pathname
    );
  };

  // ========================================
  // RESET
  // ========================================
  const resetFilters = () => {
    setLocalPrice(20000);
    router.push(pathname);
  };

  return (
    <aside
      style={{
        flex: "1 1 250px",
        border: "1px solid #ddd",
        padding: "20px",
        borderRadius: "8px",
        backgroundColor: "#f9f9f9",
        height: "fit-content",
      }}
    >
      <h3>Advanced Filter</h3>

      {/* ========================================
          SORT
      ======================================== */}
      <div style={{ marginTop: "20px" }}>
        <label
          style={{
            display: "block",
            marginBottom: "8px",
            fontWeight: "bold",
          }}
        >
          Sort By
        </label>

        <select
          value={sortBy}
          onChange={(e) =>
            updateUrl({
              sort: e.target.value,
            })
          }
          style={{
            width: "100%",
            padding: "8px",
            borderRadius: "4px",
          }}
        >
          <option value="newest">
            Newest
          </option>

          <option value="new-arrivals">
            New Arrivals
          </option>

          <option value="cheapest">
            Cheapest
          </option>

          <option value="most-expensive">
            Most Expensive
          </option>

          <option value="special-discounts">
            Special Discounts
          </option>

          <option value="best-selling">
            Best Selling
          </option>

          <option value="popular">
            Popular
          </option>
        </select>
      </div>

      {/* ========================================
          PRICE
      ======================================== */}
      <div style={{ marginTop: "20px" }}>
        <label
          style={{
            display: "block",
            marginBottom: "8px",
            fontWeight: "bold",
          }}
        >
          Maximum Price:{" "}
          {Number(localPrice).toLocaleString()} Af
        </label>

        <input
          type="range"
          min="0"
          max="20000"
          step="500"
          value={localPrice}
          onChange={(e) =>
            setLocalPrice(Number(e.target.value))
          }
          onMouseUp={() =>
            updateUrl({
              price: localPrice,
            })
          }
          onTouchEnd={() =>
            updateUrl({
              price: localPrice,
            })
          }
          style={{
            width: "100%",
          }}
        />
      </div>

      {/* ========================================
          CATEGORY
      ======================================== */}
      <div style={{ marginTop: "25px" }}>
        <label
          style={{
            display: "block",
            marginBottom: "8px",
            fontWeight: "bold",
          }}
        >
          Category
        </label>

        <select
          value={selectedCategory}
          onChange={(e) =>
            updateUrl({
              category: e.target.value,
            })
          }
          style={{
            width: "100%",
            padding: "8px",
            borderRadius: "4px",
          }}
        >
          <option value="all">
            All Categories
          </option>

          <option value="mobile">
            Mobile
          </option>

          <option value="tablate">
            Tablate
          </option>

          <option value="laptop">
            Laptop
          </option>
        </select>
      </div>

      {/* ========================================
          BRAND
      ======================================== */}
      <div style={{ marginTop: "25px" }}>
        <label
          style={{
            display: "block",
            marginBottom: "8px",
            fontWeight: "bold",
          }}
        >
          Brand
        </label>

        <select
          value={selectedBrand}
          onChange={(e) =>
            updateUrl({
              brand: e.target.value,
            })
          }
          style={{
            width: "100%",
            padding: "8px",
            borderRadius: "4px",
          }}
        >
          <option value="all">
            All Brands
          </option>

          {brands.map((item) => {
            const brandValue = String(
              item.title || ""
            )
              .trim()
              .toLowerCase();

            return (
              <option
                key={item.id || brandValue}
                value={brandValue}
              >
                {item.title}
              </option>
            );
          })}
        </select>
      </div>

      {/* ========================================
          COLOR
      ======================================== */}
      {/* <div style={{ marginTop: "25px" }}>
        <label
          style={{
            display: "block",
            marginBottom: "8px",
            fontWeight: "bold",
          }}
        >
          Color
        </label>

        <select
          value={selectedColor}
          onChange={(e) =>
            updateUrl({
              color: e.target.value,
            })
          }
          style={{
            width: "100%",
            padding: "8px",
            borderRadius: "4px",
          }}
        >
          <option value="all">
            All Colors
          </option>

          <option value="black">
            Black
          </option>

          <option value="white">
            White
          </option>

          <option value="blue">
            Blue
          </option>

          <option value="red">
            Red
          </option>
        </select>
      </div> */}

      {/* ========================================
          RESET
      ======================================== */}
      <button
        type="button"
        onClick={resetFilters}
        style={{
          width: "100%",
          marginTop: "25px",
          padding: "10px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          backgroundColor: "#222",
          color: "#fff",
        }}
      >
        Reset Filters
      </button>
    </aside>
  );
}