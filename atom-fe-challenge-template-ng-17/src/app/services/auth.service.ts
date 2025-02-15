import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: { id: string; email: string } | null = null;

  constructor(private httpService: HttpService) {}

  getUserByEmail(email: string): Promise<{ id: string; email: string } | null> {
    return firstValueFrom(this.httpService.get<{ id: string; email: string }>(`/users/${email}`))
      .then(user => user || null)
      .catch(() => null);
  }

  createUser(email: string): Promise<{ id: string; email: string }> {
    return firstValueFrom(this.httpService.post<{ id: string; email: string }>('/users', { email }));
  }

  login(email: string): Promise<{ id: string; email: string } | null> {
    console.log('login', email);
    return this.getUserByEmail(email).then(user => {
      console.log('user', user);
      if (user && user.email) {
        this.currentUser = user;
        return this.currentUser;
      }
      return null;
    });
  }

  logout(): void {
    this.currentUser = null;
  }

  isLoggedIn(): boolean {
    return this.currentUser !== null;
  }

  getCurrentUser(): { id: string; email: string } | null {
    return this.currentUser;
  }
}