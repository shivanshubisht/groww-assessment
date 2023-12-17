import { z } from "zod";

export const productSchema = z.object({
  products: z.array(
    z.object({
      id: z.number(),
      title: z.string(),
      price: z.number(),
      image: z.string(),
      quantity: z.number(),
    }),
  ),
  paymentMethods: z.array(z.string()),
});

export const merchantSchema = z.object({
  merchantName: z.string(),
  merchantLogo: z.string(),
  theme: z.object({
    "--background": z.string(),
    "--foreground": z.string(),
    "--primary": z.string(),
    "--primary-foreground": z.string(),
  }),
});
