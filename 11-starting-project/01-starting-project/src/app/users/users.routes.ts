import { Routes } from '@angular/router';

import { resolveUserTasks } from '../tasks/tasks.component';
import { canLeaveEditPage, NewTaskComponent } from '../tasks/new-task/new-task.component';
import { TaskComponent } from '../tasks/task/task.component';
import { TasksService } from '../tasks/tasks.service';

export const routes: Routes = [
  {
    path:'',
    providers:[TasksService],
    children:[{
      path: '',
      redirectTo: 'tasks',
      pathMatch: 'full',
    },
    {
      path: 'tasks',
      component:TaskComponent,
      // loadComponent:()=>import('../tasks/tasks.component').then(mod=>mod.TasksComponent),
      runGuardsAndResolvers:'always',
      resolve: {
        userTasks: resolveUserTasks,
      },
    },
    {
      path: 'tasks/new',
      component: NewTaskComponent,
      canDeactivate:[canLeaveEditPage]
    },]
  }
  
];