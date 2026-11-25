import type { CartItem } from "@/domain/entities";

export function calculateCartSubtotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.subtotal, 0);
}

/**
 * Delivery is free once the cart subtotal reaches `freeDeliveryThreshold`.
 * Omitting the threshold keeps the fixed-fee behaviour used by older callers.
 */
export function calculateDeliveryFee(
  items: CartItem[],
  deliveryFee: number,
  freeDeliveryThreshold?: number,
): number {
  if (items.length === 0) {
    return 0;
  }
  if (
    freeDeliveryThreshold !== undefined &&
    calculateCartSubtotal(items) >= freeDeliveryThreshold
  ) {
    return 0;
  }
  return deliveryFee;
}

export function calculateCartTotal(subtotal: number, deliveryFee: number): number {
  return subtotal + deliveryFee;
}

export function calculateItemCount(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}
