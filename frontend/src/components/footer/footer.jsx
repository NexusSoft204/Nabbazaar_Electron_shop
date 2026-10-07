import React from 'react';
import Link from 'next/link';
import Social from './social';
import { 
  MapPin, Phone, Mail, Clock, 
  ChevronRight, Wallet, ShieldCheck, CreditCard 
} from 'lucide-react'; 

async function GetFooterAboutText() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
  try {
    let response = await fetch(`${API_URL}/api/settings/aboutus/`, {
      next: { revalidate: 3600 }
    });
    if (!response.ok) return '';
    const result = await response.json();
    return result.description || result[0]?.description || '';
  } catch (error) {
    console.error('Error loading footer text:', error);
    return '';
  }
}

const Footer = async () => {
  const aboutText = await GetFooterAboutText();

  return (
    <footer className="w-full bg-gradient-to-b from-deep-navy overflow-hidden to-backegound-navy text-slate-200 pt-16 pb-8 px-4 md:px-8 border-t border-white/[0.03]">
      <div className="2xl:container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-12">
        
        {/* ستون اول: درباره ما */}
        <div className="space-y-5 flex flex-col">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black tracking-tight text-white font-montserrat bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              NabBazaar
            </span>
          </div>
          <p className="text-xs md:text-[13px] text-slate-400 leading-6 font-inter text-justify max-w-xs line-clamp-6 opacity-90">
            {aboutText || "NabBazaar is your premier destination for high-quality products, ensuring seamless software solutions and trading convenience across the region."}
          </p>
          <Social />
        </div>

        {/* ستون دوم: لینک‌های سریع */}
        <div className="space-y-5 font-montserrat flex flex-col">
          <h3 className="text-sm font-bold tracking-wider text-white uppercase relative after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:w-8 after:h-[2px] after:bg-blue-500">
            Quick Links
          </h3>
          <ul className="space-y-2.5 text-xs md:text-sm text-slate-400 capitalize">
            {[
              { name: 'About Us', href: '/about-us' },
              { name: 'App Products', href: '/shop' },
              { name: 'Best Sellers', href: '/best-sellers' },
              { name: 'New Arrivals', href: '/new-arrivals' },
              { name: 'Deals', href: '/deals' },
              { name: 'Blog', href: '/blog' }
            ].map((link) => (
              <li key={link.name}>
                <Link href={link.href} className="hover:text-blue-400 flex items-center gap-1 transition-all duration-200 hover:translate-x-1 group py-0.5">
                  <ChevronRight className="w-3.5 h-3.5 text-blue-500/50 group-hover:text-blue-400 transition-colors" />
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* ستون سوم: خدمات مشتریان */}
        <div className="space-y-5 font-montserrat flex flex-col">
          <h3 className="text-sm font-bold tracking-wider text-white uppercase relative after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:w-8 after:h-[2px] after:bg-blue-500">
            Customer Services
          </h3>
          <ul className="space-y-2.5 text-xs md:text-sm text-slate-400">
            {[
              { name: 'Contact Us', href: '/contact' },
              { name: 'Track Your Order', href: '/orders' },
              { name: 'Returns & Refund', href: '/ReturnPolicy' },
              { name: 'Terms & Conditions', href: '/Terms_$_Conditions' },
              { name: 'FAQs', href: '/faq' }
            ].map((link) => (
              <li key={link.name}>
                <Link href={link.href} className="hover:text-blue-400 flex items-center gap-1 transition-all duration-200 hover:translate-x-1 group py-0.5">
                  <ChevronRight className="w-3.5 h-3.5 text-blue-500/50 group-hover:text-blue-400 transition-colors" />
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* ستون چهارم: اطلاعات تماس */}
        <div className="space-y-5 font-montserrat flex flex-col">
          <h3 className="text-sm font-bold tracking-wider text-white uppercase relative after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:w-8 after:h-[2px] after:bg-blue-500">
            Contact Info
          </h3>
          <ul className="space-y-3.5 text-xs md:text-sm text-slate-400 font-inter">
            <li className="flex items-center gap-3 group">
              <div className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.05] group-hover:bg-blue-500/10 group-hover:border-blue-500/30 transition-all">
                <MapPin className="w-4 h-4 text-blue-400" />
              </div>
              <span>Kabul, Afghanistan</span>
            </li>
            <li className="flex items-center gap-3 group">
              <div className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.05] group-hover:bg-blue-500/10 group-hover:border-blue-500/30 transition-all">
                <Phone className="w-4 h-4 text-blue-400" />
              </div>
              <span dir="ltr">+93 78 800 1919</span>
            </li>
            <li className="flex items-center gap-3 group">
              <div className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.05] group-hover:bg-blue-500/10 group-hover:border-blue-500/30 transition-all">
                <Mail className="w-4 h-4 text-blue-400" />
              </div>
              <span className="lowercase">support@nabbazaar.com</span>
            </li>
            <li className="flex items-center gap-3 group">
              <div className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.05] group-hover:bg-blue-500/10 group-hover:border-blue-500/30 transition-all">
                <Clock className="w-4 h-4 text-blue-400" />
              </div>
              <span>24/7 Support Available</span>
            </li>
          </ul>
        </div>
      </div>

      {/* ======================================================== */}
      {/* بخش بنر میانی ویژگی‌های پرداخت (Premium Trust Badges) */}
      {/* ======================================================== */}
      <div className="2xl:container mx-auto border-t border-b border-white/[0.08]  py-6 bg-white/[0.01] backdrop-blur-sm rounded-xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-left">
          
          {/* کارت ویژگی اول */}
          <div className="flex flex-col sm:flex-row items-center gap-4 px-4 justify-center md:justify-start">
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-emerald-400 shadow-inner">
              <Wallet className="w-8 h-8" />
            </div>
            <div>
              <h4 className="font-montserrat font-bold text-base text-white">Cash on Delivery</h4>
              <p className="text-slate-400 text-xs mt-1">Pay comfortably when your package arrives</p>
            </div>
          </div>

          {/* کارت ویژگی دوم: درگاه پذیرش پرداخت الکترونیک */}
          <div className="flex flex-col items-center justify-center border-y md:border-y-0 md:border-x border-white/[0.08] py-4 md:py-0 px-2 relative">
            <div className="flex items-center gap-2 mb-1.5">
              <CreditCard className="w-4 h-4 text-amber-400" />
              <h4 className="font-montserrat font-bold text-base text-white">Online Gateways</h4>
            </div>
            {/* تصویر کارت فرضی به همراه برچسب شکیل Soon چسبیده به آن */}
            <div className="relative flex items-center justify-center">
              <img src="/images/hp-card.webp" className="h-10 opacity-40 mix-blend-lighten object-contain grayscale" alt="Payment Cards" />
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-amber-500/20 border border-amber-500/40 text-amber-400 font-bold font-inter text-[10px] px-2 py-0.5 rounded shadow backdrop-blur-md tracking-wider uppercase animate-pulse">
                Coming Soon
              </span>
            </div>
          </div>

          {/* کارت ویژگی سوم */}
          <div className="flex flex-col sm:flex-row items-center gap-4 px-4 justify-center md:justify-end">
            <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-2xl text-blue-400 shadow-inner">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div className="md:text-left text-center">
              <h4 className="font-montserrat font-bold text-base text-white">100% Secure Payments</h4>
              <p className="text-slate-400 text-xs mt-1">Advanced encrypted layers keeping data safe</p>
            </div>
          </div>

        </div>
      </div>

      {/* بخش کپی رایت پایینی سند */}
      <div className="2xl:max-w-6xl mx-auto pt-4 text-xs font-inter text-slate-500 text-center tracking-wide">
        <p>© 2026 NabBazaar. All rights reserved. Built for professional trade experience.</p>
      </div>
    </footer>
  );
};

export default Footer;
