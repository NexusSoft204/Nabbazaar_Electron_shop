"use client";

import React, { useState } from "react";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  Loader2,
  LogIn,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";

export default function Login() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setErrorMsg("");

    try {
      const API_URL =
        process.env.NEXT_PUBLIC_API_URL ||
        "http://127.0.0.1:8000";

      const res = await fetch(`${API_URL}/api/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: credentials.username,
          password: credentials.password,
          remember_me: rememberMe,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        document.cookie = `auth_token=${data.token}; max-age=604800; path=/; SameSite=Lax`
        window.location.href = "/cart";
        
      } else {
        setErrorMsg(
          data.detail ||
            "Invalid login credentials. Please check your username and password."
        );
      }
    } catch (error) {
      console.error("Authentication error:", error);

      setErrorMsg(
        "Unable to connect to the authentication server. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen w-full bg-[#F7F8F9] flex items-center justify-center px-4 py-10 sm:py-14 font-sans">
      
      {/* Main Wrapper */}
      <div className="w-full max-w-md">

        {/* Brand Header */}
        <div className="text-center mb-7">

          {/* Logo */}
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
            <ShieldCheck
              size={27}
              strokeWidth={2}
            />
          </div>

          {/* Brand */}
          <h1 className="text-2xl sm:text-3xl font-black text-[#03215B] tracking-tight">
            NabBazaar
          </h1>

          <p className="text-sm text-slate-500 mt-2">
            Sign in to your account
          </p>

        </div>

        {/* Login Card */}
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

          {/* Top Gradient Line */}
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

          {/* Login Form */}
          <form
            onSubmit={handleLoginSubmit}
            className="space-y-5"
          >

            {/* Username / Email */}
            <div className="space-y-2">

              <label
                htmlFor="username"
                className="block text-sm font-bold text-slate-700"
              >
                Email / Username
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
                  className="
                    text-slate-400
                    shrink-0
                    mr-3
                  "
                />

                <input
                  id="username"
                  required
                  type="text"
                  name="username"
                  value={credentials.username}
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
                  placeholder="Enter your username"
                />

              </div>

            </div>

            {/* Password */}
            <div className="space-y-2">

              <label
                htmlFor="password"
                className="block text-sm font-bold text-slate-700"
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
                  className="
                    text-slate-400
                    shrink-0
                    mr-3
                  "
                />

                <input
                  id="password"
                  required
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                  autoComplete="current-password"
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
                  placeholder="Enter your password"
                />

                {/* Show / Hide */}
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
                    cursor-pointer
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

            {/* Remember + Forgot Password */}
            <div className="flex items-center justify-between gap-4 text-sm">

              {/* Remember */}
              <label
                htmlFor="remember"
                className="
                  flex
                  items-center
                  gap-2
                  text-slate-500
                  select-none
                  cursor-pointer
                "
              >

                <input
                  id="remember"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) =>
                    setRememberMe(e.target.checked)
                  }
                  className="
                    w-4
                    h-4
                    rounded
                    border-slate-300
                    text-[#045FF8]
                    focus:ring-[#045FF8]
                    cursor-pointer
                  "
                />

                <span>
                  Remember me
                </span>

              </label>

              {/* Forgot Password */}
              <Link
                href="/forgot-password"
                className="
                  font-semibold
                  text-[#045FF8]
                  hover:text-blue-700
                  transition-colors
                  whitespace-nowrap
                "
              >
                Forgot password?
              </Link>

            </div>

            {/* Error Message */}
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

                <AlertCircle
                  size={18}
                  className="shrink-0 mt-0.5"
                />

                <span>
                  {errorMsg}
                </span>

              </div>
            )}

            {/* Login Button */}
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
              "
            >

              {loading ? (
                <>
                  <Loader2
                    className="w-5 h-5 animate-spin"
                  />

                  Signing In...
                </>
              ) : (
                <>
                  <LogIn size={18} />

                  Sign In
                </>
              )}

            </button>

          </form>

          {/* Register Section */}
          <div
            className="
              mt-7
              pt-5
              border-t
              border-slate-100
              text-center
            "
          >

            <p className="text-sm text-slate-500">

              Don't have an account?

              <Link
                href="/register"
                className="
                  ml-1.5
                  font-bold
                  text-[#045FF8]
                  hover:text-blue-700
                  transition-colors
                "
              >
                Create Account
              </Link>

            </p>

          </div>

          {/* Security Footer */}
          <div className="mt-5 text-center">

            <p
              className="
                text-[11px]
                text-slate-400
                uppercase
                tracking-[0.18em]
              "
            >
              Secure & Trusted Shopping
            </p>

          </div>

        </div>

        {/* Copyright */}
        <p className="text-center text-xs text-slate-400 mt-6">
          © {new Date().getFullYear()} NabBazaar. All rights reserved.
        </p>

      </div>

    </main>
  );
}