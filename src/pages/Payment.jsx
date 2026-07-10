import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useLanguage } from '../contexts/LanguageContext'
import { useBooking } from '../contexts/BookingContext'
import { useAuth } from '../contexts/AuthContext'
import { Elements } from '@stripe/react-stripe-js'
import { FiArrowLeft, FiUser, FiCalendar, FiUsers } from 'react-icons/fi'
import CheckoutForm from '../components/CheckoutForm'
import { stripePromise } from '../lib/stripe'

const Payment = () => {
  const { t } = useTranslation()
  const { isRTL } = useLanguage()
  const { bookingDetails } = useBooking()
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!bookingDetails.tour) {
      navigate("/my-bookings")
    }
  }, [bookingDetails, navigate])

  if (!bookingDetails.tour) {
    return (
      <div className={`min-h-screen py-12 ${isRTL ? 'font-arabic arabic-text' : 'font-english'}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800 dark:text-white">
            {isRTL ? 'لا توجد حجوزات' : 'No Booking Found'}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            {isRTL 
              ? 'يرجى العودة إلى صفحة الحجز لإكمال عملية الحجز أولاً.'
              : 'Please go back to the booking page to complete your booking first.'
            }
          </p>
          <button
            onClick={() => window.history.back()}
            className="bg-primary-light dark:bg-primary-dark text-white px-6 py-3 rounded-lg hover:bg-primary-dark dark:hover:bg-primary-light transition-colors duration-300"
          >
            {isRTL ? 'العودة إلى الحجز' : 'Back to Booking'}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen py-12 ${isRTL ? 'font-arabic arabic-text' : 'font-english'}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
            {t('payment')}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {isRTL 
              ? 'أكمل عملية الدفع لتأكيد حجزك'
              : 'Complete your payment to confirm your booking'
            }
          </p>
        </div>

        {/* Back Button */}
        <button
          onClick={() => window.history.back()}
          className={`bg-sky-100 dark:bg-gray-700 p-3 rounded-lg flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-primary-light dark:hover:text-primary-dark mb-6 transition-colors duration-300`}
        >
          <FiArrowLeft className={isRTL ? 'rotate-180' : ''} />
          {isRTL ? 'العودة' : 'Back'}
        </button>
        
        {/* User Info */}
        {user && (
          <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="flex items-center gap-3">
              <FiUser className="text-blue-500 dark:text-blue-400" />
              <div>
                <p className="text-blue-700 dark:text-blue-400 text-sm font-medium">
                  {isRTL ? `مسجل الدخول كـ: ${user.name}` : `Logged in as: ${user.name}`}
                </p>
                <p className="text-blue-600 dark:text-blue-300 text-xs">
                  {user.email}
                </p>
              </div>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Booking Summary */}
          <div className="xl:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-6 sticky top-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                {isRTL ? 'تفاصيل الحجز' : 'Booking Details'}
              </h2>
              
              <div className="space-y-4">
                {/* Tour Info */}
                <div className="flex items-start gap-4 pb-4 border-b border-gray-200 dark:border-gray-600">
                  {bookingDetails.tour.images?.[0] && (
                    <img 
                      src={bookingDetails.tour.images[0]} 
                      alt={isRTL ? bookingDetails.tour.nameAr : bookingDetails.tour.name}
                      className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                    />
                  )}
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 dark:text-white text-sm">
                      {isRTL ? bookingDetails.tour.nameAr : bookingDetails.tour.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-xs mt-1">
                      {bookingDetails.tour.duration} {isRTL ? 'ساعة' : 'hours'}
                    </p>
                  </div>
                </div>

                {/* Booking Details */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                    <FiCalendar className="w-4 h-4 flex-shrink-0" />
                    <span className="text-sm">{bookingDetails.date}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                    <FiUsers className="w-4 h-4 flex-shrink-0" />
                    <span className="text-sm">
                      {bookingDetails.travelers} {isRTL ? 'مسافر' : 'traveler(s)'}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                    <FiUser className="w-4 h-4 flex-shrink-0" />
                    <span className="text-sm">
                      {bookingDetails.customerInfo?.name || user?.name}
                    </span>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="border-t border-gray-200 dark:border-gray-600 pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-300">
                      {isRTL ? 'المجموع الفرعي' : 'Subtotal'}
                    </span>
                    <span className="text-gray-800 dark:text-white">
                      ${bookingDetails.pricing?.subtotal || 0}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-300">
                      {isRTL ? 'الضرائب (10%)' : 'Tax (10%)'}
                    </span>
                    <span className="text-gray-800 dark:text-white">
                      ${bookingDetails.pricing?.tax || 0}
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-t border-gray-200 dark:border-gray-600 pt-2">
                    <span className="font-semibold text-gray-800 dark:text-white">
                      {t('total')}
                    </span>
                    <span className="text-lg font-semibold text-primary-light dark:text-primary-dark">
                      ${bookingDetails.pricing?.total || 0}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="xl:col-span-2">
            <Elements stripe={stripePromise}>
              <CheckoutForm />
            </Elements>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Payment