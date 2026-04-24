"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { dictionaries, locales, type Locale } from "@/lib/i18n";

type LocaleApi = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
};

const Ctx = createContext<LocaleApi | null>(null);

export function useLocale(): LocaleApi {
  const api = useContext(Ctx);
  if (!api) throw new Error("useLocale fora do LocaleProvider");
  return api;
}

export function useT() {
  return useLocale().t;
}

const STORAGE_KEY = "wb_locale";

function detectInitial(): Locale {
  if (typeof window === "undefined") return "pt-BR";
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && (locales as readonly string[]).includes(saved)) return saved as Locale;
  } catch {}
  const nav = (navigator.language || "pt-BR").toLowerCase();
  if (nav.startsWith("en")) return "en";
  if (nav.startsWith("es")) return "es";
  return "pt-BR";
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  // Primeiro render usa pt-BR para casar com o SSR; o useEffect ajusta
  // para a preferência real sem causar mismatch de hidratação.
  const [locale, setLocaleState] = useState<Locale>("pt-BR");

  useEffect(() => {
    const initial = detectInitial();
    if (initial !== locale) setLocaleState(initial);
    document.documentElement.setAttribute("lang", initial);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    document.documentElement.setAttribute("lang", l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {}
  }, []);

  const t = useCallback(
    (key: string, vars?: Record<string, string | number>) => {
      const dict = dictionaries[locale] ?? dictionaries["pt-BR"];
      let str = dict[key] ?? dictionaries["pt-BR"][key] ?? key;
      if (vars) {
        for (const [k, v] of Object.entries(vars)) {
          str = str.replace(new RegExp(`\\{${k}\\}`, "g"), String(v));
        }
      }
      return str;
    },
    [locale]
  );

  return <Ctx.Provider value={{ locale, setLocale, t }}>{children}</Ctx.Provider>;
}
