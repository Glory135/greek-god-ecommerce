import type { CollectionConfig } from 'payload'
import { cacheInvalidationHooks } from '@/lib/payload-hooks'

export const Products: CollectionConfig = {
  slug: "products",
  admin: {
    useAsTitle: 'name',
  },
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
    // {
    //   name: 'deliveryFee',
    //   type: 'number',
    // },
    // {
    //   name: 'totalPrice',
    //   type: 'number',
    //   admin: {
    //     readOnly: true,
    //   },
    // },
    {
      name: "category",
      type: "relationship",
      relationTo: "categories",
      hasMany: true,
      admin: {
        hidden: true
      }
    },
    {
      name: "collection",
      type: "relationship",
      relationTo: "productCollections",
      hasMany: true
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
      required: false,
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
      required: false,
      admin: {
        description: "please select one of the images you have picked in the images field for the cover image"
      }
    },

    // 🔹 New hybrid option for large Cloudinary images
    {
      name: "largeImages",
      type: "array",
      admin: {
        description: "Use this if your images are > 4MB (stored in Cloudinary)",
      },
      fields: [
        {
          name: "image",
          type: "relationship",
          relationTo: "largeMedia", // cloudinary collection
          required: true,
        }
      ]
    },
    {
      name: "largeCover",
      type: "relationship",
      relationTo: "largeMedia",
      admin: {
        description: "Optional Cloudinary cover image (use if >4MB)",
      }
    },

    // {
    //   name: "return policy",
    //   type: "text",
    //   admin: {
    //     description: "This is the valid time range the clothcan be returned eg: 30-days, 1-month etc."
    //   }
    // },
    {
      name: "in stock",
      type: "checkbox",
      required: true,
      defaultValue: true
    },
    {
      name: "orderCount",
      type: "number",
      required: false,
      defaultValue: 0,
      // admin:{
      //   disabled: true
      // }
    }
  ],
  hooks: {
    afterChange: [cacheInvalidationHooks.products],
  },
}