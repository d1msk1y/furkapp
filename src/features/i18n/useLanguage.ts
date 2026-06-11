import { useTranslation } from 'react-i18next';
import { SupportedLanguage, LANG_STORAGE_KEY } from './i18n.config';

export function useLanguage() {
  const { t, i18n } = useTranslation();

  const language = i18n.language as SupportedLanguage;

  const setLanguage = (lang: SupportedLanguage) => {
    try {
      localStorage.setItem(LANG_STORAGE_KEY, lang);
    } catch (e) {
      console.warn('Storage access unavailable:', e);
    }
    i18n.changeLanguage(lang);
  };

  return { t, language, setLanguage };
}
