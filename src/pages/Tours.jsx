import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLanguage } from '../contexts/LanguageContext'
import TourCard from '../components/TourCard'
import { FiSearch, FiFilter } from 'react-icons/fi'

const Tours = () => {
  const { t } = useTranslation()
  const { isRTL } = useLanguage()
  const [searchTerm, setSearchTerm] = useState('')

  const tours = [
    {
      id: 1,
      name: "Paris City Tour",
      image: "https://images.unsplash.com/photo-1431274172761-fca41d930114?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      destination: "Paris, France",
      duration: "3",
      groupSize: "15",
      price: "$299",
      category: "City",
      description: isRTL ? "جولة شاملة في معالم باريس الرئيسية" : "Comprehensive tour of Paris main landmarks"
    },
    {
      id: 2,
      name: "Japanese Culture Experience",
      image: "https://images.unsplash.com/photo-1528164344705-47542687000d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      destination: "Tokyo, Japan",
      duration: "5",
      groupSize: "12",
      price: "$599",
      category: "Cultural",
      description: isRTL ? "تجربة ثقافية شاملة في طوكيو" : "Complete cultural experience in Tokyo"
    },
    {
      id: 3,
      name: "Desert Safari Dubai",
      image: "https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      destination: "Dubai, UAE",
      duration: "1",
      groupSize: "20",
      price: "$89",
      category: "Adventure",
      description: isRTL ? "مغامرة الصحراء مع الأنشطة التقليدية" : "Desert adventure with traditional activities"
    },
    {
      id: 4,
      name: "New York Broadway Tour",
      image: "https://images.unsplash.com/photo-1496588152823-86ff7695e68f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      destination: "New York, USA",
      duration: "2",
      groupSize: "10",
      price: "$199",
      category: "Entertainment",
      description: isRTL ? "جولة في برودواي والعروض المسرحية" : "Broadway tour and theater shows"
    },
    {
      id: 5,
      name: "Bali Beach Retreat",
      image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      destination: "Bali, Indonesia",
      duration: "7",
      groupSize: "8",
      price: "$799",
      category: "Relaxation",
      description: isRTL ? "استرخاء على الشواطئ البالية الجميلة" : "Relaxation on beautiful Balinese beaches"
    },
    {
      id: 6,
      name: "Ancient Rome Walk",
      image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      destination: "Rome, Italy",
      duration: "4",
      groupSize: "15",
      price: "$349",
      category: "Historical",
      description: isRTL ? "جولة في المواقع التاريخية في روما" : "Tour of historical sites in Rome"
    }
  ]

  const filteredTours = tours.filter(tour =>
    tour.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tour.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tour.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className={`min-h-screen py-12 ${isRTL ? 'font-arabic' : 'font-english'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
            {t('tours')}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {isRTL 
              ? 'اختر من بين مجموعة واسعة من الجولات المصممة خصيصًا لتجربتك'
              : 'Choose from a wide range of tours designed specifically for your experience'
            }
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 rtl:right-3 rtl:left-auto" />
              <input
                type="text"
                placeholder={isRTL ? "ابحث عن جولات..." : "Search tours..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-light rtl:pr-10 rtl:pl-4"
              />
            </div>
            <button className="flex items-center gap-2 px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300">
              <FiFilter />
              {isRTL ? 'تصفية' : 'Filter'}
            </button>
          </div>
        </div>

        {/* Tours Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTours.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>

        {filteredTours.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              {isRTL ? 'لم يتم العثور على جولات تطابق بحثك.' : 'No tours found matching your search.'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Tours