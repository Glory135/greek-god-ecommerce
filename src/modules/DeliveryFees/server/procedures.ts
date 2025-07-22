import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { z } from "zod";


export const deliveryFeesRouter = createTRPCRouter({
  getDeliveryFee: baseProcedure
    .input(z.object({
      state: z.string({
        required_error: "State is required",
        invalid_type_error: "State must be a string"
      }).min(1, "Customer ID cannot be empty")
    }))
    .query(async ({ input, ctx }) => {
      try {
        // Check if user exists
        const deliveryFee = await ctx.payload.find({
          collection: "deliveryFees",
          where: {
            state: {
              equals: input.state
            }
          }
        });

        if (!deliveryFee) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "State not found"
          });
        }

        return {
          success: true,
          data: deliveryFee.docs,
          deliveryFee: deliveryFee.docs[0]?.deliveryFee
        };
      } catch (error) {
        if (error instanceof TRPCError) {
          throw error;
        }

        console.error("Error fetching delivery Fee:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch delivery Fee. Please try again."
        });
      }
    })
})