import type { LocalizedField } from "./i18n";

export interface Offer {
  id: string;
  title: LocalizedField;
  description: LocalizedField;
  originalPrice: number;
  discountedPrice: number;
  image: string;
  items: LocalizedField[];
}
