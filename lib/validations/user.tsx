import * as z from 'zod'

export const userSchema = z.object ({
    
    name: z.string(),
    email: z.string().optional(),
    phone: z.string().optional(),
    bio: z.string().optional(),
    profilePic: z
    .unknown()
    .refine((val) => {
      if (!Array.isArray(val)) return false
      if (val.some((file) => !(file instanceof File))) return false
      return true
    }, "Must be an array of File")
    .optional()
    .nullable()
    .default(null),
    coin: z.number().optional(),
    // goldCoin: z.number().optional(),
    // newsletter: z.boolean().default(false),
    createdat: z.date().optional(),

})

export type AwajUser = z.infer<typeof userSchema>