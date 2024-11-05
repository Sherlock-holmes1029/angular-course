import { Component, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TasksService } from '../tasks.service';
import { CanDeactivate, CanDeactivateFn, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  userId = input.required<string>();
  enteredTitle = signal('');
  enteredSummary = signal('');
  enteredDate = signal('');
  submited=false
  private tasksService = inject(TasksService);
  private router = inject(Router);

  onSubmit() {
    this.tasksService.addTask(
      {
        title: this.enteredTitle(),
        summary: this.enteredSummary(),
        date: this.enteredDate(),
      },
      this.userId()
    );
    this.submited=true
    this.router.navigate(['/users', this.userId, 'tasks'], {
      replaceUrl: true,
    });
  }
}

export const canLeaveEditPage:CanDeactivateFn<NewTaskComponent>=(component)=>{
  if(component.submited)
    return true
  if(component.enteredTitle()||component.enteredDate()||component.enteredSummary()){
    return window.confirm('wanna leave you will lose the data you entered')
  }
  return true
}