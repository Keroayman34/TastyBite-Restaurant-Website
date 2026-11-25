import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { GalleryGrid } from "@/components/pages/GalleryGrid";
import { galleryImages } from "@/data/gallery";
import { getLocalizedText } from "@/domain/entities";

describe("GalleryGrid", () => {
  it("renders all gallery images by default", () => {
    render(<GalleryGrid />);
    galleryImages.forEach((image) => {
      expect(screen.getByAltText(getLocalizedText(image.alt, "it"))).toBeInTheDocument();
    });
  });

  it("renders category filter buttons", () => {
    render(<GalleryGrid />);
    expect(screen.getByRole("button", { name: "Tutti" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Pizza" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Burger" })).toBeInTheDocument();
  });

  it("filters images when category is selected", async () => {
    const user = userEvent.setup();
    render(<GalleryGrid />);
    await user.click(screen.getByRole("button", { name: "Pizza" }));
    const pizzaImages = galleryImages.filter((img) => img.category === "pizza");
    pizzaImages.forEach((img) => {
      expect(screen.getByAltText(getLocalizedText(img.alt, "it"))).toBeInTheDocument();
    });
  });

  it("shows empty state when no images match filter", async () => {
    const user = userEvent.setup();
    render(<GalleryGrid />);
    await user.click(screen.getByRole("button", { name: "Clienti" }));
    expect(screen.getByText(/Nessuna immagine trovata/i)).toBeInTheDocument();
  });

  it("sets aria-pressed on active filter", async () => {
    const user = userEvent.setup();
    render(<GalleryGrid />);
    const pizzaButton = screen.getByRole("button", { name: "Pizza" });
    await user.click(pizzaButton);
    expect(pizzaButton).toHaveAttribute("aria-pressed", "true");
  });
});
