import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MenuClient } from "@/components/menu/MenuClient";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Browse our full menu of delicious pizzas, burgers, chicken, pasta, salads, drinks, and desserts.",
};

export default function MenuPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  return (
    <section className="section-spacing bg-surface-muted">
      <Container className="flex flex-col gap-8">
        <SectionHeading
          eyebrow="TastyBite"
          title="Our Menu"
          description="Discover our delicious selection of meals made fresh every day."
        />
        <MenuClient initialCategory={searchParams.category ?? null} />
      </Container>
    </section>
  );
}
