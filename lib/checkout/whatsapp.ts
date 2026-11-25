import type { WhatsAppOrderPayload } from "./types";
import { formatMoney } from "@/lib/currency";
import { getDictionary } from "@/lib/i18n";

export function generateWhatsAppMessage(order: WhatsAppOrderPayload): string {
  const language = order.language ?? "en";
  const t = getDictionary(language).whatsapp;
  const formatAmount = (amountEur: number) =>
    formatMoney(amountEur, order.currency, language);

  const lines: string[] = [];

  lines.push(t.header);
  lines.push("");

  lines.push(t.customer);
  lines.push(`${t.name}: ${order.customer.fullName}`);
  lines.push(`${t.phone}: ${order.customer.phone}`);
  lines.push(`${t.address}: ${order.customer.address}`);
  if (order.customer.notes) {
    lines.push(`${t.notes}: ${order.customer.notes}`);
  }
  lines.push("");

  lines.push(t.order);
  order.items.forEach((item, index) => {
    lines.push(`${index + 1}. ${item.quantity} x ${item.name}`);
    if (item.configuration) {
      lines.push(`   ${item.configuration}`);
    }
    lines.push(`   ${formatAmount(item.subtotal)}`);
  });
  lines.push("");

  lines.push(`${t.subtotal}: ${formatAmount(order.subtotal)}`);
  lines.push(`${t.deliveryFee}: ${formatAmount(order.deliveryFee)}`);
  lines.push(`${t.total}: ${formatAmount(order.total)}`);

  return lines.join("\n");
}

export function buildWhatsAppUrl(phoneNumber: string, message: string): string {
  const cleaned = phoneNumber.replace(/[^\d]/g, "");
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${cleaned}?text=${encodedMessage}`;
}
