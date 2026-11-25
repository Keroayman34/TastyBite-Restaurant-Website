"use client";

import { Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePreferences } from "@/components/preferences/PreferencesContext";
import { SUPPORTED_LANGUAGES } from "@/lib/i18n";

export function LanguageSelector({ className }: { className?: string }) {
  const { language, setLanguage, t } = usePreferences();

  return (
    <div
      role="group"
      aria-label={t.header.languageLabel}
      className={cn(
        "inline-flex items-center rounded-button border border-white/15 bg-white/5 p-0.5",
        className,
      )}
    >
      <Globe className="ml-1.5 mr-1 h-3.5 w-3.5 text-white/60" aria-hidden="true" />
      {SUPPORTED_LANGUAGES.map((lang) => {
        const isActive = language === lang;
        return (
          <button
            key={lang}
            type="button"
            onClick={() => setLanguage(lang)}
            aria-pressed={isActive}
            data-testid={`lang-btn-${lang}`}
            className={cn(
              "rounded-md px-2 py-1 text-xs font-semibold uppercase transition-colors",
              isActive ? "bg-primary-500 text-white" : "text-white/70 hover:text-white",
            )}
          >
            {lang.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}
