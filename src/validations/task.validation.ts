import { z } from 'zod';

export const taskSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  priority: z.enum(['Low', 'Medium', 'High', 'Urgent'], {
    message: 'Status is required',
  }),
  status: z.enum(['ToDo', 'InProgress', 'Done'], {
    message: 'Status is required',
  }),
  dueDate: z
    .string()
    .min(1, { message: 'Due date is required' })
    .refine((val) => !isNaN(Date.parse(val)), {
      message: 'Invalid date format',
    }),
  labels: z
    .array(z.string().min(1, { message: 'Label cannot be empty' }))
    .min(1, { message: 'At least one label is required' }),
});

export type TaskType = z.infer<typeof taskSchema>;
