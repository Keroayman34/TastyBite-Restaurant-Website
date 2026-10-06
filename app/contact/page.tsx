import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { SocialIcon } from "@/components/layout/SocialIcon";
import { restaurant } from "@/config/restaurant";
import { Phone, Mail, MapPin, MessageCircle, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with TastyBite. Call, email, or visit us — we'd love to hear from you.",
};

const contactMethods = [
  {
    icon: Phone,
    title: "Phone",
    value: restaurant.phone,
    href: `tel:${restaurant.phone}`,
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    value: "Chat with us",
    href: `https://wa.me/${restaurant.whatsapp.replace(/[^\d]/g, "")}`,
  },
  {
    icon: Mail,
    title: "Email",
    value: restaurant.email,
    href: `mailto:${restaurant.email}`,
  },
  {
    icon: MapPin,
    title: "Address",
    value: restaurant.address,
    href: restaurant.mapUrl,
  },
];

export default function ContactPage() {
  return (
    <section className="section-spacing bg-surface-muted">
      <Container className="flex flex-col gap-10">
        <SectionHeading
          eyebrow="Get In Touch"
          title="Contact Us"
          description="Have a question or feedback? We'd love to hear from you. Reach out through any of the channels below."
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
              <h3 className="text-h4 text-foreground">Working Hours</h3>
            </div>
            <div className="flex flex-col gap-2">
              {restaurant.workingHours.map((schedule) => (
                <div key={schedule.days} className="flex items-center justify-between">
                  <span className="text-body-sm text-foreground-muted">
                    {schedule.days}
                  </span>
                  <span className="text-body-sm font-medium text-foreground">
                    {schedule.hours}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          <Card padding="lg" className="flex flex-col gap-4">
            <h3 className="text-h4 text-foreground">Follow Us</h3>
            <p className="text-body-sm text-foreground-muted">
              Stay connected for the latest updates, offers, and behind-the-scenes
              content.
            </p>
            <div className="flex items-center gap-3">
              {restaurant.socialLinks.map((link) => (
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
              ))}
            </div>
          </Card>
        </div>

        <Card
          padding="lg"
          className="flex flex-col items-center gap-3 bg-primary-50 text-center"
        >
          <h3 className="text-h3 text-foreground">Get Directions</h3>
          <p className="max-w-md text-body-sm text-foreground-muted">
            Visit us at {restaurant.address}
          </p>
          <a
            href={restaurant.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center justify-center rounded-button bg-primary-500 px-6 text-body font-semibold text-white shadow-cta transition-colors hover:bg-primary-600"
          >
            Open in Google Maps
          </a>
        </Card>
      </Container>
    </section>
  );
}
