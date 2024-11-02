import { inject, Injectable, signal } from '@angular/core';
import { Task, TaskStatus } from './task.model';
import { Title } from '@angular/platform-browser';
import { LoggingService } from '../logging.service';

// @Injectable({
//   providedIn: 'root'
// })
export class TasksService {

  private loggingService = inject(LoggingService);

  // tasks: Task[] = [];

  // addTask(title:string, description:string){
  //   this.tasks.push({
  //     id: Math.random().toString(), //only for this demo app
  //     title: title,
  //     description:description,
  //     status: 'OPEN'
  //   });
  // }

  // getTasks(){
  //   return this.tasks;
  // }



  //signal way
  private tasksSignalWay = signal<Task[]>([]); //private added to make it not editable outside the service

  allTasks = this.tasksSignalWay.asReadonly(); //this yields only read only signal

  addTaskSignalWay(title:string, description:string){
    const newTask: Task = {
      id: Math.random().toString(), //only for this demoa app
      title: title,
      description:description,
      status: 'OPEN'
    }
    this.tasksSignalWay.update((oldTasks) => [...oldTasks, newTask]) //old tasks array is returned as argument in update method.
    this.loggingService.log("Task Added " + title);
  }

  updateTaskStatus(taskId:string, newStatus: TaskStatus){
    this.tasksSignalWay.update((oldValues) => oldValues.map((task) => task.id === taskId ? {...task,status: newStatus}: task)); ///[...] operator is used to get existing values of task and change status only
    this.loggingService.log("Task updated " + newStatus);
  }
}
