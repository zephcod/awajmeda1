import * as z from 'zod'

export const solutionSchema = z.object ({
    sid: z.string(),
    name: z.string(),
    description: z.string().optional(),
    category: z.string().optional().default('social_media'),
    price: z.number(),
    createdat: z.date(),
    imageLinks: z.array(z.string())
})

export type Solution = z.infer<typeof solutionSchema>

export const quickCampaignSchema = z.object ({
    sid: z.string().optional(),
    name: z.string(),
    email: z.string(),
    phone: z.string(),
    company: z.string(),
    description: z.string().optional(),
    category: z.string().optional().default('social_media'),
    budget: z.string(),
    industry: z.string(),
    location: z.string(),
    createdat: z.date(),
})

export type QuickCampaign = z.infer<typeof quickCampaignSchema>