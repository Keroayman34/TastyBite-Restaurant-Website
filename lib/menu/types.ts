export type SortOption = "featured" | "price-asc" | "price-desc" | "name-asc";

export type FilterTag = "popular" | "new" | "offer" | "veggie" | "spicy";

export interface MenuState {
  search: string;
  category: string | null;
  filters: FilterTag[];
  sort: SortOption;
}
