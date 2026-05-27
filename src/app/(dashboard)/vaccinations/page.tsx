"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Syringe, CheckCircle2, Clock, AlertCircle, Calendar,
  Download, Plus, ChevronRight, Bell, Shield
} from "lucide-react";

type VaccineStatus = "completed" | "due" | "upcoming" | "overdue";

interface VaccineEntry {
  name: string;
  fullName: string;
  status: VaccineStatus;
  date?: string;
  dueDate?: string;
  daysLeft?: number;
}

const vaccineSchedule: { ageGroup: string; vaccines: VaccineEntry[] }[] = [
  {
    ageGroup: "Birth",
    vaccines: [
      { name: "BCG", fullName: "Tuberculosis", date: "Aug 15, 2023", status: "completed" },
      { name: "Hep B (1st)", fullName: "Hepatitis B", date: "Aug 15, 2023", status: "completed" },
      { name: "OPV-0", fullName: "Oral Polio", date: "Aug 15, 2023", status: "completed" },
    ],
  },
  {
    ageGroup: "6 Weeks",
    vaccines: [
      { name: "DTwP / DTaP (1st)", fullName: "Diphtheria, Tetanus, Pertussis", date: "Sep 26, 2023", status: "completed" },
      { name: "Hep B (2nd)", fullName: "Hepatitis B", date: "Sep 26, 2023", status: "completed" },
      { name: "Hib (1st)", fullName: "Haemophilus influenzae type b", date: "Sep 26, 2023", status: "completed" },
      { name: "IPV (1st)", fullName: "Inactivated Polio", date: "Sep 26, 2023", status: "completed" },
    ],
  },
  {
    ageGroup: "10 Weeks",
    vaccines: [
      { name: "DTwP / DTaP (2nd)", fullName: "Diphtheria, Tetanus, Pertussis", date: "Oct 24, 2023", status: "completed" },
      { name: "Hib (2nd)", fullName: "Haemophilus influenzae type b", date: "Oct 24, 2023", status: "completed" },
      { name: "IPV (2nd)", fullName: "Inactivated Polio", date: "Oct 24, 2023", status: "completed" },
    ],
  },
  {
    ageGroup: "12 Months",
    vaccines: [
      { name: "MMR (1st)", fullName: "Measles, Mumps, Rubella", date: "Aug 15, 2024", status: "completed" },
      { name: "Chickenpox (1st)", fullName: "Varicella", date: "Aug 15, 2024", status: "completed" },
    ],
  },
  {
    ageGroup: "15 Months",
    vaccines: [
      { name: "MMR (2nd)", fullName: "Measles, Mumps, Rubella", dueDate: "Nov 15, 2024", status: "due", daysLeft: 7 },
      { name: "Varicella (2nd)", fullName: "Chickenpox booster", dueDate: "Nov 15, 2024", status: "upcoming", daysLeft: 49 },
      { name: "DTwP Booster", fullName: "Diphtheria, Tetanus, Pertussis", dueDate: "Nov 15, 2024", status: "upcoming", daysLeft: 49 },
    ],
  },
  {
    ageGroup: "18 Months",
    vaccines: [
      { name: "Hep A (2nd)", fullName: "Hepatitis A", dueDate: "Feb 15, 2025", status: "upcoming", daysLeft: 85 },
      { name: "IPV (Booster)", fullName: "Inactivated Polio", dueDate: "Feb 15, 2025", status: "upcoming", daysLeft: 85 },
    ],
  },
];

const completedCount = vaccineSchedule.flatMap((g) => g.vaccines).filter((v) => v.status === "completed").length;
const totalCount = vaccineSchedule.flatMap((g) => g.vaccines).length;
const dueCount = vaccineSchedule.flatMap((g) => g.vaccines).filter((v) => v.status === "due").length;
const upcomingCount = vaccineSchedule.flatMap((g) => g.vaccines).filter((v) => v.status === "upcoming").length;

const statusConfig = {
  completed: { label: "Completed", variant: "success" as const, icon: CheckCircle2, color: "text-emerald-500" },
  due: { label: "Due soon", variant: "warning" as const, icon: AlertCircle, color: "text-amber-500" },
  upcoming: { label: "Upcoming", variant: "info" as const, icon: Clock, color: "text-blue-500" },
  overdue: { label: "Overdue", variant: "danger" as const, icon: AlertCircle, color: "text-red-500" },
};

