import type { CollectionConfig } from 'payload'
import { filesizeLimited } from './utils/validateFileSize'

export const LayoutMedia: CollectionConfig = {
  slug: 'layoutMedia',
  access: {
    read: () => true,
  },
  admin:{
    description: "Images uploaded should not be above 10MB"
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    filesizeLimited(10),
  ],
  upload: true,
}
