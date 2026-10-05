import { restaurant } from "@/config/restaurant";
import { Container } from "@/components/ui/Container";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-charcoal-100 bg-surface/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <a
          href="/"
          className="flex items-center gap-2"
          aria-label={`${restaurant.name} home`}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-500 font-display text-lg font-bold text-white">
            {restaurant.name.charAt(0)}
          </span>
          <span className="font-display text-xl font-bold text-charcoal-900">
            {restaurant.name}
          </span>
        </a>
        <a
          href={`tel:${restaurant.phone}`}
          className="hidden text-sm font-semibold text-charcoal-600 transition-colors hover:text-brand-500 sm:block"
        >
          {restaurant.phone}
        </a>
      </Container>
    </header>
  );
}
