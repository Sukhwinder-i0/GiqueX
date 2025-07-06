import { z } from 'zod';

export const reviewSchema = z.object({
  gigId: z.string().length(24, 'Invalid gig ID'),
  rating: z.number().min(1).max(5),
  comment: z.string().optional(),
});
