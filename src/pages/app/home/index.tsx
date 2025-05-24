import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Plus, Search, Filter, ChevronDown, Kanban } from 'lucide-react';
import { ITask } from '@/interface/task.interface';
import DeleteTask from './delete-task';
import TaskCreationForm from './task-creation-form';
import TaskCard from './task-card';
import { INITIAL_TASKS } from '@/data/tasks';

const STATUS_COLUMN = {
  todo: { title: 'To Do', color: 'bg-gray-50' },
  inprogress: { title: 'In Progress', color: 'bg-blue-50' },
  done: { title: 'Done', color: 'bg-green-50' },
};

export default function Home() {
  const [tasks, setTasks] = useState<ITask[]>(INITIAL_TASKS);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false);
  const [isEditTaskOpen, setIsEditTaskOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<ITask | null>(null);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<ITask | null>(null);

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority =
      filterPriority === 'all' || task.priority === filterPriority;
    const matchesStatus =
      filterStatus === 'all' || task.status === filterStatus;
    return matchesSearch && matchesPriority && matchesStatus;
  });

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const { source, destination, draggableId } = result;

    // If dropped in the same position, do nothing
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    // Find the task being dragged by its ID
    const draggedTask = tasks.find((task) => task.id === draggableId);
    if (!draggedTask) return;

    // Create a new array of tasks
    const newTasks = [...tasks];

    // Update the status of the dragged task
    const updatedTask = {
      ...draggedTask,
      status: destination.droppableId as 'todo' | 'inprogress' | 'done',
    };

    // Replace the task in the array
    const taskIndex = newTasks.findIndex((task) => task.id === draggableId);
    if (taskIndex !== -1) {
      newTasks[taskIndex] = updatedTask;
    }

    setTasks(newTasks);
  };

  const createTask = (taskData: Partial<ITask>) => {
    const newTask: ITask = {
      id: Date.now().toString(),
      title: taskData.title || '',
      description: taskData.description || '',
      status: taskData.status || 'todo',
      priority: taskData.priority || 'medium',
      assignee: taskData.assignee || '',
      dueDate: taskData.dueDate || '',
      labels: taskData.labels || [],
    };
    setTasks([...tasks, newTask]);
    setIsCreateTaskOpen(false);
  };

  const editTask = (taskData: Partial<ITask>) => {
    if (!editingTask) return;

    const updatedTasks = tasks.map((task) =>
      task.id === editingTask.id ? { ...task, ...taskData } : task
    );
    setTasks(updatedTasks);
    setIsEditTaskOpen(false);
    setEditingTask(null);
  };

  const duplicateTask = (task: ITask) => {
    const duplicatedTask: ITask = {
      ...task,
      id: Date.now().toString(),
      title: `${task.title} (Copy)`,
    };
    setTasks([...tasks, duplicatedTask]);
  };

  const deleteTask = () => {
    if (!taskToDelete) return;

    setTasks(tasks.filter((task) => task.id !== taskToDelete.id));
    setIsDeleteConfirmOpen(false);
    setTaskToDelete(null);
  };

  const handleEditTask = (task: ITask) => {
    setEditingTask(task);
    setIsEditTaskOpen(true);
  };

  const handleDeleteTask = (task: ITask) => {
    setTaskToDelete(task);
    setIsDeleteConfirmOpen(true);
  };

  // Get tasks for each status column
  const getTasksForStatus = (status: string) => {
    return filteredTasks.filter((task) => task.status === status);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Kanban className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-semibold text-gray-900 hidden sm:block">
                  TaskFlow
                </h1>
              </div>

              <div className="h-6 w-px bg-gray-300 hidden lg:block" />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex">
          {/* Main Board */}
          <main className="flex-1 p-4 lg:p-6 h-[calc(100vh-73px)] overflow-hidden">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 lg:mb-6 space-y-4 sm:space-y-0">
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
                <div className="relative w-full sm:w-auto">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Search tasks..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-full sm:w-64 text-gray-800"
                  />
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full sm:w-auto"
                    >
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                      <ChevronDown className="w-4 h-4 ml-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <div className="p-2">
                      <Label className="text-xs font-medium text-gray-500">
                        Priority
                      </Label>
                      <Select
                        value={filterPriority}
                        onValueChange={setFilterPriority}
                      >
                        <SelectTrigger className="w-full mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Priorities</SelectItem>
                          <SelectItem value="urgent">Urgent</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="low">Low</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="p-2">
                      <Label className="text-xs font-medium text-gray-500">
                        Status
                      </Label>
                      <Select
                        value={filterStatus}
                        onValueChange={setFilterStatus}
                      >
                        <SelectTrigger className="w-full mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Status</SelectItem>
                          <SelectItem value="todo">To Do</SelectItem>
                          <SelectItem value="inprogress">
                            In Progress
                          </SelectItem>
                          <SelectItem value="done">Done</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <Button
                className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto"
                onClick={() => setIsCreateTaskOpen(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Create Task</span>
                <span className="sm:hidden">Create</span>
              </Button>
            </div>

            <div className="h-[calc(100vh-200px)] lg:h-[calc(100vh-180px)]">
              <DragDropContext onDragEnd={onDragEnd}>
                {/* Mobile: Horizontal scroll layout */}
                <div className="h-full">
                  <div className="flex lg:justify-between gap-x-4 h-full overflow-x-auto pb-4">
                    {Object.entries(STATUS_COLUMN).map(([status, column]) => {
                      const statusTasks = getTasksForStatus(status);
                      return (
                        <div
                          key={status}
                          className="flex flex-col min-w-[280px] w-80 h-full lg:flex-1"
                        >
                          <div className="flex items-center justify-between mb-4 flex-shrink-0">
                            <h3 className="font-semibold text-gray-900">
                              {column.title}
                            </h3>
                            <Badge variant="secondary" className="text-xs">
                              {statusTasks.length}
                            </Badge>
                          </div>

                          <Droppable droppableId={status}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className={`flex-1 p-4 rounded-lg transition-colors overflow-y-auto min-h-0 ${
                                  snapshot.isDraggingOver
                                    ? 'bg-blue-50'
                                    : column.color
                                }`}
                                style={{ maxHeight: 'calc(100vh - 280px)' }}
                              >
                                <div className="space-y-3">
                                  {statusTasks.map((task, index) => (
                                    <Draggable
                                      key={task.id}
                                      draggableId={task.id}
                                      index={index}
                                    >
                                      {(provided, snapshot) => (
                                        <div
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                          className={`${snapshot.isDragging ? 'rotate-2' : ''}`}
                                          style={{
                                            ...provided.draggableProps.style,
                                            ...(snapshot.isDragging && {
                                              transform: provided.draggableProps
                                                .style?.transform
                                                ? `${provided.draggableProps.style.transform} rotate(2deg)`
                                                : 'rotate(2deg)',
                                            }),
                                          }}
                                        >
                                          <TaskCard
                                            task={task}
                                            onEdit={handleEditTask}
                                            onDuplicate={duplicateTask}
                                            onDelete={handleDeleteTask}
                                          />
                                        </div>
                                      )}
                                    </Draggable>
                                  ))}
                                  {provided.placeholder}
                                </div>
                              </div>
                            )}
                          </Droppable>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </DragDropContext>
            </div>
          </main>
        </div>
      </div>

      {isDeleteConfirmOpen && taskToDelete && (
        <DeleteTask
          isDeleteConfirmOpen={isDeleteConfirmOpen}
          setIsDeleteConfirmOpen={setIsDeleteConfirmOpen}
          taskToDelete={taskToDelete}
          onDeleteTask={deleteTask}
        />
      )}

      {isCreateTaskOpen && (
        <Dialog open={isCreateTaskOpen} onOpenChange={setIsCreateTaskOpen}>
          <DialogContent className="sm:max-w-lg mx-4">
            <DialogHeader>
              <DialogTitle>Create New Task</DialogTitle>
            </DialogHeader>
            {isCreateTaskOpen && <TaskCreationForm onSubmit={createTask} />}
          </DialogContent>
        </Dialog>
      )}

      {isEditTaskOpen && editingTask && (
        <Dialog open={isEditTaskOpen} onOpenChange={setIsEditTaskOpen}>
          <DialogContent className="sm:max-w-lg mx-4">
            <DialogHeader>
              <DialogTitle>Edit Task</DialogTitle>
            </DialogHeader>
            {isEditTaskOpen && (
              <TaskCreationForm
                onSubmit={editTask}
                initialData={editingTask}
                submitLabel="Update Task"
              />
            )}
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
