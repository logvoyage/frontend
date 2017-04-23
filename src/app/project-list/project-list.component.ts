import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { HttpClient } from '../services/http.client';
import { Project, ProjectsService } from '../projects.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
})
export class ProjectListComponent {
  projects: Project[];
  loading: boolean;

  constructor(
    private http: HttpClient,
    private projectsService: ProjectsService,
    private titleService: Title,
  ) {
    this.titleService.setTitle('Projects - Dashboard');
    this.loading = true;
    this.projectsService.all().subscribe(
      (response) => this.process(response),
      (error) => this.http.error(error),
      () => this.loading = false
    );
  }

  process(response) {
    this.projects = response.json().data as Project[];
  }
}
