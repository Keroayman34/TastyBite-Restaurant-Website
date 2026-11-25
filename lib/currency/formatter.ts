import type { CurrencyCode, LanguageCode } from "@/domain/entities/i18n";
import { EXCHANGE_RATE_EUR_TO_USD } from "./config";

/**
 * Converts a canonical EUR amount to the target currency.
 * Rounds to 2 decimal places to avoid floating-point drift.
 */
export function convertFromEur(amountEur: number, currency: CurrencyCode): number {
  if (currency === "EUR") {
    return Math.round(amountEur * 100) / 100;
  }
  return Math.round(amountEur * EXCHANGE_RATE_EUR_TO_USD * 100) / 100;
}

/**
 * Maps (language, currency) pair to an appropriate Intl locale.
 * - Italian + EUR -> it-IT (€12,50 / 12,50 €)
 * - English + EUR -> en-IE (€12.50)
 * - English + USD -> en-US ($13.70)
 * - Italian + USD -> it-IT (13,70 $)
 */
export function getNumberFormatLocale(
  language: LanguageCode,
  currency: CurrencyCode,
): string {
  if (language === "it") {
    return "it-IT";
  }
  return currency === "EUR" ? "en-IE" : "en-US";
}

/**
 * Formats a canonical EUR amount in the selected currency and language locale.
 * Never double-converts: always expects the canonical EUR value as input.
 */
export function formatMoney(
  amountEur: number,
  currency: CurrencyCode,
  language: LanguageCode,
): string {
  const converted = convertFromEur(amountEur, currency);
  const locale = getNumberFormatLocale(language, currency);

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    currencyDisplay: "narrowSymbol",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(converted);
}
