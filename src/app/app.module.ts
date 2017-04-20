import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

// Services
import { HttpClient } from './services/http.client';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './auth.guard.service';
import { ProjectsService } from './projects.service';

// Components
import { AppComponent } from './app.component';
import { GuestLayoutComponent } from './guest.layout.component';
import { DashboardLayoutComponent } from './dashboard.layout.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProjectsListComponent } from './projects-list/projects-list.component';
import { ProjectsFormComponent } from './projects-form/projects-form.component';

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
      { path: 'projects/new', component: ProjectsFormComponent },
      { path: 'projects/:id', component: ProjectsFormComponent },
    ]
  },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    GuestLayoutComponent,
    DashboardComponent,
    DashboardLayoutComponent,
    ProjectsListComponent,
    ProjectsFormComponent,
  ],
  imports: [
    MaterialModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    BrowserAnimationsModule,
  ],
  providers: [
    HttpClient,
    AuthService,
    AuthGuard,
    ProjectsService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
