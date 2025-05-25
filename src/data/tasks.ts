import { ITask } from '@/interface/task.interface';

const INITIAL_TASKS: ITask[] = [
  {
    id: '1',
    title: 'Design user authentication flow',
    description:
      'Create wireframes and mockups for the login and signup process',
    status: 'ToDo',
    priority: 'High',
    dueDate: '2024-01-15',
    labels: ['Design', 'UX'],
  },
  {
    id: '2',
    title: 'Implement API endpoints',
    description: 'Build REST API for user management and task operations',
    status: 'InProgress',
    priority: 'Urgent',
    dueDate: '2024-01-12',
    labels: ['Backend', 'API'],
  },
  {
    id: '3',
    title: 'Setup CI/CD pipeline',
    description: 'Configure automated testing and deployment workflows',
    status: 'Done',
    priority: 'Medium',
    dueDate: '2024-01-10',
    labels: ['DevOps', 'Infrastructure'],
  },
  {
    id: '4',
    title: 'Mobile responsive design',
    description: 'Ensure the application works perfectly on mobile devices',
    status: 'ToDo',
    priority: 'High',
    dueDate: '2024-01-18',
    labels: ['Frontend', 'Mobile'],
  },
  {
    id: '5',
    title: 'Database optimization',
    description: 'Optimize database queries for better performance',
    status: 'InProgress',
    priority: 'Medium',
    dueDate: '2024-01-20',
    labels: ['Backend', 'Performance'],
  },
  {
    id: '6',
    title: 'User testing session',
    description: 'Conduct user testing to gather feedback on the new features',
    status: 'ToDo',
    priority: 'Low',
    dueDate: '2024-01-25',
    labels: ['UX', 'Testing'],
  },
  {
    id: '7',
    title: 'Security audit',
    description: 'Perform comprehensive security audit of the application',
    status: 'ToDo',
    priority: 'Urgent',
    dueDate: '2024-01-16',
    labels: ['Security', 'Audit'],
  },
  {
    id: '8',
    title: 'Documentation update',
    description: 'Update API documentation and user guides',
    status: 'Done',
    priority: 'Low',
    dueDate: '2024-01-08',
    labels: ['Documentation'],
  },
];

export { INITIAL_TASKS };
