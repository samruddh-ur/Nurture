"use client";

import { Bell, Search, Plus } from "lucide-react";
import { MobileSidebarToggle } from "./sidebar";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface TopbarProps {
  title: string;
  subtitle?: string;
  onSidebarOpen: () => void;
  action?: React.ReactNode;
}

export function Topbar({ title, subtitle, onSidebarOpen, action }: TopbarProps) {
  const [notifOpen, setNotifOpen] = useState(false);

  return (
    <header className="h-16 flex items-center gap-4 px-4 md:px-6 bg-white border-b border-[#f0f0ea] sticky top-0 z-30">
      <MobileSidebarToggle onOpen={onSidebarOpen} />

      <div className="flex-1 min-w-0">
        <h1 className="text-lg font-bold text-[#1a1a2e] leading-tight truncate">{title}</h1>
        {subtitle && <p className="text-xs text-[#a0a0b8] hidden sm:block">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-2">
        {action}

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="relative p-2 rounded-xl hover:bg-[#f5f5f0] text-[#737373] transition-colors"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#7c6af7] rounded-full border-2 border-white" />
          </button>

          {notifOpen && (
            <div className="absolute right-0 top-12 w-80 bg-white rounded-2xl shadow-xl border border-[#e8e8e0] z-50 overflow-hidden">
              <div className="p-4 border-b border-[#f0f0ea] flex items-center justify-between">
                <h3 className="font-semibold text-sm text-[#1a1a2e]">Notifications</h3>
                <Badge variant="purple">3 new</Badge>
              </div>
              <div className="divide-y divide-[#f5f5f0] max-h-72 overflow-y-auto">
                {[
                  { icon: "💉", title: "Vaccination due in 3 days", body: "Aria's MMR vaccine is coming up", time: "2h ago", unread: true },
                  { icon: "🍽️", title: "Lunch reminder", body: "Time to log Aria's lunch", time: "4h ago", unread: true },
                  { icon: "📏", title: "Growth milestone!", body: "Aria hit 10kg — great progress!", time: "1d ago", unread: true },
                  { icon: "👨‍⚕️", title: "Appointment tomorrow", body: "Dr. Patel checkup at 10:00 AM", time: "2d ago", unread: false },
                ].map((n, i) => (
                  <button key={i} className="w-full flex gap-3 p-4 hover:bg-[#fafaf8] text-left transition-colors">
                    <span className="text-xl flex-shrink-0">{n.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm ${n.unread ? "font-semibold text-[#1a1a2e]" : "text-[#737373]"}`}>
                        {n.title}
                      </p>
                      <p className="text-xs text-[#a0a0b8] mt-0.5 truncate">{n.body}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1 flex-shrink-0">
                      <span className="text-[10px] text-[#a0a0b8]">{n.time}</span>
                      {n.unread && <span className="w-2 h-2 rounded-full bg-[#7c6af7]" />}
                    </div>
                  </button>
                ))}
              </div>
              <div className="p-3 border-t border-[#f0f0ea]">
                <button className="w-full text-center text-xs text-[#7c6af7] font-medium py-1 hover:underline">
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
