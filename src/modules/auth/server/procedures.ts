import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { headers as getHeaders } from "next/headers";
import { loginSchema, registerSchema } from "../schemas";
import { generateAuthCookies } from "../utils";

export const authRouter = createTRPCRouter({

  session: baseProcedure.query(async ({ ctx }) => {
    const headers = await getHeaders();
    const session = await ctx.payload.auth({ headers });
    return session;
  }),

  register: baseProcedure
    .input(registerSchema)
    .mutation(
      async ({ input, ctx }) => {
        const existingDataUsername = await ctx.payload.find({
          collection: "users",
          limit: 1,
          where: {
            username: {
              equals: input.username
            }
          }
        })
        const existingDataEmail = await ctx.payload.find({
          collection: "users",
          limit: 1,
          where: {
            email: {
              equals: input.email
            }
          }
        })

        const existingUser = existingDataUsername.docs[0];
        const existingEmail = existingDataEmail.docs[0];

        if (existingUser) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Username already taken!"
          })
        }
        if (existingEmail) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "A user is already using this email!"
          })
        }

        await ctx.payload.create({
          collection: "users",
          data: {
            email: input.email,
            username: input.username,
            password: input.password, // will be aut hashed
            roles: ["user"]
          }
        });

        // login after register
        const data = await ctx.payload.login({
          collection: "users",
          data: {
            email: input.email,
            password: input.password
          },
        });
        if (!data.token) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "Failed to login"
          })
        }

        await generateAuthCookies({
          prefix: ctx.payload.config.cookiePrefix,
          value: data.token
        })
      }),

  login: baseProcedure
    .input(loginSchema)
    .mutation(
      async ({ input, ctx }) => {
        const data = await ctx.payload.login({
          collection: "users",
          data: {
            email: input.email,
            password: input.password
          },
        });
        if (!data.token) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "Failed to login"
          })
        }

        await generateAuthCookies({
          prefix: ctx.payload.config.cookiePrefix,
          value: data.token
        })

        return data
      }
    ),
})