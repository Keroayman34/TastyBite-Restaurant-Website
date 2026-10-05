import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Search } from "lucide-react";
import { IconButton } from "@/components/ui/IconButton";

describe("IconButton", () => {
  it("renders with accessible label", () => {
    render(<IconButton label="Search" />);
    expect(screen.getByRole("button", { name: "Search" })).toBeInTheDocument();
  });

  it("has button type by default", () => {
    render(<IconButton label="Search" />);
    expect(screen.getByRole("button", { name: "Search" })).toHaveAttribute(
      "type",
      "button",
    );
  });

  it("is disabled when disabled prop is set", () => {
    render(<IconButton label="Search" disabled />);
    expect(screen.getByRole("button", { name: "Search" })).toBeDisabled();
  });

  it("applies brand variant classes", () => {
    render(<IconButton label="Search" variant="brand" />);
    expect(screen.getByRole("button", { name: "Search" })).toHaveClass("bg-primary-500");
  });

  it("applies size classes", () => {
    render(<IconButton label="Search" size="lg" />);
    expect(screen.getByRole("button", { name: "Search" })).toHaveClass("h-12");
  });

  it("renders icon children", () => {
    render(
      <IconButton label="Search">
        <Search data-testid="search-icon" />
      </IconButton>,
    );
    expect(screen.getByTestId("search-icon")).toBeInTheDocument();
  });
});
