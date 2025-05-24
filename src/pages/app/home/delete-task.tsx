import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ITask } from '@/interface/task.interface';
import React from 'react';

type DeleteTaskProps = {
  isDeleteConfirmOpen: boolean;
  setIsDeleteConfirmOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onDeleteTask: () => void;
  taskToDelete: ITask;
};

const DeleteTask: React.FC<DeleteTaskProps> = ({
  isDeleteConfirmOpen,
  setIsDeleteConfirmOpen,
  onDeleteTask,
  taskToDelete,
}) => {
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
                Are you sure you want to delete "{taskToDelete?.title}"? This
                action cannot be undone.
              </p>
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setIsDeleteConfirmOpen(false)}
                >
                  Cancel
                </Button>
                <Button variant="destructive" onClick={onDeleteTask}>
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
