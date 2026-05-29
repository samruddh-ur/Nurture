"use client";

import { useState } from "react";
import { Sidebar } from "@/components/shared/sidebar";
import { Topbar } from "@/components/shared/topbar";
import { usePathname } from "next/navigation";

const pageMeta: Record<string, { title: string; subtitle: string }> = {
  "/dashboard": { title: "Dashboard", subtitle: "" },
  "/children": { title: "Children", subtitle: "Manage child profiles" },
  "/nutrition": { title: "Nutrition", subtitle: "AI-powered meal planning" },
  "/health": { title: "BabyGPT", subtitle: "Your AI parenting companion" },
  "/vaccinations": { title: "Vaccinations", subtitle: "Immunization schedule and history" },
  "/growth": { title: "Growth & Development", subtitle: "Track milestones and growth trends" },
  "/documents": { title: "Baby Passport", subtitle: "Secure document vault" },
  "/family": { title: "Family Hub", subtitle: "Caregivers and shared logs" },
  "/settings": { title: "Settings", subtitle: "Account and preferences" },
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const meta = pageMeta[pathname] || { title: "Nurtura", subtitle: "" };

  return (
    <div className="flex h-screen bg-[#fafaf8] overflow-hidden">
      {/* Desktop sidebar */}
      <div className="hidden lg:flex">
        <Sidebar />
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
          <Sidebar mobile onClose={() => setSidebarOpen(false)} />
        </>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Topbar
          title={meta.title}
          subtitle={meta.subtitle}
          onSidebarOpen={() => setSidebarOpen(true)}
        />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
