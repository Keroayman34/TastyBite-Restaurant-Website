"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/components/cart/CartContext";
import { usePreferences } from "@/components/preferences/PreferencesContext";

export function CartIcon() {
  const { itemCount } = useCart();
  const { t } = usePreferences();

  return (
    <Link
      href="/cart"
      aria-label={
        itemCount > 0
          ? t.header.cartAriaWithCount.replace("{count}", String(itemCount))
          : t.header.cartAria
      }
      className="relative flex h-10 w-10 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
    >
      <ShoppingCart className="h-5 w-5" />
      {itemCount > 0 ? (
        <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary-500 text-caption font-bold text-white">
          {itemCount > 99 ? "99+" : itemCount}
        </span>
      ) : null}
    </Link>
  );
}
