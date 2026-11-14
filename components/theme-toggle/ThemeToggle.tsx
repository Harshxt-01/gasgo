"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun, Monitor } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-xl bg-slate-200/60 dark:bg-zinc-800/60 border border-slate-300/40 dark:border-zinc-700/40 animate-pulse" />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300 
        bg-white/80 dark:bg-zinc-900/80 hover:bg-slate-100 dark:hover:bg-zinc-800 
        border border-slate-200 dark:border-zinc-800 shadow-sm hover:shadow-md 
        text-slate-700 dark:text-zinc-200 group"
      aria-label="Toggle theme"
      title={`Switch to ${isDark ? "Light" : "Dark"} Mode`}
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        <Sun
          className={`w-5 h-5 transition-all duration-300 absolute text-amber-500 ${
            isDark
              ? "opacity-0 rotate-90 scale-50"
              : "opacity-100 rotate-0 scale-100 group-hover:rotate-45"
          }`}
        />
        <Moon
          className={`w-5 h-5 transition-all duration-300 absolute text-cyan-400 ${
            isDark
              ? "opacity-100 rotate-0 scale-100 group-hover:-rotate-12"
              : "opacity-0 -rotate-90 scale-50"
          }`}
        />
      </div>
    </button>
  );
}

