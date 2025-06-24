import { sortValues } from "@/hooks/search-params";
import { Category } from "@/payload-types";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import type { Sort, Where } from "payload";
import { z } from "zod";

export const productsRouter = createTRPCRouter({
  getMany: baseProcedure
    .input(
      z.object({
        category: z.string().nullable().optional(),
        minPrice: z.string().nullable().optional(),
        maxPrice: z.string().nullable().optional(),
        colors: z.array(z.string()).nullable().optional(),
        sort: z.enum(sortValues).nullable().optional()
      })
    )
    .query(async ({ ctx, input }) => {
      const where: Where = {}
      let sort: Sort = "-createdAt";


      // Sorting Logic start
      if (input.sort === "featured") {
        sort = "-createdAt"
      }
      if (input.sort === "oldest") {
        sort = "+createdAt"
      }
      if (input.sort === "newest") {
        sort = "-createdAt"
      }
      if (input.sort === "bestseller") {
        sort = "name"
      }
      if (input.sort === "pricel") {
        sort = "price"
      }
      if (input.sort === "priceh") {
        sort = "-price"
      }
      // Sorting Logic end

      // price filter logic
      if (input.minPrice && input.maxPrice) {
        where.price = {
          greater_than_equal: input.minPrice,
          less_than_equal: input.maxPrice
        }
      } else if (input.minPrice) {
        where.price = {
          greater_than_equal: input.minPrice,
        }
      } else if (input.maxPrice) {
        where.price = {
          less_than_equal: input.maxPrice
        }
      }

      // category / subcategory filter logic
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
          where["category.slug"] = {
            in: [parentCategory.slug, ...subCategoriesSlugs]
          }
        }
      }

      // Color filter logic
      if (input.colors && input.colors.length > 0) {
        where["available colors.label"] = {
          in: input.colors
        }
      }

      const data = await ctx.payload.find({
        collection: "products",
        depth: 1,  // populate category collection and image
        // pagination: true,
        where,
        sort,
      })

      return data
    }),
})