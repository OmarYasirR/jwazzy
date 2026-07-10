export default {
  name: 'tour',
  type: 'document',
  title: 'Tour',
  icon: () => '🚗',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Tour Name',
      validation: Rule => Rule.required().min(5).max(100)
    },
    {
      name: 'nameAr',
      type: 'string',
      title: 'Tour Name (Arabic)',
      validation: Rule => Rule.required().min(5).max(100)
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'name',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'destination',
      type: 'reference',
      title: 'Destination',
      to: [{type: 'destination'}],
      validation: Rule => Rule.required()
    },
    {
      name: 'category',
      type: 'reference',
      title: 'Category',
      to: [{type: 'category'}],
      validation: Rule => Rule.required()
    },
    {
      name: 'mainImage',
      type: 'image',
      title: 'Main Image',
      options: {
        hotspot: true
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'gallery',
      type: 'imageGallery',
      title: 'Image Gallery'
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description',
      rows: 4,
      validation: Rule => Rule.required().min(100).max(1000)
    },
    {
      name: 'descriptionAr',
      type: 'text',
      title: 'Description (Arabic)',
      rows: 4,
      validation: Rule => Rule.required().min(100).max(1000)
    },
    {
      name: 'duration',
      type: 'number',
      title: 'Duration (Days)',
      validation: Rule => Rule.required().min(1).max(365)
    },
    {
      name: 'groupSize',
      type: 'number',
      title: 'Maximum Group Size',
      validation: Rule => Rule.required().min(1).max(100)
    },
    {
      name: 'difficulty',
      type: 'string',
      title: 'Difficulty Level',
      options: {
        list: [
          {title: 'Easy', value: 'easy'},
          {title: 'Moderate', value: 'moderate'},
          {title: 'Challenging', value: 'challenging'},
          {title: 'Expert', value: 'expert'}
        ]
      },
      initialValue: 'easy'
    },
    {
      name: 'price',
      type: 'price',
      title: 'Pricing',
      validation: Rule => Rule.required()
    },
    {
      name: 'included',
      type: 'array',
      title: 'What\'s Included',
      of: [{type: 'string'}],
      validation: Rule => Rule.min(1)
    },
    {
      name: 'includedAr',
      type: 'array',
      title: 'What\'s Included (Arabic)',
      of: [{type: 'string'}],
      validation: Rule => Rule.min(1)
    },
    {
      name: 'excluded',
      type: 'array',
      title: 'What\'s Excluded',
      of: [{type: 'string'}]
    },
    {
      name: 'excludedAr',
      type: 'array',
      title: 'What\'s Excluded (Arabic)',
      of: [{type: 'string'}]
    },
    {
      name: 'itinerary',
      type: 'array',
      title: 'Tour Itinerary',
      of: [
        {
          type: 'object',
          name: 'itineraryDay',
          title: 'Day',
          fields: [
            {
              name: 'day',
              type: 'number',
              title: 'Day Number',
              validation: Rule => Rule.required().min(1)
            },
            {
              name: 'title',
              type: 'string',
              title: 'Day Title',
              validation: Rule => Rule.required()
            },
            {
              name: 'titleAr',
              type: 'string',
              title: 'Day Title (Arabic)',
              validation: Rule => Rule.required()
            },
            {
              name: 'description',
              type: 'text',
              title: 'Activities Description',
              rows: 3,
              validation: Rule => Rule.required()
            },
            {
              name: 'descriptionAr',
              type: 'text',
              title: 'Activities Description (Arabic)',
              rows: 3,
              validation: Rule => Rule.required()
            },
            {
              name: 'meals',
              type: 'array',
              title: 'Meals Included',
              of: [{type: 'string'}],
              options: {
                list: ['Breakfast', 'Lunch', 'Dinner', 'Snacks']
              }
            },
            {
              name: 'accommodation',
              type: 'string',
              title: 'Accommodation'
            }
          ],
          preview: {
            select: {
              title: 'title',
              day: 'day'
            },
            prepare({title, day}) {
              return {
                title: `Day ${day}: ${title}`
              }
            }
          }
        }
      ]
    },
    {
      name: 'departureDates',
      type: 'array',
      title: 'Available Departure Dates',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'date',
              type: 'date',
              title: 'Departure Date',
              validation: Rule => Rule.required()
            },
            {
              name: 'availableSpots',
              type: 'number',
              title: 'Available Spots',
              validation: Rule => Rule.required().min(0)
            },
            {
              name: 'isGuaranteed',
              type: 'boolean',
              title: 'Guaranteed Departure',
              initialValue: false
            }
          ],
          preview: {
            select: {
              date: 'date',
              spots: 'availableSpots',
              guaranteed: 'isGuaranteed'
            },
            prepare({date, spots, guaranteed}) {
              return {
                title: new Date(date).toLocaleDateString(),
                subtitle: `${spots} spots ${guaranteed ? '✓' : ''}`
              }
            }
          }
        }
      ]
    },
    {
      name: 'requirements',
      type: 'array',
      title: 'Tour Requirements',
      of: [{type: 'string'}]
    },
    {
      name: 'requirementsAr',
      type: 'array',
      title: 'Tour Requirements (Arabic)',
      of: [{type: 'string'}]
    },
    {
      name: 'rating',
      type: 'number',
      title: 'Average Rating',
      description: 'Calculated average rating (1-5)',
      validation: Rule => Rule.min(1).max(5)
    },
    {
      name: 'reviewCount',
      type: 'number',
      title: 'Review Count',
      description: 'Total number of reviews',
      initialValue: 0
    },
    {
      name: 'bookingsCount',
      type: 'number',
      title: 'Total Bookings',
      description: 'Total number of bookings for this tour',
      initialValue: 0
    },
    {
      name: 'isFeatured',
      type: 'boolean',
      title: 'Featured Tour',
      initialValue: false
    },
    {
      name: 'isActive',
      type: 'boolean',
      title: 'Active',
      initialValue: true,
      description: 'Show this tour on the website'
    },
    {
      name: 'seo',
      type: 'object',
      title: 'SEO Settings',
      fields: [
        {
          name: 'metaTitle',
          type: 'string',
          title: 'Meta Title'
        },
        {
          name: 'metaDescription',
          type: 'text',
          title: 'Meta Description',
          rows: 3
        },
        {
          name: 'keywords',
          type: 'array',
          title: 'Keywords',
          of: [{type: 'string'}]
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
      subtitle: 'destination.name',
      media: 'mainImage',
      featured: 'isFeatured'
    },
    prepare({title, subtitle, media, featured}) {
      return {
        title: title,
        subtitle: `${subtitle} ${featured ? '⭐' : ''}`,
        media: media
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
      title: 'Rating',
      name: 'ratingDesc',
      by: [{field: 'rating', direction: 'desc'}]
    },
    {
      title: 'Price',
      name: 'priceAsc',
      by: [{field: 'price.amount', direction: 'asc'}]
    }
  ]
}