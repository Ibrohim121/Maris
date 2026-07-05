"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useAuth } from "@/context/AuthContext";

export default function ScreenshotProtection({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [hidden, setHidden] = useState(false);

  const isStudent = user?.role === "student";

  useEffect(() => {
    if (!isStudent) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "PrintScreen" ||
        (e.ctrlKey && e.shiftKey && (e.key === "S" || e.key === "s")) ||
        (e.ctrlKey && (e.key === "S" || e.key === "s")) ||
        (e.metaKey && e.shiftKey && (e.key === "S" || e.key === "s")) ||
        (e.metaKey && (e.key === "S" || e.key === "s"))
      ) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "PrintScreen") {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    const handleCopy = (e: ClipboardEvent) => {
      e.preventDefault();
    };

    const handleVisibility = () => {
      setHidden(document.hidden || document.visibilityState === "hidden");
    };

    const handleBlur = () => setHidden(true);
    const handleFocus = () => setHidden(false);

    document.addEventListener("keydown", handleKeyDown, true);
    document.addEventListener("keyup", handleKeyUp, true);
    document.addEventListener("contextmenu", handleContextMenu, true);
    document.addEventListener("copy", handleCopy, true);
    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("blur", handleBlur);
    window.addEventListener("focus", handleFocus);

    return () => {
      document.removeEventListener("keydown", handleKeyDown, true);
      document.removeEventListener("keyup", handleKeyUp, true);
      document.removeEventListener("contextmenu", handleContextMenu, true);
      document.removeEventListener("copy", handleCopy, true);
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("focus", handleFocus);
    };
  }, [isStudent]);

  if (!isStudent) return <>{children}</>;

  return (
    <div
      style={{
        position: "relative",
        userSelect: "none",
        WebkitUserSelect: "none",
        MozUserSelect: "none",
        msUserSelect: "none",
        WebkitTouchCallout: "none",
      }}
      onContextMenu={(e) => e.preventDefault()}
      onCopy={(e) => e.preventDefault()}
      onCut={(e) => e.preventDefault()}
    >
      {children}

      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 99999,
          backgroundColor: "#121212",
          display: hidden ? "flex" : "none",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 16,
        }}
      >
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: "50%",
            backgroundColor: "#FFD700",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 28,
            fontWeight: 700,
            color: "#000",
          }}
        >
          !
        </div>
        <p
          style={{
            color: "#fff",
            fontSize: 18,
            fontWeight: 600,
          }}
        >
          Content Protected
        </p>
        <p
          style={{
            color: "#9CA3AF",
            fontSize: 14,
          }}
        >
          Switch back to view the content
        </p>
      </div>
    </div>
  );
}
