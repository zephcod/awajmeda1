import * as z from "zod"

export const melaSchema = z.object({
    // clientid: z.string().min(1, { message: "Question must be at least 1 character"}),
    count: z.number(),
    // tag: z.array(z.string()).nullable().default([]),
  })

export const melaIdSchema = z.object({
_id: z.number(),
})