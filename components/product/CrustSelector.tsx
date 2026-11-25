"use client";

import { cn } from "@/lib/utils";
import type { ProductOption, ProductOptionChoice } from "@/domain/entities";
import { usePreferences } from "@/components/preferences/PreferencesContext";

interface CrustSelectorProps {
  option: ProductOption;
  selected: ProductOptionChoice | null;
  onSelect: (choice: ProductOptionChoice) => void;
}

export function CrustSelector({ option, selected, onSelect }: CrustSelectorProps) {
  const { formatPrice, localize } = usePreferences();
  const optionName = localize(option.name);

  return (
    <fieldset className="flex flex-col gap-3">
      <legend className="text-label font-semibold text-foreground">{optionName}</legend>
      <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={optionName}>
        {option.choices.map((choice) => {
          const isSelected = selected?.id === choice.id;

          return (
            <button
              key={choice.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onSelect(choice)}
              className={cn(
                "rounded-button border px-4 py-2.5 text-body-sm font-medium transition-colors",
                isSelected
                  ? "border-primary-500 bg-primary-50 text-primary-700"
                  : "border-border-strong bg-surface text-foreground-muted hover:border-primary-300 hover:text-foreground",
              )}
            >
              {localize(choice.name)}
              {choice.priceDelta > 0 ? (
                <span className="ml-1 text-caption text-foreground-subtle">
                  +{formatPrice(choice.priceDelta)}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
