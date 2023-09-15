import { z } from "zod";
export const productSchema = z.object({
  name: z.string({
    required_error: "Name of product is required",
  }),

  category: z.string({
    required_error: "Category of product is required",
  }),

  price: z.string({
    required_error: "Price of product is required",
  }),
  desc: z.string({
    required_error: "Description of product is required"
  }),
  src: z.string({
    required_error: "Image of product is required"
  }),
  stock: z.boolean({
    required_error: 'Stock availability is required'
  })
});
