
"use client";

import React from "react";
import Link from "next/link";

import {
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  PackageCheck,
  ChevronRight,
} from "lucide-react";

import { useBasket } from "@/context/BasketContext";

import EmptyCart from "./empty";
import Sidebar_total from "./sidebar_total";
import TrustFeatures from "./TrustFeatures";

export default function CartPage() {
  const {
    basket,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
  } = useBasket();

  // =====================================================
  // محاسبه قیمت محصول
  // =====================================================
  //
  // قانون:
  // discount_price <= 100  → درصد تخفیف
  // discount_price > 100   → مبلغ ثابت تخفیف
  //
  // مثال:
  // price = 300
  // discount_price = 40
  // => 40% تخفیف
  // => قیمت نهایی = 180
  //
  // مثال:
  // price = 19200
  // discount_price = 2000
  // => 2000 افغانی تخفیف ثابت
  // => قیمت نهایی = 17200
  // =====================================================

  const calculateProductPrice = (item) => {
    const originalPrice = Number(item.price || 0);

    const discountValue = Number(
      item.discountPrice ??
        item.discount_price ??
        0
    );

    // -------------------------------------------------
    // بدون تخفیف
    // -------------------------------------------------
    if (discountValue <= 0) {
      return {
        originalPrice,
        discountAmount: 0,
        finalPrice: originalPrice,
      };
    }

    // -------------------------------------------------
    // تخفیف درصدی
    // مثال:
    // 300 - 40%
    // -------------------------------------------------
    if (discountValue <= 100) {
      const discountAmount =
        (originalPrice * discountValue) / 100;

      const finalPrice =
        originalPrice - discountAmount;

      return {
        originalPrice,
        discountAmount,
        finalPrice: Math.max(finalPrice, 0),
      };
    }

    // -------------------------------------------------
    // تخفیف مبلغ ثابت
    // مثال:
    // 19200 - 2000
    // -------------------------------------------------

    const discountAmount = Math.min(
      discountValue,
      originalPrice
    );

    const finalPrice =
      originalPrice - discountAmount;

    return {
      originalPrice,
      discountAmount,
      finalPrice: Math.max(finalPrice, 0),
    };
  };

  // =====================================================
  // Subtotal
  // =====================================================
  //
  // Subtotal = قیمت نهایی محصولات × تعداد
  //
  // توجه:
  // اینجا قیمت بعد از تخفیف استفاده می‌شود.
  // =====================================================

  const subtotal = basket.reduce(
    (total, item) => {
      const quantity = Number(
        item.quantity || 0
      );

      const {
        finalPrice,
      } = calculateProductPrice(item);

      return (
        total +
        finalPrice * quantity
      );
    },
    0
  );

  // =====================================================
  // مجموع قیمت اصلی محصولات
  // =====================================================

  const originalTotal = basket.reduce(
    (total, item) => {
      const quantity = Number(
        item.quantity || 0
      );

      const originalPrice = Number(
        item.price || 0
      );

      return (
        total +
        originalPrice * quantity
      );
    },
    0
  );

  // =====================================================
  // مجموع تخفیف
  // =====================================================
  //
  // این مقدار فقط برای نمایش است.
  // دوباره از subtotal کم نمی‌شود.
  // =====================================================

  const totalDiscount = basket.reduce(
    (total, item) => {
      const quantity = Number(
        item.quantity || 0
      );

      const {
        discountAmount,
      } = calculateProductPrice(item);

      return (
        total +
        discountAmount * quantity
      );
    },
    0
  );

  // =====================================================
  // هزینه ارسال
  // =====================================================
  //
  // 4000 افغانی یا بیشتر:
  // ارسال رایگان
  //
  // کمتر از 4000:
  // 250 افغانی
  //
  // سبد خالی:
  // 0
  // =====================================================

  const shipping =
    subtotal >= 4000
      ? 0
      : subtotal > 0
        ? 250
        : 0;

  // =====================================================
  // Total
  // =====================================================
  //
  // subtotal قبلاً تخفیف را اعمال کرده است.
  // بنابراین totalDiscount را دوباره کم نمی‌کنیم.
  // =====================================================

  const total =
    subtotal + shipping;

  // =====================================================
  // تعداد کل محصولات
  // =====================================================

  const totalItems = basket.reduce(
    (total, item) =>
      total +
      Number(item.quantity || 0),
    0
  );

  // =====================================================
  // Empty Cart
  // =====================================================

  if (basket.length === 0) {
    return <EmptyCart />;
  }

  return (
    <main className="min-h-screen bg-[#F7F8F9] px-4 py-8 sm:px-6 lg:px-8">

      <section className="max-w-7xl mx-auto">

        {/* Breadcrumb */}

        <div className="flex items-center font-montserrat gap-2 text-sm text-slate-400 mb-6">

          <Link
            href="/"
            className="hover:text-[#045FF8] transition-colors"
          >
            Home
          </Link>

          <ChevronRight size={15} />

          <span className="text-slate-600 font-montserrat">
            Shopping Cart
          </span>

        </div>


        {/* Page Header */}

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8">

          <div>

            <h1 className="text-3xl sm:text-4xl font-black text-[#03215B]">
              Shopping Cart
            </h1>

            <p className="text-slate-500 mt-2">
              {totalItems}{" "}
              {totalItems === 1
                ? "item"
                : "items"}{" "}
              in your cart
            </p>

          </div>


          <Link
            href="/shop"
            className="
              inline-flex
              items-center
              gap-2
              text-sm
              font-bold
              text-[#045FF8]
              hover:text-blue-700
              font-montserrat
            "
          >
            <ArrowLeft size={17} />

            Continue Shopping
          </Link>

        </div>


        {/* Main Grid */}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">

          {/* Cart Products */}

          <div className="lg:col-span-8 space-y-4">

            {/* Products Card */}

            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

              {/* Header */}

              <div className="hidden sm:grid grid-cols-12 gap-4 px-6 py-4 bg-slate-50 border-b border-slate-100 text-xs font-bold text-slate-500 uppercase tracking-wide">

                <div className="col-span-6 font-montserrat">
                  Product
                </div>

                <div className="col-span-2 text-center font-montserrat">
                  Price
                </div>

                <div className="col-span-2 text-center font-montserrat">
                  Quantity
                </div>

                <div className="col-span-2 text-right font-montserrat">
                  Total
                </div>

              </div>


              {/* Items */}

              <div className="divide-y divide-slate-100">

                {basket.map((item) => {

                  // =================================================
                  // محاسبه قیمت همین محصول
                  // =================================================

                  const {
                    originalPrice,
                    discountAmount,
                    finalPrice: currentPrice,
                  } = calculateProductPrice(item);


                  // تعداد

                  const quantity =
                    Number(
                      item.quantity || 0
                    );


                  // مجموع قیمت محصول

                  const itemTotal =
                    currentPrice *
                    quantity;


                  // Product ID

                  const productId =
                    item.productId ??
                    item.id;


                  // Product Name

                  const productName =
                    item.name ??
                    item.product_name ??
                    "Product";


                  // Product Image

                  const productImage =
                    item.image ||
                    "/images/placeholder.png";


                  // Product Slug

                  const productSlug =
                    item.slug || "";


                  // Stock

                  const stock =
                    Number(
                      item.stock || 0
                    );


                  return (

                    <div
                      key={item.id}
                      className="p-5 sm:px-6 sm:py-6"
                    >

                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">


                        {/* Product */}

                        <div className="sm:col-span-6 flex gap-4">

                          {/* Image */}

                          <Link
                            href={`/shop/${productSlug}`}
                            className="
                              w-24
                              h-24
                              sm:w-28
                              sm:h-28
                              shrink-0
                              bg-slate-50
                              border
                              border-slate-100
                              rounded-xl
                              p-2
                              flex
                              items-center
                              justify-center
                              overflow-hidden
                            "
                          >

                            <img
                              src={productImage}
                              alt={productName}
                              className="
                                max-w-full
                                max-h-full
                                object-contain
                              "
                            />

                          </Link>


                          {/* Information */}

                          <div className="min-w-0 flex flex-col justify-between py-1">

                            <div>

                              <Link
                                href={`/products/${productSlug}`}
                                className="
                                  font-bold
                                  text-[#03215B]
                                  hover:text-[#045FF8]
                                  transition-colors
                                  leading-snug
                                  font-montserrat
                                "
                              >
                                {productName}
                              </Link>


                              <p className="text-xs font-inter text-slate-400 mt-2">
                                Product ID: #{productId}
                              </p>


                              <span
                                className="
                                  inline-flex
                                  font-montserrat
                                  items-center
                                  gap-1.5
                                  mt-3
                                  text-xs
                                  font-semibold
                                  text-emerald-600
                                "
                              >

                                <PackageCheck size={14} />

                                {stock > 0
                                  ? "In Stock"
                                  : "Out of Stock"}

                              </span>

                            </div>


                            {/* Mobile Price */}

                            <div className="sm:hidden mt-3">

                              <span className="font-black text-[#045FF8]">

                                {currentPrice.toLocaleString(
                                  "fa-IR"
                                )}{" "}
                                Af

                              </span>


                              {originalPrice !== currentPrice && (

                                <span className="ml-2 text-xs text-slate-400 line-through">

                                  {originalPrice.toLocaleString(
                                    "fa-IR"
                                  )}{" "}
                                  Af

                                </span>

                              )}

                            </div>

                          </div>

                        </div>


                        {/* Price */}

                        <div className="hidden sm:block sm:col-span-2 text-center">

                          <div className="font-bold text-[#03215B]">

                            {currentPrice.toLocaleString(
                              "fa-IR"
                            )}{" "}
                            Af

                          </div>


                          {originalPrice !== currentPrice && (

                            <div className="text-xs text-slate-400 line-through mt-1">

                              {originalPrice.toLocaleString(
                                "fa-IR"
                              )}{" "}
                              Af

                            </div>

                          )}

                        </div>


                        {/* Quantity */}

                        <div className="sm:col-span-2 flex sm:justify-center">

                          <div
                            className="
                              inline-flex
                              items-center
                              border
                              border-slate-200
                              rounded-xl
                              bg-slate-50
                              overflow-hidden
                            "
                          >

                            {/* Minus */}

                            <button
                              type="button"
                              onClick={() =>
                                decreaseQuantity(
                                  item.id
                                )
                              }
                              disabled={
                                quantity <= 1
                              }
                              className="
                                w-9
                                h-10
                                flex
                                items-center
                                justify-center
                                text-slate-500
                                hover:bg-white
                                hover:text-[#045FF8]
                                transition-colors
                                disabled:opacity-30
                                disabled:cursor-not-allowed
                              "
                            >

                              <Minus size={15} />

                            </button>


                            {/* Quantity */}

                            <span
                              className="
                                w-10
                                text-center
                                text-sm
                                font-bold
                                text-[#03215B]
                              "
                            >
                              {quantity}
                            </span>


                            {/* Plus */}

                            <button
                              type="button"
                              onClick={() =>
                                increaseQuantity(
                                  item.id
                                )
                              }
                              disabled={
                                quantity >= stock
                              }
                              className="
                                w-9
                                h-10
                                flex
                                items-center
                                justify-center
                                text-slate-500
                                hover:bg-white
                                hover:text-[#045FF8]
                                transition-colors
                                disabled:opacity-30
                                disabled:cursor-not-allowed
                              "
                            >

                              <Plus size={15} />

                            </button>

                          </div>

                        </div>


                        {/* Total */}

                        <div className="sm:col-span-2 flex items-center justify-between sm:justify-end gap-4">

                          <span className="sm:hidden text-xs font-montserrat font-bold text-slate-400">
                            Total
                          </span>


                          <div className="text-right">

                            <div className="font-black text-[#03215B] font-inter">

                              {itemTotal.toLocaleString(
                                "fa-IR"
                              )}{" "}
                              Af

                            </div>

                          </div>


                          {/* Delete */}

                          <button
                            type="button"
                            onClick={() =>
                              removeItem(item.id)
                            }
                            className="
                              w-9
                              h-9
                              rounded-lg
                              flex
                              items-center
                              justify-center
                              text-slate-400
                              hover:text-red-500
                              hover:bg-red-50
                              transition-all
                            "
                            aria-label="Remove product"
                          >

                            <Trash2 size={17} />

                          </button>

                        </div>

                      </div>

                    </div>

                  );

                })}

              </div>

            </div>


            {/* Trust Features */}

            <TrustFeatures />

          </div>


          {/* Order Summary */}

          <Sidebar_total
            subtotal={subtotal}
            totalDiscount={totalDiscount}
            shipping={shipping}
            total={total}
          />

        </div>

      </section>

    </main>
  );
}
