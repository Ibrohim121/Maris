"use client";

import Link from "next/link";
import { useState } from "react";
import { Users, CalendarDays, ClipboardCheck, ArrowRight, UserPlus } from "lucide-react";
import AddStudentModal from "@/components/AddStudentModal";
import { useLang } from "@/context/LangContext";
import { useTranslation } from "@/translations";

const sections = [
  { titleKey: "teacher.groups", descKey: "teacher.groups.desc", href: "/teacher/groups", icon: Users },
  { titleKey: "teacher.schedule", descKey: "teacher.schedule.desc", href: "/teacher/schedule", icon: CalendarDays },
  { titleKey: "teacher.attendance", descKey: "teacher.attendance.desc", href: "/teacher/attendance", icon: ClipboardCheck },
];

export default function TeacherPage() {
  const { locale } = useLang();
  const t = useTranslation(locale);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <main className="flex-1 bg-white">
      <div className="bg-[#121212] text-white px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-4 py-1.5 rounded-full border border-[#FFD700] text-[#FFD700] text-xs font-semibold tracking-widest uppercase mb-4">
            {t("teacher.portal")}
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold">{t("teacher.welcome")}</h1>
          <p className="text-gray-400 mt-3 text-lg">{t("teacher.desc")}</p>
          <button
            onClick={() => setModalOpen(true)}
            className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#FFD700] text-black font-semibold text-sm hover:scale-105 transition-transform"
          >
            <UserPlus size={18} />
            Add Student
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-3 gap-6">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <Link
                key={section.href}
                href={section.href}
                className="group block bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                <Icon size={36} className="text-[#FFD700] mb-4" />
                <h2 className="text-lg font-semibold text-gray-900 mb-2">{t(section.titleKey)}</h2>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">{t(section.descKey)}</p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-[#FFD700] group-hover:gap-2 transition-all">
                  {t("teacher.open")} <ArrowRight size={16} />
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      <AddStudentModal open={modalOpen} onClose={() => setModalOpen(false)} mode="teacher" />
    </main>
  );
}
