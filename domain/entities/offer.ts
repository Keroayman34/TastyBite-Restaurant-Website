export interface Offer {
  id: string;
  title: string;
  description: string;
  originalPrice: number;
  discountedPrice: number;
  image: string;
  items: string[];
}
