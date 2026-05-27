"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Baby, Users, CreditCard, TrendingUp, AlertCircle, CheckCircle2, BarChart3, Settings, LogOut, Shield } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

const growthData = [
  { m: "Jan", users: 820, revenue: 4200 },
  { m: "Feb", users: 1050, revenue: 5800 },
  { m: "Mar", users: 1380, revenue: 7400 },
  { m: "Apr", users: 1920, revenue: 9800 },
  { m: "May", users: 2410, revenue: 13200 },
  { m: "Jun", users: 3150, revenue: 17800 },
];

const recentUsers = [
  { name: "Sarah Johnson", email: "sarah@example.com", plan: "premium", children: 1, joined: "2h ago", status: "active" },
  { name: "Michael Chen", email: "mchen@example.com", plan: "family", children: 3, joined: "5h ago", status: "active" },
  { name: "Priya Sharma", email: "priya@example.com", plan: "free", children: 1, joined: "8h ago", status: "active" },
  { name: "James Wilson", email: "james@example.com", plan: "premium", children: 2, joined: "12h ago", status: "active" },
  { name: "Ana Rodriguez", email: "ana@example.com", plan: "free", children: 1, joined: "1d ago", status: "pending" },
];

const tickets = [
  { id: "TK-0182", user: "Maria Santos", subject: "Vaccination reminder not working", priority: "high", status: "open", time: "2h ago" },
  { id: "TK-0181", user: "Tom Baker", subject: "Unable to export vaccination certificate", priority: "medium", status: "in-progress", time: "4h ago" },
  { id: "TK-0180", user: "Lisa Kim", subject: "AI nutrition plan not updating", priority: "medium", status: "resolved", time: "1d ago" },
];

