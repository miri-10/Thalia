"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "ne";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const saved = localStorage.getItem("language") as Language;
    if (saved) {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
  };

  const t = (key: string): string => {
    return translations[language]?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}

// Translation dictionary
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.districts": "Districts",
    "nav.crops": "Crops",
    "nav.about": "About",
    "nav.login": "Login",
    "nav.signup": "Sign Up",
    "nav.dashboard": "Dashboard",
    
    // Hero Section
    "hero.title": "Smart Agriculture for Nepalese Farmers",
    "hero.subtitle": "Empowering farmers with real-time market prices, weather forecasts, and agricultural insights",
    "hero.cta": "Get Started",
    
    // Features
    "features.title": "Features",
    "features.market": "Market Prices",
    "features.market.desc": "Real-time crop prices across Nepal",
    "features.weather": "Weather Forecast",
    "features.weather.desc": "Accurate weather predictions for your district",
    "features.insights": "Agricultural Insights",
    "features.insights.desc": "Expert advice and crop recommendations",
    
    // Dashboard
    "dashboard.welcome": "Welcome",
    "dashboard.overview": "Overview",
    "dashboard.marketplace": "Marketplace",
    "dashboard.weather": "Weather",
    "dashboard.expenses": "Expenses",
    "dashboard.yields": "Yields",
    
    // Common
    "common.loading": "Loading...",
    "common.error": "Error",
    "common.save": "Save",
    "common.cancel": "Cancel",
    "common.submit": "Submit",
    "common.search": "Search",
  },
  ne: {
    // Navigation
    "nav.home": "गृहपृष्ठ",
    "nav.districts": "जिल्लाहरू",
    "nav.crops": "बालीहरू",
    "nav.about": "बारेमा",
    "nav.login": "लगइन",
    "nav.signup": "साइन अप",
    "nav.dashboard": "ड्यासबोर्ड",
    
    // Hero Section
    "hero.title": "नेपाली किसानहरूको लागि स्मार्ट कृषि",
    "hero.subtitle": "वास्तविक समय बजार मूल्य, मौसम पूर्वानुमान र कृषि जानकारीको साथ किसानहरूलाई सशक्त बनाउँदै",
    "hero.cta": "सुरु गर्नुहोस्",
    
    // Features
    "features.title": "सुविधाहरू",
    "features.market": "बजार मूल्य",
    "features.market.desc": "नेपालभरि वास्तविक समय बाली मूल्य",
    "features.weather": "मौसम पूर्वानुमान",
    "features.weather.desc": "तपाईंको जिल्लाको लागि सटीक मौसम भविष्यवाणी",
    "features.insights": "कृषि जानकारी",
    "features.insights.desc": "विशेषज्ञ सल्लाह र बाली सिफारिसहरू",
    
    // Dashboard
    "dashboard.welcome": "स्वागत छ",
    "dashboard.overview": "सारांश",
    "dashboard.marketplace": "बजार",
    "dashboard.weather": "मौसम",
    "dashboard.expenses": "खर्च",
    "dashboard.yields": "उत्पादन",
    
    // Common
    "common.loading": "लोड हुँदैछ...",
    "common.error": "त्रुटि",
    "common.save": "सुरक्षित गर्नुहोस्",
    "common.cancel": "रद्द गर्नुहोस्",
    "common.submit": "पेश गर्नुहोस्",
    "common.search": "खोज्नुहोस्",
  },
};
