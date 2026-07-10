export default {
  name: 'price',
  type: 'object',
  title: 'Price',
  fields: [
    {
      name: 'amount',
      type: 'number',
      title: 'Amount',
      validation: Rule => Rule.required().min(0)
    },
    {
      name: 'currency',
      type: 'string',
      title: 'Currency',
      options: {
        list: [
          {title: 'US Dollar', value: 'USD'},
          {title: 'Euro', value: 'EUR'},
          {title: 'Saudi Riyal', value: 'SAR'},
          {title: 'UAE Dirham', value: 'AED'}
        ]
      },
      initialValue: 'USD'
    },
    {
      name: 'discount',
      type: 'number',
      title: 'Discount Percentage',
      description: 'Percentage discount (0-100)',
      validation: Rule => Rule.min(0).max(100)
    },
    {
      name: 'discountedAmount',
      type: 'number',
      title: 'Discounted Amount',
      description: 'Automatically calculated'
    },
    {
      name: 'isOnSale',
      type: 'boolean',
      title: 'On Sale',
      initialValue: false
    },
    {
      name: 'saleStarts',
      type: 'datetime',
      title: 'Sale Starts'
    },
    {
      name: 'saleEnds',
      type: 'datetime',
      title: 'Sale Ends'
    }
  ],
  preview: {
    select: {
      amount: 'amount',
      currency: 'currency',
      discount: 'discount'
    },
    prepare({amount, currency, discount}) {
      const finalAmount = discount ? amount * (1 - discount / 100) : amount
      return {
        title: `${finalAmount} ${currency}`,
        subtitle: discount ? `${discount}% off from ${amount}` : 'Regular price'
      }
    }
  }
}