export default function AdminPage() {
  const [tab, setTab] = useState<"overview" | "users" | "tickets">("overview");

  return (
    <div className="min-h-screen bg-[#0f0f1a] text-white">
      {/* Admin header */}
      <header className="border-b border-white/10 px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#7c6af7] to-[#e879a8] flex items-center justify-center">
            <Baby className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-lg">nurtura</span>
          <Badge className="bg-white/10 text-white/70 border-0 text-xs">Admin Portal</Badge>
        </div>
        <div className="flex items-center gap-3">
          <Avatar name="Admin" size="sm" />
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="text-white/60 hover:text-white hover:bg-white/10">
              <LogOut className="w-4 h-4" /> Exit admin
            </Button>
          </Link>
        </div>
      </header>

      <div className="flex">
        {/* Admin sidebar */}
        <aside className="w-52 border-r border-white/10 min-h-[calc(100vh-64px)] p-3">
          {[
            { label: "Overview", icon: BarChart3, id: "overview" },
            { label: "Users", icon: Users, id: "users" },
            { label: "Support", icon: AlertCircle, id: "tickets" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setTab(item.id as typeof tab)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all mb-0.5 ${
                tab === item.id ? "bg-white/10 text-white" : "text-white/50 hover:text-white hover:bg-white/5"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </aside>

        {/* Main */}
        <main className="flex-1 p-6 space-y-6">

          {tab === "overview" && (
            <>
              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "Total Users", value: "12,483", change: "+18%", icon: Users, color: "from-violet-500 to-indigo-600" },
                  { label: "Active Children", value: "14,921", change: "+22%", icon: Baby, color: "from-pink-500 to-rose-600" },
                  { label: "MRR", value: "$28,450", change: "+31%", icon: CreditCard, color: "from-emerald-500 to-teal-600" },
                  { label: "Premium Users", value: "3,847", change: "+15%", icon: Shield, color: "from-amber-500 to-orange-600" },
                ].map((stat) => (
                  <div key={stat.label} className={`rounded-2xl bg-gradient-to-br ${stat.color} p-5`}>
                    <div className="flex items-center justify-between mb-3">
                      <stat.icon className="w-5 h-5 text-white/80" />
                      <span className="text-xs font-medium bg-white/20 px-2 py-0.5 rounded-full">{stat.change}</span>
                    </div>
                    <p className="text-2xl font-extrabold text-white">{stat.value}</p>
                    <p className="text-xs text-white/70 mt-0.5">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-[#1a1a2e] rounded-2xl border border-white/10 p-5">
                  <p className="text-sm font-semibold text-white mb-4">User Growth</p>
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="99%">
                      <LineChart data={growthData}>
                        <XAxis dataKey="m" tick={{ fontSize: 10, fill: "#a0a0b8" }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fontSize: 10, fill: "#a0a0b8" }} axisLine={false} tickLine={false} />
                        <Tooltip contentStyle={{ background: "#1a1a2e", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", color: "#fff", fontSize: "12px" }} />
                        <Line type="monotone" dataKey="users" stroke="#7c6af7" strokeWidth={2.5} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-[#1a1a2e] rounded-2xl border border-white/10 p-5">
                  <p className="text-sm font-semibold text-white mb-4">Monthly Revenue</p>
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="99%">
                      <BarChart data={growthData}>
                        <XAxis dataKey="m" tick={{ fontSize: 10, fill: "#a0a0b8" }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fontSize: 10, fill: "#a0a0b8" }} axisLine={false} tickLine={false} />
                        <Tooltip contentStyle={{ background: "#1a1a2e", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", color: "#fff", fontSize: "12px" }} />
                        <Bar dataKey="revenue" fill="#e879a8" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Plan breakdown */}
              <div className="bg-[#1a1a2e] rounded-2xl border border-white/10 p-5">
                <p className="text-sm font-semibold text-white mb-4">Plan Distribution</p>
                <div className="space-y-3">
                  {[
                    { plan: "Free", count: 7492, pct: 60, color: "bg-[#4a4a6a]" },
                    { plan: "Premium", count: 3847, pct: 31, color: "bg-[#7c6af7]" },
                    { plan: "Family Plus", count: 1144, pct: 9, color: "bg-[#e879a8]" },
                  ].map((p) => (
                    <div key={p.plan} className="flex items-center gap-3">
                      <span className="text-xs text-white/60 w-16">{p.plan}</span>
                      <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${p.color}`} style={{ width: `${p.pct}%` }} />
                      </div>
                      <span className="text-xs text-white/80 w-16 text-right">{p.count.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {tab === "users" && (
            <div className="bg-[#1a1a2e] rounded-2xl border border-white/10 overflow-hidden">
              <div className="p-5 flex items-center justify-between border-b border-white/10">
                <p className="font-semibold text-white">Recent Users</p>
                <Badge className="bg-white/10 text-white/70 border-0">12,483 total</Badge>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/5">
                      {["User", "Plan", "Children", "Joined", "Status"].map((h) => (
                        <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-white/40">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {recentUsers.map((u, i) => (
                      <tr key={i} className="hover:bg-white/3 transition-colors">
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-2">
                            <Avatar name={u.name} size="sm" />
                            <div>
                              <p className="text-white font-medium text-xs">{u.name}</p>
                              <p className="text-white/40 text-xs">{u.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-3">
                          <Badge className={`text-[10px] ${u.plan === "premium" ? "bg-violet-500/20 text-violet-300" : u.plan === "family" ? "bg-pink-500/20 text-pink-300" : "bg-white/10 text-white/50"} border-0`}>
                            {u.plan}
                          </Badge>
                        </td>
                        <td className="px-5 py-3 text-white/60 text-xs">{u.children}</td>
                        <td className="px-5 py-3 text-white/60 text-xs">{u.joined}</td>
                        <td className="px-5 py-3">
                          <Badge className={`text-[10px] border-0 ${u.status === "active" ? "bg-emerald-500/20 text-emerald-300" : "bg-amber-500/20 text-amber-300"}`}>
                            {u.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {tab === "tickets" && (
            <div className="space-y-3">
              {tickets.map((t) => (
                <div key={t.id} className="bg-[#1a1a2e] rounded-2xl border border-white/10 p-4 flex items-center gap-4">
                  <div className={`w-2 h-10 rounded-full flex-shrink-0 ${
                    t.priority === "high" ? "bg-red-500" : t.priority === "medium" ? "bg-amber-500" : "bg-green-500"
                  }`} />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-mono text-white/40">{t.id}</p>
                      <Badge className={`text-[10px] border-0 ${
                        t.status === "open" ? "bg-red-500/20 text-red-300" :
                        t.status === "in-progress" ? "bg-amber-500/20 text-amber-300" :
                        "bg-green-500/20 text-green-300"
                      }`}>{t.status}</Badge>
                    </div>
                    <p className="text-sm text-white font-medium">{t.subject}</p>
                    <p className="text-xs text-white/40">{t.user} · {t.time}</p>
                  </div>
                  <Button variant="ghost" size="sm" className="text-white/50 hover:text-white hover:bg-white/10">
                    View
                  </Button>
                </div>
              ))}
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
