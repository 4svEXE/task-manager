import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TaskItemComponent } from '../task-item/task-item.component';
import { TasksService } from '../../../core/services/api/tasks.service';
import { ScheduledTask, Task, TaskWithScheduled } from '../../../core/interfaces';
import { ScheduledTasksService } from '../../../core/services/api/scheduled-tasks.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-task-display',
  standalone: true,
  imports: [CommonModule, TaskItemComponent],
  templateUrl: './task-display.component.html',
  styleUrl: './task-display.component.scss',
})
export class TaskDisplayComponent {
  tasks!: Task[];
  scheduledTasks!: ScheduledTask[];
  currentDate: string = '2024-12-14';

  tasksWithScheduled: TaskWithScheduled[] = [];

  constructor(
    private tasksService: TasksService,
    private scheduledTasksService: ScheduledTasksService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    forkJoin({
      tasks: this.tasksService.loadTasks(),
      scheduledTasks: this.scheduledTasksService.getItemsByDate(this.currentDate),
    }).subscribe(({ tasks, scheduledTasks }) => {
      scheduledTasks.forEach((scheduledTask) => {
        const task = tasks.find((task) => task.id === scheduledTask.taskId);

        if (task) {
          const existing = this.tasksWithScheduled.find(
            (item) =>
              item.id === task.id && item.dateOfExecution === scheduledTask.dateOfExecution
          );

          if (!existing) {
            this.tasksWithScheduled.push({
              ...task,
              ...scheduledTask,
            });
          }
        }
      });
    });
  }

  toggteIsExecuted(taskId: string): void {
    const scheduledTask: TaskWithScheduled | undefined = this.tasksWithScheduled?.find(
      (task) =>
        task.taskId === taskId && task.dateOfExecution === this.currentDate
    );
    if (scheduledTask) {
      scheduledTask.isExecuted = !scheduledTask.isExecuted;
      this.scheduledTasksService.updateScheduledTask(scheduledTask);
    }
  }

  editTask(updatedTask: Task): void {
    this.tasksService.editTask(updatedTask);
  }

  deleteTask(id: string): void {
    this.tasksService.deleteTask(id);
  }

}
