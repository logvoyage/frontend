import { Injectable } from '@angular/core';
import { HttpClient } from './services/http.client';

import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProjectsService {

  constructor(
    private http: HttpClient
  ) {}

  all(): Observable<Response> {
    return this.http.get('/projects/list');
  }

  create(project: Project): Observable<Response> {
    return this.http.post('/projects/new', JSON.stringify(project));
  }

  delete(project: Project): Observable<Response> {
    return this.http.delete(`/projects/${project.id}`);
  }

}

export interface Project {
  id: number;
  name: string;
}