import { getLocalizedText } from "@/domain/entities";
import { restaurant } from "@/config/restaurant";

export interface RestaurantStructuredData {
  "@context": string;
  "@type": string;
  name: string;
  description: string;
  telephone: string;
  email: string;
  priceRange: string;
  address: {
    "@type": string;
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  servesCuisine: string[];
  openingHours: string[];
  url: string;
}

export function getStructuredData(): RestaurantStructuredData {
  const tagline = getLocalizedText(restaurant.tagline, "it");
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: restaurant.name,
    description: `${restaurant.name} — ${tagline}. ${restaurant.address}.`,
    telephone: restaurant.phone,
    email: restaurant.email,
    priceRange: "€€",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Via del Corso 123",
      addressLocality: "Roma",
      addressRegion: "RM",
      postalCode: "00186",
      addressCountry: "IT",
    },
    servesCuisine: ["Pizza", "Burgers", "Chicken", "Pasta", "Salads", "Desserts"],
    openingHours: restaurant.workingHours.map(
      (h) => `${getLocalizedText(h.days, "it")}: ${h.hours}`,
    ),
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  };
}

export interface BreadcrumbItem {
  label: string;
  href: string;
}

export function getBreadcrumbStructuredData(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}${item.href}`,
    })),
  };
}
