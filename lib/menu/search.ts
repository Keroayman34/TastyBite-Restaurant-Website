import { type LocalizedField, type Product } from "@/domain/entities";
import { categories } from "@/data/categories";

function fieldIncludes(field: LocalizedField, normalizedQuery: string): boolean {
  if (typeof field === "string") {
    return field.toLowerCase().includes(normalizedQuery);
  }
  return (
    field.it.toLowerCase().includes(normalizedQuery) ||
    field.en.toLowerCase().includes(normalizedQuery)
  );
}

export function searchProducts(products: Product[], query: string): Product[] {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return products;

  return products.filter((product) => {
    const nameMatch = fieldIncludes(product.name, normalizedQuery);
    const descriptionMatch = fieldIncludes(product.description, normalizedQuery);
    const tagMatch = product.tags.some((tag) =>
      tag.toLowerCase().includes(normalizedQuery),
    );

    const category = categories.find((c) => c.id === product.categoryId);
    const categoryMatch = category
      ? fieldIncludes(category.name, normalizedQuery)
      : false;

    return nameMatch || descriptionMatch || tagMatch || categoryMatch;
  });
}
