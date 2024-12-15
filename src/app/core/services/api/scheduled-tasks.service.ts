import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, switchMap, tap } from 'rxjs';
import { ScheduledTask, TaskWithScheduled } from '../../interfaces';
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

  // Завантаження даних із зовнішнього джерела
  loadData(): Observable<ScheduledTask[]> {
    // console.log('ScheduledTasksService :>> load data initiated');

    return this.gitHubApiService.loadFile(this.filePath).pipe(
      tap((data: ScheduledTask[]) => {
        // Оновлення BehaviorSubject отриманими даними
        this.scheduledTasksSubject.next(data);
      })
    );
  }

  getItemsByDate(date: string): Observable<ScheduledTask[]> {
    return this.gitHubApiService.loadFile(this.filePath).pipe(
      map((scheduled: ScheduledTask[]) =>
        scheduled.filter((item) => item.dateOfExecution === date)
      ),
      tap((filteredScheduled) => {
        // console.log('Filtered Scheduled Tasks:', filteredScheduled);
        this.scheduledTasksSubject.next(filteredScheduled);
      })
    );
  }

  // Збереження даних у файл
  saveData(): Observable<any> {
    const data = this.scheduledTasksSubject.getValue();

    // console.log('ScheduledTasksService :>> saving data', data);
    return this.gitHubApiService.getFileSha(this.filePath).pipe(
      // Використання SHA файлу для збереження змін
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

  // Генерація нового запланованого завдання
  generateIsExecuted(taskId: string): ScheduledTask {
    const scheduledTaskItem = {
      taskId,
      // Дата у форматі "YYYY-MM-DD"
      dateOfExecution: new Date().toISOString().slice(0, 10),
      isExecuted: false,
    };

    return scheduledTaskItem;
  }

  // Додавання нового запланованого завдання
  addScheduledTask(taskId: string): void {
    const scheduled: ScheduledTask = this.generateIsExecuted(taskId);

    const tasks = this.scheduledTasksSubject.getValue();

    // Додавання нової задачі до списку
    this.scheduledTasksSubject.next([...tasks, scheduled]);
    this.saveData().subscribe(() => {
      // console.log('saved - ScheduledTasksService :>> task added');
    });
  }

  //   // Видалення запланованої задачі
  //   deleteScheduledTask(taskId: string, dateOfExecution: string): void {
  //     const tasks = this.scheduledTasksSubject
  //       .getValue()
  //       .filter(
  //         (task) =>
  //           task.taskId !== taskId || task.dateOfExecution !== dateOfExecution
  //       );
  //     this.scheduledTasksSubject.next(tasks);
  //     this.saveData().subscribe(() =>
  //       console.log('ScheduledTasksService :>> task deleted')
  //     );
  //   }


  updateScheduledTask(scheduledTask: TaskWithScheduled): void {
    const tasks = this.scheduledTasksSubject.getValue();

    // console.log('tasks :>> ', tasks);

    const index = tasks.findIndex((task) => {
      return (
        task.taskId === scheduledTask.taskId &&
        task.dateOfExecution === scheduledTask.dateOfExecution
      );
    });
    // console.log('index :>> ', index);

    if (index !== -1) {
      tasks[index] = scheduledTask;
      this.scheduledTasksSubject.next(tasks);
      this.saveData().subscribe(() =>
        0 // console.log('ScheduledTasksService :>> task updated')
      );
    }
  }
}
