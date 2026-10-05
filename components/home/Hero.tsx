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
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 70% 40%, rgba(232, 68, 46, 0.3), transparent)",
        }}
        aria-hidden="true"
      />

      <Container className="relative grid grid-cols-1 items-center gap-12 py-16 sm:py-20 lg:grid-cols-2 lg:gap-16 lg:py-28">
        <div className="flex flex-col items-start gap-6">
          <Badge variant="brand" className="bg-primary-500/10 text-primary-300">
            #1 Restaurant in Town
          </Badge>

          <h1 className="text-display text-white">
            Delicious Food,
            <span className="text-primary-400"> Delivered Fast</span>
          </h1>

          <p className="max-w-lg text-body-lg text-white/70">
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
              className="border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white"
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

        <div className="relative mx-auto w-full max-w-md lg:max-w-lg">
          <div
            className="absolute inset-0 rounded-full bg-primary-500/20 blur-3xl"
            aria-hidden="true"
          />
          {/* eslint-disable-next-line @next/next/no-img-element -- SVG asset, no optimization needed */}
          <img
            src="/images/hero-food.svg"
            alt="A delicious burger with fries and a drink"
            className="relative w-full"
          />
        </div>
      </Container>
    </section>
  );
}
