import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Clock, Truck, BadgeCheck } from "lucide-react";

const benefits = [
  { icon: Clock, label: "Fast Delivery", description: "30 min or less" },
  { icon: BadgeCheck, label: "Fresh Ingredients", description: "Quality guaranteed" },
  { icon: Truck, label: "Free Delivery", description: "On orders over $25" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-charcoal-900">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url(/images/hero-pizza.jpg)" }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-charcoal-900 via-charcoal-900/80 to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-charcoal-900/60 via-transparent to-transparent"
        aria-hidden="true"
      />

      <Container className="relative flex min-h-[60vh] flex-col justify-center py-20 lg:min-h-[70vh]">
        <div className="flex max-w-xl flex-col items-start gap-6">
          <Badge variant="brand" className="bg-primary-500/10 text-primary-300">
            #1 Restaurant in Town
          </Badge>

          <h1 className="text-display text-white">
            Delicious Food,
            <span className="text-primary-400"> Delivered Fast</span>
          </h1>

          <p className="text-body-lg text-white/70">
            From juicy burgers to wood-fired pizzas, we prepare every meal with fresh
            ingredients and deliver it hot to your door.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href="/menu" size="lg">
              Order Now
            </Button>
            <Button
              href="/menu"
              variant="outline"
              size="lg"
              className="border-white/20 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 hover:text-white"
            >
              View Menu
            </Button>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {benefits.map((benefit) => (
              <div key={benefit.label} className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-500/10 text-primary-400">
                  <benefit.icon className="h-5 w-5" />
                </span>
                <div className="flex flex-col">
                  <span className="text-body-sm font-semibold text-white">
                    {benefit.label}
                  </span>
                  <span className="text-caption text-white/50">
                    {benefit.description}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
