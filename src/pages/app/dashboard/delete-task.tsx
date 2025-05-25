import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ITask } from '@/interface/task.interface';
import { deleteTask } from '@/services/task.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';

type DeleteTaskProps = {
  isDeleteConfirmOpen: boolean;
  setIsDeleteConfirmOpen: React.Dispatch<React.SetStateAction<boolean>>;
  taskToDeleteId: string;
};

const DeleteTask: React.FC<DeleteTaskProps> = ({
  isDeleteConfirmOpen,
  setIsDeleteConfirmOpen,
  taskToDeleteId,
}) => {
  const queryClient = useQueryClient();

  const { mutate: mutateDeleteTask, isPending: isDeleteTaskPending } =
    useMutation({
      mutationFn: deleteTask,
      onSuccess: (response, id) => {
        if (response.status === 200 || response.status === 201) {
          queryClient.setQueryData(['tasks'], (oldData: ITask[] = []) =>
            oldData.filter((data) => data.id !== id)
          );

          queryClient.invalidateQueries({
            queryKey: ['tasks'],
          });

          setIsDeleteConfirmOpen(false);
        }
      },
    });

  const handleDelete = () => {
    if (taskToDeleteId) {
      mutateDeleteTask(taskToDeleteId);
    }
  };

  return (
    <>
      <div>
        <Dialog
          open={isDeleteConfirmOpen}
          onOpenChange={setIsDeleteConfirmOpen}
        >
          <DialogContent className="sm:max-w-md mx-4">
            <DialogHeader>
              <DialogTitle>Delete Task</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p className="text-gray-600">
                Are you sure you want to delete this task? This action cannot be
                undone.
              </p>
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setIsDeleteConfirmOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete()}
                  disabled={isDeleteTaskPending}
                  isSubmitting={isDeleteTaskPending}
                >
                  Delete Task
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default DeleteTask;
