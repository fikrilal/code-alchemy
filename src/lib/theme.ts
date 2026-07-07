export const THEME_STORAGE_KEY = "theme";

export type Theme = "dark" | "light";

export const DEFAULT_THEME: Theme = "dark";

export function getStoredTheme(): Theme {
  if (typeof window === "undefined") {
    return DEFAULT_THEME;
  }

  try {
    return localStorage.getItem(THEME_STORAGE_KEY) === "light"
      ? "light"
      : DEFAULT_THEME;
  } catch {
    return DEFAULT_THEME;
  }
}

export function applyTheme(theme: Theme): void {
  const isDark = theme === "dark";

  document.documentElement.classList.toggle("dark", isDark);
  document.documentElement.style.colorScheme = theme;

  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Ignore storage failures (private browsing, blocked storage).
  }
}

export function toggleTheme(): Theme {
  const nextTheme: Theme = getStoredTheme() === "dark" ? "light" : "dark";
  applyTheme(nextTheme);
  return nextTheme;
}