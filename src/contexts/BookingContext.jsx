import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { sanityClient } from '../lib/sanityClient'
import { useAuth } from '../contexts/AuthContext'
import { calculateTotal } from '../services/helpers'

const BookingContext = createContext()

export const useBooking = () => {
  const context = useContext(BookingContext)
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider')
  }
  return context
}

// Pricing calculation helper
// const calculateTotal = (travelers, basePrice) => {
//   if (!travelers || !basePrice) {
//     return {
//       subtotal: 0,
//       tax: 0,
//       total: 0
//     }
//   }
  
//   const priceValue = typeof basePrice === 'string' 
//     ? parseFloat(basePrice.replace(/[^\d.-]/g, '')) 
//     : basePrice
  
//   const subtotal = priceValue * travelers
//   const tax = subtotal * 0.1 // 10% tax
//   const total = subtotal + tax
  
//   return {
//     subtotal: Math.round(subtotal * 100) / 100,
//     tax: Math.round(tax * 100) / 100,
//     total: Math.round(total * 100) / 100
//   }
// }

export const BookingProvider = ({ children }) => {
  const { user } = useAuth()
  const [bookingDetails, setBookingDetails] = useState({
    tour: null,
    date: '',
    travelers: 1,
    customerInfo: {
      name: '',
      email: '',
      phone: '',
      specialRequests: ''
    },
    pricing: {
      subtotal: 0,
      tax: 0,
      total: 0
    },
    status: 'draft'
  })

  const [bookingHistory, setBookingHistory] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Load booking history from Sanity
  const loadBookingHistory = useCallback(async () => {
    if (!user) return
    
    try {
      setLoading(true)
      const query = `*[_type == "booking" && customer._ref == $userId] | order(createdAt desc) {
        _id,
        tour->{
          _id,
          name,
          nameAr,
          price,
          duration,
          images
        },
        date,
        travelers,
        customerInfo,
        pricing,
        status,
        paymentDetails,
        confirmedAt,
        paidAt,
        cancelledAt,
        createdAt
      }`
      
      const bookings = await sanityClient.fetch(query, { userId: user._id })
      setBookingHistory(bookings)
    } catch (error) {
      console.error('Error loading booking history:', error)
      setError('Failed to load booking history')
    } finally {
      setLoading(false)
    }
  }, [user])

  // Load booking history when user changes
  useEffect(() => {
    loadBookingHistory()
  }, [loadBookingHistory])

  const setTour = useCallback((tour) => {
    setBookingDetails(prev => ({
      ...prev,
      tour,
      pricing: calculateTotal(prev.travelers, tour?.price || 0)
    }))
  }, [])

  const setDate = useCallback((date) => {
    setBookingDetails(prev => ({ ...prev, date }))
  }, [])

  const setTravelers = useCallback((travelers) => {
    setBookingDetails(prev => ({
      ...prev,
      travelers,
      pricing: calculateTotal(travelers, prev.tour?.price || 0)
    }))
  }, [])

  const setCustomerInfo = useCallback((customerInfo) => {
    setBookingDetails(prev => ({ 
      ...prev, 
      customerInfo: { ...prev.customerInfo, ...customerInfo } 
    }))
  }, [])

  // Save booking to Sanity
  const confirmBooking = useCallback(async () => {
    if (!bookingDetails.tour || !bookingDetails.date || !bookingDetails.customerInfo.name) {
      throw new Error('Missing required booking information')
    }

    if (!user) {
      throw new Error('User must be logged in to confirm booking')
    }

    try {
      setLoading(true)
      
      // Create booking document in Sanity
      const bookingDoc = {
        _type: 'booking',
        tour: {
          _type: 'reference',
          _ref: bookingDetails.tour._id,
        },
        customer: {
          _type: 'reference',
          _ref: user._id,
        },
        date: bookingDetails.date,
        travelers: bookingDetails.travelers,
        customerInfo: bookingDetails.customerInfo,
        pricing: bookingDetails.pricing,
        status: 'confirmed',
        confirmedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }

      const createdBooking = await sanityClient.create(bookingDoc)
      
      // Add to local state
      const confirmedBooking = {
        ...bookingDetails,
        _id: createdBooking._id,
        id: createdBooking._id, // For backward compatibility
        status: 'confirmed',
        confirmedAt: new Date().toISOString()
      }

      setBookingHistory(prev => [confirmedBooking, ...prev])
      
      // Reset to initial state
      setBookingDetails({
        tour: null,
        date: '',
        travelers: 1,
        customerInfo: {
          name: '',
          email: '',
          phone: '',
          specialRequests: ''
        },
        pricing: {
          subtotal: 0,
          tax: 0,
          total: 0
        },
        status: 'draft'
      })

      return confirmedBooking
    } catch (error) {
      console.error('Error confirming booking:', error)
      throw new Error('Failed to confirm booking. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [bookingDetails, user])

  // Mark booking as paid in Sanity
  const markAsPaid = useCallback(async (bookingId, paymentDetails) => {
    try {
      setLoading(true)
      
      // Update booking in Sanity
      const updatedBooking = await sanityClient
        .patch(bookingId)
        .set({
          status: 'paid',
          paidAt: new Date().toISOString(),
          paymentDetails: paymentDetails,
          updatedAt: new Date().toISOString()
        })
        .commit()

      // Update local state
      setBookingHistory(prev => 
        prev.map(booking => 
          booking._id === bookingId 
            ? { 
                ...booking, 
                status: 'paid', 
                paidAt: new Date().toISOString(),
                paymentDetails 
              }
            : booking
        )
      )

      return updatedBooking
    } catch (error) {
      console.error('Error marking booking as paid:', error)
      throw new Error('Failed to update payment status')
    } finally {
      setLoading(false)
    }
  }, [])

  // Cancel booking in Sanity
  const cancelBooking = useCallback(async (bookingId) => {
    try {
      setLoading(true)
      
      // Update booking in Sanity
      const updatedBooking = await sanityClient
        .patch(bookingId)
        .set({
          status: 'cancelled',
          cancelledAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        })
        .commit()

      // Update local state
      setBookingHistory(prev => 
        prev.map(booking => 
          booking._id === bookingId 
            ? { 
                ...booking, 
                status: 'cancelled', 
                cancelledAt: new Date().toISOString() 
              }
            : booking
        )
      )

      return updatedBooking
    } catch (error) {
      console.error('Error cancelling booking:', error)
      throw new Error('Failed to cancel booking')
    } finally {
      setLoading(false)
    }
  }, [])

  const getBookingById = useCallback((bookingId) => {
    return bookingHistory.find(booking => booking._id === bookingId || booking.id === bookingId)
  }, [bookingHistory])

  const clearCurrentBooking = useCallback(() => {
    setBookingDetails({
      tour: null,
      date: '',
      travelers: 1,
      customerInfo: {
        name: '',
        email: '',
        phone: '',
        specialRequests: ''
      },
      pricing: {
        subtotal: 0,
        tax: 0,
        total: 0
      },
      status: 'draft'
    })
  }, [])

  const hasValidBooking = useCallback(() => 
    bookingDetails.tour && 
    bookingDetails.date && 
    bookingDetails.customerInfo.name &&
    bookingDetails.customerInfo.email
  , [bookingDetails])

  const clearError = useCallback(() => {
    setError('')
  }, [])

  const value = {
    bookingDetails,
    bookingHistory,
    loading,
    error,
    setTour,
    setDate,
    setTravelers,
    setCustomerInfo,
    confirmBooking,
    markAsPaid,
    cancelBooking,
    getBookingById,
    clearCurrentBooking,
    hasValidBooking,
    clearError,
    refreshBookings: loadBookingHistory
  }

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  )
}