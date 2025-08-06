import { z } from 'zod';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const signupSchema = z.object({
  name: z.string()
    .min(1, 'Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'),
  email: z.string()
    .min(1, 'Email is required')
    .regex(emailRegex, 'Please enter a valid email address'),
  password: z.string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(100, 'Password must be less than 100 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number'),
});

export const signinSchema = z.object({
  email: z.string()
    .min(1, 'Email is required')
    .regex(emailRegex, 'Please enter a valid email address'),
  password: z.string()
    .min(1, 'Password is required'),
});

export const formatValidationErrors = (errors: z.ZodError) => {
  return errors.errors.map(err => err.message).join(', ');
};

export type SignupFormData = z.infer<typeof signupSchema>;
export type SigninFormData = z.infer<typeof signinSchema>;