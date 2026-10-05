import { describe, expect, it } from "vitest";
import { calculateProductPrice, MIN_QUANTITY } from "@/lib/menu/pricing";
import type { ProductOptionChoice } from "@/domain/entities";

const small: ProductOptionChoice = { id: "choice-small", name: "Small", priceDelta: 0 };
const medium: ProductOptionChoice = {
  id: "choice-medium",
  name: "Medium",
  priceDelta: 20,
};
const large: ProductOptionChoice = { id: "choice-large", name: "Large", priceDelta: 40 };
const classic: ProductOptionChoice = {
  id: "choice-classic",
  name: "Classic",
  priceDelta: 0,
};
const cheese: ProductOptionChoice = {
  id: "choice-cheese",
  name: "Cheese",
  priceDelta: 30,
};
const extraCheese: ProductOptionChoice = {
  id: "choice-extra-cheese",
  name: "Extra Cheese",
  priceDelta: 20,
};
const olives: ProductOptionChoice = {
  id: "choice-olives",
  name: "Olives",
  priceDelta: 15,
};
const chicken: ProductOptionChoice = {
  id: "choice-chicken",
  name: "Chicken",
  priceDelta: 30,
};

describe("calculateProductPrice", () => {
  it("calculates base price with no adjustments", () => {
    const result = calculateProductPrice({
      basePrice: 180,
      sizeChoice: small,
      crustChoice: null,
      extraChoices: [],
      quantity: 1,
    });
    expect(result.unitPrice).toBe(180);
    expect(result.subtotal).toBe(180);
  });

  it("adds size adjustment", () => {
    const result = calculateProductPrice({
      basePrice: 180,
      sizeChoice: large,
      crustChoice: null,
      extraChoices: [],
      quantity: 1,
    });
    expect(result.sizeAdjustment).toBe(40);
    expect(result.unitPrice).toBe(220);
  });

  it("adds crust adjustment", () => {
    const result = calculateProductPrice({
      basePrice: 180,
      sizeChoice: small,
      crustChoice: cheese,
      extraChoices: [],
      quantity: 1,
    });
    expect(result.crustAdjustment).toBe(30);
    expect(result.unitPrice).toBe(210);
  });

  it("adds single extra", () => {
    const result = calculateProductPrice({
      basePrice: 180,
      sizeChoice: small,
      crustChoice: null,
      extraChoices: [extraCheese],
      quantity: 1,
    });
    expect(result.extrasTotal).toBe(20);
    expect(result.unitPrice).toBe(200);
  });

  it("adds multiple extras", () => {
    const result = calculateProductPrice({
      basePrice: 180,
      sizeChoice: small,
      crustChoice: null,
      extraChoices: [extraCheese, olives, chicken],
      quantity: 1,
    });
    expect(result.extrasTotal).toBe(65);
    expect(result.unitPrice).toBe(245);
  });

  it("calculates combined configuration", () => {
    const result = calculateProductPrice({
      basePrice: 220,
      sizeChoice: medium,
      crustChoice: cheese,
      extraChoices: [extraCheese, olives],
      quantity: 1,
    });
    expect(result.unitPrice).toBe(220 + 20 + 30 + 20 + 15);
    expect(result.unitPrice).toBe(305);
  });

  it("multiplies by quantity", () => {
    const result = calculateProductPrice({
      basePrice: 180,
      sizeChoice: medium,
      crustChoice: classic,
      extraChoices: [extraCheese],
      quantity: 3,
    });
    expect(result.unitPrice).toBe(220);
    expect(result.subtotal).toBe(660);
  });

  it("enforces minimum quantity", () => {
    const result = calculateProductPrice({
      basePrice: 180,
      sizeChoice: small,
      crustChoice: null,
      extraChoices: [],
      quantity: 0,
    });
    expect(result.quantity).toBe(MIN_QUANTITY);
    expect(result.subtotal).toBe(180);
  });

  it("handles null selections", () => {
    const result = calculateProductPrice({
      basePrice: 150,
      sizeChoice: null,
      crustChoice: null,
      extraChoices: [],
      quantity: 2,
    });
    expect(result.unitPrice).toBe(150);
    expect(result.subtotal).toBe(300);
  });
});
