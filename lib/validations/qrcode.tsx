import * as z from "zod"

export const qrcodeSchema = z.object({
    url: z.string().url({message:'Please use a correct URL format (Be sure to add https://...)'})
        .min(4, {message: "Prompt must be at least 4 characters long"}),
    size: z.number().optional(),
    bgColor: z.string().optional(),
    fgColor: z.string().optional(),
    imageUrl: z.string().optional(),
    imageHeight: z.string().optional(),
    imageWidth:z.string().optional(),
    })

    export type AwajQrCode = z.infer<typeof qrcodeSchema>