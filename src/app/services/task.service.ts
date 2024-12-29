import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasksSubject.asObservable();

  private tasks: Task[] = [
    { id: 1, title: 'Task 1', description: 'Description 1', completed: false },
    { id: 2, title: 'Task 2', description: 'Description 2', completed: false },
    { id: 1, title: 'Task 1', description: 'Description 1', completed: true },
    { id: 2, title: 'Task 2', description: 'Description 2', completed: true },
  ];

  constructor() {
    this.tasksSubject.next(this.tasks);
  }

  addTask(task: Task) {
    this.tasks = [...this.tasks, task];
    this.tasksSubject.next(this.tasks);
  }

  completeTask(taskId: Number) {
    this.tasks = this.tasks.map((i) =>
      i.id == taskId ? { ...i, completed: !i.completed } : i
    );
    this.tasksSubject.next(this.tasks);
  }
}
