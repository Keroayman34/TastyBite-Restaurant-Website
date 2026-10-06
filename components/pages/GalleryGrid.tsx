"use client";

import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { galleryImages } from "@/data/gallery";

const categories = ["All", "Pizza", "Burgers", "Behind The Scenes", "Customers"] as const;

export function GalleryGrid() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filteredImages = useMemo(() => {
    if (activeCategory === "All") return galleryImages;
    return galleryImages.filter((img) =>
      img.alt.toLowerCase().includes(activeCategory.toLowerCase().split(" ")[0]),
    );
  }, [activeCategory]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter gallery">
        {categories.map((category) => {
          const isActive = category === activeCategory;

          return (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              aria-pressed={isActive}
              className={cn(
                "rounded-full border px-4 py-2 text-body-sm font-medium transition-colors",
                isActive
                  ? "border-primary-500 bg-primary-500 text-white"
                  : "border-border-strong bg-surface text-foreground-muted hover:border-primary-300 hover:text-foreground",
              )}
            >
              {category}
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
                alt={image.alt}
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
          No images found for this category.
        </p>
      )}
    </div>
  );
}
