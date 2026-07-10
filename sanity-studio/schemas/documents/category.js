export default {
  name: 'category',
  type: 'document',
  title: 'Tour Category',
  icon: () => '🏷️',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Category Name',
      validation: Rule => Rule.required()
    },
    {
      name: 'nameAr',
      type: 'string',
      title: 'Category Name (Arabic)',
      validation: Rule => Rule.required()
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
      name: 'description',
      type: 'text',
      title: 'Description',
      rows: 3
    },
    {
      name: 'descriptionAr',
      type: 'text',
      title: 'Description (Arabic)',
      rows: 3
    },
    {
      name: 'icon',
      type: 'string',
      title: 'Icon',
      description: 'Emoji or icon name for this category',
      initialValue: '🏕️'
    },
    {
      name: 'color',
      type: 'string',
      title: 'Color Theme',
      options: {
        list: [
          'blue', 'green', 'red', 'yellow', 'purple', 'pink', 'indigo'
        ]
      },
      initialValue: 'blue'
    },
    {
      name: 'isActive',
      type: 'boolean',
      title: 'Active',
      initialValue: true
    },
    {
      name: 'sortOrder',
      type: 'number',
      title: 'Sort Order',
      description: 'Lower numbers appear first',
      initialValue: 0
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
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'description',
      icon: 'icon'
    },
    prepare({title, subtitle, icon}) {
      return {
        title: title,
        subtitle: subtitle,
        media: () => icon || '🏷️'
      }
    }
  },
  orderings: [
    {
      title: 'Sort Order',
      name: 'sortOrderAsc',
      by: [{field: 'sortOrder', direction: 'asc'}]
    },
    {
      title: 'Name, A-Z',
      name: 'nameAsc',
      by: [{field: 'name', direction: 'asc'}]
    }
  ]
}