import { describe, it, expect } from "vitest";
import { getDictionary } from "@/lib/i18n";
import { it as itDict } from "@/lib/i18n/translations/it";
import { en as enDict } from "@/lib/i18n/translations/en";
import type { TranslationDictionary } from "@/lib/i18n/translations/types";

// ---------------------------------------------------------------------------
// Helper: recursively collect all leaf key-paths from a nested object
// ---------------------------------------------------------------------------
function collectKeyPaths(obj: Record<string, unknown>, prefix = ""): string[] {
  return Object.entries(obj).flatMap(([key, val]) => {
    const path = prefix ? `${prefix}.${key}` : key;
    if (val !== null && typeof val === "object" && !Array.isArray(val)) {
      return collectKeyPaths(val as Record<string, unknown>, path);
    }
    return [path];
  });
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------
describe("getDictionary()", () => {
  it('returns the Italian dictionary for "it"', () => {
    const dict = getDictionary("it");
    expect(dict).toBe(itDict);
  });

  it('returns the English dictionary for "en"', () => {
    const dict = getDictionary("en");
    expect(dict).toBe(enDict);
  });

  it("Italian dictionary satisfies TranslationDictionary type (non-empty top-level sections)", () => {
    const dict: TranslationDictionary = getDictionary("it");
    // Core sections must exist and be non-null objects
    const topLevelSections = [
      "nav",
      "hero",
      "home",
      "menu",
      "product",
      "cart",
      "checkout",
      "about",
      "contact",
      "offers",
      "gallery",
      "footer",
      "common",
      "whatsapp",
    ] as const;
    for (const section of topLevelSections) {
      expect(dict[section], `Section "${section}" must exist`).toBeDefined();
      expect(typeof dict[section]).toBe("object");
    }
  });

  it("English dictionary satisfies TranslationDictionary type (non-empty top-level sections)", () => {
    const dict: TranslationDictionary = getDictionary("en");
    const topLevelSections = [
      "nav",
      "hero",
      "home",
      "menu",
      "product",
      "cart",
      "checkout",
      "about",
      "contact",
      "offers",
      "gallery",
      "footer",
      "common",
      "whatsapp",
    ] as const;
    for (const section of topLevelSections) {
      expect(dict[section], `Section "${section}" must exist`).toBeDefined();
      expect(typeof dict[section]).toBe("object");
    }
  });

  it("Italian and English dictionaries have structurally identical key sets", () => {
    const itPaths = collectKeyPaths(itDict as unknown as Record<string, unknown>).sort();
    const enPaths = collectKeyPaths(enDict as unknown as Record<string, unknown>).sort();

    expect(itPaths).toEqual(enPaths);
  });

  it("Italian dictionary has no empty string values at any leaf", () => {
    const dict = itDict as unknown as Record<string, unknown>;
    const paths = collectKeyPaths(dict);
    const emptyPaths = paths.filter((p) => {
      // Navigate to the leaf value
      const parts = p.split(".");
      let node: unknown = dict;
      for (const part of parts) {
        node = (node as Record<string, unknown>)[part];
      }
      return node === "";
    });
    expect(
      emptyPaths,
      `Italian dictionary has empty string values at: ${emptyPaths.join(", ")}`,
    ).toHaveLength(0);
  });

  it("English dictionary has no empty string values at any leaf", () => {
    const dict = enDict as unknown as Record<string, unknown>;
    const paths = collectKeyPaths(dict);
    const emptyPaths = paths.filter((p) => {
      const parts = p.split(".");
      let node: unknown = dict;
      for (const part of parts) {
        node = (node as Record<string, unknown>)[part];
      }
      return node === "";
    });
    expect(
      emptyPaths,
      `English dictionary has empty string values at: ${emptyPaths.join(", ")}`,
    ).toHaveLength(0);
  });

  it("nav section contains expected route keys in both languages", () => {
    const expectedNavKeys = ["home", "menu", "about", "contact"] as const;
    const itNav = getDictionary("it").nav as Record<string, unknown>;
    const enNav = getDictionary("en").nav as Record<string, unknown>;

    for (const key of expectedNavKeys) {
      expect(itNav[key], `Italian nav.${key}`).toBeTruthy();
      expect(enNav[key], `English nav.${key}`).toBeTruthy();
    }
  });

  it("whatsapp section contains the required message keys in both languages", () => {
    const required = ["header", "customer", "order", "total"] as const;
    const itWa = getDictionary("it").whatsapp as Record<string, unknown>;
    const enWa = getDictionary("en").whatsapp as Record<string, unknown>;

    for (const key of required) {
      expect(itWa[key], `Italian whatsapp.${key}`).toBeTruthy();
      expect(enWa[key], `English whatsapp.${key}`).toBeTruthy();
    }
  });

  it("Italian translations are actually in Italian (spot-checks)", () => {
    const dict = getDictionary("it");
    // These are well-known Italian words that should NOT appear in English
    expect((dict.nav as Record<string, string>).home).toMatch(
      /^(Home|Inizio|Benvenuti)/i,
    );
    // Cart in Italian should be "Carrello" or similar
    const cartLabel = dict.cart.pageTitle;
    expect(cartLabel).toBe("Il Tuo Carrello");
  });

  it("English translations are actually in English (spot-checks)", () => {
    const dict = getDictionary("en");
    const cartLabel = dict.cart.pageTitle;
    expect(cartLabel).toBe("Your Cart");
    // The English checkout button should contain expected English text
    const checkoutBtn = dict.checkout.confirmWhatsApp;
    expect(checkoutBtn).toContain("WhatsApp");
  });
});
