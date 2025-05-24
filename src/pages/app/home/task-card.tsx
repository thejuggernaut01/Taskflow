import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
// import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu';
import { ITask } from '@/interface/task.interface';
import { Calendar, Edit, Flag, Trash } from 'lucide-react';

type TaskCardProps = {
  task: ITask;
  onEdit: (task: ITask) => void;
  onDuplicate: (task: ITask) => void;
  onDelete: (task: ITask) => void;
};

const priorityColors = {
  low: 'bg-blue-100 text-blue-800 border-blue-200',
  medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  high: 'bg-orange-100 text-orange-800 border-orange-200',
  urgent: 'bg-red-100 text-red-800 border-red-200',
};

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onEdit,
  // onDuplicate,
  onDelete,
}) => {
  return (
    <Card className="bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <h4 className="font-medium text-gray-900 text-sm leading-5 pr-2">
            {task.title}
          </h4>

          <div className="space-x-1">
            <button onClick={() => onEdit(task)}>
              <Edit size={17} />
            </button>

            {/* <button onClick={() => onDuplicate(task)}>
              <Clipboard size={17} />
            </button> */}

            <button onClick={() => onDelete(task)}>
              <Trash className="text-red-500" size={17} />
            </button>
          </div>
        </div>
        <p className="text-xs text-gray-600 mt-1 line-clamp-2">
          {task.description}
        </p>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Badge
              className={`text-xs border ${priorityColors[task.priority]}`}
            >
              <Flag className="w-3 h-3 mr-1" />
              {task.priority}
            </Badge>
            <div className="flex items-center text-xs text-gray-500">
              <Calendar className="w-3 h-3 mr-1" />
              <span className="truncate">{task.dueDate}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1 flex-wrap">
              {task.labels.slice(0, 2).map((label) => (
                <Badge key={label} variant="outline" className="text-xs">
                  {label}
                </Badge>
              ))}
              {task.labels.length > 2 && (
                <Badge variant="outline" className="text-xs">
                  +{task.labels.length - 2}
                </Badge>
              )}
            </div>
            <Avatar className="w-6 h-6 flex-shrink-0">
              <AvatarFallback className="text-xs">
                {task.assignee
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
