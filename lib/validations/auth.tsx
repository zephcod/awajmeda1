import * as z from "zod"

export const authSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  phone: z.string().min(13,{
    message: 'Please put appropriate phone number with area code. Eg. +251'
  }).max(13),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters long",
    })
    .max(100)
})

export const loginSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters long",
    })
    .max(100)
})

export const verfifyEmailSchema = z.object({
  code: z
    .string()
    .min(6, {
      message: "Verification code must be 6 characters long",
    })
    .max(6),
})

export const updatePhoneSchema = z.object({
  phone: z.string().min(13,{
    message: 'Please put appropriate phone number with area code. Eg. +251'
  }).max(13),
})

export const checkEmailSchema = z.object({
  email: authSchema.shape.email,
})

export const resetPasswordSchema = z
  .object({
    password: authSchema.shape.password,
    confirmPassword: authSchema.shape.password,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

export const userPrivateMetadataSchema = z.object({
  role: z.enum(["user", "admin"]),
  stripePriceId: z.string().optional().nullable(),
  stripeSubscriptionId: z.string().optional().nullable(),
  stripeCustomerId: z.string().optional().nullable(),
  stripeCurrentPeriodEnd: z.string().optional().nullable(),
})
