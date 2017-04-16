import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '../../services/http.client';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register.html',
})
export class RegisterComponent {
  form: FormGroup;
  responseError: string;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    fb: FormBuilder
  ) {
    this.form = fb.group({
      'name' :  [null, [Validators.required]],
      'email' :  [null, [Validators.required, Validators.email]],
      'password':  [null, Validators.required],
    });
  }

  submitForm(form) {
    this.responseError = null;
    if (this.form.valid) {
      this.http.post('/users', JSON.stringify(form)).subscribe(
        (response) => this.processResponse(response.json())
      );
    }
  }

  processResponse(response: any) {
    if (response.errors) {
      this.responseError = response.errors;
      return;
    }
    console.log(response)
  }
}
