export function formatPrice(amount: number, currency = "EUR", locale?: string): string {
  const resolvedLocale = locale ?? (currency === "USD" ? "en-US" : "en-IE");
  return new Intl.NumberFormat(resolvedLocale, {
    style: "currency",
    currency,
    currencyDisplay: "narrowSymbol",
  }).format(amount);
}
