import * as z from "zod"

export const cartItemSchema = z.object({
  productId: z.number().default(0),
  quantity: z.number().min(0),
  // productSubcategory: z.string().optional().nullable(),
})

export const checkoutItemSchema = cartItemSchema.extend({
  price: z.number(),
})

export const cartLineItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  images: z.array(z.string()).nullable(),
  // category: z.enum(solutions.subcategory.enumValues),
  subcategory: z.string().optional().nullable(),
  price: z.string().regex(/^\d+(\.\d{1,2})?$/),
  inventory: z.number().default(0),
  storeid: z.number(),
  storeName: z.string().optional().nullable(),
  quantity: z.number().min(0).default(1),
})

export const deleteCartItemSchema = z.object({
  productId: z.number(),
})

export const deleteCartItemsSchema = z.object({
  productIds: z.array(z.number()),
})

export const updateCartItemSchema = z.object({
  quantity: z.number().min(0).default(1),
})
