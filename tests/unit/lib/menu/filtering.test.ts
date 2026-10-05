import { describe, expect, it } from "vitest";
import { filterByCategory, filterByTags } from "@/lib/menu/filtering";
import type { FilterTag } from "@/lib/menu";
import { products } from "@/data/products";

describe("filterByCategory", () => {
  it("returns all products when category is null", () => {
    expect(filterByCategory(products, null)).toHaveLength(products.length);
  });

  it("filters products by category", () => {
    const results = filterByCategory(products, "cat-pizza");
    expect(results.length).toBeGreaterThan(0);
    expect(results.every((p) => p.categoryId === "cat-pizza")).toBe(true);
  });

  it("returns empty array for unknown category", () => {
    expect(filterByCategory(products, "cat-unknown")).toHaveLength(0);
  });
});

describe("filterByTags", () => {
  it("returns all products when no tags selected", () => {
    expect(filterByTags(products, [])).toHaveLength(products.length);
  });

  it("filters products by single tag", () => {
    const results = filterByTags(products, ["popular"]);
    expect(results.length).toBeGreaterThan(0);
    expect(results.every((p) => p.tags.includes("popular"))).toBe(true);
  });

  it("filters products by multiple tags (OR logic)", () => {
    const results = filterByTags(products, ["veggie", "spicy"]);
    expect(results.length).toBeGreaterThan(0);
    expect(
      results.every((p) => p.tags.includes("veggie") || p.tags.includes("spicy")),
    ).toBe(true);
  });

  it("returns empty array for tag with no matches", () => {
    expect(filterByTags(products, ["nonexistent" as FilterTag])).toHaveLength(0);
  });
});
