"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import {
  Users, Plus, Calendar, Milk, Moon, Pill, Activity,
  MessageSquare, Edit, Trash2, Crown, Shield, Eye,
  ChevronRight, Clock
} from "lucide-react";

const caregivers = [
  {
    name: "Sarah Johnson", role: "parent", email: "sarah@example.com",
    avatar: undefined, status: "online", joined: "Aug 2023",
    permissions: ["Full access"],
  },
  {
    name: "Michael Johnson", role: "co-parent", email: "michael@example.com",
    avatar: undefined, status: "offline", joined: "Aug 2023",
    permissions: ["Full access"],
  },
  {
    name: "Linda Johnson", role: "grandparent", email: "linda@example.com",
    avatar: undefined, status: "offline", joined: "Oct 2023",
    permissions: ["View logs", "Add logs"],
  },
  {
    name: "Emily Chen", role: "nanny", email: "emily@nannycare.com",
    avatar: undefined, status: "online", joined: "Jan 2024",
    permissions: ["Add logs", "View schedule"],
  },
];

const roleConfig: Record<string, { label: string; variant: "purple" | "success" | "info" | "soft"; icon: typeof Crown }> = {
  parent: { label: "Parent", variant: "purple", icon: Crown },
  "co-parent": { label: "Co-Parent", variant: "purple", icon: Crown },
  grandparent: { label: "Grandparent", variant: "info", icon: Eye },
  nanny: { label: "Nanny", variant: "soft", icon: Shield },
};

const sharedLogs = [
  { type: "feeding", icon: "🍼", caregiver: "Emily Chen", action: "Formula feeding · 180ml", time: "8:15 AM", detail: "Aria drank all of it!" },
  { type: "sleep", icon: "😴", caregiver: "Emily Chen", action: "Morning nap started", time: "9:30 AM", detail: "" },
  { type: "sleep", icon: "😴", caregiver: "Emily Chen", action: "Morning nap ended · 1h 45m", time: "11:15 AM", detail: "Slept well" },
  { type: "feeding", icon: "🥣", caregiver: "Sarah Johnson", action: "Lunch: sweet potato mash, peas", time: "12:45 PM", detail: "Ate about 70%" },
  { type: "activity", icon: "🏃", caregiver: "Michael Johnson", action: "Outdoor walk · 30 min", time: "2:30 PM", detail: "Park visit, enjoyed swings" },
  { type: "medication", icon: "💊", caregiver: "Sarah Johnson", action: "Vitamin D drops · 400 IU", time: "7:00 PM", detail: "" },
];

const logTypeColors: Record<string, string> = {
  feeding: "bg-blue-50",
  sleep: "bg-indigo-50",
  activity: "bg-green-50",
  medication: "bg-pink-50",
  diaper: "bg-amber-50",
};

const calendarEvents = [
  { title: "Dr. Patel checkup", date: "Jun 5", time: "10:00 AM", type: "medical", caregiver: "Sarah" },
  { title: "Nanny shift starts", date: "Jun 6", time: "8:00 AM", type: "care", caregiver: "Emily" },
  { title: "Grandma's babysitting", date: "Jun 7", time: "2:00 PM", type: "care", caregiver: "Linda" },
  { title: "MMR Vaccine due", date: "Jun 10", time: "11:30 AM", type: "medical", caregiver: "Sarah" },
  { title: "Playdate — Lucy & James", date: "Jun 12", time: "3:00 PM", type: "activity", caregiver: "Michael" },
];

