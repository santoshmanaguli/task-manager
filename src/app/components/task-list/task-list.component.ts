import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { NgFor } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { map } from 'rxjs';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [NgFor, DropdownModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
})
export class TaskListComponent implements OnInit {
  //state
  tasks: Task[] = [];
  filteredTask: Task[] = [];
  private filterOption = 'all';

  constructor(private taskService: TaskService) {}
  ngOnInit(): void {
    this.taskService.tasks$.subscribe((tasks) => {
      this.tasks = tasks;
    });

    this.applyFilter();
  }

  onCompleteTask(taskID: number) {
    this.taskService.completeTask(taskID);
  }

  filterTasks(option: string) {
    this.filterOption = option;
    this.applyFilter();
  }

  private applyFilter() {
    console.log(this.filterOption);
    this.taskService.tasks$.pipe(
      map((tasks) => {
        if (this.filterOption === 'completed') {
          console.log(1);
          return tasks.filter((task) => task.completed);
        } else if (this.filterOption === 'incomplete') {
          return tasks.filter((task) => !task.completed);
        }
        return tasks; // Default to all tasks
      })
    )
    .subscribe(filtered => {
      this.filteredTask = filtered
    })

    console.log(this.filteredTask);
  }
}
