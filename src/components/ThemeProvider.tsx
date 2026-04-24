"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Theme = "dark" | "light";

type ThemeApi = {
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggle: () => void;
};

const Ctx = createContext<ThemeApi | null>(null);

export function useTheme(): ThemeApi {
  const api = useContext(Ctx);
  if (!api) throw new Error("useTheme fora do ThemeProvider");
  return api;
}

const STORAGE_KEY = "wb_theme";

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Inicia como "dark" para casar com o script injetado no layout;
  // o useEffect sincroniza com o DOM no primeiro render.
  const [theme, setThemeState] = useState<Theme>("dark");

  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme") as Theme | null;
    if (current === "dark" || current === "light") setThemeState(current);
  }, []);

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
    document.documentElement.setAttribute("data-theme", t);
    try {
      localStorage.setItem(STORAGE_KEY, t);
    } catch {}
  }, []);

  const toggle = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  return <Ctx.Provider value={{ theme, setTheme, toggle }}>{children}</Ctx.Provider>;
}

/**
 * Script injetado no <head> ANTES da hidratação para definir
 * data-theme a partir do localStorage ou da preferência do sistema,
 * evitando flash de tema errado (FOUC).
 */
export const themeInitScript = `
(function(){
  try {
    var saved = localStorage.getItem("${STORAGE_KEY}");
    var theme = saved === "light" || saved === "dark"
      ? saved
      : (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
    document.documentElement.setAttribute("data-theme", theme);
  } catch (e) {
    document.documentElement.setAttribute("data-theme", "dark");
  }
})();
`;
