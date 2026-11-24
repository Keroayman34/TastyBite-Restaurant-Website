import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { OrderConfirmation } from "@/components/checkout/OrderConfirmation";

const mockOrder = {
  customerName: "Ahmed Mohamed",
  itemCount: 3,
  total: 450,
  currency: "EGP",
  whatsappUrl: "https://wa.me/15551234567?text=Test%20Order",
};

describe("OrderConfirmation", () => {
  it("renders order confirmation heading and customer name", () => {
    render(<OrderConfirmation order={mockOrder} />);
    expect(
      screen.getByRole("heading", { level: 2, name: /Order Placed Successfully/i }),
    ).toBeInTheDocument();
    expect(screen.getByText("Ahmed Mohamed", { selector: "span" })).toBeInTheDocument();
  });

  it("renders order summary details correctly", () => {
    render(<OrderConfirmation order={mockOrder} />);
    expect(screen.getByText("3 items")).toBeInTheDocument();
    expect(screen.getByText(/450/)).toBeInTheDocument();
  });

  it("renders fallback Open WhatsApp Again button with correct attributes", () => {
    render(<OrderConfirmation order={mockOrder} />);
    const whatsappLink = screen.getByRole("link", { name: /Open WhatsApp Again/i });
    expect(whatsappLink).toHaveAttribute("href", mockOrder.whatsappUrl);
    expect(whatsappLink).toHaveAttribute("target", "_blank");
    expect(whatsappLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders Back to Menu link", () => {
    render(<OrderConfirmation order={mockOrder} />);
    const menuLink = screen.getByRole("link", { name: /Back to Menu/i });
    expect(menuLink).toHaveAttribute("href", "/menu");
  });
});
