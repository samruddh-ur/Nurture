"use client";

import { useState } from "react";
import Link from "next/link";
import { Baby, Eye, EyeOff, Mail, Lock, User, ArrowRight, CheckCircle2 } from "lucide-react";

const steps = ["Account", "Child", "Plan"];

export default function SignupPage() {
  const [step, setStep] = useState(0);
  const [showPw, setShowPw] = useState(false);

  return (
    <div className="min-h-screen bg-[#fafaf8] flex items-center justify-center p-6">
      <div className="w-full max-w-lg">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#7c6af7] to-[#e879a8] flex items-center justify-center shadow-lg shadow-[#7c6af7]/25">
              <Baby className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-[#1a1a2e]">nurtura</span>
          </Link>
        </div>

        {/* Step indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold transition-all ${
                i < step ? "bg-emerald-500 text-white" :
                i === step ? "bg-[#7c6af7] text-white" :
                "bg-[#f0f0ea] text-[#a0a0b8]"
              }`}>
                {i < step ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
              </div>
              <span className={`text-xs font-medium hidden sm:block ${i === step ? "text-[#1a1a2e]" : "text-[#a0a0b8]"}`}>{s}</span>
              {i < steps.length - 1 && <div className="w-8 h-px bg-[#e8e8e0] mx-1" />}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-3xl border border-[#e8e8e0] shadow-sm p-8">

          {/* Step 0: Account */}
          {step === 0 && (
            <>
              <h1 className="text-2xl font-extrabold text-[#1a1a2e] mb-1">Create your account</h1>
              <p className="text-sm text-[#737373] mb-6">Free forever. No credit card required.</p>

              <div className="space-y-3 mb-6">
                <button className="w-full flex items-center justify-center gap-3 h-11 rounded-xl border border-[#e8e8e0] text-sm font-medium text-[#1a1a2e] hover:bg-[#f5f5f0] transition-all">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continue with Google
                </button>
              </div>

              <div className="flex items-center gap-3 mb-6">
                <div className="flex-1 h-px bg-[#e8e8e0]" />
                <span className="text-xs text-[#a0a0b8]">or with email</span>
                <div className="flex-1 h-px bg-[#e8e8e0]" />
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-[#1a1a2e]">First name</label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a0a0b8]" />
                      <input className="w-full h-11 rounded-xl bg-[#f5f5f0] pl-10 pr-4 text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#7c6af7]/15 focus:border-[#7c6af7] border border-transparent transition-all" placeholder="Sarah" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-[#1a1a2e]">Last name</label>
                    <input className="w-full h-11 rounded-xl bg-[#f5f5f0] px-4 text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#7c6af7]/15 border border-transparent transition-all" placeholder="Johnson" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-[#1a1a2e]">Email address</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a0a0b8]" />
                    <input type="email" className="w-full h-11 rounded-xl bg-[#f5f5f0] pl-10 pr-4 text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#7c6af7]/15 border border-transparent transition-all" placeholder="you@example.com" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-[#1a1a2e]">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a0a0b8]" />
                    <input
                      type={showPw ? "text" : "password"}
                      className="w-full h-11 rounded-xl bg-[#f5f5f0] pl-10 pr-10 text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#7c6af7]/15 border border-transparent transition-all"
                      placeholder="8+ characters"
                    />
                    <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#a0a0b8]">
                      {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <label className="flex items-start gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded accent-[#7c6af7] mt-0.5" />
                  <span className="text-xs text-[#737373]">I agree to the <a href="#" className="text-[#7c6af7]">Terms of Service</a> and <a href="#" className="text-[#7c6af7]">Privacy Policy</a></span>
                </label>

                <button
                  onClick={() => setStep(1)}
                  className="w-full flex items-center justify-center gap-2 h-11 rounded-xl bg-[#7c6af7] text-white font-semibold text-sm hover:bg-[#6a58e5] transition-all"
                >
                  Continue <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </>
          )}

          {/* Step 1: Child profile */}
          {step === 1 && (
            <>
              <h1 className="text-2xl font-extrabold text-[#1a1a2e] mb-1">Add your child&apos;s profile</h1>
              <p className="text-sm text-[#737373] mb-6">You can add more children later from the dashboard</p>

              <div className="space-y-4">
                <div className="flex justify-center mb-2">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#ede9fe] to-[#fdf2f8] border-2 border-dashed border-[#d0c8f8] flex items-center justify-center cursor-pointer hover:border-[#7c6af7] transition-colors">
                    <span className="text-3xl">👶</span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-[#1a1a2e]">Child&apos;s name</label>
                  <input className="w-full h-11 rounded-xl bg-[#f5f5f0] px-4 text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#7c6af7]/15 border border-transparent transition-all" placeholder="Aria" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-[#1a1a2e]">Date of birth</label>
                    <input type="date" className="w-full h-11 rounded-xl bg-[#f5f5f0] px-4 text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#7c6af7]/15 border border-transparent transition-all" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-[#1a1a2e]">Gender</label>
                    <select className="w-full h-11 rounded-xl bg-[#f5f5f0] px-4 text-sm focus:outline-none focus:bg-white border border-transparent transition-all">
                      <option>Girl</option>
                      <option>Boy</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-[#1a1a2e]">Allergies (optional)</label>
                  <input className="w-full h-11 rounded-xl bg-[#f5f5f0] px-4 text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#7c6af7]/15 border border-transparent transition-all" placeholder="e.g. Peanuts, Dairy" />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-[#1a1a2e]">Blood group (optional)</label>
                  <select className="w-full h-11 rounded-xl bg-[#f5f5f0] px-4 text-sm focus:outline-none focus:bg-white border border-transparent transition-all">
                    <option value="">Unknown</option>
                    {["A+","A-","B+","B-","AB+","AB-","O+","O-"].map((bg) => (
                      <option key={bg}>{bg}</option>
                    ))}
                  </select>
                </div>

                <div className="flex gap-3">
                  <button onClick={() => setStep(0)} className="flex-1 h-11 rounded-xl border border-[#e8e8e0] text-sm font-medium text-[#737373] hover:bg-[#f5f5f0] transition-all">
                    Back
                  </button>
                  <button onClick={() => setStep(2)} className="flex-1 flex items-center justify-center gap-2 h-11 rounded-xl bg-[#7c6af7] text-white font-semibold text-sm hover:bg-[#6a58e5] transition-all">
                    Continue <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </>
          )}

          {/* Step 2: Plan selection */}
          {step === 2 && (
            <>
              <h1 className="text-2xl font-extrabold text-[#1a1a2e] mb-1">Choose your plan</h1>
              <p className="text-sm text-[#737373] mb-6">Start free, upgrade anytime. No credit card required.</p>

              <div className="space-y-3 mb-6">
                {[
                  { name: "Free", price: "$0/mo", desc: "1 child · Basic tracking · 5 AI questions/month", selected: true },
                  { name: "Premium", price: "$9.99/mo", desc: "1 child · Unlimited AI · Full nutrition planning", selected: false, popular: true },
                  { name: "Family Plus", price: "$19.99/mo", desc: "Unlimited children · All features · Priority support", selected: false },
                ].map((plan) => (
                  <label key={plan.name} className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    plan.selected ? "border-[#7c6af7] bg-[#faf8ff]" : "border-[#e8e8e0] hover:border-[#c8c0f8]"
                  }`}>
                    <input type="radio" name="plan" defaultChecked={plan.selected} className="accent-[#7c6af7] w-4 h-4" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-[#1a1a2e]">{plan.name}</span>
                        {plan.popular && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#7c6af7] text-white font-medium">Popular</span>
                        )}
                      </div>
                      <p className="text-xs text-[#737373]">{plan.desc}</p>
                    </div>
                    <span className="font-bold text-sm text-[#1a1a2e]">{plan.price}</span>
                  </label>
                ))}
              </div>

              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="flex-1 h-11 rounded-xl border border-[#e8e8e0] text-sm font-medium text-[#737373] hover:bg-[#f5f5f0] transition-all">
                  Back
                </button>
                <Link
                  href="/dashboard"
                  className="flex-1 flex items-center justify-center gap-2 h-11 rounded-xl bg-[#7c6af7] text-white font-semibold text-sm hover:bg-[#6a58e5] transition-all"
                >
                  Get started <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </>
          )}
        </div>

        <p className="text-sm text-center text-[#737373] mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-[#7c6af7] font-medium hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
