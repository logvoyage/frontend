import { Component } from '@angular/core';
import { HttpClient } from '../services/http.client';
import { Project, ProjectsService } from '../projects.service';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
})
export class ProjectsListComponent {
  projects: Project[];
  loading: boolean;

  constructor(
    private http: HttpClient,
    private projectsService: ProjectsService,
  ) {
    this.loading = true;
    this.projectsService.all().subscribe(
      (response) => this.process(response),
      (error) => this.http.error(error),
      () => this.loading = false
    );
  }

  process(response) {
    console.log("!!!", response.json());
    this.projects = response.json().data as Project[];
  }
}
