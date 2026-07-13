export default {
  name: "review",
  title: "Review",
  type: "document",

  fields: [
    {
      name: "tour",
      type: "reference",
      to: [{ type: "tour" }],
      validation: Rule => Rule.required(),
    },
    {
      name: "name",
      type: "string",
      validation: Rule => Rule.required(),
    },
    {
      name: "rating",
      type: "number",
      validation: Rule => Rule.required().min(1).max(5),
    },
    {
      name: "comment",
      type: "text",
      validation: Rule => Rule.required(),
    },
    {
      name: "createdAt",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      readOnly: true,
    },
  ],

  preview: {
    select: {
      title: "name",
      subtitle: "tour.name",
      rating: "rating",
    },
    prepare({ title, subtitle, rating }) {
      return {
        title,
        subtitle: `${subtitle} • ⭐ ${rating}`,
      };
    },
  },
};