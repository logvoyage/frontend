import { Component } from '@angular/core';
import { HttpClient } from '../services/http.client';
import { Project, ProjectsService } from '../projects.service';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
})
export class ProjectsListComponent {
  projects: Project[];

  constructor(
    private http: HttpClient,
    private projectsService: ProjectsService,
  ) {
    this.projectsService.all().subscribe(
      (response) => this.projects = response.json().data.projects as Project[],
      (error) => this.http.error(error)
    );
  }
}
