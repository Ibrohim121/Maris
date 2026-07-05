"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Star, TrendingUp } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const ratings = [
  { course: "Advanced Machine Learning", score: 92, grade: "A", submissions: 3 },
  { course: "Full-Stack Web Engineering", score: 78, grade: "B+", submissions: 2 },
];

const maxScore = 100;

export default function RatingPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.replace("/signin");
  }, [user, router]);

  if (!user) return null;

  const average = Math.round(ratings.reduce((s, r) => s + r.score, 0) / ratings.length);

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center gap-3 mb-8">
          <Star size={28} className="text-[#FFD700]" />
          <h1 className="text-2xl font-bold text-gray-900">My Ratings</h1>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-[#FFD700]/20 flex items-center justify-center">
              <span className="text-3xl font-bold text-[#FFD700]">{average}%</span>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900">Overall Average</p>
              <p className="text-sm text-gray-500">Based on {ratings.length} courses</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {ratings.map((r) => (
            <div key={r.course} className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-gray-900">{r.course}</h3>
                  <p className="text-sm text-gray-500">{r.submissions} submissions</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-gray-900">{r.score}%</span>
                  <span className="ml-2 text-sm font-medium text-gray-500">({r.grade})</span>
                </div>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#FFD700] rounded-full transition-all"
                  style={{ width: `${(r.score / maxScore) * 100}%` }}
                />
              </div>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp size={14} className="text-green-500" />
                <span className="text-xs text-green-600">
                  {r.score >= 80 ? "Excellent progress" : r.score >= 60 ? "Good progress" : "Needs improvement"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
