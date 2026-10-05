import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { IconButton } from "@/components/ui/IconButton";
import { Search, ShoppingCart, Heart, Star } from "lucide-react";

export const metadata: Metadata = {
  title: "Design System",
  description: "Internal design system preview for the TastyBite design foundation.",
  robots: { index: false },
};

function PreviewSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-6">
      <h2 className="text-h3 text-foreground">{title}</h2>
      <Card padding="lg">{children}</Card>
    </section>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-label text-foreground-subtle">{label}</span>
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  );
}

export default function DesignSystemPage() {
  return (
    <Container className="flex flex-col gap-16 py-16">
      <SectionHeading
        eyebrow="Internal"
        title="Design System"
        description="Reusable design tokens and UI primitives for the TastyBite platform."
      />

      <PreviewSection title="Colors">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
          {[
            { name: "Primary", className: "bg-primary-500" },
            { name: "Accent", className: "bg-accent-500" },
            { name: "Success", className: "bg-success-500" },
            { name: "Warning", className: "bg-warning-500" },
            { name: "Error", className: "bg-error-500" },
            { name: "Charcoal", className: "bg-charcoal-800" },
          ].map((color) => (
            <div key={color.name} className="flex flex-col gap-2">
              <span className={`h-12 rounded-image ${color.className}`} />
              <span className="text-caption text-foreground-muted">{color.name}</span>
            </div>
          ))}
        </div>
      </PreviewSection>

      <PreviewSection title="Typography">
        <div className="flex flex-col gap-4">
          <p className="text-display text-foreground">Display — Hero heading</p>
          <h1 className="text-h1 text-foreground">H1 — Page title</h1>
          <h2 className="text-h2 text-foreground">H2 — Section heading</h2>
          <h3 className="text-h3 text-foreground">H3 — Subsection heading</h3>
          <h4 className="text-h4 text-foreground">H4 — Card heading</h4>
          <p className="text-body-lg text-foreground">Body large — Emphasized paragraph text.</p>
          <p className="text-body text-foreground">Body — Default paragraph text for content.</p>
          <p className="text-body-sm text-foreground-muted">
            Body small — Supporting text and descriptions.
          </p>
          <p className="text-caption text-foreground-subtle">Caption — Metadata and timestamps.</p>
        </div>
      </PreviewSection>

      <PreviewSection title="Buttons">
        <div className="flex flex-col gap-6">
          <Row label="Variants">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
          </Row>
          <Row label="Sizes">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </Row>
          <Row label="States">
            <Button>Default</Button>
            <Button disabled>Disabled</Button>
            <Button href="/design-system">Link mode</Button>
            <Button fullWidth>Full width</Button>
          </Row>
        </div>
      </PreviewSection>

      <PreviewSection title="Inputs">
        <div className="flex max-w-md flex-col gap-6">
          <Input label="Default" placeholder="Enter your name" />
          <Input label="With helper text" helperText="We'll never share your email." />
          <Input label="Required" required placeholder="Enter your email" type="email" />
          <Input label="Error" error="This field is required." placeholder="Enter your phone" />
          <Input label="Disabled" disabled placeholder="Unavailable" />
        </div>
      </PreviewSection>

      <PreviewSection title="Cards">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Card padding="md">
            <p className="text-body-sm text-foreground-muted">Default padding</p>
          </Card>
          <Card padding="lg" hoverable>
            <p className="text-body-sm text-foreground-muted">Hoverable — shadow elevates</p>
          </Card>
          <Card padding="none">
            <div className="bg-charcoal-50 p-5">
              <p className="text-body-sm text-foreground-muted">No padding — custom content</p>
            </div>
          </Card>
        </div>
      </PreviewSection>

      <PreviewSection title="Badges">
        <Row label="Variants">
          <Badge>Default</Badge>
          <Badge variant="brand">Brand</Badge>
          <Badge variant="accent">Accent</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="error">Error</Badge>
          <Badge variant="outline">Outline</Badge>
        </Row>
      </PreviewSection>

      <PreviewSection title="Icon Buttons">
        <Row label="Variants">
          <IconButton label="Search">
            <Search className="h-5 w-5" />
          </IconButton>
          <IconButton label="Cart">
            <ShoppingCart className="h-5 w-5" />
          </IconButton>
          <IconButton label="Brand" variant="brand">
            <Heart className="h-5 w-5" />
          </IconButton>
          <IconButton label="Outline" variant="outline">
            <Star className="h-5 w-5" />
          </IconButton>
        </Row>
        <Row label="States">
          <IconButton label="Default">
            <Search className="h-5 w-5" />
          </IconButton>
          <IconButton label="Disabled" disabled>
            <Search className="h-5 w-5" />
          </IconButton>
        </Row>
      </PreviewSection>
    </Container>
  );
}
