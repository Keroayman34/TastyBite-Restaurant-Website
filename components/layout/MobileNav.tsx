"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { navLinks } from "@/config/navigation";
import { restaurant } from "@/config/restaurant";
import { IconButton } from "@/components/ui/IconButton";
import { Button } from "@/components/ui/Button";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <IconButton
        label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-controls="mobile-menu"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </IconButton>

      <div
        id="mobile-menu"
        className={cn(
          "absolute inset-x-0 top-16 z-40 border-b border-border bg-surface shadow-elevated transition-all duration-200",
          open ? "visible opacity-100" : "invisible opacity-0",
        )}
      >
        <nav className="container-page flex flex-col gap-1 py-4" aria-label="Mobile">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-button px-4 py-3 text-nav text-foreground transition-colors hover:bg-charcoal-50 hover:text-primary-600"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-2 border-t border-border px-4 pt-4">
            <Button href={`tel:${restaurant.phone}`} fullWidth>
              Call {restaurant.phone}
            </Button>
          </div>
        </nav>
      </div>
    </div>
  );
}
