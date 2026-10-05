import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Card } from "@/components/ui/Card";

describe("Card", () => {
  it("renders children", () => {
    render(<Card>Card content</Card>);
    expect(screen.getByText("Card content")).toBeInTheDocument();
  });

  it("applies default padding", () => {
    render(<Card>Content</Card>);
    expect(screen.getByText("Content")).toHaveClass("p-5");
  });

  it("applies no padding when padding is none", () => {
    render(<Card padding="none">Content</Card>);
    expect(screen.getByText("Content")).toHaveClass("p-0");
  });

  it("applies hoverable class when hoverable is set", () => {
    render(<Card hoverable>Content</Card>);
    expect(screen.getByText("Content")).toHaveClass("hover:shadow-card-hover");
  });

  it("applies custom className", () => {
    render(<Card className="bg-charcoal-50">Content</Card>);
    expect(screen.getByText("Content")).toHaveClass("bg-charcoal-50");
  });
});
