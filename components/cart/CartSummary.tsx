import Link from "next/link";
import { formatPrice } from "@/lib/format";
import { restaurant } from "@/config/restaurant";

interface CartSummaryProps {
  subtotal: number;
  deliveryFee: number;
  total: number;
}

export function CartSummary({ subtotal, deliveryFee, total }: CartSummaryProps) {
  return (
    <div className="flex flex-col gap-4 rounded-card border border-border bg-surface p-6 shadow-card">
      <h2 className="text-h4 text-foreground">Order Summary</h2>

      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-body text-foreground-muted">Subtotal</span>
          <span className="text-body font-medium text-foreground">
            {formatPrice(subtotal, restaurant.currency)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-body text-foreground-muted">Delivery Fee</span>
          <span className="text-body font-medium text-foreground">
            {formatPrice(deliveryFee, restaurant.currency)}
          </span>
        </div>

        <div className="border-t border-border pt-3">
          <div className="flex items-center justify-between">
            <span className="text-body font-semibold text-foreground">Total</span>
            <span className="text-h3 font-bold text-primary-600">
              {formatPrice(total, restaurant.currency)}
            </span>
          </div>
        </div>
      </div>

      <Link
        href="/checkout"
        className="mt-2 inline-flex h-12 items-center justify-center rounded-button bg-primary-500 text-body-lg font-semibold text-white shadow-cta transition-colors hover:bg-primary-600"
      >
        Proceed to Checkout
      </Link>
    </div>
  );
}
