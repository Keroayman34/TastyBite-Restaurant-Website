import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Container className="flex flex-col items-center gap-4 py-24 text-center">
      <p className="text-6xl font-bold text-brand-500">404</p>
      <h1 className="text-2xl font-bold text-charcoal-900">Page not found</h1>
      <p className="text-charcoal-500">The page you are looking for does not exist.</p>
      <Button href="/">Back to home</Button>
    </Container>
  );
}
