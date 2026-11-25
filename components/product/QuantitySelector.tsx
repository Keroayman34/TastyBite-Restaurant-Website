"use client";

import { Minus, Plus } from "lucide-react";
import { IconButton } from "@/components/ui/IconButton";
import { MIN_QUANTITY } from "@/lib/menu/pricing";
import { usePreferences } from "@/components/preferences/PreferencesContext";

interface QuantitySelectorProps {
  quantity: number;
  onChange: (quantity: number) => void;
}

export function QuantitySelector({ quantity, onChange }: QuantitySelectorProps) {
  const { t } = usePreferences();

  const decrease = () => {
    if (quantity > MIN_QUANTITY) {
      onChange(quantity - 1);
    }
  };

  const increase = () => {
    onChange(quantity + 1);
  };

  return (
    <div className="flex items-center gap-3">
      <IconButton
        label={t.product.decreaseQty}
        onClick={decrease}
        disabled={quantity <= MIN_QUANTITY}
        variant="outline"
      >
        <Minus className="h-4 w-4" />
      </IconButton>
      <span
        className="min-w-10 text-center text-body font-semibold text-foreground"
        aria-live="polite"
        aria-label={t.product.quantityLabel.replace("{qty}", String(quantity))}
      >
        {quantity}
      </span>
      <IconButton label={t.product.increaseQty} onClick={increase} variant="outline">
        <Plus className="h-4 w-4" />
      </IconButton>
    </div>
  );
}
