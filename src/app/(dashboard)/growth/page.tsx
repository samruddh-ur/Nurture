"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Plus, Download, Ruler, Weight, Brain, Moon, Activity } from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Area, AreaChart, Legend
} from "recharts";

const growthData = [
  { month: "Aug", weight: 3.5, height: 50, headCirc: 34 },
  { month: "Oct", weight: 5.2, height: 57, headCirc: 38 },
  { month: "Dec", weight: 6.8, height: 62, headCirc: 40 },
  { month: "Feb", weight: 7.9, height: 67, headCirc: 42 },
  { month: "Apr", weight: 8.9, height: 71, headCirc: 44 },
  { month: "Jun", weight: 9.5, height: 74, headCirc: 45 },
  { month: "Aug", weight: 10.1, height: 76, headCirc: 46 },
];

const milestones = [
  { category: "Motor", items: [
    { name: "Walks independently", achieved: true, date: "Mar 2024", age: "7 months" },
    { name: "Climbs stairs with help", achieved: true, date: "May 2024", age: "9 months" },
    { name: "Runs (wobbly)", achieved: true, date: "Jul 2024", age: "11 months" },
    { name: "Kicks a ball", achieved: false, expectedAge: "15–18 months" },
    { name: "Jumps with both feet", achieved: false, expectedAge: "18–24 months" },
  ]},
  { category: "Language", items: [
    { name: "First words (mama/dada)", achieved: true, date: "Jan 2024", age: "5 months" },
    { name: "5+ words vocabulary", achieved: true, date: "May 2024", age: "9 months" },
    { name: "Points to objects", achieved: true, date: "Jun 2024", age: "10 months" },
    { name: "2-word phrases", achieved: false, expectedAge: "18–24 months" },
    { name: "50+ word vocabulary", achieved: false, expectedAge: "18–24 months" },
  ]},
  { category: "Social", items: [
    { name: "Waves bye-bye", achieved: true, date: "Apr 2024", age: "8 months" },
    { name: "Plays peek-a-boo", achieved: true, date: "Mar 2024", age: "7 months" },
    { name: "Imitates actions", achieved: true, date: "Jun 2024", age: "10 months" },
    { name: "Parallel play", achieved: false, expectedAge: "18–24 months" },
  ]},
  { category: "Cognitive", items: [
    { name: "Object permanence", achieved: true, date: "Feb 2024", age: "6 months" },
    { name: "Uses spoon (assisted)", achieved: true, date: "Aug 2024", age: "12 months" },
    { name: "Stacks 2 blocks", achieved: true, date: "Sep 2024", age: "13 months" },
    { name: "Stacks 4+ blocks", achieved: false, expectedAge: "18 months" },
  ]},
];

const sleepData = [
  { day: "Mon", night: 10.5, nap: 1.5 },
  { day: "Tue", night: 11.0, nap: 2.0 },
  { day: "Wed", night: 9.5, nap: 1.0 },
  { day: "Thu", night: 11.5, nap: 2.5 },
  { day: "Fri", night: 10.0, nap: 1.5 },
  { day: "Sat", night: 12.0, nap: 2.0 },
  { day: "Sun", night: 11.0, nap: 1.5 },
];

