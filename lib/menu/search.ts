import type { Product } from "@/domain/entities";
import { categories } from "@/data/categories";

export function searchProducts(products: Product[], query: string): Product[] {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return products;

  return products.filter((product) => {
    const nameMatch = product.name.toLowerCase().includes(normalizedQuery);
    const descriptionMatch = product.description.toLowerCase().includes(normalizedQuery);
    const tagMatch = product.tags.some((tag) =>
      tag.toLowerCase().includes(normalizedQuery),
    );

    const category = categories.find((c) => c.id === product.categoryId);
    const categoryMatch = category?.name.toLowerCase().includes(normalizedQuery) ?? false;

    return nameMatch || descriptionMatch || tagMatch || categoryMatch;
  });
}
