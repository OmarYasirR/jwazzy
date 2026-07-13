export default {
  name: "tour",
  title: "Tour",
  type: "document",

  fields: [
    {
      name: "name",
      type: "string",
      validation: Rule => Rule.required(),
    },
    {
      name: "nameAr",
      type: "string",
    },
    {
      name: "destination",
      type: "reference",
      to: [{ type: "destination" }],
    },
    {
      name: "image",
      type: "url",
    },
    {
      name: "price",
      type: "number",
    },
    {
      name: "duration",
      title: "Duration (Days)",
      type: "number",
    },
    {
      name: "rating",
      type: "number",
      validation: Rule => Rule.min(1).max(5),
    },
    {
      name: "description",
      type: "text",
    },
    {
      name: "descriptionAr",
      type: "text",
    },
    {
      name: "isFeatured",
      type: "boolean",
      initialValue: false,
    },
  ],

  preview: {
    select: {
      title: "name",
      subtitle: "destination.name",
      media: "image",
    },
  },
};