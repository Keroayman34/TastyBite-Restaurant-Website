import type { LanguageCode } from "@/domain/entities/i18n";
import { it } from "./translations/it";
import { en } from "./translations/en";
import type { TranslationDictionary } from "./translations/types";

export {
  DEFAULT_LANGUAGE,
  SUPPORTED_LANGUAGES,
  LANGUAGE_STORAGE_KEY,
  isLanguageCode,
} from "./config";
export type { TranslationDictionary } from "./translations/types";

const dictionaries: Record<LanguageCode, TranslationDictionary> = {
  it,
  en,
};

export function getDictionary(language: LanguageCode): TranslationDictionary {
  return dictionaries[language] ?? dictionaries.it;
}
