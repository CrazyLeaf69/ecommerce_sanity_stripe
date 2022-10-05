export default {
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    {
      name: "image",
      title: "Image",
      type: "array",
      of: [{ type: "image" }],
      options: {
        hotspot: true,
      },
    },
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 90,
      },
    },
    {
      name: "price",
      title: "Price",
      type: "number",
    },
    {
      name: "details",
      title: "Details",
      type: "string",
    },
    {
      name: "reviews",
      title: "Reviews",
      type: "array",
      of: [
        {
          type: "object",
          name: "reviewObj",
          fields: [
            // fields must be defined, and it must be an array
            {
              name: "user",
              type: "string",
            },
            {
              name: "comment",
              type: "string",
            },
            {
              name: "stars",
              type: "number",
              validation: Rule => Rule.required().min(1).max(5)
            },
          ],
        },
      ],
    },
  ],
};
