import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css',
})
export class TaskFormComponent {
  taskForm: FormGroup;

  constructor(private fb: FormBuilder, private taskService: TaskService) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
    })
  }

  onSubmit(){
    if(this.taskForm.valid){
      const newTask: Task = {
        id: Math.random(),
        title: this.taskForm.value.title,
        description: this.taskForm.value.description,
        completed: false,
      }
      this.taskService.addTask(newTask);
      this.taskForm.reset();
    }
  }
}