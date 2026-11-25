"use client";

import { cn } from "@/lib/utils";
import type { ProductOption, ProductOptionChoice } from "@/domain/entities";
import { usePreferences } from "@/components/preferences/PreferencesContext";

interface ExtrasSelectorProps {
  option: ProductOption;
  selected: ProductOptionChoice[];
  onToggle: (choice: ProductOptionChoice) => void;
}

export function ExtrasSelector({ option, selected, onToggle }: ExtrasSelectorProps) {
  const { formatPrice, localize } = usePreferences();

  return (
    <fieldset className="flex flex-col gap-3">
      <legend className="text-label font-semibold text-foreground">
        {localize(option.name)}
      </legend>
      <div className="flex flex-wrap gap-2">
        {option.choices.map((choice) => {
          const isSelected = selected.some((s) => s.id === choice.id);

          return (
            <button
              key={choice.id}
              type="button"
              role="checkbox"
              aria-checked={isSelected}
              onClick={() => onToggle(choice)}
              className={cn(
                "rounded-button border px-4 py-2.5 text-body-sm font-medium transition-colors",
                isSelected
                  ? "border-primary-500 bg-primary-50 text-primary-700"
                  : "border-border-strong bg-surface text-foreground-muted hover:border-primary-300 hover:text-foreground",
              )}
            >
              {localize(choice.name)}
              <span className="ml-1 text-caption text-foreground-subtle">
                +{formatPrice(choice.priceDelta)}
              </span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
