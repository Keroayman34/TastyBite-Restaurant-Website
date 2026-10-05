"use client";

import { cn } from "@/lib/utils";
import type { FilterTag } from "@/lib/menu";

const filterOptions: { tag: FilterTag; label: string }[] = [
  { tag: "popular", label: "Popular" },
  { tag: "new", label: "New" },
  { tag: "offer", label: "Offers" },
  { tag: "veggie", label: "Veggie" },
  { tag: "spicy", label: "Spicy" },
];

interface FilterChipsProps {
  activeFilters: FilterTag[];
  onToggle: (tag: FilterTag) => void;
}

export function FilterChips({ activeFilters, onToggle }: FilterChipsProps) {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Filter products">
      {filterOptions.map((option) => {
        const isActive = activeFilters.includes(option.tag);

        return (
          <button
            key={option.tag}
            type="button"
            onClick={() => onToggle(option.tag)}
            aria-pressed={isActive}
            className={cn(
              "rounded-full border px-4 py-2 text-body-sm font-medium transition-colors",
              isActive
                ? "border-primary-500 bg-primary-500 text-white"
                : "border-border-strong bg-surface text-foreground-muted hover:border-primary-300 hover:text-foreground",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
