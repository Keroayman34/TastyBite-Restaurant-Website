import type { CartState } from "./types";

const CART_STORAGE_KEY = "tastybite-cart";

export function getCartStorageKey(): string {
  return CART_STORAGE_KEY;
}

export function serializeCart(state: CartState): string {
  return JSON.stringify(state);
}

export function deserializeCart(raw: string): CartState | null {
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!isValidCartState(parsed)) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

function isValidCartState(value: unknown): value is CartState {
  if (typeof value !== "object" || value === null) return false;
  const candidate = value as Record<string, unknown>;
  if (!Array.isArray(candidate.items)) return false;
  return candidate.items.every(isValidCartItem);
}

function isValidCartItem(value: unknown): boolean {
  if (typeof value !== "object" || value === null) return false;
  const item = value as Record<string, unknown>;
  return (
    typeof item.id === "string" &&
    typeof item.quantity === "number" &&
    item.quantity >= 1 &&
    typeof item.unitPrice === "number" &&
    item.unitPrice >= 0 &&
    typeof item.subtotal === "number" &&
    item.subtotal >= 0 &&
    typeof item.product === "object" &&
    item.product !== null &&
    typeof (item.product as Record<string, unknown>).id === "string"
  );
}
