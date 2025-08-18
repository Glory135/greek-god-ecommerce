// import { AlignFeature, BlockquoteFeature, BoldFeature, FixedToolbarFeature, lexicalEditor } from '@payloadcms/richtext-lexical';
import type { CollectionConfig } from 'payload';
import { cacheInvalidationHooks } from '@/lib/payload-hooks';

export const ProductCollection: CollectionConfig = {
  slug: "productCollections",
  admin: {
    useAsTitle: "title"
  },
  fields: [
    {
      name: 'hero',
      type: 'upload',
      relationTo: 'layoutMedia',
      required: false,
    },
    {
      name: 'heroLarge',
      type: 'relationship',
      relationTo: 'largeMedia',
      required: false,
    },
    {
      name: "title",
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
      name: "description",
      type: "text",
      required: false,
    },
    // {
    //   name: "products",
    //   type: "relationship",
    //   relationTo: "products",
    //   hasMany: true
    // },
  ],
  hooks: {
    afterChange: [cacheInvalidationHooks.collections],
  },
}