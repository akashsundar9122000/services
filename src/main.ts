import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { InjectionToken } from '@angular/core';
import { TasksService } from './app/tasks/tasks.service';

export const TasksServiceToken = new InjectionToken<TasksService>('tasks-service-token') //this name in the argument is for debugging purposes,

// bootstrapApplication(AppComponent).catch((err) => console.error(err));

bootstrapApplication(AppComponent, {
    providers: [{provide: TasksServiceToken, useClass: TasksService}]
}).catch((err) => console.error(err));
