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
    expect(screen.getByText("Tutti i Piatti")).toBeInTheDocument();
    expect(screen.getByText("Pizze")).toBeInTheDocument();
    expect(screen.getByText("Burger")).toBeInTheDocument();
  });

  it("renders search input", () => {
    render(<MenuClient initialCategory={null} />);
    expect(
      screen.getByPlaceholderText("Cerca pizza, burger, pasta..."),
    ).toBeInTheDocument();
  });

  it("renders filter chips", () => {
    render(<MenuClient initialCategory={null} />);
    expect(screen.getByRole("button", { name: "Popolari" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Novità" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Offerte" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Vegetariano" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Piccante" })).toBeInTheDocument();
  });

  it("renders product grid", () => {
    render(<MenuClient initialCategory={null} />);
    expect(screen.getByText("Pizza Margherita")).toBeInTheDocument();
    expect(screen.getByText("Burger Classico")).toBeInTheDocument();
  });

  it("filters products by search", async () => {
    const user = userEvent.setup();
    render(<MenuClient initialCategory={null} />);
    const searchInput = screen.getByPlaceholderText("Cerca pizza, burger, pasta...");
    await user.type(searchInput, "margherita");
    expect(screen.getByText("Pizza Margherita")).toBeInTheDocument();
    expect(screen.queryByText("Burger Classico")).not.toBeInTheDocument();
  });

  it("shows empty state when no products match", async () => {
    const user = userEvent.setup();
    render(<MenuClient initialCategory={null} />);
    const searchInput = screen.getByPlaceholderText("Cerca pizza, burger, pasta...");
    await user.type(searchInput, "xyznonexistent");
    expect(screen.getByText("Nessun prodotto trovato")).toBeInTheDocument();
  });

  it("clears filters when clear button is clicked", async () => {
    const user = userEvent.setup();
    render(<MenuClient initialCategory={null} />);
    const searchInput = screen.getByPlaceholderText("Cerca pizza, burger, pasta...");
    await user.type(searchInput, "xyznonexistent");
    await user.click(screen.getByRole("button", { name: "Cancella filtri" }));
    expect(screen.getByText("Pizza Margherita")).toBeInTheDocument();
  });

  it("filters by tag", async () => {
    const user = userEvent.setup();
    render(<MenuClient initialCategory={null} />);
    await user.click(screen.getByRole("button", { name: "Vegetariano" }));
    expect(screen.getByText("Pizza Margherita")).toBeInTheDocument();
    expect(screen.queryByText("Burger Classico")).not.toBeInTheDocument();
  });

  it("navigates to category on click", async () => {
    const user = userEvent.setup();
    render(<MenuClient initialCategory={null} />);
    await user.click(screen.getByRole("button", { name: "Pizze" }));
    expect(mockPush).toHaveBeenCalledWith("/menu?category=pizza");
  });

  it("filters by initial category prop", () => {
    render(<MenuClient initialCategory="pizza" />);
    expect(screen.getByText("Pizza Margherita")).toBeInTheDocument();
    expect(screen.queryByText("Burger Classico")).not.toBeInTheDocument();
  });
});
