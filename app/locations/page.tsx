import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LocationSelector } from "@/components/pages/LocationSelector";

export const metadata: Metadata = {
  title: "Our Locations",
  description:
    "Find your nearest TastyBite branch. Visit us at any of our convenient locations.",
};

export default function LocationsPage() {
  return (
    <section className="section-spacing bg-surface-muted">
      <Container className="flex flex-col gap-10">
        <SectionHeading
          eyebrow="Visit Us"
          title="Our Locations"
          description="Find your nearest TastyBite branch and come enjoy a delicious meal with us."
        />
        <LocationSelector />
      </Container>
    </section>
  );
}
