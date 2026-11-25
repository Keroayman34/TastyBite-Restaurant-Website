"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { usePreferences } from "@/components/preferences/PreferencesContext";
import { offers } from "@/data/offers";

export function OffersView() {
  const { t, formatPrice, localize } = usePreferences();
  const featuredOffer = offers[0];
  const otherOffers = offers.slice(1);

  return (
    <>
      <section className="section-spacing bg-surface-muted">
        <Container className="flex flex-col gap-10">
          <SectionHeading
            eyebrow={t.offers.eyebrow}
            title={t.offers.title}
            description={t.offers.description}
          />

          <Card padding="none" className="overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative aspect-[4/3] bg-charcoal-50 lg:aspect-auto">
                <ImageWithFallback
                  src={featuredOffer.image}
                  alt={localize(featuredOffer.title)}
                  unoptimized
                  fill
                  className="object-cover"
                  fallbackClassName="h-full w-full"
                />
                <Badge variant="brand" className="absolute left-4 top-4">
                  {t.offers.featuredBadge}
                </Badge>
              </div>
              <div className="flex flex-col justify-center gap-4 p-6 lg:p-10">
                <h3 className="text-h2 text-foreground">
                  {localize(featuredOffer.title)}
                </h3>
                <p className="text-body text-foreground-muted">
                  {localize(featuredOffer.description)}
                </p>
                <ul className="flex flex-col gap-1">
                  {featuredOffer.items.map((item, idx) => (
                    <li key={idx} className="text-body-sm text-foreground-muted">
                      • {localize(item)}
                    </li>
                  ))}
                </ul>
                <div className="flex items-baseline gap-3">
                  <span className="text-h2 font-bold text-primary-600">
                    {formatPrice(featuredOffer.discountedPrice)}
                  </span>
                  <span className="text-body text-foreground-muted line-through">
                    {formatPrice(featuredOffer.originalPrice)}
                  </span>
                </div>
                <Button href="/menu" className="w-fit">
                  {t.offers.orderNow}
                </Button>
              </div>
            </div>
          </Card>
        </Container>
      </section>

      <section className="section-spacing bg-surface">
        <Container className="flex flex-col gap-10">
          <SectionHeading
            eyebrow={t.offers.moreEyebrow}
            title={t.offers.moreTitle}
            description={t.offers.moreDescription}
          />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {otherOffers.map((offer) => (
              <Card key={offer.id} padding="none" hoverable className="overflow-hidden">
                <div className="relative aspect-[4/3] bg-charcoal-50">
                  <ImageWithFallback
                    src={offer.image}
                    alt={localize(offer.title)}
                    unoptimized
                    fill
                    className="object-cover"
                    fallbackClassName="h-full w-full"
                  />
                </div>
                <div className="flex flex-col gap-3 p-5">
                  <h3 className="text-h4 text-foreground">{localize(offer.title)}</h3>
                  <p className="text-body-sm text-foreground-muted">
                    {localize(offer.description)}
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-body font-bold text-primary-600">
                      {formatPrice(offer.discountedPrice)}
                    </span>
                    <span className="text-caption text-foreground-muted line-through">
                      {formatPrice(offer.originalPrice)}
                    </span>
                  </div>
                  <Button href="/menu" variant="outline" size="sm" className="w-fit">
                    {t.offers.orderNow}
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
