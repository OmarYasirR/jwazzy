import { useLanguage } from '../contexts/LanguageContext'

export const useAppLanguage = () => {
  const { language, toggleLanguage, isRTL } = useLanguage()
  
  return {
    language,
    toggleLanguage,
    isRTL,
    direction: isRTL ? 'rtl' : 'ltr'
  }
}