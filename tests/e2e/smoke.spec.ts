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
  await expect(page.getByText("Classic Cheeseburger")).toBeVisible();
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
