// StripeContext.jsx
import React, { createContext, useContext, useState, useCallback } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { sanityClient } from '../lib/sanityClient'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

const StripeContext = createContext()

export const useStripe = () => {
  const context = useContext(StripeContext)
  if (!context) {
    throw new Error('useStripe must be used within a StripeProvider')
  }
  return context
}

export const StripeProvider = ({ children }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Create payment intent with Stripe API
  const createPaymentIntent = useCallback(async (bookingData) => {
    try {
      setLoading(true)
      setError('')

      // FIRST: Create Stripe Payment Intent
      const stripeResponse = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: bookingData.amount,
          currency: bookingData.currency || 'usd',
          metadata: {
            bookingId: bookingData.bookingId,
            customerId: bookingData.customerId,
          },
        }),
      })

      if (!stripeResponse.ok) {
        throw new Error('Failed to create Stripe payment intent')
      }

      const { clientSecret, paymentIntentId } = await stripeResponse.json()

      if (!clientSecret) {
        throw new Error('No client secret received from Stripe')
      }

      // SECOND: Create payment record in Sanity
      const paymentDoc = {
        _type: 'payment',
        booking: {
          _type: 'reference',
          _ref: bookingData.bookingId,
        },
        amount: bookingData.amount,
        currency: bookingData.currency || 'usd',
        status: 'pending',
        paymentMethod: 'card',
        stripePaymentIntentId: paymentIntentId, // Store Stripe ID
        customer: {
          _type: 'reference',
          _ref: bookingData.customerId,
        },
        createdAt: new Date().toISOString(),
      }

      const createdPayment = await sanityClient.create(paymentDoc)

      return {
        success: true,
        paymentId: createdPayment._id,
        clientSecret: clientSecret, // Now this will be a valid client secret
        paymentIntentId: paymentIntentId,
      }
    } catch (error) {
      console.error('Error creating payment intent:', error)
      setError(error.message)
      return {
        success: false,
        error: error.message,
      }
    } finally {
      setLoading(false)
    }
  }, [])

  // Confirm payment in Sanity
  const confirmPayment = useCallback(async (paymentId, paymentData) => {
    try {
      setLoading(true)
      setError('')

      const updatedPayment = await sanityClient
        .patch(paymentId)
        .set({
          status: 'completed',
          transactionId: paymentData.paymentIntentId, // Use Stripe payment intent ID
          paymentMethod: paymentData.method,
          paidAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        })
        .commit()

      return {
        success: true,
        payment: updatedPayment,
      }
    } catch (error) {
      console.error('Error confirming payment:', error)
      setError('Failed to confirm payment')
      return {
        success: false,
        error: error.message,
      }
    } finally {
      setLoading(false)
    }
  }, [])

  // Get payment by ID
  const getPayment = useCallback(async (paymentId) => {
    try {
      const query = `*[_type == "payment" && _id == $paymentId][0]{
        _id,
        amount,
        currency,
        status,
        paymentMethod,
        transactionId,
        stripePaymentIntentId,
        customer->{_id, name, email},
        booking->{_id, tour->{name, nameAr}, date, travelers},
        createdAt,
        paidAt
      }`

      const payment = await sanityClient.fetch(query, { paymentId })
      return payment
    } catch (error) {
      console.error('Error fetching payment:', error)
      throw error
    }
  }, [])

  const value = {
    createPaymentIntent,
    confirmPayment,
    getPayment,
    loading,
    error,
    clearError: () => setError(''),
  }

  return (
    <Elements stripe={stripePromise}>
      <StripeContext.Provider value={value}>
        {children}
      </StripeContext.Provider>
    </Elements>
  )
}