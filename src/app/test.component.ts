import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  template: `
    <md-card>
      <form [formGroup]="authForm" (ngSubmit)="submitForm(authForm.value)">
        <md-input-container>
          <input mdInput type="email" placeholder="Email" formControlName="email" required>
        </md-input-container>
        <md-input-container>
          <input mdInput type="password" placeholder="Password" formControlName="password" required>
        </md-input-container>
        <button md-raised-button type="submit">Login</button>
      </form>
    </md-card>
  `
})
export class TestComponent {
  authForm : FormGroup;

  constructor(fb: FormBuilder){
    this.authForm = fb.group({
      'email' :  [null, [Validators.required, Validators.email]],
      'password':  [null, Validators.required],
    })
  }

  submitForm(form) {
    console.info(form)
  }
}