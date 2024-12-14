export interface Review {
  username: string;
  publicationDate: string;
  content: string;
  rating: number;
}

export interface Task {
  id: string;
  text: string;
  details?: string;
  categoryId: string;
  projectId: string;
  priority: number;
  complexity: number;
  reward?: string;
  creationDate: string;
  executionDates: string[];
  startHour?: number;
  endHour?: number;
}

export interface ScheduledTask {
  dateOfExecution: string;
  taskId: string;
  isExecuted: boolean;
}

export interface TaskWithScheduled extends Task, ScheduledTask {}
