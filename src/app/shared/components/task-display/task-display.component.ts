import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  styleUrls: ['./task-display.component.scss'],
})
export class TaskDisplayComponent implements OnInit, OnChanges {
  @Input() currentDate!: string;
  tasks: Task[] = [];
  scheduledTasks: ScheduledTask[] = [];
  tasksWithScheduled: TaskWithScheduled[] = [];

  constructor(
    private tasksService: TasksService,
    private scheduledTasksService: ScheduledTasksService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentDate'] && !changes['currentDate'].isFirstChange()) {
      this.loadData();
    }
  }

  loadData(): void {
    this.tasksWithScheduled = []; // Очищаємо попередні дані
    forkJoin({
      tasks: this.tasksService.loadTasks(),
      scheduledTasks: this.scheduledTasksService.getItemsByDate(this.currentDate),
    }).subscribe(({ tasks, scheduledTasks }) => {
      this.tasks = tasks;
      this.scheduledTasks = scheduledTasks;

      scheduledTasks.forEach((scheduledTask) => {
        const task = tasks.find((task) => task.id === scheduledTask.taskId);
        if (task) {
          const existing = this.tasksWithScheduled.find(
            (item) =>
              item.id === task.id &&
              item.dateOfExecution === scheduledTask.dateOfExecution
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
