import { ScheduledTasksService } from './../../../core/services/api/scheduled-tasks.service';
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../../core/interfaces';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.scss',
})
export class TaskItemComponent {
  @Input() task!: Task;
  // передавати дату перегляду (яка сторінка)
  @Input() currentDate!: string;
  isExecuted: boolean = false;

  constructor(private scheduledTasksService: ScheduledTasksService) {}

  ngOnInit() {
    this.updateIsExecuted();
  }

  // отримуєм стан чекбокса
  updateIsExecuted() {
    this.isExecuted = this.scheduledTasksService.getIsExecuted(
      this.task.id,
      this.currentDate
    );
  }

  toggteIsExecuted() {
    // Знайти таск за айді і відмітити зробменим
    this.scheduledTasksService.toggleIsExecuted(this.task.id, this.currentDate);
    this.updateIsExecuted();
  }
}
