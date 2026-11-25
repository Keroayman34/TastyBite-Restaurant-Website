"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { GalleryGrid } from "@/components/pages/GalleryGrid";
import { restaurant } from "@/config/restaurant";
import { usePreferences } from "@/components/preferences/PreferencesContext";

export function GalleryView() {
  const { t } = usePreferences();
  const instagramLink = restaurant.socialLinks.find((l) => l.platform === "instagram");

  return (
    <section className="section-spacing bg-surface-muted">
      <Container className="flex flex-col gap-10">
        <SectionHeading
          eyebrow={t.gallery.eyebrow}
          title={t.gallery.title}
          description={t.gallery.description}
        />

        {instagramLink?.active ? (
          <div className="flex justify-center">
            <Button href={instagramLink.url} variant="outline" size="lg">
              {t.gallery.followInstagram}
            </Button>
          </div>
        ) : (
          <div className="flex justify-center">
            <Button variant="outline" size="lg" disabled>
              {t.gallery.followComingSoon}
            </Button>
          </div>
        )}

        <GalleryGrid />
      </Container>
    </section>
  );
}
