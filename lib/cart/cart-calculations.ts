import type { CartItem } from "@/domain/entities";

export function calculateCartSubtotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.subtotal, 0);
}

export function calculateDeliveryFee(items: CartItem[], deliveryFee: number): number {
  return items.length > 0 ? deliveryFee : 0;
}

export function calculateCartTotal(subtotal: number, deliveryFee: number): number {
  return subtotal + deliveryFee;
}

export function calculateItemCount(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}
