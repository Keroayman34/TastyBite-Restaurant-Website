import type { CartItem } from "@/domain/entities";
import type {
  CheckoutCustomerInfo,
  WhatsAppOrderItem,
  WhatsAppOrderPayload,
} from "./types";
import {
  calculateCartSubtotal,
  calculateDeliveryFee,
  calculateCartTotal,
} from "@/lib/cart/cart-calculations";
import { restaurant } from "@/config/restaurant";

function getConfigurationString(item: CartItem): string {
  return item.selectedOptions
    .map((opt) => opt.choices.map((c) => c.name).join(", "))
    .filter(Boolean)
    .join(" · ");
}

export function buildWhatsAppOrderPayload(
  items: CartItem[],
  customer: CheckoutCustomerInfo,
): WhatsAppOrderPayload {
  const orderItems: WhatsAppOrderItem[] = items.map((item) => ({
    name: item.product.name,
    quantity: item.quantity,
    configuration: getConfigurationString(item),
    unitPrice: item.unitPrice,
    subtotal: item.subtotal,
  }));

  const subtotal = calculateCartSubtotal(items);
  const deliveryFee = calculateDeliveryFee(items, restaurant.deliveryFee);
  const total = calculateCartTotal(subtotal, deliveryFee);

  return {
    customer,
    items: orderItems,
    subtotal,
    deliveryFee,
    total,
    currency: restaurant.currency,
  };
}
