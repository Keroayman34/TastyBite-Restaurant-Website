import { SearchX } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface EmptyMenuStateProps {
  onClear: () => void;
}

export function EmptyMenuState({ onClear }: EmptyMenuStateProps) {
  return (
    <div className="flex flex-col items-center gap-4 py-16 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-charcoal-100 text-charcoal-400">
        <SearchX className="h-8 w-8" />
      </span>
      <div className="flex flex-col gap-1">
        <h3 className="text-h4 text-foreground">No products found</h3>
        <p className="text-body-sm text-foreground-muted">
          Try adjusting your search or filters to find what you are looking for.
        </p>
      </div>
      <Button variant="outline" onClick={onClear}>
        Clear filters
      </Button>
    </div>
  );
}
