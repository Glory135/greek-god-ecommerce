import { Category } from "@/payload-types";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import type { Where } from "payload";
import { z } from "zod";

export const productsRouter = createTRPCRouter({
  getMany: baseProcedure
    .input(
      z.object({
        category: z.string().nullable().optional(),
      })
    )
    .query(async ({ ctx, input }) => {

      const where: Where = {}

      if (input.category) {
        const categoriesData = await ctx.payload.find({
          collection: "categories",
          limit: 1,
          depth: 1,
          pagination: false,
          where: {
            slug: {
              equals: input.category
            }
          }
        })

        const formattedData = categoriesData.docs.map((doc) => ({
          ...doc,
          subcategories: (doc.subcategories?.docs ?? []).map((doc) => ({
            // because of dept 1 we know "doc" will be of type Category
            ...(doc as Category),
            subcategories: undefined
          }))
        }))

        const subCategoriesSlugs = [];
        const parentCategory = formattedData[0];
        if (parentCategory) {
          subCategoriesSlugs.push(
            ...parentCategory.subcategories.map(subCategory => subCategory.slug)
          )
        }
        where["category.slug"] = {
          in: [parentCategory.slug, ...subCategoriesSlugs]
        }
      }

      const data = await ctx.payload.find({
        collection: "products",
        depth: 1,  // populate category collection and image
        pagination: true,
        where
      })

      return data
    }),
})