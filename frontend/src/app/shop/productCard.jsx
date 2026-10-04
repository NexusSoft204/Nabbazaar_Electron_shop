
import Link from "next/link";
import React from "react";

// دریافت محصول و وضعیت گرید به صورت همزمان از ورودی
const ProductCard = ({ product, isGrid }) => {
  // جلوگیری از ارور در صورتی که دیتای محصول هنوز لود نشده باشد
  if (!product) return null;

  return (
    <Link
      href={`/shop/${product.slug}`}
      style={{
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        padding: "15px",
        display: isGrid ? "block" : "flex",
        gap: "20px",
        backgroundColor: "#fff",
        marginBottom: isGrid ? "0" : "15px",
        textDecoration: "none",
        color: "inherit",
      }}
    >
      {/* IMAGE */}
      <img
        src={product.image}
        alt={product.product_name}
        style={{
          width: isGrid ? "100%" : "150px",
          height: "150px",
          objectFit: "contain",
        }}
      />

      {/* INFO */}
      <div style={{ flex: 1 }}>
        <h3
          style={{
            fontSize: "16px",
            margin: "10px 0",
          }}
        >
          {product.product_name}
        </h3>

        <p
          style={{
            color: "#777",
            fontSize: "13px",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {product.short_description}
        </p>

        {/* PRICE */}
        <div style={{ marginTop: "15px" }}>
          {product.discount_price !== null &&
          product.discount_price !== undefined ? (
            <>
              <span style={{ color: "#e53e3e", fontWeight: "bold" }}>
                {Number(product.discount_price).toLocaleString()} Af
              </span>

              <span
                style={{
                  textDecoration: "line-through",
                  color: "#aaa",
                  fontSize: "14px",
                  marginRight: "8px",
                }}
              >
                {Number(product.price).toLocaleString()} Af
              </span>
            </>
          ) : (
            <span style={{ fontWeight: "bold" }}>
              {Number(product.price).toLocaleString()} Af
            </span>
          )}
        </div>
      </div>

      {/* SHOW MORE */}
      <div
        style={{
          display: isGrid ? "block" : "flex",
          alignItems: "flex-end",
        }}
      >
        <button
          className="w-full px-10 h-10 bg-primary-blue text-white rounded-sm mt-4 font-montserrat capitalize text-sm cursor-pointer"
        >
          show more
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;
