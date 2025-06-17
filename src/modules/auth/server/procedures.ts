import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { headers as getHeaders, cookies as getCookies } from "next/headers";
import z from "zod";
import { AUTH_COOKIE } from "../constants";

export const authRouter = createTRPCRouter({

  session: baseProcedure.query(async ({ ctx }) => {
    const headers = await getHeaders();
    const session = await ctx.payload.auth({ headers });
    return session;
  }),

  register: baseProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z
          .string()
          .min(8, "password must be at least 8 characters long.")
        ,
        username: z
          .string()
          .min(3, "username must be at least 3 characters.")
          .max(63, "username must be less than 63 characters.")
          .regex(
            /^[a-z0-9][a-z0-9-]*[a-z0-9]$/,
            "username can only contain lowercase letters, numbers and hyphens, It must start and end with a letter or number."
          )
          .refine(
            (val) => !val.includes("--"),
            "username cannot contain consecutive hyphens."
          )
          .transform((val) => val.toLowerCase())
      })
    )
    .mutation(
      async ({ input, ctx }) => {
        await ctx.payload.create({
          collection: "users",
          data: {
            email: input.email,
            username: input.username,
            password: input.password // will be aut hashed
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

        const cookies = await getCookies();
        cookies.set({
          name: AUTH_COOKIE,
          value: data.token,
          httpOnly: true,
          path: "/",
          // sameSite: "none",
          // domain: ""
        })
      }),

  login: baseProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string(),
      })
    )
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

        const cookies = await getCookies();
        cookies.set({
          name: AUTH_COOKIE,
          value: data.token,
          httpOnly: true,
          path: "/",
          // sameSite: "none",
          // domain: ""
        })

        return data
      }
    ),

  logout: baseProcedure.mutation(
    async () => {
      const cookies = await getCookies();
      cookies.delete(AUTH_COOKIE);
    }
  )
})