
"use client";

import Link from "next/link";
import { useState } from "react";

import {
  ChevronDown,
  Grid2X2,
  Laptop,
  Menu,
  Smartphone,
  Tablet,
  Watch,
  Headphones,
  Gamepad2,
  Cable,
  BatteryCharging,
  Speaker,
} from "lucide-react";

const categories = [
  {
    title: "موبایل و تلفن همراه",
    icon: Smartphone,
    href: "/category/mobile",
    children: [
      { title: "Samsung", href: "/category/mobile/samsung" },
      { title: "Apple", href: "/category/mobile/apple" },
      { title: "Xiaomi", href: "/category/mobile/xiaomi" },
      { title: "Huawei", href: "/category/mobile/huawei" },
      { title: "Tecno", href: "/category/mobile/tecno" },
      { title: "Infinix", href: "/category/mobile/infinix" },
    ],
  },
  {
    title: "لپ‌تاپ",
    icon: Laptop,
    href: "/category/laptop",
    children: [
      { title: "لپ‌تاپ گیمینگ", href: "/category/laptop/gaming" },
      { title: "لپ‌تاپ اداری", href: "/category/laptop/office" },
      { title: "لپ‌تاپ دانشجویی", href: "/category/laptop/student" },
      { title: "MacBook", href: "/category/laptop/macbook" },
    ],
  },
  {
    title: "تبلت",
    icon: Tablet,
    href: "/category/tablet",
    children: [
      { title: "iPad", href: "/category/tablet/ipad" },
      { title: "Samsung Tablet", href: "/category/tablet/samsung" },
      { title: "Xiaomi Tablet", href: "/category/tablet/xiaomi" },
    ],
  },
  {
    title: "ساعت هوشمند",
    icon: Watch,
    href: "/category/smart-watch",
    children: [
      { title: "Apple Watch", href: "/category/smart-watch/apple" },
      { title: "Samsung Watch", href: "/category/smart-watch/samsung" },
      { title: "ساعت‌های اقتصادی", href: "/category/smart-watch/budget" },
    ],
  },
  {
    title: "هدفون و هندزفری",
    icon: Headphones,
    href: "/category/headphones",
    children: [
      { title: "هندزفری بی‌سیم", href: "/category/headphones/wireless" },
      { title: "هدفون گیمینگ", href: "/category/headphones/gaming" },
      { title: "هدفون حرفه‌ای", href: "/category/headphones/professional" },
    ],
  },
  {
    title: "گیمینگ",
    icon: Gamepad2,
    href: "/category/gaming",
    children: [
      { title: "کنسول بازی", href: "/category/gaming/consoles" },
      { title: "دسته بازی", href: "/category/gaming/controllers" },
      { title: "لوازم جانبی گیمینگ", href: "/category/gaming/accessories" },
    ],
  },
  {
    title: "شارژر و کابل",
    icon: Cable,
    href: "/category/charger-cable",
    children: [
      { title: "شارژر موبایل", href: "/category/charger-cable/charger" },
      { title: "کابل شارژ", href: "/category/charger-cable/cable" },
      { title: "شارژر بی‌سیم", href: "/category/charger-cable/wireless" },
    ],
  },
  {
    title: "پاوربانک",
    icon: BatteryCharging,
    href: "/category/power-bank",
    children: [
      { title: "10,000mAh", href: "/category/power-bank/10000" },
      { title: "20,000mAh", href: "/category/power-bank/20000" },
      { title: "Fast Charging", href: "/category/power-bank/fast-charge" },
    ],
  },
  {
    title: "اسپیکر",
    icon: Speaker,
    href: "/category/speaker",
    children: [
      { title: "اسپیکر قابل حمل", href: "/category/speaker/portable" },
      { title: "اسپیکر خانگی", href: "/category/speaker/home" },
      { title: "اسپیکر بلوتوث", href: "/category/speaker/bluetooth" },
    ],
  },
];

const navItems = [
  { title: "Home", href: "/" },
  { title: "Shop", href: "/shop" },
  { title: "New Arrivals", href: "/new-arrivals" },
  { title: "Best Sellers", href: "/best-sellers" },
  { title: "Deals", href: "/deals" },
  // { title: "Brands", href: "/brands" },
  { title: "Blog", href: "/blog" },
  { title: "About us", href: "/about-us" },
  { title: "FAQ", href: "/faq" },
  { title: "Contact us", href: "/contact-us" },
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="hidden border-b lg:block overflow-hidden">
      <div className="container mx-auto flex h-14 items-center px-4">
        {/* Categories Button */}
        <div className="relative h-full">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-full items-center gap-2 border-l px-5 font-semibold transition hover:text-blue-600"
          >
            <Grid2X2 size={20} />

            Catagories

            <ChevronDown
              size={17}
              className={`transition ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Mega Menu */}
          {isOpen && (
            <div className="absolute left-0 top-full z-50 mt-1 w-[850px] rounded-xl border bg-white p-5 shadow-xl">
              <div className="grid grid-cols-3 gap-5">
                {categories.map((category) => {
                  const Icon = category.icon;

                  return (
                    <div
                      key={category.title}
                      className="rounded-lg p-3 transition hover:bg-slate-50"
                    >
                      <Link
                        href={category.href}
                        className="mb-3 flex items-center gap-2 font-bold text-slate-800 hover:text-blue-600"
                      >
                        <Icon size={20} />

                        {category.title}
                      </Link>

                      <div className="space-y-2 pr-7">
                        {category.children.map((child) => (
                          <Link
                            key={child.title}
                            href={child.href}
                            className="block text-sm text-slate-500 transition hover:text-blue-600"
                          >
                            {child.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              <Link
                href="/categories"
                className="mt-4 flex items-center justify-center rounded-lg bg-slate-100 py-3 text-sm font-semibold transition hover:bg-blue-600 hover:text-white"
              >
                All Catagories
              </Link>
            </div>
          )}
        </div>

        {/* Main Navigation */}
        <div className="flex h-full items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex h-full items-center px-4 text-sm font-medium text-slate-700 transition hover:text-blue-600"
            >
              {item.title}
            </Link>
          ))}
        </div>

        {/* Support */}
        <div className="mr-auto flex items-center gap-2 text-sm font-semibold text-slate-700">
          <Menu size={18} />

          <span>contact: 0788001919</span>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
