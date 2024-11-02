import { Component, computed, inject, signal } from '@angular/core';

import { TaskItemComponent } from './task-item/task-item.component';
import { TasksService } from '../tasks.service';
import { TasksServiceToken } from '../../../main';
import { TASK_STATUS_OPTION, TaskStatusOption, taskStatusOptionsProvider } from '../task.model';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css',
  imports: [TaskItemComponent],
  providers:[taskStatusOptionsProvider]
})
export class TasksListComponent {
  selectedFilter = signal<string>('all');
  private taskService = inject(TasksServiceToken);
  taskStatusOption = inject(TASK_STATUS_OPTION);

 // tasks = this.taskService.getTasks();

  //another way
  //tasks = this.taskService.allTasks;  //in template should read tasks() because it is signal
  tasks = computed(() => {
    switch(this.selectedFilter()){ //now whenever the selectedFilter value changes angular will call this computed function again
      case 'all':
        return this.taskService.allTasks(); //will recomputed if allTasks changes
      case 'open':
        return this.taskService.allTasks().filter(task => task.status == 'OPEN');
      case 'in-progress':
        return this.taskService.allTasks().filter(task => task.status == 'IN_PROGRESS');
      case 'done':
        return this.taskService.allTasks().filter(task => task.status == 'DONE');
      default:
        return this.taskService.allTasks();
    }
  });//computed will call again when any of the dependent signal changes
  onChangeTasksFilter(filter: string) {
    this.selectedFilter.set(filter);
  }
}
