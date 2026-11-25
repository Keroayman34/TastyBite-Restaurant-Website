import {
  getLocalizedText,
  type CartItem,
  type CurrencyCode,
  type LanguageCode,
} from "@/domain/entities";
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

function getConfigurationString(item: CartItem, language: LanguageCode): string {
  return item.selectedOptions
    .map((opt) => opt.choices.map((c) => getLocalizedText(c.name, language)).join(", "))
    .filter(Boolean)
    .join(" · ");
}

export function buildWhatsAppOrderPayload(
  items: CartItem[],
  customer: CheckoutCustomerInfo,
  options?: { language?: LanguageCode; currency?: CurrencyCode },
): WhatsAppOrderPayload {
  const language = options?.language ?? "en";
  const currency = options?.currency ?? restaurant.currency;

  const orderItems: WhatsAppOrderItem[] = items.map((item) => ({
    name: getLocalizedText(item.product.name, language),
    quantity: item.quantity,
    configuration: getConfigurationString(item, language),
    unitPrice: item.unitPrice,
    subtotal: item.subtotal,
  }));

  const subtotal = calculateCartSubtotal(items);
  const deliveryFee = calculateDeliveryFee(
    items,
    restaurant.deliveryFee,
    restaurant.freeDeliveryThreshold,
  );
  const total = calculateCartTotal(subtotal, deliveryFee);

  return {
    customer,
    items: orderItems,
    subtotal,
    deliveryFee,
    total,
    currency,
    language,
  };
}
