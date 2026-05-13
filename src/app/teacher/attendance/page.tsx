"use client";

import Link from "next/link";
import { ArrowLeft, Check, X, Minus } from "lucide-react";
import { useLang } from "@/context/LangContext";
import { useTranslation } from "@/translations";

const groups = ["Full-Stack Web \u2014 Group A", "ML Fundamentals", "UX Design Studio"];

const students = [
  { name: "Alex Johnson", status: "present" as const, group: "Full-Stack Web \u2014 Group A" },
  { name: "Maria Garcia", status: "present" as const, group: "Full-Stack Web \u2014 Group A" },
  { name: "Ethan Kim", status: "absent" as const, group: "Full-Stack Web \u2014 Group A" },
  { name: "Sofia Patel", status: "present" as const, group: "Full-Stack Web \u2014 Group A" },
  { name: "Liam Chen", status: "late" as const, group: "Full-Stack Web \u2014 Group A" },
  { name: "Olivia Brown", status: "present" as const, group: "Full-Stack Web \u2014 Group A" },
  { name: "Noah Wilson", status: "present" as const, group: "ML Fundamentals" },
  { name: "Emma Davis", status: "absent" as const, group: "ML Fundamentals" },
  { name: "James Miller", status: "present" as const, group: "ML Fundamentals" },
  { name: "Ava Taylor", status: "present" as const, group: "ML Fundamentals" },
  { name: "William Anderson", status: "late" as const, group: "ML Fundamentals" },
  { name: "Mia Thomas", status: "present" as const, group: "UX Design Studio" },
  { name: "Elijah Jackson", status: "present" as const, group: "UX Design Studio" },
  { name: "Charlotte White", status: "absent" as const, group: "UX Design Studio" },
  { name: "Lucas Harris", status: "present" as const, group: "UX Design Studio" },
];

const statusConfig = {
  present: { icon: Check, className: "text-green-600 bg-green-50" },
  absent: { icon: X, className: "text-red-600 bg-red-50" },
  late: { icon: Minus, className: "text-yellow-600 bg-yellow-50" },
};

export default function AttendancePage() {
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
            {t("teacher.attendance")}
          </span>
          <h1 className="text-3xl font-bold text-gray-900">{t("teacher.student.attendance")}</h1>
          <p className="text-gray-500 mt-2">{t("teacher.attendance.desc2")}</p>
        </div>

        <div className="flex flex-wrap gap-3 mb-8">
          <span className="flex items-center gap-1.5 text-xs text-gray-500 bg-white px-3 py-1.5 rounded-full border border-gray-200">
            <Check size={14} className="text-green-600" /> {t("teacher.present")}
          </span>
          <span className="flex items-center gap-1.5 text-xs text-gray-500 bg-white px-3 py-1.5 rounded-full border border-gray-200">
            <X size={14} className="text-red-600" /> {t("teacher.absent")}
          </span>
          <span className="flex items-center gap-1.5 text-xs text-gray-500 bg-white px-3 py-1.5 rounded-full border border-gray-200">
            <Minus size={14} className="text-yellow-600" /> {t("teacher.late")}
          </span>
        </div>

        {groups.map((group) => {
          const groupStudents = students.filter((s) => s.group === group);
          const present = groupStudents.filter((s) => s.status === "present").length;
          const total = groupStudents.length;

          return (
            <div key={group} className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-semibold text-gray-900">{group}</h2>
                <span className="text-sm text-gray-500">{t("teacher.present.count", { present, total })}</span>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
                {groupStudents.map((student) => {
                  const config = statusConfig[student.status];
                  const Icon = config.icon;
                  return (
                    <div key={student.name} className="flex items-center justify-between px-5 py-3 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold text-xs">
                          {student.name.charAt(0)}
                        </div>
                        <span className="text-sm font-medium text-gray-900">{student.name}</span>
                      </div>
                      <span className={"p-1.5 rounded-full " + config.className}>
                        <Icon size={16} />
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
