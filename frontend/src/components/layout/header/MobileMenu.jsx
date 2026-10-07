"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import {
  X,
  ChevronLeft,
  ChevronDown,
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
  Loader2,
  AlertCircle,
} from "lucide-react";

/*
|--------------------------------------------------------------------------
| API URL
|--------------------------------------------------------------------------
*/

const API_URL = process.env.NEXT_PUBLIC_API_URL;


/*
|--------------------------------------------------------------------------
| Category Icons
|--------------------------------------------------------------------------
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


/*
|--------------------------------------------------------------------------
| Get Category Icon
|--------------------------------------------------------------------------
*/

const getCategoryIcon = (index) => {
  return categoryIcons[index % categoryIcons.length];
};


/*
|--------------------------------------------------------------------------
| Mobile Menu
|--------------------------------------------------------------------------
*/

const MobileMenu = ({ isOpen, onClose }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  /*
  |--------------------------------------------------------------------------
  | Open / Close Subcategories
  |--------------------------------------------------------------------------
  */

  const [openCategory, setOpenCategory] = useState(null);


  /*
  |--------------------------------------------------------------------------
  | Fetch Categories
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (!isOpen) return;

    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(false);

        if (!API_URL) {
          throw new Error(
            "NEXT_PUBLIC_API_URL is not configured."
          );
        }

        const response = await fetch(
          `${API_URL}/api/product/categories/`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            cache: "no-store",
          }
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch categories: ${response.status}`
          );
        }

        const data = await response.json();

        console.log(
          "CATEGORY API RESPONSE:",
          data
        );

        /*
        |--------------------------------------------------------------------------
        | API can return:
        |
        | [
        |   {...},
        |   {...}
        | ]
        |
        | OR
        |
        | {
        |   results: [...]
        | }
        |--------------------------------------------------------------------------
        */

        const categoryList = Array.isArray(data)
          ? data
          : Array.isArray(data?.results)
          ? data.results
          : [];

        /*
        |--------------------------------------------------------------------------
        | Parent Categories
        |
        | Backend currently returns:
        |
        | parent: null
        |
        | OR:
        |
        | parent_id: null
        |--------------------------------------------------------------------------
        */

        const parentCategories = categoryList.filter(
          (category) =>
            category.parent === null ||
            category.parent_id === null ||
            category.parent === undefined &&
              category.parent_id === undefined
        );

        /*
        |--------------------------------------------------------------------------
        | Format Categories
        |--------------------------------------------------------------------------
        */

        const formattedCategories =
          parentCategories.map(
            (parentCategory, index) => {
              const parentId =
                parentCategory.id;

              /*
              |--------------------------------------------------------------------------
              | Find Children
              |--------------------------------------------------------------------------
              */

              const children =
                categoryList.filter(
                  (category) => {
                    return (
                      category.parent ===
                        parentId ||
                      category.parent_id ===
                        parentId
                    );
                  }
                );

              /*
              |--------------------------------------------------------------------------
              | Icon
              |--------------------------------------------------------------------------
              */

              const Icon =
                getCategoryIcon(index);

              return {
                ...parentCategory,

                icon: Icon,

                href: `/category/${parentCategory.slug}`,

                children: children.map(
                  (child) => ({
                    ...child,

                    href: `/category/${child.slug}`,
                  })
                ),
              };
            }
          );

        console.log(
          "FORMATTED CATEGORIES:",
          formattedCategories
        );

        setCategories(
          formattedCategories
        );
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
  }, [isOpen]);


  /*
  |--------------------------------------------------------------------------
  | Toggle Category
  |--------------------------------------------------------------------------
  */

  const toggleCategory = (categoryId) => {
    setOpenCategory((current) =>
      current === categoryId
        ? null
        : categoryId
    );
  };


  /*
  |--------------------------------------------------------------------------
  | Close Menu
  |--------------------------------------------------------------------------
  */

  const handleClose = () => {
    setOpenCategory(null);
    onClose();
  };


  /*
  |--------------------------------------------------------------------------
  | If Menu Closed
  |--------------------------------------------------------------------------
  */

  if (!isOpen) return null;


  return (
    <>
      {/* =========================================================
          Overlay
      ========================================================== */}

      <div
        onClick={handleClose}
        className="
          fixed
          inset-0
          z-[60]
          bg-black/50
          backdrop-blur-[2px]
        "
      />


      {/* =========================================================
          Drawer
      ========================================================== */}

      <aside
        className="
          fixed
          right-0
          top-0
          z-[70]
          flex
          h-screen
          w-[88%]
          max-w-sm
          flex-col
          bg-white
          shadow-2xl
        "
      >

        {/* =======================================================
            Header
        ======================================================== */}

        <div
          className="
            flex
            items-center
            justify-between
            border-b
            border-slate-200
            p-4
          "
        >

          <Link
            href="/"
            onClick={handleClose}
            className="
              text-xl
              font-black
              text-blue-600
            "
          >
            Nab
            <span className="text-slate-900">
              Bazaar
            </span>
          </Link>


          <button
            onClick={handleClose}
            className="
              rounded-lg
              p-2
              text-slate-600
              hover:bg-slate-100
              hover:text-slate-900
              transition
            "
            aria-label="بستن منو"
          >
            <X size={24} />
          </button>

        </div>


        {/* =======================================================
            User
        ======================================================== */}

        <Link
          href="/login"
          onClick={handleClose}
          className="
            m-4
            flex
            items-center
            gap-3
            rounded-xl
            bg-slate-100
            p-4
            transition
            hover:bg-slate-200
          "
        >

          <div
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-blue-600
              text-white
            "
          >
            <User size={20} />
          </div>


          <div>

            <p className="text-sm text-slate-500">
              Account
            </p>

            <p className="font-bold text-slate-900">
              Login / Register
            </p>

          </div>

        </Link>


        {/* =======================================================
            Scroll Content
        ======================================================== */}

        <div
          className="
            flex-1
            overflow-y-auto
            px-4
            pb-6
          "
        >

          {/* =====================================================
              Main Menu
          ====================================================== */}

          <div
            className="
              border-b
              border-slate-200
              pb-4
            "
          >

            {/* Home */}

            <Link
              href="/"
              onClick={handleClose}
              className="
                flex
                items-center
                gap-3
                rounded-lg
                px-3
                py-3
                text-slate-700
                hover:bg-slate-100
                transition
              "
            >
              <Home size={20} />
              <span>Home</span>
            </Link>


            {/* Shop */}

            <Link
              href="/shop"
              onClick={handleClose}
              className="
                flex
                items-center
                gap-3
                rounded-lg
                px-3
                py-3
                text-slate-700
                hover:bg-slate-100
                transition
              "
            >
              <Store size={20} />
              <span>Shop</span>
            </Link>


            {/* New Arrivals */}

            <Link
              href="/new-Arrivals"
              onClick={handleClose}
              className="
                flex
                items-center
                gap-3
                rounded-lg
                px-3
                py-3
                text-slate-700
                hover:bg-slate-100
                transition
              "
            >
              <Store size={20} />
              <span>New Arrivals</span>
            </Link>


            {/* Best Sellers */}

            <Link
              href="/best-sellers"
              onClick={handleClose}
              className="
                flex
                items-center
                gap-3
                rounded-lg
                px-3
                py-3
                text-slate-700
                hover:bg-slate-100
                transition
              "
            >
              <Store size={20} />
              <span>Best Sellers</span>
            </Link>


            {/* Deals */}

            <Link
              href="/deals"
              onClick={handleClose}
              className="
                flex
                items-center
                gap-3
                rounded-lg
                px-3
                py-3
                text-slate-700
                hover:bg-slate-100
                transition
              "
            >
              <Store size={20} />
              <span>Deals</span>
            </Link>


            {/* Blog */}

            <Link
              href="/blog"
              onClick={handleClose}
              className="
                flex
                items-center
                gap-3
                rounded-lg
                px-3
                py-3
                text-slate-700
                hover:bg-slate-100
                transition
              "
            >
              <Store size={20} />
              <span>Blog</span>
            </Link>


            {/* About */}

            <Link
              href="/about-us"
              onClick={handleClose}
              className="
                flex
                items-center
                gap-3
                rounded-lg
                px-3
                py-3
                text-slate-700
                hover:bg-slate-100
                transition
              "
            >
              <Store size={20} />
              <span>About Us</span>
            </Link>


            {/* FAQ */}

            <Link
              href="/faq"
              onClick={handleClose}
              className="
                flex
                items-center
                gap-3
                rounded-lg
                px-3
                py-3
                text-slate-700
                hover:bg-slate-100
                transition
              "
            >
              <Store size={20} />
              <span>FAQ</span>
            </Link>


            {/* Contact */}

            <Link
              href="/contact-us"
              onClick={handleClose}
              className="
                flex
                items-center
                gap-3
                rounded-lg
                px-3
                py-3
                text-slate-700
                hover:bg-slate-100
                transition
              "
            >
              <Store size={20} />
              <span>Contact Us</span>
            </Link>


            {/* Wishlist */}

            <Link
              href="/wishlist"
              onClick={handleClose}
              className="
                flex
                items-center
                gap-3
                rounded-lg
                px-3
                py-3
                text-slate-700
                hover:bg-slate-100
                transition
              "
            >
              <Heart size={20} />
              <span>Wishlist</span>
            </Link>


            {/* Compare */}

            <Link
              href="/compare"
              onClick={handleClose}
              className="
                flex
                items-center
                gap-3
                rounded-lg
                px-3
                py-3
                text-slate-700
                hover:bg-slate-100
                transition
              "
            >
              <Scale size={20} />
              <span>Compare</span>
            </Link>


            {/* Order Track */}

            <Link
              href="/track-order"
              onClick={handleClose}
              className="
                flex
                items-center
                gap-3
                rounded-lg
                px-3
                py-3
                text-slate-700
                hover:bg-slate-100
                transition
              "
            >
              <PackageSearch size={20} />
              <span>Order Track</span>
            </Link>

          </div>


          {/* =====================================================
              Categories
          ====================================================== */}

          <div className="py-4">

            <h3
              className="
                mb-3
                px-3
                text-base
                font-bold
                text-slate-900
              "
            >
              Categories
            </h3>


            {/* =================================================
                Loading
            ================================================== */}

            {loading && (
              <div
                className="
                  flex
                  items-center
                  justify-center
                  gap-2
                  py-8
                  text-sm
                  text-slate-500
                "
              >

                <Loader2
                  size={20}
                  className="animate-spin text-blue-600"
                />

                <span>
                  Loading categories...
                </span>

              </div>
            )}


            {/* =================================================
                Error
            ================================================== */}

            {!loading && error && (
              <div
                className="
                  mx-3
                  rounded-xl
                  border
                  border-red-100
                  bg-red-50
                  p-4
                  text-center
                "
              >

                <AlertCircle
                  size={22}
                  className="
                    mx-auto
                    mb-2
                    text-red-500
                  "
                />

                <p
                  className="
                    text-sm
                    font-medium
                    text-red-600
                  "
                >
                  Unable to load categories.
                </p>

                <p
                  className="
                    mt-1
                    text-xs
                    text-red-500
                  "
                >
                  Please try again later.
                </p>

              </div>
            )}


            {/* =================================================
                Empty
            ================================================== */}

            {!loading &&
              !error &&
              categories.length === 0 && (
                <div
                  className="
                    px-3
                    py-6
                    text-center
                    text-sm
                    text-slate-500
                  "
                >
                  No categories available.
                </div>
              )}


            {/* =================================================
                Category List
            ================================================== */}

            {!loading &&
              !error &&
              categories.length > 0 && (
                <div className="space-y-1">

                  {categories.map((item) => {

                    const Icon = item.icon;

                    const hasChildren =
                      item.children &&
                      item.children.length > 0;

                    const isOpen =
                      openCategory ===
                      item.id;


                    return (
                      <div
                        key={item.id}
                        className="rounded-xl"
                      >

                        {/* =================================================
                            Parent Category
                        ================================================== */}

                        <div
                          className={`
                            flex
                            items-center
                            rounded-xl
                            transition
                            ${
                              isOpen
                                ? "bg-blue-50"
                                : "hover:bg-slate-100"
                            }
                          `}
                        >

                          {/* Category Link */}

                          <Link
                            href={item.href}
                            onClick={handleClose}
                            className="
                              flex
                              min-w-0
                              flex-1
                              items-center
                              gap-3
                              px-3
                              py-3
                            "
                          >

                            <div
                              className="
                                flex
                                h-9
                                w-9
                                shrink-0
                                items-center
                                justify-center
                                rounded-lg
                                bg-blue-50
                                text-blue-600
                              "
                            >
                              <Icon size={19} />
                            </div>


                            <span
                              className="
                                truncate
                                text-sm
                                font-semibold
                                text-slate-800
                              "
                            >
                              {item.title}
                            </span>

                          </Link>


                          {/* =================================================
                              Expand Button
                          ================================================== */}

                          {hasChildren ? (
                            <button
                              type="button"
                              onClick={() =>
                                toggleCategory(
                                  item.id
                                )
                              }
                              className="
                                flex
                                h-11
                                w-11
                                shrink-0
                                items-center
                                justify-center
                                rounded-lg
                                text-slate-400
                                hover:bg-blue-100
                                hover:text-blue-600
                                transition
                              "
                              aria-label={
                                isOpen
                                  ? "بستن زیرمجموعه"
                                  : "باز کردن زیرمجموعه"
                              }
                            >

                              <ChevronDown
                                size={19}
                                className={`
                                  transition-transform
                                  duration-200
                                  ${
                                    isOpen
                                      ? "rotate-180 text-blue-600"
                                      : ""
                                  }
                                `}
                              />

                            </button>
                          ) : (
                            <ChevronLeft
                              size={18}
                              className="
                                mr-3
                                shrink-0
                                text-slate-300
                              "
                            />
                          )}

                        </div>


                        {/* =================================================
                            Children
                        ================================================== */}

                        {hasChildren &&
                          isOpen && (
                            <div
                              className="
                                ml-7
                                mt-1
                                border-l-2
                                border-blue-100
                                pl-2
                                pb-1
                              "
                            >

                              {item.children.map(
                                (child) => (
                                  <Link
                                    key={child.id}
                                    href={child.href}
                                    onClick={
                                      handleClose
                                    }
                                    className="
                                      flex
                                      items-center
                                      justify-between
                                      rounded-lg
                                      px-3
                                      py-2.5
                                      text-sm
                                      text-slate-600
                                      hover:bg-slate-100
                                      hover:text-blue-600
                                      transition
                                    "
                                  >

                                    <span>
                                      {child.title}
                                    </span>

                                    <ChevronLeft
                                      size={15}
                                      className="
                                        text-slate-300
                                      "
                                    />

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

          </div>

        </div>


        {/* =======================================================
            Footer
        ======================================================== */}

        <div
          className="
            border-t
            border-slate-200
            bg-white
            p-4
          "
        >

          <a
            href="tel:+93788001919"
            className="
              flex
              items-center
              gap-3
              rounded-xl
              bg-blue-600
              p-3
              text-white
              transition
              hover:bg-blue-700
            "
          >

            <div
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-lg
                bg-white/10
              "
            >
              <Phone size={20} />
            </div>


            <div>

              <p className="text-xs text-blue-100">
                تماس با پشتیبانی
              </p>

              <p className="font-bold">
                0788001919
              </p>

            </div>

          </a>

        </div>

      </aside>
    </>
  );
};

export default MobileMenu;