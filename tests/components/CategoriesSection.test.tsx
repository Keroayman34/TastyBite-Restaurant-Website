import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { CategoriesSection } from "@/components/home/CategoriesSection";

describe("CategoriesSection", () => {
  it("renders section heading", () => {
    render(<CategoriesSection />);
    expect(
      screen.getByRole("heading", { level: 2, name: "Browse by Category" }),
    ).toBeInTheDocument();
  });

  it("renders all category cards", () => {
    render(<CategoriesSection />);
    expect(screen.getByText("Pizza")).toBeInTheDocument();
    expect(screen.getByText("Burgers")).toBeInTheDocument();
    expect(screen.getByText("Chicken")).toBeInTheDocument();
    expect(screen.getByText("Pasta")).toBeInTheDocument();
    expect(screen.getByText("Salads")).toBeInTheDocument();
    expect(screen.getByText("Drinks")).toBeInTheDocument();
    expect(screen.getByText("Desserts")).toBeInTheDocument();
  });

  it("renders category links", () => {
    render(<CategoriesSection />);
    const pizzaLink = screen.getByRole("link", { name: /Pizza/i });
    expect(pizzaLink).toHaveAttribute("href", "/menu?category=pizza");
  });
});
