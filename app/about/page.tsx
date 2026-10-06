import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Leaf, ChefHat, Clock, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about TastyBite's story, our passion for food, and why customers love us.",
};

const stats = [
  { value: "10+", label: "Years of Experience" },
  { value: "50+", label: "Delicious Dishes" },
  { value: "10K+", label: "Happy Customers" },
];

const features = [
  {
    icon: Leaf,
    title: "Fresh Ingredients",
    description: "We source the freshest ingredients daily for every meal.",
  },
  {
    icon: ChefHat,
    title: "Professional Chefs",
    description: "Our experienced chefs craft every dish with expertise.",
  },
  {
    icon: Clock,
    title: "Fast Preparation",
    description: "Quick service without compromising on quality.",
  },
  {
    icon: Heart,
    title: "Made With Love",
    description: "Every order is prepared with care and attention to detail.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="section-spacing bg-surface-muted">
        <Container className="flex flex-col gap-12">
          <SectionHeading
            eyebrow="About Us"
            title="Our Story"
            description="From a small family kitchen to your favorite restaurant — discover the passion behind every bite."
          />

          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
            <div className="flex flex-col gap-4">
              <h3 className="text-h3 text-foreground">A Decade of Delicious Memories</h3>
              <p className="text-body text-foreground-muted">
                TastyBite started with a simple belief: everyone deserves delicious,
                freshly prepared food made with love. What began as a small family kitchen
                has grown into a beloved restaurant serving thousands of happy customers
                every week.
              </p>
              <p className="text-body text-foreground-muted">
                We take pride in using only the finest ingredients, time-tested recipes,
                and the dedication of our talented chefs. Every dish that leaves our
                kitchen carries our commitment to quality and your satisfaction.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button href="/menu">View Menu</Button>
                <Button href="/contact" variant="outline">
                  Contact Us
                </Button>
              </div>
            </div>

            <Card padding="lg" className="flex items-center justify-center bg-primary-50">
              <div className="flex flex-col items-center gap-4 py-12 text-center">
                <span className="flex h-20 w-20 items-center justify-center rounded-full bg-primary-500 text-white">
                  <Heart className="h-10 w-10" />
                </span>
                <p className="max-w-xs text-body-lg text-foreground-muted">
                  &ldquo;Bite into happiness — one meal at a time.&rdquo;
                </p>
              </div>
            </Card>
          </div>
        </Container>
      </section>

      <section className="section-spacing bg-surface">
        <Container className="flex flex-col gap-10">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {stats.map((stat) => (
              <Card key={stat.label} padding="lg" className="text-center">
                <p className="text-h2 font-bold text-primary-600">{stat.value}</p>
                <p className="text-body-sm text-foreground-muted">{stat.label}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-spacing bg-surface-muted">
        <Container className="flex flex-col gap-10">
          <SectionHeading
            eyebrow="Why Choose Us"
            title="The TastyBite Difference"
            description="We go the extra mile to make every meal memorable."
          />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <Card
                key={feature.title}
                padding="lg"
                hoverable
                className="flex flex-col items-center gap-3 text-center"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-50 text-primary-500">
                  <feature.icon className="h-6 w-6" />
                </span>
                <h3 className="text-h4 text-foreground">{feature.title}</h3>
                <p className="text-body-sm text-foreground-muted">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
