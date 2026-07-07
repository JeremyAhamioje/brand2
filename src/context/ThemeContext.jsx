import { createContext, useContext, useEffect, useState } from "react";

// Light / dark theme. The active theme is written to `data-theme` on
// <html>; the CSS in managed.css keys off `:root[data-theme="light"]`.
// An inline script in index.html sets the attribute before first paint
// (from localStorage) so there's no flash — this provider just keeps
// React state in sync and persists changes.

const ThemeContext = createContext(null);
const STORAGE_KEY = "luh-theme";

function initialTheme() {
  if (typeof document !== "undefined") {
    const attr = document.documentElement.getAttribute("data-theme");
    if (attr === "light" || attr === "dark") return attr;
  }
  return "dark";
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(initialTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      /* ignore storage failures (private mode, etc.) */
    }
  }, [theme]);

  const toggleTheme = () =>
    setTheme((t) => (t === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext) || { theme: "dark", toggleTheme: () => {} };
}
