import { z } from 'zod'

export const createProductSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  price: z.number().nonnegative(),
  image: z.instanceof(File),
})
