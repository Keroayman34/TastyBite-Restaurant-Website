"use client";

import { Minus, Plus, Trash2 } from "lucide-react";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { IconButton } from "@/components/ui/IconButton";
import { usePreferences } from "@/components/preferences/PreferencesContext";
import { MIN_QUANTITY } from "@/lib/menu/pricing";
import type { CartItem as CartItemType } from "@/domain/entities";

interface CartItemProps {
  item: CartItemType;
  onIncrement: () => void;
  onDecrement: () => void;
  onRemove: () => void;
}

export function CartItem({ item, onIncrement, onDecrement, onRemove }: CartItemProps) {
  const { t, formatPrice, localize } = usePreferences();
  const productName = localize(item.product.name);
  const customization = item.selectedOptions
    .map((opt) => opt.choices.map((c) => localize(c.name)).join(", "))
    .filter(Boolean)
    .join(" · ");

  return (
    <div className="flex gap-4 rounded-card border border-border bg-surface p-4 shadow-card">
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-image bg-charcoal-50">
        <ImageWithFallback
          src={item.product.image}
          alt={productName}
          unoptimized
          fill
          className="object-cover"
          fallbackClassName="h-full w-full"
        />
      </div>

      <div className="flex flex-1 flex-col gap-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col gap-0.5">
            <h3 className="text-body font-semibold text-foreground">{productName}</h3>
            {customization ? (
              <p className="text-caption text-foreground-muted">{customization}</p>
            ) : null}
          </div>
          <IconButton
            label={t.cart.removeItemAria.replace("{name}", productName)}
            onClick={onRemove}
            variant="outline"
            size="sm"
          >
            <Trash2 className="h-4 w-4" />
          </IconButton>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <IconButton
              label={t.product.decreaseQty}
              onClick={onDecrement}
              disabled={item.quantity <= MIN_QUANTITY}
              variant="outline"
              size="sm"
            >
              <Minus className="h-3.5 w-3.5" />
            </IconButton>
            <span
              className="min-w-8 text-center text-body-sm font-medium text-foreground"
              aria-live="polite"
              aria-label={t.product.quantityLabel.replace("{qty}", String(item.quantity))}
            >
              {item.quantity}
            </span>
            <IconButton
              label={t.product.increaseQty}
              onClick={onIncrement}
              variant="outline"
              size="sm"
            >
              <Plus className="h-3.5 w-3.5" />
            </IconButton>
          </div>

          <p className="text-body font-semibold text-primary-600">
            {formatPrice(item.subtotal)}
          </p>
        </div>
      </div>
    </div>
  );
}
