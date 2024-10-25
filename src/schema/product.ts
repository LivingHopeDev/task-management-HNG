import { z } from "zod";

export const productSchema = z.object({
    name: z.string(),
    description: z.string(),
    price: z.string(),
    stockQuantity: z.string(),
    threshold: z.string()
});

export const variationSchema = z.object({
    productId: z.string(),
    type: z.string(),
    value: z.string(),
});