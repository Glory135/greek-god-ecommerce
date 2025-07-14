import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { createOrderInputSchema, orderOutputSchema } from "../types";
import { z } from "zod";

export const ordersRouter = createTRPCRouter({
  // Create a new order
  createOrder: baseProcedure
    .input(createOrderInputSchema)
    .mutation(async ({ ctx, input }) => {
      // No need to create delivery address record, just store the JSON
      const order = await ctx.payload.create({
        collection: "orders",
        data: {
          paymentReference: input.paymentReference,
          transactionReference: input.transactionReference,
          paymentCompleted: input.paymentCompleted,
          amount: input.amount,
          amountPaid: input.amountPaid,
          paymentDate: input.paymentDate,
          paymentDescription: input.paymentDescription,
          customerId: input.customerId,
          userEmail: input.userEmail,
          // @ts-expect-error its correct
          addressSnapshot: input.addressSnapshot,
          productsSnapshot: input.productsSnapshot.map(p => p.id), // Store product IDs as relationships
          productsOrdered: input.productsOrdered,
          status: input.status || "pending",
        }
      });
      return { success: true, order };
    }),

  // Get order by ID
  getOrderById: baseProcedure
    .input(z.object({ orderId: z.string() }))
    .query(async ({ ctx, input }) => {
      const order = await ctx.payload.findByID({
        collection: "orders",
        id: input.orderId,
      });
      return orderOutputSchema.parse(order);
    }),

  // Get all orders for a user
  getOrdersByUser: baseProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const orders = await ctx.payload.find({
        collection: "orders",
        where: {
          customerId: {
            equals: input.userId,
          },
        },
        sort: "-createdAt",
      });
      return orders.docs.map(order => orderOutputSchema.parse(order));
    }),

  // Update order status
  updateOrderStatus: baseProcedure
    .input(z.object({
      orderId: z.string(),
      status: z.enum(["pending", "paid", "delivered", "cancelled"]),
    }))
    .mutation(async ({ ctx, input }) => {
      const updated = await ctx.payload.update({
        collection: "orders",
        id: input.orderId,
        data: {
          status: input.status,
        },
      });
      return { success: true, order: orderOutputSchema.parse(updated) };
    }),
}); 