import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { CheckoutPage } from "@/components/checkout/CheckoutPage";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Enter your information and confirm your order via WhatsApp.",
};

export default function CheckoutRoute() {
  return (
    <section className="section-spacing bg-surface-muted">
      <Container className="flex flex-col gap-8">
        <h1 className="text-h1 text-foreground">Checkout</h1>
        <CheckoutPage />
      </Container>
    </section>
  );
}
