import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ScheduledTask } from '../../interfaces';

@Injectable({
  providedIn: 'root',
})
export class ScheduledTasksService {
  private scheduledTasksSubject = new BehaviorSubject<ScheduledTask[]>([]);
  scheduledTasks$ = this.scheduledTasksSubject.asObservable();

  constructor() {}

  // генеруєм запланований таск за його айді
  generateIsExecuted(taskId: string): ScheduledTask {
    const scheduledTaskItem = {
      taskId,
      dateOfExecution: new Date().toLocaleDateString(),
      isExecuted: false,
    };

    return scheduledTaskItem;
  }

  addScheduledTask(newScheduledTask: ScheduledTask): void {
    const tasks = this.scheduledTasksSubject.getValue();
    this.scheduledTasksSubject.next([...tasks, newScheduledTask]);
  }

  deleteScheduledTask(taskId: string, dateOfExecution: string): void {
    const tasks = this.scheduledTasksSubject
      .getValue()
      .filter(
        (task) =>
          task.taskId !== taskId || task.dateOfExecution !== dateOfExecution
      );
    this.scheduledTasksSubject.next(tasks);
  }

  getIsExecuted(taskId: string, dateOfExecution: string): boolean {
    // знаходимо відповідний таск
    const scheduledTask: ScheduledTask | undefined = this.scheduledTasksSubject
      .getValue()
      .filter((task) => {
        if (
          task.taskId === taskId &&
          task.dateOfExecution === dateOfExecution
        ) {
          return true;
        }
        return false;
      })[0];

    if (!scheduledTask) {
      this.generateIsExecuted(taskId);
      return false;
    }

    return scheduledTask.isExecuted;
  }

  toggleIsExecuted(taskId: string, dateOfExecution: string): void {
    const tasks = this.scheduledTasksSubject.getValue().map((task) => {
      if (task.taskId === taskId && task.dateOfExecution === dateOfExecution) {
        return { ...task, isExecuted: true };
      }
      return task;
    });
    this.scheduledTasksSubject.next(tasks);
  }

  getScheduledTasks(): Observable<ScheduledTask[]> {
    return this.scheduledTasks$;
  }
}
