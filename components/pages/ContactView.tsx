"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { SocialIcon } from "@/components/layout/SocialIcon";
import { restaurant } from "@/config/restaurant";
import { usePreferences } from "@/components/preferences/PreferencesContext";
import { Phone, Mail, MapPin, MessageCircle, Clock } from "lucide-react";

export function ContactView() {
  const { t, localize } = usePreferences();

  const contactMethods = [
    {
      icon: Phone,
      title: t.contact.phoneLabel,
      value: restaurant.phone,
      href: `tel:${restaurant.phone}`,
    },
    {
      icon: MessageCircle,
      title: t.contact.whatsappLabel,
      value: t.contact.whatsappValue,
      href: `https://wa.me/${restaurant.whatsapp.replace(/[^\d]/g, "")}`,
    },
    {
      icon: Mail,
      title: t.contact.emailLabel,
      value: restaurant.email,
      href: `mailto:${restaurant.email}`,
    },
    {
      icon: MapPin,
      title: t.contact.addressLabel,
      value: restaurant.address,
      href: restaurant.mapUrl,
    },
  ];

  return (
    <section className="section-spacing bg-surface-muted">
      <Container className="flex flex-col gap-10">
        <SectionHeading
          eyebrow={t.contact.eyebrow}
          title={t.contact.title}
          description={t.contact.description}
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {contactMethods.map((method) => (
            <Card key={method.title} padding="lg" hoverable>
              <a
                href={method.href}
                target={method.href.startsWith("http") ? "_blank" : undefined}
                rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="flex items-center gap-4"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-500">
                  <method.icon className="h-5 w-5" />
                </span>
                <div className="flex flex-col gap-0.5">
                  <span className="text-caption text-foreground-muted">
                    {method.title}
                  </span>
                  <span className="text-body font-medium text-foreground transition-colors hover:text-primary-600">
                    {method.value}
                  </span>
                </div>
              </a>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card padding="lg" className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-50 text-primary-500">
                <Clock className="h-5 w-5" />
              </span>
              <h3 className="text-h4 text-foreground">{t.contact.workingHoursTitle}</h3>
            </div>
            <div className="flex flex-col gap-2">
              {restaurant.workingHours.map((schedule, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-body-sm text-foreground-muted">
                    {localize(schedule.days)}
                  </span>
                  <span className="text-body-sm font-medium text-foreground">
                    {schedule.hours}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          <Card padding="lg" className="flex flex-col gap-4">
            <h3 className="text-h4 text-foreground">{t.contact.followUsTitle}</h3>
            <div className="flex items-center gap-3">
              {restaurant.socialLinks.map((link) =>
                link.active ? (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.platform}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-border-strong text-foreground-muted transition-colors hover:border-primary-500 hover:text-primary-500"
                  >
                    <SocialIcon platform={link.platform} />
                  </a>
                ) : (
                  <button
                    key={link.id}
                    type="button"
                    aria-label={t.footer.socialComingSoon.replace(
                      "{platform}",
                      link.platform,
                    )}
                    className="flex h-11 w-11 cursor-default items-center justify-center rounded-full border border-border-strong text-foreground-muted/50"
                  >
                    <SocialIcon platform={link.platform} />
                  </button>
                ),
              )}
            </div>
          </Card>
        </div>

        <Card
          padding="lg"
          className="flex flex-col items-center gap-3 bg-primary-50 text-center"
        >
          <h3 className="text-h3 text-foreground">{t.contact.visitTitle}</h3>
          <p className="max-w-md text-body-sm text-foreground-muted">
            {t.contact.visitDescription}
          </p>
          <Button href="/locations">{t.contact.viewLocations}</Button>
        </Card>
      </Container>
    </section>
  );
}
