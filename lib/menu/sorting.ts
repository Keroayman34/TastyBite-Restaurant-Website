import type { Product } from "@/domain/entities";
import type { SortOption } from "./types";

export function sortProducts(products: Product[], sort: SortOption): Product[] {
  const sorted = [...products];

  switch (sort) {
    case "price-asc":
      return sorted.sort((a, b) => a.basePrice - b.basePrice);
    case "price-desc":
      return sorted.sort((a, b) => b.basePrice - a.basePrice);
    case "name-asc":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case "featured":
    default:
      return sorted.sort((a, b) => {
        const aPopular = a.tags.includes("popular") ? 1 : 0;
        const bPopular = b.tags.includes("popular") ? 1 : 0;
        return bPopular - aPopular;
      });
  }
}
