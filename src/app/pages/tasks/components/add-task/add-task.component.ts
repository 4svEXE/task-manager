import { Component } from '@angular/core';
import { TasksService } from '../../../../core/services/api/tasks.service';
import { GitHubApiService } from '../../../../core/services/api/githubApi.service';
import { Task } from '../../../../core/interfaces';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss'
})
export class AddTaskComponent {
  tasks: Task[] = [];
  // newTask: Task = deepClone(mockTask);
  newTask: Task = JSON.parse(JSON.stringify(mockTask));
  isShowForm: boolean = false;

  constructor(
    private tasksService: TasksService,
    private gitHubApiService: GitHubApiService
  ) {}

  addTask(): void {
    this.newTask.id = this.gitHubApiService.generateId('task'); // Створення ID для нового таска
    this.tasksService.addTask(this.newTask);
    this.newTask = JSON.parse(JSON.stringify(mockTask));;
  }

  saveTasks(): void {
    this.tasksService.saveTasks().subscribe(() => {
      console.log('Tasks saved successfully');
    });
  }

  showAddTaskForm(): void {
    this.isShowForm = !this.isShowForm;
  }
}

const mockTask = {
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
