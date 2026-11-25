import type { ReactElement } from "react";
import { render, type RenderOptions } from "@testing-library/react";
import { CartProvider } from "@/components/cart/CartContext";
import { PreferencesProvider } from "@/components/preferences/PreferencesContext";

export function renderWithCart(ui: ReactElement, options?: RenderOptions) {
  return render(ui, {
    wrapper: ({ children }) => (
      <PreferencesProvider>
        <CartProvider>{children}</CartProvider>
      </PreferencesProvider>
    ),
    ...options,
  });
}
