import type { CollectionConfig } from 'payload';

export const LayoutMedia: CollectionConfig = {
  slug: 'layoutMedia',
  access: {
    read: () => true,
  },
  admin: {
    description: "Images uploaded should not be above 4MB.",
    useAsTitle: "alt"
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: true, // keep for legacy
};
