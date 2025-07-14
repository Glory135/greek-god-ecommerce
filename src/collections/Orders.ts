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
      name: "transactionReference",
      type: "text",
      required: false,
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
      name: "userEmail",
      type: "text",
      required: true,
      access: {
        update: () => false
      }
    },
    {
      name: "addressSnapshot",
      type: "json",
      required: true,
      access: {
        update: () => false
      }
    },
    {
      name: "productsSnapshot",
      type: "json",
      required: true,
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
      name: "status",
      type: "select",
      options: [
        { label: "Pending", value: "pending" },
        { label: "Paid", value: "paid" },
        { label: "Delivered", value: "delivered" },
        { label: "Cancelled", value: "cancelled" },
      ],
      defaultValue: "pending",
    },
    {
      name: "delivered",
      type: "checkbox",
    },
    {
      name: "dateDelivered",
      type: "date",
    }
  ]
}