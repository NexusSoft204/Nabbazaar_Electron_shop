"use client";
import { useBasket } from "@/context/BasketContext";
import React, { useState, useEffect } from "react";

export default function AddToCart({ stock = 0, product }) {
  const { basket, addToBasket, increaseQuantity, decreaseQuantity } = useBasket();
  const [quantity, setQuantity] = useState(1);

  // پیدا کردن محصول در سبد خرید (در صورت وجود)
  const itemInBasket = basket.find((item) => item.id === product.id);

  // همگام‌سازی عدد داخل اینپوت با تعداد موجود در سبد خرید
  useEffect(() => {
    if (itemInBasket) {
      setQuantity(itemInBasket.quantity);
    } else {
      setQuantity(1);
    }
  }, [itemInBasket]);

  // رخداد افزایش تعداد (Plus) 
  const handleIncrease = () => { 
    if (quantity >= stock) return; 
 
    const nextQuantity = quantity + 1; 
    setQuantity(nextQuantity); 
 
    if (itemInBasket) { 
      increaseQuantity(product.id); 
    } 
  }; 
 
  // رخداد کاهش تعداد (Minus) 
  const handleDecrease = () => { 
    if (quantity <= 1) return; 
 
    const nextQuantity = quantity - 1; 
    setQuantity(nextQuantity); 
 
    if (itemInBasket) { 
      decreaseQuantity(product.id); 
    } 
  }; 
 
  // رخداد دکمه اصلی افزودن به سبد خرید 
  const handleAddToCart = () => { 
    addToBasket(product, quantity); 
  }; 
 
  // تغییر دستی از طریق تایپ در Input 
  const handleQuantityChange = (event) => { 
    let value = Number(event.target.value); 
    if (!value || value < 1) value = 1; 
    if (value > stock) value = stock; 
     
    setQuantity(value); 
    if (itemInBasket) { 
      addToBasket(product, value); 
    } 
  }; 
 
  if (stock <= 0) { 
    return ( 
      <div className="w-full"> 
        <button 
          type="button" 
          disabled 
          className="w-full h-14 rounded-2xl bg-slate-300 text-slate-500 font-bold cursor-not-allowed" 
        > 
          Out of Stock 
        </button> 
      </div> 
    ); 
  } 
 
  return ( 
    <div className="w-full space-y-3"> 
      <div className="flex flex-col sm:flex-row gap-3"> 
         
        {/* Quantity Controller */} 
        <div className="h-14 flex items-center justify-between rounded-2xl border border-slate-200 bg-white overflow-hidden sm:w-40 flex-shrink-0"> 
          {/* دکمه کاهش تعداد */} 
          <button 
            type="button" 
            onClick={handleDecrease} 
            disabled={quantity <= 1} 
            aria-label="Decrease quantity" 
            className="w-12 h-full flex items-center justify-center text-xl font-bold text-slate-600 hover:bg-slate-50 hover:text-[#045FF8] disabled:text-slate-300 disabled:cursor-not-allowed transition" 
          > 
            − 
          </button> 
 
          {/* Quantity Input */} 
          <input 
            type="number" 
            min="1" 
            max={stock} 
            value={quantity} 
            onChange={handleQuantityChange} 
            className="w-14 h-full text-center font-bold text-slate-900 outline-none border-x border-slate-100 bg-white" 
          /> 
 
          {/* دکمه افزایش تعداد */} 
          <button 
            type="button" 
            onClick={handleIncrease} 
            disabled={quantity >= stock} 
            aria-label="Increase quantity" 
            className="w-12 h-full flex items-center justify-center text-xl font-bold text-slate-600 hover:bg-slate-50 hover:text-[#045FF8] disabled:text-slate-300 disabled:cursor-not-allowed transition" 
          > 
            + 
          </button> 
        </div> 
 
        {/* Add To Cart Button */} 
        <button 
          type="button" 
          onClick={handleAddToCart} 
          disabled={!!itemInBasket} 
          className="flex-1 h-14 rounded-2xl bg-[#045FF8] text-white font-bold flex items-center justify-center gap-3 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/20 active:scale-[0.99] transition-all disabled:bg-slate-300 disabled:text-slate-500 disabled:shadow-none disabled:cursor-not-allowed" 
        > 
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"> 
            <path 
              strokeWidth="1.8" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 2h12m-9 4a1 1 0 1 0 2 0m6 0a1 1 0 1 0 2 0" 
            /> 
          </svg> 
          {itemInBasket ? "Added to Cart" : "Add to Cart"} 
        </button> 
      </div> 
 
      {/* Stock information */} 
      <div className="flex items-center justify-between text-xs text-slate-500 px-1"> 
        <span> 
          Quantity: <strong className="text-slate-800">{quantity}</strong> 
        </span> 
        <span>{stock} items available</span> 
      </div> 
    </div> 
  ); 
} 
