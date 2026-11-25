"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { navLinks } from "@/config/navigation";
import { restaurant } from "@/config/restaurant";
import { IconButton } from "@/components/ui/IconButton";
import { Button } from "@/components/ui/Button";
import { LanguageSelector } from "@/components/layout/LanguageSelector";
import { CurrencySelector } from "@/components/layout/CurrencySelector";
import { usePreferences } from "@/components/preferences/PreferencesContext";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { t } = usePreferences();

  return (
    <div className="lg:hidden">
      <IconButton
        label={open ? t.header.closeMenu : t.header.openMenu}
        variant="brand"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-controls="mobile-menu"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </IconButton>

      <div
        id="mobile-menu"
        className={cn(
          "absolute inset-x-0 top-16 z-40 border-b border-white/10 bg-charcoal-900 shadow-elevated transition-all duration-200",
          open ? "visible opacity-100" : "invisible opacity-0",
        )}
      >
        <nav
          className="container-page flex flex-col gap-1 py-4"
          aria-label={t.nav.mobileAria}
        >
          <div className="mb-2 flex flex-wrap items-center justify-between gap-2 border-b border-white/10 px-4 pb-3 sm:hidden">
            <LanguageSelector />
            <CurrencySelector />
          </div>

          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "rounded-button px-4 py-3 text-nav transition-colors",
                  isActive
                    ? "bg-white/10 text-white"
                    : "text-white/70 hover:bg-white/5 hover:text-white",
                )}
                onClick={() => setOpen(false)}
              >
                {t.nav[link.key]}
              </Link>
            );
          })}
          <div className="mt-2 border-t border-white/10 px-4 pt-4">
            <Button href={`tel:${restaurant.phone}`} fullWidth>
              {t.header.callPhone} {restaurant.phone}
            </Button>
          </div>
        </nav>
      </div>
    </div>
  );
}
