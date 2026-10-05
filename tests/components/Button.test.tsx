import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "@/components/ui/Button";

describe("Button", () => {
  it("renders children", () => {
    render(<Button>Order now</Button>);
    expect(screen.getByRole("button", { name: "Order now" })).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const user = userEvent.setup();
    let clicked = false;
    render(<Button onClick={() => (clicked = true)}>Click me</Button>);
    await user.click(screen.getByRole("button", { name: "Click me" }));
    expect(clicked).toBe(true);
  });

  it("applies variant classes", () => {
    render(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByRole("button", { name: "Secondary" })).toHaveClass(
      "bg-accent-100",
    );
  });

  it("renders a link when href is provided", () => {
    render(<Button href="/menu">View menu</Button>);
    const link = screen.getByRole("link", { name: "View menu" });
    expect(link).toHaveAttribute("href", "/menu");
  });

  it("is disabled when disabled prop is set", () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole("button", { name: "Disabled" })).toBeDisabled();
  });
});
