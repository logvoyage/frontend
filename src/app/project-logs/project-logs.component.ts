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
  query: string;
  page = 1;
  logs: string[];
  total: number;

  private loading = true;

  constructor(
    private route: ActivatedRoute,
    private titleService: Title,
    private projects: ProjectsService,
    private session: SessionService,
  ) { }

  ngOnInit() {
    this.session.setTootbarTitle('Logs');
    this.projectId = this.route.snapshot.params['id'];
    this.projects.load(this.projectId).subscribe(
      (response) => this._processProjectLoad(response.json())
    );
  }

  loadLogs() {
    this.loading = true;
    this.logs = [];
    this.total = 0;
    this.projects.logs(this.project, this.query, this.page - 1).subscribe(
      (response) => this._processLoadLogs(response.json()),
      (error) => this.loading = false
    );
  }

  paginate(page: number) {
    this.page = page;
    this.loadLogs();
  }

  onQueryEnter(value: string) {
    this.page = 1;
    this.query = value;
    this.loadLogs();
  }

  private _processProjectLoad(response: any) {
    this.project = response.data as Project;
    this.session.setCurrentProject(this.project);
    this.titleService.setTitle(`Projects - ${this.project.name}`);
    this.loadLogs();
  }

  private _processLoadLogs(response: any) {
    this.logs = response.data.logs;
    this.total = response.data.total;
    this.loading = false;
  }

}