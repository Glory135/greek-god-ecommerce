import type { CollectionConfig } from 'payload';

export const DeliveryAddresses: CollectionConfig = {
  slug: "deliveryAddresses",
  admin: {
    useAsTitle: "address",
  },
  fields: [
    {
      name: "customerId",
      type: "relationship",
      relationTo: "users",
      access: {
        update: () => false
      }
    },
    {
      name: "firstname",
      type: "text",
      required: false,
    },
    {
      name: "lastname",
      type: "text",
      required: false,
    },
    {
      name: "address",
      type: "text",
      required: true,
    },
    {
      name: "appartment",
      type: "text",
      required: false,
    },
    {
      name: "city",
      type: "text",
      required: true,
    },
    {
      name: "phone",
      type: "text",
      required: true,
    },
  ]
}