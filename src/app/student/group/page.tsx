"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Users, UserCheck, ArrowRight } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import { useAuth } from "@/context/AuthContext";

const groups = [
  {
    name: "ML-2026-A",
    course: "Advanced Machine Learning",
    members: [
      { name: "Ibrohim", avatar: "I" },
      { name: "Alex Johnson", avatar: "A" },
      { name: "Maria Garcia", avatar: "M" },
      { name: "Ethan Kim", avatar: "E" },
    ],
  },
  {
    name: "WEB-2026-B",
    course: "Full-Stack Web Engineering",
    members: [
      { name: "Ibrohim", avatar: "I" },
      { name: "Sofia Patel", avatar: "S" },
      { name: "Liam Chen", avatar: "L" },
    ],
  },
];

export default function GroupPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.replace("/signin");
  }, [user, router]);

  const courses = useQuery(api.courses.list);

  if (!user) return null;

  const courseMap = new Map<string, string>();
  if (courses) {
    for (const c of courses) {
      courseMap.set(c.title, c._id);
    }
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center gap-3 mb-8">
          <Users size={28} className="text-[#FFD700]" />
          <h1 className="text-2xl font-bold text-gray-900">My Groups</h1>
        </div>

        <div className="space-y-6">
          {groups.map((group) => {
            const courseId = courseMap.get(group.course);

            return (
              <div key={group.name} className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="font-semibold text-gray-900">{group.name}</h2>
                    <p className="text-sm text-gray-500">{group.course}</p>
                  </div>
                  <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-full">
                    {group.members.length} members
                  </span>
                </div>
                <div className="flex flex-wrap gap-3 mb-4">
                  {group.members.map((m) => (
                    <div key={m.name} className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
                      <div className="w-8 h-8 rounded-full bg-[#FFD700] flex items-center justify-center text-black font-bold text-xs">
                        {m.avatar}
                      </div>
                      <span className="text-sm text-gray-700">{m.name}</span>
                      {m.name === "Ibrohim" && (
                        <UserCheck size={14} className="text-green-500" />
                      )}
                    </div>
                  ))}
                </div>
                {courseId ? (
                  <Link
                    href={`/student/courses/${courseId}`}
                    className="inline-flex items-center gap-1.5 text-sm text-[#FFD700] font-medium hover:underline"
                  >
                    View Homework <ArrowRight size={16} />
                  </Link>
                ) : (
                  <p className="text-xs text-gray-400">Loading...</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
