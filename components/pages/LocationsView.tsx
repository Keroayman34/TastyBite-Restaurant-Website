"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LocationSelector } from "@/components/pages/LocationSelector";
import { usePreferences } from "@/components/preferences/PreferencesContext";

export function LocationsView() {
  const { t } = usePreferences();

  return (
    <section className="section-spacing bg-surface-muted">
      <Container className="flex flex-col gap-10">
        <SectionHeading
          eyebrow={t.locations.eyebrow}
          title={t.locations.title}
          description={t.locations.description}
        />
        <LocationSelector />
      </Container>
    </section>
  );
}
