import { z } from 'zod';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const signupSchema = z.object({
  name: z.string().min(3, 'at least 3 characters required'),
  email: z.string().regex(emailRegex, 'enter valid email'),
  password: z.string().min(6, 'minmum length of 6 is required'),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
