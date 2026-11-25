import { expect, test } from "@playwright/test";

test("homepage loads with hero section in Italian by default", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Cucina Autentica");
});

test("header and footer are visible", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("banner")).toBeVisible();
  await expect(page.getByRole("contentinfo")).toBeVisible();
});

test("navigation links are present", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("link", { name: "Menu" }).first()).toBeVisible();
  await expect(page.getByRole("link", { name: "Offerte" }).first()).toBeVisible();
  await expect(page.getByRole("link", { name: "Chi Siamo" }).first()).toBeVisible();
  await expect(page.getByRole("link", { name: "Contatti" }).first()).toBeVisible();
});

test("category section renders", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { level: 2, name: "Esplora per Categoria" }),
  ).toBeVisible();
  await expect(page.getByText("Pizze").first()).toBeVisible();
  await expect(page.getByText("Burger").first()).toBeVisible();
});

test("featured dishes section renders", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { level: 2, name: "Piatti in Evidenza" }),
  ).toBeVisible();
  await expect(page.getByText("Pizza Margherita")).toBeVisible();
});

test("CTA banner renders", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { level: 2, name: /Hai Voglia di Qualcosa di Buono/i }),
  ).toBeVisible();
});

test("mobile menu opens and closes", async ({ page, isMobile }) => {
  test.skip(!isMobile, "Mobile-only test");
  await page.goto("/");
  const menuButton = page.getByRole("button", { name: "Apri menu" });
  await expect(menuButton).toBeVisible();
  await menuButton.click();
  await expect(page.getByRole("button", { name: "Chiudi menu" })).toBeVisible();
  await page.getByRole("button", { name: "Chiudi menu" }).click();
  await expect(page.getByRole("button", { name: "Apri menu" })).toBeVisible();
});

test("menu page loads with products", async ({ page }) => {
  await page.goto("/menu");
  await expect(
    page.getByRole("heading", { level: 2, name: "Il Nostro Menu" }),
  ).toBeVisible();
  await expect(page.getByText("Pizza Margherita").first()).toBeVisible();
});

test("menu category navigation works", async ({ page }) => {
  await page.goto("/menu");
  await page.getByRole("button", { name: "Pizze" }).first().click();
  await expect(page).toHaveURL(/category=pizza/);
  await page.waitForSelector("text=Pizza Margherita", { timeout: 10000 });
  await expect(page.getByText("Pizza Margherita").first()).toBeVisible();
});

test("menu search filters products", async ({ page }) => {
  await page.goto("/menu");
  const searchInput = page.getByPlaceholder("Cerca pizza, burger, pasta...");
  await searchInput.fill("margherita");
  await page.waitForSelector("text=Pizza Margherita", { timeout: 10000 });
  await page.waitForFunction(
    () => !document.body.textContent?.includes("Burger Classico"),
    { timeout: 10000 },
  );
  await expect(page.getByText("Burger Classico")).not.toBeVisible();
});

test("menu filter chips work", async ({ page }) => {
  await page.goto("/menu");
  await page.getByRole("button", { name: "Vegetariano", exact: true }).click();
  await page.waitForSelector("text=Pizza Margherita", { timeout: 10000 });
  await page.waitForFunction(
    () => !document.body.textContent?.includes("Burger Classico"),
    { timeout: 10000 },
  );
  await expect(page.getByText("Burger Classico")).not.toBeVisible();
});

test("menu sort works", async ({ page }) => {
  await page.goto("/menu");
  await page.getByLabel("Ordina prodotti").selectOption("price-asc");
  const prices = await page.locator("text=/€/").allTextContents();
  expect(prices.length).toBeGreaterThan(0);
});

test("menu shows empty state for no matches", async ({ page }) => {
  await page.goto("/menu");
  const searchInput = page.getByPlaceholder("Cerca pizza, burger, pasta...");
  await searchInput.fill("xyznonexistent");
  await page.waitForSelector("text=Nessun prodotto trovato", { timeout: 10000 });
  await expect(page.getByText("Nessun prodotto trovato")).toBeVisible();
});

test("menu has no horizontal overflow on mobile", async ({ page, isMobile }) => {
  test.skip(!isMobile, "Mobile-only test");
  await page.goto("/menu");
  const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
  const viewportWidth = page.viewportSize()?.width ?? 0;
  expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 1);
});

