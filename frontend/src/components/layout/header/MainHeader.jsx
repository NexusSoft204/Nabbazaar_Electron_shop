"use client";

import { useBasket } from "@/context/BasketContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import {
  Heart,
  Menu,
  Scale,
  ShoppingCart,
  User,
  LogOut,
  ChevronDown,
} from "lucide-react";

import SearchBar from "./SearchBar";
import MobileMenu from "./MobileMenu";

const MainHeader = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [username, setUsername] = useState(null);
  const [loggingOut, setLoggingOut] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);

  const router = useRouter();
  const { totalItems } = useBasket();

  // خواندن کوکی
  const getCookie = useCallback((name) => {
    if (typeof document === "undefined") return null;

    const cookie = document.cookie
      .split("; ")
      .find((item) => item.startsWith(`${name}=`));

    if (!cookie) return null;

    try {
      return decodeURIComponent(cookie.substring(name.length + 1));
    } catch {
      return null;
    }
  }, []);

  // بررسی وضعیت ورود کاربر
  const checkAuth = useCallback(() => {
    const token = getCookie("auth_token");
    const savedUsername = getCookie("auth_username");

    if (token) {
      setUsername(savedUsername || "User");
    } else {
      setUsername(null);
    }
  }, [getCookie]);

  useEffect(() => {
    checkAuth();

    // بررسی مجدد هنگام بازگشت کاربر به صفحه
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        checkAuth();
      }
    };

    window.addEventListener("focus", checkAuth);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("focus", checkAuth);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [checkAuth]);

  // خروج از حساب
  const handleLogout = async () => {
    if (loggingOut) return;

    try {
      setLoggingOut(true);

      // حذف کوکی توکن
      document.cookie = "auth_token=; Max-Age=0; Path=/; SameSite=Lax";

      // حذف کوکی نام کاربری
      document.cookie = "auth_username=; Max-Age=0; Path=/; SameSite=Lax";

      // پاک کردن وضعیت کاربر از رابط کاربری
      setUsername(null);

      // انتقال به صفحه ورود
      router.replace("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <>
      <div className="border-b bg-white">
        <div className="container mx-auto flex h-20 items-center gap-4 px-4">
          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="rounded-lg p-2 hover:bg-slate-100 lg:hidden"
            aria-label="باز کردن منو"
          >
            <Menu size={24} />
          </button>

          {/* Logo */}
          <Link href="/" className="shrink-0 text-2xl font-black text-blue-600">
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
            {username ? (
              <div className="relative">
                {/* Account Toggle Button */}
                <button
                  type="button"
                  onClick={() => setAccountMenuOpen((prev) => !prev)}
                  aria-expanded={accountMenuOpen}
                  aria-haspopup="true"
                  className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 transition hover:border-blue-300 hover:bg-slate-50"
                >
                  {/* User Icon */}
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    <User size={21} />
                  </div>

                  {/* Username */}
                  <div className="hidden text-left sm:block">
                    <p className="max-w-28 truncate text-sm font-semibold text-slate-800">
                      {username}
                    </p>
                    <p className="text-xs text-slate-500">My Account</p>
                  </div>

                  {/* Dropdown Icon */}
                  <ChevronDown
                    size={17}
                    className={`text-slate-500 transition-transform duration-200 ${
                      accountMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {accountMenuOpen && (
                  <>
                    {/* Outside Click Overlay */}
                    <button
                      type="button"
                      aria-label="بستن منوی حساب کاربری"
                      className="fixed inset-0 z-40 cursor-default"
                      onClick={() => setAccountMenuOpen(false)}
                    />

                    <div className="absolute right-0 top-full z-50 mt-2 w-56 overflow-hidden rounded-xl border border-slate-200 bg-white py-2 shadow-xl">
                      {/* User Information */}
                      <div className="border-b border-slate-100 px-4 py-3">
                        <p className="text-xs text-slate-500">Signed in as</p>

                        <p className="mt-1 truncate text-sm font-semibold text-slate-800">
                          {username}
                        </p>
                      </div>

                      {/* Account Link */}
                      <Link
                        href="/"
                        onClick={() => setAccountMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 transition hover:bg-slate-50"
                      >
                        <User size={18} className="text-slate-500" />
                        My Profile
                      </Link>

                      {/* Logout */}
                      <button
                        type="button"
                        onClick={() => {
                          setAccountMenuOpen(false);
                          handleLogout();
                        }}
                        disabled={loggingOut}
                        className="flex w-full items-center gap-3 border-t border-slate-100 px-4 py-3 text-sm text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                      >
                        <LogOut size={18} />

                        {loggingOut ? "Logging out..." : "Logout"}
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="hidden items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 transition hover:bg-slate-50 sm:flex"
              >
                <User size={22} />

                <div className="hidden text-right xl:block">
                  <p className="text-xs text-slate-500">Account</p>

                  <p className="text-sm font-semibold">Login / Register</p>
                </div>
              </Link>
            )}

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="relative rounded-lg p-2 transition hover:bg-slate-100"
              aria-label="Wishlist"
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
              aria-label="Compare"
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
                    {totalItems}
                  </span>
                )}
              </div>

              <div className="hidden text-right sm:block">
                <p className="text-xs text-blue-100">Basket</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="border-t px-4 py-3 lg:hidden">
          <SearchBar />
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
};

export default MainHeader;


// https://chatgpt.com/c/6acb62b0-4e14-83ec-a7ac-5117d50e62fa