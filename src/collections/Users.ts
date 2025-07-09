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
    // {
    //   name: "username",
    //   required: true,
    //   unique: true,
    //   type: "text"
    // },
    {
      name: 'last_name',
      label: 'Last Name',
      type: 'text',
      required: false
    },
    {
      name: 'first_name',
      label: 'First Name',
      type: 'text',
      required: false
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
    {
      name: 'appUserId',
      type: 'relationship',
      relationTo: 'appUsers',
      required: false,
      admin: {
        position: 'sidebar',
      },
    }
  ],
}
