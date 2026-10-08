import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Hero } from "@/components/home/Hero";

describe("Hero", () => {
  it("renders the main headline", () => {
    render(<Hero />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Delicious Food, Delivered Fast",
    );
  });

  it("renders supporting text", () => {
    render(<Hero />);
    expect(screen.getByText(/fresh ingredients and deliver it hot/i)).toBeInTheDocument();
  });

  it("renders primary CTA", () => {
    render(<Hero />);
    expect(screen.getByRole("link", { name: "Order Now" })).toHaveAttribute(
      "href",
      "/menu",
    );
  });

  it("renders secondary CTA", () => {
    render(<Hero />);
    expect(screen.getByRole("link", { name: "View Menu" })).toHaveAttribute(
      "href",
      "/menu",
    );
  });

  it("renders hero image with alt text", () => {
    render(<Hero />);
    expect(
      screen.getByRole("img", { name: /premium wood-fired pizza/i }),
    ).toBeInTheDocument();
  });

  it("renders benefit badges", () => {
    render(<Hero />);
    expect(screen.getByText("Fast Delivery")).toBeInTheDocument();
    expect(screen.getByText("Fresh Ingredients")).toBeInTheDocument();
    expect(screen.getByText("Free Delivery")).toBeInTheDocument();
  });
});
