export default {
  name: 'imageGallery',
  type: 'object',
  title: 'Image Gallery',
  fields: [
    {
      name: 'images',
      type: 'array',
      title: 'Images',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
              description: 'Important for SEO and accessibility',
              validation: Rule => Rule.required()
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption'
            },
            {
              name: 'credit',
              type: 'string',
              title: 'Photo Credit'
            }
          ]
        }
      ],
      options: {
        layout: 'grid'
      }
    }
  ],
  preview: {
    select: {
      images: 'images'
    },
    prepare({images}) {
      return {
        title: 'Image Gallery',
        subtitle: `${images?.length || 0} images`,
        media: images?.[0]
      }
    }
  }
}