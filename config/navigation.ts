import type { TranslationDictionary } from "@/lib/i18n";

export interface NavLink {
  key: keyof Pick<
    TranslationDictionary["nav"],
    "home" | "menu" | "about" | "offers" | "contact" | "locations" | "reviews" | "gallery"
  >;
  href: string;
}

export const navLinks: NavLink[] = [
  { key: "home", href: "/" },
  { key: "menu", href: "/menu" },
  { key: "about", href: "/about" },
  { key: "offers", href: "/offers" },
  { key: "contact", href: "/contact" },
];

export const footerLinks: NavLink[] = [
  { key: "home", href: "/" },
  { key: "menu", href: "/menu" },
  { key: "about", href: "/about" },
  { key: "offers", href: "/offers" },
  { key: "contact", href: "/contact" },
  { key: "locations", href: "/locations" },
  { key: "reviews", href: "/reviews" },
  { key: "gallery", href: "/gallery" },
];
