import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useLanguage } from '../contexts/LanguageContext'
import { FiFacebook, FiTwitter, FiInstagram, FiMail, FiPhone, FiMapPin } from 'react-icons/fi'

const Footer = () => {
  const { t } = useTranslation()
  const { isRTL } = useLanguage()

  return (
    <footer className={`bg-gray-800 text-white pt-12 pb-8 ${isRTL && 'font-arabic'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className={`flex items-center mb-4 ${isRTL&& 'flex-row-reverse justify-self-start'}`}>
              <div className="h-8 w-8 bg-gradient-to-r from-primary-light to-secondary-light rounded-full flex items-center justify-center mr-3">
                <span className="text-white font-bold text-sm">J</span>
              </div>
              <span className="text-xl font-bold">Jwazzy Travel</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              {isRTL 
                ? 'اكتشف العالم مع جوزي للسياحة. نقدم أفضل تجارب السفر والحزم السياحية المميزة حول العالم.'
                : 'Discover the world with Jwazzy Travel. We provide the best travel experiences and premium tour packages worldwide.'
              }
            </p>
            <div className="flex space-x-4 rtl:space-x-reverse">
              <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">
                <FiFacebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">
                <FiTwitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">
                <FiInstagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {isRTL ? 'روابط سريعة' : 'Quick Links'}
            </h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white transition-colors duration-300">{t('home')}</Link></li>
              <li><Link to="/destinations" className="text-gray-300 hover:text-white transition-colors duration-300">{t('destinations')}</Link></li>
              <li><Link to="/tours" className="text-gray-300 hover:text-white transition-colors duration-300">{t('tours')}</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors duration-300">{t('about')}</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {isRTL ? 'اتصل بنا' : 'Contact Us'}
            </h3>
            <div className="space-y-3">
              <div className="flex items-center text-gray-300">
                <FiPhone className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center text-gray-300">
                <FiMail className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
                <span>info@jwazzy.com</span>
              </div>
              <div className="flex items-center text-gray-300">
                <FiMapPin className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
                <span>{isRTL ? 'الخرطوم - السودان' : 'khartoum, Sudan'}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; 2024 Jwazzy Travel. {isRTL ? 'جميع الحقوق محفوظة' : 'All rights reserved.'}</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer