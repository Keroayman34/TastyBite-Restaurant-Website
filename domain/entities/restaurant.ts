import type { SocialLink } from "./social-link";

export interface WorkingHours {
  days: string;
  hours: string;
}

export interface Restaurant {
  id: string;
  name: string;
  tagline: string;
  logoUrl: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  workingHours: WorkingHours[];
  socialLinks: SocialLink[];
  mapUrl: string;
  currency: string;
  deliveryFee: number;
}
