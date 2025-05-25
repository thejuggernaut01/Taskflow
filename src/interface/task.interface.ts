import { TaskPriorityTypes, TaskStatusTypes } from '@/types/task.interface';

export interface ITask {
  id: string;
  title: string;
  description: string;
  status: TaskStatusTypes;
  priority: TaskPriorityTypes;
  // assignee: string;
  dueDate: string;
  labels: string[];
}
