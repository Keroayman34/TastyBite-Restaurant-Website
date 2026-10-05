import type { Product, ProductOptionChoice } from "./product";

export interface SelectedOption {
  optionId: string;
  optionName: string;
  choices: ProductOptionChoice[];
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selectedOptions: SelectedOption[];
  unitPrice: number;
  subtotal: number;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
}
