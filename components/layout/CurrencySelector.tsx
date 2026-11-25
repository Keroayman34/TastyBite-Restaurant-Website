"use client";

import { cn } from "@/lib/utils";
import { usePreferences } from "@/components/preferences/PreferencesContext";
import { SUPPORTED_CURRENCIES } from "@/lib/currency";
import type { CurrencyCode } from "@/domain/entities";

const currencyLabels: Record<CurrencyCode, string> = {
  EUR: "EUR €",
  USD: "USD $",
};

export function CurrencySelector({ className }: { className?: string }) {
  const { currency, setCurrency, t } = usePreferences();

  return (
    <div
      role="group"
      aria-label={t.header.currencyLabel}
      className={cn(
        "inline-flex items-center rounded-button border border-white/15 bg-white/5 p-0.5",
        className,
      )}
    >
      {SUPPORTED_CURRENCIES.map((curr) => {
        const isActive = currency === curr;
        return (
          <button
            key={curr}
            type="button"
            onClick={() => setCurrency(curr)}
            aria-pressed={isActive}
            data-testid={`currency-btn-${curr}`}
            className={cn(
              "rounded-md px-2 py-1 text-xs font-semibold transition-colors",
              isActive
                ? "bg-accent-500 text-charcoal-950"
                : "text-white/70 hover:text-white",
            )}
          >
            {currencyLabels[curr]}
          </button>
        );
      })}
    </div>
  );
}
