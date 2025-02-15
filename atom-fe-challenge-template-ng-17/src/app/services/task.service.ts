import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';

interface Task {
  id?: string;
  title: string;
  description: string;
  createdAt: Date;
  completed: boolean;
  userId: string;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(private httpService: HttpService) {}

  getTasks(): Observable<Task[]> {
    return this.httpService.get<Task[]>('/tasks');
  }

  getTaskById(id: string): Observable<Task> {
    return this.httpService.get<Task>(`/tasks/${id}`);
  }

  getTasksByUserId(userId: string): Observable<Task[]> {
    return this.httpService.get<Task[]>(`/tasks/user/${userId}`);
  }

  addTask(task: Task): Observable<Task> {
    return this.httpService.post<Task>('/tasks', task);
  }

  updateTask(id: string, task: Task): Observable<Task> {
    return this.httpService.put<Task>(`/tasks/${id}`, task);
  }

  deleteTask(id: string): Observable<void> {
    return this.httpService.delete<void>(`/tasks/${id}`);
  }
}