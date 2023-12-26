import * as z from "zod"

export const gallerySchema = z.object({
    user: z.string().optional(),
    preview: z.unknown().optional(),
    prompt: z.string().optional(),
    negprompt: z.string().optional(),
    model: z.string().optional(),
    sampler: z.string().optional(),
    seed:z.number().optional(),
    image:z.string().array().optional(),
    })

    export type AwajGallery = z.infer<typeof gallerySchema>