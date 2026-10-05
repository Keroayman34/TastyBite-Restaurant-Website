import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProductDetails } from "@/components/product/ProductDetails";
import { products } from "@/data/products";

const pizza = products.find((p) => p.id === "prod-chicken-ranch-pizza")!;

describe("ProductDetails", () => {
  it("renders product name", () => {
    render(<ProductDetails product={pizza} />);
    expect(
      screen.getByRole("heading", { level: 1, name: "Chicken Ranch Pizza" }),
    ).toBeInTheDocument();
  });

  it("renders product description", () => {
    render(<ProductDetails product={pizza} />);
    expect(screen.getByText("Chicken, ranch sauce, mozzarella")).toBeInTheDocument();
  });

  it("renders rating and review count", () => {
    render(<ProductDetails product={pizza} />);
    expect(screen.getByText("4.8")).toBeInTheDocument();
    expect(screen.getByText("(128 reviews)")).toBeInTheDocument();
  });

  it("renders base price", () => {
    render(<ProductDetails product={pizza} />);
    expect(screen.getAllByText(/EGP\s*220/)[0]).toBeInTheDocument();
  });

  it("renders size options", () => {
    render(<ProductDetails product={pizza} />);
    expect(screen.getByRole("radio", { name: /Small/ })).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: /Medium/ })).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: /Large/ })).toBeInTheDocument();
  });

  it("renders crust options for pizza", () => {
    render(<ProductDetails product={pizza} />);
    expect(screen.getByRole("radio", { name: /Classic/ })).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: /Cheese/ })).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: /Thin/ })).toBeInTheDocument();
  });

  it("renders extras", () => {
    render(<ProductDetails product={pizza} />);
    expect(screen.getByRole("checkbox", { name: /Extra Cheese/ })).toBeInTheDocument();
    expect(screen.getByRole("checkbox", { name: /Olives/ })).toBeInTheDocument();
    expect(screen.getByRole("checkbox", { name: /Chicken/ })).toBeInTheDocument();
    expect(screen.getByRole("checkbox", { name: /Jalapeño/ })).toBeInTheDocument();
  });

  it("updates price when size changes", async () => {
    const user = userEvent.setup();
    render(<ProductDetails product={pizza} />);
    await user.click(screen.getByRole("radio", { name: /Large/ }));
    expect(screen.getAllByText(/EGP\s*260/)[0]).toBeInTheDocument();
  });

  it("updates price when crust changes", async () => {
    const user = userEvent.setup();
    render(<ProductDetails product={pizza} />);
    await user.click(screen.getByRole("radio", { name: /Cheese/ }));
    expect(screen.getAllByText(/EGP\s*250/)[0]).toBeInTheDocument();
  });

  it("updates price when extra is selected", async () => {
    const user = userEvent.setup();
    render(<ProductDetails product={pizza} />);
    await user.click(screen.getByRole("checkbox", { name: /Extra Cheese/ }));
    expect(screen.getAllByText(/EGP\s*240/)[0]).toBeInTheDocument();
  });

  it("removes extra adjustment when deselected", async () => {
    const user = userEvent.setup();
    render(<ProductDetails product={pizza} />);
    const extraCheese = screen.getByRole("checkbox", { name: /Extra Cheese/ });
    await user.click(extraCheese);
    await user.click(extraCheese);
    expect(screen.getAllByText(/EGP\s*220/)[0]).toBeInTheDocument();
  });

  it("increments quantity", async () => {
    const user = userEvent.setup();
    render(<ProductDetails product={pizza} />);
    await user.click(screen.getByRole("button", { name: "Increase quantity" }));
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("decrements quantity", async () => {
    const user = userEvent.setup();
    render(<ProductDetails product={pizza} />);
    await user.click(screen.getByRole("button", { name: "Increase quantity" }));
    await user.click(screen.getByRole("button", { name: "Decrease quantity" }));
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("prevents quantity below minimum", async () => {
    const user = userEvent.setup();
    render(<ProductDetails product={pizza} />);
    await user.click(screen.getByRole("button", { name: "Decrease quantity" }));
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("disables decrease button at minimum quantity", () => {
    render(<ProductDetails product={pizza} />);
    expect(screen.getByRole("button", { name: "Decrease quantity" })).toBeDisabled();
  });

  it("renders add to cart button", () => {
    render(<ProductDetails product={pizza} />);
    expect(screen.getByRole("button", { name: /Add to Cart/i })).toBeInTheDocument();
  });

  it("shows added confirmation on add to cart", async () => {
    const user = userEvent.setup();
    render(<ProductDetails product={pizza} />);
    await user.click(screen.getByRole("button", { name: /Add to Cart/i }));
    expect(screen.getByText(/Added to Cart/i)).toBeInTheDocument();
  });
});
