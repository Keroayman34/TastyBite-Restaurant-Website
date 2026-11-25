import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LocationSelector } from "@/components/pages/LocationSelector";
import { locations } from "@/data/locations";
import { getLocalizedText } from "@/domain/entities";

describe("LocationSelector", () => {
  it("renders all location tabs", () => {
    render(<LocationSelector />);
    locations.forEach((location) => {
      expect(
        screen.getByRole("tab", { name: getLocalizedText(location.name, "it") }),
      ).toBeInTheDocument();
    });
  });

  it("shows the first location by default", () => {
    render(<LocationSelector />);
    expect(
      screen.getByText(getLocalizedText(locations[0].address, "it")),
    ).toBeInTheDocument();
  });

  it("switches location on tab click", async () => {
    const user = userEvent.setup();
    render(<LocationSelector />);
    await user.click(
      screen.getByRole("tab", { name: getLocalizedText(locations[1].name, "it") }),
    );
    expect(
      screen.getByText(getLocalizedText(locations[1].address, "it")),
    ).toBeInTheDocument();
    expect(
      screen.queryByText(getLocalizedText(locations[0].address, "it")),
    ).not.toBeInTheDocument();
  });

  it("sets aria-selected on active tab", async () => {
    const user = userEvent.setup();
    render(<LocationSelector />);
    const secondTab = screen.getByRole("tab", {
      name: getLocalizedText(locations[1].name, "it"),
    });
    await user.click(secondTab);
    expect(secondTab).toHaveAttribute("aria-selected", "true");
  });

  it("renders directions link for active location", () => {
    render(<LocationSelector />);
    const link = screen.getByRole("link", { name: /Indicazioni Stradali/i });
    expect(link).toHaveAttribute("href", locations[0].mapUrl);
  });
});
