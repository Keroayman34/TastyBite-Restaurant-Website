"use client";

import {
  LayoutGrid,
  Pizza,
  Beef,
  Drumstick,
  Soup,
  Salad,
  CupSoda,
  IceCreamCone,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { categories } from "@/data/categories";

const categoryIcons: Record<string, LucideIcon> = {
  "cat-pizza": Pizza,
  "cat-burgers": Beef,
  "cat-chicken": Drumstick,
  "cat-pasta": Soup,
  "cat-salads": Salad,
  "cat-drinks": CupSoda,
  "cat-desserts": IceCreamCone,
};

const AllItemsIcon: LucideIcon = LayoutGrid;

interface CategorySidebarProps {
  activeCategory: string | null;
  onSelect: (slug: string | null) => void;
}

export function CategorySidebar({ activeCategory, onSelect }: CategorySidebarProps) {
  const allItemsActive = !activeCategory;

  return (
    <nav
      className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:gap-1 lg:overflow-visible lg:pb-0"
      aria-label="Menu categories"
    >
      <button
        type="button"
        onClick={() => onSelect(null)}
        aria-current={allItemsActive ? "page" : undefined}
        className={cn(
          "flex shrink-0 items-center gap-2 rounded-button px-4 py-2.5 text-nav transition-colors",
          allItemsActive
            ? "bg-primary-500 text-white"
            : "text-foreground-muted hover:bg-charcoal-50 hover:text-foreground",
        )}
      >
        <AllItemsIcon className="h-4 w-4" />
        <span>All Items</span>
      </button>

      {categories.map((category) => {
        const Icon = categoryIcons[category.id] ?? Pizza;
        const isActive = activeCategory === category.slug;

        return (
          <button
            key={category.id}
            type="button"
            onClick={() => onSelect(category.slug)}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "flex shrink-0 items-center gap-2 rounded-button px-4 py-2.5 text-nav transition-colors",
              isActive
                ? "bg-primary-500 text-white"
                : "text-foreground-muted hover:bg-charcoal-50 hover:text-foreground",
            )}
          >
            <Icon className="h-4 w-4" />
            <span>{category.name}</span>
          </button>
        );
      })}
    </nav>
  );
}
