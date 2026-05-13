"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { teachers } from "@/data/teachers";
import { ArrowLeft, Star, Users, BookOpen } from "lucide-react";
import { useLang } from "@/context/LangContext";
import { useTranslation } from "@/translations";

interface Props {
  params: { slug: string };
}

export default function TeacherPage({ params }: Props) {
  const { locale } = useLang();
  const t = useTranslation(locale);
  const teacher = teachers.find((t) => t.slug === params.slug);

  if (!teacher) notFound();

  return (
    <main className="bg-white px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/teachers"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-[#FFD700] transition-colors mb-10"
        >
          <ArrowLeft size={18} />
          {t("teachers.back")}
        </Link>

        <div className="flex flex-col sm:flex-row items-start gap-8 mb-12">
          <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
            <img
              src={"https://placehold.co/400x400/e5e7eb/9ca3af?text=" + teacher.name.charAt(0)}
              alt={teacher.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-3">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">{teacher.name}</h1>
              <p className="text-lg text-gray-500 mt-1">{teacher.role}</p>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span className="flex items-center gap-1.5">
                <Star size={16} className="text-[#FFD700] fill-[#FFD700]" />
                {teacher.rating}
              </span>
              <span className="flex items-center gap-1.5">
                <Users size={16} className="text-gray-400" />
                {teacher.students.toLocaleString()} {t("teachers.students")}
              </span>
              <span className="flex items-center gap-1.5">
                <BookOpen size={16} className="text-gray-400" />
                {teacher.courses} {t("teachers.courses")}
              </span>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              {teacher.specialties.map((s) => (
                <span key={s} className="px-3 py-1.5 rounded-full bg-gray-100 text-gray-700 text-xs font-medium">{s}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="prose prose-gray max-w-none">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">About {teacher.name.split(" ")[0]}</h2>
          <p className="text-gray-600 leading-relaxed text-lg">{teacher.details}</p>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 flex justify-center">
          <Link
            href="/teachers"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#FFD700] text-black font-semibold text-sm hover:scale-105 transition-transform"
          >
            <ArrowLeft size={18} />
            {t("teachers.view")}
          </Link>
        </div>
      </div>
    </main>
  );
}
