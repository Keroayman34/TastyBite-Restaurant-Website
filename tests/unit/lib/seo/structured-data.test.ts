import { describe, expect, it } from "vitest";
import {
  getStructuredData,
  getBreadcrumbStructuredData,
} from "@/lib/seo/structured-data";
import { restaurant } from "@/config/restaurant";

describe("getStructuredData", () => {
  it("returns Restaurant schema type", () => {
    const data = getStructuredData();
    expect(data["@context"]).toBe("https://schema.org");
    expect(data["@type"]).toBe("Restaurant");
  });

  it("uses restaurant configuration", () => {
    const data = getStructuredData();
    expect(data.name).toBe(restaurant.name);
    expect(data.telephone).toBe(restaurant.phone);
    expect(data.email).toBe(restaurant.email);
  });

  it("includes address", () => {
    const data = getStructuredData();
    expect(data.address["@type"]).toBe("PostalAddress");
    expect(data.address.streetAddress).toBeTruthy();
  });

  it("includes opening hours", () => {
    const data = getStructuredData();
    expect(data.openingHours.length).toBeGreaterThan(0);
  });

  it("includes servesCuisine", () => {
    const data = getStructuredData();
    expect(data.servesCuisine).toContain("Pizza");
    expect(data.servesCuisine).toContain("Burgers");
  });
});

describe("getBreadcrumbStructuredData", () => {
  it("returns BreadcrumbList schema", () => {
    const items = [
      { label: "Home", href: "/" },
      { label: "Menu", href: "/menu" },
      { label: "Pizza", href: "/menu?category=pizza" },
    ];
    const data = getBreadcrumbStructuredData(items);
    expect(data["@context"]).toBe("https://schema.org");
    expect(data["@type"]).toBe("BreadcrumbList");
  });

  it("generates correct item positions", () => {
    const items = [
      { label: "Home", href: "/" },
      { label: "Menu", href: "/menu" },
    ];
    const data = getBreadcrumbStructuredData(items);
    expect(data.itemListElement).toHaveLength(2);
    expect(data.itemListElement[0].position).toBe(1);
    expect(data.itemListElement[1].position).toBe(2);
  });

  it("includes full URLs", () => {
    const items = [{ label: "Home", href: "/" }];
    const data = getBreadcrumbStructuredData(items);
    expect(data.itemListElement[0].item).toContain("localhost:3000");
  });
});
