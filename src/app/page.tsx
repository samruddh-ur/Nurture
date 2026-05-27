import Link from "next/link";
import { Baby, Sparkles, TrendingUp, Syringe, FolderLock, Users, ArrowRight, CheckCircle2, Star, Shield, ChevronRight } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "AI Nutrition Assistant",
    desc: "Age-tailored meal plans, recipes, and grocery lists — regenerated weekly, allergy-aware.",
    color: "bg-violet-100 text-violet-600",
    border: "border-violet-100",
    tag: "AI",
  },
  {
    icon: Baby,
    title: "BabyGPT",
    desc: "Ask anything — fever, feeding, milestones. Get calm, evidence-based answers instantly.",
    color: "bg-pink-100 text-pink-600",
    border: "border-pink-100",
    tag: "AI",
  },
  {
    icon: TrendingUp,
    title: "Growth Tracking",
    desc: "WHO growth charts, milestone checklists, and sleep trends all in one clean view.",
    color: "bg-blue-100 text-blue-600",
    border: "border-blue-100",
    tag: "Charts",
  },
  {
    icon: Syringe,
    title: "Vaccinations",
    desc: "Country-specific schedules, smart reminders, and exportable vaccine certificates.",
    color: "bg-amber-100 text-amber-600",
    border: "border-amber-100",
    tag: "Reminders",
  },
  {
    icon: FolderLock,
    title: "Baby Passport",
    desc: "An encrypted vault for birth certs, medical reports, insurance cards, prescriptions.",
    color: "bg-teal-100 text-teal-600",
    border: "border-teal-100",
    tag: "Secure",
  },
  {
    icon: Users,
    title: "Family Hub",
    desc: "Co-parents, grandparents, nannies — shared logs, calendar, and role-based access.",
    color: "bg-green-100 text-green-600",
    border: "border-green-100",
    tag: "Collaboration",
  },
];

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "",
    desc: "For one child, forever",
    features: ["1 child profile", "Basic growth tracking", "Vaccination schedule", "5 AI questions/month", "100 MB document storage"],
    cta: "Get started free",
    highlight: false,
  },
  {
    name: "Premium",
    price: "$9.99",
    period: "/mo",
    desc: "Best for one growing child",
    features: ["1 child", "Unlimited AI assistant", "Full nutrition planning", "Growth analytics", "5 GB document vault", "2 caregivers"],
    cta: "Start 14-day free trial",
    highlight: true,
  },
  {
    name: "Family Plus",
    price: "$19.99",
    period: "/mo",
    desc: "For families with more kids",
    features: ["Unlimited children", "Everything in Premium", "Unlimited caregivers", "Unlimited storage", "Pediatrician sharing", "Priority support"],
    cta: "Start free trial",
    highlight: false,
  },
];

const testimonials = [
  {
    name: "Jennifer Walsh",
    role: "Mom of twins, 8 months",
    avatar: "J",
    body: "Nurtura changed how I manage two babies at once. The AI nutrition plans even account for one baby's dairy sensitivity — it's genuinely smart.",
    rating: 5,
  },
  {
    name: "Raj Mehta",
    role: "Dad, 14-month-old",
    avatar: "R",
    body: "BabyGPT at 3am when my daughter had a fever was a lifesaver. Calm, clear, instant. Like having a paediatrician in your pocket.",
    rating: 5,
  },
  {
    name: "Maria Santos",
    role: "First-time mom, 6 months",
    avatar: "M",
    body: "Everything in one place — birth certificate, vaccination history, medical reports. It gives me so much peace of mind.",
    rating: 5,
  },
];

