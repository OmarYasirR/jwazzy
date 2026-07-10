import { loadStripe } from '@stripe/stripe-js'

export const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

export const cardOptions = {
  style: {
    base: {
      fontSize: '16px',
      color: '#424770',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      '::placeholder': {
        color: '#aab7c4',
      },
      backgroundColor: 'transparent',
    },
    invalid: {
      color: '#9e2146',
    },
  },
  hidePostalCode: true,
}