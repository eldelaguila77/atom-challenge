import { ComponentFixture, TestBed, fakeAsync, flush } from '@angular/core/testing';
import { TaskComponent } from './task.component';
import { AuthService } from '../../services/auth.service';
import { TaskService } from '../../services/task.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('TaskComponent', () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let taskServiceSpy: jasmine.SpyObj<TaskService>;
  let toastrSpy: jasmine.SpyObj<ToastrService>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;
  let routerSpy: jasmine.SpyObj<Router>;

  interface Task {
    id?: string;
    title: string;
    description: string;
    createdAt: Date;
    completed: boolean;
    userId: string;
  }

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['isLoggedIn', 'getCurrentUser', 'logout']);
    taskServiceSpy = jasmine.createSpyObj('TaskService', ['getTasksByUserId', 'addTask', 'updateTask', 'deleteTask']);
    toastrSpy = jasmine.createSpyObj('ToastrService', ['success']);
    dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [TaskComponent, NoopAnimationsModule],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: TaskService, useValue: taskServiceSpy },
        { provide: ToastrService, useValue: toastrSpy },
        { provide: MatDialog, useValue: dialogSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});