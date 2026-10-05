import { expect, test } from "@playwright/test";

test("homepage loads with hero section", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Delicious Food");
});

test("header and footer are visible", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("banner")).toBeVisible();
  await expect(page.getByRole("contentinfo")).toBeVisible();
});

test("navigation links are present", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("link", { name: "Menu" }).first()).toBeVisible();
  await expect(page.getByRole("link", { name: "Offers" }).first()).toBeVisible();
  await expect(page.getByRole("link", { name: "About" }).first()).toBeVisible();
  await expect(page.getByRole("link", { name: "Contact" }).first()).toBeVisible();
});

test("category section renders", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { level: 2, name: "Browse by Category" }),
  ).toBeVisible();
  await expect(page.getByText("Pizza").first()).toBeVisible();
  await expect(page.getByText("Burgers").first()).toBeVisible();
});

test("featured dishes section renders", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { level: 2, name: "Featured Dishes" }),
  ).toBeVisible();
  await expect(page.getByText("Margherita Pizza")).toBeVisible();
});

test("CTA banner renders", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { level: 2, name: /Craving Something Delicious/i }),
  ).toBeVisible();
});

test("mobile menu opens and closes", async ({ page, isMobile }) => {
  test.skip(!isMobile, "Mobile-only test");
  await page.goto("/");
  const menuButton = page.getByRole("button", { name: "Open menu" });
  await expect(menuButton).toBeVisible();
  await menuButton.click();
  await expect(page.getByRole("button", { name: "Close menu" })).toBeVisible();
  await page.getByRole("button", { name: "Close menu" }).click();
  await expect(page.getByRole("button", { name: "Open menu" })).toBeVisible();
});

test("menu page loads with products", async ({ page }) => {
  await page.goto("/menu");
  await expect(page.getByRole("heading", { level: 2, name: "Our Menu" })).toBeVisible();
  await expect(page.getByText("Margherita Pizza").first()).toBeVisible();
});

test("menu category navigation works", async ({ page }) => {
  await page.goto("/menu");
  await page.getByRole("button", { name: "Pizza" }).first().click();
  await expect(page).toHaveURL(/category=pizza/);
  await page.waitForSelector("text=Margherita Pizza", { timeout: 10000 });
  await expect(page.getByText("Margherita Pizza").first()).toBeVisible();
});

test("menu search filters products", async ({ page }) => {
  await page.goto("/menu");
  const searchInput = page.getByPlaceholder("Search for pizza, burger...");
  await searchInput.fill("margherita");
  await page.waitForSelector("text=Margherita Pizza", { timeout: 10000 });
  await expect(page.getByText("Classic Burger")).not.toBeVisible();
});

test("menu filter chips work", async ({ page }) => {
  await page.goto("/menu");
  await page.getByRole("button", { name: "Veggie" }).click();
  await page.waitForSelector("text=Margherita Pizza", { timeout: 10000 });
  await expect(page.getByText("Classic Burger")).not.toBeVisible();
});

test("menu sort works", async ({ page }) => {
  await page.goto("/menu");
  await page.getByLabel("Sort products").selectOption("price-asc");
  const prices = await page.locator("text=/EGP/").allTextContents();
  expect(prices.length).toBeGreaterThan(0);
});

test("menu shows empty state for no matches", async ({ page }) => {
  await page.goto("/menu");
  const searchInput = page.getByPlaceholder("Search for pizza, burger...");
  await searchInput.fill("xyznonexistent");
  await page.waitForSelector("text=No products found", { timeout: 10000 });
  await expect(page.getByText("No products found")).toBeVisible();
});

test("menu has no horizontal overflow on mobile", async ({ page, isMobile }) => {
  test.skip(!isMobile, "Mobile-only test");
  await page.goto("/menu");
  const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
  const viewportWidth = page.viewportSize()?.width ?? 0;
  expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 1);
});

test("product detail page renders", async ({ page }) => {
  await page.goto("/menu/prod-chicken-ranch-pizza");
  await expect(
    page.getByRole("heading", { level: 1, name: "Chicken Ranch Pizza" }),
  ).toBeVisible();
  await expect(page.getByText("4.8")).toBeVisible();
  await expect(page.getByText("(128 reviews)")).toBeVisible();
});

test("product detail breadcrumb renders", async ({ page }) => {
  await page.goto("/menu/prod-chicken-ranch-pizza");
  const breadcrumb = page.getByRole("navigation", { name: "Breadcrumb" });
  await expect(breadcrumb).toBeVisible();
  await expect(breadcrumb.getByRole("link", { name: "Menu" })).toBeVisible();
  await expect(breadcrumb.getByRole("link", { name: "Pizza" })).toBeVisible();
});

test("product detail configuration works", async ({ page }) => {
  await page.goto("/menu/prod-chicken-ranch-pizza");
  await page.getByRole("radio", { name: /Large/ }).click();
  await page.getByRole("radio", { name: /Cheese/ }).click();
  await page.getByRole("checkbox", { name: /Extra Cheese/ }).click();
  await page.getByRole("button", { name: "Increase quantity" }).click();
  await expect(page.getByLabel("Quantity:")).toHaveText("2");
});

test("product detail add to cart shows confirmation", async ({ page }) => {
  await page.goto("/menu/prod-chicken-ranch-pizza");
  await page.getByRole("button", { name: /Add to Cart/i }).click();
  await expect(page.getByText(/Added to Cart/i)).toBeVisible();
});

test("product detail has no horizontal overflow on mobile", async ({
  page,
  isMobile,
}) => {
  test.skip(!isMobile, "Mobile-only test");
  await page.goto("/menu/prod-chicken-ranch-pizza");
  const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
  const viewportWidth = page.viewportSize()?.width ?? 0;
  expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 1);
});

test("invalid product shows not found", async ({ page }) => {
  const response = await page.goto("/menu/invalid-product-id");
  expect(response?.status()).toBe(404);
});
