"use client";

import { useState } from "react";
import Link from "next/link";
import { Baby, Eye, EyeOff, Mail, Lock, ArrowRight, Sparkles } from "lucide-react";
import { login } from "@/app/actions/auth";

export default function LoginPage() {
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const result = await login(formData);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

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
            <p className="text-white/80 text-sm italic">&ldquo;Nurtura feels like having a pediatric nutritionist and doctor available 24/7.&rdquo;</p>
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
          <Link href="/" className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#7c6af7] to-[#e879a8] flex items-center justify-center">
              <Baby className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg text-[#1a1a2e]">nurtura</span>
          </Link>

          <h1 className="text-2xl font-extrabold text-[#1a1a2e] mb-1">Welcome back</h1>
          <p className="text-sm text-[#737373] mb-8">Sign in to continue to your family dashboard</p>

          {error && (
            <div className="mb-4 px-4 py-3 rounded-xl bg-red-50 border border-red-100 text-sm text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-[#1a1a2e]">Email address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a0a0b8]" />
                <input
                  name="email"
                  type="email"
                  required
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
                  name="password"
                  type={showPw ? "text" : "password"}
                  required
                  className="w-full h-11 rounded-xl bg-[#f5f5f0] border border-transparent pl-10 pr-10 text-sm text-[#1a1a2e] focus:outline-none focus:bg-white focus:border-[#7c6af7] focus:ring-2 focus:ring-[#7c6af7]/15 transition-all"
                  placeholder="••••••••"
                />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#a0a0b8] hover:text-[#737373]">
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 h-11 rounded-xl bg-[#7c6af7] text-white font-semibold text-sm hover:bg-[#6a58e5] disabled:opacity-60 disabled:cursor-not-allowed transition-all shadow-sm shadow-[#7c6af7]/20"
            >
              {loading ? "Signing in…" : <><span>Sign in</span><ArrowRight className="w-4 h-4" /></>}
            </button>
          </form>

          <p className="text-sm text-center text-[#737373] mt-6">
            New to Nurtura?{" "}
            <Link href="/signup" className="text-[#7c6af7] font-medium hover:underline">Create a free account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
