"use client";
import React, { useState } from 'react';
import { User, Phone, Mail, FileText, Send, Loader2 } from 'lucide-react';
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone_number: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMsg({ type: '', text: '' });

    // Client-side validation matching your Django 07xx Afghanistan model regex
    const afghanPhoneRegex = /^07\d{8}$/;
    if (!afghanPhoneRegex.test(formData.phone_number)) {
      setStatusMsg({ type: 'error', text: 'Invalid Afghanistan phone number. Must start with 07 and be 10 digits long.' });
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/settings/contact/send/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok) {
        setStatusMsg({ type: 'success', text: 'Message sent! Check your inbox, management has been alerted.' });
        setFormData({ name: '', phone_number: '', email: '', subject: '', message: '' });
      } else {
        // Collect server side keys errors to report them cleanly to client
        const errorDetail = Object.values(result).flat().join(' ');
        setStatusMsg({ type: 'error', text: errorDetail || 'Failed to submit form entries.' });
      }
    } catch (error) {
      console.error("Transmission error:", error);
      setStatusMsg({ type: 'error', text: 'Connection to server failed. Please try again later.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full max-w-2xl mx-auto p-8  border border-[var(--color-deep-navy)] rounded-2xl shadow-xs font-sans text-left">
      <div className="mb-8">
        <h2 className="text-2xl font-bold tracking-tight font-montserrat">Drop us a Line</h2>
        <p className="text-sm mt-1 font-inter">Your queries will instantly ping our support team inbox.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Row Form Layout: Name and Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="relative flex items-center bg-backegound-navy border border-deep-navy rounded-xl px-4 py-3 group focus-within:border-primary-blue transition-colors">
            <User size={18} className="text-metallic-silver/50 group-focus-within:text-highlight mr-3" />
            <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full font-montserrat bg-transparent text-white border-0 outline-hidden text-sm" placeholder="Full Name" />
          </div>

          <div className="relative flex items-center bg-[var(--color-backegound-navy)] border border-[var(--color-deep-navy)] rounded-xl px-4 py-3 group focus-within:border-[var(--color-primary-blue)] transition-colors">
            <Phone size={18} className="text-[var(--color-metallic-silver)]/50 group-focus-within:text-[var(--color-highlight)] mr-3" />
            <input required type="tel" name="phone_number" value={formData.phone_number} onChange={handleChange} className="w-full font-montserrat bg-transparent text-white border-0 outline-hidden text-sm" placeholder="Phone Number (07xxxxxxxx)" />
          </div>
        </div>

        {/* Email Address */}
        <div className="relative flex items-center bg-[var(--color-backegound-navy)] border border-[var(--color-deep-navy)] rounded-xl px-4 py-3 group focus-within:border-[var(--color-primary-blue)] transition-colors">
          <Mail size={18} className="text-[var(--color-metallic-silver)]/50 group-focus-within:text-[var(--color-highlight)] mr-3" />
          <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full font-montserrat bg-transparent text-white border-0 outline-hidden text-sm" placeholder="Email Address" />
        </div>

        {/* Subject Header */}
        <div className="relative flex items-center bg-[var(--color-backegound-navy)] border border-[var(--color-deep-navy)] rounded-xl px-4 py-3 group focus-within:border-[var(--color-primary-blue)] transition-colors">
          <FileText size={18} className="text-[var(--color-metallic-silver)]/50 group-focus-within:text-[var(--color-highlight)] mr-3" />
          <input required type="text" name="subject" value={formData.subject} onChange={handleChange} className="w-full font-montserrat bg-transparent text-white border-0 outline-hidden text-sm" placeholder="Message Subject" />
        </div>

        {/* Large Text Area Content Box */}
        <div className="relative bg-[var(--color-backegound-navy)] border border-[var(--color-deep-navy)] rounded-xl px-4 py-3 focus-within:border-[var(--color-primary-blue)] transition-colors">
          <textarea required name="message" value={formData.message} onChange={handleChange} rows={5} className="w-full font-montserrat bg-transparent text-white border-0 outline-hidden text-sm resize-none" placeholder="Type your extensive message details here..." />
        </div>

        {/* Dynamic Context Status Report Message */}
        {statusMsg.text && (
          <div className={`p-4 rounded-xl text-sm border font-medium ${statusMsg.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-[var(--color-accent-red)]/10  border-[var(--color-accent-red)]/30 text-[var(--color-accent-red)]'}`}>
            {statusMsg.text}
          </div>
        )}

        {/* Interactive Action Submission Button Control */}
        <button type="submit" disabled={loading} className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[var(--color-primary-blue)] hover:bg-[var(--color-primary-blue)]/90 disabled:bg-gray-700 text-white font-semibold text-sm px-6 py-3.5 rounded-xl cursor-pointer font-montserrat shadow-xs transition-all duration-200">
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Processing Dispatches...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              Submit & Alert Admin
            </>
          )}
        </button>
      </form>
    </section>
  );
}
