import { describe, expect, it } from "vitest";
import { cartReducer } from "@/lib/cart/cart-reducer";
import { initialCartState } from "@/lib/cart/types";
import type { CartItem } from "@/domain/entities";

function makeCartItem(overrides: Partial<CartItem> = {}): CartItem {
  return {
    id: "test-item-1",
    product: {
      id: "prod-test",
      name: "Test Product",
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

describe("cartReducer", () => {
  it("returns initial state for unknown action", () => {
    const state = cartReducer(initialCartState, { type: "CLEAR_CART" });
    expect(state.items).toHaveLength(0);
  });

  it("adds item to empty cart", () => {
    const item = makeCartItem();
    const state = cartReducer(initialCartState, { type: "ADD_ITEM", item });
    expect(state.items).toHaveLength(1);
    expect(state.items[0].id).toBe(item.id);
  });

  it("merges quantity when adding same configuration", () => {
    const item1 = makeCartItem({
      id: "item-1",
      quantity: 1,
      unitPrice: 100,
      subtotal: 100,
    });
    const item2 = makeCartItem({
      id: "item-2",
      quantity: 2,
      unitPrice: 100,
      subtotal: 200,
    });

    let state = cartReducer(initialCartState, { type: "ADD_ITEM", item: item1 });
    state = cartReducer(state, { type: "ADD_ITEM", item: item2 });

    expect(state.items).toHaveLength(1);
    expect(state.items[0].quantity).toBe(3);
    expect(state.items[0].subtotal).toBe(300);
  });

  it("creates separate item for different configuration", () => {
    const item1 = makeCartItem({
      id: "item-1",
      selectedOptions: [
        {
          optionId: "opt-size",
          optionName: "Size",
          choices: [{ id: "choice-small", name: "Small", priceDelta: 0 }],
        },
      ],
    });
    const item2 = makeCartItem({
      id: "item-2",
      selectedOptions: [
        {
          optionId: "opt-size",
          optionName: "Size",
          choices: [{ id: "choice-large", name: "Large", priceDelta: 40 }],
        },
      ],
    });

    let state = cartReducer(initialCartState, { type: "ADD_ITEM", item: item1 });
    state = cartReducer(state, { type: "ADD_ITEM", item: item2 });

    expect(state.items).toHaveLength(2);
  });

  it("removes item", () => {
    const item = makeCartItem();
    let state = cartReducer(initialCartState, { type: "ADD_ITEM", item });
    state = cartReducer(state, { type: "REMOVE_ITEM", itemId: item.id });
    expect(state.items).toHaveLength(0);
  });

  it("increments item quantity", () => {
    const item = makeCartItem({ quantity: 1, unitPrice: 100, subtotal: 100 });
    let state = cartReducer(initialCartState, { type: "ADD_ITEM", item });
    state = cartReducer(state, { type: "INCREMENT_ITEM", itemId: item.id });
    expect(state.items[0].quantity).toBe(2);
    expect(state.items[0].subtotal).toBe(200);
  });

  it("decrements item quantity", () => {
    const item = makeCartItem({ quantity: 3, unitPrice: 100, subtotal: 300 });
    let state = cartReducer(initialCartState, { type: "ADD_ITEM", item });
    state = cartReducer(state, { type: "DECREMENT_ITEM", itemId: item.id });
    expect(state.items[0].quantity).toBe(2);
    expect(state.items[0].subtotal).toBe(200);
  });

  it("prevents decrement below minimum quantity", () => {
    const item = makeCartItem({ quantity: 1, unitPrice: 100, subtotal: 100 });
    let state = cartReducer(initialCartState, { type: "ADD_ITEM", item });
    state = cartReducer(state, { type: "DECREMENT_ITEM", itemId: item.id });
    expect(state.items[0].quantity).toBe(1);
  });

  it("updates quantity", () => {
    const item = makeCartItem({ quantity: 1, unitPrice: 100, subtotal: 100 });
    let state = cartReducer(initialCartState, { type: "ADD_ITEM", item });
    state = cartReducer(state, { type: "UPDATE_QUANTITY", itemId: item.id, quantity: 5 });
    expect(state.items[0].quantity).toBe(5);
    expect(state.items[0].subtotal).toBe(500);
  });

  it("enforces minimum quantity on update", () => {
    const item = makeCartItem({ quantity: 3, unitPrice: 100, subtotal: 300 });
    let state = cartReducer(initialCartState, { type: "ADD_ITEM", item });
    state = cartReducer(state, { type: "UPDATE_QUANTITY", itemId: item.id, quantity: 0 });
    expect(state.items[0].quantity).toBe(1);
  });

  it("clears cart", () => {
    const item = makeCartItem();
    let state = cartReducer(initialCartState, { type: "ADD_ITEM", item });
    state = cartReducer(state, { type: "CLEAR_CART" });
    expect(state.items).toHaveLength(0);
  });

  it("hydrates state", () => {
    const item = makeCartItem();
    const state = cartReducer(initialCartState, {
      type: "HYDRATE",
      state: { items: [item] },
    });
    expect(state.items).toHaveLength(1);
  });
});
