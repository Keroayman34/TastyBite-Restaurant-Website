import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Container } from "@/components/ui/Container";

describe("Container", () => {
  it("renders children", () => {
    render(<Container>Container content</Container>);
    expect(screen.getByText("Container content")).toBeInTheDocument();
  });

  it("applies default container class", () => {
    render(<Container>Content</Container>);
    expect(screen.getByText("Content")).toHaveClass("container-page");
  });

  it("applies narrow container class when size is narrow", () => {
    render(<Container size="narrow">Content</Container>);
    expect(screen.getByText("Content")).toHaveClass("container-page-narrow");
  });

  it("applies custom className", () => {
    render(<Container className="py-8">Content</Container>);
    expect(screen.getByText("Content")).toHaveClass("py-8");
  });
});
