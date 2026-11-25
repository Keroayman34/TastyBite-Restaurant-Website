"use client";

import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { galleryImages } from "@/data/gallery";
import { usePreferences } from "@/components/preferences/PreferencesContext";

type GalleryFilter = "all" | "pizza" | "burgers" | "behind" | "customers";

export function GalleryGrid() {
  const [activeCategory, setActiveCategory] = useState<GalleryFilter>("all");
  const { t, localize } = usePreferences();

  const categories: { id: GalleryFilter; label: string }[] = [
    { id: "all", label: t.gallery.catAll },
    { id: "pizza", label: t.gallery.catPizza },
    { id: "burgers", label: t.gallery.catBurgers },
    { id: "behind", label: t.gallery.catBehindScenes },
    { id: "customers", label: t.gallery.catCustomers },
  ];

  const filteredImages = useMemo(() => {
    if (activeCategory === "all") return galleryImages;
    return galleryImages.filter((img) => img.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="flex flex-col gap-6">
      <div
        className="flex flex-wrap gap-2"
        role="group"
        aria-label={t.gallery.filterAria}
      >
        {categories.map((category) => {
          const isActive = category.id === activeCategory;

          return (
            <button
              key={category.id}
              type="button"
              onClick={() => setActiveCategory(category.id)}
              aria-pressed={isActive}
              className={cn(
                "rounded-full border px-4 py-2 text-body-sm font-medium transition-colors",
                isActive
                  ? "border-primary-500 bg-primary-500 text-white"
                  : "border-border-strong bg-surface text-foreground-muted hover:border-primary-300 hover:text-foreground",
              )}
            >
              {category.label}
            </button>
          );
        })}
      </div>

      {filteredImages.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {filteredImages.map((image) => (
            <div
              key={image.id}
              className="group relative aspect-square overflow-hidden rounded-card bg-charcoal-50"
            >
              <ImageWithFallback
                src={image.src}
                alt={localize(image.alt)}
                unoptimized
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                fallbackClassName="h-full w-full"
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="py-8 text-center text-body-sm text-foreground-muted">
          {t.gallery.emptyMsg}
        </p>
      )}
    </div>
  );
}
