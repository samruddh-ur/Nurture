"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { formatAge } from "@/lib/utils";
import { Plus, Edit, Heart, AlertCircle, Phone, Syringe, Weight, Ruler } from "lucide-react";
import Link from "next/link";

const children = [
  {
    id: "1",
    name: "Aria Johnson",
    dob: "2024-03-15",
    gender: "female",
    bloodGroup: "B+",
    weight: 10.1,
    height: 76,
    allergies: ["Peanuts"],
    conditions: [],
    emoji: "👧",
    nextVaccine: "MMR (2nd dose) — Jun 3",
    nextAppointment: "15-month checkup — Jun 5",
    nutritionScore: 87,
  },
];

export default function ChildrenPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-[#1a1a2e]">Child Profiles</h2>
          <p className="text-sm text-[#737373]">Manage profiles for your children</p>
        </div>
        <Button>
          <Plus className="w-4 h-4" /> Add child
        </Button>
      </div>

      {children.map((child) => (
        <Card key={child.id} padding="none" className="overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#7c6af7] to-[#e879a8] p-6 text-white">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/20 border-2 border-white/30 flex items-center justify-center text-3xl">
                {child.emoji}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold">{child.name}</h3>
                <div className="flex flex-wrap gap-3 text-sm text-white/80 mt-1">
                  <span>{formatAge(child.dob)} old</span>
                  <span>· DOB: {new Date(child.dob).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                  <span>· {child.gender === "female" ? "Girl" : "Boy"}</span>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="text-white/80 hover:text-white hover:bg-white/10">
                <Edit className="w-4 h-4" /> Edit profile
              </Button>
            </div>
          </div>

          <div className="p-6">
            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              {[
                { label: "Weight", value: `${child.weight} kg`, icon: Weight, color: "bg-violet-50 text-violet-600" },
                { label: "Height", value: `${child.height} cm`, icon: Ruler, color: "bg-blue-50 text-blue-600" },
                { label: "Blood Group", value: child.bloodGroup || "Unknown", icon: Heart, color: "bg-red-50 text-red-500" },
                { label: "Nutrition Score", value: `${child.nutritionScore}/100`, icon: Syringe, color: "bg-green-50 text-green-600" },
              ].map((stat) => (
                <div key={stat.label} className={`flex items-center gap-3 p-3 rounded-xl ${stat.color.split(" ")[0]}`}>
                  <stat.icon className={`w-5 h-5 flex-shrink-0 ${stat.color.split(" ")[1]}`} />
                  <div>
                    <p className="text-xs text-[#737373]">{stat.label}</p>
                    <p className="text-sm font-bold text-[#1a1a2e]">{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Allergies & Conditions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-xs font-semibold text-[#a0a0b8] uppercase tracking-wide mb-2">Allergies</p>
                <div className="flex flex-wrap gap-2">
                  {child.allergies.length > 0 ? (
                    child.allergies.map((a) => (
                      <Badge key={a} variant="warning">
                        <AlertCircle className="w-3 h-3" /> {a}
                      </Badge>
                    ))
                  ) : (
                    <Badge variant="success">No known allergies</Badge>
                  )}
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold text-[#a0a0b8] uppercase tracking-wide mb-2">Medical Conditions</p>
                <div className="flex flex-wrap gap-2">
                  {child.conditions.length > 0 ? (
                    child.conditions.map((c) => (
                      <Badge key={c} variant="danger">{c}</Badge>
                    ))
                  ) : (
                    <Badge variant="success">No conditions on file</Badge>
                  )}
                </div>
              </div>
            </div>

            {/* Upcoming */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-amber-50 border border-amber-100">
                <Syringe className="w-5 h-5 text-amber-600 flex-shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-amber-800">Next vaccination</p>
                  <p className="text-xs text-amber-600">{child.nextVaccine}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-blue-50 border border-blue-100">
                <Phone className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-blue-800">Next appointment</p>
                  <p className="text-xs text-blue-600">{child.nextAppointment}</p>
                </div>
              </div>
            </div>

            {/* Quick links */}
            <div className="flex flex-wrap gap-2 pt-4 border-t border-[#f0f0ea]">
              <Link href="/growth"><Button variant="soft" size="sm">📈 Growth records</Button></Link>
              <Link href="/vaccinations"><Button variant="soft" size="sm">💉 Vaccinations</Button></Link>
              <Link href="/documents"><Button variant="soft" size="sm">📁 Documents</Button></Link>
              <Link href="/nutrition"><Button variant="soft" size="sm">🥗 Meal plans</Button></Link>
            </div>
          </div>
        </Card>
      ))}

      {/* Add child card */}
      <button className="w-full p-8 rounded-2xl border-2 border-dashed border-[#e8e8e0] hover:border-[#7c6af7] hover:bg-[#faf8ff] transition-all group text-center">
        <div className="w-12 h-12 rounded-2xl bg-[#ede9fe] flex items-center justify-center mx-auto mb-3 group-hover:bg-[#7c6af7] transition-colors">
          <Plus className="w-5 h-5 text-[#7c6af7] group-hover:text-white transition-colors" />
        </div>
        <p className="text-sm font-semibold text-[#7c6af7] mb-1">Add another child</p>
        <p className="text-xs text-[#a0a0b8]">Upgrade to Family Plus for unlimited children</p>
      </button>
    </div>
  );
}
