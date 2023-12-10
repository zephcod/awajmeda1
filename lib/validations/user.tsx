import * as z from 'zod'

export const userSchema = z.object ({
    name: z.string().optional(),
    email: z.string().optional(),
    phone: z.string().optional(),
    bio: z.string().optional(),
    profilePic: z.string().optional(),
    silverCoin: z.number().optional(),
    goldCoin: z.number().optional(),
    // newsletter: z.boolean().default(false),
    createdat: z.date().optional(),

})

export type AwajUser = z.infer<typeof userSchema>