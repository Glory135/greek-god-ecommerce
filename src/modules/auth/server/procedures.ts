import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { headers as getHeaders } from "next/headers";
import { loginSchema, registerSchema } from "../schemas";
import { generateAuthCookies } from "../utils";
import { z } from "zod";

export const authRouter = createTRPCRouter({

  session: baseProcedure.query(async ({ ctx }) => {
    const headers = await getHeaders();
    const session = await ctx.payload.auth({ headers });

    // If the session user is from appUsers, look up the corresponding user in users
    // @ts-expect-error just a check
    if (session?.user?.collection === 'appUsers' && session.user.email !== undefined) {
      const users = await ctx.payload.find({
        collection: 'users',
        where: { email: { equals: session.user.email } },
        limit: 1,
      });
      if (users.docs.length) {
        // Replace the session user with the one from the users collection
        return { ...session, user: { ...users.docs[0], collection: 'users' } };
      }
    }
    // Otherwise, return as is (already from users)
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
            first_name: input.first_name,
            last_name: input.last_name,
            password: input.password, // will be auto hashed
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

  verifyEmail: baseProcedure
    .input(z.object({
      token: z.string().min(1, "Verification token is required")
    }))
    .mutation(async ({ input, ctx }) => {
      try {
        // Call Payload's verifyEmail method
        const isVerified = await ctx.payload.verifyEmail({
          collection: 'users',
          token: input.token,
        });

        if (!isVerified) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Email verification failed. The token may be invalid or expired."
          });
        }

        return {
          success: true,
          message: "Email verified successfully!",
        };
      } catch (error) {
        if (error instanceof TRPCError) {
          throw error;
        }

        console.error("Email verification error:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to verify email. Please try again."
        });
      }
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

  googleAuthCallback: baseProcedure.mutation(async ({ ctx }) => {
    const headers = await getHeaders();
    const session = await ctx.payload.auth({ headers });
    const appUser = session?.user;

    if (!appUser?.email) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'OAuth session invalid or missing email',
      });
    }

    const email = appUser.email;

    // Check if user already exists in our main 'users' collection
    const existing = await ctx.payload.find({
      collection: 'users',
      where: {
        email: { equals: email },
      },
      limit: 1,
    });

    if (!existing.docs.length) {
      // Create new user in 'users' collection
      try {
        await ctx.payload.create({
          collection: 'users',
          data: {
            email,
            first_name: appUser?.first_name,
            last_name: appUser?.last_name,
            username: appUser.username,
            roles: ['user'],
            password: `${Date.now()}-${Math.random()}`,
            appUserId: appUser.id,
            _verified: true
          },
        });
      } catch (err) {
        console.error("❌ Failed to create user in 'users':", err);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error creating user from Google login",
          cause: err,
        });
      }
    } else {
      try {
        await ctx.payload.update({
          collection: "users",
          where: {
            email: { equals: email }
          },
          data: {
            username: appUser.username,
            appUserId: appUser.id,
            _verified: true,
          }
        });
      } catch (err) {
        console.error("❌ Failed to update user in 'users':", err);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error updating user from Google login",
          cause: err,
        });
      }
    }

    return session;
  }),
})