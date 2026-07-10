import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useLanguage } from '../contexts/LanguageContext'
import { useAuth } from '../contexts/AuthContext'
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiUserPlus, FiPhone, FiGlobe, FiCreditCard } from 'react-icons/fi'

const Register = () => {
  const { t } = useTranslation()
  const { isRTL } = useLanguage()
  const { register, loading, error, clearError, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    dateOfBirth: '',
    nationality: '',
    passportNumber: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [localError, setLocalError] = useState('')
  const [step, setStep] = useState(1) // 1: Basic info, 2: Additional info

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated, navigate])

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

  const validateStep1 = () => {
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setLocalError(isRTL ? 'يرجى ملء جميع الحقول المطلوبة' : 'Please fill in all required fields')
      return false
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setLocalError(isRTL ? 'البريد الإلكتروني غير صالح' : 'Invalid email address')
      return false
    }

    if (formData.password.length < 6) {
      setLocalError(isRTL ? 'كلمة المرور يجب أن تكون 6 أحرف على الأقل' : 'Password must be at least 6 characters')
      return false
    }

    if (formData.password !== formData.confirmPassword) {
      setLocalError(isRTL ? 'كلمات المرور غير متطابقة' : 'Passwords do not match')
      return false
    }

    return true
  }

  const handleStep1 = (e) => {
    e.preventDefault()
    if (validateStep1()) {
      setStep(2)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateStep1()) {
      return
    }

    const result = await register(formData)
    
    if (result.success) {
      navigate('/')
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  const displayError = error || localError

  const { pathname } = useLocation();
  
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname, step]);

  return (
    <div className={`min-h-screen py-12 ${isRTL ? 'font-arabic arabic-text' : 'font-english'}`}>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
              {/* Step 1 */}
              <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                  step >= 1 
                    ? 'bg-primary-light border-primary-light text-white' 
                    : 'border-gray-300 dark:border-gray-600 text-gray-500'
                }`}>
                  1
                </div>
                <div className={`mx-2 text-sm ${
                  step >= 1 ? 'text-primary-light' : 'text-gray-500'
                }`}>
                  {isRTL ? 'المعلومات الأساسية' : 'Basic Info'}
                </div>
              </div>

              {/* Connector */}
              <div className={`w-12 h-1 mx-2 ${
                step >= 2 ? 'bg-primary-light' : 'bg-gray-300 dark:bg-gray-600'
              }`}></div>

              {/* Step 2 */}
              <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                  step >= 2 
                    ? 'bg-primary-light border-primary-light text-white' 
                    : 'border-gray-300 dark:border-gray-600 text-gray-500'
                }`}>
                  2
                </div>
                <div className={`mx-2 text-sm ${
                  step >= 2 ? 'text-primary-light' : 'text-gray-500'
                }`}>
                  {isRTL ? 'معلومات إضافية' : 'Additional Info'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Registration Form */}
        <div className="bg-sky-50 dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="text-center mb-8">
            <div className="bg-primary-light dark:bg-primary-dark w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiUserPlus className="text-white text-2xl" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
              {isRTL ? 'إنشاء حساب' : 'Create Account'}
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              {isRTL 
                ? 'انضم إلى جوزي للسياحة وابدأ رحلتك'
                : 'Join Jwazzy Travel and start your journey'
              }
            </p>
          </div>

          {/* Error Display */}
          {displayError && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-red-700 dark:text-red-400 text-lg text-center">
                {displayError}
              </p>
            </div>
          )}

          <form onSubmit={step === 1 ? handleStep1 : handleSubmit}>
            {step === 1 ? (
              <div className="space-y-6">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {isRTL ? 'الاسم الكامل' : 'Full Name'} *
                  </label>
                  <div className="relative">
                    <FiUser className={`absolute top-1/2 transform -translate-y-1/2 text-gray-400 ${isRTL ? 'right-3' : 'left-3'}`} />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className={`w-full py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-light transition-colors duration-200 ${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'}`}
                      placeholder={isRTL ? 'أدخل اسمك الكامل' : 'Enter your full name'}
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {isRTL ? 'البريد الإلكتروني' : 'Email Address'} *
                  </label>
                  <div className="relative">
                    <FiMail className={`absolute top-1/2 transform -translate-y-1/2 text-gray-400 ${isRTL ? 'right-3' : 'left-3'}`} />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className={`w-full py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-light transition-colors duration-200 ${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'}`}
                      placeholder={isRTL ? 'example@email.com' : 'you@example.com'}
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {isRTL ? 'كلمة المرور' : 'Password'} *
                  </label>
                  <div className="relative">
                    <FiLock className={`absolute top-1/2 transform -translate-y-1/2 text-gray-400 ${isRTL ? 'right-3' : 'left-3'}`} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
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
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    {isRTL ? 'يجب أن تكون كلمة المرور 6 أحرف على الأقل' : 'Password must be at least 6 characters'}
                  </p>
                </div>

                {/* Confirm Password Field */}
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {isRTL ? 'تأكيد كلمة المرور' : 'Confirm Password'} *
                  </label>
                  <div className="relative">
                    <FiLock className={`absolute top-1/2 transform -translate-y-1/2 text-gray-400 ${isRTL ? 'right-3' : 'left-3'}`} />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      className={`w-full py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-light transition-colors duration-200 ${isRTL ? 'pr-20 pl-4' : 'pl-10 pr-20'}`}
                      placeholder={isRTL ? 'أعد إدخال كلمة المرور' : 'Re-enter your password'}
                    />
                    <button
                      type="button"
                      onClick={toggleConfirmPasswordVisibility}
                      className={`absolute top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 ${isRTL ? 'left-3' : 'right-3'}`}
                    >
                      {showConfirmPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Next Button */}
                <button
                  type="submit"
                  className="w-full bg-primary-light dark:bg-primary-dark text-white py-3 px-4 rounded-lg hover:bg-primary-dark dark:hover:bg-primary-light transition-colors duration-300 flex items-center justify-center gap-2"
                >
                  {isRTL ? 'التالي' : 'Next'}
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Phone Field */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {isRTL ? 'رقم الهاتف' : 'Phone Number'}
                  </label>
                  <div className="relative">
                    <FiPhone className={`absolute top-1/2 transform -translate-y-1/2 text-gray-400 ${isRTL ? 'right-3' : 'left-3'}`} />
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-light transition-colors duration-200 ${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'}`}
                      placeholder={isRTL ? '+966 123 456 789' : '+1 234 567 890'}
                    />
                  </div>
                </div>

                {/* Date of Birth */}
                <div>
                  <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {isRTL ? 'تاريخ الميلاد' : 'Date of Birth'}
                  </label>
                  <input
                    type="date"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className="w-full py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-light transition-colors duration-200"
                  />
                </div>

                {/* Nationality */}
                <div>
                  <label htmlFor="nationality" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {isRTL ? 'الجنسية' : 'Nationality'}
                  </label>
                  <div className="relative">
                    <FiGlobe className={`absolute top-1/2 transform -translate-y-1/2 text-gray-400 ${isRTL ? 'right-3' : 'left-3'}`} />
                    <select
                      id="nationality"
                      name="nationality"
                      value={formData.nationality}
                      onChange={handleChange}
                      className={`w-full py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-light transition-colors duration-200 ${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'}`}
                    >
                      <option value="">{isRTL ? 'اختر الجنسية' : 'Select Nationality'}</option>
                      <option value="SA">{isRTL ? 'السعودية' : 'Saudi Arabia'}</option>
                      <option value="SD">{isRTL ? 'السودان' : 'Sudan'}</option>
                      <option value="AE">{isRTL ? 'الإمارات' : 'United Arab Emirates'}</option>
                      <option value="US">{isRTL ? 'الولايات المتحدة' : 'United States'}</option>
                      <option value="UK">{isRTL ? 'المملكة المتحدة' : 'United Kingdom'}</option>
                      <option value="CA">{isRTL ? 'كندا' : 'Canada'}</option>
                      <option value="FR">{isRTL ? 'فرنسا' : 'France'}</option>
                      <option value="DE">{isRTL ? 'ألمانيا' : 'Germany'}</option>
                      <option value="JP">{isRTL ? 'اليابان' : 'Japan'}</option>
                    </select>
                  </div>
                </div>

                {/* Passport Number */}
                <div>
                  <label htmlFor="passportNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {isRTL ? 'رقم الجواز' : 'Passport Number'}
                  </label>
                  <div className="relative">
                    <FiCreditCard className={`absolute top-1/2 transform -translate-y-1/2 text-gray-400 ${isRTL ? 'right-3' : 'left-3'}`} />
                    <input
                      type="text"
                      id="passportNumber"
                      name="passportNumber"
                      value={formData.passportNumber}
                      onChange={handleChange}
                      className={`w-full py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-light transition-colors duration-200 ${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'}`}
                      placeholder={isRTL ? 'رقم الجواز' : 'Passport number'}
                    />
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-3 px-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300"
                  >
                    {isRTL ? 'السابق' : 'Back'}
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-primary-light dark:bg-primary-dark text-white py-3 px-4 rounded-lg hover:bg-primary-dark dark:hover:bg-primary-light transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        {isRTL ? 'جاري إنشاء الحساب...' : 'Creating account...'}
                      </>
                    ) : (
                      <>
                        <FiUserPlus className="w-5 h-5" />
                        {isRTL ? 'إنشاء الحساب' : 'Create Account'}
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </form>

          {/* Sign In Link */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 dark:text-gray-300">
              {isRTL ? 'لديك حساب بالفعل؟' : 'Already have an account?'}{' '}
              <Link
                to="/login"
                className="text-primary-light dark:text-primary-dark hover:text-primary-dark dark:hover:text-primary-light font-semibold transition-colors duration-200"
              >
                {isRTL ? 'تسجيل الدخول' : 'Sign in'}
              </Link>
            </p>
          </div>

          {/* Terms and Conditions */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {isRTL 
                ? 'بالنقر على "إنشاء الحساب"، فإنك توافق على شروط الخدمة وسياسة الخصوصية الخاصة بنا.'
                : 'By clicking "Create Account", you agree to our Terms of Service and Privacy Policy.'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register