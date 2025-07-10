import { CollectionConfig } from "payload";
import { withUsersCollection } from "payload-auth-plugin/collection";
import { customAlphabet } from "nanoid";
// import { deleteLinkedAccounts } from 'payload-auth-plugin/collection/hooks'
// import { AppAccounts } from "./AppAccounts";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 6);

export const AppUsers: CollectionConfig = withUsersCollection(
  {
    slug: "appUsers",
    admin: {
      defaultColumns: ['fullName', 'email'],
      useAsTitle: 'email',
      hidden: true
    },
    hooks: {
      beforeValidate: [
        async ({ data, operation, req }) => {          
          if (operation === "create" && data?.email) {
            const base = data.email.split("@")[0];
            let candidate = `${base}_${nanoid()}`;
  
            // Optional: ensure it's truly unique (very unlikely to clash with nanoid)
            const existing = await req.payload.find({
              collection: "appUsers",
              where: { username: { equals: candidate } },
              limit: 1,
            });
  
            if (existing.docs.length) {
              candidate = `${base}_${nanoid()}`;
            }
  
            data.username = candidate;
          }
  
          return data;
        },
      ],
      afterChange: [
        async ({ doc, req }) => {
          if (!doc.username) {
            await req.payload.update({
              collection: "appUsers",
              id: doc.id,
              data: {
                username: `user_${doc.id}`,
              },
            });
          }
        },
      ],
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
      {
        name: "username",
        type: "text",
        required: true,
        unique: true,
      }
    ],
    timestamps: true,
  //   hooks: {
  //     afterDelete: [deleteLinkedAccounts(AppAccounts.slug)],
  // },
  },
);
