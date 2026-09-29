"use client";
import React, { useState, useEffect } from 'react';
import { Layers, Users, ShieldCheck, ArrowRight } from 'lucide-react';
// const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
if (!process.env.NEXT_PUBLIC_API_URL) {
  throw new Error("NEXT_PUBLIC_API_URL is not configured");
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;


export default function AboutUsSection() {
  const [data, setData] = useState(null);
  

  useEffect(() => {
    async function fetchAboutUs() {
      try {
        const res = await fetch(`${API_URL}/api/settings/aboutus/`, {
          cache: "no-store",
        });
        if (res.ok) {
          const result = await res.json();
          setData(result);
        }
      } catch (error) {
        console.error("Error fetching About Us data:", error);
      }
    }
    fetchAboutUs();
  }, []);



  if (!data) return null;

  
  const statsList = [
    {
      id: 1,
      value: data.projects_count || 0,
      label: "Active Projects",
      suffix: "+",
      icon: <Layers className="w-5 h-5 text-blue-600" />,
      borderTheme: "hover:border-blue-500/30",
    },
    {
      id: 2,
      value: data.experts_count || 0,
      label: "Tech Experts",
      suffix: "",
      icon: <Users className="w-5 h-5 text-purple-600" />,
      borderTheme: "hover:border-purple-500/30",
    },
    {
      id: 3,
      value: data.users_count || 0,
      label: "Registered Users",
      suffix: "+",
      icon: <ShieldCheck className="w-5 h-5 text-emerald-600" />,
      borderTheme: "hover:border-emerald-500/30",
    },
  ];

  return (
    <section className="w-full py-20 bg-white text-left font-inter">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Media Canvas & Animated Counters */}
          <div className="lg:col-span-6 space-y-8">
            <div className="relative w-full h-[400px] rounded-3xl overflow-hidden shadow-lg bg-gray-100 group">
              <img
                src={data.main_image}
                alt={data.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>

            {/* Dynamic Animated Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {statsList.map((stat) => (
                <div
                  key={stat.id}
                  className={`bg-gray-50 p-6 rounded-2xl border border-gray-100/80 shadow-xs flex flex-col items-start transition-all duration-300 transform hover:-translate-y-1 ${stat.borderTheme}`}
                >
                  <div className="p-2.5 bg-white rounded-xl shadow-xs mb-4">
                    {stat.icon}
                  </div>
                  <span className="text-3xl font-extrabold font-oswald text-gray-900 tracking-tight transition-all duration-500 hover:scale-105">
                    {stat.value}{stat.suffix}
                  </span>
                  <span className="text-sm font-medium text-gray-500 mt-1">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Text Information Material */}
          <div className="lg:col-span-6 space-y-6 lg:pt-4">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-xs font-montserrat font-bold uppercase tracking-wider">
              Corporate Overview
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-extrabold font-oswald text-gray-900 leading-tight uppercase font-montserrat">
              {data.title}
            </h2>
            
            <p className="text-base text-gray-600 leading-8 font-inter text-justify">
              {data?.description}
              
            </p>

            {/* Sub-sections tabs layout built cleanly */}
            <div className="pt-4 border-t border-gray-100 space-y-6">
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-gray-400 font-oswald mb-1">Our History:</h4>
                <p className="text-sm text-gray-500 leading-6 text-justify">{data.history}</p>
              </div>


              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-gray-400 font-oswald mb-1">Our Core Mission</h4>
                <p className="text-sm text-gray-500 leading-6 text-justify">{data.mission}</p>
              </div>


               <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-gray-400 font-oswald mb-1">Our Vision</h4>
                <p className="text-sm text-gray-500 leading-6 text-justify">{data.vision}</p>
              </div>


              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-gray-400 font-oswald mb-1">Our Core Values</h4>
                <p className="text-sm text-gray-500 leading-6 text-justify">{data.values}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-gray-400 font-oswald mb-1">Why Choose Our Framework</h4>
                <p className="text-sm text-gray-500 leading-6 text-justify">{data.why_us}</p>
              </div>



              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-gray-400 font-oswald mb-1">Branch Addresses / Locations:</h4>
                <p className="text-sm text-gray-500 leading-6 text-justify">{data.branch_address}</p>
              </div>
            </div>

            <div className="pt-4">
              <button className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white transition-all px-6 py-3.5 rounded-xl font-semibold text-sm shadow-sm hover:shadow group">
                Discover Strategic Services
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
