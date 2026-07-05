"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Calendar, Clock } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const schedule = [
  { day: "Monday", time: "09:00 - 10:30", course: "Advanced Machine Learning", room: "301" },
  { day: "Monday", time: "11:00 - 12:30", course: "Full-Stack Web Engineering", room: "205" },
  { day: "Wednesday", time: "09:00 - 10:30", course: "Advanced Machine Learning", room: "301" },
  { day: "Wednesday", time: "11:00 - 12:30", course: "Full-Stack Web Engineering", room: "205" },
  { day: "Friday", time: "10:00 - 11:30", course: "Advanced Machine Learning (Lab)", room: "Lab 1" },
];

export default function SchedulePage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.replace("/signin");
  }, [user, router]);

  if (!user) return null;

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center gap-3 mb-8">
          <Calendar size={28} className="text-[#FFD700]" />
          <h1 className="text-2xl font-bold text-gray-900">Class Schedule</h1>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-4 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-200 text-sm font-semibold text-gray-700">
            <div>Day</div>
            <div>Time</div>
            <div>Course</div>
            <div>Room</div>
          </div>
          <div className="divide-y divide-gray-100">
            {schedule.map((item, i) => (
              <div key={i} className="grid grid-cols-4 gap-4 px-6 py-4 text-sm text-gray-700 hover:bg-gray-50">
                <div className="font-medium">{item.day}</div>
                <div className="flex items-center gap-1.5">
                  <Clock size={14} className="text-gray-400" />
                  {item.time}
                </div>
                <div>{item.course}</div>
                <div className="text-gray-500">{item.room}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
