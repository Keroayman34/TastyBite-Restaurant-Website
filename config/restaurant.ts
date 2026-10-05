import type { Restaurant } from "@/domain/entities";

export const restaurant: Restaurant = {
  id: "tastybite",
  name: "TastyBite",
  tagline: "Bite into happiness",
  logoUrl: "/images/logo.svg",
  phone: "+1 (555) 123-4567",
  whatsapp: "+15551234567",
  email: "hello@tastybite.com",
  address: "123 Flavor Street, Foodville, FV 12345",
  workingHours: [
    { days: "Monday - Friday", hours: "10:00 AM - 11:00 PM" },
    { days: "Saturday - Sunday", hours: "11:00 AM - 12:00 AM" },
  ],
  socialLinks: [
    { id: "instagram", platform: "instagram", url: "https://instagram.com/tastybite" },
    { id: "facebook", platform: "facebook", url: "https://facebook.com/tastybite" },
    { id: "tiktok", platform: "tiktok", url: "https://tiktok.com/@tastybite" },
    { id: "youtube", platform: "youtube", url: "https://youtube.com/@tastybite" },
  ],
  mapUrl: "https://maps.google.com/?q=123+Flavor+Street+Foodville",
  currency: "EGP",
  deliveryFee: 2.99,
};
