import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useLanguage } from '../contexts/LanguageContext'
import { useAuth } from '../contexts/AuthContext'
import { useBooking } from '../contexts/BookingContext'
import { 
  FiCalendar, 
  FiMapPin, 
  FiUsers, 
  FiDollarSign, 
  FiClock, 
  FiCheck, 
  FiX, 
  FiAlertCircle,
  FiDownload,
  FiEye,
  FiRefreshCw,
  FiStar
} from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'


const MyBookings = () => {
  const { t } = useTranslation()
  const { isRTL } = useLanguage()
  const { user } = useAuth()
  const { bookingHistory, cancelBooking } = useBooking()
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })
  const navigate = useNavigate()

  // Mock booking data - in a real app, this would come from an API
  const mockBookings = [
    {
      id: 'BK-123456789',
      tour: {
        id: '1',
        name: 'Paris City Tour',
        nameAr: 'جولة باريس المدينة',
        image: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        duration: 3,
        destination: 'Paris, France'
      },
      date: '2024-12-15',
      travelers: 2,
      status: 'confirmed',
      pricing: {
        subtotal: 598,
        tax: 59.8,
        total: 657.8
      },
      payment: {
        status: 'completed',
        method: 'credit_card',
        paidAt: '2024-10-01T10:30:00Z'
      },
      createdAt: '2024-10-01T10:00:00Z'
    },
    {
      id: 'BK-987654321',
      tour: {
        id: '2',
        name: 'Japanese Culture Experience',
        nameAr: 'تجربة الثقافة اليابانية',
        image: 'https://images.unsplash.com/photo-1540959733332-5b3d4b4f0a7f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        duration: 5,
        destination: 'Tokyo, Japan'
      },
      date: '2024-11-20',
      travelers: 1,
      status: 'paid',
      pricing: {
        subtotal: 599,
        tax: 59.9,
        total: 658.9
      },
      payment: {
        status: 'completed',
        method: 'credit_card',
        paidAt: '2024-09-28T14:20:00Z'
      },
      createdAt: '2024-09-28T14:00:00Z'
    },
    {
      id: 'BK-456789123',
      tour: {
        id: '3',
        name: 'Desert Safari Dubai',
        nameAr: ' سفاري الصحراء دبي',
        image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        duration: 1,
        destination: 'Dubai, UAE'
      },
      date: '2024-10-30',
      travelers: 4,
      status: 'cancelled',
      pricing: {
        subtotal: 356,
        tax: 35.6,
        total: 391.6
      },
      payment: {
        status: 'refunded',
        method: 'credit_card',
        paidAt: '2024-09-25T09:15:00Z'
      },
      createdAt: '2024-09-25T09:00:00Z',
      cancelledAt: '2024-09-26T11:30:00Z'
    }
  ]

  // Combine mock data with actual booking history
  const allBookings = [...bookingHistory]

  const filteredBookings = bookingHistory.filter(booking => {
    if (filter === 'all') return true
    return booking.status === filter
  })

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm(isRTL ? 'هل أنت متأكد من إلغاء هذه الحجز؟' : 'Are you sure you want to cancel this booking?')) {
      return
    }

    setLoading(true)
    try {
      await cancelBooking(bookingId)
      setMessage({
        type: 'success',
        text: isRTL ? 'تم إلغاء الحجز بنجاح' : 'Booking cancelled successfully'
      })
    } catch (error) {
      setMessage({
        type: 'error',
        text: isRTL ? 'فشل في إلغاء الحجز' : 'Failed to cancel booking'
      })
    } finally {
      setLoading(false)
    }
  }

  const getStatusInfo = (status) => {
    const statusConfig = {
      draft: {
        color: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
        icon: FiClock,
        text: isRTL ? 'مسودة' : 'Draft'
      },
      confirmed: {
        color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
        icon: FiCheck,
        text: isRTL ? 'مؤكد' : 'Confirmed'
      },
      paid: {
        color: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
        icon: FiCheck,
        text: isRTL ? 'مدفوع' : 'Paid'
      },
      cancelled: {
        color: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
        icon: FiX,
        text: isRTL ? 'ملغى' : 'Cancelled'
      },
      completed: {
        color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400',
        icon: FiStar,
        text: isRTL ? 'مكتمل' : 'Completed'
      }
    }

    return statusConfig[status] || statusConfig.draft
  }

  const getPaymentStatusInfo = (paymentStatus) => {
    const paymentConfig = {
      pending: {
        color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
        text: isRTL ? 'قيد الانتظار' : 'Pending'
      },
      completed: {
        color: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
        text: isRTL ? 'مكتمل' : 'Completed'
      },
      failed: {
        color: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
        text: isRTL ? 'فاشل' : 'Failed'
      },
      refunded: {
        color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
        text: isRTL ? 'تم الاسترداد' : 'Refunded'
      }
    }

    return paymentConfig[paymentStatus] || paymentConfig.pending
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(isRTL ? 'ar-SA' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const canCancelBooking = (booking) => {
    const bookingDate = new Date(booking.date)
    const today = new Date()
    const daysDifference = (bookingDate - today) / (1000 * 60 * 60 * 24)
    
    return booking.status === 'confirmed' || booking.status === 'paid' && daysDifference > 3
  }

  if (!user) {
    return (
      <div className={`min-h-screen py-12 ${isRTL ? 'font-arabic arabic-text' : 'font-english'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800 dark:text-white">
            {isRTL ? 'حجوزاتي' : 'My Bookings'}
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            {isRTL ? 'يجب تسجيل الدخول لعرض الحجوزات' : 'Please log in to view your bookings'}
          </p>
        </div>
      </div>
    )
  }

  useEffect(() => {
    if(bookingHistory.length === 0) {
      navigate('/destinations')
    }
  }, [navigate, bookingHistory.length])


  return (
    <div className={`min-h-screen py-12 ${isRTL ? 'font-arabic arabic-text' : 'font-english'}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
            {isRTL ? 'حجوزاتي' : 'My Bookings'}
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            {isRTL 
              ? 'إدارة ومتابعة جميع حجوزاتك في مكان واحد'
              : 'Manage and track all your bookings in one place'
            }
          </p>
        </div>

        {/* Message Display */}
        {message.text && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.type === 'success' 
              ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400'
              : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400'
          }`}>
            {message.text}
          </div>
        )}

        {/* Filters */}
        <div className="mb-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
          <div className="flex flex-wrap gap-2">
            {['all', 'confirmed', 'paid', 'cancelled', 'completed'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  filter === status
                    ? 'bg-primary-light dark:bg-primary-dark text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {status === 'all' && (isRTL ? 'الكل' : 'All')}
                {status === 'confirmed' && (isRTL ? 'مؤكد' : 'Confirmed')}
                {status === 'paid' && (isRTL ? 'مدفوع' : 'Paid')}
                {status === 'cancelled' && (isRTL ? 'ملغى' : 'Cancelled')}
                {status === 'completed' && (isRTL ? 'مكتمل' : 'Completed')}
                <span className="ml-2 rtl:mr-2 rtl:ml-0 bg-white/20 dark:bg-black/20 px-2 py-1 rounded-full text-xs">
                  {allBookings.filter(b => status === 'all' ? true : b.status === status).length}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Bookings List */}
        <div className="space-y-6">
          {filteredBookings.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <FiCalendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                {isRTL ? 'لا توجد حجوزات' : 'No Bookings Found'}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {isRTL 
                  ? 'لا توجد حجوزات تطابق معايير البحث الخاصة بك.'
                  : 'No bookings match your search criteria.'
                }
              </p>
              <Link
                to="/destinations"
                className="bg-primary-light dark:bg-primary-dark text-white px-6 py-3 rounded-lg hover:bg-primary-dark dark:hover:bg-primary-light transition-colors duration-300 inline-flex items-center gap-2"
              >
                <FiMapPin className="w-4 h-4" />
                {isRTL ? 'استكشف الوجهات' : 'Explore Destinations'}
              </Link>
            </div>
          ) : (
            filteredBookings.map((booking) => {
              const StatusIcon = getStatusInfo(booking.status).icon
              const statusConfig = getStatusInfo(booking.status)
              const paymentConfig = getPaymentStatusInfo(booking.payment?.status)

              return (
                <div key={booking.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                  <div className="p-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* Tour Image */}
                      <div className="flex-shrink-0">
                        <img
                          src={booking.tour.image}
                          alt={isRTL ? booking.tour.nameAr : booking.tour.name}
                          className="w-32 h-32 lg:w-40 lg:h-40 object-cover rounded-lg"
                        />
                      </div>

                      {/* Booking Details */}
                      <div className="flex-1">
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                              {isRTL ? booking.tour.nameAr : booking.tour.name}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 flex items-center gap-2 mb-1">
                              <FiMapPin className="w-4 h-4" />
                              {booking.tour.destination}
                            </p>
                            <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
                              <span className="flex items-center gap-1">
                                <FiCalendar className="w-4 h-4" />
                                {formatDate(booking.date)}
                              </span>
                              <span className="flex items-center gap-1">
                                <FiUsers className="w-4 h-4" />
                                {booking.travelers} {isRTL ? 'مسافر' : 'traveler(s)'}
                              </span>
                              <span className="flex items-center gap-1">
                                <FiClock className="w-4 h-4" />
                                {booking.tour.duration} {isRTL ? 'أيام' : 'days'}
                              </span>
                            </div>
                          </div>

                          <div className="mt-4 lg:mt-0 flex flex-col items-end gap-2">
                            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${statusConfig.color}`}>
                              <StatusIcon className="w-4 h-4" />
                              {statusConfig.text}
                            </span>
                            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${paymentConfig.color}`}>
                              {paymentConfig.text}
                            </span>
                          </div>
                        </div>

                        {/* Pricing and Actions */}
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                          <div className="mb-4 lg:mb-0">
                            <div className="flex items-center gap-2 text-lg font-semibold text-gray-800 dark:text-white">
                              <FiDollarSign className="w-5 h-5 text-green-600" />
                              ${booking.pricing.total}
                              <span className="text-sm text-gray-500 dark:text-gray-400 font-normal">
                                ({isRTL ? 'مدفوع' : 'paid'})
                              </span>
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {isRTL ? 'رقم الحجز:' : 'Booking ID:'} {booking.id}
                            </p>
                          </div>

                          <div className="flex flex-wrap gap-3">
                            {/* View Details */}
                            <Link
                              to={`/booking-confirmation`}
                              state={{ bookingId: booking.id }}
                              className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                            >
                              <FiEye className="w-4 h-4" />
                              {isRTL ? 'عرض التفاصيل' : 'View Details'}
                            </Link>

                            {/* Download Invoice */}
                            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                              <FiDownload className="w-4 h-4" />
                              {isRTL ? 'تحميل الفاتورة' : 'Download Invoice'}
                            </button>

                            {/* Cancel Booking */}
                            {canCancelBooking(booking) && (
                              <button
                                onClick={() => handleCancelBooking(booking.id)}
                                disabled={loading}
                                className="flex items-center gap-2 px-4 py-2 border border-red-300 dark:border-red-700 text-red-700 dark:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                {loading ? (
                                  <FiRefreshCw className="w-4 h-4 animate-spin" />
                                ) : (
                                  <FiX className="w-4 h-4" />
                                )}
                                {isRTL ? 'إلغاء الحجز' : 'Cancel Booking'}
                              </button>
                            )}

                            {/* Write Review for Completed Bookings */}
                            {booking.status === 'completed' && (
                              <button className="flex items-center gap-2 px-4 py-2 bg-primary-light dark:bg-primary-dark text-white rounded-lg hover:bg-primary-dark dark:hover:bg-primary-light transition-colors duration-200">
                                <FiStar className="w-4 h-4" />
                                {isRTL ? 'كتابة تقييم' : 'Write Review'}
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div className="bg-gray-50 dark:bg-gray-700 px-6 py-3 border-t border-gray-200 dark:border-gray-600">
                    <div className="flex flex-wrap justify-between items-center text-sm text-gray-600 dark:text-gray-400">
                      <span>
                        {isRTL ? 'تم الحجز في:' : 'Booked on:'} {formatDate(booking.createdAt)}
                      </span>
                      {booking.cancelledAt && (
                        <span className="text-red-600 dark:text-red-400">
                          {isRTL ? 'تم الإلغاء في:' : 'Cancelled on:'} {formatDate(booking.cancelledAt)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>

        {/* Quick Stats */}
        {allBookings.length > 0 && (
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 text-center">
              <div className="text-2xl font-bold text-primary-light dark:text-primary-dark mb-1">
                {allBookings.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {isRTL ? 'إجمالي الحجوزات' : 'Total Bookings'}
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">
                {allBookings.filter(b => b.status === 'paid' || b.status === 'completed').length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {isRTL ? 'حجوزات نشطة' : 'Active Bookings'}
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                {allBookings.filter(b => b.status === 'confirmed').length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {isRTL ? 'في انتظار الدفع' : 'Pending Payment'}
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 text-center">
              <div className="text-2xl font-bold text-red-600 dark:text-red-400 mb-1">
                {allBookings.filter(b => b.status === 'cancelled').length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {isRTL ? 'ملغاة' : 'Cancelled'}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default MyBookings