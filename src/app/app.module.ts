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

// Components
import { AppComponent } from './app.component';
import { GuestLayoutComponent } from './guest.layout.component';
import { DashboardLayoutComponent } from './dashboard.layout.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

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
  {path: '', redirectTo: 'app/dashboard', pathMatch: 'full'},
  {path: 'app', redirectTo: 'app/dashboard', pathMatch: 'full'},
  {
    path: 'app',
    component: DashboardLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
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
    DashboardLayoutComponent
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
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
