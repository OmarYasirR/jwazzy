export default {
  name: 'bookingReference',
  type: 'object',
  title: 'Booking Reference',
  fields: [
    {
      name: 'booking',
      type: 'reference',
      title: 'Booking',
      to: [{type: 'booking'}]
    },
    {
      name: 'status',
      type: 'string',
      title: 'Status'
    },
    {
      name: 'notes',
      type: 'text',
      title: 'Notes'
    }
  ]
}