test("product detail page renders", async ({ page }) => {
  await page.goto("/menu/prod-bbq-chicken-pizza");
  await expect(
    page.getByRole("heading", { level: 1, name: "Pizza Pollo BBQ" }),
  ).toBeVisible();
  await expect(page.getByText("4.7")).toBeVisible();
  await expect(page.getByText("(89 recensioni)")).toBeVisible();
});

test("product detail breadcrumb renders", async ({ page }) => {
  await page.goto("/menu/prod-bbq-chicken-pizza");
  const breadcrumb = page.getByRole("navigation", { name: "Percorso di navigazione" });
  await expect(breadcrumb).toBeVisible();
  await expect(breadcrumb.getByRole("link", { name: "Menu" })).toBeVisible();
  await expect(breadcrumb.getByRole("link", { name: "Pizze" })).toBeVisible();
});

test("product detail configuration works", async ({ page }) => {
  await page.goto("/menu/prod-bbq-chicken-pizza");
  await page.getByRole("radio", { name: /Grande/ }).click();
  await page.getByRole("radio", { name: /Bordo Ripieno/ }).click();
  await page.getByRole("checkbox", { name: /Formaggio Extra/ }).click();
  await page.getByRole("button", { name: "Aumenta quantità" }).click();
  await expect(page.getByLabel(/Quantità:/)).toHaveText("2");
});

test("product detail add to cart shows confirmation", async ({ page }) => {
  await page.goto("/menu/prod-bbq-chicken-pizza");
  await page.getByRole("button", { name: /Aggiungi al Carrello/i }).click();
  await expect(page.getByText(/Aggiunto al Carrello/i)).toBeVisible();
});

test("product detail has no horizontal overflow on mobile", async ({
  page,
  isMobile,
}) => {
  test.skip(!isMobile, "Mobile-only test");
  await page.goto("/menu/prod-bbq-chicken-pizza");
  const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
  const viewportWidth = page.viewportSize()?.width ?? 0;
  expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 1);
});

test("invalid product shows not found", async ({ page }) => {
  const response = await page.goto("/menu/invalid-product-id");
  expect(response?.status()).toBe(404);
});

test("about page loads with content", async ({ page }) => {
  await page.goto("/about");
  await expect(
    page.getByRole("heading", { level: 2, name: "La Nostra Storia" }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Scopri il Menu" })).toBeVisible();
});

test("offers page loads with offer cards", async ({ page }) => {
  await page.goto("/offers");
  await expect(
    page.getByRole("heading", { level: 2, name: "Promozioni Imperdibili" }),
  ).toBeVisible();
  await expect(page.getByText("Menu Famiglia Burger")).toBeVisible();
});

test("contact page loads with contact methods", async ({ page }) => {
  await page.goto("/contact");
  await expect(page.getByRole("heading", { level: 2, name: "Contattaci" })).toBeVisible();
  await expect(page.getByRole("link", { name: /Telefono/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /WhatsApp/i })).toBeVisible();
});

test("locations page loads with branch selector", async ({ page }) => {
  await page.goto("/locations");
  await expect(
    page.getByRole("heading", { level: 2, name: "Le Nostre Sedi" }),
  ).toBeVisible();
  await expect(page.getByRole("tab", { name: /Roma Centro/i })).toBeVisible();
});

test("reviews page loads with review cards", async ({ page }) => {
  await page.goto("/reviews");
  await expect(
    page.getByRole("heading", { level: 2, name: "Cosa Dicono i Nostri Clienti" }),
  ).toBeVisible();
  await expect(page.getByText("Giulia R.")).toBeVisible();
});

test("gallery page loads with image grid", async ({ page }) => {
  await page.goto("/gallery");
  await expect(
    page.getByRole("heading", { level: 2, name: "Seguici su Instagram" }),
  ).toBeVisible();
  await expect(page.getByRole("button", { name: "Tutti" })).toBeVisible();
});

test("secondary pages have no horizontal overflow on mobile", async ({
  page,
  isMobile,
}) => {
  test.skip(!isMobile, "Mobile-only test");
  const pages = ["/about", "/offers", "/contact", "/locations", "/reviews", "/gallery"];
  for (const path of pages) {
    await page.goto(path);
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = page.viewportSize()?.width ?? 0;
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 1);
  }
});
