import { Component } from '@angular/core';
import { TasksService } from '../../core/services/api/tasks.service';
import { GitHubApiService } from '../../core/services/api/githubApi.service';
import { Task } from '../../core/interfaces';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent {
  tasks: Task[] = [];
  newTask: Task = {
    id: '',
    text: '',
    details: '',
    categoryId: '',
    projectId: '',
    priority: 0,
    complexity: 0,
    reward: '',
    creationDate: new Date().toLocaleDateString(),
    executionDates: [],
    startHour: 0,
    endHour: 0,
  };

  constructor(private tasksService: TasksService, private gitHubApiService: GitHubApiService) {}





  addTask(): void {
    this.newTask.id = this.gitHubApiService.generateId('task'); // Створення ID для нового таска
    this.tasksService.addTask(this.newTask);
    this.newTask = {
      id: '',
      text: '',
      details: '',
      categoryId: '',
      projectId: '',
      priority: 0,
      complexity: 0,
      reward: '',
      creationDate: new Date().toLocaleDateString(),
      executionDates: [],
      startHour: 0,
      endHour: 0,
    };
  }



  saveTasks(): void {
    this.tasksService.saveTasks().subscribe(() => {
      console.log('Tasks saved successfully');
    });
  }
}
