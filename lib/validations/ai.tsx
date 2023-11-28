import * as z from "zod"

export const promptSchema = z.object({
    prompt: z.string().min(4, {
        message: "Prompt must be at least 4 characters long",
      }),
    model: z.string().optional(),
    count: z.number().optional(),
    negative: z.string().optional(),
    sampler:z.string().optional(),
    seed:z.number().optional(),
    })