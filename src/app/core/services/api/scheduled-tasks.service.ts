import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';
import { ScheduledTask } from '../../interfaces';
import { GitHubApiService } from './githubApi.service';

@Injectable({
  providedIn: 'root',
})
export class ScheduledTasksService {
  private readonly filePath = 'scheduledTasks.json';
  private readonly commitMessage = `Tasks scheduled and updated - ${new Date().toISOString()}`;

  private scheduledTasksSubject = new BehaviorSubject<ScheduledTask[]>([]);
  scheduledTasks$ = this.scheduledTasksSubject.asObservable();

  constructor(private gitHubApiService: GitHubApiService) {}

  // todo переробити в реюзабельні дженерики в гітзаб сервісі
  loadData(): Observable<ScheduledTask[]> {
    console.log('ScheduledTasksService :>> load data' );
    return this.gitHubApiService
      .loadFile(this.filePath)
      .pipe(
        tap((data: ScheduledTask[]) => this.scheduledTasksSubject.next(data))
      );
  }

  saveData(): Observable<any> {
    const data = this.scheduledTasksSubject.getValue();

    console.log('ScheduledTasksService :>> save data', data );
    return this.gitHubApiService
      .getFileSha(this.filePath)
      .pipe(
        switchMap((sha) =>
          this.gitHubApiService.saveFile(
            this.filePath,
            data,
            this.commitMessage,
            sha
          )
        )
      );
  }
  // todo переробити в реюзабельні дженерики в гітзаб сервісі

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
    this.saveData()
  }

  deleteScheduledTask(taskId: string, dateOfExecution: string): void {
    const tasks = this.scheduledTasksSubject
      .getValue()
      .filter(
        (task) =>
          task.taskId !== taskId || task.dateOfExecution !== dateOfExecution
      );
    this.scheduledTasksSubject.next(tasks);
    this.saveData()
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

    //  генеруємо новий запис в таблиці якщо його чомусь нема
    if (!scheduledTask) {
      this.generateIsExecuted(taskId);
      return false;
    }

    return scheduledTask.isExecuted;
  }

  // змінити стан чи виконано таск
  toggleIsExecuted(taskId: string, dateOfExecution: string): void {
    const tasks = this.scheduledTasksSubject.getValue().map((task) => {
      if (task.taskId === taskId && task.dateOfExecution === dateOfExecution) {
        return { ...task, isExecuted: true };
      }
      return task;
    });
    this.scheduledTasksSubject.next(tasks);
    this.saveData()
  }
}
