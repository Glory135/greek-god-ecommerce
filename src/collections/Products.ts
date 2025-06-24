import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: "products",
  fields: [
    {
      name: "name",
      type: "text",
      required: true
    },
    {
      name: "description",
      type: "text"
    },
    {
      name: "price",
      type: "number",
      required: true,
      admin: {
        description: "Price In Naira"
      }
    },
    {
      name: "category",
      type: "relationship",
      relationTo: "categories",
      hasMany: true,
      required: true
    },
    {
      name: "available colors",
      type: "relationship",
      relationTo: "colors",
      hasMany: true
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media"
    },
    {
      name: "collection",
      type: "relationship",
      relationTo: "collections",
      hasMany: true
    }
  ]
}