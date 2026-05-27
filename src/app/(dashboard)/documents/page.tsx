"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  FolderLock, Upload, Search, Download, Eye, Trash2,
  FileText, Stethoscope, Syringe, Shield,
  GraduationCap, Pill, Plane, Lock, CheckCircle2, Plus
} from "lucide-react";

const docCategories = [
  { id: "all", label: "All Documents", count: 12 },
  { id: "birth-cert", label: "Birth Certificate", count: 1 },
  { id: "passport", label: "Passport & ID", count: 2 },
  { id: "medical", label: "Medical Reports", count: 3 },
  { id: "vaccination", label: "Vaccination", count: 2 },
  { id: "insurance", label: "Insurance", count: 1 },
  { id: "prescription", label: "Prescriptions", count: 2 },
  { id: "school", label: "School Records", count: 1 },
];

const documents = [
  {
    id: "1", name: "Birth Certificate", type: "birth-cert",
    uploadedAt: "Aug 20, 2023", size: "2.4 MB", format: "PDF",
    icon: "📜", color: "bg-amber-50 text-amber-600", verified: true,
  },
  {
    id: "2", name: "US Passport — Aria Johnson", type: "passport",
    uploadedAt: "Sep 5, 2023", size: "1.8 MB", format: "PDF",
    icon: "🛂", color: "bg-blue-50 text-blue-600", verified: true,
    expiry: "Aug 2033",
  },
  {
    id: "3", name: "Newborn Health Checkup Report", type: "medical",
    uploadedAt: "Aug 22, 2023", size: "3.1 MB", format: "PDF",
    icon: "🏥", color: "bg-green-50 text-green-600",
  },
  {
    id: "4", name: "6-Month Pediatric Report", type: "medical",
    uploadedAt: "Feb 18, 2024", size: "2.7 MB", format: "PDF",
    icon: "🏥", color: "bg-green-50 text-green-600",
  },
  {
    id: "5", name: "Vaccination Certificate — Year 1", type: "vaccination",
    uploadedAt: "Aug 20, 2024", size: "1.2 MB", format: "PDF",
    icon: "💉", color: "bg-violet-50 text-violet-600", verified: true,
  },
  {
    id: "6", name: "Allergy Test Results", type: "medical",
    uploadedAt: "Apr 12, 2024", size: "4.5 MB", format: "PDF",
    icon: "🧪", color: "bg-red-50 text-red-600",
  },
  {
    id: "7", name: "Health Insurance Card", type: "insurance",
    uploadedAt: "Aug 20, 2023", size: "0.8 MB", format: "PNG",
    icon: "🛡️", color: "bg-teal-50 text-teal-600",
    expiry: "Dec 2025",
  },
  {
    id: "8", name: "Amoxicillin Prescription", type: "prescription",
    uploadedAt: "Mar 3, 2024", size: "0.5 MB", format: "PDF",
    icon: "💊", color: "bg-pink-50 text-pink-600",
  },
  {
    id: "9", name: "Cetirizine Prescription", type: "prescription",
    uploadedAt: "Apr 12, 2024", size: "0.4 MB", format: "PDF",
    icon: "💊", color: "bg-pink-50 text-pink-600",
  },
  {
    id: "10", name: "Pre-School Enrollment Form", type: "school",
    uploadedAt: "Oct 10, 2024", size: "1.1 MB", format: "PDF",
    icon: "🎒", color: "bg-orange-50 text-orange-600",
  },
  {
    id: "11", name: "Aria Passport — India (OCI)", type: "passport",
    uploadedAt: "Sep 10, 2023", size: "1.9 MB", format: "PDF",
    icon: "🛂", color: "bg-blue-50 text-blue-600",
    expiry: "Aug 2033",
  },
  {
    id: "12", name: "Vaccination Certificate — 2024", type: "vaccination",
    uploadedAt: "Sep 1, 2024", size: "1.3 MB", format: "PDF",
    icon: "💉", color: "bg-violet-50 text-violet-600", verified: true,
  },
];

