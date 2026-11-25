"use client";

import { Star } from "lucide-react";
import { usePreferences } from "@/components/preferences/PreferencesContext";
import type { Product } from "@/domain/entities";

interface ProductInfoProps {
  product: Product;
  price: number;
}

export function ProductInfo({ product, price }: ProductInfoProps) {
  const { t, formatPrice, localize } = usePreferences();

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-h1 text-foreground">{localize(product.name)}</h1>

      <div className="flex items-center gap-2">
        <div
          className="flex items-center gap-0.5"
          aria-label={t.product.ratingAria.replace("{rating}", String(product.rating))}
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={
                i < Math.round(product.rating)
                  ? "h-4 w-4 fill-accent-400 text-accent-400"
                  : "h-4 w-4 text-charcoal-200"
              }
              aria-hidden="true"
            />
          ))}
        </div>
        <span className="text-body-sm font-medium text-foreground">{product.rating}</span>
        <span className="text-body-sm text-foreground-muted">
          {t.product.reviewsCount.replace("{count}", String(product.reviewCount))}
        </span>
      </div>

      <p className="text-body text-foreground-muted">{localize(product.description)}</p>

      <p className="text-h2 font-bold text-primary-600">{formatPrice(price)}</p>
    </div>
  );
}
