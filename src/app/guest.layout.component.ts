import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './guest.layout.component.html',
})
export class GuestLayoutComponent {
  constructor(
    private router: Router,
    private authService: AuthService,
  ) {
    if (authService.isAuthenticated()) {
      this.router.navigate(['/app/dashboard']);
    }
  }
}
