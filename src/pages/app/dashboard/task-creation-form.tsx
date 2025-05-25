import InputErrorWrapper from '@/components/custom/input-error-wrapper';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { AVAILABLE_LABELS } from '@/data';
import { ITask } from '@/interface/task.interface';
import { createTask, updateTask } from '@/services/task.service';
import { taskSchema, TaskType } from '@/validations/task.validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { formatISO, parseISO } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

type TaskCreationFormProps = {
  initialData?: ITask | null;
  submitLabel?: string;
  setIsCreateTaskOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const TaskCreationForm: React.FC<TaskCreationFormProps> = ({
  initialData,
  submitLabel = 'Create Task',
  setIsCreateTaskOpen,
}) => {
  const [labelInput, setLabelInput] = useState('');
  const [isLabelDropdownOpen, setIsLabelDropdownOpen] = useState(false);

  const {
    formState: { errors },
    register,
    handleSubmit,
    reset,
    control,
    watch,
    setValue,
  } = useForm<TaskType>({
    resolver: zodResolver(taskSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  useEffect(() => {
    if (initialData) {
      setValue('title', initialData.title, { shouldValidate: true });
      setValue('description', initialData.description, {
        shouldValidate: true,
      });
      setValue('priority', initialData.priority, { shouldValidate: true });
      setValue('status', initialData.status, { shouldValidate: true });
      setValue('dueDate', initialData.dueDate, { shouldValidate: true });
      setValue('labels', initialData.labels, { shouldValidate: true });
    }
  }, [initialData]);

  const currentLabels = watch('labels') || [];

  const addLabel = (label: string) => {
    const currentLabels = watch('labels') || [];
    if (label && !currentLabels.includes(label)) {
      setValue('labels', [...currentLabels, label], { shouldValidate: true });
    }
    setLabelInput('');
    setIsLabelDropdownOpen(false);
  };

  const removeLabel = (labelToRemove: string) => {
    const currentLabels = watch('labels') || [];
    const updatedLabels = currentLabels.filter(
      (label) => label !== labelToRemove
    );
    setValue('labels', updatedLabels, { shouldValidate: true });
  };

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createTask,
    onSuccess: (response) => {
      if (response.status === 200 || response.status === 201) {
        const newData = response.data.data as ITask;

        queryClient.setQueryData(['tasks'], (oldData: ITask[]): ITask[] => {
          if (!oldData) {
            return [newData];
          }

          return [...oldData, newData];
        });

        queryClient.invalidateQueries({
          queryKey: ['tasks'],
        });

        setIsCreateTaskOpen(false);

        reset();
      }
    },
  });

  const { mutate: mutateUpdateTask, isPending: isUpdateTaskPending } =
    useMutation({
      mutationFn: updateTask,
      onSuccess: (response, { id }) => {
        if (response.status === 200 || response.status === 201) {
          const newData = response.data.data as ITask;

          queryClient.setQueryData(['tasks'], (oldData: ITask[]): ITask[] => {
            if (!oldData) return [];

            return oldData.map((data) =>
              data.id === id
                ? {
                    ...newData,
                  }
                : data
            );
          });

          queryClient.invalidateQueries({
            queryKey: ['tasks'],
          });

          setIsCreateTaskOpen(false);

          reset();
        }
      },
    });

  const onSubmit = async (formValues: TaskType) => {
    const data = {
      title: formValues.title,
      description: formValues.description,
      status: formValues.status,
      priority: formValues.priority,
      dueDate: formatISO(parseISO(formValues.dueDate)),
      labels: formValues.labels,
    };

    if (initialData) {
      mutateUpdateTask({
        body: data,
        id: initialData.id,
      });
    } else {
      mutate(data);
    }
  };

  const filteredLabels = AVAILABLE_LABELS.filter(
    (label) =>
      label.toLowerCase().includes(labelInput.toLowerCase()) &&
      !currentLabels.includes(label)
  );

  return (
    <ScrollArea className="h-96">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <InputErrorWrapper error={errors.title?.message}>
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              {...register('title')}
              placeholder="Enter task title"
            />
          </div>
        </InputErrorWrapper>

        <InputErrorWrapper error={errors.description?.message}>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...register('description')}
              placeholder="Enter task description"
              rows={4}
              className="resize-none"
            />
          </div>
        </InputErrorWrapper>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputErrorWrapper error={errors.priority?.message}>
            <div>
              <Label htmlFor="priority">Priority</Label>
              <Controller
                control={control}
                name="priority"
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={(value: ITask['priority']) =>
                      field.onChange(value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </InputErrorWrapper>

          <InputErrorWrapper error={errors.status?.message}>
            <div>
              <Label htmlFor="status">Status</Label>
              <Controller
                control={control}
                name="status"
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={(value: ITask['status']) =>
                      field.onChange(value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ToDo">To Do</SelectItem>
                      <SelectItem value="InProgress">In Progress</SelectItem>
                      <SelectItem value="Done">Done</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </InputErrorWrapper>
        </div>

        {/* className="grid grid-cols-1 sm:grid-cols-2 gap-4" */}
        <div>
          {/* <div>
          <Label htmlFor="assignee">Assignee</Label>
          <Input
            id="assignee"
            value={formData.assignee}
            onChange={(e) =>
              setFormData({ ...formData, assignee: e.target.value })
            }
            placeholder="Assign to team member"
          />
        </div> */}

          {/* <InputErrorWrapper error={errors.dueDate?.message}>
          <div>
            <Label htmlFor="dueDate">Due Date</Label>
            <Controller
              name="dueDate"
              control={control}
              render={({ field }) => (
                <DatePicker value={field.value} onChange={field.onChange} />
              )}
            />
          </div>
        </InputErrorWrapper> */}

          <InputErrorWrapper error={errors.dueDate?.message}>
            <div>
              <Label htmlFor="dueDate">Due Date</Label>
              <Input
                id="dueDate"
                type="datetime-local"
                {...register('dueDate')}
                className="w-full"
              />
            </div>
          </InputErrorWrapper>
        </div>

        <div>
          <Label htmlFor="labels">Labels</Label>
          <div className="space-y-2">
            {/* Selected Labels */}
            {currentLabels.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {currentLabels.map((label: string) => (
                  <Badge
                    key={label}
                    variant="secondary"
                    className="text-xs cursor-pointer hover:bg-red-100 hover:text-red-800"
                    onClick={() => removeLabel(label)}
                  >
                    {label} ×
                  </Badge>
                ))}
              </div>
            )}

            {/* Label Input with Dropdown */}
            <div className="relative">
              <InputErrorWrapper error={errors.labels?.message}>
                <Input
                  id="labels"
                  value={labelInput}
                  onChange={(e) => {
                    setLabelInput(e.target.value);
                    setIsLabelDropdownOpen(true);
                  }}
                  onFocus={() => setIsLabelDropdownOpen(true)}
                  placeholder="Type to search or add labels..."
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      if (labelInput.trim()) {
                        addLabel(labelInput.trim());
                      }
                    }
                    if (e.key === 'Escape') {
                      setIsLabelDropdownOpen(false);
                    }
                  }}
                />
              </InputErrorWrapper>

              {/* Dropdown */}
              {isLabelDropdownOpen &&
                (labelInput || filteredLabels.length > 0) && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-40 overflow-y-auto">
                    {filteredLabels.map((label) => (
                      <button
                        key={label}
                        type="button"
                        className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                        onClick={() => addLabel(label)}
                      >
                        {label}
                      </button>
                    ))}
                    {labelInput && !AVAILABLE_LABELS.includes(labelInput) && (
                      <button
                        type="button"
                        className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 focus:bg-gray-100 focus:outline-none border-t"
                        onClick={() => addLabel(labelInput)}
                      >
                        Create "{labelInput}"
                      </button>
                    )}
                  </div>
                )}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2 pt-4">
          <DialogClose>
            <Button
              type="button"
              variant="outline"
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto"
            disabled={isPending || isUpdateTaskPending}
            isSubmitting={isPending || isUpdateTaskPending}
          >
            {submitLabel}
          </Button>
        </div>
      </form>
    </ScrollArea>
  );
};

export default TaskCreationForm;
