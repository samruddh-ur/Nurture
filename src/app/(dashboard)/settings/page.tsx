"use client";

import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Bell, Shield, CreditCard, Globe, Moon, Smartphone, ChevronRight, Check } from "lucide-react";

const settingsSections = [
  {
    title: "Profile",
    icon: "👤",
    items: ["Full name", "Email address", "Phone number", "Profile photo", "Language / region"],
  },
  {
    title: "Notifications",
    icon: "🔔",
    items: ["Vaccination reminders", "Appointment alerts", "Meal reminders", "Medication reminders", "Growth milestone alerts"],
  },
  {
    title: "Privacy & Security",
    icon: "🔒",
    items: ["Change password", "Two-factor authentication", "Connected devices", "Data export", "Delete account"],
  },
];

export default function SettingsPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">

      {/* Profile card */}
      <Card>
        <div className="flex items-center gap-4">
          <Avatar name="Sarah Johnson" size="xl" />
          <div className="flex-1">
            <h2 className="text-xl font-bold text-[#1a1a2e]">Sarah Johnson</h2>
            <p className="text-sm text-[#737373]">sarah@example.com</p>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="purple">Premium</Badge>
              <Badge variant="success" dot>Active</Badge>
            </div>
          </div>
          <Button variant="outline" size="sm">Edit profile</Button>
        </div>
      </Card>

      {/* Subscription */}
      <Card className="bg-gradient-to-br from-[#faf8ff] to-[#fdf2f8] border-[#ede9fe]">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-[#7c6af7]" />
            <CardTitle>Subscription</CardTitle>
          </div>
          <Badge variant="purple">Premium</Badge>
        </CardHeader>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-[#737373]">Plan</span>
            <span className="font-semibold text-[#1a1a2e]">Premium — $9.99/month</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-[#737373]">Next billing date</span>
            <span className="font-semibold text-[#1a1a2e]">July 1, 2025</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-[#737373]">Payment method</span>
            <span className="font-semibold text-[#1a1a2e]">Visa ending 4242</span>
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <Button variant="soft" size="sm">Upgrade to Family Plus</Button>
          <Button variant="ghost" size="sm">Manage billing</Button>
        </div>
      </Card>

      {/* Notification preferences */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-[#737373]" />
            <CardTitle>Notifications</CardTitle>
          </div>
        </CardHeader>
        <div className="space-y-4">
          {[
            { label: "Vaccination reminders", sub: "7 days and 1 day before due date", enabled: true },
            { label: "Doctor appointment alerts", sub: "24 hours before scheduled visits", enabled: true },
            { label: "Meal reminders", sub: "Log Aria's meals at scheduled times", enabled: false },
            { label: "Medication reminders", sub: "Reminders for logged prescriptions", enabled: true },
            { label: "Growth milestone alerts", sub: "When Aria hits a new milestone", enabled: true },
            { label: "Weekly summary email", sub: "Health & nutrition digest every Sunday", enabled: false },
          ].map((n, i) => (
            <div key={i} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#1a1a2e]">{n.label}</p>
                <p className="text-xs text-[#a0a0b8]">{n.sub}</p>
              </div>
              <div className={`relative w-10 h-6 rounded-full cursor-pointer transition-colors ${n.enabled ? "bg-[#7c6af7]" : "bg-[#e0e0e0]"}`}>
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${n.enabled ? "left-5" : "left-1"}`} />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Security */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#737373]" />
            <CardTitle>Security</CardTitle>
          </div>
        </CardHeader>
        <div className="space-y-2">
          {[
            { label: "Change password", desc: "Last changed 3 months ago" },
            { label: "Two-factor authentication", desc: "Not enabled", badge: "Recommended" },
            { label: "Active sessions", desc: "2 devices signed in" },
            { label: "Export my data", desc: "Download a copy of all your data" },
          ].map((item, i) => (
            <button key={i} className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-[#f5f5f0] transition-colors text-left">
              <div>
                <p className="text-sm font-medium text-[#1a1a2e]">{item.label}</p>
                <p className="text-xs text-[#a0a0b8]">{item.desc}</p>
              </div>
              <div className="flex items-center gap-2">
                {item.badge && <Badge variant="warning" className="text-[10px]">{item.badge}</Badge>}
                <ChevronRight className="w-4 h-4 text-[#c0c0c0]" />
              </div>
            </button>
          ))}
        </div>
      </Card>

      {/* Danger zone */}
      <Card className="border-red-200 bg-red-50">
        <CardTitle className="text-red-600 mb-3">Danger zone</CardTitle>
        <p className="text-xs text-red-500 mb-4">These actions are irreversible. Please be sure before proceeding.</p>
        <div className="flex gap-2">
          <Button variant="danger" size="sm">Delete all data</Button>
          <Button variant="danger" size="sm">Close account</Button>
        </div>
      </Card>
    </div>
  );
}
