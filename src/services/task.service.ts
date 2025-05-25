import { ITask } from '@/interface/task.interface';
import api, { StandardResponse } from './base.service';
import { useQuery } from '@tanstack/react-query';

const getTasks = async () => {
  const response = await api.get<StandardResponse<ITask[]>>('/tasks');
  return response.data.data;
};

export const useTasks = () => {
  const { data: tasks, isLoading } = useQuery({
    queryKey: ['tasks'],
    queryFn: getTasks,
  });

  return { tasks, isLoading };
};

export const createTask = async (data: Omit<ITask, 'id'>) => {
  return await api.post<StandardResponse<ITask>>('/tasks', data);
};

export const updateTask = async ({
  id,
  body,
  signal,
}: {
  body: Partial<Omit<ITask, 'id'>>;
  id: string;
  signal?: AbortSignal;
}) => {
  return await api.patch<StandardResponse<ITask>>(`/tasks/${id}`, body, {
    signal,
  });
};

export const deleteTask = async (id: string) => {
  return await api.delete<StandardResponse<ITask>>(`/tasks/${id}`);
};
