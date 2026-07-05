"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { BookOpen, User, Calendar } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import { useAuth } from "@/context/AuthContext";
import { useLang } from "@/context/LangContext";
import { useTranslation } from "@/translations";

export default function StudentDashboardPage() {
  const { user } = useAuth();
  const router = useRouter();
  const { locale } = useLang();
  const t = useTranslation(locale);

  useEffect(() => {
    if (!user) router.replace("/signin");
  }, [user, router]);

  const courses = useQuery(
    api.enrollments.getStudentCourses,
    user ? { userId: user._id as any } : "skip"
  );

  if (!user) return null;

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#FFD700] flex items-center justify-center text-black font-bold text-2xl">
              {user.avatar}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
              <p className="text-gray-500 flex items-center gap-1.5 mt-1">
                <User size={16} />
                Student
              </p>
            </div>
          </div>
        </div>

        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <BookOpen size={22} />
          My Courses
        </h2>

        {courses === undefined ? (
          <div className="text-center py-12 text-gray-500">Loading...</div>
        ) : courses.length === 0 ? (
          <div className="text-center py-12 text-gray-500">You are not enrolled in any courses yet.</div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((item: any) => (
              <Link
                key={item.course._id}
                href={`/student/courses/${item.course._id}`}
                className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-lg bg-[#FFD700]/20 flex items-center justify-center mb-4">
                  <BookOpen size={24} className="text-[#FFD700]" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{item.course.title}</h3>
                <p className="text-sm text-gray-500 line-clamp-2 mb-4">{item.course.description}</p>
                <div className="flex items-center gap-1.5 text-xs text-gray-400">
                  <Calendar size={14} />
                  Enrolled {new Date(item.enrolledAt).toLocaleDateString()}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
