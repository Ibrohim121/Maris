"use client";

import Link from "next/link";
import {
  Users,
  BookOpen,
  DollarSign,
  TrendingUp,
  GraduationCap,
  Bell,
  Settings,
  LogOut,
} from "lucide-react";
import { useState } from "react";
import AddStudentModal from "@/components/AddStudentModal";
import { useLang } from "@/context/LangContext";
import { useTranslation } from "@/translations";

const stats = [
  { labelKey: "admin.total.students", value: "2,847", icon: Users, change: "+12%" },
  { labelKey: "admin.active.courses", value: "48", icon: BookOpen, change: "+4%" },
  { labelKey: "admin.revenue", value: "$128.4K", icon: DollarSign, change: "+18%" },
  { labelKey: "admin.completion", value: "87%", icon: TrendingUp, change: "+5%" },
];

const recentStudents = [
  { name: "Alex Johnson", course: "Full-Stack Web Engineering", progress: 72, avatar: "A" },
  { name: "Maria Garcia", course: "Advanced Machine Learning", progress: 45, avatar: "M" },
  { name: "Ethan Kim", course: "Financial Modeling & Valuation", progress: 91, avatar: "E" },
  { name: "Sofia Patel", course: "Cybersecurity Fundamentals", progress: 33, avatar: "S" },
  { name: "Liam Chen", course: "UX Design Principles", progress: 68, avatar: "L" },
];

const sidebarLinks = [
  { labelKey: "admin.dashboard", href: "/admin/dashboard", icon: GraduationCap },
  { labelKey: "admin.students", href: "#students", icon: Users },
  { labelKey: "admin.courses", href: "#courses", icon: BookOpen },
  { labelKey: "admin.revenue", href: "#revenue", icon: DollarSign },
  { labelKey: "admin.notifications", href: "#notifications", icon: Bell },
  { labelKey: "admin.settings", href: "#settings", icon: Settings },
];

export default function AdminDashboardPage() {
  const { locale } = useLang();
  const t = useTranslation(locale);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="flex min-h-[calc(100vh-64px)] bg-gray-50">
      <aside className="hidden lg:flex flex-col w-64 bg-[#121212] text-white p-6">
        <div className="flex items-center gap-2 text-lg font-bold mb-10">
          <GraduationCap size={24} className="text-[#FFD700]" />
          EduCenter <span className="text-[#FFD700]">Pro</span>
        </div>

        <nav className="flex-1 space-y-1">
          {sidebarLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
            >
              <link.icon size={18} />
              {t(link.labelKey)}
            </Link>
          ))}
        </nav>

        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
        >
          <LogOut size={18} />
          {t("admin.back")}
        </Link>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4 lg:hidden">
            <span className="text-lg font-bold text-gray-900">
              <span className="text-[#FFD700]">EduCenter</span> Pro
            </span>
          </div>

          <div className="flex items-center gap-4 ml-auto">
            <button className="relative p-2 text-gray-500 hover:text-gray-700 transition-colors">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#FFD700] flex items-center justify-center text-black font-bold text-sm">A</div>
              <div className="hidden sm:block text-sm">
                <p className="font-medium text-gray-900">{t("signin.admin")}</p>
                <p className="text-gray-500 text-xs">{t("admin.dashboard")}</p>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 px-6 py-8 overflow-y-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-gray-900">{t("admin.welcome")}</h1>
            <button
              onClick={() => setModalOpen(true)}
              className="px-5 py-2.5 rounded-lg bg-[#FFD700] text-black font-semibold text-sm hover:scale-105 transition-transform flex items-center gap-2"
            >
              + Add Student
            </button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {stats.map((stat) => (
              <div key={stat.labelKey} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <stat.icon size={22} className="text-gray-400" />
                  <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">{stat.change}</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-500 mt-0.5">{t(stat.labelKey)}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="font-semibold text-gray-900">{t("admin.recent.students")}</h2>
              <Link href="#students" className="text-sm text-[#FFD700] font-medium hover:underline">
                {t("admin.view.all")}
              </Link>
            </div>
            <div className="divide-y divide-gray-100">
              {recentStudents.map((student) => (
                <div key={student.name} className="px-6 py-4 flex items-center gap-4 hover:bg-gray-50 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold text-sm">
                    {student.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{student.name}</p>
                    <p className="text-xs text-gray-500 truncate">{student.course}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-24 sm:w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-[#FFD700] rounded-full transition-all" style={{ width: student.progress + "%" }} />
                    </div>
                    <span className="text-xs font-medium text-gray-600 w-8 text-right">{student.progress}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      <AddStudentModal open={modalOpen} onClose={() => setModalOpen(false)} mode="admin" />
    </div>
  );
}
