import { TestBed } from '@angular/core/testing';
import { TaskService } from './task.service';
import { HttpService } from './http.service';
import { of } from 'rxjs';

describe('TaskService', () => {
  let service: TaskService;
  let httpServiceSpy: jasmine.SpyObj<HttpService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('HttpService', ['get', 'post', 'put', 'delete']);

    TestBed.configureTestingModule({
      providers: [
        TaskService,
        { provide: HttpService, useValue: spy }
      ]
    });

    service = TestBed.inject(TaskService);
    httpServiceSpy = TestBed.inject(HttpService) as jasmine.SpyObj<HttpService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get tasks', () => {
    const expectedTasks = [
      { id: '1', title: 'Task 1', description: 'Description 1', createdAt: new Date(), completed: false, userId: '1' },
      { id: '2', title: 'Task 2', description: 'Description 2', createdAt: new Date(), completed: true, userId: '1' }
    ];
    httpServiceSpy.get.and.returnValue(of(expectedTasks));

    service.getTasks().subscribe(tasks => {
      expect(tasks).toEqual(expectedTasks);
    });

    expect(httpServiceSpy.get).toHaveBeenCalledWith('/tasks');
  });

  it('should get task by id', () => {
    const expectedTask = { id: '1', title: 'Task 1', description: 'Description 1', createdAt: new Date(), completed: false, userId: '1' };
    httpServiceSpy.get.and.returnValue(of(expectedTask));

    service.getTaskById('1').subscribe(task => {
      expect(task).toEqual(expectedTask);
    });

    expect(httpServiceSpy.get).toHaveBeenCalledWith('/tasks/1');
  });

  it('should get tasks by user id', () => {
    const expectedTasks = [
      { id: '1', title: 'Task 1', description: 'Description 1', createdAt: new Date(), completed: false, userId: '1' },
      { id: '2', title: 'Task 2', description: 'Description 2', createdAt: new Date(), completed: true, userId: '1' }
    ];
    httpServiceSpy.get.and.returnValue(of(expectedTasks));

    service.getTasksByUserId('1').subscribe(tasks => {
      expect(tasks).toEqual(expectedTasks);
    });

    expect(httpServiceSpy.get).toHaveBeenCalledWith('/tasks/user/1');
  });

  it('should add task', () => {
    const newTask = { id: '1', title: 'New Task', description: 'New Description', createdAt: new Date(), completed: false, userId: '1' };
    httpServiceSpy.post.and.returnValue(of(newTask));

    service.addTask(newTask).subscribe(task => {
      expect(task).toEqual(newTask);
    });

    expect(httpServiceSpy.post).toHaveBeenCalledWith('/tasks', newTask);
  });

  it('should update task', () => {
    const updatedTask = { id: '1', title: 'Updated Task', description: 'Updated Description', createdAt: new Date(), completed: false, userId: '1' };
    httpServiceSpy.put.and.returnValue(of(updatedTask));

    service.updateTask('1', updatedTask).subscribe(task => {
      expect(task).toEqual(updatedTask);
    });

    expect(httpServiceSpy.put).toHaveBeenCalledWith('/tasks/1', updatedTask);
  });

  it('should delete task', () => {
    httpServiceSpy.delete.and.returnValue(of(void 0));

    service.deleteTask('1').subscribe(response => {
      expect(response).toBeUndefined();
    });

    expect(httpServiceSpy.delete).toHaveBeenCalledWith('/tasks/1');
  });
});