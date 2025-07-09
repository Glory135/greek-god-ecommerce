import { CollectionConfig } from "payload";
import { withAccountCollection } from 'payload-auth-plugin/collection'
import { AppUsers } from "./AppUsers";

export const AppAccounts: CollectionConfig = withAccountCollection(
  {
    slug: "appAccounts",
    admin: {
      hidden: true,
    },
  },
  AppUsers.slug
);
