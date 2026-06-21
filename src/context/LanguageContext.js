import React, { createContext, useContext, useState } from "react";
import translations from "./translations/home";

const LanguageContext = createContext();

export function LanguageProvider({ children, defaultLanguage = "en" }) {
  const [language, setLanguage] = useState(defaultLanguage);

  const value = {
    language,
    setLanguage,
    t: translations[language] || translations.en,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}

export default LanguageProvider;
