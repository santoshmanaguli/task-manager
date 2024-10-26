import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [NgFor],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
})
export class TaskListComponent implements OnInit {
  //state
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}
  ngOnInit(): void {
    this.taskService.tasks$.subscribe((tasks) => {
      this.tasks = tasks
    })
  }
}
