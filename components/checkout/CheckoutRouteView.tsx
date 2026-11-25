"use client";

import { Container } from "@/components/ui/Container";
import { CheckoutPage } from "@/components/checkout/CheckoutPage";
import { usePreferences } from "@/components/preferences/PreferencesContext";

export function CheckoutRouteView() {
  const { t } = usePreferences();

  return (
    <section className="section-spacing bg-surface-muted">
      <Container className="flex flex-col gap-8">
        <h1 className="text-h1 text-foreground">{t.checkout.pageTitle}</h1>
        <CheckoutPage />
      </Container>
    </section>
  );
}
