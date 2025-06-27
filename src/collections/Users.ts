import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {  
  access: {
    admin: ({ req: { user } }) => Boolean(user?.roles.includes("super-admin")),
  },
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  fields: [
    {
      name: "username",
      required: true,
      unique: true,
      type: "text"
    },
    {
      admin: {
        position: "sidebar"
      },
      name: "roles",
      required: true,
      type: "select",
      defaultValue: ["user"],
      hasMany: true,
      options: [
        "user",
        "super-admin"
      ]
    },
  ],
}
