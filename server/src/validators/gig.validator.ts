import { z } from 'zod';

export const createGigSchema = z.object({
  title: z.string().min(3, 'min 3 characters required'),
  description: z.string().min(10, 'min 10 characters required'),
  price: z.number().min(1, 'enter a valid price'),
  tags: z.array(z.string()).optional(),
});

export const updateGigSchema = createGigSchema.partial();
