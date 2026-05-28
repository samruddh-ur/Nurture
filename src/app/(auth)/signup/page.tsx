"use client";

import { useState } from "react";
import Link from "next/link";
import { Baby, Eye, EyeOff, Mail, Lock, User, ArrowRight, CheckCircle2 } from "lucide-react";
import { signupWithChild } from "@/app/actions/auth";

const steps = ["Account", "Child", "Plan"];

export default function SignupPage() {
  const [step, setStep] = useState(0);
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Collect form data across steps
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "", password: "",
    childName: "", childDob: "", childGender: "female",
    plan: "free",
  });

  function update(field: string, value: string) {
    setFormData(prev => ({ ...prev, [field]: value }));
  }

  async function handleFinish() {
    setError(null);
    setLoading(true);
    const fd = new FormData();
    Object.entries(formData).forEach(([k, v]) => fd.append(k, v));
    const result = await signupWithChild(fd);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#fafaf8] flex items-center justify-center p-6">
      <div className="w-full max-w-lg">
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

        {error && (
          <div className="mb-4 px-4 py-3 rounded-xl bg-red-50 border border-red-100 text-sm text-red-600 text-center">
            {error}
          </div>
        )}

        <div className="bg-white rounded-3xl border border-[#e8e8e0] shadow-sm p-8">
          {/* Step 0: Account */}
          {step === 0 && (
            <>
              <h1 className="text-2xl font-extrabold text-[#1a1a2e] mb-1">Create your account</h1>
              <p className="text-sm text-[#737373] mb-6">Free forever. No credit card required.</p>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-[#1a1a2e]">First name</label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a0a0b8]" />
                      <input value={formData.firstName} onChange={e => update("firstName", e.target.value)} className="w-full h-11 rounded-xl bg-[#f5f5f0] pl-10 pr-4 text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#7c6af7]/15 border border-transparent transition-all" placeholder="Sarah" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-[#1a1a2e]">Last name</label>
                    <input value={formData.lastName} onChange={e => update("lastName", e.target.value)} className="w-full h-11 rounded-xl bg-[#f5f5f0] px-4 text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#7c6af7]/15 border border-transparent transition-all" placeholder="Johnson" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-[#1a1a2e]">Email address</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a0a0b8]" />
                    <input value={formData.email} onChange={e => update("email", e.target.value)} type="email" className="w-full h-11 rounded-xl bg-[#f5f5f0] pl-10 pr-4 text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#7c6af7]/15 border border-transparent transition-all" placeholder="you@example.com" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-[#1a1a2e]">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a0a0b8]" />
                    <input value={formData.password} onChange={e => update("password", e.target.value)} type={showPw ? "text" : "password"} className="w-full h-11 rounded-xl bg-[#f5f5f0] pl-10 pr-10 text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#7c6af7]/15 border border-transparent transition-all" placeholder="8+ characters" />
                    <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#a0a0b8]">
                      {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <button onClick={() => setStep(1)} disabled={!formData.email || !formData.password || formData.password.length < 8} className="w-full flex items-center justify-center gap-2 h-11 rounded-xl bg-[#7c6af7] text-white font-semibold text-sm hover:bg-[#6a58e5] disabled:opacity-50 transition-all">
                  Continue <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </>
          )}

          {/* Step 1: Child profile */}
          {step === 1 && (
            <>
              <h1 className="text-2xl font-extrabold text-[#1a1a2e] mb-1">Add your child&apos;s profile</h1>
              <p className="text-sm text-[#737373] mb-6">You can add more children later</p>
              <div className="space-y-4">
                <div className="flex justify-center mb-2">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#ede9fe] to-[#fdf2f8] border-2 border-dashed border-[#d0c8f8] flex items-center justify-center">
                    <span className="text-3xl">👶</span>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-[#1a1a2e]">Child&apos;s name</label>
                  <input value={formData.childName} onChange={e => update("childName", e.target.value)} className="w-full h-11 rounded-xl bg-[#f5f5f0] px-4 text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#7c6af7]/15 border border-transparent transition-all" placeholder="Aria" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-[#1a1a2e]">Date of birth</label>
                    <input value={formData.childDob} onChange={e => update("childDob", e.target.value)} type="date" className="w-full h-11 rounded-xl bg-[#f5f5f0] px-4 text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#7c6af7]/15 border border-transparent transition-all" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-[#1a1a2e]">Gender</label>
                    <select value={formData.childGender} onChange={e => update("childGender", e.target.value)} className="w-full h-11 rounded-xl bg-[#f5f5f0] px-4 text-sm focus:outline-none focus:bg-white border border-transparent transition-all">
                      <option value="female">Girl</option>
                      <option value="male">Boy</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setStep(0)} className="flex-1 h-11 rounded-xl border border-[#e8e8e0] text-sm font-medium text-[#737373] hover:bg-[#f5f5f0] transition-all">Back</button>
                  <button onClick={() => setStep(2)} className="flex-1 flex items-center justify-center gap-2 h-11 rounded-xl bg-[#7c6af7] text-white font-semibold text-sm hover:bg-[#6a58e5] transition-all">
                    Continue <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </>
          )}

          {/* Step 2: Plan */}
          {step === 2 && (
            <>
              <h1 className="text-2xl font-extrabold text-[#1a1a2e] mb-1">Choose your plan</h1>
              <p className="text-sm text-[#737373] mb-6">Start free, upgrade anytime.</p>
              <div className="space-y-3 mb-6">
                {[
                  { id: "free", name: "Free", price: "$0/mo", desc: "1 child · Basic tracking · 5 AI questions/month" },
                  { id: "premium", name: "Premium", price: "$9.99/mo", desc: "1 child · Unlimited AI · Full nutrition planning", popular: true },
                  { id: "family_plus", name: "Family Plus", price: "$19.99/mo", desc: "Unlimited children · All features · Priority support" },
                ].map((plan) => (
                  <label key={plan.id} className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${formData.plan === plan.id ? "border-[#7c6af7] bg-[#faf8ff]" : "border-[#e8e8e0] hover:border-[#c8c0f8]"}`}>
                    <input type="radio" name="plan" checked={formData.plan === plan.id} onChange={() => update("plan", plan.id)} className="accent-[#7c6af7] w-4 h-4" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-[#1a1a2e]">{plan.name}</span>
                        {plan.popular && <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#7c6af7] text-white font-medium">Popular</span>}
                      </div>
                      <p className="text-xs text-[#737373]">{plan.desc}</p>
                    </div>
                    <span className="font-bold text-sm text-[#1a1a2e]">{plan.price}</span>
                  </label>
                ))}
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="flex-1 h-11 rounded-xl border border-[#e8e8e0] text-sm font-medium text-[#737373] hover:bg-[#f5f5f0] transition-all">Back</button>
                <button onClick={handleFinish} disabled={loading} className="flex-1 flex items-center justify-center gap-2 h-11 rounded-xl bg-[#7c6af7] text-white font-semibold text-sm hover:bg-[#6a58e5] disabled:opacity-60 transition-all">
                  {loading ? "Creating…" : <><span>Get started</span><ArrowRight className="w-4 h-4" /></>}
                </button>
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
