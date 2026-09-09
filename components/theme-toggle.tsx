"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

type Theme = "light" | "dark";

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  localStorage.setItem("nimrod-theme", theme);
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const active = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
    setTheme(active);
  }, []);

  const nextTheme = theme === "light" ? "dark" : "light";

  return (
    <button
      aria-label={`Use ${nextTheme} theme`}
      className="theme-toggle"
      onClick={() => {
        applyTheme(nextTheme);
        setTheme(nextTheme);
      }}
      type="button"
    >
      <Sun aria-hidden="true" className="theme-icon theme-icon-sun" size={15} strokeWidth={2} />
      <Moon aria-hidden="true" className="theme-icon theme-icon-moon" size={15} strokeWidth={2} />
      <span className="theme-toggle-label">{nextTheme}</span>
    </button>
  );
}
