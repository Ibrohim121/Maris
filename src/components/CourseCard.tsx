"use client";

import { useLang } from "@/context/LangContext";
import { useTranslation } from "@/translations";

interface CourseCardProps {
  title: string;
  price: string;
  instructor: string;
}

export default function CourseCard({ title, price, instructor }: CourseCardProps) {
  const { locale } = useLang();
  const t = useTranslation(locale);

  return (
    <div className="group bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-300">
      <div className="h-1.5 bg-[#FFD700]" />

      <div className="p-6 space-y-4">
        <img
          src="https://placehold.co/400x200/e5e7eb/9ca3af?text=Course"
          alt={title}
          className="w-full rounded-lg object-cover"
        />

        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 text-sm font-bold">
            {instructor.charAt(0)}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">{instructor}</p>
            <p className="text-xs text-gray-500">{t("course.instructor")}</p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <span className="text-xl font-bold text-gray-900">{price}</span>
          <button className="px-5 py-2 rounded-lg border-2 border-[#FFD700] text-[#FFD700] font-semibold text-sm hover:bg-[#FFD700] hover:text-black transition-colors">
            {t("course.enroll")}
          </button>
        </div>
      </div>
    </div>
  );
}
