import { DEFAULT_LIMIT } from "@/constants";
import { LayoutMedia } from "@/payload-types";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { z } from "zod";

export const collectionsRouter = createTRPCRouter({
  getOne: baseProcedure
    .input(
      z.object({
        slug: z.string()
      })
    )
    .query(async ({ ctx, input }) => {
      const data = await ctx.payload.find({
        collection: "collections",
        where: {
          slug: {
            equals: input.slug
          }
        },
        depth: 2,
      })

      return {
        ...data,
        docs: data.docs.map((doc) => ({
          ...doc,
          hero: doc.hero as LayoutMedia | null,
        }))[0]
      }
    }),
  getMany: baseProcedure
    .input(
      z.object({
        cursor: z.number().default(1),
        limit: z.number().default(DEFAULT_LIMIT)
      })
    )
    .query(async ({ ctx, input }) => {
      const data = await ctx.payload.find({
        collection: "collections",
        depth: 1,  // populate category collection and image
        pagination: true,
        page: input.cursor,
        limit: input.limit
      })
      return {
        ...data,
        docs: data.docs.map((doc) => ({
          ...doc,
          hero: doc.hero as LayoutMedia | null,
        }))
      }
    }),
})