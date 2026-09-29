"use client";
import React, { useState, useEffect } from 'react';
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

const Benefits = () => {
  const [benefits, setBenefits] = useState([]);
  const [loading, setLoading] = useState(true);

  // دریافت اطلاعات داینامیک از API بک‌آند
  useEffect(() => {
    async function fetchBenefits() {
      try {
        const res = await fetch(`${API_URL}/api/settings/benefit/`, {
          cache: "no-store",
        });
        const data = await res.json();
        
        // بررسی ساختار آرایه بودن پاسخ دیتابیس
        const finalData = Array.isArray(data) ? data : data.results || [];
        setBenefits(finalData);
      } catch (error) {
        console.error("Error fetching store benefits:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchBenefits();
  }, []);

  // اگر هنوز داده‌ها لود نشده باشند، چیزی رندر نشود یا کامپوننت پنهان بماند
  if (loading || benefits.length === 0) return null;

  return (
    <section className='w-full text-left py-5 hidden lg:block bg-gray-50' dir="ltr">
      <div className='2xl:container mx-auto px-3'>
        
        {/* گرید ۴ ستونه دقیقاً مطابق با طراحی شما */}
        <div className='grid lg:grid-cols-4 gap-4'>
          {benefits.map((benefit) => {
            // اصلاح هوشمند مسیر فایل تصاویری که با اسلش شروع می‌شوند
            let imageUrl = benefit.image;
            if (imageUrl && imageUrl.startsWith("/")) {
              imageUrl = `http://127.0.0.1:8000${imageUrl}`;
            }

            return (
              <div 
                key={benefit.id}
                className='bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center justify-start gap-4 text-left group hover:shadow-md hover:border-blue-500/20 transition-all duration-300 transform hover:-translate-y-1'
              >
                {/* باکس رندر خودکار تصاویر یا آیکون‌های ارسالی از ادمین جنگو */}
                <div className='w-14 h-14 rounded-xl flex items-center justify-center overflow-hidden bg-gray-50 group-hover:scale-110 transition-transform duration-300 shrink-0'>
                  {imageUrl ? (
                    <img 
                      src={imageUrl} 
                      alt={benefit.title} 
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 animate-pulse" />
                  )}
                </div>

                {/* عنوان ویژگی به صورت انگلیسی و داینامیک */}
                <h3 className='text-sm font-bold text-gray-800 capitalize font-montserrat'>
                  {benefit.title}
                </h3>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Benefits;
