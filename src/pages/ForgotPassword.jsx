import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useLanguage } from '../contexts/LanguageContext'
import { useAuth } from '../contexts/AuthContext'
import { FiMail, FiArrowLeft, FiGlobe, FiSend } from 'react-icons/fi'

const ForgotPassword = () => {
  const { t } = useTranslation()
  const { isRTL, toggleLanguage } = useLanguage()
  const { resetPassword, loading, error, clearError } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [localError, setLocalError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    clearError()
    setLocalError('')
  }, [])

  const handleChange = (e) => {
    setEmail(e.target.value)
    
    // Clear errors when user starts typing
    if (error || localError) {
      clearError()
      setLocalError('')
    }
    if (success) {
      setSuccess('')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Basic validation
    if (!email) {
      setLocalError(isRTL ? 'يرجى إدخال البريد الإلكتروني' : 'Please enter your email address')
      return
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setLocalError(isRTL ? 'البريد الإلكتروني غير صالح' : 'Invalid email address')
      return
    }

    const result = await resetPassword(email)
    
    if (result.success) {
      setSuccess(result.message)
      setEmail('')
    } else {
      setLocalError(result.error)
    }
  }

  const displayError = error || localError

  return (
    <div className={`min-h-screen py-12 ${isRTL ? 'font-arabic arabic-text' : 'font-english'}`}>
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        {/* Language Toggle Button */}
        <div className="flex justify-between mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2 text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200"
          >
            <FiArrowLeft className="w-4 h-4" />
            {isRTL ? 'رجوع' : 'Back'}
          </button>
          
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-4 py-2 text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200"
          >
            <FiGlobe className="w-4 h-4" />
            {isRTL ? 'English' : 'العربية'}
          </button>
        </div>

        {/* Forgot Password Form */}
        <div className="bg-sky-50 dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="text-center mb-8">
            <div className="bg-primary-light dark:bg-primary-dark w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiSend className="text-white text-2xl" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
              {isRTL ? 'استعادة كلمة المرور' : 'Reset Password'}
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              {isRTL 
                ? 'أدخل بريدك الإلكتروني وسنرسل لك رابطاً لاستعادة كلمة المرور.'
                : 'Enter your email address and we\'ll send you a link to reset your password.'
              }
            </p>
          </div>

          {/* Error Display */}
          {displayError && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-red-700 dark:text-red-400 text-sm text-center">
                {displayError}
              </p>
            </div>
          )}

          {/* Success Display */}
          {success && (
            <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <p className="text-green-700 dark:text-green-400 text-sm text-center">
                {success}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {isRTL ? 'البريد الإلكتروني' : 'Email Address'}
              </label>
              <div className="relative">
                <FiMail className={`absolute top-1/2 transform -translate-y-1/2 text-gray-400 ${isRTL ? 'right-3' : 'left-3'}`} />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  required
                  className={`w-full py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-light transition-colors duration-200 ${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'}`}
                  placeholder={isRTL ? 'example@email.com' : 'you@example.com'}
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary-light dark:bg-primary-dark text-white py-3 px-4 rounded-lg hover:bg-primary-dark dark:hover:bg-primary-light transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  {isRTL ? 'جاري الإرسال...' : 'Sending...'}
                </>
              ) : (
                <>
                  <FiSend className="w-5 h-5" />
                  {isRTL ? 'إرسال رابط الاستعادة' : 'Send Reset Link'}
                </>
              )}
            </button>

          </form>

          {/* Back to Login Link */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 dark:text-gray-300">
              {isRTL ? 'تذكرت كلمة المرور؟' : 'Remembered your password?'}{' '}
              <Link
                to="/login"
                className="text-primary-light dark:text-primary-dark hover:text-primary-dark dark:hover:text-primary-light font-semibold transition-colors duration-200"
              >
                {isRTL ? 'العودة لتسجيل الدخول' : 'Back to sign in'}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword