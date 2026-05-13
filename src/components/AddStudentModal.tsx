"use client";

import { useState } from "react";
import { X, UserPlus } from "lucide-react";
import { useLang } from "@/context/LangContext";
import { useTranslation } from "@/translations";

interface AddStudentModalProps {
  open: boolean;
  onClose: () => void;
  mode: "admin" | "teacher";
}

const courses = [
  "Advanced Machine Learning",
  "Full-Stack Web Engineering",
  "Financial Modeling & Valuation",
  "Cybersecurity Fundamentals",
  "UX Design Principles",
];

const teachers = [
  "Dr. Sarah Chen",
  "James Okonkwo",
  "Priya Sharma",
  "Marcus Johnson",
  "Dr. Elena Petrov",
  "David Kim",
];

const groups = [
  "Full-Stack Web — Group A",
  "Full-Stack Web — Group B",
  "ML Fundamentals",
  "Cybersecurity Basics",
  "UX Design Studio",
];

export default function AddStudentModal({ open, onClose, mode }: AddStudentModalProps) {
  const { locale } = useLang();
  const t = useTranslation(locale);
  const [step, setStep] = useState(0);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");
  const [studentName, setStudentName] = useState("");

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(
      mode === "admin"
        ? `Student added!\nName: ${studentName}\nCourse: ${selectedCourse}\nTeacher: ${selectedTeacher}\nGroup: ${selectedGroup}`
        : `Student added!\nName: ${studentName}\nGroup: ${selectedGroup}`
    );
    setStudentName("");
    setSelectedCourse("");
    setSelectedTeacher("");
    setSelectedGroup("");
    setStep(0);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <UserPlus size={20} className="text-[#FFD700]" />
            <h2 className="text-lg font-semibold text-gray-900">Add Student</h2>
          </div>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Student Name</label>
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="Enter student name"
              required
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/20 transition-all"
            />
          </div>

          {mode === "admin" && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Course</label>
                <select
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-gray-900 focus:outline-none focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/20 transition-all"
                >
                  <option value="">Select a course</option>
                  {courses.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Teacher</label>
                <select
                  value={selectedTeacher}
                  onChange={(e) => setSelectedTeacher(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-gray-900 focus:outline-none focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/20 transition-all"
                >
                  <option value="">Select a teacher</option>
                  {teachers.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Group</label>
            <select
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
              required
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-gray-900 focus:outline-none focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/20 transition-all"
            >
              <option value="">Select a group</option>
              {groups.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-[#FFD700] text-black font-semibold text-sm hover:scale-[1.02] transition-transform"
          >
            ADD STUDENT
          </button>
        </form>
      </div>
    </div>
  );
}
