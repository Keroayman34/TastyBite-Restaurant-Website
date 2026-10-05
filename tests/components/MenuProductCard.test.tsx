import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MenuProductCard } from "@/components/menu/MenuProductCard";
import { products } from "@/data/products";

describe("MenuProductCard", () => {
  const availableProduct = products.find(
    (p) => p.available && p.id === "prod-margherita-pizza",
  )!;
  const unavailableProduct = products.find((p) => !p.available)!;

  it("renders product name and description", () => {
    render(<MenuProductCard product={availableProduct} />);
    expect(screen.getByText("Margherita Pizza")).toBeInTheDocument();
    expect(screen.getByText("Fresh tomato sauce, mozzarella, basil")).toBeInTheDocument();
  });

  it("renders price in EGP", () => {
    render(<MenuProductCard product={availableProduct} />);
    expect(screen.getByText(/EGP\s*180/)).toBeInTheDocument();
  });

  it("renders add to cart button for available products", () => {
    render(<MenuProductCard product={availableProduct} />);
    expect(
      screen.getByRole("button", { name: /Add Margherita Pizza to cart/i }),
    ).toBeEnabled();
  });

  it("disables add to cart for unavailable products", () => {
    render(<MenuProductCard product={unavailableProduct} />);
    expect(screen.getByRole("button", { name: /Add/i })).toBeDisabled();
  });

  it("shows unavailable badge for unavailable products", () => {
    render(<MenuProductCard product={unavailableProduct} />);
    expect(screen.getByText("Unavailable")).toBeInTheDocument();
  });

  it("renders popular badge for popular products", () => {
    render(<MenuProductCard product={availableProduct} />);
    expect(screen.getByText("Popular")).toBeInTheDocument();
  });
});
