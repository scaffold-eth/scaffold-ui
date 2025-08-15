"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";

export const SwitchTheme = ({ className }: { className?: string }) => {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const isDarkMode = resolvedTheme === "dark";

  const handleToggle = () => {
    if (isDarkMode) {
      setTheme("light");
      return;
    }
    setTheme("dark");
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* Custom Toggle Switch */}
      <button
        onClick={handleToggle}
        className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-opacity-50 bg-sui-primary-subtle dark:bg-sui-primary focus:ring-sui-primary"
        aria-label={`Switch to ${isDarkMode ? "light" : "dark"} theme`}
      >
        {/* Toggle Circle */}
        <span
          className={`inline-block h-4 w-4 transform rounded-full transition-transform duration-200 ease-in-out bg-sui-primary dark:bg-sui-primary-content ${
            isDarkMode ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>

      {/* Icon Display */}
      <div className="flex items-center justify-center w-6 h-6">
        {isDarkMode ? (
          <MoonIcon className="h-5 w-5 transition-all duration-200 ease-in-out text-sui-primary-content" />
        ) : (
          <SunIcon className="h-5 w-5 transition-all duration-200 ease-in-out text-sui-primary" />
        )}
      </div>
    </div>
  );
};
