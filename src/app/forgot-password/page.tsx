"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader, Mail } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@convex/_generated/api";
import { useLang } from "@/context/LangContext";
import { useTranslation } from "@/translations";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { locale } = useLang();
  const t = useTranslation(locale);
  const sendResetCode = useMutation(api.resetCodes.sendResetCode);
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const loadingRef = useRef(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || loadingRef.current) return;
    setError("");
    setLoading(true);
    loadingRef.current = true;

    const timeout = setTimeout(() => loadingRef.current = false, 8000);

    try {
      await sendResetCode({ email });
    } catch {
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      localStorage.setItem("reset_code", code);
      console.log(`[DEV] Reset code for ${email}: ${code}`);
    }

    clearTimeout(timeout);
    loadingRef.current = false;
    setLoading(false);
    setSent(true);
    setTimeout(() => router.push(`/reset-password?email=${encodeURIComponent(email)}`), 1500);
  };

  return (
    <main className="flex-1 flex items-center justify-center bg-white px-4 py-20">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center justify-center mb-6">
            <img src="/maris-logo.jpg" alt="Maris Logo" className="h-12 w-auto" />
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">{t("forgot.title")}</h1>
          <p className="text-gray-500 mt-2">{t("forgot.subtitle")}</p>
        </div>

        {sent ? (
          <div className="text-center py-10">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <Mail size={32} className="text-green-600" />
            </div>
            <p className="text-green-700 font-medium">{t("forgot.success")}</p>
          </div>
        ) : (
          <form onSubmit={handleSend} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                {t("forgot.email")}
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("forgot.email.placeholder")}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/20 transition-all"
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-[#FFD700] text-black font-semibold text-sm hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <Loader size={18} className="animate-spin" />
                  Sending...
                </span>
              ) : (
                t("forgot.send")
              )}
            </button>
          </form>
        )}

        <div className="text-center mt-6">
          <Link
            href="/signin"
            className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            <ArrowLeft size={16} />
            {t("forgot.back")}
          </Link>
        </div>
      </div>
    </main>
  );
}
