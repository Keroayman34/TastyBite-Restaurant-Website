import type { CurrencyCode } from "@/domain/entities/i18n";

export const DEFAULT_CURRENCY: CurrencyCode = "EUR";

export const SUPPORTED_CURRENCIES: readonly CurrencyCode[] = ["EUR", "USD"] as const;

/**
 * European Central Bank (ECB) euro foreign exchange reference rate snapshot.
 * Source: https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/eurofxref-graph-usd.en.html
 * Snapshot Date: 2026-11-24
 */
export const EXCHANGE_RATE_EUR_TO_USD = 1.0963;
export const EXCHANGE_RATE_DATE = "2026-11-24";
export const EXCHANGE_RATE_SOURCE = "European Central Bank (ECB)";

export const CURRENCY_STORAGE_KEY = "tastybite_currency";

export function isCurrencyCode(value: unknown): value is CurrencyCode {
  return value === "EUR" || value === "USD";
}
