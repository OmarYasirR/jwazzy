import React, { useState, useEffect } from 'react'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useLanguage } from '../contexts/LanguageContext'
import { useAuth } from '../contexts/AuthContext'
import { useBooking } from '../contexts/BookingContext'
import { useStripe as useCustomStripe } from '../contexts/StripeContext'
import { FiLock, FiCheck, FiAlertCircle, FiCreditCard, FiCalendar, FiUser, FiUsers } from 'react-icons/fi'

const CheckoutForm = () => {
  const stripe = useStripe()
  const elements = useElements()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { isRTL } = useLanguage()
  const { user } = useAuth()
  const { bookingDetails, confirmBooking, markAsPaid } = useBooking()
  const { createPaymentIntent, confirmPayment, loading: stripeLoading, error: stripeError } = useCustomStripe()
  
  const [processing, setProcessing] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)
  const [localError, setLocalError] = useState('')
  const [cardComplete, setCardComplete] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('card')

  useEffect(() => {
    if (stripeError) {
      setLocalError(stripeError)
    }
  }, [stripeError])

  const handleCardChange = (event) => {
    setLocalError('')
    
    if (event.error) {
      setLocalError(event.error.message)
    }

    setCardComplete(event.complete)
  }

const handleSubmit = async (event) => {
  event.preventDefault()
  
  if (!stripe || !elements) {
    setLocalError(isRTL ? 'نظام الدفع غير متوفر حالياً' : 'Payment system is not available')
    return
  }

  if (!user) {
    setLocalError(isRTL ? 'يرجى تسجيل الدخول لإكمال الدفع' : 'Please log in to complete payment')
    return
  }

  if (!cardComplete) {
    setLocalError(isRTL ? 'يرجى إدخال معلومات البطاقة بشكل صحيح' : 'Please enter valid card details')
    return
  }

  setProcessing(true)
  setLocalError('')

  try {
    // First, confirm the booking in Sanity
    const confirmedBooking = await confirmBooking()
    
    if (!confirmedBooking || !confirmedBooking._id) {
      throw new Error(isRTL ? 'فشل تأكيد الحجز' : 'Failed to confirm booking')
    }

    // Create payment intent
    const paymentIntent = await createPaymentIntent({
      bookingId: confirmedBooking._id,
      amount: confirmedBooking.pricing.total,
      currency: 'usd',
      customerId: user._id,
    })

    if (!paymentIntent.success) {
      throw new Error(paymentIntent.error || (isRTL ? 'فشل إنشاء نية الدفع' : 'Failed to create payment intent'))
    }

    // ✅ FIX: Validate clientSecret exists and is a string
    if (!paymentIntent.clientSecret || typeof paymentIntent.clientSecret !== 'string') {
      console.error('Invalid clientSecret:', paymentIntent.clientSecret)
      throw new Error(isRTL ? 'خطأ في إعداد الدفع' : 'Payment setup error')
    }

    // Confirm payment with Stripe
    const cardElement = elements.getElement(CardElement)
    
    const { error: stripeError, paymentIntent: confirmedIntent } = await stripe.confirmCardPayment(
      paymentIntent.clientSecret, // ✅ Now validated
      {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: user.name,
            email: user.email,
            phone: bookingDetails.customerInfo?.phone || '',
          },
        },
        return_url: `${window.location.origin}/booking-confirmation`,
      }
    )

    if (stripeError) {
      throw new Error(stripeError.message)
    }

    if (confirmedIntent.status === 'succeeded') {
      // Confirm payment in Sanity
      const paymentResult = await confirmPayment(paymentIntent.paymentId, {
        method: 'card',
        paymentIntentId: confirmedIntent.id,
        paymentMethodId: confirmedIntent.payment_method,
      })

      if (!paymentResult.success) {
        throw new Error(paymentResult.error)
      }

      // Mark booking as paid
      await markAsPaid(confirmedBooking._id, {
        method: 'card',
        amount: confirmedBooking.pricing.total,
        currency: 'USD',
        transactionId: confirmedIntent.id,
        paymentId: paymentResult.payment._id,
      })

      setPaymentSuccess(true)
      setProcessing(false)
      
      // Redirect to confirmation page after 2 seconds
      setTimeout(() => {
        navigate('/booking-confirmation', { 
          state: { 
            bookingId: confirmedBooking._id,
            paymentId: paymentResult.payment._id,
            bookingDetails: confirmedBooking
          }
        })
      }, 2000)
    }

  } catch (error) {
    console.error('Payment processing error:', error)
    setLocalError(error.message)
    setProcessing(false)
  }
}

  const displayError = localError

  if (paymentSuccess) {
    return (
      <div className="text-center py-8">
        <div className="bg-green-100 dark:bg-green-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <FiCheck className="text-green-600 dark:text-green-400 text-2xl" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
          {isRTL ? 'تم الدفع بنجاح!' : 'Payment Successful!'}
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          {isRTL ? 'جاري تحويلك إلى صفحة التأكيد...' : 'Redirecting to confirmation page...'}
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
      {/* Order Summary */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
          <FiCreditCard />
          {isRTL ? 'ملخص الطلب' : 'Order Summary'}
        </h3>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-300">
              {isRTL ? 'الجولة' : 'Tour'}
            </span>
            <span className="font-medium text-gray-800 dark:text-white">
              {isRTL ? bookingDetails.tour?.nameAr : bookingDetails.tour?.name}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-300">
              {isRTL ? 'التاريخ' : 'Date'}
            </span>
            <span className="font-medium text-gray-800 dark:text-white">
              {bookingDetails.date}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-300">
              {isRTL ? 'المسافرون' : 'Travelers'}
            </span>
            <span className="font-medium text-gray-800 dark:text-white">
              {bookingDetails.travelers}
            </span>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-600 pt-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600 dark:text-gray-300">
                {isRTL ? 'المجموع الفرعي' : 'Subtotal'}
              </span>
              <span className="text-gray-800 dark:text-white">
                ${bookingDetails.pricing?.subtotal || 0}
              </span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600 dark:text-gray-300">
                {isRTL ? 'الضرائب' : 'Tax'}
              </span>
              <span className="text-gray-800 dark:text-white">
                ${bookingDetails.pricing?.tax || 0}
              </span>
            </div>
            <div className="flex justify-between items-center text-lg font-semibold">
              <span className="text-gray-800 dark:text-white">
                {isRTL ? 'المجموع' : 'Total'}
              </span>
              <span className="text-primary-light dark:text-primary-dark">
                ${bookingDetails.pricing?.total || 0}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Form */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          {isRTL ? 'معلومات الدفع' : 'Payment Information'}
        </h3>

        <form onSubmit={handleSubmit}>
          {/* Error Display */}
          {displayError && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-2">
              <FiAlertCircle className="text-red-500 dark:text-red-400 mt-0.5 flex-shrink-0" />
              <p className="text-red-700 dark:text-red-400 text-sm">
                {displayError}
              </p>
            </div>
          )}

          {/* Payment Method Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              {isRTL ? 'طريقة الدفع' : 'Payment Method'}
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-3 border rounded-lg text-center transition-colors ${
                  paymentMethod === 'card'
                    ? 'border-primary-light bg-primary-light/10 text-primary-light'
                    : 'border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:border-gray-400'
                }`}
              >
                <FiCreditCard className="mx-auto mb-1" />
                <span className="text-sm">{isRTL ? 'بطاقة ائتمان' : 'Credit Card'}</span>
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('paypal')}
                disabled
                className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg text-center text-gray-400 dark:text-gray-600 cursor-not-allowed opacity-50"
              >
                <FiCreditCard className="mx-auto mb-1" />
                <span className="text-sm">{isRTL ? 'باي بال' : 'PayPal'}</span>
              </button>
            </div>
          </div>

          {/* Card Details */}
          {paymentMethod === 'card' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('cardNumber')}
                </label>
                <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-3 bg-white dark:bg-gray-700 transition-colors focus-within:border-primary-light focus-within:ring-2 focus-within:ring-primary-light/20">
                  <CardElement
                    options={{
                      style: {
                        base: {
                          fontSize: '16px',
                          color: '#424770',
                          '::placeholder': {
                            color: '#aab7c4',
                          },
                          backgroundColor: 'transparent',
                        },
                      },
                      hidePostalCode: true,
                    }}
                    onChange={handleCardChange}
                  />
                </div>
              </div>

              {/* Billing Information */}
              <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  {isRTL ? 'معلومات الفواتير' : 'Billing Information'}
                </h4>
                <div className="grid grid-cols-1 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {isRTL ? 'الاسم الكامل' : 'Full Name'}
                    </label>
                    <input
                      type="text"
                      value={user?.name || ''}
                      readOnly
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {isRTL ? 'البريد الإلكتروني' : 'Email'}
                    </label>
                    <input
                      type="email"
                      value={user?.email || ''}
                      readOnly
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!stripe || processing || stripeLoading || !bookingDetails.tour || !user || !cardComplete}
            className="w-full bg-primary-light dark:bg-primary-dark text-white py-3 px-4 rounded-lg hover:bg-primary-dark dark:hover:bg-primary-light transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6 font-semibold"
          >
            {processing || stripeLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                {isRTL ? 'جاري المعالجة...' : 'Processing...'}
              </>
            ) : (
              <>
                <FiLock />
                {t('payNow')} ${bookingDetails.pricing?.total || 0}
              </>
            )}
          </button>

          {/* Security Notice */}
          <div className="mt-4 flex items-center justify-center text-sm text-gray-500 dark:text-gray-400">
            <FiLock className="mr-2 rtl:ml-2 rtl:mr-0 flex-shrink-0" />
            {isRTL ? 'مدفوعات آمنة ومشفرة' : 'Payments are secure and encrypted'}
          </div>

          {/* User Not Logged In Warning */}
          {!user && (
            <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <p className="text-yellow-700 dark:text-yellow-400 text-sm text-center">
                {isRTL ? 'يجب تسجيل الدخول لإكمال عملية الدفع' : 'You must be logged in to complete payment'}
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

export default CheckoutForm