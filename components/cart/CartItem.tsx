"use client";

import { Minus, Plus, Trash2 } from "lucide-react";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { IconButton } from "@/components/ui/IconButton";
import { formatPrice } from "@/lib/format";
import { restaurant } from "@/config/restaurant";
import { MIN_QUANTITY } from "@/lib/menu/pricing";
import type { CartItem as CartItemType } from "@/domain/entities";

interface CartItemProps {
  item: CartItemType;
  onIncrement: () => void;
  onDecrement: () => void;
  onRemove: () => void;
}

function getCustomizationSummary(item: CartItemType): string {
  return item.selectedOptions
    .map((opt) => opt.choices.map((c) => c.name).join(", "))
    .filter(Boolean)
    .join(" · ");
}

export function CartItem({ item, onIncrement, onDecrement, onRemove }: CartItemProps) {
  const customization = getCustomizationSummary(item);

  return (
    <div className="flex gap-4 rounded-card border border-border bg-surface p-4 shadow-card">
      <div className="h-20 w-20 shrink-0 overflow-hidden rounded-image bg-charcoal-50">
        <ImageWithFallback
          src={item.product.image}
          alt={item.product.name}
          unoptimized
          fill
          className="object-cover"
          fallbackClassName="h-full w-full"
        />
      </div>

      <div className="flex flex-1 flex-col gap-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col gap-0.5">
            <h3 className="text-body font-semibold text-foreground">
              {item.product.name}
            </h3>
            {customization ? (
              <p className="text-caption text-foreground-muted">{customization}</p>
            ) : null}
          </div>
          <IconButton
            label={`Remove ${item.product.name} from cart`}
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
              label="Decrease quantity"
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
              aria-label={`Quantity: ${item.quantity}`}
            >
              {item.quantity}
            </span>
            <IconButton
              label="Increase quantity"
              onClick={onIncrement}
              variant="outline"
              size="sm"
            >
              <Plus className="h-3.5 w-3.5" />
            </IconButton>
          </div>

          <p className="text-body font-semibold text-primary-600">
            {formatPrice(item.subtotal, restaurant.currency)}
          </p>
        </div>
      </div>
    </div>
  );
}
