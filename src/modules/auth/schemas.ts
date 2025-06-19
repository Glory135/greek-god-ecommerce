import { z } from "zod";

export const registerSchema =
  z.object({
    email: z.string().email(),
    password: z
      .string()
      .min(8, "password must be at least 8 characters long.")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        ,
        "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character (e.g., @, $, !, %, , ?, &)."
      )
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

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})