import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LocationSelector } from "@/components/pages/LocationSelector";
import { locations } from "@/data/locations";

describe("LocationSelector", () => {
  it("renders all location tabs", () => {
    render(<LocationSelector />);
    locations.forEach((location) => {
      expect(screen.getByRole("tab", { name: location.name })).toBeInTheDocument();
    });
  });

  it("shows the first location by default", () => {
    render(<LocationSelector />);
    expect(screen.getByText(locations[0].address)).toBeInTheDocument();
  });

  it("switches location on tab click", async () => {
    const user = userEvent.setup();
    render(<LocationSelector />);
    await user.click(screen.getByRole("tab", { name: locations[1].name }));
    expect(screen.getByText(locations[1].address)).toBeInTheDocument();
    expect(screen.queryByText(locations[0].address)).not.toBeInTheDocument();
  });

  it("sets aria-selected on active tab", async () => {
    const user = userEvent.setup();
    render(<LocationSelector />);
    const secondTab = screen.getByRole("tab", { name: locations[1].name });
    await user.click(secondTab);
    expect(secondTab).toHaveAttribute("aria-selected", "true");
  });

  it("renders directions link for active location", () => {
    render(<LocationSelector />);
    const link = screen.getByRole("link", { name: /Get Directions/i });
    expect(link).toHaveAttribute("href", locations[0].mapUrl);
  });
});
