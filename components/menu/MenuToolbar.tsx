"use client";

import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SortOption } from "@/lib/menu";

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name-asc", label: "Name: A-Z" },
];

interface MenuToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  sort: SortOption;
  onSortChange: (value: SortOption) => void;
}

export function MenuToolbar({
  search,
  onSearchChange,
  sort,
  onSortChange,
}: MenuToolbarProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground-subtle" />
        <input
          type="search"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search for pizza, burger..."
          aria-label="Search products"
          className="h-11 w-full rounded-input border border-border bg-surface pl-10 pr-4 text-body text-foreground transition-colors placeholder:text-foreground-subtle focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
        />
      </div>

      <div className="relative">
        <label htmlFor="sort-select" className="sr-only">
          Sort products
        </label>
        <select
          id="sort-select"
          value={sort}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          className={cn(
            "h-11 w-full appearance-none rounded-input border border-border bg-surface px-4 pr-10 text-body text-foreground transition-colors",
            "focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 sm:w-auto",
          )}
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <svg
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground-subtle"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
}
