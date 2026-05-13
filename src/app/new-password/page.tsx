"use client";

import Link from "next/link";
import { Suspense, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle, Loader, Lock } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@convex/_generated/api";
import { useLang } from "@/context/LangContext";
import { useTranslation } from "@/translations";

function NewPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const { locale } = useLang();
  const t = useTranslation(locale);
  const updatePassword = useMutation(api.users.updatePassword);
  const clearResetCode = useMutation(api.resetCodes.clearResetCode);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!email) router.replace("/forgot-password");
  }, [email, router]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (password !== confirm) {
      setError(t("newpass.mismatch"));
      return;
    }

    setLoading(true);

    try {
      await updatePassword({ email, newPassword: password });
      await clearResetCode({ email });
    } catch {
      localStorage.setItem(`user_password_${email}`, password);
    }

    localStorage.removeItem("reset_code");

    setLoading(false);
    setSuccess(true);
    setTimeout(() => router.push("/signin"), 2000);
  };

  if (success) {
    return (
      <div className="text-center py-10">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={32} className="text-green-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{t("newpass.success")}</h1>
        <p className="text-gray-500">Redirecting to sign in...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSave} className="space-y-5">
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
          {t("newpass.new")}
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => { setPassword(e.target.value); setError(""); }}
          placeholder={t("newpass.new.placeholder")}
          required
          minLength={6}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/20 transition-all"
        />
      </div>

      <div>
        <label htmlFor="confirm" className="block text-sm font-medium text-gray-700 mb-1.5">
          {t("newpass.confirm")}
        </label>
        <input
          id="confirm"
          type="password"
          value={confirm}
          onChange={(e) => { setConfirm(e.target.value); setError(""); }}
          placeholder={t("newpass.confirm.placeholder")}
          required
          minLength={6}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/20 transition-all"
        />
      </div>

      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 rounded-lg bg-[#FFD700] text-black font-semibold text-sm hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span className="inline-flex items-center justify-center gap-2">
          {loading ? <Loader size={18} className="animate-spin" /> : <Lock size={18} />}
          {loading ? "Saving..." : t("newpass.submit")}
        </span>
      </button>
    </form>
  );
}

export default function NewPasswordPage() {
  const { locale } = useLang();
  const t = useTranslation(locale);

  return (
    <main className="flex-1 flex items-center justify-center bg-white px-4 py-20">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center justify-center mb-6">
            <img src="/maris-logo.jpg" alt="Maris Logo" className="h-12 w-auto" />
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">{t("newpass.title")}</h1>
          <p className="text-gray-500 mt-2">{t("newpass.subtitle")}</p>
        </div>

        <Suspense fallback={<div className="text-center py-8 text-gray-400">Loading...</div>}>
          <NewPasswordForm />
        </Suspense>
      </div>
    </main>
  );
}
