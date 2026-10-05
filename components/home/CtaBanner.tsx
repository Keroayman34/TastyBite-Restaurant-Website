import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Phone } from "lucide-react";
import { restaurant } from "@/config/restaurant";

export function CtaBanner() {
  return (
    <section className="section-spacing bg-primary-500">
      <Container className="flex flex-col items-center gap-6 text-center">
        <h2 className="max-w-2xl text-h2 text-white">Craving Something Delicious?</h2>
        <p className="max-w-xl text-body-lg text-white/80">
          Order now and get your favorite meals delivered hot and fast to your doorstep.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            href={`tel:${restaurant.phone}`}
            variant="secondary"
            size="lg"
            className="bg-white text-primary-600 hover:bg-white/90"
          >
            <Phone className="h-5 w-5" />
            Call to Order
          </Button>
          <Button
            href="/menu"
            variant="outline"
            size="lg"
            className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
          >
            Browse Menu
          </Button>
        </div>
      </Container>
    </section>
  );
}
