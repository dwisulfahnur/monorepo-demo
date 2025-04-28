import { z } from 'zod'

export const updateUserSchema = z.object({
  totalAverageWeightRatings: z.number(),
  numberOfRents: z.number(),
})
