import { describe, expect, it } from "vitest";
import { serializeCart, deserializeCart } from "@/lib/cart/cart-serialization";
import type { CartItem } from "@/domain/entities";

function makeCartItem(overrides: Partial<CartItem> = {}): CartItem {
  return {
    id: "test-item",
    product: {
      id: "prod-test",
      name: "Test",
      description: "Test",
      categoryId: "cat-pizza",
      basePrice: 100,
      image: "/images/products/test.svg",
      available: true,
      tags: [],
      rating: 4.5,
      reviewCount: 10,
      options: [],
    },
    quantity: 1,
    selectedOptions: [],
    unitPrice: 100,
    subtotal: 100,
    ...overrides,
  };
}

describe("cart serialization", () => {
  it("serializes and deserializes cart", () => {
    const state = { items: [makeCartItem()] };
    const serialized = serializeCart(state);
    const deserialized = deserializeCart(serialized);
    expect(deserialized).toEqual(state);
  });

  it("returns null for invalid JSON", () => {
    expect(deserializeCart("not json")).toBeNull();
  });

  it("returns null for non-object", () => {
    expect(deserializeCart('"string"')).toBeNull();
  });

  it("returns null for missing items array", () => {
    expect(deserializeCart('{"foo":"bar"}')).toBeNull();
  });

  it("returns null for invalid item shape", () => {
    expect(deserializeCart('{"items":[{"id":"test"}]}')).toBeNull();
  });

  it("returns null for negative quantity", () => {
    const item = makeCartItem({ quantity: -1 });
    expect(deserializeCart(serializeCart({ items: [item] }))).toBeNull();
  });

  it("returns null for zero quantity", () => {
    const item = makeCartItem({ quantity: 0 });
    expect(deserializeCart(serializeCart({ items: [item] }))).toBeNull();
  });

  it("returns null for negative price", () => {
    const item = makeCartItem({ unitPrice: -10 });
    expect(deserializeCart(serializeCart({ items: [item] }))).toBeNull();
  });

  it("returns null for missing product id", () => {
    const item = makeCartItem();
    const invalid = { items: [{ ...item, product: { name: "No ID" } }] };
    expect(deserializeCart(JSON.stringify(invalid))).toBeNull();
  });

  it("handles empty items array", () => {
    const result = deserializeCart('{"items":[]}');
    expect(result).toEqual({ items: [] });
  });
});
