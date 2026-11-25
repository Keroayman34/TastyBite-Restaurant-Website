import { describe, expect, it, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Header } from "@/components/layout/Header";
import { FeaturedSection } from "@/components/home/FeaturedSection";
import { PreferencesProvider } from "@/components/preferences/PreferencesContext";
import { CartProvider } from "@/components/cart/CartContext";
import { CURRENCY_STORAGE_KEY } from "@/lib/currency";
import { LANGUAGE_STORAGE_KEY } from "@/lib/i18n";

function renderApp() {
  return render(
    <PreferencesProvider>
      <CartProvider>
        <Header />
        <FeaturedSection />
      </CartProvider>
    </PreferencesProvider>,
  );
}

describe("Language and Currency Preferences Integration", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("defaults to Italian language and EUR currency", () => {
    renderApp();
    expect(
      screen.getByRole("heading", { level: 2, name: "Piatti in Evidenza" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Pizza Margherita")).toBeInTheDocument();
    expect(screen.getByText(/7,00\s*€/)).toBeInTheDocument();
  });

  it("switches language independently without changing currency, and persists", async () => {
    const user = userEvent.setup();
    renderApp();

    const enBtn = screen.getAllByTestId("lang-btn-en")[0];
    await user.click(enBtn);

    expect(
      screen.getByRole("heading", { level: 2, name: "Featured Dishes" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Margherita Pizza")).toBeInTheDocument();
    // Currency remains EUR (€7.00 in en-IE format)
    expect(screen.getByText(/€7\.00/)).toBeInTheDocument();
    expect(JSON.parse(localStorage.getItem(LANGUAGE_STORAGE_KEY)!)).toBe("en");
  });

  it("switches currency independently without changing language, and persists", async () => {
    const user = userEvent.setup();
    renderApp();

    const usdBtn = screen.getAllByTestId("currency-btn-USD")[0];
    await user.click(usdBtn);

    // Language remains Italian
    expect(
      screen.getByRole("heading", { level: 2, name: "Piatti in Evidenza" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Pizza Margherita")).toBeInTheDocument();
    // 7.00 EUR * 1.0963 = 7.67 USD formatted in it-IT
    expect(screen.getByText(/7,67\s*\$/)).toBeInTheDocument();
    expect(JSON.parse(localStorage.getItem(CURRENCY_STORAGE_KEY)!)).toBe("USD");
  });
});
