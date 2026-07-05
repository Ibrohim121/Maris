"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Hero from "@/components/Hero";
import CourseCard from "@/components/CourseCard";
import IndustryElite from "@/components/IndustryElite";
import { useLang } from "@/context/LangContext";
import { useTranslation } from "@/translations";
import { useAuth } from "@/context/AuthContext";

const courses = [
  { title: "Advanced Machine Learning", price: "$249", instructor: "Dr. Sarah Chen" },
  { title: "Full-Stack Web Engineering", price: "$199", instructor: "James Okonkwo" },
  { title: "Financial Modeling & Valuation", price: "$179", instructor: "Priya Sharma" },
];

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();
  const { locale } = useLang();
  const t = useTranslation(locale);

  useEffect(() => {
    if (user) {
      const redirects: Record<string, string> = {
        student: "/student/dashboard",
        admin: "/admin/dashboard",
        teacher: "/teacher",
      };
      router.replace(redirects[user.role] || "/");
    }
  }, [user, router]);

  return (
    <div className="font-sans">
      <Hero />

      <section id="courses" className="bg-white px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full border border-gray-300 text-gray-600 text-xs font-semibold tracking-widest uppercase mb-4">
              {t("courses.badge")}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              {t("courses.title")}
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <CourseCard key={course.title} {...course} />
            ))}
          </div>
        </div>
      </section>

      <IndustryElite />

      <footer className="bg-[#121212] text-gray-400 px-4 sm:px-6 lg:px-8 py-12 text-center text-sm border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center mb-2">
            <img src="/maris-logo.jpg" alt="Maris Logo" className="h-12 w-auto" />
          </div>
          <p>&copy; {new Date().getFullYear()} {t("footer.copyright")}</p>
        </div>
      </footer>
    </div>
  );
}
