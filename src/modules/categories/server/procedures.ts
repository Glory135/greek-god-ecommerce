import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { Category } from '@/payload-types';

export const categoriesRouter = createTRPCRouter({
  getMany: baseProcedure.query(async ({ ctx }) => {

    const data = await ctx.payload.find({
      collection: "categories",
      depth: 1, // populate sub categories
      pagination: false,
      where: {
        parent: {
          exists: false,
        }
      },
      sort: "name"
    })

    const formattedData = data.docs.map((doc) => ({
      ...doc,
      subcategories: (doc.subcategories?.docs ?? []).map((doc) => ({
        // because of dept 1 we know "doc" will be of type Category
        ...(doc as Category),
        subcategories: undefined
      }))
    }))

    return formattedData
  }),
})