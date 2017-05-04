import { Injectable } from '@angular/core';
import { Project } from './projects.service';

// Session service stores all requered data for current user authenticated session.
@Injectable()
export class SessionService {
  project: Project;
  toolbarTitle: string;

  constructor() {
    this.project = {} as Project;
  }

  setCurrentProject(p: Project) {
    this.project = p;
  }

  getCurrentProject(): Project {
    return this.project;
  }

  setTootbarTitle(t: string) {
    this.toolbarTitle = t;
  }

  getToolbarTitle(): string {
    const name = this.project.name ? this.project.name : '';
    return `${name} / ${this.toolbarTitle}`;
  }
}