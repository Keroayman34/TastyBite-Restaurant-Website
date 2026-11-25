"use client";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Phone } from "lucide-react";
import { restaurant } from "@/config/restaurant";
import { usePreferences } from "@/components/preferences/PreferencesContext";

export function CtaBanner() {
  const { t } = usePreferences();

  return (
    <section className="section-spacing bg-primary-500">
      <Container className="flex flex-col items-center gap-6 text-center">
        <h2 className="max-w-2xl text-h2 text-white">{t.home.ctaTitle}</h2>
        <p className="max-w-xl text-body-lg text-white/80">{t.home.ctaDescription}</p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            href={`tel:${restaurant.phone}`}
            variant="secondary"
            size="lg"
            className="bg-white text-primary-600 hover:bg-white/90"
          >
            <Phone className="h-5 w-5" />
            {t.home.callToOrder}
          </Button>
          <Button
            href="/menu"
            variant="outline"
            size="lg"
            className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
          >
            {t.common.browseMenu}
          </Button>
        </div>
      </Container>
    </section>
  );
}
