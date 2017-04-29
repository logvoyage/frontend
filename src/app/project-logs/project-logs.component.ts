import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { SessionService } from '../session.service';
import { Project, ProjectsService } from '../projects.service';

@Component({
  selector: 'app-project-logs',
  templateUrl: './project-logs.component.html',
  styleUrls: ['./project-logs.scss']
})
export class ProjectLogsComponent implements OnInit {
  projectId: number;
  project: Project;
  responseError: string;
  logs: string[];
  private loading = true;

  constructor(
    private route: ActivatedRoute,
    private titleService: Title,
    private projects: ProjectsService,
    private session: SessionService,
  ) { }

  ngOnInit() {
    this.projectId = this.route.snapshot.params['id'];
    this.projects.load(this.projectId).subscribe(
      (response) => this._processProjectLoad(response.json())
    );
  }

  loadLogs(query: string = '') {
    this.loading = true;
    this.logs = [];
    this.projects.logs(this.project, query).subscribe(
      (response) => this._processLoadLogs(response.json())
    );
  }

  onQueryEnter(value: string) {
    this.loadLogs(value);
  }

  private _processProjectLoad(response: any) {
    if (response.errors) {
      this.responseError = response.errors;
      return;
    }
    this.project = response.data as Project;
    this.session.setCurrentProject(this.project);
    this.titleService.setTitle(`Projects - ${this.project.name}`);
    this.loadLogs();
  }

  private _processLoadLogs(response: any) {
    this.logs = response.data;
    this.loading = false;
  }

}