"use client";

import React, { useEffect, useState } from "react";
import {
  Layers,
  Users,
  ShieldCheck,
  ShoppingBag,
  ArrowRight,
} from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function AboutUsSection() {
  const [data, setData] = useState(null);
  const [infoSite, setInfoSite] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [aboutRes, infoRes] = await Promise.all([
          fetch(`${API_URL}/api/settings/aboutus/`, {
            cache: "no-store",
          }),

          fetch(`${API_URL}/api/settings/infosite/`, {
            cache: "no-store",
          }),
        ]);

        if (aboutRes.ok) {
          const aboutData = await aboutRes.json();
          setData(aboutData);
        }

        if (infoRes.ok) {
          const infoData = await infoRes.json();
          setInfoSite(infoData);
        }
      } catch (error) {
        console.error("Error fetching About Us data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <section className="w-full bg-white py-20">
        <div className="2xl:container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <div className="h-[400px] w-full animate-pulse rounded-3xl bg-gray-100" />

              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="h-36 animate-pulse rounded-2xl bg-gray-100"
                  />
                ))}
              </div>
            </div>

            <div className="space-y-5 lg:col-span-6">
              <div className="h-8 w-40 animate-pulse rounded-full bg-gray-100" />
              <div className="h-12 w-3/4 animate-pulse rounded-xl bg-gray-100" />
              <div className="h-32 w-full animate-pulse rounded-xl bg-gray-100" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!data) return null;

  // Real statistics from /api/settings/infosite/
  const statsList = [
    {
      id: 1,
      value: infoSite?.products_count ?? 0,
      label: "Total Products",
      suffix: "+",
      icon: <ShoppingBag className="h-5 w-5 text-blue-600" />,
      borderTheme: "hover:border-blue-500/30",
    },
    {
      id: 2,
      value: infoSite?.sold_products_count ?? 0,
      label: "Products Sold",
      suffix: "+",
      icon: <Layers className="h-5 w-5 text-purple-600" />,
      borderTheme: "hover:border-purple-500/30",
    },
    {
      id: 3,
      value: infoSite?.users_count ?? 0,
      label: "Registered Users",
      suffix: "+",
      icon: <Users className="h-5 w-5 text-emerald-600" />,
      borderTheme: "hover:border-emerald-500/30",
    },
  ];

  return (
    <section className="w-full bg-white py-20 text-left font-inter">
      <div className="2xl:container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-12">

          {/* =========================================
              LEFT COLUMN
          ========================================= */}
          <div className="space-y-8 lg:col-span-6">

            {/* Main Image */}
            <div className="group relative h-[400px] w-full overflow-hidden rounded-3xl bg-gray-100 shadow-lg">
              {data.main_image ? (
                <img
                  src={data.main_image}
                  alt={data.title || "About Us"}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-gray-400">
                  No Image Available
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>

            {/* =========================================
                REAL DYNAMIC STATISTICS
            ========================================= */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {statsList.map((stat) => (
                <div
                  key={stat.id}
                  className={`flex transform flex-col items-start rounded-2xl border border-gray-100/80 bg-gray-50 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 ${stat.borderTheme}`}
                >
                  {/* Icon */}
                  <div className="mb-4 rounded-xl bg-white p-2.5 shadow-sm">
                    {stat.icon}
                  </div>

                  {/* Number */}
                  <span className="text-3xl font-extrabold tracking-tight text-gray-900">
                    {stat.value}
                    {stat.suffix}
                  </span>

                  {/* Label */}
                  <span className="mt-1 text-sm font-medium text-gray-500">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* =========================================
              RIGHT COLUMN
          ========================================= */}
          <div className="space-y-6 lg:col-span-6 lg:pt-4">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-blue-700">
              Corporate Overview
            </div>

            {/* Title */}
            <h2 className="font-montserrat text-3xl font-extrabold uppercase leading-tight text-gray-900 sm:text-4xl">
              {data.title}
            </h2>

            {/* Description */}
            <p className="text-justify text-base leading-8 text-gray-600">
              {data.description}
            </p>

            {/* Details */}
            <div className="space-y-6 border-t border-gray-100 pt-4">

              {/* History */}
              {data.history && (
                <div>
                  <h4 className="mb-1 text-sm font-bold uppercase tracking-wider text-gray-400">
                    Our History
                  </h4>

                  <p className="text-justify text-sm leading-6 text-gray-500">
                    {data.history}
                  </p>
                </div>
              )}

              {/* Mission */}
              {data.mission && (
                <div>
                  <h4 className="mb-1 text-sm font-bold uppercase tracking-wider text-gray-400">
                    Our Core Mission
                  </h4>

                  <p className="text-justify text-sm leading-6 text-gray-500">
                    {data.mission}
                  </p>
                </div>
              )}

              {/* Vision */}
              {data.vision && (
                <div>
                  <h4 className="mb-1 text-sm font-bold uppercase tracking-wider text-gray-400">
                    Our Vision
                  </h4>

                  <p className="text-justify text-sm leading-6 text-gray-500">
                    {data.vision}
                  </p>
                </div>
              )}

              {/* Values */}
              {data.values && (
                <div>
                  <h4 className="mb-1 text-sm font-bold uppercase tracking-wider text-gray-400">
                    Our Core Values
                  </h4>

                  <p className="text-justify text-sm leading-6 text-gray-500">
                    {data.values}
                  </p>
                </div>
              )}

              {/* Why Us */}
              {data.why_us && (
                <div>
                  <h4 className="mb-1 text-sm font-bold uppercase tracking-wider text-gray-400">
                    Why Choose Us
                  </h4>

                  <p className="text-justify text-sm leading-6 text-gray-500">
                    {data.why_us}
                  </p>
                </div>
              )}

              {/* Branch Address */}
              {data.branch_address && (
                <div>
                  <h4 className="mb-1 text-sm font-bold uppercase tracking-wider text-gray-400">
                    Branch Addresses / Locations
                  </h4>

                  <p className="text-justify text-sm leading-6 text-gray-500">
                    {data.branch_address}
                  </p>
                </div>
              )}
            </div>

            {/* Button */}
            <div className="pt-4">
              <button
                type="button"
                className="group inline-flex items-center gap-2 rounded-xl bg-gray-900 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-gray-800 hover:shadow"
              >
                Discover Strategic Services

                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}