import { CollectionConfig } from "payload";
import { cacheInvalidationHooks } from '@/lib/payload-hooks';

export const LookBook: CollectionConfig = {
  slug: 'lookBook',
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: "layoutMedia",
      required: true,
    },
    {
      name: "title",
      type: "text",
      required: true
    }
  ],
  hooks: {
    afterChange: [cacheInvalidationHooks.lookbook],
  },
}