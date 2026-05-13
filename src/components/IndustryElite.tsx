"use client";

import { Award, Users } from "lucide-react";
import { useLang } from "@/context/LangContext";
import { useTranslation } from "@/translations";

export default function IndustryElite() {
  const { locale } = useLang();
  const t = useTranslation(locale);

  return (
    <section className="bg-white px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-1 relative">
          <div className="w-full aspect-[4/3] rounded-2xl bg-gray-200 overflow-hidden">
            <img
              src="https://placehold.co/600x450/e5e7eb/9ca3af?text=Success+Rate"
              alt="Success Rate"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="absolute -bottom-4 -left-4 px-5 py-2.5 rounded-lg bg-[#FFD700] text-black font-bold text-sm shadow-lg">
            98% SUCCESS RATE
          </span>
        </div>

        <div className="flex-1 space-y-6">
          <span className="inline-block px-4 py-1.5 rounded-full border border-gray-300 text-gray-600 text-xs font-semibold tracking-widest uppercase">
            {t("elite.badge")}
          </span>

          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
            {t("elite.title")}{" "}
            <span className="text-[#FFD700]">{t("elite.title.highlight")}</span>
          </h2>

          <p className="text-gray-500 text-lg max-w-lg">
            {t("elite.subtitle")}
          </p>

          <div className="grid sm:grid-cols-2 gap-5 pt-4">
            <div className="rounded-xl bg-[#121212] text-white p-6 space-y-3">
              <Award size={28} className="text-[#FFD700]" />
              <h3 className="font-semibold text-lg">{t("elite.certifications")}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {t("elite.certifications.desc")}
              </p>
            </div>

            <div className="rounded-xl bg-[#121212] text-white p-6 space-y-3">
              <Users size={28} className="text-[#FFD700]" />
              <h3 className="font-semibold text-lg">{t("elite.mentorship")}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {t("elite.mentorship.desc")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
