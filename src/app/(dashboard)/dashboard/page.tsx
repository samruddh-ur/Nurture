"use client";

import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar } from "@/components/ui/avatar";
import {
  Weight, Ruler, Syringe, Calendar, Sparkles, TrendingUp,
  Utensils, Droplets, Moon, Activity, ArrowRight, Clock,
  AlertCircle, CheckCircle2, Baby, Heart, Plus
} from "lucide-react";
import Link from "next/link";
import { LineChart, Line, ResponsiveContainer, Tooltip } from "recharts";

const weightData = [
  { m: "Jan", v: 8.2 }, { m: "Feb", v: 8.6 }, { m: "Mar", v: 9.0 },
  { m: "Apr", v: 9.3 }, { m: "May", v: 9.7 }, { m: "Jun", v: 10.1 },
];

const stats = [
  { label: "Weight", value: "10.1 kg", sub: "+0.4 kg this month", icon: Weight, color: "text-violet-600", bg: "bg-violet-50", trend: "up" },
  { label: "Height", value: "76 cm", sub: "+1.5 cm this month", icon: Ruler, color: "text-blue-600", bg: "bg-blue-50", trend: "up" },
  { label: "Nutrition Score", value: "87/100", sub: "Excellent this week", icon: Utensils, color: "text-emerald-600", bg: "bg-emerald-50", trend: "up" },
  { label: "Sleep", value: "12.5 hrs", sub: "Avg last 7 days", icon: Moon, color: "text-indigo-600", bg: "bg-indigo-50", trend: "stable" },
];

const vaccinations = [
  { name: "MMR (Measles, Mumps, Rubella)", date: "Jun 3, 2025", daysLeft: 7, status: "upcoming" },
  { name: "Varicella (Chickenpox)", date: "Jul 15, 2025", daysLeft: 49, status: "upcoming" },
  { name: "Hepatitis A (2nd dose)", date: "Aug 20, 2025", daysLeft: 85, status: "upcoming" },
];

const appointments = [
  { title: "15-month checkup", doctor: "Dr. Patel", date: "Jun 5, 2025", time: "10:00 AM", type: "checkup" },
  { title: "Dental first visit", doctor: "Dr. Nair", date: "Jun 18, 2025", time: "2:30 PM", type: "specialist" },
];

const activities = [
  { icon: "🍼", text: "Formula feeding logged", time: "8 min ago", color: "bg-blue-50" },
  { icon: "💤", text: "Nap ended (1h 45m)", time: "1h ago", color: "bg-indigo-50" },
  { icon: "🚿", text: "Bath time logged", time: "3h ago", color: "bg-cyan-50" },
  { icon: "🥣", text: "Breakfast: oatmeal, banana", time: "5h ago", color: "bg-amber-50" },
];

const aiRecs = [
  {
    icon: "🥦",
    title: "Introduce leafy greens this week",
    body: "Aria's iron levels could use a boost. Try spinach puree or kale mixed with sweet potato.",
    tag: "Nutrition",
    color: "bg-emerald-50 border-emerald-100",
  },
  {
    icon: "😴",
    title: "Consistent bedtime boosts development",
    body: "You've been doing great! Keep the 7:30 PM bedtime — it's aligned with her natural sleep cycle.",
    tag: "Sleep",
    color: "bg-indigo-50 border-indigo-100",
  },
  {
    icon: "🗣️",
    title: "Language development milestone",
    body: "At 14 months, Aria should be saying 2-3 words. Read aloud daily to accelerate vocabulary.",
    tag: "Milestone",
    color: "bg-purple-50 border-purple-100",
  },
];

const todayMeals = [
  { time: "7:30 AM", type: "Breakfast", items: "Oatmeal, banana, formula", done: true },
  { time: "10:00 AM", type: "Snack", items: "Apple slices, yogurt", done: true },
  { time: "12:30 PM", type: "Lunch", items: "Sweet potato mash, peas", done: false },
  { time: "3:00 PM", type: "Snack", items: "Rice puffs, water", done: false },
  { time: "6:00 PM", type: "Dinner", items: "Chicken puree, carrots", done: false },
];

