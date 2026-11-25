import type { Restaurant } from "@/domain/entities";

export const restaurant: Restaurant = {
  id: "tastybite",
  name: "TastyBite",
  tagline: {
    it: "Mordi la felicità",
    en: "Bite into happiness",
  },
  logoUrl: "/images/logo.svg",
  phone: "+39 06 1234 5678",
  whatsapp: "+390612345678",
  email: "ciao@tastybite.it",
  address: "Via del Corso 123, 00186 Roma RM, Italia",
  workingHours: [
    {
      days: {
        it: "Lunedì - Venerdì",
        en: "Monday - Friday",
      },
      hours: "11:00 - 23:00",
    },
    {
      days: {
        it: "Sabato - Domenica",
        en: "Saturday - Sunday",
      },
      hours: "11:30 - 24:00",
    },
  ],
  socialLinks: [
    { id: "instagram", platform: "instagram", url: "", active: false },
    { id: "facebook", platform: "facebook", url: "", active: false },
    { id: "tiktok", platform: "tiktok", url: "", active: false },
    {
      id: "youtube",
      platform: "youtube",
      url: "https://youtube.com/@tastybite",
      active: true,
    },
  ],
  mapUrl: "https://maps.google.com/?q=Via+del+Corso+123+Roma+Italia",
  currency: "EUR",
  deliveryFee: 2.5,
  freeDeliveryThreshold: 25,
};
