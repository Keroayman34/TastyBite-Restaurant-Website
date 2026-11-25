import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import { Header } from "@/components/layout/Header";
import { renderWithCart } from "@/tests/helpers";

describe("Header", () => {
  it("renders brand logo", () => {
    renderWithCart(<Header />);
    expect(screen.getByRole("link", { name: /TastyBite home/i })).toBeInTheDocument();
  });

  it("renders navigation links in Italian by default", () => {
    renderWithCart(<Header />);
    expect(screen.getAllByRole("link", { name: "Home" }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: "Menu" }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: "Offerte" }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: "Chi Siamo" }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: "Contatti" }).length).toBeGreaterThan(0);
  });

  it("renders Order Now CTA", () => {
    renderWithCart(<Header />);
    expect(screen.getByRole("link", { name: "Ordina Ora" })).toBeInTheDocument();
  });

  it("renders search and cart icon", () => {
    renderWithCart(<Header />);
    expect(screen.getByRole("button", { name: "Cerca" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Carrello/i })).toBeInTheDocument();
  });

  it("renders language and currency selectors", () => {
    renderWithCart(<Header />);
    expect(screen.getAllByTestId("lang-btn-it").length).toBeGreaterThan(0);
    expect(screen.getAllByTestId("lang-btn-en").length).toBeGreaterThan(0);
    expect(screen.getAllByTestId("currency-btn-EUR").length).toBeGreaterThan(0);
    expect(screen.getAllByTestId("currency-btn-USD").length).toBeGreaterThan(0);
  });

  it("renders mobile menu button", () => {
    renderWithCart(<Header />);
    expect(screen.getByRole("button", { name: /menu/i })).toBeInTheDocument();
  });
});
