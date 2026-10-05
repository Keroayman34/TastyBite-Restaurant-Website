import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Input } from "@/components/ui/Input";

describe("Input", () => {
  it("renders with a label", () => {
    render(<Input label="Name" name="name" />);
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
  });

  it("associates the label with the input via htmlFor", () => {
    render(<Input label="Email" name="email" />);
    const input = screen.getByLabelText("Email");
    expect(input).toHaveAttribute("id", "email");
  });

  it("renders helper text when provided", () => {
    render(<Input label="Name" name="name" helperText="Required field" />);
    expect(screen.getByText("Required field")).toBeInTheDocument();
  });

  it("renders error message and sets aria-invalid", () => {
    render(<Input label="Name" name="name" error="Name is required" />);
    const input = screen.getByLabelText("Name");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByText("Name is required")).toBeInTheDocument();
  });

  it("shows required marker when required", () => {
    render(<Input label="Name" name="name" required />);
    expect(screen.getByText("*")).toBeInTheDocument();
  });

  it("hides required marker when hideRequiredMarker is set", () => {
    render(<Input label="Name" name="name" required hideRequiredMarker />);
    expect(screen.queryByText("*")).not.toBeInTheDocument();
  });

  it("is disabled when disabled prop is set", () => {
    render(<Input label="Name" name="name" disabled />);
    expect(screen.getByLabelText("Name")).toBeDisabled();
  });

  it("forwards ref for React Hook Form compatibility", async () => {
    const { createRef } = await import("react");
    const ref = createRef<HTMLInputElement>();
    render(<Input label="Name" name="name" ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
});
