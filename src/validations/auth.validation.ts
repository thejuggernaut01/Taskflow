import { type LoginProps } from '@/types/auth';
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

export type LoginType = z.infer<typeof loginSchema>;
