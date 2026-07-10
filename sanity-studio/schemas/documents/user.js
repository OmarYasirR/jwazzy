export default {
  name: 'user',
  type: 'document',
  title: 'User',
  icon: () => '👤',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Full Name',
      validation: Rule => Rule.required().min(2).max(100)
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
      title: 'Password Hash',
      description: 'Hashed password (set by the application)',
      validation: Rule => Rule.required(),
      readOnly: true
    },
    {
      name: 'phone',
      type: 'string',
      title: 'Phone Number',
      validation: Rule => Rule.regex(/^\+?[\d\s-()]+$/).error('Please enter a valid phone number')
    },
    {
      name: 'dateOfBirth',
      type: 'date',
      title: 'Date of Birth'
    },
    {
      name: 'nationality',
      type: 'string',
      title: 'Nationality',
      options: {
        list: [
          {title: 'Saudi Arabia', value: 'SA'},
          {title: 'United Arab Emirates', value: 'AE'},
          {title: 'United States', value: 'US'},
          {title: 'United Kingdom', value: 'UK'},
          {title: 'Canada', value: 'CA'},
          {title: 'France', value: 'FR'},
          {title: 'Germany', value: 'DE'},
          {title: 'Japan', value: 'JP'},
          {title: 'Egypt', value: 'EG'},
          {title: 'Qatar', value: 'QA'},
          {title: 'Kuwait', value: 'KW'},
          {title: 'Oman', value: 'OM'},
          {title: 'Bahrain', value: 'BH'}
        ]
      }
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
      initialValue: false,
      description: 'Whether the user has verified their email address'
    },
    {
      name: 'isActive',
      type: 'boolean',
      title: 'Account Active',
      initialValue: true,
      description: 'Deactivate to prevent user from logging in'
    },
    {
      name: 'role',
      type: 'string',
      title: 'Role',
      options: {
        list: [
          {title: 'User', value: 'user'},
          {title: 'Admin', value: 'admin'},
          {title: 'Manager', value: 'manager'}
        ]
      },
      initialValue: 'user',
      validation: Rule => Rule.required()
    },
    {
      name: 'bookings',
      type: 'array',
      title: 'Bookings',
      of: [{type: 'reference', to: [{type: 'booking'}]}],
      description: 'Bookings made by this user'
    },
    {
      name: 'preferences',
      type: 'object',
      title: 'User Preferences',
      fields: [
        {
          name: 'language',
          type: 'string',
          title: 'Preferred Language',
          options: {
            list: [
              {title: 'English', value: 'en'},
              {title: 'Arabic', value: 'ar'}
            ]
          },
          initialValue: 'en'
        },
        {
          name: 'currency',
          type: 'string',
          title: 'Preferred Currency',
          options: {
            list: [
              {title: 'USD - US Dollar', value: 'USD'},
              {title: 'EUR - Euro', value: 'EUR'},
              {title: 'SAR - Saudi Riyal', value: 'SAR'},
              {title: 'AED - UAE Dirham', value: 'AED'}
            ]
          },
          initialValue: 'USD'
        },
        {
          name: 'notifications',
          type: 'object',
          title: 'Notification Preferences',
          fields: [
            {
              name: 'email',
              type: 'boolean',
              title: 'Email Notifications',
              initialValue: true
            },
            {
              name: 'sms',
              type: 'boolean',
              title: 'SMS Notifications',
              initialValue: false
            },
            {
              name: 'promotional',
              type: 'boolean',
              title: 'Promotional Emails',
              initialValue: false
            }
          ]
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
      title: 'name',
      subtitle: 'email',
      role: 'role'
    },
    prepare({title, subtitle, role}) {
      return {
        title: title,
        subtitle: `${subtitle} (${role})`,
        media: () => '👤'
      }
    }
  },
  orderings: [
    {
      title: 'Name, A-Z',
      name: 'nameAsc',
      by: [{field: 'name', direction: 'asc'}]
    },
    {
      title: 'Name, Z-A',
      name: 'nameDesc',
      by: [{field: 'name', direction: 'desc'}]
    },
    {
      title: 'Newest',
      name: 'createdAtDesc',
      by: [{field: 'createdAt', direction: 'desc'}]
    }
  ]
}