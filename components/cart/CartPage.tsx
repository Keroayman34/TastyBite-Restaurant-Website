"use client";

import { useCart } from "@/components/cart/CartContext";
import { CartItem } from "@/components/cart/CartItem";
import { CartSummary } from "@/components/cart/CartSummary";
import { CartEmptyState } from "@/components/cart/CartEmptyState";
import { usePreferences } from "@/components/preferences/PreferencesContext";

export function CartPage() {
  const {
    items,
    itemCount,
    subtotal,
    deliveryFee,
    total,
    incrementItem,
    decrementItem,
    removeItem,
  } = useCart();
  const { t } = usePreferences();

  if (items.length === 0) {
    return <CartEmptyState />;
  }

  const itemLabel = itemCount === 1 ? t.cart.itemSingular : t.cart.itemPlural;

  return (
    <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
      <div className="flex flex-1 flex-col gap-4">
        <h2 className="text-h3 text-foreground">
          {t.cart.yourCart}{" "}
          <span className="text-foreground-muted">
            ({itemCount} {itemLabel})
          </span>
        </h2>
        {items.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onIncrement={() => incrementItem(item.id)}
            onDecrement={() => decrementItem(item.id)}
            onRemove={() => removeItem(item.id)}
          />
        ))}
      </div>

      <aside className="lg:w-80 lg:shrink-0">
        <CartSummary subtotal={subtotal} deliveryFee={deliveryFee} total={total} />
      </aside>
    </div>
  );
}
