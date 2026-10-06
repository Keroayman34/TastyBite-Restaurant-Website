import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function CartEmptyState() {
  return (
    <div className="flex flex-col items-center gap-4 py-16 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-charcoal-100 text-charcoal-400">
        <ShoppingCart className="h-8 w-8" />
      </span>
      <div className="flex flex-col gap-1">
        <h2 className="text-h3 text-foreground">Your cart is empty</h2>
        <p className="text-body-sm text-foreground-muted">
          Looks like you have not added anything to your cart yet.
        </p>
      </div>
      <Button href="/menu">Browse Menu</Button>
    </div>
  );
}
