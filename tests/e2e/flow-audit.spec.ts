import { test, expect } from "@playwright/test";

test("FLOW A: product card navigates to details", async ({ page }) => {
  await page.goto("/menu", { waitUntil: "networkidle" });
  await page.getByText("Margherita Pizza").first().click();
  await expect(page).toHaveURL(/menu\/prod-margherita-pizza/);
  await expect(
    page.getByRole("heading", { level: 1, name: "Margherita Pizza" }),
  ).toBeVisible();
});

test("FLOW B: product details customization", async ({ page }) => {
  await page.goto("/menu/prod-margherita-pizza", { waitUntil: "networkidle" });
  await expect(
    page.getByRole("heading", { level: 1, name: "Margherita Pizza" }),
  ).toBeVisible();
  await expect(page.getByText("Fresh tomato sauce, mozzarella, basil")).toBeVisible();
  await expect(page.getByRole("radio", { name: /Small/ })).toBeVisible();
  await expect(page.getByRole("radio", { name: /Classic/ })).toBeVisible();
  await expect(page.getByRole("checkbox", { name: /Extra Cheese/ })).toBeVisible();
  await page.getByRole("radio", { name: /Large/ }).click();
  await page.getByRole("checkbox", { name: /Extra Cheese/ }).click();
  await page.getByRole("button", { name: "Increase quantity" }).click();
  await expect(page.getByLabel("Quantity:")).toHaveText("2");
});

test("FLOW C: add to cart updates badge", async ({ page }) => {
  await page.goto("/menu/prod-margherita-pizza", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: /Add to Cart/i }).click();
  await page.waitForTimeout(500);
  const cartLink = page.getByRole("link", { name: /Cart/i });
  await expect(cartLink).toContainText("1");
});

test("FLOW D: header cart navigates to cart page", async ({ page }) => {
  await page.goto("/menu/prod-margherita-pizza", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: /Add to Cart/i }).click();
  await page.waitForTimeout(500);
  await page.getByRole("link", { name: /Cart/i }).click();
  await expect(page).toHaveURL(/\/cart/);
  await expect(page.getByText("Margherita Pizza")).toBeVisible();
});