export default function VaccinationsPage() {
  const [view, setView] = useState<"schedule" | "history">("schedule");

  return (
    <div className="max-w-5xl mx-auto space-y-6">

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="col-span-2 lg:col-span-1 bg-gradient-to-br from-emerald-500 to-teal-600 text-white border-0">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-white/20 rounded-xl">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold">{completedCount}</p>
              <p className="text-xs text-white/70">Vaccines given</p>
            </div>
          </div>
          <Progress value={completedCount} max={totalCount} color="green" />
          <p className="text-xs text-white/70 mt-2">{Math.round((completedCount / totalCount) * 100)}% of schedule complete</p>
        </Card>

        {[
          { label: "Due soon", count: dueCount, variant: "warning" as const, icon: AlertCircle, bg: "bg-amber-50", text: "text-amber-600" },
          { label: "Upcoming", count: upcomingCount, variant: "info" as const, icon: Clock, bg: "bg-blue-50", text: "text-blue-600" },
          { label: "Total vaccines", count: totalCount, variant: "default" as const, icon: Syringe, bg: "bg-[#ede9fe]", text: "text-[#7c6af7]" },
        ].map((stat) => (
          <Card key={stat.label}>
            <div className={`inline-flex p-2 rounded-xl ${stat.bg} mb-3`}>
              <stat.icon className={`w-5 h-5 ${stat.text}`} />
            </div>
            <p className="text-2xl font-bold text-[#1a1a2e]">{stat.count}</p>
            <p className="text-xs text-[#a0a0b8]">{stat.label}</p>
          </Card>
        ))}
      </div>

      {/* Due soon alert */}
      {dueCount > 0 && (
        <div className="flex items-center gap-4 p-4 rounded-2xl bg-amber-50 border border-amber-200">
          <div className="p-2.5 bg-amber-100 rounded-xl flex-shrink-0">
            <Bell className="w-5 h-5 text-amber-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-amber-800">MMR (2nd dose) is due in 7 days</p>
            <p className="text-xs text-amber-600">Schedule an appointment with Dr. Patel before Nov 15</p>
          </div>
          <Button size="sm" className="bg-amber-500 hover:bg-amber-600 text-white border-0 flex-shrink-0">
            <Calendar className="w-4 h-4" /> Schedule
          </Button>
        </div>
      )}

      {/* View toggle + actions */}
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <div className="flex gap-1 bg-[#f5f5f0] p-1 rounded-xl w-fit">
          {(["schedule", "history"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
                view === v ? "bg-white text-[#7c6af7] shadow-sm" : "text-[#737373] hover:text-[#1a1a2e]"
              }`}
            >
              {v === "schedule" ? "Full Schedule" : "History"}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4" /> Export certificate
          </Button>
          <Button size="sm">
            <Plus className="w-4 h-4" /> Log vaccination
          </Button>
        </div>
      </div>

      {/* Vaccine schedule */}
      <div className="space-y-6">
        {vaccineSchedule.map((group, gi) => (
          <div key={gi}>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-sm font-bold text-[#1a1a2e]">{group.ageGroup}</span>
              <div className="flex-1 h-px bg-[#f0f0ea]" />
              <Badge variant="soft" className="text-xs">
                {group.vaccines.filter((v) => v.status === "completed").length}/{group.vaccines.length} done
              </Badge>
            </div>
            <div className="space-y-2">
              {group.vaccines.map((vaccine, vi) => {
                const config = statusConfig[vaccine.status as keyof typeof statusConfig];
                const StatusIcon = config.icon;
                return (
                  <Card key={vi} padding="sm" hover className={`border-l-4 ${
                    vaccine.status === "completed" ? "border-l-emerald-400" :
                    vaccine.status === "due" ? "border-l-amber-400" :
                    vaccine.status === "overdue" ? "border-l-red-400" :
                    "border-l-blue-300"
                  }`}>
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-xl flex-shrink-0 ${
                        vaccine.status === "completed" ? "bg-emerald-50" :
                        vaccine.status === "due" ? "bg-amber-50" :
                        "bg-blue-50"
                      }`}>
                        <Syringe className={`w-4 h-4 ${config.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold text-[#1a1a2e]">{vaccine.name}</p>
                          <Badge variant={config.variant} dot className="text-[10px]">
                            {config.label}
                          </Badge>
                        </div>
                        <p className="text-xs text-[#a0a0b8]">{vaccine.fullName}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        {vaccine.status === "completed" ? (
                          <div className="flex items-center gap-1 text-emerald-600">
                            <CheckCircle2 className="w-4 h-4" />
                            <span className="text-xs font-medium">{vaccine.date}</span>
                          </div>
                        ) : (
                          <div>
                            <p className="text-xs text-[#a0a0b8]">Due: {vaccine.dueDate}</p>
                            {vaccine.daysLeft != null && (
                              <Badge variant={vaccine.daysLeft <= 14 ? "warning" : "info"} className="text-[10px] mt-0.5">
                                In {vaccine.daysLeft} days
                              </Badge>
                            )}
                          </div>
                        )}
                      </div>
                      <ChevronRight className="w-4 h-4 text-[#c0c0c0] flex-shrink-0" />
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
