import { SignupProps, type LoginProps } from '@/types/auth';
import { z } from 'zod';

export const loginSchema: z.ZodType<LoginProps> = z.object({
  email: z
    .string()
    .min(2, { message: 'Email is required' })
    .regex(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
      message: 'Enter a valid email',
    })
    .email({ message: 'Invalid email address' }),
  password: z.string().min(6, {
    message: 'Password must be longer than or equal to 6 characters.',
  }),
});

export const signupSchema: z.ZodType<SignupProps> = z.object({
  firstName: z
    .string()
    .min(2, { message: 'First name must be at least 2 characters long' })
    .regex(/^[A-Z][a-z]+$/, {
      message: 'First name must be in sentence case.',
    })
    .max(20, { message: 'First Name must be less than 20 characters' }),
  lastName: z
    .string()
    .min(2, { message: 'Last name must be at least 2 characters long' })
    .regex(/^[A-Z][a-z]+$/, {
      message: 'Last name must be in sentence case',
    })
    .max(20, { message: 'Last Name must be less than 20 characters' }),
  email: z
    .string()
    .min(2, { message: 'Email is required' })
    .regex(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
      message: 'Enter a valid email',
    })
    .email({ message: 'Invalid email address' }),
  password: z.string().min(6, {
    message: 'Password must be longer than or equal to 6 characters.',
  }),
});

export type LoginType = z.infer<typeof loginSchema>;
export type SignupType = z.infer<typeof signupSchema>;
