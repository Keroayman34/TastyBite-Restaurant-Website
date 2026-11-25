import type { SocialLink } from "./social-link";
import type { CurrencyCode, LocalizedField } from "./i18n";

export interface WorkingHours {
  days: LocalizedField;
  hours: string;
}

export interface Restaurant {
  id: string;
  name: string;
  tagline: LocalizedField;
  logoUrl: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  workingHours: WorkingHours[];
  socialLinks: SocialLink[];
  mapUrl: string;
  currency: CurrencyCode;
  deliveryFee: number;
  freeDeliveryThreshold: number;
}
