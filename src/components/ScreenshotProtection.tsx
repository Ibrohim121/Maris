"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useAuth } from "@/context/AuthContext";

export default function ScreenshotProtection({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const overlayRef = useRef<HTMLDivElement>(null);

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

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    const handleCopy = (e: ClipboardEvent) => {
      e.preventDefault();
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "PrintScreen") {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    document.addEventListener("keydown", handleKeyDown, true);
    document.addEventListener("keyup", handleKeyUp, true);
    document.addEventListener("contextmenu", handleContextMenu, true);
    document.addEventListener("copy", handleCopy, true);

    return () => {
      document.removeEventListener("keydown", handleKeyDown, true);
      document.removeEventListener("keyup", handleKeyUp, true);
      document.removeEventListener("contextmenu", handleContextMenu, true);
      document.removeEventListener("copy", handleCopy, true);
    };
  }, [isStudent]);

  return (
    <div
      ref={overlayRef}
      style={
        isStudent
          ? {
              userSelect: "none",
              WebkitUserSelect: "none",
              MozUserSelect: "none",
              msUserSelect: "none",
              WebkitTouchCallout: "none",
            }
          : {}
      }
      onContextMenu={isStudent ? (e) => e.preventDefault() : undefined}
      onCopy={isStudent ? (e) => e.preventDefault() : undefined}
      onCut={isStudent ? (e) => e.preventDefault() : undefined}
    >
      {children}
    </div>
  );
}
