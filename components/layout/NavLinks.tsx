"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { navLinks } from "@/config/navigation";
import { usePreferences } from "@/components/preferences/PreferencesContext";

export function NavLinks() {
  const pathname = usePathname();
  const { t } = usePreferences();

  return (
    <nav className="hidden items-center gap-1 lg:flex" aria-label={t.nav.mainAria}>
      {navLinks.map((link) => {
        const isActive = pathname === link.href;

        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "whitespace-nowrap rounded-button px-3 py-2 text-nav transition-colors",
              isActive
                ? "bg-white/10 text-white"
                : "text-white/70 hover:bg-white/5 hover:text-white",
            )}
          >
            {t.nav[link.key]}
          </Link>
        );
      })}
    </nav>
  );
}
