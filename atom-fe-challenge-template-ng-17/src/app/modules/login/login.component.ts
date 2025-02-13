import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';
import { UserCreationDialogComponent } from '../user-creation-dialog/user-creation-dialog.component';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatCardModule
]
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router, public dialog: MatDialog) {}

  onSubmit(loginForm: NgForm): void {
    const email = loginForm.value.email;
    if (this.authService.login(email)) {
      this.router.navigate(['/tasks']);
    } else {
      const dialogRef = this.dialog.open(UserCreationDialogComponent, {
        width: '250px',
        data: { email }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.authService.createUser(email);
          this.authService.login(email);
          this.router.navigate(['/tasks']);
        }
      });
    }
  }
}