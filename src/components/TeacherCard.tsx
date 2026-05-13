"use client";

import Link from "next/link";
import { Star } from "lucide-react";
import type { Teacher } from "@/data/teachers";
import { useLang } from "@/context/LangContext";
import { useTranslation } from "@/translations";

interface TeacherCardProps {
  teacher: Teacher;
}

export default function TeacherCard({ teacher }: TeacherCardProps) {
  const { locale } = useLang();
  const t = useTranslation(locale);

  return (
    <Link
      href={"/teachers/" + teacher.slug}
      className="group block bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-300"
    >
      <div className="h-1.5 bg-[#FFD700]" />

      <div className="p-6 space-y-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
            <img
              src={"https://placehold.co/200x200/e5e7eb/9ca3af?text=" + teacher.name.charAt(0)}
              alt={teacher.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 truncate">{teacher.name}</h3>
            <p className="text-sm text-gray-500 truncate">{teacher.role}</p>
            <div className="flex items-center gap-1 mt-1">
              <Star size={14} className="text-[#FFD700] fill-[#FFD700]" />
              <span className="text-sm font-medium text-gray-700">{teacher.rating}</span>
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-600 leading-relaxed">{teacher.bio}</p>

        <div className="flex flex-wrap gap-2">
          {teacher.specialties.slice(0, 3).map((s) => (
            <span key={s} className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-medium">{s}</span>
          ))}
          {teacher.specialties.length > 3 && (
            <span className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-500 text-xs font-medium">+{teacher.specialties.length - 3}</span>
          )}
        </div>

        <div className="flex items-center justify-between pt-1 text-xs text-gray-500 border-t border-gray-100">
          <span>{teacher.students.toLocaleString()} {t("teachers.students")}</span>
          <span>{teacher.courses} {t("teachers.courses")}</span>
        </div>
      </div>
    </Link>
  );
}
