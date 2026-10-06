"use client";

import { useState, useCallback } from "react";
import { useCart } from "@/components/cart/CartContext";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { CheckoutSummary } from "@/components/checkout/CheckoutSummary";
import { CartEmptyState } from "@/components/cart/CartEmptyState";
import { buildWhatsAppOrderPayload } from "@/lib/checkout/order";
import { generateWhatsAppMessage, buildWhatsAppUrl } from "@/lib/checkout/whatsapp";
import type { CheckoutFormData } from "@/lib/checkout/validation";

export function CheckoutPage() {
  const { items, subtotal, deliveryFee, total } = useCart();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(
    (data: CheckoutFormData) => {
      if (items.length === 0) {
        setError("Your cart is empty. Please add items before checking out.");
        return;
      }

      try {
        const order = buildWhatsAppOrderPayload(items, data);
        const message = generateWhatsAppMessage(order);
        const url = buildWhatsAppUrl(order.customer.phone, message);
        window.open(url, "_blank", "noopener,noreferrer");
      } catch {
        setError("Unable to generate order. Please try again.");
      }
    },
    [items],
  );

  if (items.length === 0) {
    return <CartEmptyState />;
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
      <div className="flex flex-col gap-4">
        <CheckoutForm onSubmit={handleSubmit} />
        {error ? (
          <p className="text-body-sm text-error-600" role="alert">
            {error}
          </p>
        ) : null}
      </div>

      <div className="lg:sticky lg:top-24">
        <CheckoutSummary
          items={items}
          subtotal={subtotal}
          deliveryFee={deliveryFee}
          total={total}
        />
      </div>
    </div>
  );
}
