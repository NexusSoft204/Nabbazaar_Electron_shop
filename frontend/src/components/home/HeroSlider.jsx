"use client";
import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";



export default function Hero_components() {
  const [hero, setHero] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  
  const autoplayTimer = useRef(null);

  useEffect(() => {
    async function loadHero() {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/settings/hero-sliders/", {
          cache: "no-store",
        });
        const data = await res.json();
        
        // # ✅ ۲. بررسی امنیتی پجینیشن یا آرایه بودن ریسپانس بک‌اند
        const finalData = Array.isArray(data) ? data : data.results || [];
        setHero(finalData);
        console.log("دیتای دریافتی هیرو:", finalData);
      } catch (error) {
        console.error("خطا در دریافت دیتای هیرو:", error);
      }
    }
    loadHero();
  }, []);

//   # ✅ ۳. بهبود منطق توقف و شروع تایمر خودکار اسلایدر
  const stopAutoplay = () => {
    if (autoplayTimer.current) {
      clearInterval(autoplayTimer.current);
      autoplayTimer.current = null;
    }
  };

  const startAutoplay = () => {
    stopAutoplay(); 
    if (hero && hero.length > 1) {
      autoplayTimer.current = setInterval(() => {
        setSelectedIndex((prevIndex) => (prevIndex + 1) % hero.length);
      }, 5000);
    }
  };

  useEffect(() => {
    if (hero && hero.length > 0) {
      startAutoplay();
    }
    return () => stopAutoplay();
  }, [hero, selectedIndex]);

  const scrollPrev = () => {
    if (hero.length === 0) return;
    setSelectedIndex((prevIndex) =>
      prevIndex === 0 ? hero.length - 1 : prevIndex - 1
    );
  };

  const scrollNext = () => {
    if (hero.length === 0) return;
    setSelectedIndex((prevIndex) => (prevIndex + 1) % hero.length);
  };

  const scrollTo = (index) => {
    setSelectedIndex(index);
  };



  return (
    <section 
      className="relative overflow-hidden w-full min-h-[85vh]"
      onMouseEnter={stopAutoplay}
      onMouseLeave={startAutoplay}
    >
      <div className="overflow-hidden w-full h-full">
        <div 
          className="flex w-full transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${selectedIndex * 100}%)` }}
        >
          {hero.map((item, index) => {
            // # ✅ ۴. اصلاح هوشمند آدرس تصاویر برای عدم تداخل دامنه لوکال و سرور اصلی
            let imageUrl = item.image;
            if (imageUrl.startsWith("/")) {
              imageUrl = `http://127.0.0.1:8000${imageUrl}`;
            }

            return (
              <div
                key={item.id}
                className="relative flex-[0_0_100%] min-w-0 h-[85vh] w-full select-none"
              >
                <img
                  src={imageUrl}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading={index === 0 ? "eager" : "lazy"}
                />
                <div className="absolute inset-0 bg-black/50 z-10" />
                
                <div className="relative z-20 flex items-center h-full px-6 md:px-10">
                  <div className="max-w-7xl mx-auto w-full">
                    <div className="max-w-2xl space-y-6 text-white md:p-20" >
                      <h1 className="text-3xl md:text-5xl w-full font-bold leading-tight font-montserrat">
                        {item.title}
                      </h1>
                      <p className="text-base leading-8 opacity-90 font-inter">
                        {item.subtitle}
                      </p>
                      <div className="flex gap-4 pt-2">
                        <a 
                          href={item.first_btn_url || "#"} 
                          className="bg-blue-600 hover:bg-blue-700 text-white transition px-6 py-3.5 rounded-xl font-semibold text-sm inline-block font-montserrat"
                        >
                          {item.first_btn_text || "shop now"}
                        </a>
                        <a 
                          href={item.second_btn_url || "#"} 
                          className="border border-white/60 hover:bg-white hover:text-black text-white transition px-6 py-3.5 font-montserrat font-bold rounded-xl text-sm inline-block"
                        >
                          {item.second_btn_text || "learn more"}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <button
        onClick={scrollPrev}
        className="absolute left-5 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full backdrop-blur z-30 transition-colors"
      >
        <ChevronLeft size={30} />
      </button>

      <button
        onClick={scrollNext}
        className="absolute right-5 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full backdrop-blur z-30 transition-colors"
      >
        <ChevronRight size={30} />
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-30">
        {hero.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              selectedIndex === index ? "w-8 bg-white" : "w-2.5 bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
