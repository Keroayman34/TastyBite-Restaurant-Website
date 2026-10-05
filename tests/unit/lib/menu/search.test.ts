import { describe, expect, it } from "vitest";
import { searchProducts } from "@/lib/menu/search";
import { products } from "@/data/products";

describe("searchProducts", () => {
  it("returns all products for empty query", () => {
    expect(searchProducts(products, "")).toHaveLength(products.length);
    expect(searchProducts(products, "   ")).toHaveLength(products.length);
  });

  it("finds products by name (case-insensitive)", () => {
    const results = searchProducts(products, "margherita");
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].name).toContain("Margherita");
  });

  it("finds products by description", () => {
    const results = searchProducts(products, "alfredo");
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].name).toContain("Alfredo");
  });

  it("finds products by tag", () => {
    const results = searchProducts(products, "spicy");
    expect(results.length).toBeGreaterThan(0);
  });

  it("finds products by category name", () => {
    const results = searchProducts(products, "pizza");
    expect(results.length).toBeGreaterThan(0);
    expect(results.every((p) => p.categoryId === "cat-pizza")).toBe(true);
  });

  it("returns empty array for no matches", () => {
    const results = searchProducts(products, "xyznonexistent");
    expect(results).toHaveLength(0);
  });

  it("handles whitespace in query", () => {
    const results = searchProducts(products, "  chicken  ");
    expect(results.length).toBeGreaterThan(0);
  });
});
