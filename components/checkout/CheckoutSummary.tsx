"use client";

import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { usePreferences } from "@/components/preferences/PreferencesContext";
import type { CartItem } from "@/domain/entities";

interface CheckoutSummaryProps {
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
}

export function CheckoutSummary({
  items,
  subtotal,
  deliveryFee,
  total,
}: CheckoutSummaryProps) {
  const { t, formatPrice, localize } = usePreferences();

  return (
    <div className="flex flex-col gap-5 rounded-card border border-border bg-surface p-6 shadow-card">
      <h2 className="text-h4 text-foreground">{t.checkout.orderSummary}</h2>

      <div className="flex flex-col gap-4">
        {items.map((item) => {
          const productName = localize(item.product.name);
          const configuration = item.selectedOptions
            .map((opt) => opt.choices.map((c) => localize(c.name)).join(", "))
            .filter(Boolean)
            .join(" · ");

          return (
            <div key={item.id} className="flex gap-3">
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-image bg-charcoal-50">
                <ImageWithFallback
                  src={item.product.image}
                  alt={productName}
                  unoptimized
                  fill
                  className="object-cover"
                  fallbackClassName="h-full w-full"
                />
              </div>
              <div className="flex flex-1 flex-col gap-0.5">
                <p className="text-body-sm font-medium text-foreground">{productName}</p>
                {configuration ? (
                  <p className="text-caption text-foreground-muted">{configuration}</p>
                ) : null}
                <p className="text-caption text-foreground-muted">
                  x{item.quantity} — {formatPrice(item.subtotal)}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col gap-3 border-t border-border pt-4">
        <div className="flex items-center justify-between">
          <span className="text-body text-foreground-muted">{t.checkout.subtotal}</span>
          <span className="text-body font-medium text-foreground">
            {formatPrice(subtotal)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-body text-foreground-muted">
            {t.checkout.deliveryFee}
          </span>
          <span className="text-body font-medium text-foreground">
            {formatPrice(deliveryFee)}
          </span>
        </div>
        <div className="border-t border-border pt-3">
          <div className="flex items-center justify-between">
            <span className="text-body font-semibold text-foreground">
              {t.checkout.total}
            </span>
            <span className="text-h3 font-bold text-primary-600">
              {formatPrice(total)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
