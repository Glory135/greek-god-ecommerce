import type { CollectionConfig } from 'payload';

export const Sizes: CollectionConfig = {
  slug: "sizes",
  admin: {
    useAsTitle: "label"
  },
  fields: [
    {
      name: "label",
      type: "text",
      unique: true,
      required: true
    },
    {
      name: "size",
      type: "text",
      required: true,
      unique: true,
    },
  ]
}