import type { ReactElement } from "react";
import { render, type RenderOptions } from "@testing-library/react";
import { CartProvider } from "@/components/cart/CartContext";

export function renderWithCart(ui: ReactElement, options?: RenderOptions) {
  return render(ui, {
    wrapper: ({ children }) => <CartProvider>{children}</CartProvider>,
    ...options,
  });
}
