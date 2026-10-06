import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import { Header } from "@/components/layout/Header";
import { renderWithCart } from "@/tests/helpers";

describe("Header", () => {
  it("renders brand logo", () => {
    renderWithCart(<Header />);
    expect(screen.getByRole("link", { name: /TastyBite home/i })).toBeInTheDocument();
  });

  it("renders navigation links", () => {
    renderWithCart(<Header />);
    expect(screen.getAllByRole("link", { name: "Home" }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: "Menu" }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: "Offers" }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: "About" }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: "Contact" }).length).toBeGreaterThan(0);
  });

  it("renders Order Now CTA", () => {
    renderWithCart(<Header />);
    expect(screen.getByRole("link", { name: "Order Now" })).toBeInTheDocument();
  });

  it("renders search and cart icon", () => {
    renderWithCart(<Header />);
    expect(screen.getByRole("button", { name: "Search" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Cart/i })).toBeInTheDocument();
  });

  it("renders mobile menu button", () => {
    renderWithCart(<Header />);
    expect(screen.getByRole("button", { name: /menu/i })).toBeInTheDocument();
  });
});
