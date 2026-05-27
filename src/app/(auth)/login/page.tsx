"use client";

import { useState } from "react";
import Link from "next/link";
import { Baby, Eye, EyeOff, Mail, Lock, ArrowRight, Sparkles } from "lucide-react";

export default function LoginPage() {
  const [showPw, setShowPw] = useState(false);

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#1a1a2e] via-[#2d2458] to-[#7c6af7] relative overflow-hidden flex-col justify-between p-12">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 30% 50%, white 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div className="relative">
          <Link href="/" className="flex items-center gap-2.5 text-white">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
              <Baby className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl">nurtura</span>
          </Link>
        </div>
        <div className="relative">
          <div className="mb-8 space-y-4">
            {[
              { icon: "🥗", text: "AI-generated meal plans adapted weekly to your baby's growth" },
              { icon: "💉", text: "Never miss a vaccination with smart reminders" },
              { icon: "📈", text: "WHO-standard growth charts with personalized AI insights" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 text-white/80">
                <span className="text-xl flex-shrink-0">{item.icon}</span>
                <p className="text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
          <blockquote className="border-l-2 border-white/30 pl-4">
            <p className="text-white/80 text-sm italic">&ldquo;Nurtura feels like having a pediatric nutritionist and doctor available 24/7. It&apos;s genuinely changed how confident I feel as a parent.&rdquo;</p>
            <p className="text-white/60 text-xs mt-2">— Rebecca K., mom of two</p>
          </blockquote>
        </div>
        <div className="relative flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white/70" />
          </div>
          <p className="text-white/50 text-xs">HIPAA-ready · GDPR compliant · AES-256 encrypted</p>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6 bg-[#fafaf8]">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <Link href="/" className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#7c6af7] to-[#e879a8] flex items-center justify-center">
              <Baby className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg text-[#1a1a2e]">nurtura</span>
          </Link>

          <h1 className="text-2xl font-extrabold text-[#1a1a2e] mb-1">Welcome back</h1>
          <p className="text-sm text-[#737373] mb-8">Sign in to continue to your family dashboard</p>

          {/* Social login */}
          <div className="space-y-3 mb-6">
            <button className="w-full flex items-center justify-center gap-3 h-11 rounded-xl border border-[#e8e8e0] bg-white text-sm font-medium text-[#1a1a2e] hover:bg-[#f5f5f0] transition-all">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>
            <button className="w-full flex items-center justify-center gap-3 h-11 rounded-xl border border-[#e8e8e0] bg-white text-sm font-medium text-[#1a1a2e] hover:bg-[#f5f5f0] transition-all">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"/>
              </svg>
              Continue with Apple
            </button>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-[#e8e8e0]" />
            <span className="text-xs text-[#a0a0b8]">or sign in with email</span>
            <div className="flex-1 h-px bg-[#e8e8e0]" />
          </div>

          {/* Form */}
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-[#1a1a2e]">Email address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a0a0b8]" />
                <input
                  type="email"
                  defaultValue="sarah@example.com"
                  className="w-full h-11 rounded-xl bg-[#f5f5f0] border border-transparent pl-10 pr-4 text-sm text-[#1a1a2e] focus:outline-none focus:bg-white focus:border-[#7c6af7] focus:ring-2 focus:ring-[#7c6af7]/15 transition-all"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-[#1a1a2e]">Password</label>
                <a href="#" className="text-xs text-[#7c6af7] hover:underline">Forgot password?</a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a0a0b8]" />
                <input
                  type={showPw ? "text" : "password"}
                  defaultValue="password"
                  className="w-full h-11 rounded-xl bg-[#f5f5f0] border border-transparent pl-10 pr-10 text-sm text-[#1a1a2e] focus:outline-none focus:bg-white focus:border-[#7c6af7] focus:ring-2 focus:ring-[#7c6af7]/15 transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#a0a0b8] hover:text-[#737373]"
                >
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded accent-[#7c6af7]" defaultChecked />
              <span className="text-sm text-[#737373]">Keep me signed in for 30 days</span>
            </label>

            <Link
              href="/dashboard"
              className="w-full flex items-center justify-center gap-2 h-11 rounded-xl bg-[#7c6af7] text-white font-semibold text-sm hover:bg-[#6a58e5] transition-all shadow-sm shadow-[#7c6af7]/20"
            >
              Sign in <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <p className="text-sm text-center text-[#737373] mt-6">
            New to Nurtura?{" "}
            <Link href="/signup" className="text-[#7c6af7] font-medium hover:underline">
              Create a free account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
