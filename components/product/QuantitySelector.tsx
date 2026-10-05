"use client";

import { Minus, Plus } from "lucide-react";
import { IconButton } from "@/components/ui/IconButton";
import { MIN_QUANTITY } from "@/lib/menu/pricing";

interface QuantitySelectorProps {
  quantity: number;
  onChange: (quantity: number) => void;
}

export function QuantitySelector({ quantity, onChange }: QuantitySelectorProps) {
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
        label="Decrease quantity"
        onClick={decrease}
        disabled={quantity <= MIN_QUANTITY}
        variant="outline"
      >
        <Minus className="h-4 w-4" />
      </IconButton>
      <span
        className="min-w-10 text-center text-body font-semibold text-foreground"
        aria-live="polite"
        aria-label={`Quantity: ${quantity}`}
      >
        {quantity}
      </span>
      <IconButton label="Increase quantity" onClick={increase} variant="outline">
        <Plus className="h-4 w-4" />
      </IconButton>
    </div>
  );
}
