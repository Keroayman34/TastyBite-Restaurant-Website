import type { Product } from "@/domain/entities";
import type { FilterTag } from "./types";

export function filterByCategory(
  products: Product[],
  categoryId: string | null,
): Product[] {
  if (!categoryId) return products;
  return products.filter((p) => p.categoryId === categoryId);
}

export function filterByTags(products: Product[], tags: FilterTag[]): Product[] {
  if (tags.length === 0) return products;
  return products.filter((p) => tags.some((tag) => p.tags.includes(tag)));
}
