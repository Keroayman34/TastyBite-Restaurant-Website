"use client";

import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { usePreferences } from "@/components/preferences/PreferencesContext";

export function CartEmptyState() {
  const { t } = usePreferences();

  return (
    <div className="flex flex-col items-center gap-4 py-16 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-charcoal-100 text-charcoal-400">
        <ShoppingCart className="h-8 w-8" />
      </span>
      <div className="flex flex-col gap-1">
        <h2 className="text-h3 text-foreground">{t.cart.emptyTitle}</h2>
        <p className="text-body-sm text-foreground-muted">{t.cart.emptyDescription}</p>
      </div>
      <Button href="/menu">{t.cart.browseMenu}</Button>
    </div>
  );
}
