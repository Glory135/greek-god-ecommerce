import type { CollectionConfig } from 'payload';
import { cacheInvalidationHooks } from '@/lib/payload-hooks';

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
      index: true,
      access: {
        update: () => false
      }
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
  ],
  hooks: {
    afterChange: [cacheInvalidationHooks.heros],
  },
}