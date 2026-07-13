import React from 'react'
import { useTranslation } from 'react-i18next'
import { useLanguage } from '../contexts/LanguageContext'
import { FiMapPin, FiStar, FiUsers, FiGlobe, FiShield, FiAward } from 'react-icons/fi'
import DestinationCard from '../components/DestinationCard'
import { Link } from 'react-router-dom'
import { useBooking } from '../contexts/BookingContext'

const Home = () => {
  const { t } = useTranslation()
  const { isRTL } = useLanguage()

  
    const { bookingHistory, cancelBooking, destinations } = useBooking()
    console.log(bookingHistory)
    console.log(destinations)

  const featuredDestinations = [
    {
      id: 1,
      name: isRTL ? "باريس، فرنسا" : "Paris, France",
      image: "https://images.unsplash.com/photo-1502602898536-47ad22581b52?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      country: isRTL ? "فرنسا" : "France",
      price: isRTL ? "١,٢٠٠ $" : "$1,200",
      duration: "7",
      rating: "4.8",
      description: isRTL ? "مدينة الأنوار الرومانسية" : "The romantic city of lights"
    },
    {
      id: 2,
      name: isRTL ? "طوكيو، اليابان" : "Tokyo, Japan",
      image: "https://images.unsplash.com/photo-1540959733332-5b3d4b4f0a7f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      country: isRTL ? "اليابان" : "Japan",
      price: isRTL ? "١,٥٠٠ $" : "$1,500",
      duration: "10",
      rating: "4.9",
      description: isRTL ? "مزيج مذهل من التقليد والحداثة" : "Amazing blend of tradition and modernity"
    },
    {
      id: 3,
      name: isRTL ? "دبي، الإمارات" : "Dubai, UAE",
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      country: isRTL ? "الإمارات" : "UAE",
      price: isRTL ? "٩٠٠ $" : "$900",
      duration: "5",
      rating: "4.7",
      description: isRTL ? "مدينة المستقبل في الصحراء" : "The future city in the desert"
    }
  ]

  const features = [
    {
      icon: <FiGlobe className="text-2xl" />,
      title: isRTL ? "وجهات عالمية" : "Global Destinations",
      description: isRTL ? "اكتشف أكثر من 100 وجهة حول العالم" : "Discover over 100 destinations worldwide"
    },
    {
      icon: <FiShield className="text-2xl" />,
      title: isRTL ? "جودة مضمونة" : "Quality Guaranteed",
      description: isRTL ? "أفضل الخدمات والفنادق المضمونة" : "Best services and guaranteed hotels"
    },
    {
      icon: <FiUsers className="text-2xl" />,
      title: isRTL ? "دعم 24/7" : "24/7 Support",
      description: isRTL ? "دعم متاح على مدار الساعة" : "Round-the-clock customer support"
    },
    {
      icon: <FiAward className="text-2xl" />,
      title: isRTL ? "خبرة 10+ سنوات" : "10+ Years Experience",
      description: isRTL ? "خبرة واسعة في مجال السياحة" : "Extensive experience in tourism"
    }
  ]

  return (
    <div className={`min-h-screen ${isRTL ? 'font-arabic arabic-text' : 'font-english'}`}>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-r from-primary-light to-secondary-light dark:from-primary-dark dark:to-secondary-dark">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80")'
          }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className={`text-4xl md:text-6xl lg:text-7xl font-bold mb-6 font-heading ${isRTL ? 'leading-tight' : 'leading-normal'}`}>
            {t('welcome')}
          </h1>
          <p className={`text-lg md:text-xl lg:text-2xl mb-8 max-w-2xl mx-auto ${isRTL ? 'leading-loose' : 'leading-relaxed'}`}>
            {t('subtitle')}
          </p>
          <Link 
            to="/destinations"
            className={`bg-white text-primary-light dark:text-primary-dark px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors duration-300 inline-block ${isRTL ? 'font-arabic' : 'font-english'}`}
          >
            {t('cta')}
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="bg-primary-light dark:bg-primary-dark w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                  {feature.icon}
                </div>
                <h3 className={`text-xl font-semibold mb-2 text-gray-800 dark:text-white ${isRTL ? 'font-arabic' : 'font-english'}`}>
                  {feature.title}
                </h3>
                <p className={`text-gray-600 dark:text-gray-300 ${isRTL ? 'font-arabic leading-loose' : 'font-english'}`}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white font-heading ${isRTL ? 'text-arabic' : 'text-english'}`}>
            {t('featured')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations?.slice(0, 4).map((destination) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link 
              to="/destinations"
              className={`btn-primary ${isRTL ? 'font-arabic' : 'font-english'}`}
            >
              {isRTL ? 'عرض جميع الوجهات' : 'View All Destinations'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home