"use client";

import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { Badge } from "@/components/ui/Badge";
import { usePreferences } from "@/components/preferences/PreferencesContext";
import type { Product } from "@/domain/entities";

export function ProductGallery({ product }: { product: Product }) {
  const { t, localize } = usePreferences();

  return (
    <div className="relative aspect-square overflow-hidden rounded-card bg-charcoal-50">
      <ImageWithFallback
        src={product.image}
        alt={localize(product.name)}
        unoptimized
        fill
        className="object-cover"
        fallbackClassName="h-full w-full"
      />
      {product.tags.includes("popular") ? (
        <Badge variant="brand" className="absolute left-4 top-4">
          {t.menu.badgePopular}
        </Badge>
      ) : null}
      {product.tags.includes("new") ? (
        <Badge variant="success" className="absolute left-4 top-4">
          {t.menu.badgeNew}
        </Badge>
      ) : null}
    </div>
  );
}
