import { describe, expect, it } from "vitest";
import {
  convertFromEur,
  formatMoney,
  getNumberFormatLocale,
  EXCHANGE_RATE_EUR_TO_USD,
} from "@/lib/currency";

describe("currency conversion and formatting", () => {
  it("keeps EUR amounts unchanged", () => {
    expect(convertFromEur(7.0, "EUR")).toBe(7.0);
    expect(convertFromEur(12.9, "EUR")).toBe(12.9);
  });

  it("converts EUR to USD using documented ECB exchange rate snapshot", () => {
    const expected = Math.round(10 * EXCHANGE_RATE_EUR_TO_USD * 100) / 100;
    expect(convertFromEur(10, "USD")).toBe(expected);
    expect(convertFromEur(7.0, "USD")).toBe(7.67);
  });

  it("selects correct Intl locales for language and currency pairs", () => {
    expect(getNumberFormatLocale("it", "EUR")).toBe("it-IT");
    expect(getNumberFormatLocale("it", "USD")).toBe("it-IT");
    expect(getNumberFormatLocale("en", "EUR")).toBe("en-IE");
    expect(getNumberFormatLocale("en", "USD")).toBe("en-US");
  });

  it("formats EUR in Italian and English locales", () => {
    const itEur = formatMoney(12.5, "EUR", "it");
    expect(itEur).toContain("12,50");
    expect(itEur).toContain("€");

    const enEur = formatMoney(12.5, "EUR", "en");
    expect(enEur).toContain("12.50");
    expect(enEur).toContain("€");
  });

  it("formats USD in English and Italian locales from canonical EUR", () => {
    const enUsd = formatMoney(10, "USD", "en");
    expect(enUsd).toContain("10.96");
    expect(enUsd).toContain("$");

    const itUsd = formatMoney(10, "USD", "it");
    expect(itUsd).toContain("10,96");
    expect(itUsd).toContain("$");
  });
});
