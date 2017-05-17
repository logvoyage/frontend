import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

// 3rd party
import {NgxPaginationModule} from 'ngx-pagination';
import { Md2Module }  from 'md2';

// Services
import { HttpClient } from './services/http.client';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './auth.guard.service';
import { ProjectsService } from './projects.service';
import { SessionService } from './session.service';

// Components
import { AppComponent } from './app.component';
import { GuestLayoutComponent } from './guest.layout.component';
import { DashboardLayoutComponent } from './dashboard.layout.component';
import { ProjectLayoutComponent } from './project.layout.component';

import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectFormComponent } from './project-form/project-form.component';
import { ProjectLogsComponent } from './project-logs/project-logs.component';

const appRoutes: Routes = [
  // Guest routes
  {path: 'guest', redirectTo: 'guest/login', pathMatch: 'full'},
  {
    path: 'guest',
    component: GuestLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ]
  },
  // App routes
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {
    path: '',
    component: DashboardLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'projects/new', component: ProjectFormComponent },
    ]
  },
  // Project related routes
  {
    path: 'projects',
    component: ProjectLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: ':id/edit', component: ProjectFormComponent },
      { path: ':id/logs', component: ProjectLogsComponent },
    ]
  },
];

@NgModule({
  declarations: [
    AppComponent,
    GuestLayoutComponent,
    DashboardLayoutComponent,
    ProjectLayoutComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    ProjectListComponent,
    ProjectFormComponent,
    ProjectLogsComponent,
  ],
  imports: [
    Md2Module.forRoot(),
    MaterialModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
  ],
  providers: [
    Title,
    HttpClient,
    AuthService,
    AuthGuard,
    ProjectsService,
    SessionService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
