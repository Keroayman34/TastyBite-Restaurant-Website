import { describe, expect, it, vi, beforeEach } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CheckoutPage } from "@/components/checkout/CheckoutPage";
import { renderWithCart } from "@/tests/helpers";
import { serializeCart, getCartStorageKey } from "@/lib/cart";
import { writeStorage } from "@/services/storage/local-storage";
import { restaurant } from "@/config/restaurant";
import type { CartItem } from "@/domain/entities";

const sampleItem: CartItem = {
  id: "test-item-1",
  product: {
    id: "prod-margherita-pizza",
    name: "Margherita Pizza",
    description: "Fresh tomato sauce, mozzarella, basil",
    categoryId: "cat-pizza",
    basePrice: 150,
    image: "/images/products/margherita-pizza.jpg",
    available: true,
    tags: ["popular", "veggie"],
    rating: 4.8,
    reviewCount: 142,
    options: [],
  },
  quantity: 2,
  selectedOptions: [],
  unitPrice: 150,
  subtotal: 300,
};

describe("CheckoutPage", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it("renders empty cart state when cart has no items", () => {
    renderWithCart(<CheckoutPage />);
    expect(
      screen.getByRole("heading", { name: /Your Cart is Empty/i }),
    ).toBeInTheDocument();
  });

  it("renders customer form and order summary when cart has items", () => {
    writeStorage(getCartStorageKey(), serializeCart({ items: [sampleItem] }));

    renderWithCart(<CheckoutPage />);
    expect(
      screen.getByRole("heading", { name: /Customer Information/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Order Summary/i })).toBeInTheDocument();
    expect(screen.getByText("Margherita Pizza")).toBeInTheDocument();
  });

  it("submits order to restaurant.whatsapp, clears cart, and shows confirmation", async () => {
    writeStorage(getCartStorageKey(), serializeCart({ items: [sampleItem] }));

    const windowOpenSpy = vi.spyOn(window, "open").mockImplementation(() => null);
    const user = userEvent.setup();

    renderWithCart(<CheckoutPage />);

    await user.type(screen.getByLabelText(/Full Name/i), "Karim Gamal");
    await user.type(screen.getByLabelText(/Phone Number/i), "+20 100 123 4567");
    await user.type(screen.getByLabelText(/Address/i), "12 Nile Corniche, Maadi, Cairo");
    await user.type(screen.getByLabelText(/Notes/i), "Ring the bell please");

    await user.click(screen.getByRole("button", { name: /Confirm Order via WhatsApp/i }));

    expect(windowOpenSpy).toHaveBeenCalledTimes(1);
    const openedUrl = windowOpenSpy.mock.calls[0][0] as string;

    const cleanedRestaurantPhone = restaurant.whatsapp.replace(/[^\d]/g, "");
    expect(openedUrl).toContain(`wa.me/${cleanedRestaurantPhone}`);
    expect(openedUrl).toContain(encodeURIComponent("Karim Gamal"));
    expect(openedUrl).toContain(encodeURIComponent("Ring the bell please"));

    // Verify confirmation view is displayed
    expect(
      await screen.findByRole("heading", { name: /Order Placed Successfully/i }),
    ).toBeInTheDocument();
    expect(screen.getByText("Karim Gamal", { selector: "span" })).toBeInTheDocument();

    // Verify fallback WhatsApp button is present with restaurant link
    const whatsappLink = screen.getByRole("link", { name: /Open WhatsApp Again/i });
    expect(whatsappLink).toHaveAttribute("href", openedUrl);

    // Verify localStorage cart is empty
    const saved = localStorage.getItem("tastybite_cart");
    if (saved) {
      const parsed = JSON.parse(saved);
      expect(parsed.items).toHaveLength(0);
    }
  });
});
