"use client";

import { useEffect, useState, useCallback, type ReactNode } from "react";
import { useAuth } from "@/context/AuthContext";

export default function ScreenshotProtection({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [hidden, setHidden] = useState(false);

  const isStudent = user?.role === "student";

  const flash = useCallback(() => {
    setHidden(true);
    setTimeout(() => setHidden(false), 20000);
  }, []);

  useEffect(() => {
    if (!isStudent) return;

    let printScreenPressed = false;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "PrintScreen") {
        printScreenPressed = true;
        flash();
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      if (
        (e.ctrlKey && e.shiftKey && (e.key === "S" || e.key === "s")) ||
        (e.ctrlKey && (e.key === "S" || e.key === "s")) ||
        (e.metaKey && e.shiftKey && (e.key === "S" || e.key === "s")) ||
        (e.metaKey && (e.key === "S" || e.key === "s"))
      ) {
        flash();
        e.preventDefault();
        e.stopPropagation();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "PrintScreen") {
        e.preventDefault();
        e.stopPropagation();
        if (!printScreenPressed) flash();
        printScreenPressed = false;
      }
    };

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    const handleCopy = (e: ClipboardEvent) => {
      e.preventDefault();
    };

    const handleVisibility = () => {
      if (document.hidden || document.visibilityState === "hidden") {
        setHidden(true);
      }
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
  }, [isStudent, flash]);

  if (!isStudent) return <>{children}</>;

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100%",
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
          backgroundColor: "#000",
          display: hidden ? "flex" : "none",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 16,
        }}
      />
    </div>
  );
}
