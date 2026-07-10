export default {
  name: 'destination',
  type: 'document',
  title: 'Destination',
  icon: () => '📍',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Destination Name',
      validation: Rule => Rule.required().min(2).max(100)
    },
    {
      name: 'nameAr',
      type: 'string',
      title: 'Destination Name (Arabic)',
      validation: Rule => Rule.required().min(2).max(100)
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
      name: 'country',
      type: 'string',
      title: 'Country',
      validation: Rule => Rule.required()
    },
    {
      name: 'countryAr',
      type: 'string',
      title: 'Country (Arabic)',
      validation: Rule => Rule.required()
    },
    {
      name: 'region',
      type: 'string',
      title: 'Region',
      options: {
        list: [
          {title: 'Europe', value: 'europe'},
          {title: 'Asia', value: 'asia'},
          {title: 'Middle East', value: 'middle-east'},
          {title: 'North America', value: 'north-america'},
          {title: 'South America', value: 'south-america'},
          {title: 'Africa', value: 'africa'},
          {title: 'Oceania', value: 'oceania'}
        ]
      },
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
      validation: Rule => Rule.required().min(50).max(500)
    },
    {
      name: 'descriptionAr',
      type: 'text',
      title: 'Description (Arabic)',
      rows: 4,
      validation: Rule => Rule.required().min(50).max(500)
    },
    {
      name: 'highlights',
      type: 'array',
      title: 'Destination Highlights',
      of: [{type: 'string'}],
      validation: Rule => Rule.min(3).max(10)
    },
    {
      name: 'highlightsAr',
      type: 'array',
      title: 'Destination Highlights (Arabic)',
      of: [{type: 'string'}],
      validation: Rule => Rule.min(3).max(10)
    },
    {
      name: 'bestTimeToVisit',
      type: 'string',
      title: 'Best Time to Visit',
      description: 'e.g., "March to May", "Year-round"'
    },
    {
      name: 'climate',
      type: 'string',
      title: 'Climate',
      options: {
        list: [
          'Tropical', 'Temperate', 'Arid', 'Mediterranean', 'Continental', 'Polar'
        ]
      }
    },
    {
      name: 'currency',
      type: 'string',
      title: 'Local Currency',
      initialValue: 'USD'
    },
    {
      name: 'language',
      type: 'string',
      title: 'Official Language'
    },
    {
      name: 'timeZone',
      type: 'string',
      title: 'Time Zone'
    },
    {
      name: 'visaRequirements',
      type: 'text',
      title: 'Visa Requirements',
      rows: 3
    },
    {
      name: 'safetyRating',
      type: 'number',
      title: 'Safety Rating',
      description: 'Rating from 1 to 5 (5 being safest)',
      validation: Rule => Rule.min(1).max(5)
    },
    {
      name: 'popularity',
      type: 'number',
      title: 'Popularity Score',
      description: 'Internal popularity score (1-100)',
      validation: Rule => Rule.min(1).max(100)
    },
    {
      name: 'isFeatured',
      type: 'boolean',
      title: 'Featured Destination',
      initialValue: false,
      description: 'Show this destination in featured sections'
    },
    {
      name: 'isActive',
      type: 'boolean',
      title: 'Active',
      initialValue: true,
      description: 'Show this destination on the website'
    },
    {
      name: 'tours',
      type: 'array',
      title: 'Available Tours',
      of: [{type: 'reference', to: [{type: 'tour'}]}],
      description: 'Tours available in this destination'
    },
    {
      name: 'location',
      type: 'location',
      title: 'Geographic Location'
    },
    {
      name: 'tags',
      type: 'array',
      title: 'Tags',
      of: [{type: 'string'}],
      options: {
        layout: 'tags'
      }
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
      subtitle: 'country',
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
      title: 'Popularity',
      name: 'popularityDesc',
      by: [{field: 'popularity', direction: 'desc'}]
    },
    {
      title: 'Newest',
      name: 'createdAtDesc',
      by: [{field: 'createdAt', direction: 'desc'}]
    }
  ]
}