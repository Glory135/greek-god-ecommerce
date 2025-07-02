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
      name: 'deliveryFee',
      type: 'number',
    },
    {
      name: 'totalPrice',
      type: 'number',
      admin: {
        readOnly: true,
      },
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
      name: "available sizes",
      type: "relationship",
      relationTo: "sizes",
      hasMany: true
    },
    {
      name: "images",
      type: 'array',
      minRows: 1,
      maxRows: 3,
      required: true,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'cover',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin:{
        description: "please select one of the images you have picked in the images field for the cover image"
      }
    },
    {
      name: "collection",
      type: "relationship",
      relationTo: "collections",
      hasMany: true
    },
    {
      name: "return policy",
      type: "text",
      admin:{
        description: "This is the valid time range the clothcan be returned eg: 30-days, 1-month etc."
      }
    },
    {
      name: "in stock",
      type: "checkbox",
      required: true,
      defaultValue: true
    }
  ],
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (typeof data?.price === 'number' && typeof data?.deliveryFee === 'number') {
          data.totalPrice = data?.price + data?.deliveryFee
        }
        return data
      },
    ],
  },
}