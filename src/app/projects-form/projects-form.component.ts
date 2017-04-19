import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router ,ActivatedRoute } from '@angular/router';
import { ProjectsService } from '../projects.service';

@Component({
  selector: 'app-projects-form',
  templateUrl: './projects-form.component.html'
})
export class ProjectsFormComponent implements OnInit {
  form: FormGroup;
  responseError: string;

  constructor(
    public fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private projects: ProjectsService,
  ) {
    this.form = fb.group({
      'name':  [null, Validators.required],
    });
   }

  ngOnInit() {
    // this.route.snapshot.params['id']
  }

  submitForm(form) {
    this.responseError = null;
    if (this.form.valid) {
      this.projects.create(form).subscribe(
        (response) => this.processResponse(response.json())
      );
    }
  }

  processResponse(response: any) {
    if (response.errors) {
      this.responseError = response.errors;
      return;
    }
    console.log(response.data);
    this.router.navigate(['dashboard']);
  }

}
