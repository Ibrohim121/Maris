"use client";

import { type ReactNode } from "react";
import { AuthProvider } from "@/context/AuthContext";
import { LangProvider } from "@/context/LangContext";
import ConvexClientProvider from "./ConvexClientProvider";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ConvexClientProvider>
      <AuthProvider>
        <LangProvider>
          {children}
        </LangProvider>
      </AuthProvider>
    </ConvexClientProvider>
  );
}
