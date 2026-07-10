import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { paymentIntentId } = req.body

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)

    res.status(200).json(paymentIntent)
  } catch (error) {
    console.error('Error confirming payment:', error)
    res.status(500).json({ error: error.message })
  }
}