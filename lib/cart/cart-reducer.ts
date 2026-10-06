import type { CartState, CartAction } from "./types";
import { initialCartState } from "./types";
import { getCartItemKey } from "./cart-identity";
import { MIN_QUANTITY } from "@/lib/menu/pricing";

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const newKey = getCartItemKey(action.item);
      const existingIndex = state.items.findIndex(
        (item) => getCartItemKey(item) === newKey,
      );

      if (existingIndex >= 0) {
        const items = [...state.items];
        const existing = items[existingIndex];
        items[existingIndex] = {
          ...existing,
          quantity: existing.quantity + action.item.quantity,
          subtotal: (existing.quantity + action.item.quantity) * existing.unitPrice,
        };
        return { items };
      }

      return { items: [...state.items, action.item] };
    }

    case "REMOVE_ITEM":
      return { items: state.items.filter((item) => item.id !== action.itemId) };

    case "INCREMENT_ITEM": {
      return {
        items: state.items.map((item) =>
          item.id === action.itemId
            ? {
                ...item,
                quantity: item.quantity + 1,
                subtotal: (item.quantity + 1) * item.unitPrice,
              }
            : item,
        ),
      };
    }

    case "DECREMENT_ITEM": {
      return {
        items: state.items.map((item) => {
          if (item.id !== action.itemId) return item;
          const newQuantity = Math.max(item.quantity - 1, MIN_QUANTITY);
          return {
            ...item,
            quantity: newQuantity,
            subtotal: newQuantity * item.unitPrice,
          };
        }),
      };
    }

    case "UPDATE_QUANTITY": {
      return {
        items: state.items.map((item) =>
          item.id === action.itemId
            ? {
                ...item,
                quantity: Math.max(action.quantity, MIN_QUANTITY),
                subtotal: Math.max(action.quantity, MIN_QUANTITY) * item.unitPrice,
              }
            : item,
        ),
      };
    }

    case "CLEAR_CART":
      return initialCartState;

    case "HYDRATE":
      return action.state;

    default:
      return state;
  }
}
