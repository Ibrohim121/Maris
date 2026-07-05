"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export interface User {
  _id: string;
  email: string;
  name: string;
  role: "student" | "admin" | "teacher";
  avatar: string;
}

interface AuthContextType {
  user: User | null;
  signIn: (user: User) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("educenter_user");
      if (stored) {
        try { return JSON.parse(stored); } catch { /* ignore */ }
      }
    }
    return null;
  });

  const signIn = (u: User) => {
    setUser(u);
    localStorage.setItem("educenter_user", JSON.stringify(u));
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem("educenter_user");
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
