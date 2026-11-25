import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { FeaturedSection } from "@/components/home/FeaturedSection";

describe("FeaturedSection", () => {
  it("renders section heading", () => {
    render(<FeaturedSection />);
    expect(
      screen.getByRole("heading", { level: 2, name: "Piatti in Evidenza" }),
    ).toBeInTheDocument();
  });

  it("renders featured product cards", () => {
    render(<FeaturedSection />);
    expect(screen.getByText("Pizza Margherita")).toBeInTheDocument();
    expect(screen.getByText("Pizza Diavola")).toBeInTheDocument();
  });

  it("renders product prices in EUR", () => {
    render(<FeaturedSection />);
    expect(screen.getByText(/7,00\s*€/)).toBeInTheDocument();
  });

  it("renders view full menu CTA", () => {
    render(<FeaturedSection />);
    expect(screen.getByRole("link", { name: "Scopri Tutto il Menu" })).toHaveAttribute(
      "href",
      "/menu",
    );
  });
});
