import React, { useState, useEffect, use } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useLanguage } from '../contexts/LanguageContext'
import { useBooking } from '../contexts/BookingContext'
import { FiCalendar, FiUsers, FiUser, FiMail, FiPhone, FiArrowRight, FiCheck, FiArrowLeft } from 'react-icons/fi'
import { convertWstToEst } from '../services/helpers'


const Booking = () => {
  const navigate = useNavigate()
  const { isRTL } = useLanguage()
  const { bookingDetails, setTour, setDate, setTravelers, setCustomerInfo, confirmBooking, hasValidBooking } = useBooking()
  
  const [currentStep, setCurrentStep] = useState(1)
  const [errors, setErrors] = useState({})


  const validateStep = (step) => {
    const newErrors = {}
    
    if (step === 1) {
      if (!bookingDetails.tour) newErrors.tour = isRTL ? 'يرجى اختيار الجولة' : 'Please select a tour'
      setTour(bookingDetails.tour)
    }
    
    if (step === 2) {
      if (!bookingDetails.date) newErrors.date = isRTL ? 'يرجى اختيار التاريخ' : 'Please select a date'
      if (bookingDetails.travelers < 1) newErrors.travelers = isRTL ? 'يرجى تحديد عدد المسافرين' : 'Please specify number of travelers'
    }
    
    if (step === 3) {
      if (!bookingDetails.customerInfo.name.trim()) newErrors.name = isRTL ? 'الاسم مطلوب' : 'Name is required'
      if (!bookingDetails.customerInfo.email.trim()) newErrors.email = isRTL ? 'البريد الإلكتروني مطلوب' : 'Email is required'
      if (!/\S+@\S+\.\S+/.test(bookingDetails.customerInfo.email)) newErrors.email = isRTL ? 'البريد الإلكتروني غير صالح' : 'Email is invalid'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const navigateBack = () => {
    if (step === 1) {
      navigate(-1)
      setTour(null)
    }
    
    if (step === 2) {
      setCurrentStep(1)
      setDate('')
    }
    if (step === 3) {
      setCurrentStep(2)
    }
  }

  const handleSubmit = () => {
    if (validateStep(3)) {
      navigate('/payment')
      }
  }

  // // Show loading or redirect if no tour
  // if (!bookingDetails.tour) {
  //   return (
  //     <div className={`min-h-screen py-12 ${isRTL ? 'font-arabic arabic-text' : 'font-english'}`}>
  //       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
  //         <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800 dark:text-white">
  //           {isRTL ? 'لا توجد جولات' : 'No tours Found'}
  //         </h1>
  //         <p className="text-gray-600 dark:text-gray-300 mb-8">
  //           {isRTL 
  //             ? 'يرجى العودة إلى صفحة السابقه لإختيار جوله أولاً.'
  //             : 'Please go back to the booking page to complete your booking first.'
  //           }
  //         </p>
  //         <button
  //           onClick={() => window.history.back()}
  //           className="bg-primary-light dark:bg-primary-dark text-white px-6 py-3 rounded-lg hover:bg-primary-dark dark:hover:bg-primary-light transition-colors duration-300"
  //         >
  //           {isRTL ? 'العودة إلى الصفحه السابقه' : 'Back to Booking'}
  //         </button>
  //       </div>
  //     </div>
  //   )
  // }

  const tour = bookingDetails.tour
  
    useEffect(() => {
      window.scrollTo(0, 0);
      console.log(tour)
    }, [currentStep]);


    useEffect(() => {
      if(!bookingDetails.tour) {
        navigate("/my-bookings");
        return
      }
    }, [bookingDetails.tour]);


  return (
    <div className={`min-h-screen py-12 ${isRTL ? 'font-arabic arabic-text' : 'font-english'}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
            {isRTL ? 'احجز جولتك' : 'Book Your Tour'}
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            {isRTL ? 'اختر جولتك واملأ معلوماتك لإكمال الحجز' : 'Choose your tour and fill in your details to complete booking'}
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-12">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                step <= currentStep 
                  ? 'bg-primary-light dark:bg-primary-dark border-primary-light dark:border-primary-dark text-white' 
                  : 'border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400'
              }`}>
                {step}
              </div>
              {step < 3 && (
                <div className={`w-16 h-1 mx-2 ${
                  step < currentStep ? 'bg-primary-light dark:bg-primary-dark' : 'bg-gray-300 dark:bg-gray-600'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Tour Selection */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
              {isRTL ? 'الجولة المختارة' : 'Selected Tour'}
            </h2>
            
            <div
              className={`border-2 rounded-lg p-6 transition-all duration-300 border-primary-light dark:border-primary-dark bg-primary-light/5 dark:bg-primary-dark/5`}
            >
              <img
                src={tour.image}
                alt={isRTL ? tour.nameAr : tour.name}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                {tour.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-3">
                {tour.description}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-primary-light dark:text-primary-dark font-semibold text-lg">
                  ${tour.price} {isRTL ? 'للفرد' : 'per person'}
                </span>
                <span className="text-gray-500 dark:text-gray-400">
                  {tour.duration} {isRTL ? 'أيام' : 'days'}
                </span>
              </div>
            </div>
            
            {errors.tour && (
              <p className="text-red-500 text-sm mt-2">{errors.tour}</p>
            )}
          </div>
        )}

        {/* Step 2: Date & Travelers */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
              {isRTL ? 'التاريخ والمسافرون' : 'Date & Travelers'}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <FiCalendar className={`inline w-5 h-5 ${isRTL ? 'ml-2': 'mr-2'}`} />
                  {isRTL ? 'تاريخ السفر' : 'Travel Date'}
                </label>
                <input
                  type="date"
                  value={bookingDetails.date}
                  onChange={(e) => setDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                />
                {errors.date && (
                  <p className="text-red-500 text-sm mt-2">{errors.date}</p>
                )}
              </div>
              
              <div>
                <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <FiUsers className={`inline w-5 h-5 ${isRTL ? 'ml-2': 'mr-2'} `} />
                  {isRTL ? 'عدد المسافرين' : 'Number of Travelers'}
                </label>
                <select
                  value={bookingDetails.travelers}
                  onChange={(e) => setTravelers(parseInt(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                >
                  {[1,2,3,4,5,6,7,8].map(num => (
                    <option key={num} value={num}>
                      {num} {isRTL ? 'مسافر' : 'traveler'}{num > 1 ? (isRTL ? 'ون' : 's') : ''}
                    </option>
                  ))}
                </select>
                {errors.travelers && (
                  <p className="text-red-500 text-sm mt-2">{errors.travelers}</p>
                )}
              </div>
            </div>
            
            {/* Pricing Preview */}
            {bookingDetails.tour && (
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mt-6">
                <h3 className="font-bold text-gray-800 dark:text-white mb-3 text-xl">
                  {isRTL ? 'ملخص السعر' : 'Price Summary'}
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300 text-md font-bold">
                      {bookingDetails.tour.price} × {bookingDetails.travelers} {isRTL ? 'مسافر' : 'travelers'}
                    </span>
                    <span className="text-gray-800 dark:text-white text-xl">
                      ${isRTL ? convertWstToEst(bookingDetails.pricing.subtotal) : bookingDetails.pricing.subtotal}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300 font-bold">
                      ${isRTL ? 'الضرائب' : 'Tax'} (10%)
                    </span>
                    <span className="text-gray-800 dark:text-white text-xl">
                      ${isRTL? convertWstToEst(bookingDetails.pricing.tax) : bookingDetails.pricing.tax}
                    </span>
                  </div>
                  <div className="flex justify-between border-t border-gray-200 dark:border-gray-600 pt-2">
                    <span className="font-semibold text-gray-800 dark:text-white text-xl">
                      {isRTL ? 'المجموع' : 'Total'}
                    </span>
                    <span className="font-semibold text-primary-light dark:text-primary-dark text-xl">
                      ${isRTL? convertWstToEst(bookingDetails.pricing.total) :bookingDetails.pricing.total}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 3: Customer Information */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
              {isRTL ? 'معلومات المسافر' : 'Traveler Information'}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <FiUser className="inline w-4 h-4 mr-2" />
                  {isRTL ? 'الاسم الكامل' : 'Full Name'} *
                </label>
                <input
                  type="text"
                  value={bookingDetails.customerInfo.name}
                  onChange={(e) => setCustomerInfo({ name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                  placeholder={isRTL ? 'أدخل اسمك الكامل' : 'Enter your full name'}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-2">{errors.name}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <FiMail className="inline w-4 h-4 mr-2" />
                  {isRTL ? 'البريد الإلكتروني' : 'Email Address'} *
                </label>
                <input
                  type="email"
                  value={bookingDetails.customerInfo.email}
                  onChange={(e) => setCustomerInfo({ email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                  placeholder={isRTL ? 'example@email.com' : 'example@email.com'}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-2">{errors.email}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <FiPhone className="inline w-4 h-4 mr-2" />
                  {isRTL ? 'رقم الهاتف' : 'Phone Number'}
                </label>
                <input
                  type="tel"
                  value={bookingDetails.customerInfo.phone}
                  onChange={(e) => setCustomerInfo({ phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                  placeholder={isRTL ? '+966 5X XXX XXXX' : '+966 5X XXX XXXX'}
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {isRTL ? 'طلبات خاصة' : 'Special Requests'}
                </label>
                <textarea
                  value={bookingDetails.customerInfo.specialRequests}
                  onChange={(e) => setCustomerInfo({ specialRequests: e.target.value })}
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                  placeholder={isRTL ? 'أي طلبات خاصة أو احتياجات إضافية...' : 'Any special requests or additional needs...'}
                />
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className={`mt-12`}>
          {currentStep === 1 && (
            <div className={`flex justify-between`}>
              <button
                onClick={handleNext}
                className="px-8 py-3 bg-primary-light dark:bg-primary-dark text-white rounded-lg hover:bg-primary-dark dark:hover:bg-primary-light transition-colors duration-300 flex items-center gap-2"
              >
                <FiArrowLeft className={isRTL ? 'rotate-180' : ''} />
                {isRTL ? 'التالي' : 'Next'}
              </button>
              <button
                onClick={navigateBack}
                className="px-8 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300 flex items-center gap-2"
              >
                {isRTL ? 'الغاء' : 'Cancel'}
                <FiArrowRight className={isRTL ? 'rotate-180' : ''} />
              </button>
            </div>
          )}
          
          {currentStep === 2 && (
            <div className={`flex justify-between`}>
              <button
                onClick={handleNext}
                className="px-8 py-3 bg-primary-light dark:bg-primary-dark text-white rounded-lg hover:bg-primary-dark dark:hover:bg-primary-light transition-colors duration-300 flex items-center gap-2"
              >
                <FiArrowLeft className={isRTL ? 'rotate-180' : ''} />
                {isRTL ? 'التالي' : 'Next'}
              </button>
              <button
                onClick={navigateBack}
                className="px-8 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300 flex items-center gap-2"
              >
                {isRTL ? 'الغاء' : 'Cancel'}
                <FiArrowRight className={isRTL ? 'rotate-180' : ''} />
              </button>
            </div>
          )}
          
          {currentStep === 3 && (
            <div className={`flex justify-between`}>
              <button
                onClick={handleSubmit}
                disabled={!hasValidBooking()}
                className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isRTL ? 'تأكيد الحجز' : 'Confirm Booking'}
                <FiCheck />
              </button>
              <button
                onClick={navigateBack}
                className="px-8 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300 flex items-center gap-2"
              >
                {isRTL ? 'الغاء' : 'Cancel'}
                <FiArrowRight className={isRTL ? 'rotate-180' : ''} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Booking