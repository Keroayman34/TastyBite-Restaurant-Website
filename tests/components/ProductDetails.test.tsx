import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProductDetails } from "@/components/product/ProductDetails";
import { renderWithCart } from "@/tests/helpers";
import { products } from "@/data/products";

const pizza = products.find((p) => p.id === "prod-bbq-chicken-pizza")!;

describe("ProductDetails", () => {
  it("renders product name", () => {
    renderWithCart(<ProductDetails product={pizza} />);
    expect(
      screen.getByRole("heading", { level: 1, name: "Pizza Pollo BBQ" }),
    ).toBeInTheDocument();
  });

  it("renders product description", () => {
    renderWithCart(<ProductDetails product={pizza} />);
    expect(
      screen.getByText("Pollo alla griglia, salsa barbecue, cipolla rossa e mozzarella."),
    ).toBeInTheDocument();
  });

  it("renders rating and review count", () => {
    renderWithCart(<ProductDetails product={pizza} />);
    expect(screen.getByText("4.7")).toBeInTheDocument();
    expect(screen.getByText("(89 recensioni)")).toBeInTheDocument();
  });

  it("renders base price in EUR", () => {
    renderWithCart(<ProductDetails product={pizza} />);
    expect(screen.getAllByText(/10,50\s*€/)[0]).toBeInTheDocument();
  });

  it("renders size options", () => {
    renderWithCart(<ProductDetails product={pizza} />);
    expect(screen.getByRole("radio", { name: /Piccola/ })).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: /Media/ })).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: /Grande/ })).toBeInTheDocument();
  });

  it("renders crust options for pizza", () => {
    renderWithCart(<ProductDetails product={pizza} />);
    expect(screen.getByRole("radio", { name: /Classico/ })).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: /Bordo Ripieno/ })).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: /Sottile/ })).toBeInTheDocument();
  });

  it("renders extras", () => {
    renderWithCart(<ProductDetails product={pizza} />);
    expect(screen.getByRole("checkbox", { name: /Formaggio Extra/ })).toBeInTheDocument();
    expect(screen.getByRole("checkbox", { name: /Olive/ })).toBeInTheDocument();
    expect(screen.getByRole("checkbox", { name: /Pollo/ })).toBeInTheDocument();
    expect(screen.getByRole("checkbox", { name: /Jalapeño/ })).toBeInTheDocument();
  });

  it("updates price when size changes", async () => {
    const user = userEvent.setup();
    renderWithCart(<ProductDetails product={pizza} />);
    await user.click(screen.getByRole("radio", { name: /Grande/ }));
    expect(screen.getAllByText(/14,50\s*€/)[0]).toBeInTheDocument();
  });

  it("updates price when crust changes", async () => {
    const user = userEvent.setup();
    renderWithCart(<ProductDetails product={pizza} />);
    await user.click(screen.getByRole("radio", { name: /Bordo Ripieno/ }));
    expect(screen.getAllByText(/13,00\s*€/)[0]).toBeInTheDocument();
  });

  it("updates price when extra is selected", async () => {
    const user = userEvent.setup();
    renderWithCart(<ProductDetails product={pizza} />);
    await user.click(screen.getByRole("checkbox", { name: /Formaggio Extra/ }));
    expect(screen.getAllByText(/12,00\s*€/)[0]).toBeInTheDocument();
  });

  it("removes extra adjustment when deselected", async () => {
    const user = userEvent.setup();
    renderWithCart(<ProductDetails product={pizza} />);
    const extraCheese = screen.getByRole("checkbox", { name: /Formaggio Extra/ });
    await user.click(extraCheese);
    await user.click(extraCheese);
    expect(screen.getAllByText(/10,50\s*€/)[0]).toBeInTheDocument();
  });

  it("increments quantity", async () => {
    const user = userEvent.setup();
    renderWithCart(<ProductDetails product={pizza} />);
    await user.click(screen.getByRole("button", { name: "Aumenta quantità" }));
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("decrements quantity", async () => {
    const user = userEvent.setup();
    renderWithCart(<ProductDetails product={pizza} />);
    await user.click(screen.getByRole("button", { name: "Aumenta quantità" }));
    await user.click(screen.getByRole("button", { name: "Diminuisci quantità" }));
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("prevents quantity below minimum", async () => {
    const user = userEvent.setup();
    renderWithCart(<ProductDetails product={pizza} />);
    await user.click(screen.getByRole("button", { name: "Diminuisci quantità" }));
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("disables decrease button at minimum quantity", () => {
    renderWithCart(<ProductDetails product={pizza} />);
    expect(screen.getByRole("button", { name: "Diminuisci quantità" })).toBeDisabled();
  });

  it("renders add to cart button", () => {
    renderWithCart(<ProductDetails product={pizza} />);
    expect(
      screen.getByRole("button", { name: /Aggiungi al Carrello/i }),
    ).toBeInTheDocument();
  });

  it("shows added confirmation on add to cart", async () => {
    const user = userEvent.setup();
    renderWithCart(<ProductDetails product={pizza} />);
    await user.click(screen.getByRole("button", { name: /Aggiungi al Carrello/i }));
    expect(screen.getByText(/Aggiunto al Carrello/i)).toBeInTheDocument();
  });
});
