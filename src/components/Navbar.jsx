import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useLanguage } from '../contexts/LanguageContext'
import { useTheme } from '../contexts/ThemeContext'
import { useAuth } from '../contexts/AuthContext'
import { FiGlobe, FiMoon, FiSun, FiMenu, FiX, FiUser, FiLogOut, FiSettings } from 'react-icons/fi'

const Navbar = () => {
  const { t } = useTranslation()
  const { language, toggleLanguage, isRTL } = useLanguage()
  const { isDark, toggleTheme } = useTheme()
  const { user, logout, isAuthenticated } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const navItems = [
    { path: '/', label: t('home') },
    { path: '/destinations', label: t('destinations') },
    { path: '/tours', label: t('tours') },
    { path: '/about', label: t('about') },
    { path: '/contact', label: t('contact') },
  ]

  const isActiveLink = (path) => {
    if (path === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(path)
  }

  const closeMobileMenu = () => {
    setIsMenuOpen(false)
  }

  const handleUserMenuToggle = () => {
    setIsUserMenuOpen(!isUserMenuOpen)
  }

  const handleLogout = () => {
    logout()
    setIsUserMenuOpen(false)
    navigate('/')
  }

  const handleProfileClick = () => {
    setIsUserMenuOpen(false)
    navigate('/profile')
  }

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user?.name) return 'U'
    return user.name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  // Get user display name
  const getUserDisplayName = () => {
    if (!user?.name) return t('user')
    return user.name.split(' ')[0] // First name only
  }

  return (
    <nav className="bg-gray-50 dark:bg-gray-700 shadow-lg transition-colors duration-300 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className={`flex-shrink-0 flex items-center ${isRTL && 'flex-row-reverse'}`}>
              <div className={`h-10 w-10 bg-gradient-to-r from-primary-light to-secondary-light rounded-full flex items-center justify-center`}>
                <span className="text-white font-bold text-lg font-heading">J</span>
              </div>
              <span className={`ml-3 text-xl font-bold text-gray-800 dark:text-white font-heading ${isRTL ? 'text-arabic' : 'text-english'}`}>
                Jwazzy
              </span>
            </Link>
          </div>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-md text-md font-bold transition-colors duration-300 ${
                  isActiveLink(item.path)
                    ? 'text-primary-light dark:text-primary-dark bg-primary-light/10 dark:bg-primary-dark/10'
                    : 'text-gray-700 dark:text-gray-300 hover:text-primary-light dark:hover:text-primary-dark hover:bg-gray-100 dark:hover:bg-gray-700'
                } ${isRTL ? 'font-arabic' : 'font-english'}`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="p-2 text-gray-700 dark:text-gray-300 hover:text-primary-light dark:hover:text-primary-dark rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
              aria-label={isRTL ? 'Switch to English' : 'التغيير إلى العربية'}
            >
              <FiGlobe className="w-7 h-7" />
              <span className="sr-only">{language === 'en' ? 'AR' : 'EN'}</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-700 dark:text-gray-300 hover:text-primary-light dark:hover:text-primary-dark rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
              aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
            >
              {isDark ? <FiSun className="w-7 h-7" /> : <FiMoon className="w-7 h-7" />}
            </button>

            {/* User Menu - Only show when authenticated */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={handleUserMenuToggle}
                  className="flex items-center space-x-2 rtl:space-x-reverse p-2 text-gray-700 dark:text-gray-300 hover:text-primary-light dark:hover:text-primary-dark rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
                  aria-label="User menu"
                >
                  {/* User Avatar */}
                  <div className="w-8 h-8 bg-gradient-to-r from-primary-light to-secondary-light rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {getUserInitials()}
                  </div>
                  <span className="hidden lg:block text-sm font-medium">
                    {getUserDisplayName()}
                  </span>
                </button>

                {/* User Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className={`absolute mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none ${
                    isRTL ? 'left-0' : 'right-0'
                  }`}>
                    <div className="py-1" role="menu" aria-orientation="vertical">
                      {/* User Info */}
                      <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {user?.name}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                          {user?.email}
                        </p>
                      </div>

                      {/* Profile Link */}
                      <button
                        onClick={handleProfileClick}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                        role="menuitem"
                      >
                        <FiUser className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                        {isRTL ? 'الملف الشخصي' : 'Profile'}
                      </button>
                      {/* Logout Button */}
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200"
                        role="menuitem"
                      >
                        <FiLogOut className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                        {isRTL ? 'تسجيل الخروج' : 'Logout'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Auth Links - Show when not authenticated */
              <div className="hidden md:flex items-center space-x-3 rtl:space-x-reverse">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary-light dark:hover:text-primary-dark transition-colors duration-300"
                >
                  {isRTL ? 'تسجيل الدخول' : 'Sign In'}
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm font-medium text-white bg-primary-light dark:bg-primary-dark rounded-lg hover:bg-primary-dark dark:hover:bg-primary-light transition-colors duration-300"
                >
                  {isRTL ? 'إنشاء حساب' : 'Sign Up'}
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-700 dark:text-gray-300 hover:text-primary-light dark:hover:text-primary-dark rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-gray-800 rounded-lg mt-2 shadow-lg">
              {/* Navigation Links */}
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 ${
                    isActiveLink(item.path)
                      ? 'text-primary-light dark:text-primary-dark bg-primary-light/10 dark:bg-primary-dark/10'
                      : 'text-gray-700 dark:text-gray-300 hover:text-primary-light dark:hover:text-primary-dark hover:bg-gray-100 dark:hover:bg-gray-700'
                  } ${isRTL ? 'font-arabic text-right' : 'font-english text-left'}`}
                  onClick={closeMobileMenu}
                >
                  {item.label}
                </Link>
              ))}

              {/* Auth Links for Mobile */}
              {!isAuthenticated ? (
                <>
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-2">
                    <Link
                      to="/login"
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary-light dark:hover:text-primary-dark hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
                      onClick={closeMobileMenu}
                    >
                      {isRTL ? 'تسجيل الدخول' : 'Sign In'}
                    </Link>
                    <Link
                      to="/register"
                      className="block px-3 py-2 rounded-md text-base font-medium text-white bg-primary-light dark:bg-primary-dark hover:bg-primary-dark dark:hover:bg-primary-light transition-colors duration-300 mt-1"
                      onClick={closeMobileMenu}
                    >
                      {isRTL ? 'إنشاء حساب' : 'Sign Up'}
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-2">
                    {/* User Info in Mobile Menu */}
                    <div className="px-3 py-2">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {user?.name}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {user?.email}
                      </p>
                    </div>
                    
                    <Link
                      to="/profile"
                      className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary-light dark:hover:text-primary-dark hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
                      onClick={closeMobileMenu}
                    >
                      <FiUser className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                      {isRTL ? 'الملف الشخصي' : 'Profile'}
                    </Link>
                    
                    
                    <button
                      onClick={() => {
                        handleLogout()
                        closeMobileMenu()
                      }}
                      className="flex items-center w-full px-3 py-2 rounded-md text-base font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-300"
                    >
                      <FiLogOut className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                      {isRTL ? 'تسجيل الخروج' : 'Logout'}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar