"use client";

import Link from "next/link";
import { ArrowLeft, Users } from "lucide-react";
import { useLang } from "@/context/LangContext";
import { useTranslation } from "@/translations";

const groups = [
  { name: "Full-Stack Web \u2014 Group A", students: 18, course: "Full-Stack Web Engineering", schedule: "Mon, Wed \u2014 10:00 AM" },
  { name: "Full-Stack Web \u2014 Group B", students: 15, course: "Full-Stack Web Engineering", schedule: "Tue, Thu \u2014 2:00 PM" },
  { name: "ML Fundamentals", students: 22, course: "Advanced Machine Learning", schedule: "Mon, Wed \u2014 1:00 PM" },
  { name: "Cybersecurity Basics", students: 14, course: "Cybersecurity Fundamentals", schedule: "Fri \u2014 9:00 AM" },
  { name: "UX Design Studio", students: 12, course: "UX Design Principles", schedule: "Tue, Thu \u2014 10:00 AM" },
];

export default function GroupsPage() {
  const { locale } = useLang();
  const t = useTranslation(locale);

  return (
    <main className="flex-1 bg-gray-50 px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-4xl mx-auto">
        <Link href="/teacher" className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-[#FFD700] transition-colors mb-8">
          <ArrowLeft size={18} />
          {t("teacher.open")}
        </Link>

        <div className="mb-10">
          <span className="inline-block px-4 py-1.5 rounded-full border border-gray-300 text-gray-600 text-xs font-semibold tracking-widest uppercase mb-3">
            {t("teacher.groups")}
          </span>
          <h1 className="text-3xl font-bold text-gray-900">{t("teacher.mygroups")}</h1>
          <p className="text-gray-500 mt-2">{t("teacher.groups.count", { count: groups.length })}</p>
        </div>

        <div className="space-y-4">
          {groups.map((group) => (
            <div key={group.name} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 truncate">{group.name}</h3>
                  <p className="text-sm text-gray-500 mt-0.5">{group.course}</p>
                  <p className="text-xs text-gray-400 mt-1">{group.schedule}</p>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600 flex-shrink-0">
                  <span className="flex items-center gap-1.5">
                    <Users size={16} className="text-gray-400" />
                    {group.students} {t("teacher.students.count")}
                  </span>
                  <span className="px-4 py-1.5 rounded-lg border border-[#FFD700] text-[#FFD700] text-xs font-semibold hover:bg-[#FFD700] hover:text-black transition-colors cursor-pointer">
                    {t("teacher.view.group")}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
