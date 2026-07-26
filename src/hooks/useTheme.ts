import { useEffect, useState } from "react";

export type Theme = "light" | "dark";

const STORAGE_KEY = "mag7-theme";

const getInitialTheme = (): Theme =>
  localStorage.getItem(STORAGE_KEY) === "light" ? "light" : "dark";

interface UseThemeResult {
  theme: Theme;
  toggleTheme: () => void;
}

export const useTheme = (): UseThemeResult => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  return { theme, toggleTheme };
};
