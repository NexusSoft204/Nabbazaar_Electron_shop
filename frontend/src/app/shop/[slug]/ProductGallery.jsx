"use client";

import React, { useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";

export default function ProductGallery({
  mainImage,
  productName,
  gallery = [],
}) {
  const imagesList = useMemo(() => {
    const galleryImages = gallery
      .map((item) => {
        // ساختار واقعی API:
        // { id: 1, image: "http://..." }

        if (typeof item === "string") {
          return item;
        }

        return item?.image;
      })
      .filter(Boolean);

    // اگر تصویر اصلی در gallery موجود نبود، آن را اضافه می‌کنیم
    if (
      mainImage &&
      !galleryImages.includes(mainImage)
    ) {
      galleryImages.unshift(mainImage);
    }

    return galleryImages;
  }, [gallery, mainImage]);

  const [activeImage, setActiveImage] = useState(
    imagesList[0] || mainImage
  );

  const [activeIndex, setActiveIndex] = useState(0);

  const handleImageChange = (image, index) => {
    setActiveImage(image);
    setActiveIndex(index);
  };

  return (
    <div className="w-full space-y-5">

      {/* Main Product Image */}
      <div className="relative w-full rounded-3xl border border-slate-100 bg-white overflow-hidden">

        {/* Image Counter */}
        {imagesList.length > 0 && (
          <div className="absolute top-4 right-4 z-10">
            <span className="inline-flex items-center rounded-full bg-slate-900/75 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-sm">
              {activeIndex + 1} / {imagesList.length}
            </span>
          </div>
        )}

        {/* Favorite Button */}
        <button
          type="button"
          aria-label="Add product to wishlist"
          className="
            absolute
            top-4
            left-4
            z-10
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            border
            border-slate-200
            bg-white
            text-xl
            text-slate-600
            shadow-sm
            transition
            hover:border-blue-500
            hover:text-blue-600
          "
        >
          ♡
        </button>

        {/* Main Image Area */}
        <div className="flex aspect-square w-full items-center justify-center bg-[#F8FAFC] p-6 sm:p-10">

          {activeImage ? (
            <img
              src={activeImage}
              alt={productName}
              className="
                h-full
                w-full
                object-contain
                transition-opacity
                duration-300
              "
            />
          ) : (
            <div className="text-sm font-medium text-slate-400">
              No image available
            </div>
          )}

        </div>

        {/* Main Image Navigation */}
        {imagesList.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => {
                const previousIndex =
                  activeIndex === 0
                    ? imagesList.length - 1
                    : activeIndex - 1;

                handleImageChange(
                  imagesList[previousIndex],
                  previousIndex
                );
              }}
              aria-label="Previous product image"
              className="
                absolute
                left-4
                top-1/2
                z-10
                flex
                h-10
                w-10
                -translate-y-1/2
                items-center
                justify-center
                rounded-full
                border
                border-slate-200
                bg-white/95
                text-xl
                text-slate-700
                shadow-md
                transition
                hover:border-blue-500
                hover:text-blue-600
              "
            >
              ‹
            </button>

            <button
              type="button"
              onClick={() => {
                const nextIndex =
                  activeIndex === imagesList.length - 1
                    ? 0
                    : activeIndex + 1;

                handleImageChange(
                  imagesList[nextIndex],
                  nextIndex
                );
              }}
              aria-label="Next product image"
              className="
                absolute
                right-4
                top-1/2
                z-10
                flex
                h-10
                w-10
                -translate-y-1/2
                items-center
                justify-center
                rounded-full
                border
                border-slate-200
                bg-white/95
                text-xl
                text-slate-700
                shadow-md
                transition
                hover:border-blue-500
                hover:text-blue-600
              "
            >
              ›
            </button>
          </>
        )}
      </div>

      {/* Thumbnail Slider */}
      {imagesList.length > 1 && (
        <div className="relative px-1">

          <Swiper
            modules={[FreeMode, Navigation]}
            freeMode
            navigation={{
              nextEl: ".product-gallery-next",
              prevEl: ".product-gallery-prev",
            }}
            spaceBetween={12}
            slidesPerView={3}
            breakpoints={{
              360: {
                slidesPerView: 3,
                spaceBetween: 8,
              },
              480: {
                slidesPerView: 4,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 12,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 12,
              },
            }}
            className="product-thumbnails-swiper"
          >
            {imagesList.map((image, index) => {
              const isActive = activeIndex === index;

              return (
                <SwiperSlide key={`${image}-${index}`}>
                  <button
                    type="button"
                    onClick={() =>
                      handleImageChange(image, index)
                    }
                    aria-label={`Show product image ${index + 1}`}
                    className={`
                      relative
                      flex
                      aspect-square
                      w-full
                      items-center
                      justify-center
                      overflow-hidden
                      rounded-2xl
                      border-2
                      bg-white
                      p-2
                      transition-all
                      duration-200
                      ${
                        isActive
                          ? "border-[#045FF8] shadow-md shadow-blue-500/10"
                          : "border-slate-200 hover:border-blue-300"
                      }
                    `}
                  >
                    <img
                      src={image}
                      alt={`${productName} thumbnail ${index + 1}`}
                      className="h-full w-full object-contain"
                    />

                    {isActive && (
                      <span className="absolute inset-0 rounded-2xl border-2 border-[#045FF8]" />
                    )}
                  </button>
                </SwiperSlide>
              );
            })}
          </Swiper>

          {/* Thumbnail Previous Button */}
          <button
            type="button"
            className="
              product-gallery-prev
              absolute
              -left-2
              top-1/2
              z-10
              flex
              h-8
              w-8
              -translate-y-1/2
              items-center
              justify-center
              rounded-full
              border
              border-slate-200
              bg-white
              text-lg
              text-slate-700
              shadow-md
              transition
              hover:border-blue-500
              hover:text-blue-600
            "
            aria-label="Previous thumbnails"
          >
            ‹
          </button>

          {/* Thumbnail Next Button */}
          <button
            type="button"
            className="
              product-gallery-next
              absolute
              -right-2
              top-1/2
              z-10
              flex
              h-8
              w-8
              -translate-y-1/2
              items-center
              justify-center
              rounded-full
              border
              border-slate-200
              bg-white
              text-lg
              text-slate-700
              shadow-md
              transition
              hover:border-blue-500
              hover:text-blue-600
            "
            aria-label="Next thumbnails"
          >
            ›
          </button>

        </div>
      )}

      {/* Small Image Dots */}
      {imagesList.length > 1 && (
        <div className="flex items-center justify-center gap-1.5">
          {imagesList.map((image, index) => (
            <button
              key={`${image}-dot-${index}`}
              type="button"
              onClick={() =>
                handleImageChange(image, index)
              }
              aria-label={`Select image ${index + 1}`}
              className={`
                h-1.5
                rounded-full
                transition-all
                duration-200
                ${
                  activeIndex === index
                    ? "w-6 bg-[#045FF8]"
                    : "w-1.5 bg-slate-300"
                }
              `}
            />
          ))}
        </div>
      )}

    </div>
  );
}