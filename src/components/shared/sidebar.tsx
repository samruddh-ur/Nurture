"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Users, Utensils, HeartPulse, Syringe,
  TrendingUp, FolderLock, Home, Settings, Bell, LogOut,
  ChevronDown, Sparkles, Baby, X, Menu
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Children", href: "/children", icon: Baby },
  { name: "Nutrition", href: "/nutrition", icon: Utensils, badge: "AI" },
  { name: "BabyGPT", href: "/health", icon: Sparkles, badge: "AI" },
  { name: "Vaccinations", href: "/vaccinations", icon: Syringe },
  { name: "Growth", href: "/growth", icon: TrendingUp },
  { name: "Documents", href: "/documents", icon: FolderLock },
  { name: "Family Hub", href: "/family", icon: Home },
];

const bottomNav = [
  { name: "Settings", href: "/settings", icon: Settings },
];

interface SidebarProps {
  mobile?: boolean;
  onClose?: () => void;
}

export function Sidebar({ mobile, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "flex flex-col h-full w-64 bg-white border-r border-[#e8e8e0]",
        mobile && "fixed inset-y-0 left-0 z-50 shadow-2xl"
      )}
    >
      {/* Logo */}
      <div className="flex items-center justify-between h-16 px-6 border-b border-[#f0f0ea]">
        <Link href="/dashboard" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#7c6af7] to-[#e879a8] flex items-center justify-center shadow-sm">
            <Baby className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight text-[#1a1a2e]">nurtura</span>
        </Link>
        {mobile && (
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-[#f5f5f0] text-[#737373]">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Child selector */}
      <div className="px-4 pt-4 pb-2">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl bg-[#f5f5f0] hover:bg-[#ede9fe] transition-colors group">
          <Avatar name="Aria" size="sm" />
          <div className="flex-1 text-left">
            <p className="text-sm font-semibold text-[#1a1a2e]">Aria Johnson</p>
            <p className="text-xs text-[#737373]">14 months</p>
          </div>
          <ChevronDown className="w-4 h-4 text-[#a0a0b8] group-hover:text-[#7c6af7] transition-colors" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-2 overflow-y-auto">
        <div className="space-y-0.5">
          {navigation.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150",
                  active
                    ? "bg-[#ede9fe] text-[#7c6af7]"
                    : "text-[#737373] hover:bg-[#f5f5f0] hover:text-[#1a1a2e]"
                )}
              >
                <item.icon className={cn("w-5 h-5 flex-shrink-0", active ? "text-[#7c6af7]" : "text-[#a0a0b8]")} />
                <span className="flex-1">{item.name}</span>
                {item.badge && (
                  <Badge variant="purple" className="text-[10px] px-1.5 py-0">
                    {item.badge}
                  </Badge>
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Bottom */}
      <div className="px-3 pb-4 space-y-0.5 border-t border-[#f0f0ea] pt-3">
        {bottomNav.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={onClose}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                active ? "bg-[#ede9fe] text-[#7c6af7]" : "text-[#737373] hover:bg-[#f5f5f0] hover:text-[#1a1a2e]"
              )}
            >
              <item.icon className="w-5 h-5 text-[#a0a0b8]" />
              {item.name}
            </Link>
          );
        })}

        {/* User */}
        <div className="flex items-center gap-3 px-3 py-2.5 mt-1">
          <Avatar name="Sarah Johnson" size="sm" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-[#1a1a2e] truncate">Sarah Johnson</p>
            <p className="text-xs text-[#a0a0b8]">Premium</p>
          </div>
          <button className="p-1.5 rounded-lg hover:bg-[#f5f5f0] text-[#a0a0b8] hover:text-[#737373]">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}

export function MobileSidebarToggle({ onOpen }: { onOpen: () => void }) {
  return (
    <button
      onClick={onOpen}
      className="lg:hidden p-2 rounded-xl hover:bg-[#f5f5f0] text-[#737373]"
    >
      <Menu className="w-5 h-5" />
    </button>
  );
}
