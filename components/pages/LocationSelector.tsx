"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { MapPin, Phone, Clock, Navigation } from "lucide-react";
import { locations } from "@/data/locations";

export function LocationSelector() {
  const [activeId, setActiveId] = useState(locations[0]?.id ?? "");
  const activeLocation = locations.find((l) => l.id === activeId) ?? locations[0];

  if (!activeLocation) return null;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Select a location">
        {locations.map((location) => {
          const isActive = location.id === activeId;

          return (
            <button
              key={location.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveId(location.id)}
              className={cn(
                "rounded-button border px-4 py-2.5 text-body-sm font-medium transition-colors",
                isActive
                  ? "border-primary-500 bg-primary-500 text-white"
                  : "border-border-strong bg-surface text-foreground-muted hover:border-primary-300 hover:text-foreground",
              )}
            >
              {location.name}
            </button>
          );
        })}
      </div>

      <div className="flex flex-col gap-4 rounded-card border border-border bg-surface p-6 shadow-card">
        <h3 className="text-h4 text-foreground">{activeLocation.name}</h3>

        <div className="flex flex-col gap-3">
          <div className="flex items-start gap-3">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-foreground-muted" />
            <span className="text-body-sm text-foreground">{activeLocation.address}</span>
          </div>
          <a
            href={`tel:${activeLocation.phone}`}
            className="flex items-center gap-3 transition-colors hover:text-primary-600"
          >
            <Phone className="h-4 w-4 shrink-0 text-foreground-muted" />
            <span className="text-body-sm text-foreground">{activeLocation.phone}</span>
          </a>
          <div className="flex items-center gap-3">
            <Clock className="h-4 w-4 shrink-0 text-foreground-muted" />
            <span className="text-body-sm text-foreground">
              {activeLocation.workingHours}
            </span>
          </div>
        </div>

        <a
          href={activeLocation.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-10 w-fit items-center gap-2 rounded-button bg-primary-500 px-5 text-body-sm font-semibold text-white shadow-cta transition-colors hover:bg-primary-600"
        >
          <Navigation className="h-4 w-4" />
          Get Directions
        </a>
      </div>
    </div>
  );
}
