import type { CollectionConfig } from 'payload';

export const Heros: CollectionConfig = {
  slug: "heros",
  admin: {
    useAsTitle: "slug"
  },
  fields: [
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true
    },
    {
      name: 'hero',
      type: 'upload',
      relationTo: 'layoutMedia',
      required: true,
    },
    {
      name: "title",
      type: "text",
      required: false
    },
    {
      name: "description",
      type: "text",
      required: false,
    },
  ]
}