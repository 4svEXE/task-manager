import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TaskItemComponent } from '../task-item/task-item.component';
import { TasksService } from '../../../core/services/api/tasks.service';
import { Task } from '../../../core/interfaces';
import { ScheduledTasksService } from '../../../core/services/api/scheduled-tasks.service';

@Component({
  selector: 'app-task-display',
  standalone: true,
  imports: [CommonModule, TaskItemComponent],
  templateUrl: './task-display.component.html',
  styleUrl: './task-display.component.scss',
})
export class TaskDisplayComponent {
  @Input() tasks!: Task[];
  // передавати дату перегляду (яка сторінка)
  @Input() currentDate!: string;

  constructor(
    private tasksService: TasksService,
    private scheduledTasksService: ScheduledTasksService
  ) {}

  ngOnInit(): void {
    this.loadTasks();
    this.scheduledTasksService.loadData();
  }

  loadTasks(): void {
    this.tasksService.loadTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  editTask(updatedTask: Task): void {
    this.tasksService.editTask(updatedTask);
  }

  deleteTask(id: string): void {
    this.tasksService.deleteTask(id);
  }
}
