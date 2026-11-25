"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";
import {
  getLocalizedText,
  type CurrencyCode,
  type LanguageCode,
  type LocalizedField,
} from "@/domain/entities";
import {
  DEFAULT_LANGUAGE,
  LANGUAGE_STORAGE_KEY,
  isLanguageCode,
  getDictionary,
  type TranslationDictionary,
} from "@/lib/i18n";
import {
  DEFAULT_CURRENCY,
  CURRENCY_STORAGE_KEY,
  isCurrencyCode,
  formatMoney,
} from "@/lib/currency";
import { readStorage, writeStorage } from "@/services/storage/local-storage";

export interface PreferencesContextValue {
  language: LanguageCode;
  setLanguage: (language: LanguageCode) => void;
  currency: CurrencyCode;
  setCurrency: (currency: CurrencyCode) => void;
  t: TranslationDictionary;
  formatPrice: (amountEur: number) => string;
  localize: (field: LocalizedField) => string;
}

const defaultDictionary = getDictionary(DEFAULT_LANGUAGE);

const defaultContextValue: PreferencesContextValue = {
  language: DEFAULT_LANGUAGE,
  setLanguage: () => {},
  currency: DEFAULT_CURRENCY,
  setCurrency: () => {},
  t: defaultDictionary,
  formatPrice: (amountEur: number) =>
    formatMoney(amountEur, DEFAULT_CURRENCY, DEFAULT_LANGUAGE),
  localize: (field: LocalizedField) => getLocalizedText(field, DEFAULT_LANGUAGE),
};

const PreferencesContext = createContext<PreferencesContextValue>(defaultContextValue);

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>(DEFAULT_LANGUAGE);
  const [currency, setCurrencyState] = useState<CurrencyCode>(DEFAULT_CURRENCY);

  useEffect(() => {
    const storedLang = readStorage<string>(LANGUAGE_STORAGE_KEY);
    if (isLanguageCode(storedLang)) {
      setLanguageState(storedLang);
    }

    const storedCurrency = readStorage<string>(CURRENCY_STORAGE_KEY);
    if (isCurrencyCode(storedCurrency)) {
      setCurrencyState(storedCurrency);
    }
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = language;
    }
  }, [language]);

  const setLanguage = useCallback((nextLang: LanguageCode) => {
    setLanguageState(nextLang);
    writeStorage(LANGUAGE_STORAGE_KEY, nextLang);
  }, []);

  const setCurrency = useCallback((nextCurrency: CurrencyCode) => {
    setCurrencyState(nextCurrency);
    writeStorage(CURRENCY_STORAGE_KEY, nextCurrency);
  }, []);

  const value = useMemo<PreferencesContextValue>(() => {
    const t = getDictionary(language);
    return {
      language,
      setLanguage,
      currency,
      setCurrency,
      t,
      formatPrice: (amountEur: number) => formatMoney(amountEur, currency, language),
      localize: (field: LocalizedField) => getLocalizedText(field, language),
    };
  }, [language, setLanguage, currency, setCurrency]);

  return (
    <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>
  );
}

export function usePreferences(): PreferencesContextValue {
  return useContext(PreferencesContext);
}
