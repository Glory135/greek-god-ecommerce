import { AlignFeature, BlockquoteFeature, BoldFeature, FixedToolbarFeature, lexicalEditor } from '@payloadcms/richtext-lexical';
import type { CollectionConfig } from 'payload';

export const Collections: CollectionConfig = {
  slug: "collections",
  admin:{
    useAsTitle: "title"
  },
  fields: [
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
      type: "richText",
      required: false,
      editor: lexicalEditor({
        features: () => [
          AlignFeature(),
          BlockquoteFeature(),
          BoldFeature(),
          FixedToolbarFeature(),
          /* ... other features ... */
        ],
      }),
    },
  ]
}