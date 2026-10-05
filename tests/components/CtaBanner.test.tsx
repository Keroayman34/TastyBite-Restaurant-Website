import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { CtaBanner } from "@/components/home/CtaBanner";

describe("CtaBanner", () => {
  it("renders headline", () => {
    render(<CtaBanner />);
    expect(
      screen.getByRole("heading", { level: 2, name: /Craving Something Delicious/i }),
    ).toBeInTheDocument();
  });

  it("renders call to order CTA", () => {
    render(<CtaBanner />);
    expect(screen.getByRole("link", { name: /Call to Order/i })).toBeInTheDocument();
  });

  it("renders browse menu CTA", () => {
    render(<CtaBanner />);
    expect(screen.getByRole("link", { name: "Browse Menu" })).toHaveAttribute(
      "href",
      "/menu",
    );
  });
});
