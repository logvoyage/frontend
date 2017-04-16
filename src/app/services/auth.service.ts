import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  private token: string;
  private key = 'auth.token';
  public redirectUrl = null;

  constructor(
    private router: Router,
  ) {
    this.token = localStorage.getItem(this.key);
  }

  authenticate(token: string) {
    this.setToken(token);
    this.router.navigate([this._getRedirectUrl()]);
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

  isAuthenticated(): boolean {
    console.log('isAuthenticated:', this.token);
    return this.token != null;
  }

  private _getRedirectUrl(): string {
    return this.redirectUrl || '/app/dashboard';
  }
}