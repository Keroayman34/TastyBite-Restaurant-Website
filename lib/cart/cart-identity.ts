import type { CartItem } from "@/domain/entities";

export function getCartItemKey(item: CartItem): string {
  const optionKey = item.selectedOptions
    .map((opt) => `${opt.optionId}:${opt.choices.map((c) => c.id).join(",")}`)
    .join("|");

  return `${item.product.id}::${optionKey}`;
}
