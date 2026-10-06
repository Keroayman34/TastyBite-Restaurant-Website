import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { GalleryGrid } from "@/components/pages/GalleryGrid";
import { restaurant } from "@/config/restaurant";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Follow us on Instagram and explore our delicious food gallery.",
};

export default function GalleryPage() {
  const instagramLink = restaurant.socialLinks.find((l) => l.platform === "instagram");

  return (
    <section className="section-spacing bg-surface-muted">
      <Container className="flex flex-col gap-10">
        <SectionHeading
          eyebrow="Gallery"
          title="Follow Us On Instagram"
          description="Explore our delicious dishes, behind-the-scenes moments, and happy customers."
        />

        {instagramLink ? (
          <div className="flex justify-center">
            <Button href={instagramLink.url} variant="outline" size="lg">
              Follow @tastybite
            </Button>
          </div>
        ) : null}

        <GalleryGrid />
      </Container>
    </section>
  );
}
