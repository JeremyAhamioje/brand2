import {
  createContext,
  startTransition,
  useContext,
  useEffect,
  useState,
} from "react";

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

  // Flip the CSS theme synchronously for an instant, cheap repaint, then
  // hand the React state change (which remounts the heavy WebGL globe +
  // orbit scenes) to a transition so it can't block the click's next
  // paint. Without this, the scene rebuild ran inside the click handler
  // and blocked UI updates for ~800ms (poor INP).
  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore storage failures (private mode, etc.) */
    }
    startTransition(() => setTheme(next));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext) || { theme: "dark", toggleTheme: () => {} };
}
