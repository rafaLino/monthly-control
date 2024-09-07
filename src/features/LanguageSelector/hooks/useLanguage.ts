import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageOption } from '../types/languageOption';

export function useLanguage() {
  const { i18n } = useTranslation();
  const [value, setValue] = useState<LanguageOption>(() => {
    const storedLanguage = localStorage.getItem('i18nextLng');
    if (storedLanguage && (i18n.options.supportedLngs as string[])?.includes(storedLanguage)) {
      return storedLanguage as LanguageOption;
    }
    return i18n.language as LanguageOption;
  });

  const setLanguage = (lang: LanguageOption) => {
    if (lang) {
      setValue(lang);
      localStorage.setItem('i18nextLng', lang);
      i18n.changeLanguage(lang);
    }
  };

  return [value, setLanguage] as const;
}
