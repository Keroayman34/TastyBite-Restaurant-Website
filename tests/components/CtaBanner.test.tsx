import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { CtaBanner } from "@/components/home/CtaBanner";

describe("CtaBanner", () => {
  it("renders headline", () => {
    render(<CtaBanner />);
    expect(
      screen.getByRole("heading", { level: 2, name: /Hai Voglia di Qualcosa di Buono/i }),
    ).toBeInTheDocument();
  });

  it("renders call to order CTA", () => {
    render(<CtaBanner />);
    expect(
      screen.getByRole("link", { name: /Chiama per Ordinare/i }),
    ).toBeInTheDocument();
  });

  it("renders browse menu CTA", () => {
    render(<CtaBanner />);
    expect(screen.getByRole("link", { name: "Esplora il Menu" })).toHaveAttribute(
      "href",
      "/menu",
    );
  });
});
