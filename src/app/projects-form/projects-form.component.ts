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
    const id = +this.route.snapshot.params['id'];
    this.projects.load(id).subscribe(
      (response) => this.processLoadResponse(response.json())
    );
  }

  submitForm(form) {
    this.responseError = null;
    if (this.form.valid) {
      this.projects.create(form).subscribe(
        (response) => this.processSaveResponse(response.json())
      );
    }
  }

  processLoadResponse(response: any) {
    if (response.errors) {
      this.responseError = response.errors;
      return;
    }
    this.form = this.fb.group({
      'name':  [response.data.name, Validators.required],
    });
  }

  processSaveResponse(response: any) {
    if (response.errors) {
      this.responseError = response.errors;
      return;
    }
    console.log(response.data);
    this.router.navigate(['dashboard']);
  }

}
