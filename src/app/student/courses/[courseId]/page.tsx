"use client";

import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, FileText, Headphones, CheckCircle, Clock } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import { useAuth } from "@/context/AuthContext";
import { useLang } from "@/context/LangContext";
import { useTranslation } from "@/translations";

export default function CourseDetailPage() {
  const { user } = useAuth();
  const router = useRouter();
  const params = useParams();
  const { locale } = useLang();
  const t = useTranslation(locale);

  useEffect(() => {
    if (!user) router.replace("/signin");
  }, [user, router]);

  const course = useQuery(api.courses.getById, { courseId: params.courseId as any });

  const homework = useQuery(
    api.homework.getCourseHomework,
    user ? { courseId: params.courseId as any, userId: user._id as any } : "skip"
  );

  if (!user) return null;

  if (!course) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Link
          href="/student/dashboard"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-6 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Dashboard
        </Link>

        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <div className="w-14 h-14 rounded-lg bg-[#FFD700]/20 flex items-center justify-center mb-4">
            <FileText size={28} className="text-[#FFD700]" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{course.title}</h1>
          <p className="text-gray-500">{course.description}</p>
        </div>

        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Clock size={22} />
          Homework Assignments
        </h2>

        {homework === undefined ? (
          <div className="text-center py-12 text-gray-500">Loading...</div>
        ) : homework.length === 0 ? (
          <div className="text-center py-12 text-gray-500">No homework assigned yet.</div>
        ) : (
          <div className="space-y-4">
            {homework.map((task: any) => (
              <Link
                key={task._id}
                href={`/student/homework/${task._id}`}
                className="block bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    task.type === "writing" ? "bg-blue-50" : "bg-green-50"
                  }`}>
                    {task.type === "writing" ? (
                      <FileText size={20} className="text-blue-600" />
                    ) : (
                      <Headphones size={20} className="text-green-600" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900">{task.title}</h3>
                      {task.submission && (
                        <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-sm text-gray-500 truncate">{task.content}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        task.type === "writing"
                          ? "bg-blue-50 text-blue-700"
                          : "bg-green-50 text-green-700"
                      }`}>
                        {task.type === "writing" ? "Writing" : "Listening"}
                      </span>
                      {task.submission?.score !== undefined && (
                        <span className="text-xs font-medium text-gray-500">
                          Score: {task.submission.score}%
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
