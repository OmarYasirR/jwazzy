export default {
  name: 'booking',
  type: 'document',
  title: 'Booking',
  icon: () => '📅',
  fields: [
    {
      name: 'bookingId',
      type: 'string',
      title: 'Booking ID',
      description: 'Unique booking identifier',
      validation: Rule => Rule.required(),
      readOnly: true
    },
    {
      name: 'user',
      type: 'reference',
      title: 'User',
      to: [{type: 'user'}],
      validation: Rule => Rule.required()
    },
    {
      name: 'tour',
      type: 'reference',
      title: 'Tour',
      to: [{type: 'tour'}],
      validation: Rule => Rule.required()
    },
    {
      name: 'departureDate',
      type: 'date',
      title: 'Departure Date',
      validation: Rule => Rule.required()
    },
    {
      name: 'travelers',
      type: 'array',
      title: 'Travelers',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              type: 'string',
              title: 'Full Name',
              validation: Rule => Rule.required()
            },
            {
              name: 'email',
              type: 'string',
              title: 'Email',
              validation: Rule => Rule.required().email()
            },
            {
              name: 'phone',
              type: 'string',
              title: 'Phone Number'
            },
            {
              name: 'dateOfBirth',
              type: 'date',
              title: 'Date of Birth'
            },
            {
              name: 'passportNumber',
              type: 'string',
              title: 'Passport Number'
            },
            {
              name: 'nationality',
              type: 'string',
              title: 'Nationality'
            },
            {
              name: 'specialRequirements',
              type: 'text',
              title: 'Special Requirements',
              rows: 2
            }
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'email'
            }
          }
        }
      ],
      validation: Rule => Rule.required().min(1)
    },
    {
      name: 'pricing',
      type: 'object',
      title: 'Pricing Details',
      fields: [
        {
          name: 'subtotal',
          type: 'number',
          title: 'Subtotal',
          validation: Rule => Rule.required().min(0)
        },
        {
          name: 'tax',
          type: 'number',
          title: 'Tax Amount',
          validation: Rule => Rule.required().min(0)
        },
        {
          name: 'discount',
          type: 'number',
          title: 'Discount Amount',
          initialValue: 0
        },
        {
          name: 'total',
          type: 'number',
          title: 'Total Amount',
          validation: Rule => Rule.required().min(0)
        },
        {
          name: 'currency',
          type: 'string',
          title: 'Currency',
          initialValue: 'USD'
        }
      ]
    },
    {
      name: 'payment',
      type: 'object',
      title: 'Payment Information',
      fields: [
        {
          name: 'status',
          type: 'string',
          title: 'Payment Status',
          options: {
            list: [
              'pending', 'processing', 'completed', 'failed', 'refunded', 'cancelled'
            ]
          },
          initialValue: 'pending'
        },
        {
          name: 'method',
          type: 'string',
          title: 'Payment Method',
          options: {
            list: ['credit_card', 'debit_card', 'paypal', 'bank_transfer']
          }
        },
        {
          name: 'transactionId',
          type: 'string',
          title: 'Transaction ID'
        },
        {
          name: 'paidAt',
          type: 'datetime',
          title: 'Paid At'
        },
        {
          name: 'refundAmount',
          type: 'number',
          title: 'Refund Amount'
        },
        {
          name: 'refundedAt',
          type: 'datetime',
          title: 'Refunded At'
        }
      ]
    },
    {
      name: 'status',
      type: 'string',
      title: 'Booking Status',
      options: {
        list: [
          'draft', 'confirmed', 'awaiting_payment', 'paid', 'cancelled', 'completed'
        ]
      },
      initialValue: 'draft',
      validation: Rule => Rule.required()
    },
    {
      name: 'specialRequests',
      type: 'text',
      title: 'Special Requests',
      rows: 3
    },
    {
      name: 'emergencyContact',
      type: 'object',
      title: 'Emergency Contact',
      fields: [
        {
          name: 'name',
          type: 'string',
          title: 'Contact Name'
        },
        {
          name: 'relationship',
          type: 'string',
          title: 'Relationship'
        },
        {
          name: 'phone',
          type: 'string',
          title: 'Phone Number'
        },
        {
          name: 'email',
          type: 'string',
          title: 'Email'
        }
      ]
    },
    {
      name: 'documents',
      type: 'array',
      title: 'Booking Documents',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'type',
              type: 'string',
              title: 'Document Type',
              options: {
                list: [
                  'invoice', 'voucher', 'itinerary', 'terms', 'insurance'
                ]
              }
            },
            {
              name: 'url',
              type: 'url',
              title: 'Document URL'
            },
            {
              name: 'generatedAt',
              type: 'datetime',
              title: 'Generated At'
            }
          ]
        }
      ]
    },
    {
      name: 'notes',
      type: 'array',
      title: 'Internal Notes',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'note',
              type: 'text',
              title: 'Note',
              rows: 2
            },
            {
              name: 'createdBy',
              type: 'string',
              title: 'Created By'
            },
            {
              name: 'createdAt',
              type: 'datetime',
              title: 'Created At',
              initialValue: () => new Date().toISOString()
            }
          ]
        }
      ]
    },
    {
      name: 'cancellation',
      type: 'object',
      title: 'Cancellation Details',
      fields: [
        {
          name: 'reason',
          type: 'string',
          title: 'Cancellation Reason'
        },
        {
          name: 'requestedBy',
          type: 'string',
          title: 'Requested By',
          options: {
            list: ['customer', 'admin', 'system']
          }
        },
        {
          name: 'cancelledAt',
          type: 'datetime',
          title: 'Cancelled At'
        },
        {
          name: 'refundPercentage',
          type: 'number',
          title: 'Refund Percentage',
          validation: Rule => Rule.min(0).max(100)
        }
      ]
    },
    {
      name: 'createdAt',
      type: 'datetime',
      title: 'Created At',
      initialValue: () => new Date().toISOString(),
      readOnly: true
    },
    {
      name: 'updatedAt',
      type: 'datetime',
      title: 'Updated At',
      initialValue: () => new Date().toISOString()
    }
  ],
  preview: {
    select: {
      title: 'bookingId',
      user: 'user.name',
      tour: 'tour.name',
      status: 'status'
    },
    prepare({title, user, tour, status}) {
      return {
        title: title,
        subtitle: `${user} - ${tour} (${status})`
      }
    }
  },
  orderings: [
    {
      title: 'Newest',
      name: 'createdAtDesc',
      by: [{field: 'createdAt', direction: 'desc'}]
    },
    {
      title: 'Departure Date',
      name: 'departureDateAsc',
      by: [{field: 'departureDate', direction: 'asc'}]
    }
  ]
}