export default function DocumentsPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = documents.filter((d) => {
    const matchCat = activeCategory === "all" || d.type === activeCategory;
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6">

      {/* Vault banner */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#1a1a2e] to-[#2d2458] p-6 text-white">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
        <div className="relative flex items-center gap-4">
          <div className="p-3 bg-white/10 rounded-2xl">
            <FolderLock className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-xl font-bold">Baby Passport Vault</h2>
              <Badge className="bg-white/20 text-white border-0 text-xs">
                <Lock className="w-3 h-3 mr-1" /> AES-256 Encrypted
              </Badge>
            </div>
            <p className="text-white/70 text-sm">12 documents · 23.7 MB used · Secure cloud storage</p>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <Button variant="ghost" size="sm" className="text-white/80 hover:text-white hover:bg-white/10 border border-white/20">
              <Download className="w-4 h-4" /> Export all
            </Button>
            <Button size="sm" className="bg-white text-[#7c6af7] hover:bg-white/90">
              <Upload className="w-4 h-4" /> Upload
            </Button>
          </div>
        </div>
        <div className="relative flex gap-4 mt-4 pt-4 border-t border-white/10">
          {[
            { label: "Documents", value: "12", icon: "📂" },
            { label: "Verified", value: "5", icon: "✅" },
            { label: "Expiring soon", value: "1", icon: "⚠️" },
            { label: "Storage", value: "23.7 MB", icon: "☁️" },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-2">
              <span>{s.icon}</span>
              <div>
                <p className="text-sm font-bold">{s.value}</p>
                <p className="text-[10px] text-white/50">{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Category sidebar */}
        <div className="lg:w-52 flex-shrink-0">
          <Card padding="sm">
            <p className="text-xs font-semibold text-[#a0a0b8] uppercase tracking-wide mb-2 px-2">Categories</p>
            <div className="space-y-0.5">
              {docCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-all ${
                    activeCategory === cat.id
                      ? "bg-[#ede9fe] text-[#7c6af7] font-medium"
                      : "text-[#737373] hover:bg-[#f5f5f0] hover:text-[#1a1a2e]"
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`text-xs rounded-full px-1.5 py-0.5 ${
                    activeCategory === cat.id ? "bg-[#7c6af7] text-white" : "bg-[#f0f0ea] text-[#a0a0b8]"
                  }`}>
                    {cat.count}
                  </span>
                </button>
              ))}
            </div>
          </Card>
        </div>

        {/* Documents grid */}
        <div className="flex-1 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a0a0b8]" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search documents..."
              className="w-full h-11 rounded-xl bg-white border border-[#e8e8e0] pl-10 pr-4 text-sm text-[#1a1a2e] placeholder:text-[#a0a0b8] focus:outline-none focus:border-[#7c6af7] focus:ring-2 focus:ring-[#7c6af7]/10 transition-all"
            />
          </div>

          {/* Expiry warning */}
          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-amber-50 border border-amber-200">
            <span className="text-lg">⚠️</span>
            <p className="text-sm text-amber-700 flex-1">
              <strong>Insurance Card</strong> expires in December 2025 — consider renewing soon.
            </p>
            <button className="text-xs text-amber-600 font-medium hover:underline">View</button>
          </div>

          {/* Documents list */}
          <div className="grid grid-cols-1 gap-3">
            {filtered.map((doc) => (
              <Card key={doc.id} padding="sm" hover className="group">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0 ${doc.color}`}>
                    {doc.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-[#1a1a2e] truncate">{doc.name}</p>
                      {doc.verified && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-[#a0a0b8]">Uploaded {doc.uploadedAt}</span>
                      <span className="text-xs text-[#d0d0d0]">·</span>
                      <span className="text-xs text-[#a0a0b8]">{doc.size}</span>
                      <Badge variant="soft" className="text-[10px] px-1.5 py-0">{doc.format}</Badge>
                      {doc.expiry && (
                        <Badge variant="warning" className="text-[10px] px-1.5 py-0">Expires {doc.expiry}</Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 rounded-lg hover:bg-[#ede9fe] text-[#a0a0b8] hover:text-[#7c6af7] transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-[#ede9fe] text-[#a0a0b8] hover:text-[#7c6af7] transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-red-50 text-[#a0a0b8] hover:text-red-500 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Upload zone */}
          <div className="border-2 border-dashed border-[#e8e8e0] rounded-2xl p-8 text-center hover:border-[#7c6af7] hover:bg-[#faf8ff] transition-all cursor-pointer group">
            <div className="w-12 h-12 rounded-2xl bg-[#ede9fe] flex items-center justify-center mx-auto mb-3 group-hover:bg-[#7c6af7] transition-colors">
              <Upload className="w-5 h-5 text-[#7c6af7] group-hover:text-white transition-colors" />
            </div>
            <p className="text-sm font-semibold text-[#1a1a2e] mb-1">Upload document</p>
            <p className="text-xs text-[#a0a0b8]">Drag & drop or click · PDF, PNG, JPG · Max 25 MB</p>
            <p className="text-xs text-[#7c6af7] mt-2 font-medium">OCR scanning enabled — text is auto-extracted</p>
          </div>
        </div>
      </div>
    </div>
  );
}
