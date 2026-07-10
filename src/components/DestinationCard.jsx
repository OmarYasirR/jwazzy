import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useLanguage } from '../contexts/LanguageContext'
import { FiMapPin, FiStar, FiCalendar } from 'react-icons/fi'
import { useBooking } from '../contexts/BookingContext'

const DestinationCard = ({ destination }) => {
  const { t } = useTranslation()
  const { isRTL } = useLanguage()
  const { setTour } = useBooking()
  const navigate = useNavigate()

  const handleBookNow = (e) => {
    e.preventDefault()
    setTour(destination)
    navigate('/booking')
    // Navigation will be handled by the Link component
  }

  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FiStar key={i} className="w-4 h-4 fill-current text-yellow-400" />)
    }

    if (hasHalfStar) {
      stars.push(<FiStar key="half" className="w-4 h-4 text-yellow-400" />)
    }

    const remainingStars = 5 - stars.length
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<FiStar key={`empty-${i}`} className="w-4 h-4 text-gray-300" />)
    }

    return stars
  }

  return (
    <div className="bg-sky-50 dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 border dark:border-gray-600 p-3">
      <div className="relative">
        <img 
          src={destination.image} 
          alt={destination.name}
          className="w-full h-48 object-cover rounded-lg"
        />
        
      </div>
      
      <div className="pt-4">
        <h3 className={`text-xl font-semibold mb-2 text-gray-800 dark:text-white ${isRTL ? 'text-right font-arabic' : 'text-left font-english'}`}>
          {destination.name}
        </h3>
        
        <p className={`text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 ${isRTL ? 'text-right font-arabic leading-loose' : 'text-left font-english'}`}>
          {destination.description}
        </p>
        
        <div className="flex items-center justify-between mb-4">
          <div className={`flex items-center text-gray-600 dark:text-gray-300 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <FiMapPin className={`${isRTL ? 'ml-2' : 'mr-2'} w-4 h-4`} />
            <span className={`text-sm ${isRTL ? 'font-arabic' : 'font-english'}`}>
              {destination.country}
            </span>
          </div>
          
          <div className="flex items-center">
            {renderStars(parseFloat(destination.rating))}
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <span className={`text-primary-light dark:text-primary-dark font-bold text-lg ${isRTL ? 'font-arabic' : 'font-english'}`}>
            {destination.price}
          </span>
          
          <span className={`text-gray-600 dark:text-gray-300 flex items-center text-sm ${isRTL ? 'flex-row-reverse font-arabic' : 'font-english'}`}>
            <FiCalendar className={`${isRTL ? 'ml-2' : 'mr-2'} w-4 h-4`} />
            {destination.duration} {t('days')}
          </span>
        </div>

        <Link
          onClick={handleBookNow}
          to={`/booking`}
          className={`w-full bg-sky-500 dark:bg-primary-dark text-white py-3 rounded-lg hover:bg-primary-dark dark:hover:bg-primary-light transition-colors duration-300 font-semibold flex items-center justify-center ${isRTL ? 'font-arabic' : 'font-english'}`}
        >
          {t('bookNow')}
        </Link>
      </div>
    </div>
  )
}

export default DestinationCard