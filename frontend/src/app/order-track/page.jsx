"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import {
  Search,
  Package,
  CheckCircle2,
  Circle,
  Clock3,
  Truck,
  MapPin,
  CreditCard,
  CalendarDays,
  Hash,
  Phone,
  AlertCircle,
  ArrowLeft,
  ShoppingBag,
  Loader2,
} from "lucide-react";

const OrderTrack = () => {
  const searchParams = useSearchParams();

  const API_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    "http://127.0.0.1:8000";

  const orderFromUrl = searchParams.get("order");

  const [orderNumber, setOrderNumber] = useState(
    orderFromUrl || ""
  );

  const [phone, setPhone] = useState("");

  const [order, setOrder] = useState(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");


  // ------------------------------------------------
  // Update order number when URL changes
  // ------------------------------------------------

  useEffect(() => {
    if (orderFromUrl) {
      setOrderNumber(orderFromUrl);
    }
  }, [orderFromUrl]);


  // ------------------------------------------------
  // Track order
  // ------------------------------------------------

  const handleTrackOrder = async (event) => {
    event.preventDefault();

    setError("");
    setOrder(null);

    const cleanOrderNumber =
      orderNumber.trim().toUpperCase();

    const cleanPhone = phone.trim();


    // Validation
    if (!cleanOrderNumber) {
      setError("Please enter your order number.");
      return;
    }

    if (!cleanPhone) {
      setError("Please enter your phone number.");
      return;
    }


    try {
      setLoading(true);

      const response = await axios.get(
        `${API_URL}/api/order/track/${encodeURIComponent(
          cleanOrderNumber
        )}/`,
        {
          params: {
            phone: cleanPhone,
          },
        }
      );

      console.log(
        "ORDER TRACK RESPONSE:",
        response.data
      );

      setOrder(response.data);

    } catch (error) {
      console.error(
        "ORDER TRACK ERROR:",
        error
      );

      const message =
        error?.response?.data?.detail ||
        "We could not find an order with the information provided.";

      setError(message);

    } finally {
      setLoading(false);
    }
  };


  // ------------------------------------------------
  // Format date
  // ------------------------------------------------

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString(
      "en-US",
      {
        year: "numeric",
        month: "short",
        day: "numeric",
      }
    );
  };


  // ------------------------------------------------
  // Format money
  // ------------------------------------------------

  const formatMoney = (value) => {
    return Number(value || 0).toLocaleString(
      "en-US"
    );
  };


  // ------------------------------------------------
  // Order status
  // ------------------------------------------------

  const statuses = [
    {
      key: "pending",
      title: "Order Placed",
      description:
        "Your order has been received.",
      icon: Package,
    },

    {
      key: "confirmed",
      title: "Confirmed",
      description:
        "Your order has been confirmed.",
      icon: CheckCircle2,
    },

    {
      key: "processing",
      title: "Processing",
      description:
        "Your order is being prepared.",
      icon: Clock3,
    },

    {
      key: "shipped",
      title: "Shipped",
      description:
        "Your order is on the way.",
      icon: Truck,
    },

    {
      key: "delivered",
      title: "Delivered",
      description:
        "Your order has been delivered.",
      icon: MapPin,
    },
  ];


  // ------------------------------------------------
  // Get current status index
  // ------------------------------------------------

  const getStatusIndex = (status) => {

    if (status === "cancelled") {
      return -1;
    }

    return statuses.findIndex(
      (item) => item.key === status
    );
  };


  // ------------------------------------------------
  // Status styles
  // ------------------------------------------------

  const currentStatusIndex =
    order
      ? getStatusIndex(order.status)
      : -1;


  // ------------------------------------------------
  // Loading screen
  // ------------------------------------------------

  if (loading) {
    return (
      <main className="min-h-screen bg-[#F7F8F9] flex items-center justify-center px-4">

        <div className="text-center">

          <Loader2
            size={42}
            className="mx-auto text-[#045FF8] animate-spin"
          />

          <p className="mt-4 text-sm text-gray-500 font-inter">
            Searching for your order...
          </p>

        </div>

      </main>
    );
  }


  return (
    <main className="min-h-screen bg-[#F7F8F9] py-10 sm:py-14 px-4">

      <div className="max-w-4xl mx-auto">


        {/* =========================================
            HEADER
        ========================================= */}

        <div className="text-center mb-10">

          <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-50 flex items-center justify-center">

            <Search
              size={30}
              className="text-[#045FF8]"
            />

          </div>

          <h1 className="mt-5 font-montserrat text-2xl sm:text-3xl font-bold text-gray-900">

            Track Your Order

          </h1>

          <p className="mt-3 font-inter max-w-xl mx-auto text-sm sm:text-base text-gray-500 leading-6">

            Enter your order number and phone number
            to check the current status of your order.

          </p>

        </div>


        {/* =========================================
            SEARCH FORM
        ========================================= */}

        <section className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5 sm:p-7">

          <form
            onSubmit={handleTrackOrder}
            className="space-y-5"
          >


            {/* Order Number */}

            <div>

              <label className="block font-montserrat text-sm font-medium text-gray-800 mb-2">

                Order Number

              </label>

              <div className="relative">

                <Hash
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  value={orderNumber}
                  onChange={(e) =>
                    setOrderNumber(
                      e.target.value
                    )
                  }
                  placeholder="Example: ORD-000002"
                  className="w-full h-12 pl-11 pr-4 rounded-xl border border-gray-200 bg-white text-sm text-gray-900 outline-none focus:border-[#045FF8] focus:ring-2 focus:ring-blue-100 transition"
                />

              </div>

            </div>


            {/* Phone */}

            <div>

              <label className="block font-montserrat text-sm font-medium text-gray-800 mb-2">

                Phone Number

              </label>

              <div className="relative">

                <Phone
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="tel"
                  value={phone}
                  onChange={(e) =>
                    setPhone(
                      e.target.value
                    )
                  }
                  placeholder="Enter your phone number"
                  className="w-full h-12 pl-11 pr-4 rounded-xl border border-gray-200 bg-white text-sm text-gray-900 outline-none focus:border-[#045FF8] focus:ring-2 focus:ring-blue-100 transition"
                />

              </div>

            </div>


            {/* Error */}

            {error && (

              <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-100">

                <AlertCircle
                  size={19}
                  className="text-red-500 shrink-0 mt-0.5"
                />

                <p className="text-sm text-red-600 leading-6">
                  {error}
                </p>

              </div>

            )}


            {/* Button */}

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-xl font-montserrat bg-[#045FF8] text-white text-sm font-semibold flex items-center justify-center gap-2 hover:bg-[#034dcc] disabled:opacity-60 disabled:cursor-not-allowed transition"
            >

              <Search size={18} />

              Track Order

            </button>

          </form>

        </section>


        {/* =========================================
            ORDER RESULT
        ========================================= */}

        {order && (

          <div className="mt-8 space-y-5">


            {/* =====================================
                ORDER HEADER
            ===================================== */}

            <section className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5 sm:p-7">

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                <div>

                  <p className="text-xs text-gray-400 uppercase tracking-wider">
                    Order Number
                  </p>

                  <h2 className="mt-1 text-xl font-bold text-gray-900">
                    {order.order_number}
                  </h2>

                </div>


                <div className="flex items-center gap-2 text-sm text-gray-500">

                  <CalendarDays size={17} />

                  {formatDate(
                    order.created_at
                  )}

                </div>

              </div>

            </section>


            {/* =====================================
                CANCELLED ORDER
            ===================================== */}

            {order.status === "cancelled" ? (

              <section className="bg-white border border-red-100 rounded-2xl p-6">

                <div className="flex items-start gap-4">

                  <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center shrink-0">

                    <AlertCircle
                      size={25}
                      className="text-red-500"
                    />

                  </div>

                  <div>

                    <h3 className="font-semibold text-gray-900">
                      Order Cancelled
                    </h3>

                    <p className="text-sm text-gray-500 mt-1 leading-6">
                      This order has been cancelled.
                      Please contact customer support
                      if you need more information.
                    </p>

                  </div>

                </div>

              </section>

            ) : (

              /* ===================================
                 ORDER TIMELINE
              =================================== */

              <section className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5 sm:p-8">

                <div className="flex items-center gap-3 mb-8">

                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">

                    <Package
                      size={20}
                      className="text-[#045FF8]"
                    />

                  </div>

                  <div>

                    <h2 className="font-semibold text-gray-900">
                      Order Status
                    </h2>

                    <p className="text-xs text-gray-500 mt-1">
                      Follow your order progress.
                    </p>

                  </div>

                </div>


                <div className="space-y-0">

                  {statuses.map(
                    (
                      statusItem,
                      index
                    ) => {

                      const Icon =
                        statusItem.icon;

                      const isCompleted =
                        currentStatusIndex >=
                        index;

                      const isCurrent =
                        currentStatusIndex ===
                        index;

                      const isLast =
                        index ===
                        statuses.length - 1;


                      return (
                        <div
                          key={
                            statusItem.key
                          }
                          className="flex gap-4"
                        >

                          {/* Timeline */}

                          <div className="flex flex-col items-center">

                            <div
                              className={`
                                w-10 h-10 rounded-full
                                flex items-center justify-center
                                shrink-0
                                ${
                                  isCompleted
                                    ? "bg-[#045FF8] text-white"
                                    : "bg-gray-100 text-gray-400"
                                }
                              `}
                            >

                              {isCompleted ? (
                                <CheckCircle2
                                  size={20}
                                />
                              ) : (
                                <Icon
                                  size={19}
                                />
                              )}

                            </div>


                            {!isLast && (

                              <div
                                className={`
                                  w-0.5 h-14
                                  ${
                                    currentStatusIndex >
                                    index
                                      ? "bg-[#045FF8]"
                                      : "bg-gray-200"
                                  }
                                `}
                              />

                            )}

                          </div>


                          {/* Content */}

                          <div className="pb-8">

                            <div className="flex items-center gap-2">

                              <h3
                                className={`
                                  text-sm font-semibold
                                  ${
                                    isCompleted
                                      ? "text-gray-900"
                                      : "text-gray-400"
                                  }
                                `}
                              >
                                {
                                  statusItem.title
                                }
                              </h3>


                              {isCurrent && (

                                <span className="px-2 py-0.5 rounded-full bg-blue-50 text-[#045FF8] text-[10px] font-semibold">
                                  Current
                                </span>

                              )}

                            </div>

                            <p
                              className={`
                                text-xs mt-1
                                ${
                                  isCompleted
                                    ? "text-gray-500"
                                    : "text-gray-400"
                                }
                              `}
                            >
                              {
                                statusItem.description
                              }
                            </p>

                          </div>

                        </div>
                      );
                    }
                  )}

                </div>

              </section>

            )}


            {/* =====================================
                ORDER DETAILS
            ===================================== */}

            <section className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">

              <div className="px-5 sm:px-7 py-5 border-b border-gray-100">

                <h2 className="font-semibold text-gray-900">
                  Order Details
                </h2>

              </div>


              <div className="divide-y divide-gray-100">


                {/* Total */}

                <div className="px-5 sm:px-7 py-5 flex justify-between items-center gap-4">

                  <span className="text-sm text-gray-500">
                    Total Amount
                  </span>

                  <span className="text-base font-bold text-[#045FF8]">
                    {formatMoney(
                      order.total
                    )}{" "}
                    AFN
                  </span>

                </div>


                {/* Payment */}

                <div className="px-5 sm:px-7 py-5 flex justify-between items-center gap-4">

                  <div className="flex items-center gap-3">

                    <CreditCard
                      size={18}
                      className="text-gray-400"
                    />

                    <span className="text-sm text-gray-500">
                      Payment Method
                    </span>

                  </div>

                  <span className="text-sm font-medium text-gray-900">
                    {order.payment_method_display ||
                      order.payment_method ||
                      "-"}
                  </span>

                </div>


                {/* Shipping */}

                <div className="px-5 sm:px-7 py-5 flex justify-between items-center gap-4">

                  <div className="flex items-center gap-3">

                    <Truck
                      size={18}
                      className="text-gray-400"
                    />

                    <span className="text-sm text-gray-500">
                      Shipping Method
                    </span>

                  </div>

                  <span className="text-sm font-medium text-gray-900">
                    {order.shipping_method_display ||
                      order.shipping_method ||
                      "-"}
                  </span>

                </div>


                {/* Payment Status */}

                <div className="px-5 sm:px-7 py-5 flex justify-between items-center gap-4">

                  <div className="flex items-center gap-3">

                    <CreditCard
                      size={18}
                      className="text-gray-400"
                    />

                    <span className="text-sm text-gray-500">
                      Payment Status
                    </span>

                  </div>

                  <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-600 text-xs font-semibold capitalize">
                    {order.payment_status_display ||
                      order.payment_status ||
                      "Pending"}
                  </span>

                </div>

              </div>

            </section>


            {/* =====================================
                PRODUCTS
            ===================================== */}

            {order.items &&
              order.items.length > 0 && (

                <section className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">

                  <div className="px-5 sm:px-7 py-5 border-b border-gray-100 flex items-center gap-3">

                    <ShoppingBag
                      size={19}
                      className="text-[#045FF8]"
                    />

                    <h2 className="font-semibold text-gray-900">
                      Ordered Products
                    </h2>

                  </div>


                  <div className="divide-y divide-gray-100">

                    {order.items.map(
                      (item) => (

                        <div
                          key={item.id}
                          className="px-5 sm:px-7 py-5 flex items-center justify-between gap-5"
                        >

                          <div className="min-w-0">

                            <h3 className="text-sm font-medium text-gray-900 truncate">
                              {
                                item.product_name
                              }
                            </h3>

                            <p className="text-xs text-gray-500 mt-1">
                              Quantity:{" "}
                              {item.quantity}
                            </p>

                          </div>


                          <div className="text-right shrink-0">

                            <p className="text-sm font-semibold text-gray-900">
                              {formatMoney(
                                item.subtotal
                              )}{" "}
                              AFN
                            </p>

                            <p className="text-xs text-gray-400 mt-1">
                              {formatMoney(
                                item.price
                              )}{" "}
                              AFN / item
                            </p>

                          </div>

                        </div>

                      )
                    )}

                  </div>

                </section>

              )}


            {/* =====================================
                CUSTOMER INFORMATION
            ===================================== */}

            {order.customer && (

              <section className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">

                <div className="px-5 sm:px-7 py-5 border-b border-gray-100">

                  <h2 className="font-semibold text-gray-900">
                    Delivery Information
                  </h2>

                </div>


                <div className="p-5 sm:p-7 grid sm:grid-cols-2 gap-5">

                  <div>

                    <p className="text-xs text-gray-400">
                      Customer
                    </p>

                    <p className="text-sm font-medium text-gray-900 mt-1">
                      {
                        order.customer.full_name
                      }
                    </p>

                  </div>


                  <div>

                    <p className="text-xs text-gray-400">
                      Phone
                    </p>

                    <p className="text-sm font-medium text-gray-900 mt-1">
                      {
                        order.customer.phone
                      }
                    </p>

                  </div>


                  <div>

                    <p className="text-xs text-gray-400">
                      Province
                    </p>

                    <p className="text-sm font-medium text-gray-900 mt-1 capitalize">
                      {
                        order.customer.province
                      }
                    </p>

                  </div>


                  <div>

                    <p className="text-xs text-gray-400">
                      City
                    </p>

                    <p className="text-sm font-medium text-gray-900 mt-1">
                      {
                        order.customer.city
                      }
                    </p>

                  </div>


                  <div className="sm:col-span-2">

                    <p className="text-xs text-gray-400">
                      Address
                    </p>

                    <p className="text-sm font-medium text-gray-900 mt-1 leading-6">
                      {
                        order.customer.address
                      }
                    </p>

                  </div>

                </div>

              </section>

            )}


            {/* =====================================
                ACTIONS
            ===================================== */}

            <div className="flex flex-col sm:flex-row gap-3 pt-2">

              <Link
                href="/"
                className="flex-1 h-12 rounded-xl bg-white border border-gray-200 text-gray-800 text-sm font-semibold flex items-center justify-center gap-2 hover:bg-gray-50 transition"
              >

                <ArrowLeft size={17} />

                Continue Shopping

              </Link>


              <button
                type="button"
                onClick={() => {
                  setOrder(null);
                  setError("");
                  setPhone("");
                }}
                className="flex-1 h-12 rounded-xl bg-[#045FF8] text-white text-sm font-semibold flex items-center justify-center gap-2 hover:bg-[#034dcc] transition"
              >

                <Search size={17} />

                Track Another Order

              </button>

            </div>

          </div>

        )}

      </div>

    </main>
  );
};

export default OrderTrack;  