import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { FeaturedSection } from "@/components/home/FeaturedSection";

describe("FeaturedSection", () => {
  it("renders section heading", () => {
    render(<FeaturedSection />);
    expect(
      screen.getByRole("heading", { level: 2, name: "Featured Dishes" }),
    ).toBeInTheDocument();
  });

  it("renders featured product cards", () => {
    render(<FeaturedSection />);
    expect(screen.getByText("Margherita Pizza")).toBeInTheDocument();
    expect(screen.getByText("Pepperoni Feast Pizza")).toBeInTheDocument();
  });

  it("renders product prices", () => {
    render(<FeaturedSection />);
    expect(screen.getByText(/EGP\s*180/)).toBeInTheDocument();
  });

  it("renders view full menu CTA", () => {
    render(<FeaturedSection />);
    expect(screen.getByRole("link", { name: "View Full Menu" })).toHaveAttribute(
      "href",
      "/menu",
    );
  });
});
