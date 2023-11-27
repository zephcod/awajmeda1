
import * as z from "zod"

export const faqSchema = z.object({
    question: z.string().min(1, { message: "Question must be at least 1 character"}),
    answer: z.string().min(1, { message: "Answer must be at least 1 character"}),
    // tag: z.array(z.string()).nullable().default([]),
  })

export const faqTagSchema = z.object({
  tags: z.object({value:z.string(),label:z.string()}).array()
})

export const faqSuggestSchema = z.object({
  suggest: z.object({value:z.string(),label:z.string()}).array()
})

export const faqTSchema = z.object({value:z.string(),label:z.string()}).array()

export type FaqTag = z.infer<typeof faqTSchema>

export const faqIdSchema = z.object({
  _id: z.number(),
})