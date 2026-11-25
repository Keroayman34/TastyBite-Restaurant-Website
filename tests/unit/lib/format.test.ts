import { describe, expect, it } from "vitest";
import { formatPrice } from "@/lib/format";

describe("formatPrice", () => {
  it("formats EUR with two decimal places by default", () => {
    expect(formatPrice(12.99)).toBe("€12.99");
  });

  it("formats whole euros with two decimal places", () => {
    expect(formatPrice(10)).toBe("€10.00");
  });

  it("supports USD currency formatting", () => {
    expect(formatPrice(10, "USD")).toBe("$10.00");
  });
});
