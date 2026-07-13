export default {
  name: "booking",
  title: "Booking",
  type: "document",

  fields: [
    {
      name: "tour",
      type: "reference",
      to: [{ type: "tour" }],
      validation: Rule => Rule.required(),
    },
    {
      name: "customerName",
      type: "string",
      validation: Rule => Rule.required(),
    },
    {
      name: "email",
      type: "string",
      validation: Rule => Rule.required().email(),
    },
    {
      name: "phone",
      type: "string",
    },
    {
      name: "travelers",
      type: "number",
      initialValue: 1,
    },
    {
      name: "departureDate",
      type: "date",
    },
    {
      name: "totalPrice",
      type: "number",
    },
    {
      name: "status",
      type: "string",
      options: {
        list: [
          { title: "Pending", value: "pending" },
          { title: "Confirmed", value: "confirmed" },
          { title: "Cancelled", value: "cancelled" },
        ],
      },
      initialValue: "pending",
    },
    {
      name: "specialRequest",
      type: "text",
    },
  ],

  preview: {
    select: {
      title: "customerName",
      subtitle: "tour.name",
    },
  },
};