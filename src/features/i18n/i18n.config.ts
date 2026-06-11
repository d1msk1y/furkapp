import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en.json';
import de from './locales/de.json';
import fr from './locales/fr.json';

export type SupportedLanguage = 'en' | 'de' | 'fr';

export const SUPPORTED_LANGUAGES: { code: SupportedLanguage; label: string; nativeLabel: string; flagCode: string }[] = [
  { code: 'en', label: 'English', nativeLabel: 'English', flagCode: 'gb' },
  { code: 'de', label: 'German', nativeLabel: 'Deutsch', flagCode: 'de' },
  { code: 'fr', label: 'French', nativeLabel: 'Français', flagCode: 'fr' },
];

export const LANG_STORAGE_KEY = 'fo_lang_preference';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      de: { translation: de },
      fr: { translation: fr },
    },
    fallbackLng: 'en',
    supportedLngs: ['en', 'de', 'fr'],
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: LANG_STORAGE_KEY,
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
