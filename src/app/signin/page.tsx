"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShieldCheck, Presentation, UserCheck } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@convex/_generated/api";
import { useAuth } from "@/context/AuthContext";
import { useLang } from "@/context/LangContext";
import { useTranslation } from "@/translations";

export default function SignInPage() {
  const router = useRouter();
  const { user, signIn } = useAuth();
  const signInOrCreateUser = useMutation(api.users.signInOrCreateUser);

  useEffect(() => {
    if (user) router.replace("/");
  }, [user]);
  const { locale } = useLang();
  const t = useTranslation(locale);
  const [role, setRole] = useState<"student" | "admin" | "teacher">("student");

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const result = await signInOrCreateUser({ email: login, password, name, role });
      signIn({
        _id: result._id,
        email: result.email,
        name: result.name,
        role: result.role,
        avatar: result.name.charAt(0).toUpperCase(),
      });
      const redirects: Record<string, string> = {
        student: "/student/dashboard",
        admin: "/admin/dashboard",
        teacher: "/teacher",
      };
      router.push(redirects[role]);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  return (
    <main className="flex-1 flex items-center justify-center bg-white px-4 py-20">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center justify-center mb-6">
            <img src="/maris-logo.jpg" alt="Maris Logo" className="h-12 w-auto" />
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">{t("signin.title")}</h1>
          <p className="text-gray-500 mt-2">{t("signin.subtitle")}</p>
        </div>

        <div className="flex rounded-xl border border-gray-200 p-1 mb-8">
          <button
            onClick={() => setRole("student")}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
              role === "student"
                ? "bg-[#121212] text-white shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <UserCheck size={18} />
            {t("signin.student")}
          </button>
          <button
            onClick={() => setRole("admin")}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
              role === "admin"
                ? "bg-[#121212] text-white shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <ShieldCheck size={18} />
            {t("signin.admin")}
          </button>
          <button
            onClick={() => setRole("teacher")}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
              role === "teacher"
                ? "bg-[#121212] text-white shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <Presentation size={18} />
            {t("signin.teacher")}
          </button>
        </div>

        <form onSubmit={handleSignIn} className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
              {t("signin.name")}
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t("signin.name.placeholder")}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/20 transition-all"
            />
          </div>

          <div>
            <label htmlFor="login" className="block text-sm font-medium text-gray-700 mb-1.5">
              {t("signin.login")}
            </label>
            <input
              id="login"
              type="text"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              placeholder={t("signin.login.placeholder")}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/20 transition-all"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
              {t("signin.password")}
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t("signin.password.placeholder")}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/20 transition-all"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-gray-600 cursor-pointer">
              <input
                type="checkbox"
                className="accent-[#FFD700] w-4 h-4 rounded border-gray-300"
              />
              {t("signin.remember")}
            </label>
            <Link href="/forgot-password" className="text-[#FFD700] font-medium hover:underline">
              {t("signin.forgot")}
            </Link>
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-[#FFD700] text-black font-semibold text-sm hover:scale-[1.02] transition-transform"
          >
            {t("signin.btn")} {role.toUpperCase()}
          </button>
        </form>
      </div>
    </main>
  );
}
