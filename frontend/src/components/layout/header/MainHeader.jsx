
"use client";
import { useBasket } from "@/context/BasketContext";

import Link from "next/link";
import { useState } from "react";
import {
  Heart,
  Menu,
  Scale,
  ShoppingCart,
  User,
} from "lucide-react";

import SearchBar from "./SearchBar";
import MobileMenu from "./MobileMenu";

const MainHeader = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItems, totalPrice } = useBasket();

  return (
    <>
      <div className="border-b bg-white">
        <div className="container mx-auto flex h-20 items-center gap-4 px-4">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="rounded-lg p-2 hover:bg-slate-100 lg:hidden"
            aria-label="باز کردن منو"
          >
            <Menu size={24} />
          </button>

          {/* Logo */}
          <Link
            href="/"
            className="shrink-0 text-2xl font-black text-blue-600"
          >
            Nab
            <span className="text-slate-900">Bazaar</span>
          </Link>

          {/* Search */}
          <div className="hidden flex-1 lg:block">
            <SearchBar />
          </div>

          {/* Actions */}
          <div className="mr-auto flex items-center gap-2">
            {/* Account */}
            <Link
              href="/login"
              className="hidden items-center gap-2 rounded-lg px-3 py-2 transition hover:bg-slate-100 sm:flex"
            >
              <User size={22} />

              <div className="hidden text-right xl:block">
                <p className="text-xs text-slate-500">
                   account
                </p>

                <Link href={'/login'} className="text-sm font-semibold">
                  Login / Register
                </Link>
              </div>
            </Link>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="relative rounded-lg p-2 transition hover:bg-slate-100"
              aria-label="whislist"
            >
              <Heart size={23} />

              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                0 
              </span>
            </Link>

            {/* Compare */}
            <Link
              href="/compare"
              className="relative hidden rounded-lg p-2 transition hover:bg-slate-100 md:block"
              aria-label="compare"
            >
              <Scale size={23} />

              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] text-white">
                0
              </span>
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-white transition hover:bg-blue-700"
            >
              <div className="relative">
                <ShoppingCart size={22} />

                {totalItems > 0 && (
                    <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-white text-[9px] text-blue-600">
                      {totalItems || 0}
                    </span>
                )}
              </div>

              <div className="hidden text-right sm:block">
                <p className="text-xs text-blue-100">
                   Bascat
                </p>
              </div>
            </Link>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="border-t px-4 py-3 lg:hidden">
          <SearchBar />
        </div>
      </div>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
};

export default MainHeader;
