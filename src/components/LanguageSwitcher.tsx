"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Globe } from "lucide-react";
import { useLocale } from "./LocaleProvider";
import { localeLabels, locales } from "@/lib/i18n";

export default function LanguageSwitcher({
  variant = "compact",
}: {
  variant?: "compact" | "ghost";
}) {
  const { locale, setLocale } = useLocale();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    }
    if (open) document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  const current = localeLabels[locale];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className={
          variant === "compact"
            ? "inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-white transition-colors px-2 py-1.5 rounded-lg hover:bg-white/[0.04]"
            : "p-2 text-text-muted hover:text-white rounded-lg hover:bg-white/[0.04] inline-flex items-center gap-1"
        }
        title={current.label}
        aria-label="Idioma"
      >
        {variant === "compact" ? (
          <>
            <Globe className="w-4 h-4" />
            <span className="font-medium">{current.short}</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </>
        ) : (
          <>
            <span className="text-lg leading-none">{current.flag}</span>
          </>
        )}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-48 glass-card rounded-xl border border-white/10 shadow-2xl p-1.5 z-50">
          {locales.map((l) => {
            const meta = localeLabels[l];
            const active = l === locale;
            return (
              <button
                key={l}
                onClick={() => {
                  setLocale(l);
                  setOpen(false);
                }}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                  active ? "bg-green-primary/15 text-green-primary" : "text-white/80 hover:bg-white/[0.04] hover:text-white"
                }`}
              >
                <span className="text-lg leading-none">{meta.flag}</span>
                <span className="flex-1 text-left">{meta.label}</span>
                {active && <Check className="w-3.5 h-3.5" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
