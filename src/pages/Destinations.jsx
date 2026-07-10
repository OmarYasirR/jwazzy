import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useLanguage } from '../contexts/LanguageContext'
import DestinationCard from '../components/DestinationCard'
import { FiSearch, FiFilter, FiX, FiStar, FiDollarSign, FiGlobe } from 'react-icons/fi'

const Destinations = () => {
  const { t } = useTranslation()
  const { isRTL } = useLanguage()
  const [searchTerm, setSearchTerm] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    region: '',
    priceRange: '',
    rating: '',
    duration: ''
  })

  const destinations = [
    {
      id: 1,
      name: "Paris, France",
      nameAr: "باريس، فرنسا",
      image: "https://images.unsplash.com/photo-1502602898536-47ad22581b52?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      country: "France",
      countryAr: "فرنسا",
      region: "europe",
      price: 1200,
      duration: 7,
      rating: 4.8,
      description: "Enjoy stunning architecture and world-class cuisine in the City of Lights",
      descriptionAr: "استمتع بالهندسة المعمارية الرائعة والمطاعم العالمية في مدينة الأنوار"
    },
    {
      id: 2,
      name: "Tokyo, Japan",
      nameAr: "طوكيو، اليابان",
      image: "https://images.unsplash.com/photo-1540959733332-5b3d4b4f0a7f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      country: "Japan",
      countryAr: "اليابان",
      region: "asia",
      price: 1500,
      duration: 10,
      rating: 4.9,
      description: "Discover traditional culture and modern technology in Tokyo",
      descriptionAr: "اكتشف الثقافة التقليدية والتكنولوجيا الحديثة في طوكيو"
    },
    {
      id: 3,
      name: "Dubai, UAE",
      nameAr: "دبي، الإمارات",
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      country: "UAE",
      countryAr: "الإمارات",
      region: "middle-east",
      price: 900,
      duration: 5,
      rating: 4.7,
      description: "Luxury experience among skyscrapers and golden deserts",
      descriptionAr: "تجربة فاخرة بين ناطحات السحاب والصحراء الذهبية"
    },
    {
      id: 4,
      name: "New York, USA",
      nameAr: "نيويورك، الولايات المتحدة",
      image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      country: "USA",
      countryAr: "الولايات المتحدة",
      region: "north-america",
      price: 1300,
      duration: 6,
      rating: 4.6,
      description: "The city that never sleeps, full of energy and culture",
      descriptionAr: "مدينة لا تنام مليئة بالطاقة والثقافة"
    },
    {
      id: 5,
      name: "Bali, Indonesia",
      nameAr: "بالي، إندونيسيا",
      image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      country: "Indonesia",
      countryAr: "إندونيسيا",
      region: "asia",
      price: 800,
      duration: 8,
      rating: 4.8,
      description: "Tropical paradise with stunning beaches and ancient temples",
      descriptionAr: "جنة استوائية مع شواطئ خلابة ومعابد قديمة"
    },
    {
      id: 6,
      name: "Rome, Italy",
      nameAr: "روما، إيطاليا",
      image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      country: "Italy",
      countryAr: "إيطاليا",
      region: "europe",
      price: 1100,
      duration: 5,
      rating: 4.7,
      description: "Explore ancient history and wonderful Italian cuisine",
      descriptionAr: "استكشف التاريخ القديم والمطبخ الإيطالي الرائع"
    },
    {
      id: 7,
      name: "Cairo, Egypt",
      nameAr: "القاهرة، مصر",
      image: "https://images.unsplash.com/photo-1572252009286-268acec5ca0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      country: "Egypt",
      countryAr: "مصر",
      region: "africa",
      price: 700,
      duration: 4,
      rating: 4.5,
      description: "Discover ancient pyramids and rich cultural heritage",
      descriptionAr: "اكتشف الأهرامات القديمة والتراث الثقافي الغني"
    },
    {
      id: 8,
      name: "Sydney, Australia",
      nameAr: "سيدني، أستراليا",
      image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      country: "Australia",
      countryAr: "أستراليا",
      region: "oceania",
      price: 1600,
      duration: 9,
      rating: 4.8,
      description: "Beautiful harbor city with iconic opera house and beaches",
      descriptionAr: "مدينة ميناء جميلة مع دار أوبرا أيقونية وشواطئ رائعة"
    }
  ]

  const regions = [
    { value: '', label: isRTL ? 'جميع المناطق' : 'All Regions' },
    { value: 'europe', label: isRTL ? 'أوروبا' : 'Europe' },
    { value: 'asia', label: isRTL ? 'آسيا' : 'Asia' },
    { value: 'middle-east', label: isRTL ? 'الشرق الأوسط' : 'Middle East' },
    { value: 'north-america', label: isRTL ? 'أمريكا الشمالية' : 'North America' },
    { value: 'south-america', label: isRTL ? 'أمريكا الجنوبية' : 'South America' },
    { value: 'africa', label: isRTL ? 'أفريقيا' : 'Africa' },
    { value: 'oceania', label: isRTL ? 'أوقيانوسيا' : 'Oceania' }
  ]

  const priceRanges = [
    { value: '', label: isRTL ? 'جميع الأسعار' : 'Any Price' },
    { value: 'budget', label: isRTL ? 'اقتصادي (أقل من $500)' : 'Budget (Under $500)' },
    { value: 'moderate', label: isRTL ? 'متوسط ($500 - $1000)' : 'Moderate ($500 - $1000)' },
    { value: 'luxury', label: isRTL ? 'فاخر (أكثر من $1000)' : 'Luxury (Over $1000)' }
  ]

  const ratings = [
    { value: '', label: isRTL ? 'جميع التقييمات' : 'Any Rating' },
    { value: '4.5', label: '4.5+ ⭐' },
    { value: '4.0', label: '4.0+ ⭐' },
    { value: '3.5', label: '3.5+ ⭐' }
  ]

  const durations = [
    { value: '', label: isRTL ? 'أي مدة' : 'Any Duration' },
    { value: 'short', label: isRTL ? 'قصيرة (1-3 أيام)' : 'Short (1-3 days)' },
    { value: 'medium', label: isRTL ? 'متوسطة (4-7 أيام)' : 'Medium (4-7 days)' },
    { value: 'long', label: isRTL ? 'طويلة (8+ أيام)' : 'Long (8+ days)' }
  ]

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }))
  }

  const clearFilters = () => {
    setFilters({
      region: '',
      priceRange: '',
      rating: '',
      duration: ''
    })
    setSearchTerm('')
  }

  const hasActiveFilters = () => {
    return filters.region || filters.priceRange || filters.rating || filters.duration || searchTerm
  }

  const filteredDestinations = destinations.filter(destination => {
    // Search filter
    const matchesSearch = searchTerm === '' || 
      destination.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      destination.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (isRTL && (
        destination.nameAr.includes(searchTerm) ||
        destination.countryAr.includes(searchTerm)
      ))

    // Region filter
    const matchesRegion = !filters.region || destination.region === filters.region

    // Price range filter
    const matchesPrice = !filters.priceRange || (
      filters.priceRange === 'budget' && destination.price < 500 ||
      filters.priceRange === 'moderate' && destination.price >= 500 && destination.price <= 1000 ||
      filters.priceRange === 'luxury' && destination.price > 1000
    )

    // Rating filter
    const matchesRating = !filters.rating || destination.rating >= parseFloat(filters.rating)

    // Duration filter
    const matchesDuration = !filters.duration || (
      filters.duration === 'short' && destination.duration <= 3 ||
      filters.duration === 'medium' && destination.duration >= 4 && destination.duration <= 7 ||
      filters.duration === 'long' && destination.duration >= 8
    )

    return matchesSearch && matchesRegion && matchesPrice && matchesRating && matchesDuration
  })

  // Format destination data based on language
  const getFormattedDestination = (destination) => ({
    ...destination,
    name: isRTL ? destination.nameAr : destination.name,
    country: isRTL ? destination.countryAr : destination.country,
    description: isRTL ? destination.descriptionAr : destination.description,
    price: isRTL ? `${destination.price.toLocaleString('ar-EG')} $` : `$${destination.price}`,
    duration: destination.duration.toString()
  })

  return (
    <div className={`min-h-screen py-12 ${isRTL ? 'font-arabic arabic-text' : 'font-english'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4 font-heading">
            {t('destinations')}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {isRTL 
              ? 'اكتشف وجهاتنا المذهلة حول العالم وخطط لرحلتك القادمة'
              : 'Discover our amazing destinations around the world and plan your next journey'
            }
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <FiSearch className={`absolute top-1/2 transform -translate-y-1/2 text-gray-400 ${isRTL ? 'right-3' : 'left-3'}`} />
              <input
                type="text"
                placeholder={isRTL ? "ابحث عن وجهة..." : "Search destinations..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-sky-50 dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-light ${isRTL ? 'pr-10 pl-4 text-right' : 'pl-10 pr-4 text-left'}`}
              />
            </div>
            
            <div className="flex items-center gap-4">
              {/* Active Filters Badge */}
              {hasActiveFilters() && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-200"
                >
                  <FiX className="w-4 h-4" />
                  {isRTL ? 'مسح الفلاتر' : 'Clear Filters'}
                </button>
              )}

              {/* Filter Button */}
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-sky-50 dark:bg-gray-800 text-gray-800 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300"
              >
                <FiFilter />
                {isRTL ? 'تصفية' : 'Filter'}
                {hasActiveFilters() && (
                  <span className="w-2 h-2 bg-primary-light rounded-full"></span>
                )}
              </button>
            </div>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="mt-6 bg-sky-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {isRTL ? 'تصفية النتائج' : 'Filter Results'}
                </h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Region Filter */}
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                    <FiGlobe className="w-4 h-4" />
                    {isRTL ? 'المنطقة' : 'Region'}
                  </label>
                  <select
                    value={filters.region}
                    onChange={(e) => handleFilterChange('region', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-sky-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-light"
                  >
                    {regions.map(region => (
                      <option key={region.value} value={region.value}>
                        {region.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price Range Filter */}
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                    <FiDollarSign className="w-4 h-4" />
                    {isRTL ? 'نطاق السعر' : 'Price Range'}
                  </label>
                  <select
                    value={filters.priceRange}
                    onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-sky-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-light"
                  >
                    {priceRanges.map(range => (
                      <option key={range.value} value={range.value}>
                        {range.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Rating Filter */}
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                    <FiStar className="w-4 h-4" />
                    {isRTL ? 'التقييم' : 'Rating'}
                  </label>
                  <select
                    value={filters.rating}
                    onChange={(e) => handleFilterChange('rating', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-sky-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-light"
                  >
                    {ratings.map(rating => (
                      <option key={rating.value} value={rating.value}>
                        {rating.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Duration Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {isRTL ? 'مدة الرحلة' : 'Trip Duration'}
                  </label>
                  <select
                    value={filters.duration}
                    onChange={(e) => handleFilterChange('duration', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-sky-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-light"
                  >
                    {durations.map(duration => (
                      <option key={duration.value} value={duration.value}>
                        {duration.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Active Filters Display */}
              {hasActiveFilters() && (
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {isRTL ? 'الفلاتر النشطة:' : 'Active Filters:'}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {filters.region && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary-light text-white text-sm rounded-full">
                        {regions.find(r => r.value === filters.region)?.label}
                        <button onClick={() => handleFilterChange('region', '')}>
                          <FiX className="w-3 h-3" />
                        </button>
                      </span>
                    )}
                    {filters.priceRange && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full">
                        {priceRanges.find(p => p.value === filters.priceRange)?.label}
                        <button onClick={() => handleFilterChange('priceRange', '')}>
                          <FiX className="w-3 h-3" />
                        </button>
                      </span>
                    )}
                    {filters.rating && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-sm rounded-full">
                        {ratings.find(r => r.value === filters.rating)?.label}
                        <button onClick={() => handleFilterChange('rating', '')}>
                          <FiX className="w-3 h-3" />
                        </button>
                      </span>
                    )}
                    {filters.duration && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-sm rounded-full">
                        {durations.find(d => d.value === filters.duration)?.label}
                        <button onClick={() => handleFilterChange('duration', '')}>
                          <FiX className="w-3 h-3" />
                        </button>
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-300">
            {isRTL 
              ? `عرض ${filteredDestinations.length} من ${destinations.length} وجهة`
              : `Showing ${filteredDestinations.length} of ${destinations.length} destinations`
            }
          </p>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDestinations.map((destination) => (
            <DestinationCard 
              key={destination.id} 
              destination={getFormattedDestination(destination)} 
            />
          ))}
        </div>

        {/* No Results Message */}
        {filteredDestinations.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-8 max-w-md mx-auto">
              <FiSearch className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                {isRTL ? 'لم يتم العثور على وجهات' : 'No destinations found'}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {isRTL 
                  ? 'جرب تعديل الفلاتر أو مصطلحات البحث الخاصة بك'
                  : 'Try adjusting your filters or search terms'
                }
              </p>
              <button
                onClick={clearFilters}
                className="bg-primary-light dark:bg-primary-dark text-white px-6 py-2 rounded-lg hover:bg-primary-dark dark:hover:bg-primary-light transition-colors duration-300"
              >
                {isRTL ? 'مسح جميع الفلاتر' : 'Clear all filters'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Destinations