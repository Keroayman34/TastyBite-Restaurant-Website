import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { restaurant } from "@/config/restaurant";

export default function HomePage() {
  return (
    <Container className="flex flex-col items-center gap-6 py-24 text-center">
      <span className="text-sm font-semibold uppercase tracking-widest text-brand-500">
        Phase 1 — Foundation
      </span>
      <h1 className="text-4xl font-bold text-charcoal-900 sm:text-5xl">
        {restaurant.name}
      </h1>
      <p className="max-w-xl text-lg text-charcoal-500">
        {restaurant.tagline}. The project foundation is in place — design system, data
        layer, and architecture are ready for Phase 2.
      </p>
      <Button href={`tel:${restaurant.phone}`} size="lg">
        Call {restaurant.phone}
      </Button>
    </Container>
  );
}
