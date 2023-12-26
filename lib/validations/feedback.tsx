import * as z from "zod"

export const feedbackSchema = z.object({
    title: z.string().min(4, {
        message: "Title must be at least 4 characters long",
      }),
    desc: z.string().optional(),
    email: z.string().optional(),
    rate:z.number().optional(),
    images: z.string().optional(),
    // images: z
    // .unknown()
    // .refine((val) => {
    //   if (!Array.isArray(val)) return false
    //   if (val.some((file) => !(file instanceof File))) return false
    //   return true
    // }, "Must be an array of File")
    // .optional()
    // .nullable()
    // .default(null),
    })

    export type AwajFeedback = z.infer<typeof feedbackSchema>