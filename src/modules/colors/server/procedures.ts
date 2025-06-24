import { DEFAULT_LIMIT } from "@/constants";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { z } from "zod";

export const colorsRouter = createTRPCRouter({
  getMany: baseProcedure
  .input(
    z.object({
      cursor: z.number().default(1),
      limit: z.number().default(DEFAULT_LIMIT),
    })
  )
  .query(async ({ ctx, input }) => {
    const data = await ctx.payload.find({
      collection: "colors",
      page: input.cursor,
      limit: input.limit,
      sort: "label"
    })
    return data
  }),
})