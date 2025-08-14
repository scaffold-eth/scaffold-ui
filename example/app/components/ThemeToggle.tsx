"use client";

import { useState, useEffect } from "react";
import { applyTheme, resetTheme } from "@scaffold-ui/components";

export function ThemeToggle() {
  const [currentTheme, setCurrentTheme] = useState<"default" | "red" | "green" | "blue">("default");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div>Loading theme toggle...</div>;
  }

  const themes = {
    default: () => {
      console.log("Resetting theme...");
      resetTheme();
      setCurrentTheme("default");
    },
    red: () => {
      console.log("Applying red theme...");
      applyTheme({
        primary: "#ef4444",
        primarySubtle: "#fca5a5",
        primaryNeutral: "#fef2f2",
        success: "#10b981",
        warning: "#f59e0b",
        error: "#dc2626",
      });
      console.log("Red theme applied");
      // Verify the change took effect
      const newValue = getComputedStyle(document.documentElement).getPropertyValue("--color-sui-primary");
      console.log("New --color-sui-primary value:", newValue);
      setCurrentTheme("red");
    },
    green: () => {
      applyTheme({
        primary: "#10b981",
        primarySubtle: "#6ee7b7",
        primaryNeutral: "#f0fdf4",
        success: "#059669",
        warning: "#d97706",
        error: "#dc2626",
      });
      setCurrentTheme("green");
    },
    blue: () => {
      applyTheme({
        primary: "#3b82f6",
        primarySubtle: "#93c5fd",
        primaryNeutral: "#eff6ff",
        success: "#10b981",
        warning: "#f59e0b",
        error: "#ef4444",
      });
      setCurrentTheme("blue");
    },
  };

  return (
    <div className="flex flex-col gap-2 mb-4">
      <div className="flex gap-2">
        <span className="text-sm font-medium text-gray-600 self-center mr-2">Theme:</span>
        {Object.entries(themes).map(([name, applyFn]) => (
          <button
            key={name}
            onClick={applyFn}
            style={{
              backgroundColor: currentTheme === name ? "var(--color-sui-primary)" : "white",
              color: currentTheme === name ? "white" : "#374151",
              borderColor: currentTheme === name ? "var(--color-sui-primary)" : "#d1d5db",
            }}
            className="px-3 py-1 text-sm rounded-md border transition-colors capitalize hover:opacity-80"
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  );
}
