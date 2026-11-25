import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { CategoriesSection } from "@/components/home/CategoriesSection";

describe("CategoriesSection", () => {
  it("renders section heading", () => {
    render(<CategoriesSection />);
    expect(
      screen.getByRole("heading", { level: 2, name: "Esplora per Categoria" }),
    ).toBeInTheDocument();
  });

  it("renders all category cards", () => {
    render(<CategoriesSection />);
    expect(screen.getByText("Pizze")).toBeInTheDocument();
    expect(screen.getByText("Burger")).toBeInTheDocument();
    expect(screen.getByText("Pollo")).toBeInTheDocument();
    expect(screen.getByText("Pasta")).toBeInTheDocument();
    expect(screen.getByText("Insalate")).toBeInTheDocument();
    expect(screen.getByText("Bevande")).toBeInTheDocument();
    expect(screen.getByText("Dolci")).toBeInTheDocument();
  });

  it("renders category links", () => {
    render(<CategoriesSection />);
    const pizzaLink = screen.getByRole("link", { name: /Pizze/i });
    expect(pizzaLink).toHaveAttribute("href", "/menu?category=pizza");
  });
});
