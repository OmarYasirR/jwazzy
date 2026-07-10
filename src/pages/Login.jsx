import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useLanguage } from '../contexts/LanguageContext'
import { useAuth } from '../contexts/AuthContext'
import { FiMail, FiLock, FiEye, FiEyeOff, FiLogIn, FiGlobe } from 'react-icons/fi'

const Login = () => {
  const { t } = useTranslation()
  const { isRTL, toggleLanguage } = useLanguage()
  const { login, loading, error, clearError, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [localError, setLocalError] = useState('')
  // const [error, setError] = useState('')

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from || '/'
      navigate(from, { replace: true })
    }
  }, [isAuthenticated, navigate, location, loading])

  useEffect(() => {
    clearError()
    setLocalError('')
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear errors when user starts typing
    if (error || localError) {
      clearError()
      setLocalError('')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('submitting')
    // Basic validation
    if (!formData.email || !formData.password) {
      setLocalError(isRTL ? 'يرجى ملء جميع الحقول' : 'Please fill in all fields')
      return
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setLocalError(isRTL ? 'البريد الإلكتروني غير صالح' : 'Invalid email address')
      return
    }

    const result = await login(formData.email, formData.password)
    console.log(error)
    
    if (result.success) {
      console.log('loging success');
      // Navigation will be handled by the useEffect above
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev)
  }

  const displayError = error || localError

  return (
    <div className={`min-h-screen py-12 ${isRTL ? 'font-arabic arabic-text' : 'font-english'}`}>
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        {/* Language Toggle Button */}
        <div className="flex justify-end mb-6">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-4 py-2 text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200"
          >
            <FiGlobe className="w-4 h-4" />
            {isRTL ? 'English' : 'العربية'}
          </button>
        </div>

        {/* Login Form */}
        <div className="bg-sky-50 dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="text-center mb-8">
            <div className="bg-primary-light dark:bg-primary-dark w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiLogIn className="text-white text-2xl" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
              {isRTL ? 'تسجيل الدخول' : 'Sign In'}
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              {isRTL 
                ? 'مرحباً بعودتك! يرجى تسجيل الدخول إلى حسابك.'
                : 'Welcome back! Please sign in to your account.'
              }
            </p>
          </div>

          {/* Error Display */}
          {displayError && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg overflow-hidden">
              <p className="text-red-700 dark:text-red-400 text-lg text-center">
                {displayError}
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
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-light transition-colors duration-200 ${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'}`}
                  placeholder={isRTL ? 'example@email.com' : 'you@example.com'}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {isRTL ? 'كلمة المرور' : 'Password'}
              </label>
              <div className="relative">
                <FiLock className={`absolute top-1/2 transform -translate-y-1/2 text-gray-400 ${isRTL ? 'right-3' : 'left-3'}`} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-light transition-colors duration-200 ${isRTL ? 'pr-20 pl-4' : 'pl-10 pr-20'}`}
                  placeholder={isRTL ? 'أدخل كلمة المرور' : 'Enter your password'}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className={`absolute top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 ${isRTL ? 'left-3' : 'right-3'}`}
                >
                  {showPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-primary-light bg-gray-100 border-gray-300 rounded focus:ring-primary-light dark:focus:ring-primary-light dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <span className="ml-2 rtl:mr-2 rtl:ml-0 text-sm text-gray-600 dark:text-gray-300">
                  {isRTL ? 'تذكرني' : 'Remember me'}
                </span>
              </label>

              <Link
                to="/forgot-password"
                className="text-sm text-primary-light dark:text-primary-dark hover:text-primary-dark dark:hover:text-primary-light transition-colors duration-200"
              >
                {isRTL ? 'نسيت كلمة المرور؟' : 'Forgot password?'}
              </Link>
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
                  {isRTL ? 'جاري تسجيل الدخول...' : 'Signing in...'}
                </>
              ) : (
                <>
                  <FiLogIn className="w-5 h-5" />
                  {isRTL ? 'تسجيل الدخول' : 'Sign In'}
                </>
              )}
            </button>

          </form>

          {/* Sign Up Link */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 dark:text-gray-300">
              {isRTL ? 'ليس لديك حساب؟' : "Don't have an account?"}{' '}
              <Link
                to="/register"
                className="text-primary-light dark:text-primary-dark hover:text-primary-dark dark:hover:text-primary-light font-semibold transition-colors duration-200"
              >
                {isRTL ? 'إنشاء حساب' : 'Sign up'}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login