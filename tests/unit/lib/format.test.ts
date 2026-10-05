import { describe, expect, it } from "vitest";
import { formatPrice } from "@/lib/format";

describe("formatPrice", () => {
  it("formats USD with two decimal places", () => {
    expect(formatPrice(12.99)).toBe("$12.99");
  });

  it("formats whole dollars without trailing zeros", () => {
    expect(formatPrice(10)).toBe("$10.00");
  });

  it("supports other currencies", () => {
    expect(formatPrice(10, "EUR")).toBe("€10.00");
  });
});
