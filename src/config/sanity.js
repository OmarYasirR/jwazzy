import { createClient } from '@sanity/client'

export const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
  token: import.meta.env.VITE_SANITY_TOKEN,
})

// Sanity schema types we'll use
export const USER_SCHEMA = {
  name: 'user',
  type: 'document',
  title: 'User',
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
      title: 'Email Address',
      validation: Rule => Rule.required().email()
    },
    {
      name: 'password',
      type: 'string',
      title: 'Password',
      validation: Rule => Rule.required().min(6)
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
      name: 'nationality',
      type: 'string',
      title: 'Nationality'
    },
    {
      name: 'passportNumber',
      type: 'string',
      title: 'Passport Number'
    },
    {
      name: 'isVerified',
      type: 'boolean',
      title: 'Email Verified',
      initialValue: false
    },
    {
      name: 'bookings',
      type: 'array',
      title: 'Bookings',
      of: [{ type: 'reference', to: [{ type: 'booking' }] }]
    },
    {
      name: 'createdAt',
      type: 'datetime',
      title: 'Created At',
      initialValue: () => new Date().toISOString()
    },
    {
      name: 'updatedAt',
      type: 'datetime',
      title: 'Updated At',
      initialValue: () => new Date().toISOString()
    }
  ]
}