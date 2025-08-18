import { DEFAULT_LIMIT } from "@/constants";
import { LargeMedia, LayoutMedia } from "@/payload-types";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { z } from "zod";

export const lookBookRouter = createTRPCRouter({
  getMany: baseProcedure
    .input(
      z.object({
        cursor: z.number().default(1),
        limit: z.number().default(DEFAULT_LIMIT)
      })
    )
    .query(async ({ ctx, input }) => {
      const data = await ctx.payload.find({
        collection: "lookBook",
        depth: 1,  // populate category collection and image
        pagination: true,
        page: input.cursor,
        limit: input.limit
      })
      return {
        ...data,
        docs: data.docs.map((doc) => ({
          ...doc,
          image: doc.image as LayoutMedia | null,
          imageLarge: doc.imageLarge as LargeMedia | null,
        }))
      }
    }),
})