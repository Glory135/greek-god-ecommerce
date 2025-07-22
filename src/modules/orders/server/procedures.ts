import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { createOrderInputSchema, orderOutputSchema, ProductSnapshot } from "../types";
import { z } from "zod";
import { DEFAULT_LIMIT } from "@/constants";
import { CONTACT_DETAILS } from "../../../constants";
import { formatPrice } from "@/lib/utils";

export const ordersRouter = createTRPCRouter({
  // Create a new order
  createOrder: baseProcedure
    .input(createOrderInputSchema)
    .mutation(async ({ ctx, input }) => {
      const order = await ctx.payload.create({
        collection: "orders",
        data: {
          paymentReference: input.paymentReference,
          transactionReference: input.transactionReference,
          paymentCompleted: input.paymentCompleted,
          amount: input.amount,
          deliveryFee: input.deliveryFee,
          amountPaid: input.amountPaid,
          paymentDate: input.paymentDate,
          paymentDescription: input.paymentDescription,
          customerId: input.customerId,
          userEmail: input.userEmail,
          // @ts-expect-error its correct
          addressSnapshot: input.addressSnapshot,
          productsSnapshot: input.productsSnapshot, // Store full product snapshot as JSON
          productsOrdered: input.productsOrdered,
          status: input.status || "pending",
        }
      });

      // const SUPPORT_PHONE = CONTACT_DETAILS.support_phone;
      const SUPPORT_EMAIL = CONTACT_DETAILS.support_email;

      // Send notification email to app owner
      try {
        const ownerSubject = `New Order Received: ${input.paymentReference || input.transactionReference}`;
        // Calculate the delivery fee as the highest among the products

        const ownerHtml = `
          <h2>New Order Notification</h2>
          <p><b>Order Reference:</b> ${input.paymentReference || input.transactionReference}</p>
          <p><b>Status:</b> ${input.paymentCompleted ? 'Paid' : 'Pending'}</p>
          <p><b>Amount:</b> ${formatPrice(input.amount)}</p>
          <p><b>Payment Date:</b> ${input.paymentDate}</p>
          <h3>Customer Info</h3>
          <ul>
            <li><b>Name:</b> ${input.addressSnapshot?.firstname || ''} ${input.addressSnapshot?.lastname || ''}</li>
            <li><b>Email:</b> ${input.userEmail}</li>
            <li><b>Phone:</b> ${input.addressSnapshot?.phone || ''}</li>
            <li><b>Address:</b> ${input.addressSnapshot?.address || ''}${input.addressSnapshot?.appartment ? ", " + input.addressSnapshot.appartment : ''}, ${input.addressSnapshot?.city || ''}</li>
          </ul>
          <h3>Order Items</h3>
          <table border="1" cellpadding="6" cellspacing="0" style="border-collapse:collapse; min-width:400px;">
            <thead>
              <tr style="background:#f3f3f3;">
                <th>Image</th>
                <th>Product</th>
                <th>Size</th>
                <th>Color</th>
                <th>Qty</th>
                <th>Unit Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${input.productsSnapshot.map((prod: ProductSnapshot) => `
                <tr>
                  <td style="text-align:center;">${prod.image ? `<img src="${prod.image}" alt="${prod.name}" width="50" height="50" style="object-fit:cover;border-radius:6px;" />` : ''}</td>
                  <td>${prod.name}</td>
                  <td>${prod.size || '-'}</td>
                  <td>${prod.color || '-'}</td>
                  <td>${prod.quantity}</td>
                  <td>${formatPrice(prod.price.toLocaleString())}</td>
                  <td>${formatPrice((prod.price * prod.quantity).toLocaleString())}</td>
                </tr>
              `).join('')}
              <tr>
                <td colspan="6" style="text-align:right;font-weight:bold;">Delivery Fee</td>
                <td style="font-weight:bold;">${formatPrice(input?.deliveryFee?.toLocaleString() || "0")}</td>
              </tr>
              <tr>
                <td colspan="6" style="text-align:right;font-weight:bold;">Total Order</td>
                <td style="font-weight:bold;">${formatPrice(input.amount)}</td>
              </tr>
            </tbody>
          </table>
        `;
        await ctx.payload.sendEmail({
          to: CONTACT_DETAILS.order_email,
          subject: ownerSubject,
          html: ownerHtml,
        });
      } catch (err) {
        console.error('Failed to send order notification email:', err);
      }

      // Send receipt email to user (commented out for now)
      try {
        const userSubject = `Order Receipt - GreekGod`;
        // Calculate the delivery fee as the highest among the products

        const userHtml = `
          <h2>Thank you for your order!</h2>
          <p>Your order has been received and is being processed.</p>
          <p><b>Order Reference:</b> ${input.paymentReference || input.transactionReference}</p>
          <p><b>Status:</b> ${input.paymentCompleted ? 'Paid' : 'Pending'}</p>
          <p><b>Amount:</b> ${formatPrice(input.amount)}</p>
          <p><b>Payment Date:</b> ${input.paymentDate}</p>
          <h3>Order Items</h3>
          <table border="1" cellpadding="6" cellspacing="0" style="border-collapse:collapse; min-width:400px;">
            <thead>
              <tr style="background:#f3f3f3;">
                <th>Image</th>
                <th>Product</th>
                <th>Size</th>
                <th>Color</th>
                <th>Qty</th>
                <th>Unit Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${input.productsSnapshot.map(prod => `
                <tr>
                  <td style="text-align:center;">${prod.image ? `<img src="${prod.image}" alt="${prod.name}" width="50" height="50" style="object-fit:cover;border-radius:6px;" />` : ''}</td>
                  <td>${prod.name}</td>
                  <td>${prod.size || '-'}</td>
                  <td>${prod.color || '-'}</td>
                  <td>${prod.quantity}</td>
                  <td>${formatPrice(prod.price.toLocaleString())}</td>
                  <td>${formatPrice((prod.price * prod.quantity).toLocaleString())}</td>
                </tr>
              `).join('')}
              <tr>
                <td colspan="6" style="text-align:right;font-weight:bold;">Delivery Fee</td>
                <td style="font-weight:bold;">${formatPrice(input?.deliveryFee?.toLocaleString() || "0")}</td>
              </tr>
              <tr>
                <td colspan="6" style="text-align:right;font-weight:bold;">Total Order</td>
                <td style="font-weight:bold;">${formatPrice(input.amount)}</td>
              </tr>
            </tbody>
          </table>
          <p style="margin-top:16px;"><b>Total:</b>${formatPrice(input.amount)}</p>
          <hr />
          <p>If you have any questions or want to check your order status, contact us at <b>${SUPPORT_EMAIL}</b>.</p>
        `;
        await ctx.payload.sendEmail({
          to: input.userEmail,
          subject: userSubject,
          html: userHtml,
        });
      } catch (err) {
        console.error('Failed to send user receipt email:', err);
      }

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


  // Infinite/paginated query for user orders
  getOrdersByUser: baseProcedure
    .input(z.object({
      userId: z.string(),
      cursor: z.number().default(1),
      limit: z.number().default(DEFAULT_LIMIT),
    }))
    .query(async ({ ctx, input }) => {
      const data = await ctx.payload.find({
        collection: "orders",
        where: {
          customerId: {
            equals: input.userId,
          },
        },
        sort: "-createdAt",
        page: input.cursor,
        limit: input.limit
      });

      return data
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