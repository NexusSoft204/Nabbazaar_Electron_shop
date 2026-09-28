"use client";

import Link from "next/link";

import {
  X,
  ChevronLeft,
  Home,
  Store,
  Smartphone,
  Laptop,
  Tablet,
  Watch,
  Headphones,
  Gamepad2,
  Cable,
  BatteryCharging,
  Speaker,
  Heart,
  Scale,
  User,
  PackageSearch,
  Phone,
} from "lucide-react";

const menuItems = [
  {
    title: "موبایل و تلفن همراه",
    icon: Smartphone,
    href: "/category/mobile",
  },
  {
    title: "لپ‌تاپ",
    icon: Laptop,
    href: "/category/laptop",
  },
  {
    title: "تبلت",
    icon: Tablet,
    href: "/category/tablet",
  },
  {
    title: "ساعت هوشمند",
    icon: Watch,
    href: "/category/smart-watch",
  },
  {
    title: "هدفون و هندزفری",
    icon: Headphones,
    href: "/category/headphones",
  },
  {
    title: "گیمینگ",
    icon: Gamepad2,
    href: "/category/gaming",
  },
  {
    title: "شارژر و کابل",
    icon: Cable,
    href: "/category/charger-cable",
  },
  {
    title: "پاوربانک",
    icon: BatteryCharging,
    href: "/category/power-bank",
  },
  {
    title: "اسپیکر",
    icon: Speaker,
    href: "/category/speaker",
  },
];

const MobileMenu = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div onClick={onClose} className="fixed inset-0 z-[60] bg-black/50" />

      {/* Drawer */}
      <aside className="fixed right-0 top-0 z-[70] flex h-screen w-[85%] max-w-sm flex-col bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b p-4">
          <Link
            href="/"
            onClick={onClose}
            className="text-xl font-black text-blue-600"
          >
            Nab
            <span className="text-slate-900">Bazaar</span>
          </Link>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-slate-100"
            aria-label="بستن منو"
          >
            <X size={24} />
          </button>
        </div>

        {/* User */}
        <Link
          href="/account"
          onClick={onClose}
          className="m-4 flex items-center gap-3 rounded-xl bg-slate-100 p-4"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white">
            <User size={20} />
          </div>

          <div>
            <p className="text-sm text-slate-500">Account</p>

            <p className="font-bold">Login / Register</p>
          </div>
        </Link>

        {/* Scroll Content */}
        <div className="flex-1 overflow-y-auto px-4">
          {/* Main Menu */}
          <div className="border-b pb-4">
            <Link
              href="/"
              onClick={onClose}
              className="flex items-center gap-3 rounded-lg px-3 py-3 hover:bg-slate-100"
            >
              <Home size={20} />
              Home
            </Link>

            <Link
              href="/shop"
              onClick={onClose}
              className="flex items-center gap-3 rounded-lg px-3 py-3 hover:bg-slate-100"
            >
              <Store size={20} />
              Shop
            </Link>


            <Link
              href="/new-Arrivals"
              onClick={onClose}
              className="flex items-center gap-3 rounded-lg px-3 py-3 hover:bg-slate-100"
            >
              <Store size={20} />
              new Arrivals
            </Link>


            <Link
              href="/new-Arrivals"
              onClick={onClose}
              className="flex items-center gap-3 rounded-lg px-3 py-3 hover:bg-slate-100"
            >
              <Store size={20} />
              Best Sellers
            </Link>


            <Link
              href="/new-Arrivals"
              onClick={onClose}
              className="flex items-center gap-3 rounded-lg px-3 py-3 hover:bg-slate-100"
            >
              <Store size={20} />
              Deals
            </Link>


            {/* <Link
              href="/new-Arrivals"
              onClick={onClose}
              className="flex items-center gap-3 rounded-lg px-3 py-3 hover:bg-slate-100"
            >
              <Store size={20} />
              Brands
            </Link> */}


            <Link
              href="/new-Arrivals"
              onClick={onClose}
              className="flex items-center gap-3 rounded-lg px-3 py-3 hover:bg-slate-100"
            >
              <Store size={20} />
              Blog
            </Link>


            <Link
              href="/new-Arrivals"
              onClick={onClose}
              className="flex items-center gap-3 rounded-lg px-3 py-3 hover:bg-slate-100"
            >
              <Store size={20} />
              About us
            </Link>


            <Link
              href="/new-Arrivals"
              onClick={onClose}
              className="flex items-center gap-3 rounded-lg px-3 py-3 hover:bg-slate-100"
            >
              <Store size={20} />
              FAQ
            </Link>


            <Link
              href="/new-Arrivals"
              onClick={onClose}
              className="flex items-center gap-3 rounded-lg px-3 py-3 hover:bg-slate-100"
            >
              <Store size={20} />
              Contact us
            </Link>

            <Link
              href="/wishlist"
              onClick={onClose}
              className="flex items-center gap-3 rounded-lg px-3 py-3 hover:bg-slate-100"
            >
              <Heart size={20} />
              whishlist
            </Link>

            <Link
              href="/compare"
              onClick={onClose}
              className="flex items-center gap-3 rounded-lg px-3 py-3 hover:bg-slate-100"
            >
              <Scale size={20} />
              compare
            </Link>

            <Link
              href="/track-order"
              onClick={onClose}
              className="flex items-center gap-3 rounded-lg px-3 py-3 hover:bg-slate-100"
            >
              <PackageSearch size={20} />
               Order Track
            </Link>
          </div>

          {/* Categories */}
          <div className="py-4">
            <h3 className="mb-3 px-3 font-bold">دسته‌بندی محصولات</h3>

            <div className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className="flex items-center justify-between rounded-lg px-3 py-3 transition hover:bg-slate-100"
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={20} className="text-blue-600" />

                      <span>{item.title}</span>
                    </div>

                    <ChevronLeft size={18} className="text-slate-400" />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t p-4">
          <a
            href="tel:+93781204055"
            className="flex items-center gap-3 rounded-xl bg-blue-600 p-3 text-white"
          >
            <Phone size={20} />

            <div>
              <p className="text-xs text-blue-100">تماس با پشتیبانی</p>

              <p className="font-bold">0788001919</p>
            </div>
          </a>
        </div>
      </aside>
    </>
  );
};

export default MobileMenu;
