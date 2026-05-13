"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { Locale } from "@/translations";

interface LangContextType {
  locale: Locale;
  setLocale: (l: Locale) => void;
}

const LangContext = createContext<LangContextType | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");

  useEffect(() => {
    const stored = localStorage.getItem("educenter_locale") as Locale | null;
    if (stored && ["uz", "en", "ru"].includes(stored)) {
      setLocale(stored);
    }
  }, []);

  const updateLocale = (l: Locale) => {
    setLocale(l);
    localStorage.setItem("educenter_locale", l);
  };

  return (
    <LangContext.Provider value={{ locale, setLocale: updateLocale }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LangProvider");
  return ctx;
}
