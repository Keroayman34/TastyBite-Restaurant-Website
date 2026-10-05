export interface ProductOptionChoice {
  id: string;
  name: string;
  priceDelta: number;
}

export interface ProductOption {
  id: string;
  name: string;
  required: boolean;
  multiple: boolean;
  choices: ProductOptionChoice[];
}

export interface Product {
  id: string;
  name: string;
  description: string;
  categoryId: string;
  basePrice: number;
  image: string;
  available: boolean;
  tags: string[];
  rating: number;
  reviewCount: number;
  options: ProductOption[];
}
