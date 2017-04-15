import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  private token: string;
  private key = 'auth.token';

  constructor() {
    this.token = localStorage.getItem(this.key);
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem(this.key, token);
  }

  getToken(): string {
    return this.token;
  }

  clearToken() {
    this.setToken(null)
  }

  isAuthenticated?(): boolean {
    return this.token != null;
  }
}