"use client";

import { useState, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { CategorySidebar } from "@/components/menu/CategorySidebar";
import { MenuToolbar } from "@/components/menu/MenuToolbar";
import { FilterChips } from "@/components/menu/FilterChips";
import { ProductGrid } from "@/components/menu/ProductGrid";
import { EmptyMenuState } from "@/components/menu/EmptyMenuState";
import { searchProducts, filterByCategory, filterByTags, sortProducts } from "@/lib/menu";
import type { FilterTag, SortOption } from "@/lib/menu";
import { products } from "@/data/products";
import { categories } from "@/data/categories";

interface MenuClientProps {
  initialCategory?: string | null;
}

export function MenuClient({ initialCategory = null }: MenuClientProps) {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [activeFilters, setActiveFilters] = useState<FilterTag[]>([]);
  const [sort, setSort] = useState<SortOption>("featured");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    initialCategory ?? null,
  );

  const navigateToCategory = useCallback(
    (slug: string | null) => {
      setSelectedCategory(slug);
      const url = slug ? `/menu?category=${slug}` : "/menu";
      router.push(url);
    },
    [router],
  );

  const toggleFilter = useCallback((tag: FilterTag) => {
    setActiveFilters((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  }, []);

  const clearAll = useCallback(() => {
    setSearch("");
    setActiveFilters([]);
  }, []);

  const filteredProducts = useMemo(() => {
    const categoryId = selectedCategory
      ? (categories.find((c) => c.slug === selectedCategory)?.id ?? null)
      : null;

    let result = products;
    result = filterByCategory(result, categoryId);
    result = searchProducts(result, search);
    result = filterByTags(result, activeFilters);
    result = sortProducts(result, sort);
    return result;
  }, [selectedCategory, search, activeFilters, sort]);

  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
      <aside className="lg:w-56 lg:shrink-0">
        <CategorySidebar
          activeCategory={selectedCategory}
          onSelect={navigateToCategory}
        />
      </aside>

      <div className="flex flex-1 flex-col gap-6">
        <MenuToolbar
          search={search}
          onSearchChange={setSearch}
          sort={sort}
          onSortChange={setSort}
        />

        <FilterChips activeFilters={activeFilters} onToggle={toggleFilter} />

        {filteredProducts.length > 0 ? (
          <ProductGrid products={filteredProducts} />
        ) : (
          <EmptyMenuState onClear={clearAll} />
        )}
      </div>
    </div>
  );
}
