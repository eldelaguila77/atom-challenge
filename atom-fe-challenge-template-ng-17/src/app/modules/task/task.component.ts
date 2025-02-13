import { Component, ViewChild, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatSort } from '@angular/material/sort';
import { AuthService } from '../../services/auth.service';

interface Task {
  title: string;
  description: string;
  createdAt: Date;
  completed: boolean;
}

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatCheckboxModule,
    MatIconModule,
    MatDialogModule,
    MatSortModule
  ]
})
export class TaskComponent {
  newTask: Task = { title: '', description: '', createdAt: new Date(), completed: false };
  tasks: MatTableDataSource<Task> = new MatTableDataSource<Task>([]);
  displayedColumns: string[] = ['title', 'description', 'createdAt', 'status', 'completed', 'actions'];
  editingTask: Task | null = null;

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private router: Router, public dialog: MatDialog, private cdr: ChangeDetectorRef, private authService: AuthService) {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
  }

  ngAfterViewInit(): void {
    this.tasks.sort = this.sort;
  }

  addTask(): void {
    if (this.editingTask) {
      // Actualizar tarea existente
      const index = this.tasks.data.indexOf(this.editingTask);
      if (index !== -1) {
        this.tasks.data[index] = {
          ...this.editingTask,
          title: this.newTask.title,
          description: this.newTask.description,
          createdAt: this.editingTask.createdAt
        };
        this.tasks.data = [...this.tasks.data]; // Actualizar la tabla
      }
      this.editingTask = null;
    } else {
      // Agregar nueva tarea
      const task = { ...this.newTask, createdAt: new Date() };
      this.tasks.data = [...this.tasks.data, task];
    }
    this.newTask = { title: '', description: '', createdAt: new Date(), completed: false };
    console.log("table: " , this.tasks.data);
  }

  editTask(task: Task): void {
    this.editingTask = task;
    this.newTask = { ...task };
  }

  cancelEdit(): void {
    this.editingTask = null;
    this.newTask = { title: '', description: '', createdAt: new Date(), completed: false };
  }

  deleteTask(task: Task): void {
    this.tasks.data = this.tasks.data.filter(t => t !== task);
  }

  toggleTaskCompletion(): void {
    this.tasks.data = [...this.tasks.data];
    this.cdr.markForCheck();
    console.log("table: " , this.tasks.data);
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tasks.filter = filterValue.trim().toLowerCase();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}