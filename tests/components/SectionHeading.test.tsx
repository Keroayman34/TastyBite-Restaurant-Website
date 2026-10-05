import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { SectionHeading } from "@/components/ui/SectionHeading";

describe("SectionHeading", () => {
  it("renders title", () => {
    render(<SectionHeading title="Our Menu" />);
    expect(screen.getByRole("heading", { level: 2, name: "Our Menu" })).toBeInTheDocument();
  });

  it("renders eyebrow when provided", () => {
    render(<SectionHeading eyebrow="Discover" title="Our Menu" />);
    expect(screen.getByText("Discover")).toBeInTheDocument();
  });

  it("renders description when provided", () => {
    render(<SectionHeading title="Our Menu" description="Browse our selection" />);
    expect(screen.getByText("Browse our selection")).toBeInTheDocument();
  });

  it("does not render eyebrow or description when not provided", () => {
    render(<SectionHeading title="Our Menu" />);
    expect(screen.queryByText("Discover")).not.toBeInTheDocument();
  });

  it("applies left alignment when align is left", () => {
    render(<SectionHeading title="Our Menu" align="left" />);
    expect(screen.getByText("Our Menu").parentElement).toHaveClass("items-start");
  });
});
