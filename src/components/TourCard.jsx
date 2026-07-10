import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useLanguage } from '../contexts/LanguageContext'
import { FiUsers, FiClock, FiMapPin } from 'react-icons/fi'
import { useBooking } from '../contexts/BookingContext'

const TourCard = ({ tour }) => {
  const { t } = useTranslation()
  const { isRTL } = useLanguage()
    const { setTour } = useBooking()
    const navigate = useNavigate()
  
    const handleBookNow = (e) => {
      e.preventDefault()
      setTour(tour)
      navigate('/booking')
      // Navigation will be handled by the Link component
    }

  return (
    <div className="bg-sky-50 dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border dark:border-gray-600 p-3">
      <img 
        src={tour.image} 
        alt={tour.name}
        className="w-full h-48 object-cover rounded-lg"
      />
      <div className="pt-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white flex-1">
            {tour.name}
          </h3>
          <span className="bg-secondary-light dark:bg-secondary-dark text-white text-sm px-2 py-1 rounded ml-2 rtl:mr-2 rtl:ml-0">
            {tour.category}
          </span>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
          {tour.description}
        </p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm">
            <FiMapPin className="mr-2 rtl:ml-2 rtl:mr-0" />
            <span>{tour.destination}</span>
          </div>
          <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm">
            <FiClock className="mr-2 rtl:ml-2 rtl:mr-0" />
            <span>{tour.duration} {t('days')}</span>
          </div>
          <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm">
            <FiUsers className="mr-2 rtl:ml-2 rtl:mr-0" />
            <span>{tour.groupSize} {isRTL ? 'مسافرين' : 'travelers'}</span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-primary-light dark:text-primary-dark font-bold text-lg">
            {tour.price}
          </span>
          <Link 
            onClick={handleBookNow}
            to={`/booking`}
            className="bg-primary-light dark:bg-primary-dark text-white px-4 py-2 rounded-lg hover:bg-primary-dark dark:hover:bg-primary-light transition-colors duration-300 text-sm"
          >
            {t('bookNow')}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default TourCard