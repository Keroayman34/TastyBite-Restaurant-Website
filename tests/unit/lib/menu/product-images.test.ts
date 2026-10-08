import { describe, expect, it } from "vitest";
import { products } from "@/data/products";
import { categories } from "@/data/categories";

describe("product image integrity", () => {
  it("every product has an image path defined", () => {
    products.forEach((product) => {
      expect(product.image).toBeDefined();
      expect(product.image.length).toBeGreaterThan(0);
    });
  });

  it("every product image path points to a real photo", () => {
    products.forEach((product) => {
      expect(product.image).toMatch(/\.jpg$/);
      expect(product.image).not.toContain("placeholder");
      expect(product.image).not.toContain("unavailable");
    });
  });

  it("no product uses a placeholder or SVG image", () => {
    products.forEach((product) => {
      expect(product.image).not.toContain("placeholder");
      expect(product.image).not.toContain("unavailable");
      expect(product.image).not.toMatch(/\.svg$/);
    });
  });

  it("Double Cheeseburger has a real double cheeseburger image", () => {
    const product = products.find((p) => p.name === "Double Cheeseburger");
    expect(product).toBeDefined();
    expect(product!.image).toBe("/images/products/double-cheeseburger.jpg");
  });

  it("Berry Blast Smoothie has a real smoothie image, not a burger", () => {
    const product = products.find((p) => p.name === "Berry Blast Smoothie");
    expect(product).toBeDefined();
    expect(product!.image).toBe("/images/products/berry-blast-smoothie.jpg");
    expect(product!.image).not.toContain("burger");
  });

  it("Hot Chocolate has a real hot chocolate image and is available", () => {
    const product = products.find((p) => p.name === "Hot Chocolate");
    expect(product).toBeDefined();
    expect(product!.image).toBe("/images/products/hot-chocolate.jpg");
    expect(product!.available).toBe(true);
  });

  it("every product has a unique image path", () => {
    const imagePaths = products.map((p) => p.image);
    const uniquePaths = new Set(imagePaths);
    expect(uniquePaths.size).toBe(products.length);
  });

  it("every product has a unique ID", () => {
    const ids = products.map((p) => p.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(products.length);
  });

  it("every product has a rating and review count", () => {
    products.forEach((product) => {
      expect(product.rating).toBeGreaterThan(0);
      expect(product.rating).toBeLessThanOrEqual(5);
      expect(product.reviewCount).toBeGreaterThan(0);
    });
  });

  it("every product has a positive price", () => {
    products.forEach((product) => {
      expect(product.basePrice).toBeGreaterThan(0);
    });
  });

  it("every product belongs to a valid category", () => {
    const categoryIds = categories.map((c) => c.id);
    products.forEach((product) => {
      expect(categoryIds).toContain(product.categoryId);
    });
  });

  it("every category has at least 5 products", () => {
    categories.forEach((category) => {
      const count = products.filter((p) => p.categoryId === category.id).length;
      expect(count, `${category.name} has only ${count} products`).toBeGreaterThanOrEqual(
        5,
      );
    });
  });
});
