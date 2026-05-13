"use client";

import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useLang } from "@/context/LangContext";
import { useTranslation } from "@/translations";

export default function Hero() {
  const { locale } = useLang();
  const t = useTranslation(locale);

  return (
    <section className="bg-[#121212] text-white px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-1 space-y-6">
          <span className="inline-block px-4 py-1.5 rounded-full border border-[#FFD700] text-[#FFD700] text-xs font-semibold tracking-widest uppercase">
            {t("hero.badge")}
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
            {t("hero.title")}{" "}
            <span className="text-[#FFD700]">{t("hero.title.highlight")}</span>
          </h1>

          <p className="text-gray-400 text-lg max-w-xl">
            {t("hero.subtitle")}
          </p>

          <div className="flex items-center gap-3 max-w-md">
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              />
              <input
                type="text"
                placeholder={t("hero.search.placeholder")}
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/10 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-[#FFD700] transition-colors"
              />
            </div>
            <button className="px-6 py-3 rounded-lg bg-[#FFD700] text-black font-semibold text-sm hover:scale-105 transition-transform whitespace-nowrap">
              {t("hero.search.btn")}
            </button>
          </div>
        </div>

        <motion.div
          className="flex-1 w-full max-w-md lg:max-w-none"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="relative w-full aspect-[4/3] rounded-2xl border-2 border-white/20 overflow-hidden bg-gray-800 flex items-center justify-center">
            <img
              src="https://placehold.co/600x450/333/999?text=Course+Preview"
              alt="Course Preview"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
