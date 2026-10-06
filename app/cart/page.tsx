import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { CartPage } from "@/components/cart/CartPage";

export const metadata: Metadata = {
  title: "Cart",
  description: "Review your cart items, adjust quantities, and see your order total.",
};

export default function CartRoute() {
  return (
    <section className="section-spacing bg-surface-muted">
      <Container className="flex flex-col gap-8">
        <h1 className="text-h1 text-foreground">Your Cart</h1>
        <CartPage />
      </Container>
    </section>
  );
}
