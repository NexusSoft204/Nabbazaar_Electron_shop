import React from 'react';
import { Phone, MessageSquare, Mail, Clock, MapPin } from 'lucide-react';
import ContactForm from './ContactForm'; 

// const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";


if (!process.env.NEXT_PUBLIC_API_URL) {
  throw new Error("NEXT_PUBLIC_API_URL is not configured");
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function fetchContactInfo() {
  try {
    const res = await fetch(`${API_URL}/api/settings/contact/info/`, {
      cache: "no-store",
    });
    
    if (!res.ok) return null;
    
    const data = await res.json();

    if (Array.isArray(data)) {
      return data.length > 0 ? data[0] : null;
    } else if (data && Array.isArray(data.results)) {
      return data.results.length > 0 ? data.results[0] : null;
    }
    
    return data; 
  } catch (error) {
    console.error("Failed to load server contact settings:", error);
    return null;
  }
}

export default async function ContactPage() {
  const info = await fetchContactInfo();

  if (!info) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <p className="animate-pulse">Loading localized communications configuration matrix...</p>
      </div>
    );
  }

  const contactCards = [
    {
      id: 1,
      title: "WhatsApp Channel",
      value: info.whatsapp,
      link: `https://wa.me{info.whatsapp.replace(/[^0-9]/g, '')}`,
      icon: <Phone size={20} className="text-emerald-400" />,
      bgTheme: "bg-emerald-500/5 border-emerald-500/10 hover:border-emerald-500/30"
    },
    {
      id: 2,
      title: "Telegram Support",
      value: info.telegram,
      link: info.telegram.startsWith('http') ? info.telegram : `https://t.me{info.telegram.replace('@', '')}`,
      icon: <MessageSquare size={20} className="text-blue-400" />,
      bgTheme: "bg-blue-500/5 border-blue-500/10 hover:border-blue-500/30"
    },
    {
      id: 3,
      title: "Instagram",
      value: info.instagram,
      link: info.instagram.startsWith('http') ? info.instagram : `https://instagram.com{info.instagram}`,
      icon: (
        <svg className="w-5 h-5 text-pink-400" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      ),
      bgTheme: "bg-pink-500/5 border-pink-500/10 hover:border-pink-500/30"
    },
    {
      id: 4,
      title: "Facebook Business",
      value: info.facebook,
      link: info.facebook,
      icon: (
        <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
        </svg>
      ),
      bgTheme: "bg-blue-600/5 border-blue-600/10 hover:border-blue-600/30"
    }
  ];

  return (
    <main className="w-full min-h-screen py-16 font-sans text-left">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="text-center space-y-3 max-w-xl mx-auto mb-16">
          <h1 className="text-3xl sm:text-5xl font-montserrat font-extrabold tracking-tight text-white">
            Connect With <span className="text-highlight">ElectroShop</span>
          </h1>
          <p className="text-[var(--color-metallic-silver)] text-sm sm:text-base leading-relaxed">
            Have questions about products, deployments, or localized delivery? Reach out via our social hotlines or drop a line below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <div className="lg:col-span-5 space-y-6">
            <div className=" border border-[var(--color-deep-navy)] p-6 rounded-2xl space-y-5">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[var(--color-deep-navy)] rounded-xl text-[var(--color-highlight)] shrink-0">
                  <MapPin size={22} />
                </div>
                <div>
                  <h4 className="text-sm font-bold uppercase font-montserrat tracking-wider">Our Store Address</h4>
                  <p className="text-base font-inter mt-1 leading-relaxed">{info.address}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 pt-4 border-t border-[var(--color-deep-navy)]/40">
                <div className="p-3 bg-[var(--color-deep-navy)] rounded-xl text-[var(--color-primary-blue)] shrink-0">
                  <Mail size={22} />
                </div>
                <div>
                  <h4 className="text-sm font-bold uppercase font-montserrat tracking-wider">Email Inquiry</h4>
                  <a href={`mailto:${info.email}`} className="text-base text-gray-600 font-inter hover:text-highlight transition-colors mt-0.5 block">{info.email}</a>
                </div>
              </div>

              <div className="flex items-center gap-4 pt-4 border-t border-deep-navy/40">
                <div className="p-3 bg-deep-navy rounded-xl text-amber-400 shrink-0">
                  <Clock size={22} />
                </div>
                <div>
                  <h4 className="text-sm font-bold uppercase font-montserrat tracking-wider">Business Operating Hours</h4>
                  <p className="text-base text-gray-600 font-inter mt-0.5">{info.working_hours}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactCards.map((card) => (
                <a 
                  key={card.id}
                  href={card.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-5 border rounded-2xl flex flex-col items-start gap-3 transition-all duration-300 transform hover:-translate-y-1 ${card.bgTheme}`}
                >
                  <div className="p-2 bg-backegound-navy rounded-xl shadow-xs border border-deep-navy/40">
                    {card.icon}
                  </div>
                  <div>
                    <h5 className="text-[10px] font-bold  font-montserrat uppercase tracking-wider">{card.title}</h5>
                  
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <ContactForm />
          </div>

        </div>

        {info.google_map_link && (
          <div className="mt-16 w-full h-[400px] rounded-3xl overflow-hidden border border-[var(--color-deep-navy)] shadow-md bg-[var(--color-deep-navy)]/10">
            <iframe
              src={info.google_map_link}
              className="w-full h-full border-0 grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
              loading="lazy"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        )}

      </div>
    </main>
  );
}
