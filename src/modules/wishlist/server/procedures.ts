import { Collection, Color, Media, Size } from "@/payload-types";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const wishListRouter = createTRPCRouter({
  getProducts: baseProcedure
    .input(
      z.object({
        ids: z.array(z.string())
      })
    )
    .query(async ({ ctx, input }) => {
      const data = await ctx.payload.find({
        collection: "products",
        depth: 1,  // populate category collection and image
        // pagination: true,
        where: {
          id: {
            in: input.ids
          }
        }
      })

      if (data.totalDocs !== input.ids.length) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Products not found" });
      }

      return {
        ...data,
        docs: data.docs.map((doc) => ({
          ...doc,
          ["available sizes"]: doc["available sizes"] as Size[],
          ["available colors"]: doc["available colors"] as Color[],
          collection: doc.collection as Collection[],
          images: doc.images as Array<{ image: Media }> | null,
          cover: doc.cover as Media | null,
        }))
      }
    }),
})