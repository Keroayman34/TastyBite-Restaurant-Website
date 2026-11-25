import type { LocalizedField } from "./i18n";

export interface ProductOptionChoice {
  id: string;
  name: LocalizedField;
  priceDelta: number;
}

export interface ProductOption {
  id: string;
  name: LocalizedField;
  required: boolean;
  multiple: boolean;
  choices: ProductOptionChoice[];
}

export interface Product {
  id: string;
  name: LocalizedField;
  description: LocalizedField;
  categoryId: string;
  basePrice: number;
  image: string;
  available: boolean;
  tags: string[];
  rating: number;
  reviewCount: number;
  options: ProductOption[];
}
