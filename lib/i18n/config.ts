import type { LanguageCode } from "@/domain/entities/i18n";

export const DEFAULT_LANGUAGE: LanguageCode = "it";

export const SUPPORTED_LANGUAGES: readonly LanguageCode[] = ["it", "en"] as const;

export const LANGUAGE_STORAGE_KEY = "tastybite_language";

export function isLanguageCode(value: unknown): value is LanguageCode {
  return value === "it" || value === "en";
}
