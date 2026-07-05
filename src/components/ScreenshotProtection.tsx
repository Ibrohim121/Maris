"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useAuth } from "@/context/AuthContext";

export default function ScreenshotProtection({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const overlayRef = useRef<HTMLDivElement>(null);
  const protectRef = useRef<HTMLDivElement>(null);

  const isStudent = user?.role === "student";

  useEffect(() => {
    if (!isStudent) return;

    const overlay = overlayRef.current;
    const protect = protectRef.current;
    if (!overlay || !protect) return;

    let flashTimer: ReturnType<typeof setTimeout> | null = null;
    let ctrlShiftTimer: ReturnType<typeof setTimeout> | null = null;

    const showOverlay = () => {
      overlay.style.display = "flex";
      protect.style.filter = "blur(40px)";
      protect.style.opacity = "0";
      protect.style.pointerEvents = "none";
      void overlay.offsetHeight;
      void protect.offsetHeight;
    };

    const hideOverlay = () => {
      overlay.style.display = "none";
      protect.style.filter = "none";
      protect.style.opacity = "1";
      protect.style.pointerEvents = "auto";
    };

    const flash = () => {
      showOverlay();
      if (flashTimer) clearTimeout(flashTimer);
      flashTimer = setTimeout(hideOverlay, 20000);
    };

    const clearClipboard = async () => {
      try {
        await navigator.clipboard.writeText("");
      } catch { /* ignore */ }
    };

    document.addEventListener("keydown", (e) => {
      if (e.key === "PrintScreen" || e.code === "PrintScreen") {
        showOverlay();
        clearClipboard();
        e.preventDefault();
        e.stopPropagation();
        if (!flashTimer) {
          flashTimer = setTimeout(hideOverlay, 20000);
        }
        return;
      }

      if (e.ctrlKey || e.metaKey) {
        if (e.shiftKey && (e.key === "S" || e.key === "s")) {
          showOverlay();
          e.preventDefault();
          e.stopPropagation();
          if (!flashTimer) {
            flashTimer = setTimeout(hideOverlay, 20000);
          }
          return;
        }
        if (e.key === "S" || e.key === "s") {
          showOverlay();
          e.preventDefault();
          e.stopPropagation();
          if (!flashTimer) {
            flashTimer = setTimeout(hideOverlay, 20000);
          }
          return;
        }
      }
    }, true);

    document.addEventListener("keyup", (e) => {
      if (e.key === "PrintScreen" || e.code === "PrintScreen") {
        showOverlay();
        clearClipboard();
        e.preventDefault();
        e.stopPropagation();
        if (!flashTimer) {
          flashTimer = setTimeout(hideOverlay, 20000);
        }
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
        showOverlay();
      } else {
        setTimeout(hideOverlay, 2000);
      }
    });

    window.addEventListener("blur", () => showOverlay());
    window.addEventListener("focus", hideOverlay);

    window.addEventListener("resize", () => {
      if (window.screen.width !== window.innerWidth || window.screen.height !== window.innerHeight) {
        flash();
      }
    });

    document.addEventListener("mouseleave", () => showOverlay(), true);
    document.addEventListener("mouseenter", hideOverlay, true);

    return () => {
      if (flashTimer) clearTimeout(flashTimer);
      if (ctrlShiftTimer) clearTimeout(ctrlShiftTimer);
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
      <div
        ref={protectRef}
        style={{
          position: "relative",
          filter: "none",
          opacity: 1,
          transition: "none",
        }}
      >
        {children}
      </div>

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
