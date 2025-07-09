import { CollectionConfig } from "payload";
import { withUsersCollection } from "payload-auth-plugin/collection";
// import { deleteLinkedAccounts } from 'payload-auth-plugin/collection/hooks'
// import { AppAccounts } from "./AppAccounts";


export const AppUsers: CollectionConfig = withUsersCollection(
  {
    slug: "appUsers",
    admin: {
      defaultColumns: ['fullName', 'email'],
      useAsTitle: 'email',
      hidden: true
    },
    fields: [
      {
        name: 'email',
        type: 'email',
        required: true,
        label: 'Email',
      },
      {
        name: 'last_name',
        label: 'Last Name',
        type: 'text',
      },
      {
        name: 'first_name',
        label: 'First Name',
        type: 'text',
      },
    ],
    timestamps: true,
  //   hooks: {
  //     afterDelete: [deleteLinkedAccounts(AppAccounts.slug)],
  // },
  },
);
