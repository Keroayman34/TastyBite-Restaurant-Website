import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { formatPrice } from "@/lib/format";
import { restaurant } from "@/config/restaurant";
import { offers } from "@/data/offers";

export const metadata: Metadata = {
  title: "Special Offers",
  description: "Discover our amazing special offers and deals on your favorite meals.",
};

export default function OffersPage() {
  const featuredOffer = offers[0];
  const otherOffers = offers.slice(1);

  return (
    <>
      <section className="section-spacing bg-surface-muted">
        <Container className="flex flex-col gap-10">
          <SectionHeading
            eyebrow="Special Offers"
            title="Deals You Can't Resist"
            description="Save big on our carefully crafted combo meals and limited-time offers."
          />

          <Card padding="none" className="overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative aspect-[4/3] bg-charcoal-50 lg:aspect-auto">
                <ImageWithFallback
                  src={featuredOffer.image}
                  alt={featuredOffer.title}
                  unoptimized
                  fill
                  className="object-cover"
                  fallbackClassName="h-full w-full"
                />
                <Badge variant="brand" className="absolute left-4 top-4">
                  Featured
                </Badge>
              </div>
              <div className="flex flex-col justify-center gap-4 p-6 lg:p-10">
                <h3 className="text-h2 text-foreground">{featuredOffer.title}</h3>
                <p className="text-body text-foreground-muted">
                  {featuredOffer.description}
                </p>
                <ul className="flex flex-col gap-1">
                  {featuredOffer.items.map((item) => (
                    <li key={item} className="text-body-sm text-foreground-muted">
                      • {item}
                    </li>
                  ))}
                </ul>
                <div className="flex items-baseline gap-3">
                  <span className="text-h2 font-bold text-primary-600">
                    {formatPrice(featuredOffer.discountedPrice, restaurant.currency)}
                  </span>
                  <span className="text-body text-foreground-muted line-through">
                    {formatPrice(featuredOffer.originalPrice, restaurant.currency)}
                  </span>
                </div>
                <Button href="/menu" className="w-fit">
                  Order Now
                </Button>
              </div>
            </div>
          </Card>
        </Container>
      </section>

      <section className="section-spacing bg-surface">
        <Container className="flex flex-col gap-10">
          <SectionHeading
            eyebrow="More Offers"
            title="Explore All Deals"
            description="Find the perfect offer for every craving."
          />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {otherOffers.map((offer) => (
              <Card key={offer.id} padding="none" hoverable className="overflow-hidden">
                <div className="relative aspect-[4/3] bg-charcoal-50">
                  <ImageWithFallback
                    src={offer.image}
                    alt={offer.title}
                    unoptimized
                    fill
                    className="object-cover"
                    fallbackClassName="h-full w-full"
                  />
                </div>
                <div className="flex flex-col gap-3 p-5">
                  <h3 className="text-h4 text-foreground">{offer.title}</h3>
                  <p className="text-body-sm text-foreground-muted">
                    {offer.description}
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-body font-bold text-primary-600">
                      {formatPrice(offer.discountedPrice, restaurant.currency)}
                    </span>
                    <span className="text-caption text-foreground-muted line-through">
                      {formatPrice(offer.originalPrice, restaurant.currency)}
                    </span>
                  </div>
                  <Button href="/menu" variant="outline" size="sm" className="w-fit">
                    Order Now
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
