"use client";

import { Suspense, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Loader, ShieldCheck } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@convex/_generated/api";
import { useLang } from "@/context/LangContext";
import { useTranslation } from "@/translations";

function ResetForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const { locale } = useLang();
  const t = useTranslation(locale);
  const verifyResetCode = useMutation(api.resetCodes.verifyResetCode);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!email) router.replace("/forgot-password");
  }, [email, router]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const savedCode = localStorage.getItem("reset_code");
    if (savedCode && code.trim() === savedCode) {
      router.push(`/new-password?email=${encodeURIComponent(email)}`);
      return;
    }

    try {
      const valid = await verifyResetCode({ email, code: code.trim() });
      if (valid) {
        router.push(`/new-password?email=${encodeURIComponent(email)}`);
      } else {
        setError(t("reset.error"));
      }
    } catch {
      setError(t("reset.error"));
    }

    setLoading(false);
  };

  return (
    <>
      <form onSubmit={handleVerify} className="space-y-5">
        <div>
          <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1.5">
            {t("reset.code")}
          </label>
          <input
            id="code"
            type="text"
            value={code}
            onChange={(e) => { setCode(e.target.value); setError(""); }}
            placeholder={t("reset.code.placeholder")}
            required
            maxLength={6}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/20 transition-all text-center text-xl tracking-[0.5em]"
          />
          {error && (
            <p className="text-red-500 text-sm mt-1.5">{error}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-lg bg-[#FFD700] text-black font-semibold text-sm hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="inline-flex items-center justify-center gap-2">
            {loading ? <Loader size={18} className="animate-spin" /> : <ShieldCheck size={18} />}
            {loading ? "Verifying..." : t("reset.verify")}
          </span>
        </button>
      </form>

      <div className="text-center mt-6">
        <Link
          href="/forgot-password"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          <ArrowLeft size={16} />
          {t("forgot.back")}
        </Link>
      </div>
    </>
  );
}

export default function ResetPasswordPage() {
  const { locale } = useLang();
  const t = useTranslation(locale);

  return (
    <main className="flex-1 flex items-center justify-center bg-white px-4 py-20">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center justify-center mb-6">
            <img src="/maris-logo.jpg" alt="Maris Logo" className="h-12 w-auto" />
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">{t("reset.title")}</h1>
          <p className="text-gray-500 mt-2">{t("reset.subtitle")}</p>
        </div>

        <Suspense fallback={<div className="text-center py-8 text-gray-400">Loading...</div>}>
          <ResetForm />
        </Suspense>
      </div>
    </main>
  );
}
