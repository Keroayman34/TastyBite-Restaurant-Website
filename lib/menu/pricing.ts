import type { Product, ProductOptionChoice } from "@/domain/entities";

export interface PricingInput {
  basePrice: number;
  sizeChoice: ProductOptionChoice | null;
  crustChoice: ProductOptionChoice | null;
  extraChoices: ProductOptionChoice[];
  quantity: number;
}

export interface PricingResult {
  basePrice: number;
  sizeAdjustment: number;
  crustAdjustment: number;
  extrasTotal: number;
  unitPrice: number;
  quantity: number;
  subtotal: number;
}

export const MIN_QUANTITY = 1;

export function calculateProductPrice(input: PricingInput): PricingResult {
  const sizeAdjustment = input.sizeChoice?.priceDelta ?? 0;
  const crustAdjustment = input.crustChoice?.priceDelta ?? 0;
  const extrasTotal = input.extraChoices.reduce((sum, c) => sum + c.priceDelta, 0);

  const unitPrice = input.basePrice + sizeAdjustment + crustAdjustment + extrasTotal;
  const quantity = Math.max(input.quantity, MIN_QUANTITY);
  const subtotal = unitPrice * quantity;

  return {
    basePrice: input.basePrice,
    sizeAdjustment,
    crustAdjustment,
    extrasTotal,
    unitPrice,
    quantity,
    subtotal,
  };
}

export function findOption(product: Product, optionId: string) {
  return product.options.find((o) => o.id === optionId) ?? null;
}

export function findChoice(
  option: { choices: ProductOptionChoice[] } | null,
  choiceId: string,
) {
  return option?.choices.find((c) => c.id === choiceId) ?? null;
}
