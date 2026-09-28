"use client";

import React, { useState } from "react";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ShieldAlert,
  Loader2,
  UserPlus,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    // Password confirmation
    if (formData.password !== formData.confirm_password) {
      setErrorMsg(
        "Password confirmation mismatch. Both passwords must be identical."
      );

      setLoading(false);
      return;
    }

    try {
      const API_URL =
        process.env.NEXT_PUBLIC_API_URL ||
        "http://127.0.0.1:8000";

      const res = await fetch(`${API_URL}/api/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccessMsg(
          "Account created successfully! Redirecting to login..."
        );

        setFormData({
          username: "",
          email: "",
          password: "",
          confirm_password: "",
        });

        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      } else {
        const errorDetail = Object.values(data)
          .flat()
          .join(" ");

        setErrorMsg(
          errorDetail ||
            "Registration failed. Username or email may already be registered."
        );
      }
    } catch (error) {
      console.error("Network registration error:", error);

      setErrorMsg(
        "Unable to connect to the server. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen w-full bg-[#F7F8F9] flex items-center justify-center px-4 py-10 sm:py-14 font-sans">

      {/* Main Container */}
      <div className="w-full max-w-md">

        {/* Brand */}
        <div className="text-center mb-7">

          <div
            className="
              w-14
              h-14
              mx-auto
              rounded-2xl
              bg-[#045FF8]
              flex
              items-center
              justify-center
              text-white
              shadow-lg
              shadow-blue-500/20
              mb-4
            "
          >
            <UserPlus size={25} strokeWidth={2} />
          </div>

          <h1 className="text-2xl font-montserrat sm:text-3xl font-black text-[#03215B] tracking-tight">
            Create Your Account
          </h1>

          <p className="text-sm text-slate-500 mt-2 font-inter">
            Join NabBazaar and start shopping today.
          </p>

        </div>

        {/* Register Card */}
        <div
          className="
            relative
            bg-white
            border
            border-slate-200
            rounded-3xl
            shadow-xl
            shadow-slate-200/50
            p-6
            sm:p-8
            overflow-hidden
          "
        >

          {/* Top Accent */}
          <div
            className="
              absolute
              top-0
              left-0
              right-0
              h-1
              bg-gradient-to-r
              from-[#045FF8]
              via-[#0AE0FC]
              to-[#FF253A]
            "
          />

          {/* Form */}
          <form
            onSubmit={handleRegisterSubmit}
            className="space-y-5"
          >

            {/* Username */}
            <div className="space-y-2">

              <label
                htmlFor="username"
                className="block font-montserrat text-sm font-bold text-slate-700"
              >
                Username
              </label>

              <div
                className="
                  relative
                  flex
                  font-inter
                  items-center
                  bg-[#F8FAFC]
                  border
                  border-slate-200
                  rounded-xl
                  px-4
                  transition-all
                  focus-within:bg-white
                  focus-within:border-[#045FF8]
                  focus-within:ring-4
                  focus-within:ring-blue-500/10
                "
              >

                <User
                  size={18}
                  className="text-slate-400 shrink-0 mr-3"
                />

                <input
                  id="username"
                  required
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  autoComplete="username"
                  className="
                    w-full
                    bg-transparent
                    text-slate-900
                    border-0
                    outline-none
                    py-3.5
                    text-sm
                    placeholder:text-slate-400
                  "
                  placeholder="Choose a username"
                />

              </div>

            </div>

            {/* Email */}
            <div className="space-y-2">

              <label
                htmlFor="email"
                className="block font-montserrat text-sm font-bold text-slate-700"
              >
                Email Address
              </label>

              <div
                className="
                  relative
                  flex
                  items-center
                  bg-[#F8FAFC]
                  border
                  border-slate-200
                  rounded-xl
                  px-4
                  transition-all
                  focus-within:bg-white
                  focus-within:border-[#045FF8]
                  focus-within:ring-4
                  focus-within:ring-blue-500/10
                "
              >

                <Mail
                  size={18}
                  className="text-slate-400 shrink-0 mr-3"
                />

                <input
                  id="email"
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  className="
                    w-full
                    font-inter
                    bg-transparent
                    text-slate-900
                    border-0
                    outline-none
                    py-3.5
                    text-sm
                    placeholder:text-slate-400
                  "
                  placeholder="Enter your email address"
                />

              </div>

            </div>

            {/* Password */}
            <div className="space-y-2">

              <label
                htmlFor="password"
                className="block font-montserrat text-sm font-bold text-slate-700"
              >
                Password
              </label>

              <div
                className="
                  relative
                  flex
                  items-center
                  bg-[#F8FAFC]
                  border
                  border-slate-200
                  font-inter
                  rounded-xl
                  px-4
                  transition-all
                  focus-within:bg-white
                  focus-within:border-[#045FF8]
                  focus-within:ring-4
                  focus-within:ring-blue-500/10
                "
              >

                <Lock
                  size={18}
                  className="text-slate-400 shrink-0 mr-3"
                />

                <input
                  id="password"
                  required
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                  className="
                    w-full
                    bg-transparent
                    text-slate-900
                    border-0
                    outline-none
                    py-3.5
                    pr-10
                    text-sm
                    placeholder:text-slate-400
                  "
                  placeholder="Minimum 8 characters"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                  className="
                    absolute
                    right-4
                    text-slate-400
                    hover:text-[#045FF8]
                    transition-colors
                  "
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>

              </div>

            </div>

            {/* Confirm Password */}
            <div className="space-y-2">

              <label
                htmlFor="confirm_password"
                className="block text-sm font-montserrat font-bold text-slate-700"
              >
                Confirm Password
              </label>

              <div
                className="
                  relative
                  flex
                  items-center
                  bg-[#F8FAFC]
                  border
                  border-slate-200
                  font-inter
                  rounded-xl
                  px-4
                  transition-all
                  focus-within:bg-white
                  focus-within:border-[#045FF8]
                  focus-within:ring-4
                  focus-within:ring-blue-500/10
                "
              >

                <Lock
                  size={18}
                  className="text-slate-400 shrink-0 mr-3"
                />

                <input
                  id="confirm_password"
                  required
                  type={showPassword ? "text" : "password"}
                  name="confirm_password"
                  value={formData.confirm_password}
                  onChange={handleChange}
                  autoComplete="new-password"
                  className="
                    w-full
                    bg-transparent
                    text-slate-900
                    border-0
                    outline-none
                    py-3.5
                    pr-10
                    text-sm
                    placeholder:text-slate-400
                  "
                  placeholder="Repeat your password"
                />

              </div>

            </div>

            {/* Login Link */}
            <div className="text-sm text-center pt-1">

              <span className="text-slate-500 font-inter">
                Already have an account?
              </span>

              <Link
                href="/login"
                className="
                  ml-1.5
                  font-bold
                  text-[#045FF8]
                  hover:text-blue-700
                  transition-colors
                "
              >
                Sign In
              </Link>

            </div>

            {/* Error */}
            {errorMsg && (
              <div
                className="
                  p-4
                  bg-red-50
                  border
                  border-red-100
                  rounded-xl
                  text-sm
                  font-medium
                  text-red-600
                  flex
                  items-start
                  gap-3
                "
              >
                <ShieldAlert
                  size={18}
                  className="shrink-0 mt-0.5"
                />

                <span>
                  {errorMsg}
                </span>
              </div>
            )}

            {/* Success */}
            {successMsg && (
              <div
                className="
                  p-4
                  bg-emerald-50
                  border
                  border-emerald-100
                  rounded-xl
                  text-sm
                  font-medium
                  text-emerald-700
                  flex
                  items-start
                  gap-3
                "
              >
                <CheckCircle2
                  size={18}
                  className="shrink-0 mt-0.5"
                />

                <span>
                  {successMsg}
                </span>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                h-14
                inline-flex
                items-center
                justify-center
                gap-2
                bg-[#045FF8]
                hover:bg-[#034FCC]
                text-white
                font-bold
                text-sm
                rounded-xl
                shadow-lg
                shadow-blue-600/20
                hover:shadow-xl
                hover:shadow-blue-600/25
                transition-all
                active:scale-[0.99]
                disabled:bg-slate-300
                disabled:shadow-none
                disabled:cursor-not-allowed
                font-montserrat
              "
            >

              {loading ? (
                <>
                  <Loader2
                    className="w-5 h-5  animate-spin"
                  />

                  Creating Account...
                </>
              ) : (
                <>
                  <UserPlus size={18} />

                  Create Account
                </>
              )}

            </button>

          </form>

          {/* Footer */}
          <div className="mt-7 pt-5 border-t border-slate-100 text-center">

            <p className="text-[11px] font-inter text-slate-400 uppercase tracking-[0.18em]">
              Secure & Trusted Shopping
            </p>

          </div>

        </div>

        {/* Bottom */}
        <p className="text-center text-xs font-inter text-slate-400 mt-6">
          © {new Date().getFullYear()} NabBazaar. All rights reserved.
        </p>

      </div>
    </main>
  );
}