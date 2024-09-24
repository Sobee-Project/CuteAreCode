import {LANGUAGE_STORAGE_KEY} from '@/utils/constant';
import STORAGE from '@/utils/storage';
import i18next from 'i18next';
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import {NativeModules, Platform} from 'react-native';

export type Language = {flag: string; name: string; code: string};

type LanguageContextType = {
  selectedLanguage: string;
  changeLanguage: (language: string) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export const useLanguageContext = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error(
      'useLanguageContext must be used within a LanguageProvider',
    );
  }
  return context;
};

const deviceLanguage =
  Platform.OS === 'ios'
    ? NativeModules.SettingsManager.settings.AppleLocale ||
      NativeModules.SettingsManager.settings.AppleLanguages[0] //iOS 13
    : NativeModules.I18nManager.localeIdentifier;

const languageCode = deviceLanguage.split('_')[0];

export const LanguageProvider = ({children}: PropsWithChildren) => {
  const [selectedLanguage, setSelectedLanguage] = useState(
    languageCode || 'en',
  );

  useEffect(() => {
    const appHasLanguageDefined = STORAGE.contains(LANGUAGE_STORAGE_KEY);

    if (!appHasLanguageDefined) {
      STORAGE.set(LANGUAGE_STORAGE_KEY, languageCode);
      i18next.changeLanguage(languageCode);
    } else {
      const code = STORAGE.getString(LANGUAGE_STORAGE_KEY);
      setSelectedLanguage(code);
      i18next.changeLanguage(code);
    }
  }, []);

  const changeLanguage = useCallback(
    (language: string) => {
      if (selectedLanguage === language) {
        return;
      }
      setSelectedLanguage(language);
      STORAGE.set(LANGUAGE_STORAGE_KEY, language);
      i18next.changeLanguage(language);
    },
    [selectedLanguage],
  );

  const value: LanguageContextType = {
    selectedLanguage,
    changeLanguage,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
