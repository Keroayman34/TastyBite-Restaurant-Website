export type LanguageCode = "it" | "en";

export type CurrencyCode = "EUR" | "USD";

export interface LocalizedText {
  it: string;
  en: string;
}

export type LocalizedField = string | LocalizedText;

export function getLocalizedText(value: LocalizedField, language: LanguageCode): string {
  if (typeof value === "string") {
    return value;
  }
  return value[language] ?? value.it ?? value.en;
}
