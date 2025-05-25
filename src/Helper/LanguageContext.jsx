import { createContext, useState } from "react";
import { useCottage } from "../Query";

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [languageChange, setLanguageChange] = useState("uz");
  const allCottages = useCottage()?.data
  const cottages = allCottages?.filter((el) => el.cottageStatus === 'progress')
  
  const toggleLanguage = (value) => {
    setLanguageChange(value);
    localStorage.setItem("language", value);
  };

  return (
    <LanguageContext.Provider value={{ languageChange, toggleLanguage, cottages }}>
      {children}
    </LanguageContext.Provider>
  );
};
