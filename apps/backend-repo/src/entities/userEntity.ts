import { z } from 'zod'

export const updateUserSchema = z.object({
  totalAverageWeightRatings: z.number().optional(),
  numberOfRents: z.number().optional(),
})
