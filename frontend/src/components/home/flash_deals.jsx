"use client";
import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import axios from 'axios';
import { Tag, ChevronLeft, ChevronRight } from 'lucide-react';

const Flash_deals = () => {
  const [products, setProducts] = useState([]);
  const sliderRef = useRef(null);
  const router = useRouter();

  // ۱. استیت برای تایمر معکوس (مثلاً ۶ ساعت و ۴۵ دقیقه و ۲۹ ثانیه‌ی داخل عکس شما)
  const [timeLeft, setTimeLeft] = useState({ hours: 6, minutes: 45, seconds: 29 });

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // لود دیتای بخش special_discounts از جنگو
  useEffect(() => {
    const fetchFlashDeals = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/product/`);
        // استخراج بخش تخفیف‌های ویژه بر اساس جی‌سون ارسالی شما
        setProducts(response.data.special_discounts || []);
      } catch (error) {
        console.error("Error fetching flash deals:", error);
      }
    };
    fetchFlashDeals();
  }, [API_URL]);

  // منطق کاهش ثانیه‌ای تایمر زنده
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.hours === 0 && prev.minutes === 0 && prev.seconds === 0) {
          clearInterval(timer);
          return prev;
        }
        let s = prev.seconds - 1;
        let m = prev.minutes;
        let h = prev.hours;

        if (s < 0) {
          s = 59;
          m -= 1;
        }
        if (m < 0) {
          m = 59;
          h -= 1;
        }
        return { hours: h, minutes: m, seconds: s };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // جابجایی اسلایدر به چپ و راست
  const scroll = (direction) => {
    if (sliderRef.current) {
      const { scrollLeft } = sliderRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - 220 : scrollLeft + 220;
      sliderRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  // محاسبه پویای درصد تخفیف قرمز رنگ
  const calculateDiscount = (price, discountPrice) => {
    const p = parseFloat(price);
    const d = parseFloat(discountPrice);
    if (!p || !d || d >= p) return null;
    return Math.round(((p - d) / p) * 100);
  };

  // فرمت دو رقمی اعداد تایمر (مثلاً تبدیل 6 به 06)
  const formatTime = (num) => String(num).padStart(2, '0');

  return (
    <section className='w-full my-6 select-none'>
      <div className='2xl:max-w-6xl mx-auto flex h-48 border-2 border-red-600 rounded-md overflow-hidden bg-white relative group'>
        
        {/* ======================================================== */}
        {/* کادر قرمز رنگ سمت چپ (Flash Deals Banner) */}
        {/* ======================================================== */}
        <div className=' w-1/4 min-w-[240px] bg-red-600 h-full p-2 pt-5 flex justify-between text-white relative z-10'>
          <div className='space-y-1.5'>
            <div className='flex items-center gap-2'>
              <Tag className='w-10 h-10 fill-white text-red-600 transform rotate-95' />
              <h2 className='text-xl font-bold tracking-wide font-montserrat'>Flash Deals</h2>
            </div>
            <p className='text-[14px] pl-2 opacity-90 leading-tight font-inter'>
              Limited time offers –<br />don't miss out!
            </p>
          </div>

          {/* باکس‌های سفید رنگ اعداد تایمر دقیقاً مطابق تصویر */}
          <div className=' font-inter'>
            <div className='flex gap-1.5 my-2 w-full'>
              <div className='flex flex-col items-center bg-white text-black rounded py-4 px-1.5  min-w-[36px] shadow-sm'>
              <span className='font-bold text-base leading-none'>{formatTime(timeLeft.hours)}</span>
              <span className='text-[8px] text-gray-500 font-bold mt-0.5'>Hours</span>
            </div>
            <div className='flex flex-col items-center bg-white text-black rounded px-1.5 py-4 min-w-[36px] shadow-sm'>
              <span className='font-bold text-base leading-none'>{formatTime(timeLeft.minutes)}</span>
              <span className='text-[8px] text-gray-500 font-bold mt-0.5'>Mins</span>
            </div>
            <div className='flex flex-col items-center bg-white text-black rounded px-1.5 py-4 min-w-[36px] shadow-sm'>
              <span className='font-bold text-base leading-none'>{formatTime(timeLeft.seconds)}</span>
              <span className='text-[8px] text-gray-500 font-bold mt-0.5'>Secs</span>
            </div>
            </div>
            <div className='w-full'>
                {/* دکمه شیشه‌ای کادر قرمز */}
                <Link href="/special-offers" className='border w-full h-9 flex font-montserrat border-white/60 hover:bg-white hover:text-red-600 justify-center items-center py-1 rounded font-bold text-xs transition-colors tracking-wide max-w-[140px]'>
                  Shop Now
                </Link>
            </div>
          </div>

        </div>

        {/* ======================================================== */}
        {/* اسلایدر سفید رنگ سمت راست (کالاها) */}
        {/* ======================================================== */}
        <div className='w-3/4 h-full relative flex items-center px-2 bg-white'>
          
          {/* دکمه جهت‌نما چپ */}
          <button onClick={() => scroll('left')} className='cursor-pointer absolute left-1 z-20 bg-white/90 border shadow p-1.5 rounded-full hover:bg-gray-50 opacity-0 group-hover:opacity-100 transition-opacity'>
            <ChevronLeft className='w-4 h-4 text-gray-700' />
          </button>

          {/* محفظه رندر محصولات خطی */}
          <div 
            ref={sliderRef}
            className='flex h-full w-full overflow-x-auto scrollbar-none items-center snap-x'
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {products.map((product, index) => {
              const discountPercent = calculateDiscount(product.price, product.discount_price);
              
              return (
                <div 
                  onClick={() => router.push(`/shop/${product.slug}`)} 
                  key={product.id}
                  className={`h-full w-[200px] cursor-pointer flex-shrink-0 flex items-center gap-3 snap-start transition-colors relative group/card ${
                    index !== products.length - 1 ? 'border-r-2 border-gray-100' : ''
                  }`}
                >
                  {/* تصویر محصول کج شده در سمت چپ کارت */}
                  <div className='w-20 h-full flex items-center justify-center py-5 bg-white rounded-lg pl-1'>
                    <img 
                      src={`${API_URL}${product.image}`} 
                      alt={product.product_name}
                      className='max-w-full max-h-full h-full object-cover group-hover/card:scale-105 transition-transform'
                    />
                  </div>

                  {/* اطلاعات متنی: عنوان، برچسب درصد قرمز و قیمت‌ها */}
                  <div className='flex-1 flex flex-col justify-center space-y-1.5 min-w-0'>
                    <h3 className='text-[11px] font-montserrat font-bold text-gray-800 line-clamp-2 leading-tight pr-1'>
                      {product.product_name}
                    </h3>
                    
                    {/* درصد تخفیف توپر قرمز رنگ مطابق تصویر ارسالی */}
                    {discountPercent && (
                      <span className='bg-red-600 font-inter text-white text-[9px] font-black px-1 py-0.5 rounded w-fit leading-none'>
                        -{discountPercent}%
                      </span>
                    )}

                    <div className='flex flex-col text-[11px] font-montserrat'>
                      <span className='font-black text-slate-900'>
                        AFN {parseFloat(product.discount_price || product.price).toLocaleString()}
                      </span>
                      {discountPercent && (
                        <span className='text-[9px] text-gray-400 line-through mt-0.5'>
                          AFN {parseFloat(product.price).toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* دکمه جهت‌نما راست */}
          <button onClick={() => scroll('right')} className='cursor-pointer absolute right-1 z-20 bg-white/90 border shadow p-1.5 rounded-full hover:bg-gray-50 opacity-0 group-hover:opacity-100 transition-opacity'>
            <ChevronRight className='w-4 h-4 text-gray-700' />
          </button>

        </div>

      </div>
    </section>
  );
};

export default Flash_deals;
