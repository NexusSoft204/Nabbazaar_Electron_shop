"use client";

import React from "react";

const ShareButton = ({ productName }) => {
  const handleShare = async () => {
    const productUrl = window.location.href;

    try {
      // موبایل و مرورگرهایی که Web Share API دارند
      if (navigator.share) {
        await navigator.share({
          title: productName,
          text: `Check out this product: ${productName}`,
          url: productUrl,
        });
      } else {
        // اگر Web Share پشتیبانی نشد، لینک کپی شود
        await navigator.clipboard.writeText(productUrl);
        alert("Product link copied!");
      }
    } catch (error) {
      // کاربر Share را لغو کرده باشد
      if (error?.name !== "AbortError") {
        console.error("Share failed:", error);
      }
    }
  };

  return (
    <button
      type="button"
      aria-label="Share product"
      onClick={handleShare}
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
  );
};

export default ShareButton;