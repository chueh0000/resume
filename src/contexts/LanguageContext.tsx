import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'zh';

interface LanguageContextType {
  lang: Language;
  setLang: (language: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [lang, setLangState] = useState<Language>('en'); // Default to English

  useEffect(() => {
    // Read language from URL query parameter on initial load
    const params = new URLSearchParams(window.location.search);
    const langParam = params.get('lang');
    if (langParam === 'zh' || langParam === 'en') {
      setLangState(langParam);
    } else {
      // If no valid lang param, set a default and update URL
      params.set('lang', 'en');
      window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
    }
  }, []);

  const setLang = (language: Language) => {
    setLangState(language);
    // Update URL query parameter
    const params = new URLSearchParams(window.location.search);
    params.set('lang', language);
    window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};