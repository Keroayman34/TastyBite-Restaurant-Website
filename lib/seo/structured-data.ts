import { restaurant } from "@/config/restaurant";

export interface RestaurantStructuredData {
  "@context": string;
  "@type": string;
  name: string;
  description: string;
  telephone: string;
  email: string;
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
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: restaurant.name,
    description: `${restaurant.name} — ${restaurant.tagline}. ${restaurant.address}.`,
    telephone: restaurant.phone,
    email: restaurant.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "123 Flavor Street",
      addressLocality: "Foodville",
      addressRegion: "FV",
      postalCode: "12345",
      addressCountry: "US",
    },
    servesCuisine: ["Pizza", "Burgers", "Chicken", "Pasta", "Salads", "Desserts"],
    openingHours: restaurant.workingHours.map((h) => `${h.days}: ${h.hours}`),
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
