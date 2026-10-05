import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MenuClient } from "@/components/menu/MenuClient";

const mockPush = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
}));

describe("MenuClient", () => {
  it("renders category sidebar", () => {
    render(<MenuClient initialCategory={null} />);
    expect(screen.getByText("All Items")).toBeInTheDocument();
    expect(screen.getByText("Pizza")).toBeInTheDocument();
    expect(screen.getByText("Burgers")).toBeInTheDocument();
  });

  it("renders search input", () => {
    render(<MenuClient initialCategory={null} />);
    expect(
      screen.getByPlaceholderText("Search for pizza, burger..."),
    ).toBeInTheDocument();
  });

  it("renders filter chips", () => {
    render(<MenuClient initialCategory={null} />);
    expect(screen.getByRole("button", { name: "Popular" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "New" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Offers" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Veggie" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Spicy" })).toBeInTheDocument();
  });

  it("renders product grid", () => {
    render(<MenuClient initialCategory={null} />);
    expect(screen.getByText("Margherita Pizza")).toBeInTheDocument();
    expect(screen.getByText("Classic Burger")).toBeInTheDocument();
  });

  it("filters products by search", async () => {
    const user = userEvent.setup();
    render(<MenuClient initialCategory={null} />);
    const searchInput = screen.getByPlaceholderText("Search for pizza, burger...");
    await user.type(searchInput, "margherita");
    expect(screen.getByText("Margherita Pizza")).toBeInTheDocument();
    expect(screen.queryByText("Classic Burger")).not.toBeInTheDocument();
  });

  it("shows empty state when no products match", async () => {
    const user = userEvent.setup();
    render(<MenuClient initialCategory={null} />);
    const searchInput = screen.getByPlaceholderText("Search for pizza, burger...");
    await user.type(searchInput, "xyznonexistent");
    expect(screen.getByText("No products found")).toBeInTheDocument();
  });

  it("clears filters when clear button is clicked", async () => {
    const user = userEvent.setup();
    render(<MenuClient initialCategory={null} />);
    const searchInput = screen.getByPlaceholderText("Search for pizza, burger...");
    await user.type(searchInput, "xyznonexistent");
    await user.click(screen.getByRole("button", { name: "Clear filters" }));
    expect(screen.getByText("Margherita Pizza")).toBeInTheDocument();
  });

  it("filters by tag", async () => {
    const user = userEvent.setup();
    render(<MenuClient initialCategory={null} />);
    await user.click(screen.getByRole("button", { name: "Veggie" }));
    expect(screen.getByText("Margherita Pizza")).toBeInTheDocument();
    expect(screen.queryByText("Classic Burger")).not.toBeInTheDocument();
  });

  it("navigates to category on click", async () => {
    const user = userEvent.setup();
    render(<MenuClient initialCategory={null} />);
    await user.click(screen.getByRole("button", { name: "Pizza" }));
    expect(mockPush).toHaveBeenCalledWith("/menu?category=pizza");
  });

  it("filters by initial category prop", () => {
    render(<MenuClient initialCategory="pizza" />);
    expect(screen.getByText("Margherita Pizza")).toBeInTheDocument();
    expect(screen.queryByText("Classic Burger")).not.toBeInTheDocument();
  });
});
