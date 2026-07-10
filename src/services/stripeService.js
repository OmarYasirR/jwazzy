import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

export const stripeService = {
  async processPayment(paymentMethod, amount) {
    try {
      const stripe = await stripePromise
      
      const { error } = await stripe.confirmCardPayment('{PAYMENT_INTENT_CLIENT_SECRET}', {
        payment_method: paymentMethod.id,
      })

      if (error) {
        throw new Error(error.message)
      }

      return { success: true }
    } catch (error) {
      console.error('Payment processing error:', error)
      throw error
    }
  },

  async createPaymentIntent(amount) {
    try {
      // This would typically call your backend
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount }),
      })

      if (!response.ok) {
        throw new Error('Failed to create payment intent')
      }

      return await response.json()
    } catch (error) {
      console.error('Error creating payment intent:', error)
      throw error
    }
  }
}