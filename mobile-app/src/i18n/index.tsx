import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { en, Translations } from './en';
import { pcm } from './pcm';
import { yo } from './yo';
import { ha } from './ha';
import { ig } from './ig';

export type LanguageCode = 'en' | 'pcm' | 'yo' | 'ha' | 'ig';

// Native names are shown as-is in every language.
export const languages: { code: LanguageCode; nativeName: string }[] = [
  { code: 'en', nativeName: 'English' },
  { code: 'pcm', nativeName: 'Nigerian Pidgin' },
  { code: 'yo', nativeName: 'Yorùbá' },
  { code: 'ha', nativeName: 'Hausa' },
  { code: 'ig', nativeName: 'Igbo' },
];

const dictionaries: Record<LanguageCode, Translations> = { en, pcm, yo, ha, ig };
const STORAGE_KEY = 'veryfy.language';

interface I18nContextValue {
  t: Translations;
  language: LanguageCode;
  setLanguage: (code: LanguageCode) => void;
}

const I18nContext = createContext<I18nContextValue>({
  t: en,
  language: 'en',
  setLanguage: () => {},
});

function isLanguageCode(value: unknown): value is LanguageCode {
  return languages.some((language) => language.code === value);
}

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageCode>('en');

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((saved) => {
        if (isLanguageCode(saved)) setLanguageState(saved);
      })
      .catch(() => {});
  }, []);

  const setLanguage = useCallback((code: LanguageCode) => {
    setLanguageState(code);
    AsyncStorage.setItem(STORAGE_KEY, code).catch(() => {});
  }, []);

  const value = useMemo(
    () => ({ t: dictionaries[language], language, setLanguage }),
    [language, setLanguage]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export function useI18n() {
  return useContext(I18nContext);
}
