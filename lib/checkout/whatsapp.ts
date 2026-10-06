import type { WhatsAppOrderPayload } from "./types";
import { formatPrice } from "@/lib/format";

export function generateWhatsAppMessage(order: WhatsAppOrderPayload): string {
  const lines: string[] = [];

  lines.push("New TastyBite Order");
  lines.push("");

  lines.push("Customer:");
  lines.push(`Name: ${order.customer.fullName}`);
  lines.push(`Phone: ${order.customer.phone}`);
  lines.push(`Address: ${order.customer.address}`);
  if (order.customer.notes) {
    lines.push(`Notes: ${order.customer.notes}`);
  }
  lines.push("");

  lines.push("Order:");
  order.items.forEach((item, index) => {
    lines.push(`${index + 1}. ${item.quantity} x ${item.name}`);
    if (item.configuration) {
      lines.push(`   ${item.configuration}`);
    }
    lines.push(`   ${formatPrice(item.subtotal, order.currency)}`);
  });
  lines.push("");

  lines.push(`Subtotal: ${formatPrice(order.subtotal, order.currency)}`);
  lines.push(`Delivery Fee: ${formatPrice(order.deliveryFee, order.currency)}`);
  lines.push(`Total: ${formatPrice(order.total, order.currency)}`);

  return lines.join("\n");
}

export function buildWhatsAppUrl(phoneNumber: string, message: string): string {
  const cleaned = phoneNumber.replace(/[^\d]/g, "");
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${cleaned}?text=${encodedMessage}`;
}
