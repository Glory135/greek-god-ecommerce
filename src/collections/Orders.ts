import type { CollectionConfig } from 'payload';

export const Orders: CollectionConfig = {
  slug: "orders",
  admin: {
    useAsTitle: "paymentReference",
  },
  fields: [
    {
      name: "paymentReference",
      type: "text",
      unique: true,
      required: true,
      access: {
        update: () => false
      }
    },
    {
      name: "paymentCompleted",
      type: "checkbox",
      access: {
        update: () => false
      }
    },
    {
      name: "amount",
      type: "text",
      required: true,
      access: {
        update: () => false
      }
    },
    {
      name: "amountPaid",
      type: "text",
      required: true,
      access: {
        update: () => false
      }
    },
    {
      name: "paymentDate",
      type: "text",
      required: true,
      access: {
        update: () => false
      }
    },
    {
      name: "paymentDescription",
      type: "text",
      required: false,
    },
    {
      name: "customerId",
      type: "relationship",
      relationTo: "users",
      access: {
        update: () => false
      }
    },
    {
      name: "productsOrdered",
      type: "relationship",
      relationTo: "products",
      hasMany: true,
      access: {
        update: () => false
      }
    },
    {
      name: "delivered",
      type: "checkbox",
      access: {
        create: ({ req: { user } }) => Boolean(user?.roles.includes("super-admin")),
        update: ({ req: { user } }) => Boolean(user?.roles.includes("super-admin")),
      }
    },
    {
      name: "dateDelivered",
      type: "date",
      access: {
        create: ({ req: { user } }) => Boolean(user?.roles.includes("super-admin")),
        update: ({ req: { user } }) => Boolean(user?.roles.includes("super-admin")),
      }
    }
  ]
}