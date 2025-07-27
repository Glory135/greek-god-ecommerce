import type { CollectionConfig } from 'payload';
import { cacheInvalidationHooks } from '@/lib/payload-hooks';

export const Categories: CollectionConfig = {
  slug: "categories",
  admin: {
    useAsTitle: "name",
    hidden: true,
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true
    },
    {
      name: "parent",
      type: "relationship",
      relationTo: "categories",
      hasMany: false,
    },
    {
      name: "subcategories",
      type: "join",
      collection: "categories",
      on: "parent",
      hasMany: true
    }
  ],
  hooks: {
    afterChange: [cacheInvalidationHooks.categories],
  },
}