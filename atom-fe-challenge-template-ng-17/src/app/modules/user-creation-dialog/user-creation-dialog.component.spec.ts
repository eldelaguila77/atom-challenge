import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserCreationDialogComponent } from './user-creation-dialog.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

describe('UserCreationDialogComponent', () => {
  let component: UserCreationDialogComponent;
  let fixture: ComponentFixture<UserCreationDialogComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<UserCreationDialogComponent>>;

  beforeEach(async () => {
    const dialogRefSpyObj = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
        imports: [
          NoopAnimationsModule,
          MatDialogModule,
          MatButtonModule,
          UserCreationDialogComponent // Mover aquí desde declarations
        ],
        providers: [
          { provide: MatDialogRef, useValue: dialogRefSpyObj },
          { provide: MAT_DIALOG_DATA, useValue: { email: 'test@example.com' } }
        ]
      }).compileComponents();
      
      fixture = TestBed.createComponent(UserCreationDialogComponent);
      component = fixture.componentInstance;
      dialogRefSpy = TestBed.inject(MatDialogRef) as jasmine.SpyObj<MatDialogRef<UserCreationDialogComponent>>;
      fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with provided data', () => {
    expect(component.data.email).toBe('test@example.com');
  });

  it('should close the dialog on onNoClick', () => {
    component.onNoClick();
    expect(dialogRefSpy.close).toHaveBeenCalled();
  });
});