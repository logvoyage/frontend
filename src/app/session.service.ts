import { Injectable } from '@angular/core';
import { Project } from './projects.service';

// Session service stores all requered data for current user authenticated session.
@Injectable()
export class SessionService {
  project: Project;

  setCurrentProject(p: Project) {
    this.project = p;
  }

  getCurrentProject(): Project {
    return this.project;
  }
}