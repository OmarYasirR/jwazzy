// In your Sanity studio schemas/payment.js
export default {
  name: 'payment',
  title: 'Payment',
  type: 'document',
  fields: [
    {
      name: 'booking',
      title: 'Booking',
      type: 'reference',
      to: [{ type: 'booking' }],
      validation: Rule => Rule.required()
    },
    {
      name: 'customer',
      title: 'Customer',
      type: 'reference',
      to: [{ type: 'user' }],
      validation: Rule => Rule.required()
    },
    {
      name: 'amount',
      title: 'Amount',
      type: 'number',
      validation: Rule => Rule.required().positive()
    },
    {
      name: 'currency',
      title: 'Currency',
      type: 'string',
      initialValue: 'usd',
      options: {
        list: [
          { title: 'USD', value: 'usd' },
          { title: 'EUR', value: 'eur' },
          { title: 'GBP', value: 'gbp' }
        ]
      }
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      initialValue: 'pending',
      options: {
        list: [
          { title: 'Pending', value: 'pending' },
          { title: 'Completed', value: 'completed' },
          { title: 'Failed', value: 'failed' },
          { title: 'Refunded', value: 'refunded' }
        ]
      }
    },
    {
      name: 'paymentMethod',
      title: 'Payment Method',
      type: 'string',
      options: {
        list: [
          { title: 'Credit Card', value: 'card' },
          { title: 'PayPal', value: 'paypal' },
          { title: 'Bank Transfer', value: 'bank_transfer' }
        ]
      }
    },
    {
      name: 'transactionId',
      title: 'Transaction ID',
      type: 'string'
    },
    {
      name: 'paidAt',
      title: 'Paid At',
      type: 'datetime'
    },
    {
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString()
    },
    {
      name: 'updatedAt',
      title: 'Updated At',
      type: 'datetime'
    }
  ],
  preview: {
    select: {
      title: 'booking.tour.name',
      customer: 'customer.name',
      amount: 'amount',
      status: 'status'
    },
    prepare(selection) {
      const { title, customer, amount, status } = selection
      return {
        title: `${title} - ${customer}`,
        subtitle: `$${amount} - ${status}`
      }
    }
  }
}