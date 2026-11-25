import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Hero } from "@/components/home/Hero";

describe("Hero", () => {
  it("renders the main headline", () => {
    render(<Hero />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Cucina Autentica, Consegna Veloce",
    );
  });

  it("renders supporting text", () => {
    render(<Hero />);
    expect(
      screen.getByText(/ingredienti freschi e lo consegniamo caldo/i),
    ).toBeInTheDocument();
  });

  it("renders primary CTA", () => {
    render(<Hero />);
    expect(screen.getByRole("link", { name: "Ordina Ora" })).toHaveAttribute(
      "href",
      "/menu",
    );
  });

  it("renders secondary CTA", () => {
    render(<Hero />);
    expect(screen.getByRole("link", { name: "Scopri il Menu" })).toHaveAttribute(
      "href",
      "/menu",
    );
  });

  it("renders hero background image", () => {
    render(<Hero />);
    expect(screen.getByTestId("hero-background")).toBeInTheDocument();
  });

  it("renders benefit badges", () => {
    render(<Hero />);
    expect(screen.getByText("Consegna Rapida")).toBeInTheDocument();
    expect(screen.getByText("Ingredienti Freschi")).toBeInTheDocument();
    expect(screen.getByText("Consegna Gratuita")).toBeInTheDocument();
  });
});
