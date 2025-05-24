import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
import React, { useState } from 'react';

type TaskCreationFormProps = {
  onSubmit: (task: Partial<ITask>) => void;
  initialData?: ITask;
  submitLabel?: string;
};

const TaskCreationForm: React.FC<TaskCreationFormProps> = ({
  onSubmit,
  initialData,
  submitLabel = 'Create Task',
}) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    priority: (initialData?.priority || 'medium') as ITask['priority'],
    status: (initialData?.status || 'todo') as ITask['status'],
    assignee: initialData?.assignee || '',
    dueDate: initialData?.dueDate || '',
    labels: initialData?.labels || ([] as string[]),
  });

  const [labelInput, setLabelInput] = useState('');
  const [isLabelDropdownOpen, setIsLabelDropdownOpen] = useState(false);

  const addLabel = (label: string) => {
    if (label && !formData.labels.includes(label)) {
      setFormData({ ...formData, labels: [...formData.labels, label] });
    }
    setLabelInput('');
    setIsLabelDropdownOpen(false);
  };

  const removeLabel = (labelToRemove: string) => {
    setFormData({
      ...formData,
      labels: formData.labels.filter((label) => label !== labelToRemove),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    if (!initialData) {
      setFormData({
        title: '',
        description: '',
        priority: 'medium',
        status: 'todo',
        assignee: '',
        dueDate: '',
        labels: [],
      });
    }
  };

  const filteredLabels = AVAILABLE_LABELS.filter(
    (label) =>
      label.toLowerCase().includes(labelInput.toLowerCase()) &&
      !formData.labels.includes(label)
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Enter task title"
          required
        />
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          placeholder="Enter task description"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="priority">Priority</Label>
          <Select
            value={formData.priority}
            onValueChange={(value: ITask['priority']) =>
              setFormData({ ...formData, priority: value })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="urgent">Urgent</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="status">Status</Label>
          <Select
            value={formData.status}
            onValueChange={(value: ITask['status']) =>
              setFormData({ ...formData, status: value })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todo">To Do</SelectItem>
              <SelectItem value="inprogress">In Progress</SelectItem>
              <SelectItem value="done">Done</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="assignee">Assignee</Label>
          <Input
            id="assignee"
            value={formData.assignee}
            onChange={(e) =>
              setFormData({ ...formData, assignee: e.target.value })
            }
            placeholder="Assign to team member"
          />
        </div>

        <div>
          <Label htmlFor="dueDate">Due Date</Label>
          <Input
            id="dueDate"
            type="date"
            value={formData.dueDate}
            onChange={(e) =>
              setFormData({ ...formData, dueDate: e.target.value })
            }
          />
        </div>
      </div>

      <div>
        <Label htmlFor="labels">Labels</Label>
        <div className="space-y-2">
          {/* Selected Labels */}
          {formData.labels.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {formData.labels.map((label) => (
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
          <Button type="button" variant="outline" className="w-full sm:w-auto">
            Cancel
          </Button>
        </DialogClose>
        <Button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto"
        >
          {submitLabel}
        </Button>
      </div>
    </form>
  );
};

export default TaskCreationForm;
