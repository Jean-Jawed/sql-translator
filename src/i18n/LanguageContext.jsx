import { createContext, useContext, useState, useCallback } from 'react'
import { translations } from './translations'

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    // Default to browser language or English
    const browserLang = navigator.language?.split('-')[0]
    return browserLang === 'fr' ? 'fr' : 'en'
  })

  const t = useCallback((key) => {
    return translations[language]?.[key] ?? translations['en']?.[key] ?? key
  }, [language])

  const toggleLanguage = useCallback(() => {
    setLanguage(prev => prev === 'en' ? 'fr' : 'en')
  }, [])

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
