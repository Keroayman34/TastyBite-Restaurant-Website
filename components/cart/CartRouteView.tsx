"use client";

import { Container } from "@/components/ui/Container";
import { CartPage } from "@/components/cart/CartPage";
import { usePreferences } from "@/components/preferences/PreferencesContext";

export function CartRouteView() {
  const { t } = usePreferences();

  return (
    <section className="section-spacing bg-surface-muted">
      <Container className="flex flex-col gap-8">
        <h1 className="text-h1 text-foreground">{t.cart.pageTitle}</h1>
        <CartPage />
      </Container>
    </section>
  );
}
