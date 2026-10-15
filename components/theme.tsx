"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type Theme = "light" | "dark";

const ThemeContext = createContext<{
  theme: Theme;
  toggle: () => void;
}>({ theme: "light", toggle: () => {} });

export const themeInitScript = `
(function(){
  try {
    var s = localStorage.getItem('theme');
    var m = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var t = s === 'light' || s === 'dark' ? s : (m ? 'dark' : 'light');
    if (t === 'dark') document.documentElement.classList.add('dark');
    document.documentElement.dataset.theme = t;
  } catch (e) {}
})();
`;

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const initial = (document.documentElement.dataset.theme as Theme) || "light";
    setTheme(initial);
  }, []);

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === "dark" ? "light" : "dark";
      const root = document.documentElement;
      root.classList.toggle("dark", next === "dark");
      root.dataset.theme = next;
      try {
        localStorage.setItem("theme", next);
      } catch {
        /* private mode — theme just won't persist */
      }
      return next;
    });
  }, []);

  const value = useMemo(() => ({ theme, toggle }), [theme, toggle]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      className={
 "relative -mr-2 grid h-9 w-9 place-items-center rounded-full text-ink transition-colors hover:text-muted " +
        (className ?? "")
      }
    >
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden>
        <circle
          cx="7.5"
          cy="7.5"
          r="3.4"
          stroke="currentColor"
          strokeWidth="1.2"
          className="transition-all duration-500 ease-out"
          style={{ opacity: isDark ? 0 : 1 }}
        />
        <g
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          className="transition-all duration-500 ease-out"
          style={{ opacity: isDark ? 0 : 1 }}
        >
          <path d="M7.5 0.8v1.6M7.5 12.6v1.6M14.2 7.5h-1.6M2.4 7.5H0.8M12.24 2.76l-1.13 1.13M3.89 11.11l-1.13 1.13M12.24 12.24l-1.13-1.13M3.89 3.89L2.76 2.76" />
        </g>
        <path
          d="M12.4 9.3A5.4 5.4 0 015.7 2.6a5.6 5.6 0 106.7 6.7z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinejoin="round"
          className="transition-all duration-500 ease-out"
          style={{ opacity: isDark ? 1 : 0 }}
        />
      </svg>
    </button>
  );
}
