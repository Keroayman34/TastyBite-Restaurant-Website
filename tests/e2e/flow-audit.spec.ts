import { test, expect } from "@playwright/test";

test("FLOW A: product card navigates to details", async ({ page }) => {
  await page.goto("/menu", { waitUntil: "networkidle" });
  await page.getByText("Pizza Margherita").first().click();
  await expect(page).toHaveURL(/menu\/prod-margherita-pizza/);
  await expect(
    page.getByRole("heading", { level: 1, name: "Pizza Margherita" }),
  ).toBeVisible();
});

test("FLOW B: product details customization", async ({ page }) => {
  await page.goto("/menu/prod-margherita-pizza", { waitUntil: "networkidle" });
  await expect(
    page.getByRole("heading", { level: 1, name: "Pizza Margherita" }),
  ).toBeVisible();
  await expect(
    page.getByText("Salsa di pomodoro fresco, mozzarella fior di latte e basilico"),
  ).toBeVisible();
  await expect(page.getByRole("radio", { name: /Piccola/ })).toBeVisible();
  await expect(page.getByRole("radio", { name: /Classico/ })).toBeVisible();
  await expect(page.getByRole("checkbox", { name: /Formaggio Extra/ })).toBeVisible();
  await page.getByRole("radio", { name: /Grande/ }).click();
  await page.getByRole("checkbox", { name: /Formaggio Extra/ }).click();
  await page.getByRole("button", { name: "Aumenta quantità" }).click();
  await expect(page.getByLabel(/Quantità:/)).toHaveText("2");
});

test("FLOW C: add to cart updates badge", async ({ page }) => {
  await page.goto("/menu/prod-margherita-pizza", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: /Aggiungi al Carrello/i }).click();
  await page.waitForTimeout(500);
  const cartLink = page.getByRole("link", { name: /Carrello/i });
  await expect(cartLink).toContainText("1");
});

test("FLOW D: header cart navigates to cart page", async ({ page }) => {
  await page.goto("/menu/prod-margherita-pizza", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: /Aggiungi al Carrello/i }).click();
  await page.waitForTimeout(500);
  await page.getByRole("link", { name: /Carrello/i }).click();
  await expect(page).toHaveURL(/\/cart/);
  await expect(page.getByText("Pizza Margherita")).toBeVisible();
});

test("FLOW E: checkout submits order and displays confirmation", async ({ page }) => {
  await page.goto("/menu/prod-margherita-pizza", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: /Aggiungi al Carrello/i }).click();
  await page.waitForTimeout(500);
  await page.goto("/checkout", { waitUntil: "networkidle" });

  await page.getByLabel(/Nome e Cognome/i).fill("Marco Rossi");
  await page.getByLabel(/Numero di Telefono/i).fill("+39 333 123 4567");
  await page.getByLabel(/Indirizzo di Consegna/i).fill("Via del Corso 10, Roma");
  await page.getByLabel(/Note/i).fill("Suonare al citofono 3");

  await page.getByRole("button", { name: /Conferma Ordine via WhatsApp/i }).click();

  await expect(
    page.getByRole("heading", { level: 2, name: /Ordine Inviato con Successo/i }),
  ).toBeVisible();
  await expect(page.getByText("Marco Rossi").first()).toBeVisible();
  await expect(page.getByRole("link", { name: /Riapri WhatsApp/i })).toBeVisible();
});

test("FLOW F: language and currency switch independently and persist", async ({
  page,
  isMobile,
}) => {
  await page.goto("/", { waitUntil: "networkidle" });

  if (isMobile) {
    await page.getByRole("button", { name: "Apri menu" }).click();
  }

  // Switch language to English
  await page.locator('[data-testid="lang-btn-en"]:visible').first().click();
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Delicious Food");
  // Currency remains EUR
  await expect(page.getByText(/€7\.00/)).toBeVisible();

  // Switch currency to USD
  await page.locator('[data-testid="currency-btn-USD"]:visible').first().click();
  // Language stays English while currency changes to USD ($7.65)
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Delicious Food");
  await expect(page.getByText(/\$7\.65/)).toBeVisible();

  // Reload and verify persistence
  await page.reload({ waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Delicious Food");
  await expect(page.getByText(/\$7\.65/)).toBeVisible();
});
