import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private users_key = 'users';
  private current_user = 'user';

  private getUsers(): any[] {
    return JSON.parse(localStorage.getItem(this.users_key) || '[]');
  }

  private saveUsers(users: any[]) {
    localStorage.setItem(this.users_key, JSON.stringify(users));
  }

  login(username: string, password: string): boolean {

    let users = this.getUsers();

    let existingUser = users.find(u => u.username === username);

    if (existingUser) {
      if (existingUser.password === password) {
        localStorage.setItem(this.current_user, JSON.stringify(existingUser));
        return true;
      }
      return false;
    }

    const newUser = { username, password };

    users.push(newUser);
    this.saveUsers(users);

    localStorage.setItem(this.current_user, JSON.stringify(newUser));

    return true;
  }

  isLoggedIn(): boolean {
    const user = localStorage.getItem(this.current_user);
    return user !== null && user !== undefined;
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem(this.current_user) || 'null');
  }

  logout() {
    localStorage.removeItem(this.current_user);
  }
}