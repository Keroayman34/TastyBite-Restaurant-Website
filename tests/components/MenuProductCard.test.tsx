import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MenuProductCard } from "@/components/menu/MenuProductCard";
import { products } from "@/data/products";
import type { Product } from "@/domain/entities";

describe("MenuProductCard", () => {
  const availableProduct = products.find(
    (p) => p.available && p.id === "prod-margherita-pizza",
  )!;
  const unavailableProduct: Product = {
    ...availableProduct,
    id: "prod-unavailable-test",
    name: "Unavailable Test Product",
    available: false,
  };

  it("renders product name and description", () => {
    render(<MenuProductCard product={availableProduct} />);
    expect(screen.getByText("Pizza Margherita")).toBeInTheDocument();
    expect(
      screen.getByText("Salsa di pomodoro fresco, mozzarella fior di latte e basilico"),
    ).toBeInTheDocument();
  });

  it("renders price in EUR", () => {
    render(<MenuProductCard product={availableProduct} />);
    expect(screen.getByText(/7,00\s*€/)).toBeInTheDocument();
  });

  it("renders add to cart button for available products", () => {
    render(<MenuProductCard product={availableProduct} />);
    expect(
      screen.getByRole("button", { name: /Aggiungi Pizza Margherita al carrello/i }),
    ).toBeEnabled();
  });

  it("disables add to cart for unavailable products", () => {
    render(<MenuProductCard product={unavailableProduct} />);
    expect(screen.getByRole("button", { name: /Aggiungi/i })).toBeDisabled();
  });

  it("shows unavailable badge for unavailable products", () => {
    render(<MenuProductCard product={unavailableProduct} />);
    expect(screen.getByText("Non disponibile")).toBeInTheDocument();
  });

  it("renders popular badge for popular products", () => {
    render(<MenuProductCard product={availableProduct} />);
    expect(screen.getByText("Popolare")).toBeInTheDocument();
  });
});
