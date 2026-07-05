"use client";

import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import { useAuth } from "@/context/AuthContext";
import WritingHomework from "@/components/WritingHomework";
import ListeningHomework from "@/components/ListeningHomework";

export default function HomeworkDetailPage() {
  const { user } = useAuth();
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    if (!user) router.replace("/signin");
  }, [user, router]);

  if (!user) return null;

  const task = useQuery(api.homework.getById, {
    homeworkId: params.homeworkId as any,
  });

  if (task === undefined) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Homework not found.</div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Link
          href={`/student/courses/${task.courseId}`}
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-6 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Course
        </Link>

        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{task.title}</h1>
          <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full ${
            task.type === "writing" ? "bg-blue-50 text-blue-700" : "bg-green-50 text-green-700"
          }`}>
            {task.type === "writing" ? "Writing" : "Listening"}
          </span>
        </div>

        {task.type === "writing" ? (
          <WritingHomework task={task} userId={user._id} />
        ) : (
          <ListeningHomework task={task} />
        )}
      </div>
    </div>
  );
}
