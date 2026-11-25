import type { LocalizedField } from "./i18n";

export interface Review {
  id: string;
  customerName: string;
  rating: number;
  comment: LocalizedField;
  date: string;
  avatar: string;
}
