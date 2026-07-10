export default {
  name: 'location',
  type: 'object',
  title: 'Location',
  fields: [
    {
      name: 'address',
      type: 'string',
      title: 'Address'
    },
    {
      name: 'city',
      type: 'string',
      title: 'City'
    },
    {
      name: 'country',
      type: 'string',
      title: 'Country'
    },
    {
      name: 'latitude',
      type: 'number',
      title: 'Latitude',
      validation: Rule => Rule.min(-90).max(90)
    },
    {
      name: 'longitude',
      type: 'number',
      title: 'Longitude',
      validation: Rule => Rule.min(-180).max(180)
    },
    {
      name: 'timezone',
      type: 'string',
      title: 'Timezone'
    }
  ],
  preview: {
    select: {
      city: 'city',
      country: 'country'
    },
    prepare({city, country}) {
      return {
        title: city,
        subtitle: country
      }
    }
  }
}