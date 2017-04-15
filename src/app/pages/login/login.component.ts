import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '../../services/http.client';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login.html',
})
export class LoginComponent {
  authForm: FormGroup;
  responseError: string;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    fb: FormBuilder
  ) {
    this.authForm = fb.group({
      'email' :  [null, [Validators.required, Validators.email]],
      'password':  [null, Validators.required],
    });
  }

  submitForm(form) {
    this.responseError = null;
    if (this.authForm.valid) {
      this.http.post('/users/login', JSON.stringify(form)).subscribe(
        (response) => this.processResponse(response.json())
      );
    }
  }

  processResponse(response: any) {
    if (response.errors) {
      this.responseError = response.errors;
      return;
    }
    this.authService.setToken(response.data.token)
    console.log(response.data.token)
  }
}
