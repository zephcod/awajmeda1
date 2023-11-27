import * as z from "zod"

export const promptSchema = z.object({
    prompt: z.string().min(4, {
        message: "Prompt must be at least 4 characters long",
      }),
    model: z.string(),
    negative: z.string(),
    seed:z.number(),
    sampler:z.string(),
    })