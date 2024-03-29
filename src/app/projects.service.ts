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
    return this.http.get('/projects');
  }

  create(project: Project): Observable<Response> {
    return this.http.post('/projects', JSON.stringify(project));
  }

  load(id: number): Observable<Response> {
    return this.http.get(`/projects/${id}`);
  }

  update(project: Project): Observable<Response> {
    return this.http.post(`/projects/${project.id}`, JSON.stringify(project));
  }

  delete(project: Project): Observable<Response> {
    return this.http.delete(`/projects/${project.id}`);
  }

  logs(project: Project, query: string, page: number): Observable<Response> {
    const data = {
      query: query,
      page: page,
    };
    return this.http.post(`/projects/${project.id}/logs`, JSON.stringify(data));
  }

  types(id: number): Observable<Response> {
    return this.http.get(`/projects/${id}/types`);
  }

}

export interface Project {
  id: number;
  name: string;
}