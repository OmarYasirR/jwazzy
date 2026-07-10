import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useLanguage } from '../contexts/LanguageContext'
import { useTheme } from '../contexts/ThemeContext'
import { FiWifi, FiWifiOff, FiRefreshCw, FiHome, FiPhone, FiMail } from 'react-icons/fi'

const NetworkOffline = () => {
  const { t } = useTranslation()
  const { isRTL } = useLanguage()
  const { isDark } = useTheme()
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  const [isChecking, setIsChecking] = useState(false)

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  const handleRetry = () => {
    setIsChecking(true)
    // Simulate network check
    setTimeout(() => {
      setIsOnline(navigator.onLine)
      setIsChecking(false)
    }, 2000)
  }

  const handleRefresh = () => {
    window.location.reload()
  }

  // If we're back online, show a success message briefly
  if (isOnline) {
    return (
      <div className={`min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 ${isRTL ? 'font-arabic arabic-text' : 'font-english'}`}>
        <div className="text-center max-w-md mx-4">
          <div className="bg-green-100 dark:bg-green-900 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiWifi className="text-green-600 dark:text-green-400 text-3xl" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-4">
            {isRTL ? 'تم استعادة الاتصال!' : 'Connection Restored!'}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {isRTL 
              ? 'تم استعادة الاتصال بالإنترنت بنجاح. جاري إعادة التوجيه...'
              : 'Your internet connection has been restored. Redirecting...'
            }
          </p>
          <button
            onClick={handleRefresh}
            className="bg-primary-light dark:bg-primary-dark text-white px-6 py-3 rounded-lg hover:bg-primary-dark dark:hover:bg-primary-light transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 mx-auto"
          >
            <FiRefreshCw className="w-5 h-5" />
            {isRTL ? 'المتابعة' : 'Continue'}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 ${isRTL ? 'font-arabic arabic-text' : 'font-english'}`}>
      <div className="max-w-2xl w-full mx-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="h-12 w-12 bg-gradient-to-r from-primary-light to-secondary-light rounded-full flex items-center justify-center mr-3">
              <span className="text-white font-bold text-lg">J</span>
            </div>
            <span className="text-2xl font-bold text-gray-800 dark:text-white">
              Jwazzy
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
            {isRTL ? 'الاتصال غير متوفر' : 'No Internet Connection'}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-md mx-auto">
            {isRTL 
              ? 'عذراً، يبدو أنك غير متصل بالإنترنت. يرجى التحقق من اتصالك والمحاولة مرة أخرى.'
              : 'Sorry, it seems you\'re offline. Please check your connection and try again.'
            }
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 mb-8">
          <div className="text-center mb-8">
            <div className="bg-red-100 dark:bg-red-900 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiWifiOff className="text-red-500 dark:text-red-400 text-4xl" />
            </div>
            
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              {isRTL ? 'ما يمكنك فعله:' : 'What you can do:'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Troubleshooting Steps */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-blue-100 dark:bg-blue-900 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm">1</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-1">
                    {isRTL ? 'تحقق من اتصال Wi-Fi' : 'Check Wi-Fi Connection'}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {isRTL 
                      ? 'تأكد من أن جهازك متصل بشبكة Wi-Fi أو بيانات الجوال'
                      : 'Make sure your device is connected to Wi-Fi or mobile data'
                    }
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-blue-100 dark:bg-blue-900 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm">2</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-1">
                    {isRTL ? 'أعد تشغيل الموجه' : 'Restart Your Router'}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {isRTL 
                      ? 'أوقف تشغيل الموجه ثم أعد تشغيله بعد 30 ثانية'
                      : 'Turn off your router and turn it back on after 30 seconds'
                    }
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-blue-100 dark:bg-blue-900 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm">3</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-1">
                    {isRTL ? 'تحقق من إعدادات الشبكة' : 'Check Network Settings'}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {isRTL 
                      ? 'تأكد من أن وضع الطائرة معطل وإعدادات الشبكة صحيحة'
                      : 'Ensure airplane mode is off and network settings are correct'
                    }
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-sky-50 dark:bg-gray-700 rounded-xl p-6">
              <h3 className="font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                <FiPhone className="w-5 h-5 text-primary-light" />
                {isRTL ? 'الدعم الفني' : 'Technical Support'}
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <FiPhone className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    +1 (555) 123-4567
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <FiMail className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    support@jwazzy.com
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <FiHome className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {isRTL ? 'متاح 24/7' : 'Available 24/7'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleRetry}
              disabled={isChecking}
              className="flex-1 bg-primary-light dark:bg-primary-dark text-white py-4 px-6 rounded-xl hover:bg-primary-dark dark:hover:bg-primary-light transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
            >
              {isChecking ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  {isRTL ? 'جاري التحقق...' : 'Checking...'}
                </>
              ) : (
                <>
                  <FiRefreshCw className="w-5 h-5" />
                  {isRTL ? 'إعادة المحاولة' : 'Retry Connection'}
                </>
              )}
            </button>

            <button
              onClick={() => window.history.back()}
              className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 py-4 px-6 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3"
            >
              <FiHome className="w-5 h-5" />
              {isRTL ? 'العودة للخلف' : 'Go Back'}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            {isRTL 
              ? 'جوازي - اكتشف العالم بكل سهولة'
              : 'Jwazzy - Discover the World with Ease'
            }
          </p>
        </div>
      </div>
    </div>
  )
}

export default NetworkOffline