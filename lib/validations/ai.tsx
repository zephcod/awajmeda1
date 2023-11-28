import * as z from "zod"

export const promptSchema = z.object({
    prompt: z.string().min(4, {
        message: "Prompt must be at least 4 characters long",
      }),
    // model: z.string().nullable(),
    // count: z.number().nullable(),
    // negative: z.string().nullable(),
    // sampler:z.string().nullable(),
    // seed:z.number().nullable(),
    })