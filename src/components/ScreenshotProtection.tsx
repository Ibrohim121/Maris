"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useAuth } from "@/context/AuthContext";

export default function ScreenshotProtection({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const overlayRef = useRef<HTMLDivElement>(null);

  const isStudent = user?.role === "student";

  useEffect(() => {
    if (!isStudent) return;

    const overlay = overlayRef.current;
    if (!overlay) return;

    const show = () => {
      overlay.style.display = "flex";
      void overlay.offsetHeight;
    };

    const hide = () => {
      overlay.style.display = "none";
    };

    const clearClipboard = () => {
      try { navigator.clipboard.writeText(""); } catch { /* ignore */ }
    };

    document.addEventListener("keydown", (e) => {
      if (e.key === "PrintScreen" || e.code === "PrintScreen") {
        show();
        clearClipboard();
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      if (e.ctrlKey || e.metaKey) {
        if ((e.shiftKey || e.key === "S" || e.key === "s")) {
          show();
          e.preventDefault();
          e.stopPropagation();
          return;
        }
      }
    }, true);

    document.addEventListener("keyup", (e) => {
      if (e.key === "PrintScreen" || e.code === "PrintScreen") {
        show();
        clearClipboard();
        e.preventDefault();
        e.stopPropagation();
      }
    }, true);

    document.addEventListener("contextmenu", (e) => e.preventDefault(), true);
    document.addEventListener("copy", (e) => e.preventDefault(), true);
    document.addEventListener("cut", (e) => e.preventDefault(), true);
    document.addEventListener("paste", (e) => e.preventDefault(), true);

    document.addEventListener("input", (e) => {
      const ev = e as unknown as InputEvent;
      if (ev.target instanceof HTMLInputElement || ev.target instanceof HTMLTextAreaElement) {
        if (ev.inputType === "insertFromPaste") {
          (ev.target as HTMLInputElement | HTMLTextAreaElement).value = "";
        }
      }
    }, true);

    document.addEventListener("visibilitychange", () => {
      if (document.hidden || document.visibilityState === "hidden") {
        show();
      } else {
        hide();
      }
    });

    window.addEventListener("blur", show);
    window.addEventListener("focus", hide);

    document.addEventListener("mouseleave", show, true);
    document.addEventListener("mouseenter", hide, true);

    return () => {
      document.removeEventListener("keydown", show, true);
      document.removeEventListener("keyup", show, true);
    };
  }, [isStudent]);

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
    >
      {children}

      <div
        ref={overlayRef}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 99999,
          backgroundColor: "#000",
          display: "none",
          alignItems: "center",
          justifyContent: "center",
        }}
      />
    </div>
  );
}
