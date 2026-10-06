import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import robots from "@/app/robots";
import { products } from "@/data/products";

describe("sitemap", () => {
  it("includes homepage", () => {
    const sitemapData = sitemap();
    const home = sitemapData.find(
      (entry) =>
        entry.url === "http://localhost:3000" || entry.url === "http://localhost:3000/",
    );
    expect(home).toBeTruthy();
    expect(home?.priority).toBe(1);
  });

  it("includes all static routes", () => {
    const sitemapData = sitemap();
    const urls = sitemapData.map((entry) => entry.url);
    expect(urls.some((u) => u.includes("/menu") && !u.includes("prod-"))).toBe(true);
    expect(urls.some((u) => u.includes("/offers"))).toBe(true);
    expect(urls.some((u) => u.includes("/about"))).toBe(true);
    expect(urls.some((u) => u.includes("/contact"))).toBe(true);
    expect(urls.some((u) => u.includes("/locations"))).toBe(true);
    expect(urls.some((u) => u.includes("/reviews"))).toBe(true);
    expect(urls.some((u) => u.includes("/gallery"))).toBe(true);
  });

  it("includes all product routes", () => {
    const sitemapData = sitemap();
    products.forEach((product) => {
      const productUrl = sitemapData.find((entry) =>
        entry.url.includes(`/menu/${product.id}`),
      );
      expect(productUrl).toBeTruthy();
    });
  });

  it("does not include transactional pages", () => {
    const sitemapData = sitemap();
    const urls = sitemapData.map((entry) => entry.url);
    expect(urls.some((u) => u.includes("/cart"))).toBe(false);
    expect(urls.some((u) => u.includes("/checkout"))).toBe(false);
  });

  it("includes lastModified dates", () => {
    const sitemapData = sitemap();
    sitemapData.forEach((entry) => {
      expect(entry.lastModified).toBeInstanceOf(Date);
    });
  });
});

describe("robots", () => {
  it("allows public crawling", () => {
    const robotsData = robots();
    const rules = Array.isArray(robotsData.rules) ? robotsData.rules : [robotsData.rules];
    expect(rules[0].allow).toBe("/");
  });

  it("disallows transactional pages", () => {
    const robotsData = robots();
    const rules = Array.isArray(robotsData.rules) ? robotsData.rules : [robotsData.rules];
    expect(rules[0].disallow).toContain("/cart");
    expect(rules[0].disallow).toContain("/checkout");
  });

  it("references sitemap", () => {
    const robotsData = robots();
    expect(robotsData.sitemap).toContain("sitemap.xml");
  });
});
