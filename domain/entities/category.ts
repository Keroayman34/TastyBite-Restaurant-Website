import type { LocalizedField } from "./i18n";

export interface Category {
  id: string;
  name: LocalizedField;
  description: LocalizedField;
  image: string;
  slug: string;
}
