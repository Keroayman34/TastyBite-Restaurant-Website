import { describe, expect, it } from "vitest";
import { sortProducts } from "@/lib/menu/sorting";
import { products } from "@/data/products";

describe("sortProducts", () => {
  it("sorts by price low to high", () => {
    const sorted = sortProducts(products, "price-asc");
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i].basePrice).toBeGreaterThanOrEqual(sorted[i - 1].basePrice);
    }
  });

  it("sorts by price high to low", () => {
    const sorted = sortProducts(products, "price-desc");
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i].basePrice).toBeLessThanOrEqual(sorted[i - 1].basePrice);
    }
  });

  it("sorts by name A-Z", () => {
    const sorted = sortProducts(products, "name-asc");
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i].name.localeCompare(sorted[i - 1].name)).toBeGreaterThanOrEqual(0);
    }
  });

  it("sorts featured with popular items first", () => {
    const sorted = sortProducts(products, "featured");
    const firstPopularIndex = sorted.findIndex((p) => !p.tags.includes("popular"));
    const lastPopularIndex = sorted.findLastIndex((p) => p.tags.includes("popular"));
    if (firstPopularIndex !== -1 && lastPopularIndex !== -1) {
      expect(lastPopularIndex).toBeLessThan(firstPopularIndex);
    }
  });

  it("does not mutate original array", () => {
    const original = [...products];
    sortProducts(products, "price-asc");
    expect(products).toEqual(original);
  });
});
