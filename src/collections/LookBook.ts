import { CollectionConfig } from "payload";

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
}