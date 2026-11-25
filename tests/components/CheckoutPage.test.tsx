import { describe, expect, it, vi, beforeEach } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CheckoutPage } from "@/components/checkout/CheckoutPage";
import { renderWithCart } from "@/tests/helpers";
import { serializeCart, deserializeCart, getCartStorageKey } from "@/lib/cart";
import { readStorage, writeStorage } from "@/services/storage/local-storage";
import { restaurant } from "@/config/restaurant";
import type { CartItem } from "@/domain/entities";

const sampleItem: CartItem = {
  id: "test-item-1",
  product: {
    id: "prod-margherita-pizza",
    name: { it: "Pizza Margherita", en: "Margherita Pizza" },
    description: {
      it: "Salsa di pomodoro fresco, mozzarella fior di latte e basilico",
      en: "Fresh tomato sauce, mozzarella, basil",
    },
    categoryId: "cat-pizza",
    basePrice: 7.0,
    image: "/images/products/margherita-pizza.jpg",
    available: true,
    tags: ["popular", "veggie"],
    rating: 4.5,
    reviewCount: 96,
    options: [],
  },
  quantity: 2,
  selectedOptions: [],
  unitPrice: 7.0,
  subtotal: 14.0,
};

describe("CheckoutPage", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it("renders empty cart state when cart has no items", () => {
    renderWithCart(<CheckoutPage />);
    expect(
      screen.getByRole("heading", { name: /Il tuo carrello è vuoto/i }),
    ).toBeInTheDocument();
  });

  it("renders customer form and order summary when cart has items", () => {
    writeStorage(getCartStorageKey(), serializeCart({ items: [sampleItem] }));

    renderWithCart(<CheckoutPage />);
    expect(
      screen.getByRole("heading", { name: /Dati del Cliente/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Riepilogo Ordine/i }),
    ).toBeInTheDocument();
    expect(screen.getByText("Pizza Margherita")).toBeInTheDocument();
  });

  it("submits order to restaurant.whatsapp, clears cart, and shows confirmation", async () => {
    writeStorage(getCartStorageKey(), serializeCart({ items: [sampleItem] }));

    const windowOpenSpy = vi.spyOn(window, "open").mockImplementation(() => null);
    const user = userEvent.setup();

    renderWithCart(<CheckoutPage />);

    await user.type(screen.getByLabelText(/Nome e Cognome/i), "Marco Rossi");
    await user.type(screen.getByLabelText(/Numero di Telefono/i), "+39 333 123 4567");
    await user.type(
      screen.getByLabelText(/Indirizzo di Consegna/i),
      "Via del Corso 10, Roma",
    );
    await user.type(screen.getByLabelText(/Note/i), "Suonare al citofono 3");

    await user.click(
      screen.getByRole("button", { name: /Conferma Ordine via WhatsApp/i }),
    );

    expect(windowOpenSpy).toHaveBeenCalledTimes(1);
    const openedUrl = windowOpenSpy.mock.calls[0][0] as string;

    const cleanedRestaurantPhone = restaurant.whatsapp.replace(/[^\d]/g, "");
    expect(openedUrl).toContain(`wa.me/${cleanedRestaurantPhone}`);
    expect(openedUrl).toContain(encodeURIComponent("Marco Rossi"));
    expect(openedUrl).toContain(encodeURIComponent("Suonare al citofono 3"));

    expect(
      await screen.findByRole("heading", { name: /Ordine Inviato con Successo/i }),
    ).toBeInTheDocument();
    expect(screen.getByText("Marco Rossi", { selector: "span" })).toBeInTheDocument();

    const whatsappLink = screen.getByRole("link", { name: /Riapri WhatsApp/i });
    expect(whatsappLink).toHaveAttribute("href", openedUrl);

    const saved = readStorage<string>(getCartStorageKey());
    if (saved) {
      const parsed = deserializeCart(saved);
      expect(parsed?.items ?? []).toHaveLength(0);
    }
  });
});
