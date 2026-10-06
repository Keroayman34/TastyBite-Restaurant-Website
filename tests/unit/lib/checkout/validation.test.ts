import { describe, expect, it } from "vitest";
import { checkoutSchema } from "@/lib/checkout/validation";

describe("checkoutSchema", () => {
  const validData = {
    fullName: "Ahmed Mohamed",
    phone: "01234567890",
    address: "123 Main Street, Cairo",
    notes: "",
  };

  it("accepts valid customer data", () => {
    const result = checkoutSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("rejects empty name", () => {
    const result = checkoutSchema.safeParse({ ...validData, fullName: "" });
    expect(result.success).toBe(false);
  });

  it("rejects whitespace-only name", () => {
    const result = checkoutSchema.safeParse({ ...validData, fullName: "   " });
    expect(result.success).toBe(false);
  });

  it("rejects short name", () => {
    const result = checkoutSchema.safeParse({ ...validData, fullName: "A" });
    expect(result.success).toBe(false);
  });

  it("rejects empty phone", () => {
    const result = checkoutSchema.safeParse({ ...validData, phone: "" });
    expect(result.success).toBe(false);
  });

  it("rejects invalid phone format", () => {
    const result = checkoutSchema.safeParse({ ...validData, phone: "abc" });
    expect(result.success).toBe(false);
  });

  it("accepts phone with spaces and dashes", () => {
    const result = checkoutSchema.safeParse({ ...validData, phone: "+20 123-456-7890" });
    expect(result.success).toBe(true);
  });

  it("rejects empty address", () => {
    const result = checkoutSchema.safeParse({ ...validData, address: "" });
    expect(result.success).toBe(false);
  });

  it("rejects short address", () => {
    const result = checkoutSchema.safeParse({ ...validData, address: "123" });
    expect(result.success).toBe(false);
  });

  it("accepts empty notes", () => {
    const result = checkoutSchema.safeParse({ ...validData, notes: "" });
    expect(result.success).toBe(true);
  });

  it("accepts notes with content", () => {
    const result = checkoutSchema.safeParse({ ...validData, notes: "No onions please" });
    expect(result.success).toBe(true);
  });

  it("rejects notes exceeding max length", () => {
    const result = checkoutSchema.safeParse({ ...validData, notes: "a".repeat(501) });
    expect(result.success).toBe(false);
  });

  it("trims whitespace from fields", () => {
    const result = checkoutSchema.safeParse({
      ...validData,
      fullName: "  Ahmed  ",
      phone: "  01234567890  ",
      address: "  123 Main  ",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.fullName).toBe("Ahmed");
      expect(result.data.phone).toBe("01234567890");
      expect(result.data.address).toBe("123 Main");
    }
  });
});
