'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// ۲. کل کد اصلی شما به این کامپوننت داخلی منتقل شد
function PasswordResetConfirmContent() {
  const searchParams = useSearchParams();
  const uid = searchParams.get('uid');
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setIsSuccess(false);
      setMessage("Passwords do not match.");
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      const res = await fetch(`${API_URL}/api/auth/password/reset/confirm/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          uid: uid,
          token: token,
          new_password1: password,
          new_password2: confirmPassword
        }),
      });

      if (res.ok) {
        setIsSuccess(true);
        setMessage('Your password has been reset successfully. You can now log in.');
      } else {
        setIsSuccess(false);
        setMessage('The link has expired or the provided information is invalid.');
      }
    } catch (err) {
      setIsSuccess(false);
      setMessage('Failed to connect to the server. Check your connection.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 px-4">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl shadow-slate-200/80 border border-slate-100 transition-all">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">
            Reset Your Password
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Please enter your new password below to secure your account.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* New Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-slate-700 mb-2">
              New Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 pr-12 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-left placeholder:text-slate-300 text-slate-800"
                required
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-medium px-2 py-1 rounded cursor-pointer"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          {/* Confirm Password Field */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-semibold text-slate-700 mb-2">
              Confirm New Password
            </label>
            <input
              id="confirmPassword"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-left placeholder:text-slate-300 text-slate-800"
              required
              disabled={isLoading}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full p-3 text-white font-medium bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 rounded-xl transition-colors shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Updating password...</span>
              </>
            ) : (
              'Reset Password'
            )}
          </button>
        </form>

        {/* Status Messages */}
        {message && (
          <div className={`mt-6 p-4 rounded-xl text-sm border text-center transition-all ${
            isSuccess 
              ? 'bg-emerald-50 border-emerald-100 text-emerald-700' 
              : 'bg-rose-50 border-rose-100 text-rose-700'
          }`}>
            {message}
          </div>
        )}

        {/* Redirect / Info Link */}
        {isSuccess && (
          <div className="mt-8 text-center animate-pulse">
            <a href="/login" className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors inline-flex items-center gap-1.5">
              Proceed to Sign In
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        )}

      </div>
    </div>
  );
}

// # ۳. خروجی اصلی و پیش‌فرض صفحه که کدهای بالا را درون لایه حفاظتی قرار می‌دهد
export default function PasswordResetConfirm() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="text-slate-500 font-medium">Loading recovery form...</div>
      </div>
    }>
      <PasswordResetConfirmContent />
    </Suspense>
  );
}
