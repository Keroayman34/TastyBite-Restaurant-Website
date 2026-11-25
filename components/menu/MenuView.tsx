"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MenuClient } from "@/components/menu/MenuClient";
import { usePreferences } from "@/components/preferences/PreferencesContext";

export function MenuView({
  initialCategory = null,
}: {
  initialCategory?: string | null;
}) {
  const { t } = usePreferences();

  return (
    <section className="section-spacing bg-surface-muted">
      <Container className="flex flex-col gap-8">
        <SectionHeading
          eyebrow={t.menu.eyebrow}
          title={t.menu.title}
          description={t.menu.description}
        />
        <MenuClient initialCategory={initialCategory} />
      </Container>
    </section>
  );
}
