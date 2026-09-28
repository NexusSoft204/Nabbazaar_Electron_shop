import React from "react";
import ProductGallery from "./ProductGallery";
import AddToCart from "./AddToCart";

async function getProductDetail(slug) {
  const API_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    "http://127.0.0.1:8000";

  try {
    const res = await fetch(
      `${API_URL}/api/product/all/${slug}/`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      console.warn(
        `Product not found on server for slug: ${slug}`
      );

      return null;
    }

    const data = await res.json();

    if (Array.isArray(data)) {
      return data[0] || null;
    }

    return data;
  } catch (error) {
    console.error(
      "Error fetching product data:",
      error
    );

    return null;
  }
}

export default async function DetailProduct({ params }) {
  const { slug } = await params;

  const product = await getProductDetail(slug);

  if (!product) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#F7F8F9] px-6">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto rounded-full bg-red-50 flex items-center justify-center mb-5">
            <svg
              className="w-10 h-10 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3.732 1.732 3.732z"
              />
            </svg>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 font-montserrat">
            Product Not Found
          </h2>

          <p className="mt-2 text-slate-500 font-inter">
            The product may have been removed or is unavailable.
          </p>
        </div>
      </main>
    );
  }

  const price = Number(product.price || 0);

  const discountPrice = Number(
    product.discount_price || 0
  );

  const hasDiscount =
    discountPrice > 0 &&
    discountPrice < price;

  const finalPrice = hasDiscount
    ? discountPrice
    : price;

  const discountPercentage = hasDiscount
    ? Math.round(
        ((price - discountPrice) / price) * 100
      )
    : 0;

  const formattedPrice =
    finalPrice.toLocaleString("fa-IR");

  const formattedOriginalPrice =
    price.toLocaleString("fa-IR");

  return (
    <main className="w-full min-h-screen bg-[#F7F8F9] text-slate-800 py-6 sm:py-10 px-4 sm:px-6 lg:px-8">

      <section className="max-w-7xl mx-auto">

        {/* Breadcrumb */}
        <div className="flex font-montserrat flex-wrap items-center gap-2 text-sm text-slate-500 mb-6">
          <span>Home</span>
          <span>›</span>
          <span className="capitalize font-montserrat">
            {product.category}
          </span>
          <span>›</span>
          <span className="text-slate-900 font-semibold font-montserrat">
            {product.product_name}
          </span>
        </div>

        {/* Main Product Section */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">

            {/* Product Gallery */}
            <div className="p-5 sm:p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-slate-100">

              <ProductGallery
                mainImage={product.image}
                productName={product.product_name}
                gallery={product.gallery || []}
              />

            </div>

            {/* Product Details */}
            <div className="p-5 sm:p-8 lg:p-10 flex flex-col">

              {/* Top Actions */}
              <div className="flex items-center justify-between mb-5">

                <div className="flex flex-wrap gap-2 font-montserrat">

                  {product.is_special_offer && (
                    <span className="inline-flex items-center  gap-1.5 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-100 text-red-600 text-xs font-bold">
                      🔥 Special Offer
                    </span>
                  )}

                  {product.is_suggested && (
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold">
                      ⭐ Suggested Product
                    </span>
                  )}

                </div>

                <button
                  type="button"
                  aria-label="Share product"
                  className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:text-blue-600 hover:border-blue-200 transition"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="18" cy="5" r="3" />
                    <circle cx="6" cy="12" r="3" />
                    <circle cx="18" cy="19" r="3" />
                    <path
                      strokeWidth="1.8"
                      d="M8.59 13.51l6.83 3.98M15.41 6.51L8.59 10.49"
                    />
                  </svg>
                </button>

              </div>

              {/* Product Title */}
              <h1 className="text-3xl font-montserrat sm:text-4xl font-black text-slate-900 leading-tight tracking-tight">
                {product.product_name}
              </h1>

              {/* Category and Brand */}
              <div className="flex flex-wrap items-center gap-3 mt-4 text-sm font-montserrat">

                <span className="text-slate-500">
                  Category:
                  <span className="ml-1 font-bold text-slate-800 capitalize">
                    {product.category}
                  </span>
                </span>

                <span className="text-slate-300">|</span>

                <span className="text-slate-500">
                  Brand:
                  <span className="ml-1 font-bold text-slate-800 capitalize">
                    {product.brand}
                  </span>
                </span>

              </div>

              {/* Rating */}
              <div className="flex items-center gap-3 mt-5">

                <span className="text-sm text-slate-500">
                  0 Reviews
                </span>

                <div className="flex gap-1 text-slate-300">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 0 0-1.176 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 0 0-.364-1.118L2.79 8.72c-.783-.57-.38-1.81.588-1.81H6.84a1 1 0 0 0 .95-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

              </div>

              {/* Price Box */}
              <div className="mt-7 mb-4 rounded-lg bg-[#F5F8FD] border font-bold border-blue-50 p-5">

                <div className="text-sm  text-slate-500 font-inter mb-2">
                  Price
                </div>

                <div className="flex flex-wrap items-center gap-2">

                  <span className="text-4xl sm:text-5xl font-black text-[#045FF8]">
                    {formattedPrice}
                  </span>

                  <span className="text-sm font-bold font-montserrat text-[#045FF8]">
                    Af
                  </span>

                </div>

                {hasDiscount && (
                  <div className="flex items-center gap-3 mt-2">

                    <span className="text-sm text-slate-400 line-through">
                      {formattedOriginalPrice} Af
                    </span>

                    <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded-md">
                      {discountPercentage}% OFF
                    </span>

                  </div>
                )}

              </div>

              {/* Add To Cart */}
              <AddToCart
                  stock={product.stock}
                  product={product}
              />

              {/* Stock Message */}
              <div
                className={`
                  mt-4
                  rounded-xl
                  px-4
                  py-3
                  text-sm
                  font-bold
                  font-montserrat
                  ${
                    product.stock > 0
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-red-50 text-red-600"
                  }
                `}
              >
                {product.stock > 0
                  ? `Available in stock: ${product.stock}`
                  : "This product is currently unavailable"}
              </div>

              {/* Service Features */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6">

                <div className="rounded-xl border border-slate-100 p-3 text-center">
                  <div className="text-blue-600 mb-2">🚚</div>
                  <p className="text-xs font-bold text-slate-700 font-montserrat">
                    Fast Delivery
                  </p>
                  <p className="text-[10px] text-slate-400 mt-1 font-inter">
                    Across Afghanistan
                  </p>
                </div>

                <div className="rounded-xl border border-slate-100 p-3 text-center">
                  <div className="text-blue-600 mb-2">🔒</div>
                  <p className="text-xs font-bold text-slate-700 font-montserrat">
                    Secure Payment
                  </p>
                  <p className="text-[10px] text-slate-400 mt-1 font-inter">
                    Safe checkout
                  </p>
                </div>

                <div className="rounded-xl border border-slate-100 p-3 text-center col-span-2 sm:col-span-1">
                  <div className="text-blue-600 mb-2">✓</div>
                  <p className="text-xs font-bold text-slate-700 font-montserrat">
                    Quality Product
                  </p>
                  <p className="text-[10px] text-slate-400 mt-1 font-inter">
                    Verified products
                  </p>
                </div>

              </div>

            </div>
          </div>
        </div>

        {/* Lower Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">

          {/* Product Description */}
          <section className="lg:col-span-2 bg-white rounded-lg border border-slate-200 shadow-sm p-6 sm:p-8">

            <h2 className="text-xl font-black font-montserrat text-slate-900 border-b border-slate-100 pb-4 mb-5">
              Full Product Description
            </h2>

            <div className="text-sm sm:text-base font-inter text-slate-600 leading-8 whitespace-pre-line">
              {product.full_description}
            </div>

          </section>

          {/* Product Specifications */}
          <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8">

            <h2 className="text-xl font-black font-montserrat text-slate-900 border-b border-slate-100 pb-4 mb-5">
              Product Specifications
            </h2>

            <div className="space-y-4 text-sm font-montserrat">

              <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-3">
                <span className="text-slate-500">
                  Category
                </span>

                <span className="font-bold text-slate-800 capitalize">
                  {product.category}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-3">
                <span className="text-slate-500">
                  Brand
                </span>

                <span className="font-bold text-slate-800 capitalize">
                  {product.brand}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-3">
                <span className="text-slate-500">
                  Stock
                </span>

                <span className="font-bold text-slate-800">
                  {product.stock}
                </span>
              </div>
            </div>

          </section>

        </div>

        {/* What's In The Box */}
        {product.whats_in_the_box && (
          <section className="mt-6 bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8">

            <h2 className="text-xl font-black text-slate-900 mb-4 font-montserrat">
              What's in the Box?
            </h2>

            <p className="text-sm sm:text-base font-inter text-slate-600 leading-8 whitespace-pre-line">
              {product.whats_in_the_box}
            </p>

          </section>
        )}

      </section>
    </main>
  );
}