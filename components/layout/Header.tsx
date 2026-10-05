import { restaurant } from "@/config/restaurant";
import { navLinks } from "@/config/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import { MobileNav } from "@/components/layout/MobileNav";
import { Search, ShoppingCart } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface/90 backdrop-blur">
      <Container className="relative flex h-16 items-center justify-between gap-4">
        <a
          href="/"
          className="flex shrink-0 items-center gap-2"
          aria-label={`${restaurant.name} home`}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-500 font-display text-lg font-bold text-white">
            {restaurant.name.charAt(0)}
          </span>
          <span className="font-display text-xl font-bold text-foreground">
            {restaurant.name}
          </span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-button px-4 py-2 text-nav text-foreground-muted transition-colors hover:bg-charcoal-50 hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <IconButton label="Search" className="hidden sm:inline-flex">
            <Search className="h-5 w-5" />
          </IconButton>
          <IconButton label="Cart" className="hidden sm:inline-flex">
            <ShoppingCart className="h-5 w-5" />
          </IconButton>
          <Button href={`tel:${restaurant.phone}`} className="hidden md:inline-flex">
            Order Now
          </Button>
          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