const stats = [
  { value: "12,000+", label: "Families using Nurtura" },
  { value: "4.9 / 5", label: "App Store rating" },
  { value: "98%", label: "Vaccination reminder accuracy" },
  { value: "HIPAA", label: "Ready architecture" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">

      {/* ── Navbar ─────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-5 h-15 flex items-center justify-between" style={{ height: "60px" }}>
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center shadow-sm shadow-violet-200">
              <Baby className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg text-gray-900 tracking-tight">nurtura</span>
          </Link>

          <div className="hidden md:flex items-center gap-7 text-sm text-gray-500">
            <a href="#features" className="hover:text-gray-900 transition-colors">Features</a>
            <a href="#pricing" className="hover:text-gray-900 transition-colors">Pricing</a>
            <a href="#testimonials" className="hover:text-gray-900 transition-colors">Stories</a>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/login" className="hidden sm:block text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
              Sign in
            </Link>
            <Link href="/signup" className="px-4 py-2 rounded-xl bg-violet-600 text-white text-sm font-semibold hover:bg-violet-700 transition-colors shadow-sm">
              Get started free
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ───────────────────────────────────────────────── */}
      <section className="relative pt-14 pb-10 px-5 text-center overflow-hidden bg-white">
        {/* Background blobs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-br from-violet-100 via-pink-50 to-transparent rounded-full blur-3xl opacity-60 pointer-events-none" />

        <div className="relative max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-50 border border-violet-200 text-xs font-medium text-violet-700 mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            AI-powered parenting · Birth to 5 years
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-[3.75rem] font-extrabold text-gray-900 leading-[1.1] tracking-tight mb-5">
            Everything your child needs,{" "}
            <span style={{ background: "linear-gradient(135deg, #7c6af7 0%, #e879a8 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              in one place
            </span>
          </h1>

          <p className="text-lg text-gray-500 max-w-xl mx-auto leading-relaxed mb-8">
            Manage nutrition, track growth, monitor health, store records, and coordinate care — all guided by AI built for parents.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
            <Link href="/signup" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl bg-violet-600 text-white font-semibold text-base hover:bg-violet-700 transition-all shadow-lg shadow-violet-200">
              Start for free <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/dashboard" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl bg-gray-50 border border-gray-200 text-gray-800 font-semibold text-base hover:bg-gray-100 transition-all">
              View live demo <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-5">
            <div className="flex -space-x-2">
              {["#7c6af7","#e879a8","#22c55e","#3b82f6","#f59e0b"].map((bg, i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-white" style={{ background: bg, zIndex: 5 - i }}>
                  {["A","B","C","D","E"][i]}
                </div>
              ))}
            </div>
            <span className="text-sm text-gray-500"><strong className="text-gray-900">12,000+</strong> families worldwide</span>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
              <span className="text-sm text-gray-500 ml-1 font-medium">4.9/5</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Dashboard screenshot ────────────────────────────────── */}
      <section className="px-5 pb-14">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-2xl shadow-gray-200/80">
            {/* Browser chrome */}
            <div className="bg-gray-50 px-4 py-2.5 flex items-center gap-2.5 border-b border-gray-200">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="flex-1 h-6 bg-white rounded-md flex items-center px-3 border border-gray-200">
                <span className="text-xs text-gray-400">app.nurtura.io/dashboard</span>
              </div>
            </div>
            {/* Dashboard preview */}
            <div className="bg-[#fafaf8] p-5 space-y-4">
              {/* Stats row */}
              <div className="grid grid-cols-4 gap-3">
                {[
                  { emoji: "⚖️", val: "10.1 kg", lbl: "Weight", bg: "bg-violet-50", badge: "↑ 65th pct" },
                  { emoji: "📏", val: "76 cm",   lbl: "Height",  bg: "bg-blue-50",   badge: "↑ 60th pct" },
                  { emoji: "🥗", val: "87/100",  lbl: "Nutrition", bg: "bg-green-50", badge: "Excellent" },
                  { emoji: "🌙", val: "12.5 hrs", lbl: "Sleep",  bg: "bg-indigo-50",  badge: "On track" },
                ].map(s => (
                  <div key={s.lbl} className={`${s.bg} rounded-xl p-3`}>
                    <div className="text-xl mb-1.5">{s.emoji}</div>
                    <div className="text-sm font-bold text-gray-900">{s.val}</div>
                    <div className="text-xs text-gray-500">{s.lbl}</div>
                    <div className="text-[10px] text-emerald-600 font-medium mt-1">{s.badge}</div>
                  </div>
                ))}
              </div>
              {/* Charts + AI row */}
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2 bg-white rounded-xl p-4 border border-gray-100">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-xs font-semibold text-gray-900">Growth Trend</p>
                      <p className="text-[10px] text-gray-400">Weight · last 7 months</p>
                    </div>
                    <span className="text-[10px] bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full font-medium">● Healthy</span>
                  </div>
                  <div className="flex items-end gap-1 h-14">
                    {[38, 52, 60, 68, 76, 84, 92].map((h, i) => (
                      <div key={i} className="flex-1 rounded-t" style={{ height: `${h}%`, background: `rgba(124,106,247,${0.25 + i*0.1})` }} />
                    ))}
                  </div>
                  <div className="flex justify-between mt-1.5">
                    {["Aug","Oct","Dec","Feb","Apr","Jun","Aug2"].map((m, i) => (
                      <span key={i} className="text-[9px] text-gray-400">{m === "Aug2" ? "Aug" : m}</span>
                    ))}
                  </div>
                </div>
                <div className="bg-gradient-to-br from-violet-500 to-pink-500 rounded-xl p-4 text-white flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 mb-2">
                      <Sparkles className="w-3.5 h-3.5 text-white/80" />
                      <span className="text-[10px] font-semibold text-white/80">AI INSIGHT</span>
                    </div>
                    <p className="text-xs leading-relaxed">Introduce leafy greens this week to boost iron levels 🥦</p>
                  </div>
                  <div className="mt-3 text-[10px] bg-white/20 rounded-lg px-2 py-1.5">
                    💉 MMR vaccine due in <strong>7 days</strong>
                  </div>
                </div>
              </div>
              {/* Meals row */}
              <div className="bg-white rounded-xl p-4 border border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-semibold text-gray-900">Today's meals</p>
                  <span className="text-[10px] bg-violet-50 text-violet-600 font-semibold px-2 py-0.5 rounded-full">87 / 100 score</span>
                </div>
                <div className="flex gap-2">
                  {[
                    { meal: "Breakfast", items: "Oatmeal, banana", done: true },
                    { meal: "Snack", items: "Yogurt, berries", done: true },
                    { meal: "Lunch", items: "Sweet potato, peas", done: false },
                    { meal: "Dinner", items: "Chicken puree", done: false },
                  ].map(m => (
                    <div key={m.meal} className={`flex-1 rounded-lg p-2 ${m.done ? "bg-emerald-50" : "bg-gray-50"}`}>
                      <div className="text-[9px] font-semibold text-gray-500 mb-0.5">{m.meal}</div>
                      <div className="text-[10px] text-gray-700">{m.items}</div>
                      <div className={`text-[9px] mt-1 font-medium ${m.done ? "text-emerald-600" : "text-gray-400"}`}>
                        {m.done ? "✓ Logged" : "Pending"}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats bar ──────────────────────────────────────────── */}
      <section className="bg-gray-950 py-8 px-5">
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6">
          {stats.map(s => (
            <div key={s.label} className="text-center">
              <div className="text-2xl font-extrabold text-white mb-0.5">{s.value}</div>
              <div className="text-xs text-gray-400">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ───────────────────────────────────────────── */}
      <section id="features" className="px-5 py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-bold text-violet-600 uppercase tracking-widest mb-2">Platform features</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">Built for every parenting moment</h2>
            <p className="text-gray-500 max-w-lg mx-auto">From first feed to first day of school — every module works together seamlessly.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map(f => (
              <div key={f.title} className={`bg-white rounded-2xl p-5 border ${f.border} hover:shadow-lg hover:shadow-gray-100 hover:-translate-y-0.5 transition-all duration-200 group`}>
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-2.5 rounded-xl ${f.color} group-hover:scale-110 transition-transform`}>
                    <f.icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-semibold bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{f.tag}</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-1.5">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it looks ───────────────────────────────────────── */}
      <section className="px-5 py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-bold text-violet-600 uppercase tracking-widest mb-2">Inside the app</p>
            <h2 className="text-3xl font-extrabold text-gray-900">Every module, thoughtfully designed</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "BabyGPT", desc: "Chat with an AI that knows your baby's profile", emoji: "🤖", color: "from-violet-500 to-purple-600" },
              { title: "Nutrition", desc: "AI meal plans, recipes, and shopping lists", emoji: "🥗", color: "from-green-500 to-teal-600" },
              { title: "Vaccinations", desc: "Full WHO schedule, never miss a shot", emoji: "💉", color: "from-amber-500 to-orange-500" },
              { title: "Baby Passport", desc: "Encrypted vault for all vital documents", emoji: "📁", color: "from-blue-500 to-indigo-600" },
            ].map(item => (
              <div key={item.title} className="rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all group">
                <div className={`bg-gradient-to-br ${item.color} p-6 text-white`}>
                  <div className="text-3xl mb-2">{item.emoji}</div>
                  <h3 className="font-bold text-base">{item.title}</h3>
                </div>
                <div className="bg-white p-4">
                  <p className="text-sm text-gray-500 mb-3">{item.desc}</p>
                  <Link href="/dashboard" className="inline-flex items-center text-xs font-semibold text-violet-600 hover:underline">
                    See it live <ArrowRight className="w-3 h-3 ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ────────────────────────────────────────────── */}
      <section id="pricing" className="px-5 py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-bold text-violet-600 uppercase tracking-widest mb-2">Pricing</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2">Simple, honest pricing</h2>
            <p className="text-gray-500">Start free. Upgrade when you need more. Cancel any time.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {plans.map(plan => (
              <div key={plan.name} className={`relative rounded-2xl flex flex-col ${
                plan.highlight
                  ? "bg-violet-600 text-white shadow-xl shadow-violet-200 scale-[1.02]"
                  : "bg-white border border-gray-200"
              }`}>
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                    Most popular
                  </div>
                )}
                <div className="p-6 flex-1">
                  <p className={`font-bold text-lg mb-0.5 ${plan.highlight ? "text-white" : "text-gray-900"}`}>{plan.name}</p>
                  <p className={`text-xs mb-4 ${plan.highlight ? "text-violet-200" : "text-gray-400"}`}>{plan.desc}</p>
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className={`text-4xl font-extrabold ${plan.highlight ? "text-white" : "text-gray-900"}`}>{plan.price}</span>
                    <span className={`text-sm ${plan.highlight ? "text-violet-200" : "text-gray-400"}`}>{plan.period}</span>
                  </div>
                  <ul className="space-y-2.5">
                    {plan.features.map(f => (
                      <li key={f} className={`flex items-center gap-2 text-sm ${plan.highlight ? "text-violet-100" : "text-gray-600"}`}>
                        <CheckCircle2 className={`w-4 h-4 flex-shrink-0 ${plan.highlight ? "text-violet-200" : "text-emerald-500"}`} />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-6 pt-0">
                  <Link href="/signup" className={`block text-center py-3 rounded-xl font-semibold text-sm transition-all ${
                    plan.highlight
                      ? "bg-white text-violet-600 hover:bg-violet-50"
                      : "bg-violet-600 text-white hover:bg-violet-700"
                  }`}>
                    {plan.cta}
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-gray-400 mt-6">No credit card required to start. 14-day free trial on paid plans.</p>
        </div>
      </section>

      {/* ── Testimonials ───────────────────────────────────────── */}
      <section id="testimonials" className="px-5 py-16 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-bold text-violet-600 uppercase tracking-widest mb-2">Parent stories</p>
            <h2 className="text-3xl font-extrabold text-gray-900">Loved by families worldwide</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {testimonials.map(t => (
              <div key={t.name} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <div className="flex gap-0.5 mb-4">
                  {[...Array(t.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed mb-5">&ldquo;{t.body}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ──────────────────────────────────────────── */}
      <section className="px-5 py-16 bg-gradient-to-br from-gray-950 via-violet-950 to-gray-950">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-violet-500/30">
            <Baby className="w-7 h-7 text-white" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">Your child deserves the best start</h2>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">Join 12,000+ parents who use Nurtura every day.</p>
          <Link href="/signup" className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-violet-600 text-white font-bold text-base hover:bg-violet-500 transition-all shadow-lg shadow-violet-500/25">
            Get started — it&apos;s free
            <ArrowRight className="w-5 h-5" />
          </Link>
          <div className="flex items-center justify-center gap-5 mt-8 text-xs text-gray-500">
            <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5" /> HIPAA-ready</span>
            <span>·</span>
            <span>GDPR compliant</span>
            <span>·</span>
            <span>AES-256 encrypted</span>
          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────── */}
      <footer className="bg-gray-950 border-t border-white/5 px-5 py-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center">
              <Baby className="w-3 h-3 text-white" />
            </div>
            <span className="text-white font-semibold text-sm">nurtura</span>
          </div>
          <p className="text-xs text-gray-600">© 2025 Nurtura, Inc. All rights reserved.</p>
          <div className="flex gap-5 text-xs text-gray-500">
            <a href="#" className="hover:text-gray-300 transition-colors">Privacy</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Terms</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Support</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