export default function GrowthPage() {
  const [metric, setMetric] = useState<"weight" | "height" | "headCirc">("weight");
  const [tab, setTab] = useState<"growth" | "milestones" | "sleep">("growth");

  const metricConfig = {
    weight: { label: "Weight (kg)", color: "#7c6af7", unit: "kg" },
    height: { label: "Height (cm)", color: "#3b82f6", unit: "cm" },
    headCirc: { label: "Head Circumference (cm)", color: "#ec4899", unit: "cm" },
  };

  const totalMilestones = milestones.flatMap((m) => m.items).length;
  const achievedMilestones = milestones.flatMap((m) => m.items).filter((m) => m.achieved).length;

  return (
    <div className="max-w-6xl mx-auto space-y-6">

      {/* Current stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Weight", value: "10.1 kg", sub: "65th percentile", icon: Weight, color: "text-violet-600", bg: "bg-violet-50", trend: "+0.4 kg" },
          { label: "Height", value: "76 cm", sub: "60th percentile", icon: Ruler, color: "text-blue-600", bg: "bg-blue-50", trend: "+1.5 cm" },
          { label: "Head Circ.", value: "46 cm", sub: "70th percentile", icon: Brain, color: "text-pink-600", bg: "bg-pink-50", trend: "+0.5 cm" },
          { label: "Milestones", value: `${achievedMilestones}/${totalMilestones}`, sub: "on track", icon: Activity, color: "text-emerald-600", bg: "bg-emerald-50", trend: "Healthy" },
        ].map((s) => (
          <Card key={s.label} hover>
            <div className={`inline-flex p-2 rounded-xl ${s.bg} mb-3`}>
              <s.icon className={`w-5 h-5 ${s.color}`} />
            </div>
            <p className="text-2xl font-bold text-[#1a1a2e]">{s.value}</p>
            <p className="text-xs text-[#a0a0b8] mt-0.5">{s.label}</p>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="success" className="text-[10px]">↑ {s.trend}</Badge>
              <span className="text-xs text-[#a0a0b8]">{s.sub}</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <div className="flex gap-1 bg-[#f5f5f0] p-1 rounded-xl w-fit">
          {(["growth", "milestones", "sleep"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
                tab === t ? "bg-white text-[#7c6af7] shadow-sm" : "text-[#737373] hover:text-[#1a1a2e]"
              }`}
            >
              {t === "growth" ? "Growth Charts" : t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4" /> Export report
          </Button>
          <Button size="sm">
            <Plus className="w-4 h-4" /> Log measurement
          </Button>
        </div>
      </div>

      {/* Growth Charts Tab */}
      {tab === "growth" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div>
                <CardTitle>WHO Growth Chart</CardTitle>
                <CardDescription>Aria vs. WHO median reference for girls</CardDescription>
              </div>
              <div className="flex gap-1">
                {(["weight", "height", "headCirc"] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => setMetric(m)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      metric === m ? "bg-[#ede9fe] text-[#7c6af7]" : "text-[#737373] hover:bg-[#f5f5f0]"
                    }`}
                  >
                    {m === "headCirc" ? "Head" : m.charAt(0).toUpperCase() + m.slice(1)}
                  </button>
                ))}
              </div>
            </CardHeader>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="99%">
                <AreaChart data={growthData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorMetric" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={metricConfig[metric].color} stopOpacity={0.15} />
                      <stop offset="95%" stopColor={metricConfig[metric].color} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0ea" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#a0a0b8" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "#a0a0b8" }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ background: "white", border: "1px solid #e8e8e0", borderRadius: "12px", fontSize: "12px" }}
                    formatter={(v) => [`${v} ${metricConfig[metric].unit}`, metricConfig[metric].label]}
                  />
                  <Area
                    type="monotone"
                    dataKey={metric}
                    stroke={metricConfig[metric].color}
                    strokeWidth={2.5}
                    fill="url(#colorMetric)"
                    dot={{ fill: metricConfig[metric].color, r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#f5f5f0]">
              {[
                { label: "Current", value: `${growthData[growthData.length - 1][metric]} ${metricConfig[metric].unit}` },
                { label: "WHO Median (14m)", value: metric === "weight" ? "9.8 kg" : metric === "height" ? "75 cm" : "46.1 cm" },
                { label: "Percentile", value: metric === "weight" ? "65th" : metric === "height" ? "60th" : "70th" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-lg font-bold text-[#1a1a2e]">{s.value}</p>
                  <p className="text-xs text-[#a0a0b8]">{s.label}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Monthly records */}
          <Card>
            <CardHeader>
              <CardTitle>Measurement History</CardTitle>
              <Button size="sm" variant="soft"><Plus className="w-4 h-4" /> Add record</Button>
            </CardHeader>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#f0f0ea]">
                    {["Date", "Age", "Weight (kg)", "Height (cm)", "Head Circ. (cm)", "Notes"].map((h) => (
                      <th key={h} className="pb-3 text-left text-xs font-semibold text-[#a0a0b8] pr-6">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f5f5f0]">
                  {growthData.map((row, i) => (
                    <tr key={i} className="hover:bg-[#fafaf8] transition-colors">
                      <td className="py-3 text-[#1a1a2e] font-medium pr-6">{row.month} 2024</td>
                      <td className="py-3 text-[#737373] pr-6">{i < 2 ? `${i + 1}m` : `${i * 2 + 2}m`}</td>
                      <td className="py-3 text-[#1a1a2e] pr-6">{row.weight}</td>
                      <td className="py-3 text-[#1a1a2e] pr-6">{row.height}</td>
                      <td className="py-3 text-[#1a1a2e] pr-6">{row.headCirc}</td>
                      <td className="py-3">
                        {i === growthData.length - 1 && (
                          <Badge variant="success" className="text-[10px]">Latest</Badge>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {/* Milestones Tab */}
      {tab === "milestones" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {milestones.map((group, gi) => (
            <Card key={gi}>
              <CardHeader>
                <CardTitle>{group.category}</CardTitle>
                <Badge variant={group.items.filter((m) => m.achieved).length === group.items.length ? "success" : "purple"}>
                  {group.items.filter((m) => m.achieved).length}/{group.items.length}
                </Badge>
              </CardHeader>
              <Progress
                value={group.items.filter((m) => m.achieved).length}
                max={group.items.length}
                color={gi === 0 ? "purple" : gi === 1 ? "blue" : gi === 2 ? "pink" : "green"}
                className="mb-4"
              />
              <div className="space-y-2.5">
                {group.items.map((item, ii) => (
                  <div key={ii} className="flex items-start gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      item.achieved ? "bg-emerald-100" : "bg-[#f0f0ea]"
                    }`}>
                      {item.achieved
                        ? <span className="text-[10px] text-emerald-600">✓</span>
                        : <span className="text-[10px] text-[#c0c0c0]">○</span>}
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm ${item.achieved ? "text-[#1a1a2e] font-medium" : "text-[#a0a0b8]"}`}>
                        {item.name}
                      </p>
                      {item.achieved ? (
                        <p className="text-xs text-emerald-600">Achieved {(item as { date: string }).date} · {(item as { age: string }).age}</p>
                      ) : (
                        <p className="text-xs text-[#c0c0c0]">Expected: {(item as { expectedAge: string }).expectedAge}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Sleep Tab */}
      {tab === "sleep" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: "Avg night sleep", value: "10.8 hrs", sub: "Recommended: 10–14 hrs", icon: Moon, color: "text-indigo-600", bg: "bg-indigo-50" },
              { label: "Avg nap time", value: "1.7 hrs", sub: "1 nap per day", icon: Activity, color: "text-blue-600", bg: "bg-blue-50" },
              { label: "Total sleep", value: "12.5 hrs", sub: "WHO: 11–14 hrs ✓", icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-50" },
            ].map((s) => (
              <Card key={s.label}>
                <div className={`inline-flex p-2 rounded-xl ${s.bg} mb-3`}>
                  <s.icon className={`w-5 h-5 ${s.color}`} />
                </div>
                <p className="text-2xl font-bold text-[#1a1a2e]">{s.value}</p>
                <p className="text-xs text-[#a0a0b8] mt-0.5">{s.label}</p>
                <p className="text-xs text-emerald-600 mt-1">{s.sub}</p>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Sleep Pattern — Last 7 Days</CardTitle>
            </CardHeader>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="99%">
                <AreaChart data={sleepData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="night" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="nap" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0ea" />
                  <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#a0a0b8" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "#a0a0b8" }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: "white", border: "1px solid #e8e8e0", borderRadius: "12px", fontSize: "12px" }} />
                  <Legend wrapperStyle={{ fontSize: "12px" }} />
                  <Area type="monotone" dataKey="night" stroke="#6366f1" fill="url(#night)" strokeWidth={2} name="Night sleep" />
                  <Area type="monotone" dataKey="nap" stroke="#3b82f6" fill="url(#nap)" strokeWidth={2} name="Nap" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
