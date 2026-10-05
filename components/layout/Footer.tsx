import { restaurant } from "@/config/restaurant";
import { navLinks } from "@/config/navigation";
import { Container } from "@/components/ui/Container";
import { SocialIcon } from "@/components/layout/SocialIcon";
import { MapPin, Mail, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface-muted">
      <Container className="flex flex-col gap-10 py-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-500 font-display text-lg font-bold text-white">
                {restaurant.name.charAt(0)}
              </span>
              <span className="font-display text-xl font-bold text-foreground">
                {restaurant.name}
              </span>
            </div>
            <p className="text-body-sm text-foreground-muted">{restaurant.tagline}</p>
            <div className="flex items-center gap-2">
              {restaurant.socialLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.platform}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border-strong text-foreground-muted transition-colors hover:border-primary-500 hover:text-primary-500"
                >
                  <SocialIcon platform={link.platform} />
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-h4 text-foreground">Quick Links</h3>
            <nav className="flex flex-col gap-2" aria-label="Footer">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-body-sm text-foreground-muted transition-colors hover:text-primary-600"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-h4 text-foreground">Contact</h3>
            <div className="flex flex-col gap-3 text-body-sm text-foreground-muted">
              <a
                href={`mailto:${restaurant.email}`}
                className="flex items-center gap-2 transition-colors hover:text-primary-600"
              >
                <Mail className="h-4 w-4 shrink-0" />
                {restaurant.email}
              </a>
              <a
                href={`tel:${restaurant.phone}`}
                className="flex items-center gap-2 transition-colors hover:text-primary-600"
              >
                <Phone className="h-4 w-4 shrink-0" />
                {restaurant.phone}
              </a>
              <p className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                {restaurant.address}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-h4 text-foreground">Working Hours</h3>
            <div className="flex flex-col gap-2 text-body-sm text-foreground-muted">
              {restaurant.workingHours.map((schedule) => (
                <div key={schedule.days} className="flex flex-col">
                  <span className="font-medium text-foreground">{schedule.days}</span>
                  <span>{schedule.hours}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
          <p className="text-caption text-foreground-subtle">
            &copy; {new Date().getFullYear()} {restaurant.name}. All rights reserved.
          </p>
          <p className="text-caption text-foreground-subtle">
            {restaurant.tagline}
          </p>
        </div>
      </Container>
    </footer>
  );
}
