import { InjectionToken, Provider } from "@angular/core";

export type TaskStatus = 'OPEN' | 'IN_PROGRESS' | 'DONE';

type TaskStatusType = {
  value: 'open' | 'in-progress' | 'done';
  taskStatus: TaskStatus;
  text: string;
}[]

export const TASK_STATUS_OPTION = new InjectionToken<TaskStatusType>('task-status-option');

export const TaskStatusOption: TaskStatusType = [ //type is array of object
  {
    value: 'open',
    taskStatus: 'OPEN',
    text: 'Open'
  },
  {
    value: 'in-progress',
    taskStatus: 'IN_PROGRESS',
    text: 'In-Progress'
  },
  {
    value: 'done',
    taskStatus: 'DONE',
    text: 'Completed'
  }
]

export const taskStatusOptionsProvider: Provider = { //it is of type provider which is imported from @angular/core
  provide: TASK_STATUS_OPTION,
  useValue: TaskStatusOption
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}
