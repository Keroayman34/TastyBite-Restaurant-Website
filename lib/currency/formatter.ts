import type { CurrencyCode, LanguageCode } from "@/domain/entities/i18n";
import { EXCHANGE_RATE_EUR_TO_USD } from "./config";

/**
 * Converts a canonical EUR amount to the target currency.
 * Rounds to 2 decimal places to avoid floating-point drift.
 */
export function convertFromEur(amountEur: number, currency: CurrencyCode): number {
  const eurCents = Math.round(amountEur * 100);

  if (currency === "EUR") {
    return eurCents / 100;
  }

  // Integer arithmetic: convert EUR cents to USD cents using a scaled rate so
  // binary floating-point drift cannot change a half-cent rounding decision
  // (e.g. 10.00 EUR must round to 10.94 USD, not 10.93).
  const rateScaled = Math.round(EXCHANGE_RATE_EUR_TO_USD * 1_000_000);
  const usdCents = Math.round((eurCents * rateScaled) / 1_000_000);
  return usdCents / 100;
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
