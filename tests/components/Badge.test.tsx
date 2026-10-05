import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Badge } from "@/components/ui/Badge";

describe("Badge", () => {
  it("renders children", () => {
    render(<Badge>Bestseller</Badge>);
    expect(screen.getByText("Bestseller")).toBeInTheDocument();
  });

  it("applies brand variant classes", () => {
    render(<Badge variant="brand">New</Badge>);
    expect(screen.getByText("New")).toHaveClass("bg-primary-50");
  });
});
