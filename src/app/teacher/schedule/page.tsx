"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useLang } from "@/context/LangContext";
import { useTranslation } from "@/translations";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const slots: Record<string, { time: string; group: string; room: string }[]> = {
  Monday: [
    { time: "10:00 \u2014 11:30", group: "Full-Stack Web \u2014 Group A", room: "Room 301" },
    { time: "13:00 \u2014 14:30", group: "ML Fundamentals", room: "Room 205" },
  ],
  Tuesday: [
    { time: "10:00 \u2014 11:30", group: "UX Design Studio", room: "Room 102" },
    { time: "14:00 \u2014 15:30", group: "Full-Stack Web \u2014 Group B", room: "Room 301" },
  ],
  Wednesday: [
    { time: "10:00 \u2014 11:30", group: "Full-Stack Web \u2014 Group A", room: "Room 301" },
    { time: "13:00 \u2014 14:30", group: "ML Fundamentals", room: "Room 205" },
  ],
  Thursday: [
    { time: "10:00 \u2014 11:30", group: "UX Design Studio", room: "Room 102" },
    { time: "14:00 \u2014 15:30", group: "Full-Stack Web \u2014 Group B", room: "Room 301" },
  ],
  Friday: [
    { time: "09:00 \u2014 12:00", group: "Cybersecurity Basics", room: "Room 401" },
  ],
};

export default function SchedulePage() {
  const { locale } = useLang();
  const t = useTranslation(locale);

  return (
    <main className="flex-1 bg-gray-50 px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-5xl mx-auto">
        <Link href="/teacher" className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-[#FFD700] transition-colors mb-8">
          <ArrowLeft size={18} />
          {t("teacher.open")}
        </Link>

        <div className="mb-10">
          <span className="inline-block px-4 py-1.5 rounded-full border border-gray-300 text-gray-600 text-xs font-semibold tracking-widest uppercase mb-3">
            {t("teacher.schedule")}
          </span>
          <h1 className="text-3xl font-bold text-gray-900">{t("teacher.timetable")}</h1>
          <p className="text-gray-500 mt-2">{t("teacher.timetable.desc")}</p>
        </div>

        <div className="grid sm:grid-cols-5 gap-3">
          {days.map((day) => (
            <div key={day} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="bg-[#121212] text-white px-4 py-3 text-center">
                <p className="font-semibold text-sm">{day.slice(0, 3)}</p>
              </div>
              <div className="p-3 space-y-3">
                {(slots[day] ?? []).length === 0 ? (
                  <p className="text-xs text-gray-400 text-center py-2">{t("teacher.no.classes")}</p>
                ) : (
                  slots[day]?.map((slot, i) => (
                    <div key={i} className="border-l-2 border-[#FFD700] pl-3 py-1">
                      <p className="text-xs font-medium text-gray-900">{slot.group}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{slot.time}</p>
                      <p className="text-xs text-gray-400">{slot.room}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
