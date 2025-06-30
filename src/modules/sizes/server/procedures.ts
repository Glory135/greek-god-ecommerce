import { baseProcedure, createTRPCRouter } from "@/trpc/init";

export const sizesRouter = createTRPCRouter({
  getMany: baseProcedure
  .query(async ({ ctx }) => {
    const data = await ctx.payload.find({
      collection: "sizes",
      sort: "label"
    })
    return data
  }),
})