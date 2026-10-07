"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import {
  ChevronDown,
  Grid2X2,
  Menu,
  Smartphone,
  Laptop,
  Tablet,
  Watch,
  Headphones,
  Gamepad2,
  Cable,
  BatteryCharging,
  Speaker,
} from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const navItems = [
  { title: "Home", href: "/" },
  { title: "Shop", href: "/shop" },
  { title: "New Arrivals", href: "/new-arrivals" },
  { title: "Best Sellers", href: "/best-sellers" },
  { title: "Deals", href: "/deals" },
  { title: "Blog", href: "/blog" },
  { title: "About us", href: "/about-us" },
  { title: "FAQ", href: "/faq" },
  { title: "Contact us", href: "/contact-us" },
];

/*
|--------------------------------------------------------------------------
| Icon mapping
|--------------------------------------------------------------------------
| چون Icon در دیتابیس نداریم، فقط Icon مربوط به ظاهر منو در Frontend
| انتخاب می‌شود.
*/

const categoryIcons = [
  Smartphone,
  Laptop,
  Tablet,
  Watch,
  Headphones,
  Gamepad2,
  Cable,
  BatteryCharging,
  Speaker,
];

const getCategoryIcon = (index) => {
  return categoryIcons[index % categoryIcons.length];
};

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(false);

  /*
  |--------------------------------------------------------------------------
  | دریافت تمام Category ها از Django API
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(false);

        const response = await fetch(
          `${API_URL}/api/product/categories/`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }

        const data = await response.json();
        console.log("CATEGORY API RESPONSE:", data);

        /*
        |--------------------------------------------------------------------------
        | اگر API مستقیماً Array برگرداند
        |--------------------------------------------------------------------------
        */

        const categoryList = Array.isArray(data)
          ? data
          : data.results || [];

        /*
        |--------------------------------------------------------------------------
        | تبدیل Category های ساده به ساختار Parent / Children
        |--------------------------------------------------------------------------
        */

        const parentCategories = categoryList.filter(
          (category) => category.parent === null
        );

        const formattedCategories = parentCategories.map(
          (parentCategory, index) => {
            const children = categoryList.filter(
              (category) =>
                category.parent === parentCategory.id
            );

            const Icon = getCategoryIcon(index);

            return {
              ...parentCategory,

              icon: Icon,

              href: `/category/${parentCategory.slug}`,

              children: children.map((child) => ({
                ...child,

                href: `/category/${child.slug}`,
              })),
            };
          }
        );

        setCategories(formattedCategories);
      } catch (error) {
        console.error(
          "Category API Error:",
          error
        );

        setError(true);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <nav className="hidden border-b lg:block">
      <div className="container mx-auto flex h-14 items-center px-4">

        {/* =========================================================
            Categories Button
        ========================================================= */}

        <div className="relative h-full">

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-full items-center gap-2 border-l px-5 font-semibold transition hover:text-blue-600"
          >
            <Grid2X2 size={20} />

            Categories

            <ChevronDown
              size={17}
              className={`transition ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>


          {/* =====================================================
              Mega Menu
          ===================================================== */}

          {isOpen && (
            <div className="absolute left-0 top-full z-50 mt-1 w-[850px] rounded-xl border border-slate-200 bg-white p-5 shadow-xl">

              {/* Loading */}

              {loading && (
                <div className="py-10 text-center text-sm text-slate-500">
                  Loading categories...
                </div>
              )}


              {/* Error */}

              {!loading && error && (
                <div className="py-10 text-center text-sm text-red-500">
                  Failed to load categories.
                </div>
              )}


              {/* No categories */}

              {!loading &&
                !error &&
                categories.length === 0 && (
                  <div className="py-10 text-center text-sm text-slate-500">
                    No categories available.
                  </div>
                )}


              {/* Categories */}

              {!loading &&
                !error &&
                categories.length > 0 && (
                  <div className="grid grid-cols-3 gap-5">

                    {categories.map((category) => {
                      const Icon = category.icon;

                      return (
                        <div
                          key={category.id}
                          className="rounded-lg p-3 transition hover:bg-slate-50"
                        >

                          {/* Parent Category */}

                          <Link
                            href={category.href}
                            onClick={() =>
                              setIsOpen(false)
                            }
                            className="mb-3 flex items-center gap-2 font-bold text-slate-800 hover:text-blue-600"
                          >
                            <Icon size={20} />

                            {category.title}
                          </Link>


                          {/* Children */}

                          {category.children.length > 0 && (
                            <div className="space-y-2 pr-7">

                              {category.children.map(
                                (child) => (
                                  <Link
                                    key={child.id}
                                    href={child.href}
                                    onClick={() =>
                                      setIsOpen(false)
                                    }
                                    className="block text-sm text-slate-500 transition hover:text-blue-600"
                                  >
                                    {child.title}
                                  </Link>
                                )
                              )}

                            </div>
                          )}

                        </div>
                      );
                    })}

                  </div>
                )}


              {/* =================================================
                  All Categories
              ================================================= */}

              {!loading && (
                <Link
                  href="/categories"
                  onClick={() =>
                    setIsOpen(false)
                  }
                  className="mt-4 flex items-center justify-center rounded-lg bg-slate-100 py-3 text-sm font-semibold transition hover:bg-blue-600 hover:text-white"
                >
                  All Categories
                </Link>
              )}

            </div>
          )}
        </div>


        {/* =========================================================
            Main Navigation
        ========================================================= */}

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


        {/* =========================================================
            Support
        ========================================================= */}

        <div className="mr-auto flex items-center gap-2 text-sm font-semibold text-slate-700">

          <Menu size={18} />

          <span>
            contact: 0788001919
          </span>

        </div>

      </div>
    </nav>
  );
};

export default Navigation;
