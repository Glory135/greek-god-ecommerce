import { CONTACT_DETAILS } from "@/constants";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { z } from "zod";

export const contactRouter = createTRPCRouter({
  contactUs: baseProcedure
    .input(z.object({
      fullname: z.string(),
      email: z.string().email(),
      subject: z.string(),
      order: z.string(),
      message: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      try {
        const emailSubject = `User Message - ${input.subject}`
        const emailHtml = `
        <h2>A user on GreekGod sent you this mail</h2>
        <hr/ >
        <p><b>User Name:</b> ${input.fullname}</p>
        <p><b>User Email:</b> ${input.email}</p>
        <p><b>Order Ref:</b> ${input.order}</p>
        <hr/ >
        <p>
        ${input.message}
        </p>
        `
        await ctx.payload.sendEmail({
          to: CONTACT_DETAILS.support_email,
          subject: emailSubject,
          html: emailHtml,
        });
      } catch (error) {
        console.error('Failed to send message :', error);
      }
    })
})