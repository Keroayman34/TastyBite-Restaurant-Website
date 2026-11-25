"use client";

import Link from "next/link";
import { usePreferences } from "@/components/preferences/PreferencesContext";

interface CartSummaryProps {
  subtotal: number;
  deliveryFee: number;
  total: number;
}

export function CartSummary({ subtotal, deliveryFee, total }: CartSummaryProps) {
  const { t, formatPrice } = usePreferences();

  return (
    <div className="flex flex-col gap-4 rounded-card border border-border bg-surface p-6 shadow-card">
      <h2 className="text-h4 text-foreground">{t.cart.orderSummary}</h2>

      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-body text-foreground-muted">{t.cart.subtotal}</span>
          <span className="text-body font-medium text-foreground">
            {formatPrice(subtotal)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-body text-foreground-muted">{t.cart.deliveryFee}</span>
          <span className="text-body font-medium text-foreground">
            {formatPrice(deliveryFee)}
          </span>
        </div>

        <div className="border-t border-border pt-3">
          <div className="flex items-center justify-between">
            <span className="text-body font-semibold text-foreground">
              {t.cart.total}
            </span>
            <span className="text-h3 font-bold text-primary-600">
              {formatPrice(total)}
            </span>
          </div>
        </div>
      </div>

      <Link
        href="/checkout"
        className="mt-2 inline-flex h-12 items-center justify-center rounded-button bg-primary-500 text-body-lg font-semibold text-white shadow-cta transition-colors hover:bg-primary-600"
      >
        {t.cart.proceedToCheckout}
      </Link>
    </div>
  );
}
