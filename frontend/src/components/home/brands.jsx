import Link from "next/link";
import React from "react";

// =====================================================
// Fetch Brands from Django API
// =====================================================
async function GetDataBrand() {
  if (!process.env.NEXT_PUBLIC_API_URL) {
  throw new Error("NEXT_PUBLIC_API_URL is not configured");
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

  try {
    const response = await fetch(`${API_URL}/api/product/brands/`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch brands");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching brands:", error);
    return [];
  }
}

// =====================================================
// Brands Component
// =====================================================
const Brands = async () => {

  const liveBrands = await GetDataBrand();

  // No brands
  if (!liveBrands || liveBrands.length === 0) {
    return null;
  }

  // =====================================================
  // Image URL Helper
  // =====================================================
  const getImageUrl = (logo) => {
    if (!logo) {
      return "/images/brand-placeholder.png";
    }

    if (logo.startsWith("http")) {
      return logo;
    }

    return `${API_URL}${logo}`;
  };

  return (
    <section className="w-full py-6 sm:py-8">
      <div className="2xl:container w-full mx-auto px-5 sm:px-6">

        {/* =================================================
            HEADER
        ================================================= */}
        <div className="flex items-center justify-between mb-7 sm:mb-8">

          {/* View All */}
          <Link
            href="/shop"
            className="
              inline-flex
              items-center
              gap-2

              rounded-xl
              border
              border-orange-200

              bg-orange-50

              px-4
              py-2

              text-sm
              font-semibold
              text-orange-600

              transition-all
              duration-200

              hover:bg-orange-100
              hover:border-orange-300
            "
          >
            <span>View All</span>

            <span className="text-base">
              ←
            </span>
          </Link>

          {/* Title */}
          <h2
            className="
              text-xl
              sm:text-2xl
              lg:text-3xl

              font-bold
              text-gray-900

              font-montserrat
            "
          >
            Brands
          </h2>
        </div>

        {/* =================================================
            BRANDS GRID
        ================================================= */}
        <div
          className="
            grid

            grid-cols-2
            sm:grid-cols-4
            md:grid-cols-6
            lg:grid-cols-9

            gap-x-5
            gap-y-8

            sm:gap-x-6
            sm:gap-y-10

            lg:gap-x-8
            lg:gap-y-10
          "
        >
          {liveBrands.map((brand) => (
            <Link
              key={brand.id}
              href={`/shop?brand=${brand.id}`}
              className="
                group

                flex
                flex-col
                items-center
                justify-center

                text-center

                min-w-0
              "
            >
              {/* =================================================
                  BRAND IMAGE
              ================================================= */}
              <div
                className="
                  w-28
                  h-28

                  sm:w-30
                  sm:h-30

                  lg:w-32
                  lg:h-32

                  rounded-full

                  bg-gray-100

                  flex
                  items-center
                  justify-center

                  overflow-hidden

                  border
                  border-gray-200

                  transition-all
                  duration-300

                  group-hover:bg-white
                  group-hover:border-gray-300
                  group-hover:shadow-md
                  group-hover:-translate-y-1
                "
              >
                <img
                  src={getImageUrl(brand.logo)}
                  alt={brand.title || brand.name || "Brand"}
                  className="
                    w-full
                    h-full

                    object-contain
                    rounded-full
                    p-2

                    transition-transform
                    duration-300

                    group-hover:scale-105
                  "
                />
              </div>

              {/* =================================================
                  BRAND NAME
              ================================================= */}
              <h3
                className="
                  mt-3

                  text-sm
                  sm:text-[15px]

                  font-semibold

                  text-gray-800

                  font-montserrat

                  truncate

                  max-w-full

                  transition-colors
                  duration-200

                  group-hover:text-primary-blue
                "
                title={brand.title || brand.name}
              >
                {brand.title || brand.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Brands;