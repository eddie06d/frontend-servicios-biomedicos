import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DashboardUserComponent } from './pages/dashboard-user/dashboard-user.component';
import { DashboardAdminComponent } from './pages/dashboard-admin/dashboard-admin.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PersonalDataComponent } from './pages/personal-data/personal-data.component';
import { HealthDataComponent } from './pages/health-data/health-data.component';
import { WelcomeUserComponent } from './pages/welcome-user/welcome-user.component';
import { WelcomeAdminComponent } from './pages/welcome-admin/welcome-admin.component';
import { MedicalHistoryComponent } from './pages/medical-history/medical-history.component';
import { UsersListComponent } from './pages/users-list/users-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    RegisterPageComponent,
    DashboardUserComponent,
    DashboardAdminComponent,
    NavbarComponent,
    PersonalDataComponent,
    HealthDataComponent,
    WelcomeUserComponent,
    WelcomeAdminComponent,
    MedicalHistoryComponent,
    UsersListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
