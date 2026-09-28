'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

import { 
    FaFacebookF, 
    FaInstagram, 
    FaTelegramPlane, 
    FaWhatsapp, 
    FaEnvelope, 
    FaMapMarkerAlt 
} from 'react-icons/fa'

const Social = () => {
    const [social, setSocial] = useState([])

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/settings/contact/info/')
        .then(res => res.json())
        .then(data => setSocial(data))
        .catch(err => console.error("Error fetching social data:", err))
    }, [])

    return (
        <div className="w-full max-w-4xl mx-auto py-1 px-4">
            {social.map((item) => {
                const socialLinks = [
                    { id: 'fb', href: item.facebook, icon: <FaFacebookF size={22} />, color: 'hover:bg-blue-600 hover:text-white', label: 'Facebook' },
                    { id: 'ig', href: item.instagram, icon: <FaInstagram size={22} />, color: 'hover:bg-gradient-to-tr hover:from-yellow-500 hover:to-purple-600 hover:text-white', label: 'Instagram' },
                    { id: 'tg', href: `https://t.me{item.telegram}`, icon: <FaTelegramPlane size={22} />, color: 'hover:bg-sky-500 hover:text-white', label: 'Telegram' },
                    { id: 'wa', href: `https://wa.me{item.whatsapp}`, icon: <FaWhatsapp size={22} />, color: 'hover:bg-green-500 hover:text-white', label: 'WhatsApp' }
                ];

                return (
                    <div key={item.id} className="flex flex-col items-center gap-6">
                        <div className="flex flex-wrap justify-center gap-4">
                            {socialLinks.map((link) => {
                                if (!link.href) return null;

                                return (
                                    <Link
                                        key={link.id}
                                        href={link.href}
                                        target={link.id !== 'mail' ? "_blank" : undefined}
                                        rel="noopener noreferrer"
                                        aria-label={link.label}
                                        className={`group relative flex items-center justify-center w-9 h-9 rounded-2xl bg-gray-50 text-gray-600 border border-gray-200/80 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-lg ${link.color}`}
                                    >
                                        <span className="absolute inset-0 w-full h-full rounded-2xl bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                                        
                                        <div className="transition-transform duration-300 group-hover:scale-110">
                                            {link.icon}
                                        </div>

                                        <span className="absolute -top-10 scale-0 transition-all duration-200 rounded bg-gray-900 px-2 py-1 text-xs text-white group-hover:scale-100 z-10 font-medium">
                                            {link.label}
                                        </span>
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Social
