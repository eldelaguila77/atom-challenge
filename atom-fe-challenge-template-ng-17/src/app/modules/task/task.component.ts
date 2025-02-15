import { Component, ViewChild, AfterViewInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
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
import { TaskService } from '../../services/task.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { ToastrService } from 'ngx-toastr';

interface Task {
  id?: string;
  title: string;
  description: string;
  createdAt: Date;
  completed: boolean;
  userId: string;
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
export class TaskComponent implements AfterViewInit {
  newTask: Task = { title: '', description: '', createdAt: new Date(), completed: false, userId: '' };
  tasks: MatTableDataSource<Task> = new MatTableDataSource<Task>([]);
  displayedColumns: string[] = ['title', 'description', 'createdAt', 'status', 'completed', 'actions'];
  editingTask: Task | null = null;

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private router: Router, public dialog: MatDialog, private cdr: ChangeDetectorRef, private authService: AuthService, private taskService: TaskService, private toastr: ToastrService) {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    } else {
      this.loadTasks();
    }
  }

  ngAfterViewInit(): void {
    this.tasks.sort = this.sort;
  }

  loadTasks(): void {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.taskService.getTasksByUserId(user.email).subscribe(tasks => {
        this.tasks.data = tasks;
        this.cdr.markForCheck();
      });
    }
  }

  addTask(): void {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.newTask.userId = user.email;
      if (this.editingTask) {
        // Actualizar tarea existente
        this.taskService.updateTask(this.editingTask.id!, this.newTask).subscribe(() => {
          this.loadTasks();
          this.editingTask = null;
          this.newTask = { title: '', description: '', createdAt: new Date(), completed: false, userId: '' };
        });
        this.toastr.success('Tarea actualizada correctamente');
      } else {
        // Agregar nueva tarea
        this.taskService.addTask(this.newTask).subscribe(() => {
          this.loadTasks();
          this.newTask = { title: '', description: '', createdAt: new Date(), completed: false, userId: '' };
          this.toastr.success('Tarea agregada correctamente');
        });
      }
    }
  }

  editTask(task: Task): void {
    this.editingTask = task;
    this.newTask = { ...task };
  }

  cancelEdit(): void {
    this.editingTask = null;
    this.newTask = { title: '', description: '', createdAt: new Date(), completed: false, userId: '' };
  }

  deleteTask(task: Task): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: { message: '¿Estás seguro de que deseas eliminar esta tarea?' }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.taskService.deleteTask(task.id!).subscribe(() => {
          this.loadTasks();
          this.toastr.success('Tarea eliminada correctamente');
        });
      }
    });
  }

  toggleTaskCompletion(task: Task): void {
    const updatedTask = { ...task, completed: task.completed };
    console.log('Updating task', updatedTask);
    this.taskService.updateTask(task.id!, updatedTask).subscribe((result) => {
      console.log('Task updated', result);
      if (result) {
        this.loadTasks();
        this.toastr.success('Tarea actualizada correctamente');
      }
    });
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