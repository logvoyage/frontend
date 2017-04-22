import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { Project, ProjectsService } from '../projects.service';

@Component({
  selector: 'app-projects-form',
  templateUrl: './projects-form.component.html'
})
export class ProjectsFormComponent implements OnInit {
  form: FormGroup;
  responseError: string;
  projectId: number;
  project: Project;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private projects: ProjectsService,
    private titleService: Title,
  ) {
    this.project = {} as Project;
    this.form = fb.group({
      'name':  [null, [Validators.required, Validators.maxLength(30)]],
    });
   }

  ngOnInit() {
    this.projectId = this.route.snapshot.params['id'];
    if (this.projectId) {
      this.projects.load(this.projectId).subscribe(
        (response) => this._processLoadResponse(response.json())
      );
    } else {
      this.titleService.setTitle(`Projects - new project`);
    }
  }

  submitForm(form) {
    this.responseError = null;
    if (!this.form.valid) {
      return;
    }

    if (this.projectId) {
      this.projects.update(this.project).subscribe(
        (response) => this._processSaveResponse(response.json())
      );
    } else {
      this.projects.create(form).subscribe(
        (response) => this._processSaveResponse(response.json())
      );
    }
  }

  private _processLoadResponse(response: any) {
    if (response.errors) {
      this.responseError = response.errors;
      return;
    }
    this.project = response.data as Project;

    this.projects.logs(this.project, 'message').subscribe(
      (resp) => console.log(resp.json())
    );

    this.titleService.setTitle(`Projects - ${this.project.name}`);
  }

  private _processSaveResponse(response: any) {
    if (response.errors) {
      this.responseError = response.errors;
      return;
    }
    this.router.navigate(['dashboard']);
  }

}
