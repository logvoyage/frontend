import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import * as moment from 'moment';

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
  logs: Object[];
  types: string[];

  // Pagination
  page = 1;
  total: number;
  perPage: 10;

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

    this.projects.types(this.projectId).subscribe(
      (response) => this.types = response.json()
    )
  }

  private _processLoadLogs(response: any) {
    this.total = response.data.total;
    this.loading = false;

    if (!response.data.logs) {
      return;
    }

    for (const item of response.data.logs) {
      const data = JSON.parse(item.source);
      const datetime = moment.unix(data._datetime).utc().format('YYYY-MM-DD HH:mm:ss UTC');
      delete data['_datetime'];

      // If 'msg' is the only key - display msg only, otherwise dipslay log record as json.
      let msg;
      if (Object.keys(data).length === 1 && Object.keys(data)[0] === 'msg') {
        msg = data.msg;
      } else {
        msg = JSON.stringify(data);
      }

      this.logs.push({
        datetime: datetime,
        msg: msg,
        type: item.type,
      });
    }
  }
}
