"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X, Globe } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useLang } from "@/context/LangContext";
import { locales, useTranslation } from "@/translations";

const navLinks = [
  { key: "nav.home", href: "/" },
  { key: "nav.courses", href: "#courses" },
  { key: "nav.teachers", href: "/teachers" },
  { key: "nav.contact", href: "#contact" },
];

export default function Navbar() {
  const { user, signOut } = useAuth();
  const { locale, setLocale } = useLang();
  const t = useTranslation(locale);
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const handleSignOut = () => {
    signOut();
    router.push("/");
  };

  const currentLang = locales.find((l) => l.code === locale)?.label ?? "EN";

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/">
              <img src="/maris-logo.jpg" alt="Maris Logo" className="h-12 w-auto" />
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-700 hover:text-[#FFD700] transition-colors"
              >
                {t(link.key)}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <Globe size={16} />
                {currentLang}
              </button>
              {langOpen && (
                <div className="absolute right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-[120px]">
                  {locales.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => { setLocale(l.code); setLangOpen(false); }}
                      className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                        locale === l.code ? "text-[#FFD700] font-semibold" : "text-gray-700"
                      }`}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {user ? (
              <div className="flex items-center gap-3">
                {user.role === "student" && (
                  <Link
                    href="/student/dashboard"
                    className="text-sm font-medium text-gray-600 hover:text-[#FFD700] transition-colors"
                  >
                    Dashboard
                  </Link>
                )}
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#FFD700] flex items-center justify-center text-black font-bold text-xs">
                    {user.avatar}
                  </div>
                  <span className="text-sm font-medium text-gray-700 max-w-[100px] truncate">
                    {user.name}
                  </span>
                </div>
                <button
                  onClick={handleSignOut}
                  className="text-sm font-medium text-gray-500 hover:text-red-500 transition-colors"
                >
                  {t("nav.logout")}
                </button>
              </div>
            ) : (
              <Link
                href="/signin"
                className="px-5 py-2 rounded-lg bg-[#FFD700] text-black text-sm font-semibold hover:scale-105 transition-transform"
              >
                {t("nav.signin")}
              </Link>
            )}
          </div>

          <button
            className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-gray-200 bg-white px-4 pb-4 pt-2 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block text-sm font-medium text-gray-700 hover:text-[#FFD700] transition-colors"
            >
              {t(link.key)}
            </Link>
          ))}
          <div className="pt-2 flex flex-wrap gap-2">
            {locales.map((l) => (
              <button
                key={l.code}
                onClick={() => { setLocale(l.code); setOpen(false); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  locale === l.code ? "bg-[#FFD700] text-black" : "bg-gray-100 text-gray-600"
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
          <div className="pt-2 border-t border-gray-100">
            {user ? (
              <div className="space-y-2">
                {user.role === "student" && (
                  <Link
                    href="/student/dashboard"
                    onClick={() => setOpen(false)}
                    className="block text-sm font-medium text-gray-700 hover:text-[#FFD700] transition-colors"
                  >
                    Dashboard
                  </Link>
                )}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#FFD700] flex items-center justify-center text-black font-bold text-xs">
                      {user.avatar}
                    </div>
                    <span className="text-sm font-medium text-gray-700">{user.name}</span>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="text-sm font-medium text-gray-500 hover:text-red-500 transition-colors"
                  >
                    {t("nav.logout")}
                  </button>
                </div>
              </div>
            ) : (
              <Link
                href="/signin"
                onClick={() => setOpen(false)}
                className="block w-full px-5 py-2 rounded-lg bg-[#FFD700] text-black text-sm font-semibold text-center hover:scale-105 transition-transform"
              >
                {t("nav.signin")}
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
