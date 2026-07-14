/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <button
        type="button"
        disabled
        aria-label="Loading theme switch"
        className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900"
      >
        <span className="h-5 w-5 animate-pulse rounded-full bg-slate-200 dark:bg-slate-700" />
      </button>
    );
  }

  const isDarkMode = resolvedTheme === "dark";

  const handleThemeToggle = () => {
    setTheme(isDarkMode ? "light" : "dark");
  };

  return (
    <button
      type="button"
      onClick={handleThemeToggle}
      aria-label={
        isDarkMode ? "Switch to light mode" : "Switch to dark mode"
      }
      title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-xl text-slate-700 shadow-sm transition-all duration-200 hover:border-brand-orange hover:text-brand-orange dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-brand-yellow dark:hover:text-brand-yellow"
    >
      {isDarkMode ? <FiSun /> : <FiMoon />}
    </button>
  );
}