export default function FamilyPage() {
  const [tab, setTab] = useState<"caregivers" | "logs" | "calendar">("caregivers");

  return (
    <div className="max-w-5xl mx-auto space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            {caregivers.slice(0, 3).map((c) => (
              <Avatar key={c.name} name={c.name} size="sm" className="border-2 border-white" />
            ))}
            <div className="w-8 h-8 rounded-full bg-[#ede9fe] border-2 border-white flex items-center justify-center">
              <span className="text-xs font-bold text-[#7c6af7]">+1</span>
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-[#1a1a2e]">4 caregivers active</p>
            <p className="text-xs text-[#a0a0b8]">Caring for Aria Johnson</p>
          </div>
        </div>
        <Button size="sm">
          <Plus className="w-4 h-4" /> Invite caregiver
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-[#f5f5f0] p-1 rounded-xl w-fit">
        {(["caregivers", "logs", "calendar"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
              tab === t ? "bg-white text-[#7c6af7] shadow-sm" : "text-[#737373] hover:text-[#1a1a2e]"
            }`}
          >
            {t === "logs" ? "Shared Logs" : t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {/* Caregivers Tab */}
      {tab === "caregivers" && (
        <div className="space-y-4">
          {caregivers.map((c) => {
            const config = roleConfig[c.role];
            const RoleIcon = config.icon;
            return (
              <Card key={c.name} padding="sm" hover>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Avatar name={c.name} size="md" />
                    <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                      c.status === "online" ? "bg-emerald-400" : "bg-[#d0d0d0]"
                    }`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-[#1a1a2e]">{c.name}</p>
                      <Badge variant={config.variant} className="text-[10px]">
                        <RoleIcon className="w-2.5 h-2.5 mr-1" />
                        {config.label}
                      </Badge>
                    </div>
                    <p className="text-xs text-[#a0a0b8]">{c.email}</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {c.permissions.map((p) => (
                        <Badge key={p} variant="soft" className="text-[10px] px-1.5 py-0">{p}</Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 hidden sm:flex">
                    <span className="text-xs text-[#a0a0b8]">Since {c.joined}</span>
                    <button className="p-2 rounded-lg hover:bg-[#f5f5f0] text-[#a0a0b8] hover:text-[#737373]">
                      <Edit className="w-4 h-4" />
                    </button>
                    {c.role !== "parent" && (
                      <button className="p-2 rounded-lg hover:bg-red-50 text-[#a0a0b8] hover:text-red-500">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}

          {/* Permissions overview */}
          <Card>
            <CardHeader>
              <CardTitle>Permission Overview</CardTitle>
            </CardHeader>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#f0f0ea]">
                    <th className="pb-3 text-left text-xs font-semibold text-[#a0a0b8] pr-6">Permission</th>
                    <th className="pb-3 text-center text-xs font-semibold text-[#a0a0b8] pr-4">Parent</th>
                    <th className="pb-3 text-center text-xs font-semibold text-[#a0a0b8] pr-4">Co-Parent</th>
                    <th className="pb-3 text-center text-xs font-semibold text-[#a0a0b8] pr-4">Grandparent</th>
                    <th className="pb-3 text-center text-xs font-semibold text-[#a0a0b8]">Nanny</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f5f5f0]">
                  {[
                    { perm: "View all records", parent: true, coParent: true, gp: true, nanny: false },
                    { perm: "Add feeding / sleep logs", parent: true, coParent: true, gp: true, nanny: true },
                    { perm: "Add medications", parent: true, coParent: true, gp: false, nanny: false },
                    { perm: "Edit child profile", parent: true, coParent: true, gp: false, nanny: false },
                    { perm: "Manage documents", parent: true, coParent: true, gp: false, nanny: false },
                    { perm: "Schedule appointments", parent: true, coParent: true, gp: false, nanny: false },
                    { perm: "Invite caregivers", parent: true, coParent: false, gp: false, nanny: false },
                  ].map((row) => (
                    <tr key={row.perm} className="hover:bg-[#fafaf8]">
                      <td className="py-2.5 text-[#737373] pr-6">{row.perm}</td>
                      {[row.parent, row.coParent, row.gp, row.nanny].map((v, i) => (
                        <td key={i} className="py-2.5 text-center pr-4">
                          <span className={`text-base ${v ? "text-emerald-500" : "text-[#e0e0e0]"}`}>
                            {v ? "✓" : "✕"}
                          </span>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {/* Shared Logs Tab */}
      {tab === "logs" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-[#737373]">Today&apos;s activity log · {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</p>
            <div className="flex gap-2">
              {["feeding", "sleep", "activity", "medication"].map((t) => (
                <button
                  key={t}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#e8e8e0] text-xs text-[#737373] hover:border-[#7c6af7] hover:text-[#7c6af7] transition-all"
                >
                  + {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            {sharedLogs.map((log, i) => (
              <Card key={i} padding="sm">
                <div className="flex items-start gap-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0 ${logTypeColors[log.type] || "bg-[#f5f5f0]"}`}>
                    {log.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-[#1a1a2e]">{log.action}</p>
                    </div>
                    {log.detail && <p className="text-xs text-[#737373] mt-0.5">"{log.detail}"</p>}
                    <div className="flex items-center gap-2 mt-1">
                      <Avatar name={log.caregiver} size="xs" />
                      <span className="text-xs text-[#a0a0b8]">{log.caregiver}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-[#a0a0b8] flex-shrink-0">
                    <Clock className="w-3 h-3" />
                    <span className="text-xs">{log.time}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Calendar Tab */}
      {tab === "calendar" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-[#1a1a2e]">June 2025</h3>
            <Button size="sm">
              <Plus className="w-4 h-4" /> Add event
            </Button>
          </div>

          <div className="space-y-3">
            {calendarEvents.map((event, i) => (
              <Card key={i} padding="sm" hover>
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center flex-shrink-0 ${
                    event.type === "medical" ? "bg-red-50 text-red-600" :
                    event.type === "care" ? "bg-blue-50 text-blue-600" :
                    "bg-green-50 text-green-600"
                  }`}>
                    <span className="text-xs font-bold">{event.date.split(" ")[1]}</span>
                    <span className="text-[9px] font-medium">{event.date.split(" ")[0]}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-[#1a1a2e]">{event.title}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Clock className="w-3 h-3 text-[#a0a0b8]" />
                      <span className="text-xs text-[#a0a0b8]">{event.time}</span>
                      <span className="text-xs text-[#d0d0d0]">·</span>
                      <Avatar name={event.caregiver} size="xs" />
                      <span className="text-xs text-[#a0a0b8]">{event.caregiver}</span>
                    </div>
                  </div>
                  <Badge variant={event.type === "medical" ? "danger" : event.type === "care" ? "info" : "success"} className="flex-shrink-0">
                    {event.type}
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
