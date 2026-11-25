import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { OrderConfirmation } from "@/components/checkout/OrderConfirmation";

const mockOrder = {
  customerName: "Marco Rossi",
  itemCount: 3,
  total: 24.5,
  whatsappUrl: "https://wa.me/390612345678?text=Test%20Order",
};

describe("OrderConfirmation", () => {
  it("renders order confirmation heading and customer name", () => {
    render(<OrderConfirmation order={mockOrder} />);
    expect(
      screen.getByRole("heading", { level: 2, name: /Ordine Inviato con Successo/i }),
    ).toBeInTheDocument();
    expect(screen.getByText("Marco Rossi", { selector: "span" })).toBeInTheDocument();
  });

  it("renders order summary details correctly", () => {
    render(<OrderConfirmation order={mockOrder} />);
    expect(screen.getByText("3 articoli")).toBeInTheDocument();
    expect(screen.getByText(/24,50\s*€/)).toBeInTheDocument();
  });

  it("renders fallback Open WhatsApp Again button with correct attributes", () => {
    render(<OrderConfirmation order={mockOrder} />);
    const whatsappLink = screen.getByRole("link", { name: /Riapri WhatsApp/i });
    expect(whatsappLink).toHaveAttribute("href", mockOrder.whatsappUrl);
    expect(whatsappLink).toHaveAttribute("target", "_blank");
    expect(whatsappLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders Back to Menu link", () => {
    render(<OrderConfirmation order={mockOrder} />);
    const menuLink = screen.getByRole("link", { name: /Torna al Menu/i });
    expect(menuLink).toHaveAttribute("href", "/menu");
  });
});
