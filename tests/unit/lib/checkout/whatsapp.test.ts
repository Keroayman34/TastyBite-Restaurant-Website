import { describe, expect, it } from "vitest";
import { generateWhatsAppMessage, buildWhatsAppUrl } from "@/lib/checkout/whatsapp";
import { buildWhatsAppOrderPayload } from "@/lib/checkout/order";
import type { CartItem } from "@/domain/entities";
import type { CheckoutCustomerInfo } from "@/lib/checkout/types";

const customer: CheckoutCustomerInfo = {
  fullName: "Ahmed Mohamed",
  phone: "01234567890",
  address: "123 Main Street, Cairo",
  notes: "No onions",
};

function makeCartItem(overrides: Partial<CartItem> = {}): CartItem {
  return {
    id: "test-item",
    product: {
      id: "prod-test",
      name: "Chicken Ranch Pizza",
      description: "Test",
      categoryId: "cat-pizza",
      basePrice: 220,
      image: "/images/products/test.svg",
      available: true,
      tags: [],
      rating: 4.8,
      reviewCount: 128,
      options: [],
    },
    quantity: 1,
    selectedOptions: [
      {
        optionId: "opt-size",
        optionName: "Size",
        choices: [{ id: "choice-large", name: "Large", priceDelta: 40 }],
      },
      {
        optionId: "opt-crust",
        optionName: "Crust",
        choices: [{ id: "choice-cheese", name: "Cheese", priceDelta: 30 }],
      },
    ],
    unitPrice: 290,
    subtotal: 290,
    ...overrides,
  };
}

describe("generateWhatsAppMessage", () => {
  it("generates message with customer info", () => {
    const order = buildWhatsAppOrderPayload([makeCartItem()], customer);
    const message = generateWhatsAppMessage(order);
    expect(message).toContain("Ahmed Mohamed");
    expect(message).toContain("01234567890");
    expect(message).toContain("123 Main Street, Cairo");
  });

  it("generates message with order items", () => {
    const order = buildWhatsAppOrderPayload([makeCartItem()], customer);
    const message = generateWhatsAppMessage(order);
    expect(message).toContain("Chicken Ranch Pizza");
    expect(message).toContain("Large");
    expect(message).toContain("Cheese");
  });

  it("includes notes when provided", () => {
    const order = buildWhatsAppOrderPayload([makeCartItem()], customer);
    const message = generateWhatsAppMessage(order);
    expect(message).toContain("No onions");
  });

  it("includes totals", () => {
    const order = buildWhatsAppOrderPayload([makeCartItem()], customer);
    const message = generateWhatsAppMessage(order);
    expect(message).toContain("Subtotal");
    expect(message).toContain("Delivery Fee");
    expect(message).toContain("Total");
  });

  it("handles multiple items", () => {
    const items = [
      makeCartItem({ id: "1", product: { ...makeCartItem().product, name: "Pizza" } }),
      makeCartItem({
        id: "2",
        product: { ...makeCartItem().product, name: "Burger" },
        quantity: 2,
      }),
    ];
    const order = buildWhatsAppOrderPayload(items, customer);
    const message = generateWhatsAppMessage(order);
    expect(message).toContain("Pizza");
    expect(message).toContain("Burger");
  });

  it("handles special characters", () => {
    const specialCustomer = {
      ...customer,
      fullName: "أحمد محمد",
      notes: "No onions & extra cheese",
    };
    const order = buildWhatsAppOrderPayload([makeCartItem()], specialCustomer);
    const message = generateWhatsAppMessage(order);
    expect(message).toContain("أحمد محمد");
    expect(message).toContain("No onions & extra cheese");
  });
});

describe("buildWhatsAppUrl", () => {
  it("builds correct WhatsApp URL", () => {
    const url = buildWhatsAppUrl("01234567890", "Hello");
    expect(url).toContain("wa.me/01234567890");
    expect(url).toContain("text=Hello");
  });

  it("encodes message safely", () => {
    const url = buildWhatsAppUrl("01234567890", "Hello World & More");
    expect(url).toContain(encodeURIComponent("Hello World & More"));
  });

  it("strips non-digit characters from phone", () => {
    const url = buildWhatsAppUrl("+20 123-456-7890", "Test");
    expect(url).toContain("wa.me/201234567890");
  });

  it("handles Arabic text", () => {
    const url = buildWhatsAppUrl("01234567890", "مرحبا");
    expect(url).toContain(encodeURIComponent("مرحبا"));
  });

  it("handles long messages", () => {
    const longMessage = "A".repeat(1000);
    const url = buildWhatsAppUrl("01234567890", longMessage);
    expect(url).toContain(encodeURIComponent(longMessage));
  });
});
