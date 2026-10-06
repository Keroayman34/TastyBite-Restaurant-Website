import { restaurant } from "@/config/restaurant";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import { MobileNav } from "@/components/layout/MobileNav";
import { NavLinks } from "@/components/layout/NavLinks";
import { CartIcon } from "@/components/cart/CartIcon";
import { Search } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-charcoal-900/95 backdrop-blur">
      <Container className="relative flex h-16 items-center justify-between gap-4">
        <a
          href="/"
          className="flex shrink-0 items-center gap-2"
          aria-label={`${restaurant.name} home`}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-500 font-display text-lg font-bold text-white">
            {restaurant.name.charAt(0)}
          </span>
          <span className="font-display text-xl font-bold text-white">
            {restaurant.name}
          </span>
        </a>

        <NavLinks />

        <div className="flex items-center gap-2">
          <IconButton
            label="Search"
            className="text-white/70 hover:bg-white/10 hover:text-white"
          >
            <Search className="h-5 w-5" />
          </IconButton>
          <CartIcon />
          <Button href={`tel:${restaurant.phone}`} className="hidden md:inline-flex">
            Order Now
          </Button>
          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
