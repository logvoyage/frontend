import { Component } from '@angular/core';
import { SessionService } from './session.service';

@Component({
  selector: 'app-root',
  templateUrl: './project.layout.component.html',
})
export class ProjectLayoutComponent {
  constructor(
    private session: SessionService,
  ) { }

  currentProject() {
    return this.session.getCurrentProject();
  }

  toolbarTitle(): string {
    return this.session.getToolbarTitle();
  }
}
