"use client";

import React, { useMemo, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  CreditCard,
  MapPin,
  Minus,
  Package,
  Phone,
  Plus,
  ShoppingBag,
  Trash2,
  Truck,
  User,
} from "lucide-react";

import { useBasket } from "@/context/BasketContext";

const Checkout = () => {
  const router = useRouter();

    if (!process.env.NEXT_PUBLIC_API_URL) {
      throw new Error("NEXT_PUBLIC_API_URL is not configured");
    }

    const API_URL = process.env.NEXT_PUBLIC_API_URL;


  const {
    basket,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    clearBasket,
  } = useBasket();

  // ----------------------------------------------------
  // Customer Form
  // ----------------------------------------------------

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    province: "kabul",
    city: "",
    address: "",
    notes: "",
  });

  // ----------------------------------------------------
  // Shipping & Payment
  // ----------------------------------------------------

  const [shippingMethod, setShippingMethod] = useState("normal");
  const [paymentMethod, setPaymentMethod] = useState("cod");

  // ----------------------------------------------------
  // Submit State
  // ----------------------------------------------------

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // ----------------------------------------------------
  // Shipping Prices
  // ----------------------------------------------------

  const shippingCosts = {
    normal: 0,
    express: 100,
    pickup: 0,
  };

  // ----------------------------------------------------
  // Get Product Price
  // ----------------------------------------------------

  const getProductPrice = (item) => {
  // اگر آیتم سبد خرید Variant دارد
  if (item.variant) {
    const variantPrice = Number(item.variant.price || 0);

    const variantDiscountPrice = Number(
      item.variant.discount_price ?? 0
    );

    if (
      variantDiscountPrice > 0 &&
      variantDiscountPrice < variantPrice
    ) {
      return variantDiscountPrice;
    }

    return variantPrice;
  }

  // قیمت خود Product
  const price = Number(item.price || 0);

  const discountPrice = Number(
    item.discount_price ??
      item.discountPrice ??
      0
  );

  if (
    discountPrice > 0 &&
    discountPrice < price
  ) {
    return discountPrice;
  }

  return price;
};

  // ----------------------------------------------------
  // Subtotal
  // ----------------------------------------------------

  const subtotal = useMemo(() => {
    return basket.reduce((total, item) => {
      const price = getProductPrice(item);
      const quantity = Number(item.quantity || 0);

      return total + price * quantity;
    }, 0);
  }, [basket]);

  // ----------------------------------------------------
  // Shipping Cost
  // ----------------------------------------------------

  const shippingCost =
    shippingCosts[shippingMethod] || 0;

  // ----------------------------------------------------
  // Total
  // ----------------------------------------------------

  const total = subtotal + shippingCost;

  // ----------------------------------------------------
  // Form Change
  // ----------------------------------------------------

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) {
      setError("");
    }
  };

  // ----------------------------------------------------
  // Format Price
  // ----------------------------------------------------

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US").format(
      Number(price || 0)
    );
  };

  // ----------------------------------------------------
  // Submit Order
  // ----------------------------------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    // ----------------------------------------------
    // Check Cart
    // ----------------------------------------------

    if (!basket || basket.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    // ----------------------------------------------
    // Validate Customer Information
    // ----------------------------------------------

    if (!formData.name.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (!formData.phone.trim()) {
      setError("Please enter your phone number.");
      return;
    }

    if (!formData.province) {
      setError("Please select your province.");
      return;
    }

    if (!formData.city.trim()) {
      setError("Please enter your city.");
      return;
    }

    if (!formData.address.trim()) {
      setError("Please enter your address.");
      return;
    }

    // ----------------------------------------------
    // Start Loading
    // ----------------------------------------------

    setIsSubmitting(true);

    try {
      // --------------------------------------------
      // Prepare Order Data
      // --------------------------------------------

      const orderData = {
        customer: {
          name: formData.name.trim(),

          phone: formData.phone.trim(),

          province:
            formData.province.toLowerCase(),

          city: formData.city.trim(),

          address: formData.address.trim(),

          notes: formData.notes.trim(),
        },

        shipping_method: shippingMethod,

        payment_method: paymentMethod,

        items: basket.map((item) => ({
          product_id: item.id,

          quantity: Number(
            item.quantity || 0
          ),
        })),
      };

      // console.log(
      //   "ORDER DATA:",
      //   orderData
      // );

      // --------------------------------------------
      // Send Order To Django
      // --------------------------------------------

      const response = await axios.post(
        `${API_URL}/api/order/create/`,
        orderData,
        {
          headers: {
            "Content-Type":
              "application/json",
          },
        }
      );

      console.log(
        "ORDER RESPONSE:",
        response.data
      );

      // --------------------------------------------
      // Get Created Order
      // --------------------------------------------

      const order = response.data?.order;

      if (!order || !order.order_number) {
        throw new Error(
          "Order number was not returned by the server."
        );
      }

      // --------------------------------------------
      // Clear Local Cart
      // --------------------------------------------

      clearBasket();

      // --------------------------------------------
      // Redirect To Success Page
      // --------------------------------------------

      router.push(
        `/order-success/${order.order_number}`
      );
    } catch (error) {
      console.error(
        "Order creation error:",
        error
      );

      let errorMessage =
        "Something went wrong while placing your order.";

      // --------------------------------------------
      // Django Validation Error
      // --------------------------------------------

      if (
        error?.response?.data
      ) {
        const data =
          error.response.data;

        if (data.detail) {
          errorMessage =
            data.detail;
        } else if (data.message) {
          errorMessage =
            data.message;
        } else if (
          typeof data === "string"
        ) {
          errorMessage = data;
        }
      }

      // --------------------------------------------
      // Network Error
      // --------------------------------------------

      if (
        error?.code ===
        "ERR_NETWORK"
      ) {
        errorMessage =
          "Unable to connect to the server. Please make sure Django is running.";
      }

      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ----------------------------------------------------
  // Empty Cart
  // ----------------------------------------------------

  if (!basket || basket.length === 0) {
    return (
      <main className="w-full min-h-screen bg-[#F7F8F9] py-10 px-4">
        <div className="max-w-4xl mx-auto">

          <div className="bg-white rounded-3xl border border-slate-200 p-10 text-center">

            <div className="w-20 h-20 mx-auto rounded-full bg-blue-50 flex items-center justify-center mb-6">
              <ShoppingBag
                className="w-10 h-10 text-[#045FF8]"
              />
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-[#03215B]">
              Your Cart is Empty
            </h1>

            <p className="mt-3 text-slate-500">
              Please add some products to your cart before checkout.
            </p>

            <Link
              href="/shop"
              className="inline-flex items-center justify-center gap-2 mt-7 px-6 h-12 rounded-xl bg-[#045FF8] text-white font-semibold hover:bg-[#03215B] transition"
            >
              <ArrowLeft className="w-4 h-4" />
              Continue Shopping
            </Link>

          </div>

        </div>
      </main>
    );
  }

  // ----------------------------------------------------
  // Main Checkout
  // ----------------------------------------------------

  return (
    <main className="w-full min-h-screen bg-[#F7F8F9] py-6 sm:py-10 px-4">

      <div className="max-w-7xl mx-auto">

        {/* ------------------------------------------------ */}
        {/* Header */}
        {/* ------------------------------------------------ */}

        <div className="mb-8">

          <Link
            href="/cart"
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-[#045FF8] transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Cart
          </Link>

          <div className="mt-5">

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#03215B]">
              Checkout
            </h1>

            <p className="mt-2 text-slate-500">
              Complete your information to place your order.
            </p>

          </div>

        </div>

        {/* ------------------------------------------------ */}
        {/* Error */}
        {/* ------------------------------------------------ */}

        {error && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 flex items-start gap-3">

            <div className="mt-0.5">
              <svg
                className="w-5 h-5 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01M5.07 19h13.86c1.54 0 2.5-1.67 1.73-3L13.73 4a2 2 0 00-3.46 0L3.34 16c-.77 1.33.19 3 1.73 3z"
                />
              </svg>
            </div>

            <p className="text-sm font-medium text-red-600">
              {error}
            </p>

          </div>
        )}

        {/* ------------------------------------------------ */}
        {/* Form */}
        {/* ------------------------------------------------ */}

        <form onSubmit={handleSubmit}>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* ================================================= */}
            {/* LEFT SIDE */}
            {/* ================================================= */}

            <div className="lg:col-span-2 space-y-6">

              {/* ------------------------------------------------ */}
              {/* Customer Information */}
              {/* ------------------------------------------------ */}

              <section className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-7">

                <div className="flex items-center gap-3 mb-6">

                  <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
                    <User className="w-5 h-5 text-[#045FF8]" />
                  </div>

                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-[#03215B]">
                      Customer Information
                    </h2>

                    <p className="text-sm text-slate-500 mt-1">
                      Enter your contact and delivery information.
                    </p>
                  </div>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                  {/* Name */}

                  <div className="sm:col-span-2">

                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold text-slate-700 mb-2"
                    >
                      Full Name
                    </label>

                    <div className="relative">

                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />

                      <input
                        id="name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        className="w-full h-13 pl-12 pr-4 rounded-xl border border-slate-200 bg-white outline-none text-slate-700 placeholder:text-slate-400 focus:border-[#045FF8] focus:ring-4 focus:ring-blue-50 transition"
                      />

                    </div>

                  </div>

                  {/* Phone */}

                  <div>

                    <label
                      htmlFor="phone"
                      className="block text-sm font-semibold text-slate-700 mb-2"
                    >
                      Phone Number
                    </label>

                    <div className="relative">

                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />

                      <input
                        id="phone"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="07XXXXXXXX"
                        className="w-full h-13 pl-12 pr-4 rounded-xl border border-slate-200 bg-white outline-none text-slate-700 placeholder:text-slate-400 focus:border-[#045FF8] focus:ring-4 focus:ring-blue-50 transition"
                      />

                    </div>

                  </div>

                  {/* Province */}

                  <div>

                    <label
                      htmlFor="province"
                      className="block text-sm font-semibold text-slate-700 mb-2"
                    >
                      Province
                    </label>

                    <select
                      id="province"
                      name="province"
                      value={formData.province}
                      onChange={handleChange}
                      className="w-full h-13 px-4 rounded-xl border border-slate-200 bg-white outline-none text-slate-700 focus:border-[#045FF8] focus:ring-4 focus:ring-blue-50 transition"
                    >

                      <option value="kabul">
                        Kabul
                      </option>

                      <option value="herat">
                        Herat
                      </option>

                      <option value="mazar">
                        Mazar
                      </option>

                      <option value="balkh">
                        Balkh
                      </option>

                      <option value="kandahar">
                        Kandahar
                      </option>

                      <option value="nangarhar">
                        Nangarhar
                      </option>

                      <option value="kunduz">
                        Kunduz
                      </option>

                      <option value="takhar">
                        Takhar
                      </option>

                      <option value="bamyan">
                        Bamyan
                      </option>

                      <option value="ghazni">
                        Ghazni
                      </option>

                      <option value="paktia">
                        Paktia
                      </option>

                      <option value="other">
                        Other
                      </option>

                    </select>

                  </div>

                  {/* City */}

                  <div>

                    <label
                      htmlFor="city"
                      className="block text-sm font-semibold text-slate-700 mb-2"
                    >
                      City
                    </label>

                    <input
                      id="city"
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Enter your city"
                      className="w-full h-13 px-4 rounded-xl border border-slate-200 bg-white outline-none text-slate-700 placeholder:text-slate-400 focus:border-[#045FF8] focus:ring-4 focus:ring-blue-50 transition"
                    />

                  </div>

                  {/* Address */}

                  <div>

                    <label
                      htmlFor="address"
                      className="block text-sm font-semibold text-slate-700 mb-2"
                    >
                      Address
                    </label>

                    <div className="relative">

                      <MapPin className="absolute left-4 top-4 w-5 h-5 text-slate-400" />

                      <textarea
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Enter your complete address"
                        rows={4}
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 bg-white outline-none resize-none text-slate-700 placeholder:text-slate-400 focus:border-[#045FF8] focus:ring-4 focus:ring-blue-50 transition"
                      />

                    </div>

                  </div>

                  {/* Notes */}

                  <div>

                    <label
                      htmlFor="notes"
                      className="block text-sm font-semibold text-slate-700 mb-2"
                    >
                      Order Notes
                      <span className="font-normal text-slate-400 ml-1">
                        (Optional)
                      </span>
                    </label>

                    <textarea
                      id="notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      placeholder="Any special instructions..."
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white outline-none resize-none text-slate-700 placeholder:text-slate-400 focus:border-[#045FF8] focus:ring-4 focus:ring-blue-50 transition"
                    />

                  </div>

                </div>

              </section>

              {/* ------------------------------------------------ */}
              {/* Shipping */}
              {/* ------------------------------------------------ */}

              <section className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-7">

                <div className="flex items-center gap-3 mb-6">

                  <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
                    <Truck className="w-5 h-5 text-[#045FF8]" />
                  </div>

                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-[#03215B]">
                      Shipping Method
                    </h2>

                    <p className="text-sm text-slate-500 mt-1">
                      Choose how you want to receive your order.
                    </p>
                  </div>

                </div>

                <div className="space-y-3">

                  {/* Standard */}

                  <label
                    className={`block cursor-pointer rounded-2xl border p-4 transition ${
                      shippingMethod === "normal"
                        ? "border-[#045FF8] bg-blue-50/50"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >

                    <div className="flex items-center gap-4">

                      <input
                        type="radio"
                        name="shipping"
                        value="normal"
                        checked={
                          shippingMethod === "normal"
                        }
                        onChange={(e) =>
                          setShippingMethod(
                            e.target.value
                          )
                        }
                        className="w-5 h-5 accent-[#045FF8]"
                      />

                      <div className="flex-1">

                        <div className="flex items-center justify-between gap-3">

                          <div>
                            <h3 className="font-bold text-slate-800">
                              Standard Delivery
                            </h3>

                            <p className="text-sm text-slate-500 mt-1">
                              Regular delivery service
                            </p>
                          </div>

                          <span className="font-bold text-[#045FF8]">
                            Free
                          </span>

                        </div>

                      </div>

                    </div>

                  </label>

                  {/* Express */}

                  <label
                    className={`block cursor-pointer rounded-2xl border p-4 transition ${
                      shippingMethod === "express"
                        ? "border-[#045FF8] bg-blue-50/50"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >

                    <div className="flex items-center gap-4">

                      <input
                        type="radio"
                        name="shipping"
                        value="express"
                        checked={
                          shippingMethod === "express"
                        }
                        onChange={(e) =>
                          setShippingMethod(
                            e.target.value
                          )
                        }
                        className="w-5 h-5 accent-[#045FF8]"
                      />

                      <div className="flex-1">

                        <div className="flex items-center justify-between gap-3">

                          <div>
                            <h3 className="font-bold text-slate-800">
                              Express Delivery
                            </h3>

                            <p className="text-sm text-slate-500 mt-1">
                              Faster delivery service
                            </p>
                          </div>

                          <span className="font-bold text-[#045FF8]">
                            {formatPrice(100)}
                          </span>

                        </div>

                      </div>

                    </div>

                  </label>

                  {/* Pickup */}

                  <label
                    className={`block cursor-pointer rounded-2xl border p-4 transition ${
                      shippingMethod === "pickup"
                        ? "border-[#045FF8] bg-blue-50/50"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >

                    <div className="flex items-center gap-4">

                      <input
                        type="radio"
                        name="shipping"
                        value="pickup"
                        checked={
                          shippingMethod === "pickup"
                        }
                        onChange={(e) =>
                          setShippingMethod(
                            e.target.value
                          )
                        }
                        className="w-5 h-5 accent-[#045FF8]"
                      />

                      <div className="flex-1">

                        <div className="flex items-center justify-between gap-3">

                          <div>
                            <h3 className="font-bold text-slate-800">
                              Store Pickup
                            </h3>

                            <p className="text-sm text-slate-500 mt-1">
                              Pick up your order from our store
                            </p>
                          </div>

                          <span className="font-bold text-[#045FF8]">
                            Free
                          </span>

                        </div>

                      </div>

                    </div>

                  </label>

                </div>

              </section>

              {/* ------------------------------------------------ */}
              {/* Payment */}
              {/* ------------------------------------------------ */}

              <section className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-7">

                <div className="flex items-center gap-3 mb-6">

                  <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-[#045FF8]" />
                  </div>

                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-[#03215B]">
                      Payment Method
                    </h2>

                    <p className="text-sm text-slate-500 mt-1">
                      Select your preferred payment method.
                    </p>
                  </div>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                  {/* COD */}

                  <label
                    className={`cursor-pointer rounded-2xl border p-4 transition ${
                      paymentMethod === "cod"
                        ? "border-[#045FF8] bg-blue-50/50"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >

                    <div className="flex items-start gap-3">

                      <input
                        type="radio"
                        name="payment"
                        value="cod"
                        checked={
                          paymentMethod === "cod"
                        }
                        onChange={(e) =>
                          setPaymentMethod(
                            e.target.value
                          )
                        }
                        className="w-5 h-5 mt-0.5 accent-[#045FF8]"
                      />

                      <div>
                        <h3 className="font-bold text-slate-800">
                          Cash on Delivery
                        </h3>

                        <p className="text-sm text-slate-500 mt-1">
                          Pay when your order arrives.
                        </p>
                      </div>

                    </div>

                  </label>

                  {/* Online */}

                  <label
                    className={`cursor-pointer rounded-2xl border p-4 transition ${
                      paymentMethod === "online"
                        ? "border-[#045FF8] bg-blue-50/50"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >

                    <div className="flex items-start gap-3">

                      <input
                        type="radio"
                        name="payment"
                        value="online"
                        checked={
                          paymentMethod === "online"
                        }
                        onChange={(e) =>
                          setPaymentMethod(
                            e.target.value
                          )
                        }
                        className="w-5 h-5 mt-0.5 accent-[#045FF8]"
                      />

                      <div>
                        <h3 className="font-bold text-slate-800">
                          Online Payment
                        </h3>

                        <p className="text-sm text-slate-500 mt-1">
                          Pay securely online.
                        </p>
                      </div>

                    </div>

                  </label>

                  {/* Bank */}

                  <label
                    className={`cursor-pointer rounded-2xl border p-4 transition ${
                      paymentMethod === "bank"
                        ? "border-[#045FF8] bg-blue-50/50"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >

                    <div className="flex items-start gap-3">

                      <input
                        type="radio"
                        name="payment"
                        value="bank"
                        checked={
                          paymentMethod === "bank"
                        }
                        onChange={(e) =>
                          setPaymentMethod(
                            e.target.value
                          )
                        }
                        className="w-5 h-5 mt-0.5 accent-[#045FF8]"
                      />

                      <div>
                        <h3 className="font-bold text-slate-800">
                          Bank Transfer
                        </h3>

                        <p className="text-sm text-slate-500 mt-1">
                          Transfer the amount to our bank account.
                        </p>
                      </div>

                    </div>

                  </label>

                  {/* Other */}

                  <label
                    className={`cursor-pointer rounded-2xl border p-4 transition ${
                      paymentMethod === "other"
                        ? "border-[#045FF8] bg-blue-50/50"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >

                    <div className="flex items-start gap-3">

                      <input
                        type="radio"
                        name="payment"
                        value="other"
                        checked={
                          paymentMethod === "other"
                        }
                        onChange={(e) =>
                          setPaymentMethod(
                            e.target.value
                          )
                        }
                        className="w-5 h-5 mt-0.5 accent-[#045FF8]"
                      />

                      <div>
                        <h3 className="font-bold text-slate-800">
                          Other Payment
                        </h3>

                        <p className="text-sm text-slate-500 mt-1">
                          Other supported payment method.
                        </p>
                      </div>

                    </div>

                  </label>

                </div>

              </section>

            </div>

            {/* ================================================= */}
            {/* RIGHT SIDE - ORDER SUMMARY */}
            {/* ================================================= */}

            <div className="lg:col-span-1">

              <div className="lg:sticky lg:top-6">

                <section className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6">

                  {/* ------------------------------------------------ */}
                  {/* Summary Header */}
                  {/* ------------------------------------------------ */}

                  <div className="flex items-center justify-between mb-6">

                    <div className="flex items-center gap-3">

                      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">

                        <Package className="w-5 h-5 text-[#045FF8]" />

                      </div>

                      <div>

                        <h2 className="font-bold text-[#03215B]">
                          Order Summary
                        </h2>

                        <p className="text-xs text-slate-500 mt-1">
                          {basket.length}{" "}
                          {basket.length === 1
                            ? "item"
                            : "items"}
                        </p>

                      </div>

                    </div>

                  </div>

                  {/* ------------------------------------------------ */}
                  {/* Products */}
                  {/* ------------------------------------------------ */}

                  <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">

                    {basket.map((item) => {

                      const price =
                        getProductPrice(item);

                      const originalPrice =
                        Number(
                          item.price || 0
                        );

                      const quantity =
                        Number(
                          item.quantity || 0
                        );

                      const itemTotal =
                        price * quantity;

                      const image =
                        item.image

                      const name =
                        item.product_name ||
                        item.name ||
                        "Product";

                      const stock =
                        Number(
                          item.stock || 0
                        );

                      return (
                        <div
                          key={item.id}
                          className="border-b border-slate-100 pb-4 last:border-0"
                        >

                          <div className="flex gap-3">

                            {/* Product Image */}

                            <div className="w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden bg-slate-100">

                              <Image
                                src={image}
                                alt={name}
                                width={80}
                                height={80}
                                className="w-full h-full object-cover"
                              />

                            </div>

                            {/* Product Info */}

                            <div className="flex-1 min-w-0">

                              <h3 className="text-sm font-semibold text-slate-800 line-clamp-2">
                                {name}
                              </h3>

                              <div className="mt-1">

                                <span className="text-sm font-bold text-[#045FF8]">
                                  {formatPrice(
                                    price
                                  )}
                                </span>

                                {originalPrice >
                                  price && (
                                  <span className="ml-2 text-xs text-slate-400 line-through">
                                    {formatPrice(
                                      originalPrice
                                    )}
                                  </span>
                                )}

                              </div>

                              {/* Quantity */}

                              <div className="mt-3 flex items-center justify-between">

                                <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">

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
                                    className="w-8 h-8 flex items-center justify-center text-slate-600 hover:bg-slate-50 disabled:text-slate-300 disabled:cursor-not-allowed"
                                  >
                                    <Minus className="w-3.5 h-3.5" />
                                  </button>

                                  <span className="w-8 text-center text-sm font-semibold text-slate-700">
                                    {quantity}
                                  </span>

                                  <button
                                    type="button"
                                    onClick={() =>
                                      increaseQuantity(
                                        item.id
                                      )
                                    }
                                    disabled={
                                      quantity >=
                                      stock
                                    }
                                    className="w-8 h-8 flex items-center justify-center text-slate-600 hover:bg-slate-50 disabled:text-slate-300 disabled:cursor-not-allowed"
                                  >
                                    <Plus className="w-3.5 h-3.5" />
                                  </button>

                                </div>

                                <button
                                  type="button"
                                  onClick={() =>
                                    removeItem(
                                      item.id
                                    )
                                  }
                                  className="w-8 h-8 rounded-lg flex items-center justify-center text-red-400 hover:bg-red-50 hover:text-red-500 transition"
                                  title="Remove"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>

                              </div>

                            </div>

                          </div>

                          {/* Item Total */}

                          <div className="mt-3 flex items-center justify-between">

                            <span className="text-xs text-slate-500">
                              Item Total
                            </span>

                            <span className="text-sm font-bold text-slate-800">
                              {formatPrice(
                                itemTotal
                              )}
                            </span>

                          </div>

                        </div>
                      );
                    })}

                  </div>

                  {/* ------------------------------------------------ */}
                  {/* Price Summary */}
                  {/* ------------------------------------------------ */}

                  <div className="mt-6 pt-5 border-t border-slate-200 space-y-3">

                    {/* Subtotal */}

                    <div className="flex items-center justify-between text-sm">

                      <span className="text-slate-500">
                        Subtotal
                      </span>

                      <span className="font-semibold text-slate-800">
                        {formatPrice(
                          subtotal
                        )}
                      </span>

                    </div>

                    {/* Shipping */}

                    <div className="flex items-center justify-between text-sm">

                      <span className="text-slate-500">
                        Shipping
                      </span>

                      <span className="font-semibold text-slate-800">

                        {shippingCost === 0
                          ? "Free"
                          : formatPrice(
                              shippingCost
                            )}

                      </span>

                    </div>

                    {/* Total */}

                    <div className="pt-4 mt-3 border-t border-slate-200 flex items-center justify-between">

                      <div>

                        <span className="block text-base font-bold text-[#03215B]">
                          Total
                        </span>

                        <span className="text-xs text-slate-400">
                          Final amount
                        </span>

                      </div>

                      <span className="text-xl font-bold text-[#045FF8]">
                        {formatPrice(
                          total
                        )}
                      </span>

                    </div>

                  </div>

                  {/* ------------------------------------------------ */}
                  {/* Place Order */}
                  {/* ------------------------------------------------ */}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full mt-6 h-14 rounded-2xl flex items-center justify-center gap-2 font-bold text-white transition ${
                      isSubmitting
                        ? "bg-slate-400 cursor-not-allowed"
                        : "bg-[#045FF8] hover:bg-[#03215B]"
                    }`}
                  >

                    {isSubmitting ? (
                      <>
                        <svg
                          className="w-5 h-5 animate-spin"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <circle
                            cx="12"
                            cy="12"
                            r="9"
                            stroke="currentColor"
                            strokeWidth="3"
                            opacity="0.3"
                          />

                          <path
                            d="M21 12a9 9 0 0 0-9-9"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                          />
                        </svg>

                        Placing Order...
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-5 h-5" />
                        Place Order
                      </>
                    )}

                  </button>

                  {/* ------------------------------------------------ */}
                  {/* Security Note */}
                  {/* ------------------------------------------------ */}

                  <div className="mt-4 flex items-start gap-2">

                    <svg
                      className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-7a2 2 0 00-2-2H6a2 2 0 00-2 2v7a2 2 0 002 2zm10-9V7a4 4 0 00-8 0v3h8z"
                      />
                    </svg>

                    <p className="text-xs leading-5 text-slate-400">
                      Your order information is securely submitted to our server.
                    </p>

                  </div>

                </section>

              </div>

            </div>

          </div>

        </form>

      </div>

    </main>
  );
};

export default Checkout;