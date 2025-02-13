import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-user-creation-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './user-creation-dialog.component.html',
  styleUrl: './user-creation-dialog.component.scss'
})
export class UserCreationDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<UserCreationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {email: string }
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
