import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { GitHubApiService } from './githubApi.service';
import { Task } from '../../interfaces';


@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private readonly filePath = 'tasks.json';
  private readonly commitMessage = `Tasks updated - ${new Date().toISOString()}`;
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasksSubject.asObservable();

  constructor(private gitHubApiService: GitHubApiService) {}

  loadTasks(): Observable<Task[]> {
    return this.gitHubApiService.loadFile(this.filePath).pipe(
      tap((tasks: Task[]) => this.tasksSubject.next(tasks))
    );
  }

  addTask(newTask: Task): void {
    const tasks = this.tasksSubject.getValue();
    newTask.id = this.gitHubApiService.generateId('task');
    this.tasksSubject.next([...tasks, newTask]);
  }

  editTask(updatedTask: Task): void {
    const tasks = this.tasksSubject.getValue().map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    this.tasksSubject.next(tasks);
  }

  deleteTask(id: string): void {
    const tasks = this.tasksSubject.getValue().filter((task) => task.id !== id);
    this.tasksSubject.next(tasks);
  }

  saveTasks(): Observable<any> {
    const tasks = this.tasksSubject.getValue();
    return this.gitHubApiService.getFileSha(this.filePath).pipe(
      switchMap((sha) =>
        this.gitHubApiService.saveFile(this.filePath, tasks, this.commitMessage, sha)
      )
    );
  }
}
