import * as z from "zod"

export const promptSchema = z.object({
    prompt: z.string()
            .min(4, {message: "Prompt must be at least 4 characters long",})
            .max(1000,{message: "Prompt can't exceed 1000 characters long",})
            .optional(),
    model: z.string().optional().default('absolute_reality_1_8_1'),
    modelXL: z.string().optional().default('juggernautxl_1024px'),
    count: z.number().nonnegative(),
    negative: z.string().optional(),
    sampler:z.string().optional(),
    seed:z.number().optional(),
    height:z.number().optional(),
    width:z.number().optional(),
    guidance:z.number().optional(),
    steps:z.number().optional(),
    images: z
    .unknown()
    .refine((val) => {
      if (!Array.isArray(val)) return false
      if (val.some((file) => !(file instanceof File))) return false
      return true
    }, "Must be an array of File")
    .optional()
    .nullable()
    .default(null),
    })

export const imguploadSchema = z.object({
  images: z
  .unknown()
  .optional()
  .nullable()
  .default(null),
  })