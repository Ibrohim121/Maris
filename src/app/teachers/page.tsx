"use client";

import { teachers } from "@/data/teachers";
import TeacherCard from "@/components/TeacherCard";
import { useLang } from "@/context/LangContext";
import { useTranslation } from "@/translations";

export default function TeachersPage() {
  const { locale } = useLang();
  const t = useTranslation(locale);

  return (
    <main className="bg-white px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full border border-gray-300 text-gray-600 text-xs font-semibold tracking-widest uppercase mb-4">
            {t("teachers.badge")}
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            {t("teachers.title")}
          </h1>
          <p className="mt-3 text-gray-500 text-lg max-w-xl mx-auto">
            {t("teachers.subtitle")}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teachers.map((teacher) => (
            <TeacherCard key={teacher.slug} teacher={teacher} />
          ))}
        </div>
      </div>
    </main>
  );
}
