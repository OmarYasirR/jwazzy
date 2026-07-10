import React, { createContext, useContext, useState, useEffect } from 'react'
import i18n from '../utils/i18n'

const LanguageContext = createContext()

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en')

  useEffect(() => {
    const savedLanguage = localStorage.getItem('jwazzy-language')
    if (savedLanguage) {
      setLanguage(savedLanguage)
      i18n.changeLanguage(savedLanguage)
      applyLanguageSettings(savedLanguage)
    }
  }, [])

  const applyLanguageSettings = (lang) => {
    const isRTL = lang === 'ar'
    
    // Update document direction and language
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr'
    document.documentElement.lang = lang
    
    // Update font family based on language
    if (isRTL) {
      document.body.classList.add('rtl-font')
      document.body.classList.remove('ltr-font')
    } else {
      document.body.classList.add('ltr-font')
      document.body.classList.remove('rtl-font')
    }
    
    // Add language-specific class to body
    document.body.classList.toggle('arabic-layout', isRTL)
    document.body.classList.toggle('english-layout', !isRTL)
  }

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'ar' : 'en'
    setLanguage(newLanguage)
    i18n.changeLanguage(newLanguage)
    localStorage.setItem('jwazzy-language', newLanguage)
    applyLanguageSettings(newLanguage)
  }

  const value = {
    language,
    toggleLanguage,
    isRTL: language === 'ar'
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}