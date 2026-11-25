"use client";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { usePreferences } from "@/components/preferences/PreferencesContext";

export default function NotFound() {
  const { t } = usePreferences();

  return (
    <Container className="flex flex-col items-center gap-4 py-24 text-center">
      <p className="text-6xl font-bold text-brand-500">404</p>
      <h1 className="text-2xl font-bold text-charcoal-900">{t.notFound.title}</h1>
      <p className="text-charcoal-500">{t.notFound.description}</p>
      <Button href="/">{t.notFound.backHome}</Button>
    </Container>
  );
}
