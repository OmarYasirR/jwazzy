export default {
  name: "destination",
  title: "Destination",
  type: "document",

  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      validation: Rule => Rule.required(),
    },
    {
      name: "nameAr",
      title: "Name (Arabic)",
      type: "string",
    },
    {
      name: "image",
      title: "Image",
      type: "url", // stores Unsplash URL directly
    },
    {
      name: "country",
      title: "Country",
      type: "string",
    },
    {
      name: "countryAr",
      title: "Country (Arabic)",
      type: "string",
    },
    {
      name: "region",
      title: "Region",
      type: "string",
      options: {
        list: [
          { title: "Europe", value: "europe" },
          { title: "Asia", value: "asia" },
          { title: "Middle East", value: "middle-east" },
          { title: "Africa", value: "africa" },
          { title: "North America", value: "north-america" },
          { title: "South America", value: "south-america" },
          { title: "Oceania", value: "oceania" },
        ],
      },
    },
    {
      name: "price",
      title: "Starting Price",
      type: "number",
    },
    {
      name: "duration",
      title: "Duration (Days)",
      type: "number",
    },
    {
      name: "rating",
      title: "Rating",
      type: "number",
      validation: Rule => Rule.min(1).max(5),
    },
    {
      name: "description",
      title: "Description",
      type: "text",
    },
    {
      name: "descriptionAr",
      title: "Description (Arabic)",
      type: "text",
    },
  ],

  preview: {
    select: {
      title: "name",
      subtitle: "country",
      media: "image",
    },
  },
};