"use client";

import { cn } from "@/lib/utils";
import type { ProductOption, ProductOptionChoice } from "@/domain/entities";
import { formatPrice } from "@/lib/format";
import { restaurant } from "@/config/restaurant";

interface SizeSelectorProps {
  option: ProductOption;
  selected: ProductOptionChoice | null;
  onSelect: (choice: ProductOptionChoice) => void;
}

export function SizeSelector({ option, selected, onSelect }: SizeSelectorProps) {
  return (
    <fieldset className="flex flex-col gap-3">
      <legend className="text-label font-semibold text-foreground">{option.name}</legend>
      <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={option.name}>
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
              {choice.name}
              {choice.priceDelta > 0 ? (
                <span className="ml-1 text-caption text-foreground-subtle">
                  +{formatPrice(choice.priceDelta, restaurant.currency)}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
