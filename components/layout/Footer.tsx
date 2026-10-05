import { restaurant } from "@/config/restaurant";
import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer className="border-t border-charcoal-100 bg-surface-muted">
      <Container className="flex flex-col gap-6 py-10">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-500 font-display text-lg font-bold text-white">
              {restaurant.name.charAt(0)}
            </span>
            <span className="font-display text-xl font-bold text-charcoal-900">
              {restaurant.name}
            </span>
          </div>
          <p className="text-sm text-charcoal-500">{restaurant.tagline}</p>
        </div>
        <div className="flex flex-col gap-2 text-sm text-charcoal-500">
          <a
            href={`mailto:${restaurant.email}`}
            className="transition-colors hover:text-brand-500"
          >
            {restaurant.email}
          </a>
          <a
            href={`tel:${restaurant.phone}`}
            className="transition-colors hover:text-brand-500"
          >
            {restaurant.phone}
          </a>
          <p>{restaurant.address}</p>
        </div>
        <p className="border-t border-charcoal-100 pt-6 text-xs text-charcoal-400">
          &copy; {new Date().getFullYear()} {restaurant.name}. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}
