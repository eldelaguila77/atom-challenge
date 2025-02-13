import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users: { email: string }[] = [];
  private currentUser: { email: string } | null = null;

  constructor() {}

  getUserByEmail(email: string): { email: string } | null {
    return this.users.find(user => user.email === email) || null;
  }

  createUser(email: string): { email: string } {
    const newUser = { email };
    this.users.push(newUser);
    return newUser;
  } 

  login(email: string): boolean {
    const user = this.getUserByEmail(email);
    if (user) {
      this.currentUser = user;
      return true;
    }
    return false;
  }

  logout(): void {
    this.currentUser = null;
  }

  isLoggedIn(): boolean {
    return this.currentUser !== null;
  }

  getCurrentUser(): { email: string } | null {
    return this.currentUser;
  }
}