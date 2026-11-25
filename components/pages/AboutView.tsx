"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { usePreferences } from "@/components/preferences/PreferencesContext";
import { Leaf, ChefHat, Clock, Heart } from "lucide-react";

export function AboutView() {
  const { t } = usePreferences();

  const stats = [
    { value: "10+", label: t.about.statsYearsLabel },
    { value: "50+", label: t.about.statsDishesLabel },
    { value: "10K+", label: t.about.statsCustomersLabel },
  ];

  const features = [
    {
      icon: Leaf,
      title: t.about.featureFreshTitle,
      description: t.about.featureFreshDesc,
    },
    {
      icon: ChefHat,
      title: t.about.featureChefsTitle,
      description: t.about.featureChefsDesc,
    },
    {
      icon: Clock,
      title: t.about.featureFastTitle,
      description: t.about.featureFastDesc,
    },
    {
      icon: Heart,
      title: t.about.featureLoveTitle,
      description: t.about.featureLoveDesc,
    },
  ];

  return (
    <>
      <section className="section-spacing bg-surface-muted">
        <Container className="flex flex-col gap-12">
          <SectionHeading
            eyebrow={t.about.eyebrow}
            title={t.about.title}
            description={t.about.description}
          />

          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
            <div className="flex flex-col gap-4">
              <h3 className="text-h3 text-foreground">{t.about.storyHeading}</h3>
              <p className="text-body text-foreground-muted">{t.about.storyParagraph1}</p>
              <p className="text-body text-foreground-muted">{t.about.storyParagraph2}</p>
              <div className="flex flex-wrap gap-3">
                <Button href="/menu">{t.common.viewMenu}</Button>
                <Button href="/contact" variant="outline">
                  {t.about.contactUs}
                </Button>
              </div>
            </div>

            <Card padding="lg" className="flex items-center justify-center bg-primary-50">
              <div className="flex flex-col items-center gap-4 py-12 text-center">
                <span className="flex h-20 w-20 items-center justify-center rounded-full bg-primary-500 text-white">
                  <Heart className="h-10 w-10" />
                </span>
                <p className="max-w-xs text-body-lg text-foreground-muted">
                  {t.about.quote}
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
            eyebrow={t.about.whyEyebrow}
            title={t.about.whyTitle}
            description={t.about.whyDescription}
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