export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">

      {/* Child hero card */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#7c6af7] via-[#9b8ff9] to-[#e879a8] p-6 text-white shadow-lg">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 70% 50%, white 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
        <div className="relative flex items-center gap-5">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-white/20 border-2 border-white/40 flex items-center justify-center text-4xl">
              👶
            </div>
            <span className="absolute -bottom-1 -right-1 bg-green-400 border-2 border-white w-4 h-4 rounded-full" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-2xl font-bold">Aria Johnson</h2>
              <Badge className="bg-white/20 text-white border-0 text-xs">Premium</Badge>
            </div>
            <div className="flex flex-wrap gap-3 text-sm text-white/80">
              <span className="flex items-center gap-1"><Baby className="w-3.5 h-3.5" /> 14 months old</span>
              <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5" /> Blood Group: B+</span>
              <span className="flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" /> Peanut allergy</span>
            </div>
          </div>
          <div className="hidden sm:flex flex-col items-end gap-2">
            <Badge className="bg-white/20 text-white border-0">
              <CheckCircle2 className="w-3 h-3 mr-1" /> All records up to date
            </Badge>
            <Link href="/children">
              <Button variant="ghost" size="sm" className="text-white/80 hover:text-white hover:bg-white/10">
                View profile <ArrowRight className="w-3 h-3" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} hover className="relative overflow-hidden">
            <div className={`absolute top-0 right-0 w-16 h-16 ${stat.bg} rounded-bl-3xl opacity-50`} />
            <div className={`inline-flex p-2 rounded-xl ${stat.bg} mb-3`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <p className="text-2xl font-bold text-[#1a1a2e]">{stat.value}</p>
            <p className="text-xs text-[#a0a0b8] mt-0.5">{stat.label}</p>
            <p className="text-xs text-emerald-600 mt-1 font-medium">{stat.sub}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Growth chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div>
              <CardTitle>Growth Trend</CardTitle>
              <CardDescription>Weight over last 6 months</CardDescription>
            </div>
            <Link href="/growth">
              <Button variant="ghost" size="sm">
                View details <ArrowRight className="w-3 h-3" />
              </Button>
            </Link>
          </CardHeader>
          <div className="flex gap-6 mb-4">
            <div>
              <p className="text-xs text-[#a0a0b8]">Current weight</p>
              <p className="text-xl font-bold text-[#1a1a2e]">10.1 <span className="text-sm font-normal text-[#737373]">kg</span></p>
            </div>
            <div>
              <p className="text-xs text-[#a0a0b8]">WHO percentile</p>
              <p className="text-xl font-bold text-[#1a1a2e]">65th</p>
            </div>
            <div>
              <p className="text-xs text-[#a0a0b8]">Status</p>
              <Badge variant="success" dot className="mt-0.5">Healthy</Badge>
            </div>
          </div>
          <div className="h-36">
            <ResponsiveContainer width="100%" height={144}>
              <LineChart data={weightData}>
                <Tooltip
                  contentStyle={{ background: "white", border: "1px solid #e8e8e0", borderRadius: "12px", fontSize: "12px" }}
                  formatter={(v) => [`${v} kg`, "Weight"]}
                />
                <Line type="monotone" dataKey="v" stroke="#7c6af7" strokeWidth={2.5} dot={{ fill: "#7c6af7", r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Today's meals */}
        <Card>
          <CardHeader>
            <CardTitle>Today&apos;s Meals</CardTitle>
            <Badge variant="purple">87 / 100</Badge>
          </CardHeader>
          <div className="space-y-2.5">
            {todayMeals.map((meal, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${meal.done ? "bg-[#f0fdf4]" : "bg-[#f5f5f0]"}`}>
                  {meal.done
                    ? <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    : <Clock className="w-4 h-4 text-[#a0a0b8]" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-xs font-semibold ${meal.done ? "text-[#1a1a2e]" : "text-[#a0a0b8]"}`}>{meal.type}</p>
                  <p className="text-xs text-[#a0a0b8] truncate">{meal.items}</p>
                </div>
                <span className="text-[10px] text-[#c0c0c0] flex-shrink-0">{meal.time}</span>
              </div>
            ))}
          </div>
          <Link href="/nutrition">
            <Button variant="soft" size="sm" className="w-full mt-4">
              <Utensils className="w-4 h-4" /> Plan meals
            </Button>
          </Link>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* AI Recommendations */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-[#ede9fe]">
                <Sparkles className="w-4 h-4 text-[#7c6af7]" />
              </div>
              <CardTitle>AI Recommendations</CardTitle>
            </div>
            <Badge variant="purple" dot>Live</Badge>
          </CardHeader>
          <div className="space-y-3">
            {aiRecs.map((rec, i) => (
              <div key={i} className={`flex gap-3 p-3.5 rounded-xl border ${rec.color}`}>
                <span className="text-xl flex-shrink-0">{rec.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-sm font-semibold text-[#1a1a2e]">{rec.title}</p>
                    <Badge variant="soft" className="text-[10px] px-1.5 flex-shrink-0">{rec.tag}</Badge>
                  </div>
                  <p className="text-xs text-[#737373] leading-relaxed">{rec.body}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="space-y-4">
          {/* Upcoming vaccinations */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Vaccines</CardTitle>
              <Link href="/vaccinations">
                <button className="text-xs text-[#7c6af7] hover:underline">View all</button>
              </Link>
            </CardHeader>
            <div className="space-y-3">
              {vaccinations.slice(0, 2).map((vax, i) => (
                <div key={i} className="flex gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${vax.daysLeft <= 7 ? "bg-amber-50" : "bg-[#ede9fe]"}`}>
                    <Syringe className={`w-4 h-4 ${vax.daysLeft <= 7 ? "text-amber-500" : "text-[#7c6af7]"}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-[#1a1a2e] leading-tight">{vax.name}</p>
                    <p className="text-xs text-[#a0a0b8]">{vax.date}</p>
                  </div>
                  <Badge variant={vax.daysLeft <= 7 ? "warning" : "purple"} className="flex-shrink-0 self-start">
                    {vax.daysLeft}d
                  </Badge>
                </div>
              ))}
            </div>
          </Card>

          {/* Recent activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <Activity className="w-4 h-4 text-[#a0a0b8]" />
            </CardHeader>
            <div className="space-y-2.5">
              {activities.map((act, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${act.color}`}>
                    <span className="text-sm">{act.icon}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-[#1a1a2e] font-medium leading-tight">{act.text}</p>
                    <p className="text-[10px] text-[#a0a0b8]">{act.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Quick log bar */}
      <Card className="bg-gradient-to-r from-[#fafaf8] to-[#f5f0ff] border-[#ede9fe]">
        <div className="flex flex-wrap gap-3 items-center">
          <p className="text-sm font-semibold text-[#1a1a2e] mr-2">Quick log:</p>
          {[
            { label: "Feeding", icon: "🍼" },
            { label: "Sleep", icon: "😴" },
            { label: "Diaper", icon: "👶" },
            { label: "Medication", icon: "💊" },
            { label: "Activity", icon: "🏃" },
          ].map((item) => (
            <button
              key={item.label}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#e8e8e0] text-sm text-[#737373] hover:border-[#7c6af7] hover:text-[#7c6af7] transition-all shadow-sm"
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
              <Plus className="w-3 h-3 ml-0.5" />
            </button>
          ))}
        </div>
      </Card>

    </div>
  );
}
