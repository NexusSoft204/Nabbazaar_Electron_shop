"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

import {
  CheckCircle2,
  CalendarDays,
  CreditCard,
  Package,
  Truck,
  Hash,
  ArrowRight,
  ShoppingBag,
  Loader2,
  AlertCircle,
} from "lucide-react";

const OrderSuccess = () => {
  const params = useParams();
  const router = useRouter();

  const orderNumber = params?.orderNumber;

  if (!process.env.NEXT_PUBLIC_API_URL) {
  throw new Error("NEXT_PUBLIC_API_URL is not configured");
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!orderNumber) return;

    const fetchOrder = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(
          `${API_URL}/api/order/success/${orderNumber}/`
        );

        setOrder(response.data);

      } catch (error) {
        console.error("ORDER SUCCESS ERROR:", error);

        setError(
          error?.response?.data?.detail ||
            "Unable to load your order information."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderNumber, API_URL]);


  // -----------------------------
  // Loading
  // -----------------------------

  if (loading) {
    return (
      <main className="min-h-screen bg-[#F7F8F9] flex items-center justify-center px-4">
        <div className="flex flex-col items-center gap-4 text-gray-500">

          <Loader2
            size={40}
            className="animate-spin text-[#045FF8]"
          />

          <p className="text-sm font-inter">
            Loading your order...
          </p>

        </div>
      </main>
    );
  }


  // -----------------------------
  // Error
  // -----------------------------

  if (error || !order) {
    return (
      <main className="min-h-screen bg-[#F7F8F9] flex items-center justify-center px-4">

        <div className="w-full max-w-md bg-white rounded-2xl border border-gray-200 p-8 text-center shadow-sm">

          <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-red-50 flex items-center justify-center">

            <AlertCircle
              size={34}
              className="text-red-500"
            />

          </div>

          <h1 className="text-xl font-montserrat font-semibold text-gray-900">
            Order Not Found
          </h1>

          <p className="text-sm text-gray-500 mt-3 leading-6">
            {error ||
              "We could not find the order you are looking for."}
          </p>

          <Link
            href="/"
            className="inline-flex font-montserrat items-center justify-center gap-2 mt-6 px-6 py-3 rounded-xl bg-[#045FF8] text-white text-sm font-medium hover:bg-[#034dcc] transition"
          >
            Continue Shopping
            <ArrowRight size={17} />
          </Link>

        </div>

      </main>
    );
  }


  // -----------------------------
  // Format date
  // -----------------------------

  const formattedDate = order.created_at
    ? new Date(order.created_at).toLocaleDateString(
        "en-US",
        {
          year: "numeric",
          month: "short",
          day: "numeric",
        }
      )
    : "-";


  // -----------------------------
  // Format amount
  // -----------------------------

  const formattedTotal = Number(
    order.total || 0
  ).toLocaleString("en-US");


  // -----------------------------
  // Status
  // -----------------------------

  const orderStatus =
    order.status_display ||
    order.status ||
    "Pending";

  const paymentMethod =
    order.payment_method_display ||
    order.payment_method ||
    "-";

  const shippingMethod =
    order.shipping_method_display ||
    order.shipping_method ||
    "-";


  // -----------------------------
  // Status color
  // -----------------------------

  const getStatusStyle = () => {

    switch (order.status) {

      case "confirmed":
        return "bg-blue-50 text-blue-600";

      case "processing":
        return "bg-purple-50 text-purple-600";

      case "shipped":
        return "bg-indigo-50 text-indigo-600";

      case "delivered":
        return "bg-green-50 text-green-600";

      case "cancelled":
        return "bg-red-50 text-red-600";

      default:
        return "bg-amber-50 text-amber-600";
    }
  };


  return (
    <main className="min-h-screen bg-[#F7F8F9] py-10 sm:py-14 px-4">

      <div className="max-w-3xl mx-auto">


        {/* Success Header */}

        <section className="text-center">

          <div className="relative inline-flex">

            <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center">

              <CheckCircle2
                size={48}
                className="text-green-500"
                strokeWidth={2}
              />

            </div>

          </div>


          <h1 className="mt-6 font-montserrat text-2xl sm:text-3xl font-bold text-gray-900">

            Order Placed Successfully!

          </h1>


          <p className="mt-3 text-gray-500 text-sm font-inter sm:text-base">

            Thank you for your order. Your order has been
            received successfully.

          </p>


          <div className="inline-flex items-center gap-2 mt-5 px-4 py-2 rounded-full bg-white border border-gray-200">

            <Hash
              size={16}
              className="text-[#045FF8]"
            />

            <span className="text-sm font-montserrat font-semibold text-gray-800">
              {order.order_number}
            </span>

          </div>

        </section>


        {/* Order Information */}

        <section className="mt-10 bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">

          {/* Header */}

          <div className="px-5 sm:px-7 py-5 border-b border-gray-100 flex items-center gap-3">

            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">

              <ShoppingBag
                size={20}
                className="text-[#045FF8]"
              />

            </div>

            <div>

              <h2 className="font-semibold font-montserrat text-gray-900">
                Order Information
              </h2>

              <p className="text-xs text-gray-500 font-inter mt-1">
                Here are the details of your order.
              </p>

            </div>

          </div>


          {/* Information */}

          <div className="divide-y divide-gray-100">


            {/* Order Number */}

            <div className="px-5 sm:px-7 py-5 flex items-center justify-between gap-4">

              <div className="flex items-center gap-3">

                <Hash
                  size={19}
                  className="text-gray-400"
                />

                <span className="text-sm text-gray-500 font-montserrat">
                  Order Number
                </span>

              </div>

              <span className="text-sm font-semibold text-gray-900">
                {order.order_number}
              </span>

            </div>


            {/* Date */}

            <div className="px-5 sm:px-7 py-5 flex items-center justify-between gap-4">

              <div className="flex items-center gap-3">

                <CalendarDays
                  size={19}
                  className="text-gray-400"
                />

                <span className="text-sm text-gray-500 font-montserrat">
                  Order Date
                </span>

              </div>

              <span className="text-sm font-medium text-gray-900">
                {formattedDate}
              </span>

            </div>


            {/* Total */}

            <div className="px-5 sm:px-7 py-5 flex items-center justify-between gap-4">

              <div className="flex items-center gap-3">

                <CreditCard
                  size={19}
                  className="text-gray-400"
                />

                <span className="text-sm text-gray-500 font-montserrat">
                  Total Amount
                </span>

              </div>

              <span className="text-base font-bold text-[#045FF8]">
                {formattedTotal} AFN
              </span>

            </div>


            {/* Order Status */}

            <div className="px-5 sm:px-7 py-5 flex items-center justify-between gap-4">

              <div className="flex items-center gap-3">

                <Package
                  size={19}
                  className="text-gray-400"
                />

                <span className="text-sm text-gray-500 font-montserrat">
                  Order Status
                </span>

              </div>

              <span
                className={`px-3 py-1.5 rounded-full text-xs font-semibold capitalize ${getStatusStyle()}`}
              >
                {orderStatus}
              </span>

            </div>


            {/* Payment */}

            <div className="px-5 sm:px-7 py-5 flex items-center justify-between gap-4">

              <div className="flex items-center gap-3">

                <CreditCard
                  size={19}
                  className="text-gray-400"
                />

                <span className="text-sm text-gray-500 font-montserrat">
                  Payment Method
                </span>

              </div>

              <span className="text-sm font-medium text-gray-900 text-right">
                {paymentMethod}
              </span>

            </div>


            {/* Shipping */}

            <div className="px-5 sm:px-7 py-5 flex items-center justify-between gap-4">

              <div className="flex items-center gap-3">

                <Truck
                  size={19}
                  className="text-gray-400"
                />

                <span className="text-sm text-gray-500 font-montserrat">
                  Shipping Method
                </span>

              </div>

              <span className="text-sm font-medium text-gray-900 text-right">
                {shippingMethod}
              </span>

            </div>

          </div>

        </section>


        {/* Customer Message */}

        <section className="mt-5 bg-blue-50 border border-blue-100 rounded-2xl p-5">

          <div className="flex gap-3">

            <CheckCircle2
              size={20}
              className="text-[#045FF8] shrink-0 mt-0.5"
            />

            <div>

              <h3 className="text-sm font-semibold text-gray-900">
                Thank you for your order!
              </h3>

              <p className="text-sm font-inter text-gray-600 mt-1 leading-6">
                Your order has been successfully received.
                We will process it as soon as possible and
                keep you updated about its status.
              </p>

            </div>

          </div>

        </section>


        {/* Actions */}

        <div className="mt-7 flex flex-col sm:flex-row gap-3">

          <button
            onClick={() =>
              router.push(
                `/order-track?order=${order.order_number}`
              )
            }
            className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#045FF8] text-white text-sm font-semibold hover:bg-[#034dcc] transition"
          >

            Track Your Order

            <ArrowRight size={18} />

          </button>


          <Link
            href="/"
            className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white border border-gray-200 text-gray-800 text-sm font-semibold hover:bg-gray-50 transition font-montserrat"
          >

            <ShoppingBag size={18} />

            Continue Shopping

          </Link>

        </div>


        {/* Small Footer Message */}

        <p className="text-center text-xs text-gray-400 mt-6 font-inter">

          Keep your order number
          <span className="font-semibold text-gray-500">
            {" "}
            {order.order_number}
          </span>
          {" "}
          for future tracking.

        </p>

      </div>

    </main>
  );
};

export default OrderSuccess;