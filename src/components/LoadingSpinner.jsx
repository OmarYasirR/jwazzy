import React from 'react'
import { useLanguage } from '../contexts/LanguageContext'

const LoadingSpinner = ({ size = 'medium', text = '' }) => {
  const { isRTL } = useLanguage()

  const sizeClasses = {
    small: 'w-6 h-6',
    medium: 'w-12 h-12',
    large: 'w-16 h-16'
  }

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className={`${sizeClasses[size]} border-4 border-primary-light dark:border-primary-dark border-t-transparent rounded-full animate-spin`}></div>
      {text && (
        <p className={`mt-4 text-gray-600 dark:text-gray-300 ${isRTL ? 'font-arabic' : 'font-english'}`}>
          {text}
        </p>
      )}
    </div>
  )
}

export default LoadingSpinner