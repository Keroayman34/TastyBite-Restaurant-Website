export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/menu" },
  { label: "About", href: "/about" },
  { label: "Offers", href: "/offers" },
  { label: "Contact", href: "/contact" },
];

export const footerLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/menu" },
  { label: "About", href: "/about" },
  { label: "Offers", href: "/offers" },
  { label: "Contact", href: "/contact" },
  { label: "Locations", href: "/locations" },
  { label: "Reviews", href: "/reviews" },
  { label: "Gallery", href: "/gallery" },
];
