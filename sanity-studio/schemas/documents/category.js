export default {
  name: "category",
  title: "Category",
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
      name: "icon",
      type: "string",
      initialValue: "🌍",
    },
  ],

  preview: {
    select: {
      title: "name",
      subtitle: "nameAr",
    },
  },
};