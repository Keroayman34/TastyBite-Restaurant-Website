import { describe, expect, it } from "vitest";
import {
  calculateCartSubtotal,
  calculateDeliveryFee,
  calculateCartTotal,
  calculateItemCount,
} from "@/lib/cart/cart-calculations";
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

describe("cart calculations", () => {
  it("calculates empty subtotal", () => {
    expect(calculateCartSubtotal([])).toBe(0);
  });

  it("calculates single item subtotal", () => {
    const items = [makeCartItem({ subtotal: 150 })];
    expect(calculateCartSubtotal(items)).toBe(150);
  });

  it("calculates multiple item subtotal", () => {
    const items = [
      makeCartItem({ id: "1", subtotal: 150 }),
      makeCartItem({ id: "2", subtotal: 200 }),
    ];
    expect(calculateCartSubtotal(items)).toBe(350);
  });

  it("charges delivery fee when cart has items", () => {
    const items = [makeCartItem()];
    expect(calculateDeliveryFee(items, 50)).toBe(50);
  });

  it("does not charge delivery fee for empty cart", () => {
    expect(calculateDeliveryFee([], 50)).toBe(0);
  });

  it("calculates total", () => {
    expect(calculateCartTotal(480, 50)).toBe(530);
  });

  it("calculates empty cart total", () => {
    expect(calculateCartTotal(0, 0)).toBe(0);
  });

  it("calculates item count", () => {
    const items = [
      makeCartItem({ id: "1", quantity: 2 }),
      makeCartItem({ id: "2", quantity: 3 }),
    ];
    expect(calculateItemCount(items)).toBe(5);
  });

  it("calculates empty item count", () => {
    expect(calculateItemCount([])).toBe(0);
  });
});
